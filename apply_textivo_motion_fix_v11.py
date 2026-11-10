from pathlib import Path
import sys

root = Path.home() / "textivo"
app = root / "js" / "app.js"
index = root / "index.html"
sw = root / "sw.js"

if not app.exists():
    print("ERROR: ~/textivo/js/app.js not found.")
    sys.exit(1)

source = app.read_text(encoding="utf-8")
if "TEXTIVO_MOTION_FIX_V11" in source:
    print("Already installed: Textivo motion fix v11")
    sys.exit(0)
if 'window.TEXTIVO_BUILD = "v10";' not in source:
    print('ERROR: Expected Textivo v10. No files changed.')
    sys.exit(2)

start = source.find('$("playBtn").addEventListener("click",async()=>{')
end_marker = chr(10) + '});' + chr(10) + '$("transparentBg")'
end = source.find(end_marker, start)
if start < 0 or end < 0:
    print("ERROR: Could not locate original Play handler. No files changed.")
    sys.exit(3)
end += len(chr(10) + '});')

replacement = r'''/* TEXTIVO_MOTION_FIX_V11 */
$("playBtn").addEventListener("click", async () => {
  const status = $("animationStatus");
  const button = $("playBtn");
  const token = ++animationToken;
  try {
    const rows = [...editor.children].filter(row => (row.textContent || "").trim().length > 0);
    const mode = $("loopMode").value;
    const kind = $("animateBy").value;
    const enter = $("entranceEffect").value;
    const leave = $("exitEffect").value;
    const duration = Number($("unitDuration").value) || 0;
    const delay = Number($("unitDelay").value) || 0;
    const linePause = Number($("linePause").value) || 0;
    const deletePause = Number($("deletePause").value) || 0;

    if (!rows.length) {
      animationScreen.replaceChildren();
      status.textContent = "No text to animate";
      return;
    }

    setAnimationBaseStyle();
    animationScreen.replaceChildren();
    button.disabled = true;
    status.textContent = "Preparing animation…";
    const wait = ms => new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));

    const run = async () => {
      for (let li = 0; li < rows.length; li++) {
        if (token !== animationToken) return false;
        status.textContent = `${t("playing")} ${li + 1}/${rows.length}`;
        const units = splitIntoUnits(rows[li], kind);
        if (mode !== "type" || li === 0) animationScreen.replaceChildren();
        else animationScreen.appendChild(document.createElement("br"));
        const shown = [];

        if (mode !== "delete") {
          for (let i = 0; i < units.length; i++) {
            if (token !== animationToken) return false;
            const unit = units[i];
            if (kind === "line") {
              unit.style.display = "block";
              unit.style.width = "100%";
              unit.style.whiteSpace = "pre-wrap";
            } else {
              unit.style.display = "inline-block";
              unit.style.whiteSpace = "pre-wrap";
            }
            animationScreen.appendChild(unit);
            shown.push(unit);
            if (enter !== "none" && duration > 0) await animateElement(unit, inFrames(enter), duration);
            if (i < units.length - 1 && delay) await wait(delay);
          }
        } else {
          units.forEach(unit => {
            if (kind !== "line") unit.style.display = "inline-block";
            animationScreen.appendChild(unit);
            shown.push(unit);
          });
        }

        if (mode === "type") {
          if (li < rows.length - 1) await wait(linePause);
          continue;
        }
        if (mode !== "delete" && deletePause) await wait(deletePause);
        for (let i = shown.length - 1; i >= 0; i--) {
          if (token !== animationToken) return false;
          const unit = shown[i];
          if (leave !== "none" && duration > 0) await animateElement(unit, outFrames(leave), duration);
          unit.remove();
          if (i > 0 && delay) await wait(delay);
        }
        if (li < rows.length - 1) await wait(linePause);
      }
      return true;
    };

    let completed;
    do {
      completed = await run();
      if (!completed || mode !== "loop") break;
    } while (token === animationToken);
    if (token === animationToken) status.textContent = t("finished");
  } catch (error) {
    console.error("Textivo animation error:", error);
    status.textContent = "Animation error: " + (error && error.message ? error.message : String(error));
  } finally {
    if (token === animationToken) button.disabled = false;
  }
});

$("stopBtn").addEventListener("click", () => {
  animationToken++;
  $("playBtn").disabled = false;
  $("animationStatus").textContent = t("ready");
});'''

backup = app.with_suffix(".js.v10-backup")
if not backup.exists():
    backup.write_text(source, encoding="utf-8")
updated = source[:start] + replacement + source[end:]
updated = updated.replace('window.TEXTIVO_BUILD = "v10";', 'window.TEXTIVO_BUILD = "v11";', 1)
app.write_text(updated, encoding="utf-8")

if index.exists():
    html = index.read_text(encoding="utf-8")
    html = html.replace("css/style.css?v=10", "css/style.css?v=11")
    html = html.replace("js/app.js?v=10", "js/app.js?v=11")
    index.write_text(html, encoding="utf-8")
if sw.exists():
    cache = sw.read_text(encoding="utf-8").replace("textivo-v10", "textivo-v11")
    sw.write_text(cache, encoding="utf-8")

print("PATCH APPLIED: Textivo Motion Fix v11")
print("Backup:", backup)
print("Fixes: robust line detection, visible runtime errors, safe stop handling.")
print("Build: v11")
