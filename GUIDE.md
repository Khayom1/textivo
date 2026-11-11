# Textivo — Complete User Guide

**Build 15 · Text-only creative studio**  
**Creator:** Khayom Abdurahmonov · [GitHub @Khayom1](https://github.com/Khayom1)  
**Project:** [github.com/Khayom1/textivo](https://github.com/Khayom1/textivo)

---

## 1. What Textivo is

Textivo is a browser-based studio for turning ordinary words into designed text compositions.

You can write several lines, style one character or a whole phrase, adjust the canvas, preview the result, animate the text, save an editable project, and export a file to share.

Textivo is deliberately **text-only**. It focuses on words, letters, typography, and text motion. It does not import or edit photographs, draw illustrations, create video footage, or generate images. PNG and SVG are output formats for your typography—not an image-editing workspace.

### Who is it for?

- Social-media creators who need titles, quote cards, and animated captions.
- Students and teachers who want readable study notes and educational text cards.
- Small businesses and community managers who prepare announcements.
- Writers and everyday users who want to give a message a clear visual style.

### What you need

A modern browser is enough to use the editor. To run the project locally, use Python 3 as a small web server. No account, database, paid API, or backend is required for the core studio.

---

## 2. Open Textivo

### Run on a computer

1. Install Git and Python 3.
2. Open a terminal.
3. Download the repository:

        git clone https://github.com/Khayom1/textivo.git
        cd textivo

4. Start the local server:

        python -m http.server 8080 --bind 127.0.0.1

5. Open http://127.0.0.1:8080 in a browser.

Keep the terminal open while using the app. Stop the server with Ctrl+C.

### Run on Android with Termux

1. Open Termux.
2. Install the required packages:

        pkg update
        pkg install git python

3. Clone the project:

        git clone https://github.com/Khayom1/textivo.git
        cd textivo

4. Start the server:

        python -m http.server 8080 --bind 127.0.0.1

5. Open http://127.0.0.1:8080 in Chrome or another browser on the same phone.

Do not close Termux while the server is running. Press CTRL+C in Termux when you finish.

### Install it like an app

Textivo includes a Web App Manifest and a service worker. On a browser that supports installation, open the project over a supported web origin, then use the browser's Install app or Add to Home screen command. A local file URL open is not enough for service-worker installation.

The service worker caches the core application files after the first successful load. Offline availability depends on the browser retaining that cache.

---

## 3. Understand the workspace

The main screen has two working columns on a wide display and a single vertical flow on a phone.

1. **Text workspace** — the words you are composing.
2. **Text tools** — quick editing and cleanup operations.
3. **Selection styling** — typography controls for the selected part.
4. **Canvas & background** — output proportions and the background.
5. **Live design preview** — a non-editable preview of the composition.
6. **Motion Studio** — animation behavior and timing.
7. **Export & projects** — saving, backups, and output files.

The interface can be switched between English, Russian, and Tajik from the language selector in the header. Changing the interface language does not translate the text you wrote.

---

## 4. Write and arrange text

### Add text

- Type directly inside the first text box.
- Press Enter to create a new line.
- Use the Add line button to add another empty line.
- Each box represents one line in the composition.
- You can edit or clear the text in each box. Use the sorting tool when you want automatic alphabetical ordering.

Use separate lines for a headline, subtitle, supporting message, and signature. This makes it easier to style and animate each part.

### Use a starting template

Choose a template and press Use template. The available starting points are:

| Template | Good for |
|---|---|
| Quote Card | A short quotation or statement |
| Announcement | A launch, update, or important message |
| Study Card | A definition, key concept, or short lesson |
| Creator Title | A channel, creator, or campaign headline |
| Minimal Statement | A clean message with little visual noise |

A template replaces the current text workspace. Save or export your current project first if you need to keep it.

### Undo and redo

Use Undo to reverse the latest recorded editor change and Redo to restore it. The history is held in the current page session and is limited to the most recent 80 editor states. Export a Project JSON backup for long-term storage.

---

## 5. Text tools

Text tools help you edit the words before styling them. The live counter updates as the editor changes.

### Live text counter

The counter displays:

- **Characters** — the number of visible characters, excluding line-break separators.
- **Words** — text groups separated by whitespace.
- **Lines** — the number of line boxes in the workspace, including empty boxes.

The counter is a practical estimate for drafting, not a language-specific word processor or grammar checker.

### Find and replace

1. Enter the word or phrase in Find text.
2. Enter the new wording in Replace with. Leave this field empty to delete the match.
3. Press Replace first to change the first match in the document.
4. Press Replace all to change every match.
5. Review the status message below the tools.

Search ignores letter case. The operation scans text segments inside the editor. If a phrase has been split across multiple differently formatted spans, search for the parts separately.

### Change letter case

- **UPPERCASE** converts letters to capital form.
- **lowercase** converts letters to small form.
- **Title Case** capitalizes the beginning of each word and lowers the remaining letters.

These commands keep the existing text styling wrappers in place. Check abbreviations and names after using Title Case.

### Clean and organize lines

- **Normalize spaces** reduces repeated spaces or tabs within text segments and trims their edges.
- **Remove empty lines** deletes line boxes that contain no visible text.
- **Remove duplicates** keeps the first version of each non-empty line and removes later copies. Comparison ignores letter case and repeated whitespace.
- **Sort A–Z** sorts the line boxes alphabetically using the selected interface language.

These operations change the text workspace. Use Undo immediately after an operation to reverse it.

---

## 6. Style a word, phrase, or character

Selection styling applies to the part of the text that is selected—not automatically to every line.

### On a computer

1. Select the required word, phrase, or character with the mouse.
2. Choose the style controls.
3. Press Apply to selected text.

### On a phone or tablet

1. Touch and hold the word or character in the editor.
2. Move the selection handles until the correct text is highlighted.
3. Choose the style controls.
4. Tap Apply to selected text.

If the selection disappears when you tap a control, Textivo attempts to restore the saved selection. If the wrong section changes, select the text again and retry.

### Formatting controls

| Control | What it changes |
|---|---|
| Bold | Makes selected text heavier |
| Italic | Slants selected text |
| Underline | Adds a line below selected text |
| Strikethrough | Draws a line through selected text |
| Font family | Selects a font available on the device/browser |
| Font size | Sets selected text size from 6 to 200 px |
| Text color | Changes the selected letters' color |
| Highlight | Adds a background color behind selected text |
| No background for selected text | Removes the highlight |
| Letter spacing | Adjusts spacing between letters |
| Word spacing | Adjusts spacing between words |
| Font weight | Selects regular through black weight |
| Alignment | Sets the composition's text alignment |

Use Clear style to remove formatting from the current selection. Use Select all to select the editor contents.

### Fonts and language

The font list uses browser/device fonts. If a font is not installed, the browser substitutes another font. Characters from Tajik, Russian, or other scripts may therefore look different between devices. Always review the exported file on the device or platform where it will be used.

---

## 7. Set the canvas

The canvas is the frame in which your text is arranged.

| Preset | Shape | Typical use |
|---|---|---|
| Landscape · 16:9 | Wide | Presentation and landscape title |
| Square · 1:1 | Square | Square social post |
| Story · 9:16 | Tall | Vertical story or short-form title |
| Portrait · 4:5 | Portrait | Portrait feed composition |

You can also set:

- **Canvas background** — a solid color behind all text.
- **Default text color** — the color used for text without its own inline color.
- **Transparent canvas** — removes the background for formats that support transparency.
- **Text shadow** — none, soft shadow, purple glow, or cyan glow.

The preview changes when the canvas format changes. The PNG export uses the dimensions associated with the chosen preset.

---

## 8. Motion Studio

Motion Studio animates the text already in your composition. It does not create video footage.

### Choose what moves

- **Whole line** — each line appears or disappears as one unit.
- **Word by word** — words enter and exit in sequence.
- **Character by character** — individual characters are animated.

### Entrance effects

- Fade in
- Rise up
- Slide from left
- Zoom in
- Blur in
- Pop
- No effect

### Exit effects

- Fade out
- Drop down
- Slide right
- Zoom out
- Blur out
- No effect

### Timing controls

- **Movement duration** sets how long each entrance or exit effect takes.
- **Delay between parts** sets the pause between words or characters.
- **Pause before exit** sets how long the completed text remains visible.
- **Pause between lines** sets the pause before the next line starts.

### Animation modes

- **Play once** — each line enters and exits once.
- **Loop forever** — repeats until stopped.
- **Typing only** — reveals the text without the exit phase.
- **Deleting only** — displays the text and runs the exit phase.

Press Play animation to preview the result. Press Stop to stop the current run. On older browsers without the Web Animations API, timing may be approximate.

---

## 9. Save and manage project files

Textivo offers two ways to keep a project.

### Save project

The header's Save project button stores the current project in the browser's local storage on this device. The project includes the text, interface language, canvas settings, and motion settings.

This is convenient for returning to the same project in the same browser. It is not a cloud account and does not sync between devices.

### Export Project JSON

Use Export project JSON in the Export & projects panel to download an editable project backup. The file contains the text composition and supported settings.

### Import Project JSON

1. Press Import project JSON.
2. Select a Textivo Project JSON file.
3. Confirm that you want to replace the current workspace.
4. Review the imported text and settings.

Imports are limited to 2 MB. Text markup and accepted style properties are sanitized before they are placed in the editor.

**Important:** importing replaces the current workspace. Export the current project first if you need to preserve it.

### Browser storage warning

Browser data can be removed by browser settings, private-browsing sessions, the user, or the operating system. A phone cleanup tool may also clear website data. Keep Project JSON backups for important work.

---

## 10. Export and share

### Copy text

Copy text copies the plain wording from the editor. Formatting and animation are not included.

### HTML

Export HTML creates a basic HTML document containing the styled text composition. It is useful for a simple portable text layout.

### Animated HTML

Export animated HTML creates a self-contained HTML file with playback controls and the selected animation settings. It can be opened independently of the Textivo editor in a compatible browser.

### SVG

Export SVG creates vector text markup and supported SVG motion. SVG is scalable, but the exact font appearance depends on fonts available in the viewing environment. The built-in SVG animation relies on modern browser support for SVG animation.

### PNG

Export PNG creates a static raster image of the text composition. It uses the selected canvas preset. PNG does not preserve editable text or animation.

### Which format should you choose?

- Keep editing later: Project JSON.
- Share an editable web text layout: HTML.
- Share an animated browser presentation: Animated HTML.
- Use scalable vector typography: SVG.
- Share a static composition: PNG.
- Reuse only the wording: Copy text.

---

## 11. Privacy and offline use

- The core editor works inside the browser.
- No sign-in is required.
- No paid API or backend is required.
- Saved projects are kept in local browser storage.
- Project exports are created on the device.
- After a successful online load, the service worker can cache the core application files for offline use.

Textivo does not provide cloud synchronization. Do not treat the browser's local storage as your only backup.

---

## 12. Troubleshooting

### The page does not open

Check that the local server is running in Termux or the terminal. Make sure you opened the same address and port shown in the installation instructions.

### The browser says the address is unavailable

Keep the server process running. If port 8080 is already in use, start another port:

    python -m http.server 8081 --bind 127.0.0.1

Then open http://127.0.0.1:8081.

### The app does not work offline

Open it successfully at least once while online. Do not use a file URL. Make sure the browser has not cleared the service-worker cache or site storage.

### I cannot style a word

Select text inside a line box first. Then tap or click Apply to selected text. On mobile, use the selection handles and avoid tapping outside the selected text before applying the style.

### My font looks different on another device

The browser may not have the same font installed. Choose a widely available font and check the exported file on the target device.

### My saved project disappeared

Browser storage may have been cleared. Textivo cannot recover deleted local browser data. Restore from a Project JSON backup.

### An export looks different from the preview

Browser font metrics and export engines can render glyphs differently. Try a supported font, reload the project, and test another format. Include the browser name/version and a reproducible example in a bug report.

### A text operation changed more than expected

Use Undo immediately. For replace operations, note that matching is case-insensitive and is performed within text nodes. For duplicate removal, the first matching line is kept.

---

## 13. Current capabilities and limits

Textivo currently provides:

- Multi-line text editing.
- Character- and word-level formatting.
- Built-in starter templates.
- Four canvas presets.
- Live text preview and basic text statistics.
- Find/replace, case conversion, text cleanup, and line ordering.
- Motion preview and configurable entrance/exit effects.
- Browser-local project save and JSON import/export.
- HTML, animated HTML, SVG, and PNG output.
- English, Russian, and Tajik interface translations.

Textivo does not currently provide:

- Photo import, photo filters, or image editing.
- Drawing tools, vector illustration, or freeform path editing.
- Video recording or a video timeline.
- Cloud accounts, online project sync, or team collaboration.
- A cloud-hosted font library or guaranteed identical fonts across devices.
- A hosted public demo.

These boundaries are intentional: the studio focuses on text composition and text motion.

---

## 14. Quality checks for maintainers

Requires Node.js 20 or newer. From the repository root:

    node --check js/app.js
    node --check sw.js
    node --check scripts/check-project.mjs
    node scripts/check-project.mjs
    python -m json.tool manifest.json

Then start the server and follow the checklist in TESTING.md. Static checks cannot prove that every browser renders touch selection, typography, animation, and exports identically.

---

## 15. Roadmap

Future improvements should strengthen the text workflow rather than turn Textivo into a general image or video editor.

Possible directions:

- More built-in text composition templates.
- Stronger accessibility and keyboard navigation.
- More reliable text metrics and export consistency.
- Expanded multilingual font guidance and typography presets.
- Browser-based functional tests for selection, editing, and export.
- Community-contributed templates and translations.

Roadmap ideas are not current features until implemented and tested.

---

## 16. Author and project

**Khayom Abdurahmonov**  
Creator & Developer · [GitHub @Khayom1](https://github.com/Khayom1)

- Repository: https://github.com/Khayom1/textivo
- Profile: https://github.com/Khayom1
- Issues and feature requests: https://github.com/Khayom1/textivo/issues

Textivo is an independent project. Check the repository for current license information before redistributing or reusing the source code.

**Textivo — Your words. Your style. Your motion.**
