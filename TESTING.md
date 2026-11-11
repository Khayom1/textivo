# Manual testing — Textivo

GitHub Actions is not required. Run these checks directly in Termux.

## 1. Update the repository

If the project is already cloned:

```bash
cd ~/textivo
git pull --ff-only origin main
```

If it is not cloned yet:

```bash
pkg update
pkg install git nodejs-lts python
git clone https://github.com/Khayom1/textivo.git
cd textivo
```

## 2. Run static checks

```bash
node --check js/app.js
node --check sw.js
node --check scripts/check-project.mjs
node scripts/check-project.mjs
python -m json.tool manifest.json
```

All commands should finish without a syntax error or assertion failure.

## 3. Start the local server

```bash
python -m http.server 8080 --bind 127.0.0.1
```

Open this address in Chrome on the same phone:

```text
http://127.0.0.1:8080
```

Keep Termux open while testing. Stop the server with `Ctrl+C`.

## 4. Manual browser checklist

- [ ] Switch the interface between English, Russian, and Tajik.
- [ ] Change canvas format between 16:9, 1:1, 9:16, and 4:5. The preview ratio must change immediately.
- [ ] Change canvas background, default text color, font, size, weight, alignment, and shadow. Preview must update without editing the text.
- [ ] Add multiple lines, edit them, split a line with Enter, and verify Undo / Redo.
- [ ] Check live character, word, and line counts while editing.
- [ ] Test Find and Replace first/all, including case-insensitive matches and empty replacement text.
- [ ] Test uppercase, lowercase, and title case with English, Russian, and Tajik text.
- [ ] Test space cleanup, empty-line removal, duplicate-line removal, and language-aware A–Z sorting.
- [ ] Verify each Text tools button label and status message changes with the interface language.
- [ ] Select one word, apply color/highlight/spacing, and verify only the selection changes.
- [ ] Apply each template and verify the preview.
- [ ] Export PNG in each canvas format. Confirm the downloaded image dimensions match the selected format.
- [ ] Export SVG. Open it in a browser and check left, center, and right alignment plus the shadow.
- [ ] Export Project JSON, reset the editor, import the JSON, and verify the content and settings return.
- [ ] Export animated HTML and test Play / Stop in the exported file.
- [ ] In Motion Studio, test word-by-word animation with leading spaces, repeated spaces, punctuation, and multiple styled spans. Confirm whitespace does not appear as a separate animated word.
- [ ] Repeat the same whitespace cases in the exported Animated HTML file.
- [ ] Test transparent canvas export.
- [ ] Load the app once, then turn off internet and reload to check the service-worker offline cache.

## 5. Report a failure

If a command fails, copy the complete Termux output. If a browser feature fails, include the exact steps and a screenshot. Do not send passwords or GitHub tokens.
