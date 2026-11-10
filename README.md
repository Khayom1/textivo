<div align="center">

<img src="assets/textivo-logo.svg" alt="Textivo — Typography Studio" width="100%">

# Textivo

### Your words. Your style. Your motion.

**A free, multilingual typography and motion-design studio that runs in your browser — no account, no paid API, no complicated software.**

[![Open Live Studio](https://img.shields.io/badge/OPEN-LIVE%20STUDIO-a78bfa?style=for-the-badge)](https://khayom1.github.io/textivo/)
[![Languages](https://img.shields.io/badge/LANGUAGES-EN%20%7C%20RU%20%7C%20TG-20202b?style=for-the-badge)](#-languages)
[![Offline](https://img.shields.io/badge-OFFLINE--READY-20202b?style=for-the-badge)](#-privacy--offline-first)

**[Try Textivo](https://khayom1.github.io/textivo/) · [Report a bug](https://github.com/Khayom1/textivo/issues) · [Request a feature](https://github.com/Khayom1/textivo/issues)**

</div>

---

## ✦ What is Textivo?

Textivo helps anyone turn ordinary text into expressive visual content. Create typography compositions, style individual letters or words, animate text, and export your work — all in one lightweight browser-based workspace.

It is built for people who want polished text graphics without needing Photoshop, motion-design experience, an account, or a paid subscription.

**Our principle:** useful creativity should be accessible, understandable, and private.

## ✦ What can you create?

- Social media titles, stories, and quote cards
- Animated captions and typography sequences
- Promotional text and simple announcement graphics
- Educational visual notes and learning cards
- Personal greetings, banners, and creative experiments

## ✦ Features

| Feature | What it does |
|---|---|
| **Independent text lines** | Write and edit separate lines in one workspace |
| **Character-level styling** | Format a selected word, letter, or text range |
| **Typography controls** | Font, size, weight, color, highlight, spacing, and shadow |
| **Canvas controls** | Background color, transparency, alignment, and preview |
| **Motion Studio** | Animate by line, word, or character |
| **Entrance & exit effects** | Fade, rise, slide, zoom, blur, pop, and more |
| **Local project saving** | Keep editable work in your browser on this device |
| **Project JSON** | Export and import editable project files |
| **Portable HTML** | Export a self-contained animated HTML composition |
| **SVG export** | Create scalable vector typography with animation support |
| **PNG export** | Export a static image |
| **Three languages** | English, Russian, and Tajik interface |

## ✦ Get started

### Use Textivo online

Open **[Textivo Live](https://khayom1.github.io/textivo/)** in a modern browser. On supported browsers, use the browser menu to install it as an app.

### Run locally

Requirements: Python 3 and a modern browser.

```bash
git clone https://github.com/Khayom1/textivo.git
cd textivo
python -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080`.

### Android / Termux

```bash
pkg update
pkg install git python
git clone https://github.com/Khayom1/textivo.git
cd textivo
python -m http.server 8080 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8080` on the same device. Keep Termux running while using the local server.

## ✦ Quick workflow

1. **Write** — add your text as separate lines.
2. **Select** — choose the word, letter, or range you want to change.
3. **Style** — set font, size, color, weight, highlight, and spacing.
4. **Preview** — review your composition as you work.
5. **Animate** — choose line, word, or character motion and timing.
6. **Export** — save an editable project or create a file to share.

## ✦ Languages

Textivo's interface is available in:

- 🇬🇧 English
- 🇷🇺 Русский
- 🇹🇯 Тоҷикӣ

The language selector changes the interface. Your text is not automatically translated.

## ✦ Privacy & offline-first

- The core editor runs in your browser.
- No account is required.
- No paid API is required.
- Projects saved with **Save project** stay in local browser storage on that device.
- Project JSON files are generated locally when exported.
- The service worker can cache the app for offline use after its first successful load.

**Important:** browser storage can be cleared by browser settings, the user, or the operating system. Export a Project JSON backup if your work matters. Private browsing may not retain saved data.

## ✦ Project portability

Use **Project JSON** to reopen and continue editing later. It is the editable project backup.

Use HTML, SVG, or PNG when you need an output to share or use elsewhere. These formats do not replace the editable JSON project.

## ✦ Roadmap

Priorities are practical improvements that help real people:

- [x] English, Russian, and Tajik interface
- [x] Browser-based editing without a paid backend
- [x] Motion Studio and multiple export formats
- [x] Local project save and portable JSON
- [ ] Smart templates for social posts, stories, learning cards, and announcements
- [ ] Preset canvas sizes for common platforms
- [ ] More reliable high-resolution PNG and animated exports
- [ ] Expanded font support and multilingual typography
- [ ] Automated browser tests and accessibility improvements
- [ ] Community-contributed templates and translations

Roadmap items are planned, not claims that those features are already available.

## ✦ Help improve Textivo

Found a bug or have an idea? Open a [GitHub Issue](https://github.com/Khayom1/textivo/issues).

Please include:
- Device and operating system
- Browser and version
- Expected result and actual result
- Steps to reproduce
- Screenshot or sample export, if useful

Do not attach private text or personal information.

Contributions are welcome: bug reports, translation corrections, accessibility improvements, template ideas, and code changes all help.

## ✦ Technology

- HTML5 and CSS3
- Vanilla JavaScript
- Web App Manifest and Service Worker
- DOM, Canvas, SVG, Web Animations, and Local Storage APIs

No framework or backend is required for the core editor.

## ✦ Project status

Textivo is an independent project under active development. Browser support and export behavior may vary. Report reproducible issues so they can be fixed transparently.

**Licensing:** this repository currently has no license file. Do not assume the code is licensed for redistribution or commercial reuse until a license is added.

## ✦ Author

<div align="center">

**Khayom Abdurahmonov**

Creator & Developer · Independent Project

[GitHub](https://github.com/Khayom1) · [Textivo Repository](https://github.com/Khayom1/textivo)

</div>

---

<div align="center">

**TEXTIVO — YOUR WORDS. YOUR STYLE. YOUR MOTION.**

Built to make creative text design simpler and more accessible.

</div>
