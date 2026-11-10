from pathlib import Path
import re, shutil, sys

root = Path.home() / "textivo"
app = root / "js" / "app.js"
sw = root / "sw.js"
index = root / "index.html"
manifest = root / "manifest.json"

if not app.exists():
    print("ERROR: ~/textivo/js/app.js not found. Put this patch in ~/textivo and run it there.")
    sys.exit(1)

source = app.read_text(encoding="utf-8")
if "TEXTIVO_PORTABLE_EXPORT_V10" in source:
    print("Already installed: portable export v10")
    sys.exit(0)
if 'window.TEXTIVO_BUILD = "v9";' not in source:
    print("ERROR: This patch expects Textivo v9. No files changed.")
    sys.exit(2)

addon = r"""
/* TEXTIVO_PORTABLE_EXPORT_V10 */
(function installPortableExportV10(){
  const exportPanel = $("exportTitle")?.closest(".panel");
  if (!exportPanel) return;
  const toolbar = exportPanel.querySelector(".toolbar");
  if (!toolbar) return;

  const addButton = (id, label) => {
    if ($(id)) return $(id);
    const b = document.createElement("button");
    b.id = id; b.type = "button"; b.textContent = label;
    toolbar.appendChild(b); return b;
  };
  const htmlBtn = addButton("portableHtmlBtn", "Export animated HTML");
  const jsonBtn = addButton("projectJsonBtn", "Export project JSON");
  const importBtn = addButton("projectImportBtn", "Import project JSON");
  const fileInput = document.createElement("input");
  fileInput.type = "file"; fileInput.accept = ".json,application/json";
  fileInput.hidden = true; fileInput.id = "projectImportFile";
  exportPanel.appendChild(fileInput);

  const ids = [
    "font","size","color","highlight","transparentHighlight","spacing","wordSpacing",
    "weight","align","shadow","linePause","deletePause","loopMode","animateBy",
    "entranceEffect","exitEffect","unitDuration","unitDelay"
  ];
  function snapshot(){
    const settings = {};
    ids.forEach(id => {
      const el = $(id);
      if (el) settings[id] = el.type === "checkbox" ? el.checked : el.value;
    });
    return {
      format: "textivo-project",
      schemaVersion: 1,
      app: "Textivo",
      exportedAt: new Date().toISOString(),
      language: $("language")?.value || "en",
      content: {
        html: editor.innerHTML,
        background: $("canvasBg")?.value || "#20202b",
        transparentBackground: !!$("transparentBg")?.checked,
        defaultColor: $("defaultColor")?.value || "#ffffff"
      },
      settings
    };
  }
  function safeJSON(value){
    return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
  }
  function saveFile(name, data, type){
    const blob = new Blob([data], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  jsonBtn.addEventListener("click", () => {
    saveFile("textivo-project.json", safeJSON(snapshot()), "application/json");
  });

  importBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data.format !== "textivo-project" || !data.content || typeof data.content.html !== "string")
        throw new Error("This is not a valid Textivo project file.");
      if (!confirm("Replace the current Textivo workspace with this project?")) return;
      editor.innerHTML = data.content.html;
      if ($("language")) $("language").value = data.language || "en";
      if ($("canvasBg")) $("canvasBg").value = data.content.background || "#20202b";
      if ($("transparentBg")) $("transparentBg").checked = !!data.content.transparentBackground;
      if ($("defaultColor")) $("defaultColor").value = data.content.defaultColor || "#ffffff";
      Object.entries(data.settings || {}).forEach(([id,value]) => {
        const el = $(id); if (!el) return;
        if (el.type === "checkbox") el.checked = !!value;
        else el.value = value;
      });
      normalizeLines(); translate($("language").value); updatePreview();
      remember();
      $("animationStatus").textContent = "Project imported";
      alert("Textivo project imported. All stored text and settings have been restored.");
    } catch (err) {
      alert("Could not import project: " + err.message);
    } finally { fileInput.value = ""; }
  });

  function portableRuntime(){
    return [
      "(function(){",
      "const data=JSON.parse(document.getElementById('textivo-data').textContent);",
      "const root=document.getElementById('stage'),play=document.getElementById('play'),stop=document.getElementById('stop'),status=document.getElementById('status');",
      "const c=data.content,s=data.settings||{}; root.innerHTML=c.html;",
      "root.style.background=c.transparentBackground?'transparent':c.background;",
      "root.style.color=c.defaultColor||'#fff';root.style.textAlign=s.align||'center';",
      "root.style.fontFamily=s.font||'Arial';root.style.fontSize=(s.size||32)+'px';root.style.fontWeight=s.weight||'400';root.style.textShadow=s.shadow||'none';",
      "const sleep=n=>new Promise(r=>setTimeout(r,n));let token=0;",
      "function frames(name,out){const map=out?{fade:[{opacity:1},{opacity:0}],drop:[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(28px)'}],'slide-right':[ {opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX(35px)'}],zoom:[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.55)'}],blur:[{opacity:1,filter:'blur(0)'},{opacity:0,filter:'blur(10px)'}]}:{fade:[{opacity:0},{opacity:1}],rise:[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],'slide-left':[{opacity:0,transform:'translateX(-35px)'},{opacity:1,transform:'translateX(0)'}],zoom:[{opacity:0,transform:'scale(.55)'},{opacity:1,transform:'scale(1)}],blur:[{opacity:0,filter:'blur(10px)'},{opacity:1,filter:'blur(0)'}],pop:[{opacity:0,transform:'scale(.65)'},{opacity:1,transform:'scale(1.12)',offset:.72},{opacity:1,transform:'scale(1)'}]};return map[name]||[{opacity:1},{opacity:1}]}",
      "function split(line,kind){if(kind==='line'){const x=document.createElement('div');x.className='unit line';x.innerHTML=line.innerHTML;return [x]}const out=[];function walk(node,styles){if(node.nodeType===3){for(const ch of node.nodeValue){const x=document.createElement('span');x.className='unit';x.textContent=ch;Object.assign(x.style,styles);out.push(x)}return}if(node.nodeType!==1)return;const cs=getComputedStyle(node),next={...styles};['fontFamily','fontSize','fontWeight','fontStyle','textDecoration','color','backgroundColor','letterSpacing','wordSpacing','textShadow'].forEach(k=>{const v=cs[k];if(v&&v!=='normal'&&v!=='rgba(0, 0, 0, 0)')next[k]=v});node.childNodes.forEach(n=>walk(n,next))}line.childNodes.forEach(n=>walk(n,{}));if(kind==='character')return out;const words=[];let cur=null;out.forEach(ch=>{if(/^\\s+$/.test(ch.textContent)){if(cur)cur.appendChild(ch);else{const w=document.createElement('span');w.className='unit';w.appendChild(ch);words.push(w)}}else{if(!cur){cur=document.createElement('span');cur.className='unit';words.push(cur)}cur.appendChild(ch)}});return words.filter(x=>x.textContent.length)}",
      "async function animate(el,fs,ms,t){if(t!==token)return;if(el.animate){try{await el.animate(fs,{duration:ms,easing:'cubic-bezier(.2,.75,.25,1)',fill:'both'}).finished}catch(e){}}else await sleep(ms)}",
      "async function run(){const t=++token,rows=[...root.querySelectorAll('.text-line,div')].filter(x=>x.parentElement===root&&x.textContent.trim());const mode=s.loopMode||'once',kind=s.animateBy||'character',enter=s.entranceEffect||'fade',leave=s.exitEffect||'fade',duration=+(s.unitDuration||500),delay=+(s.unitDelay||120),linePause=+(s.linePause||500),deletePause=+(s.deletePause||1500);",
      "do{for(let li=0;li<rows.length;li++){if(t!==token)return;status.textContent='Line '+(li+1)+' / '+rows.length;const units=split(rows[li],kind);root.replaceChildren();const shown=[];if(mode!=='delete'){for(let i=0;i<units.length;i++){if(t!==token)return;const u=units[i];if(kind==='line'){u.style.display='block';u.style.width='100%';u.style.whiteSpace='pre-wrap'}else{u.style.display='inline-block';u.style.whiteSpace='pre-wrap'}root.appendChild(u);shown.push(u);if(enter!=='none')await animate(u,frames(enter,false),duration,t);if(i<units.length-1)await sleep(delay)}}else units.forEach(u=>{u.style.display=kind==='line'?'block':'inline-block';root.appendChild(u);shown.push(u)});",
      "if(mode==='type'){if(li<rows.length-1)await sleep(linePause);continue}if(mode!=='delete')await sleep(deletePause);for(let i=shown.length-1;i>=0;i--){if(t!==token)return;if(leave!=='none')await animate(shown[i],frames(leave,true),duration,t);shown[i].remove();if(i)await sleep(delay)}if(li<rows.length-1)await sleep(linePause)}}while(mode==='loop'&&t===token);if(t===token)status.textContent='Animation finished'}",
      "play.addEventListener('click',run);stop.addEventListener('click',()=>{token++;status.textContent='Stopped'});",
      "})();"
    ].join("\\n");
  }
  htmlBtn.addEventListener("click", () => {
    const data = safeJSON(snapshot());
    const css = "html,body{margin:0;min-height:100%;background:#09090f;color:#fff;font-family:Arial,sans-serif}body{padding:24px;box-sizing:border-box}.bar{display:flex;gap:10px;flex-wrap:wrap;margin:0 auto 18px;max-width:1100px}.bar button{background:#a78bfa;color:#160f22;border:0;border-radius:9px;padding:11px 16px;font-weight:700}#stage{box-sizing:border-box;max-width:1100px;min-height:260px;margin:auto;padding:30px;border-radius:14px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.35;text-align:center}#stage .text-line{display:block;white-space:pre-wrap;min-height:1em}#stage .unit{vertical-align:baseline}.status{max-width:1100px;margin:12px auto;color:#aaa;font:13px Arial}";
    const runtime = portableRuntime().replace(/<\/script/gi, "<\\\\/script");
    const doc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Textivo — Animated Export</title><style>'+css+'</style></head><body><div class="bar"><button id="play">▶ Play animation</button><button id="stop">■ Stop</button></div><div id="stage"></div><div class="status" id="status">Ready — this file works independently of Textivo.</div><script type="application/json" id="textivo-data">'+data+'</script><script>'+runtime+'</script></body></html>';
    saveFile("textivo-animated.html", doc, "text/html");
  });
})();
"""
if not source.rstrip().endswith("})();"):
    print("ERROR: Could not safely locate app.js ending. No files changed.")
    sys.exit(3)

backup = app.with_suffix(".js.v9-backup")
if not backup.exists():
    shutil.copy2(app, backup)
source = source.rstrip()[:-5] + addon + "\n})();\n"
source = source.replace('window.TEXTIVO_BUILD = "v9";','window.TEXTIVO_BUILD = "v10";')
app.write_text(source, encoding="utf-8")

if index.exists():
    s = index.read_text(encoding="utf-8").replace("?v=9", "?v=10")
    index.write_text(s, encoding="utf-8")
if sw.exists():
    s = sw.read_text(encoding="utf-8").replace("textivo-v9","textivo-v10").replace("?v=9","?v=10")
    sw.write_text(s, encoding="utf-8")
if manifest.exists():
    s = manifest.read_text(encoding="utf-8").replace("Textivo Typography Studio v7","Textivo Typography Studio v10")
    manifest.write_text(s, encoding="utf-8")

print("PATCH APPLIED: Textivo v10 portable export")
print("Backup: ~/textivo/js/app.js.v9-backup")
print("New exports: Animated HTML, Project JSON, Import Project JSON")
print("Existing HTML/SVG/PNG exports remain available.")
