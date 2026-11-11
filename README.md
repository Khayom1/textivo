<div align="center">

<img src="assets/textivo-logo.svg" alt="Textivo — Text Studio" width="100%">

# Textivo

### Your words. Your style. Your motion.

**A text-only creative studio for writing, styling, animating, and exporting typography.**

No account. No paid API. No photo editor. No complicated design software.

[![Open repository](https://img.shields.io/badge/OPEN-REPOSITORY-a78bfa?style=for-the-badge&logo=github)](https://github.com/Khayom1/textivo)
[![Languages](https://img.shields.io/badge/INTERFACE-EN%20%7C%20RU%20%7C%20TG-20202b?style=for-the-badge)](#languages)
[![Offline](https://img.shields.io/badge/LOCAL--FIRST-READY-20202b?style=for-the-badge)](#privacy-and-project-storage)

**[Read the full user guide](GUIDE.md) · [Install Textivo](INSTALL.txt) · [Report a problem](https://github.com/Khayom1/textivo/issues)**

</div>

---

## What is Textivo?

Textivo turns plain words into carefully styled text compositions. Write separate lines, format one character or an entire phrase, set the canvas, preview the result, add motion, and export a file you can share.

It is designed for creators, students, educators, community managers, and anyone who needs expressive text without learning a complex graphics package.

**Textivo works with text only.** It is not a photo editor, drawing app, video editor, or image-generation tool. PNG and SVG exports are simply your typography rendered as shareable files.

## What you can make

- Quote cards and short statements
- Social-media titles and story text
- Announcements and promotional headlines
- Study notes and educational text cards
- Animated captions and typography sequences
- Simple title screens, greetings, and text banners

## The studio, explained

| Area | What it does |
|---|---|
| **Text workspace** | Write multi-line compositions. Each line has its own editable box. |
| **Text tools** | Count characters, words, and lines; find and replace; change case; clean and organize lines. |
| **Selection styling** | Style a selected word, phrase, or character with font, size, color, highlight, weight, and spacing. |
| **Canvas** | Choose Landscape 16:9, Square 1:1, Story 9:16, or Portrait 4:5. Set a solid or transparent background. |
| **Templates** | Start with Quote, Announcement, Study Card, Creator Title, or Minimal Statement. |
| **Motion Studio** | Animate by line, word, or character with entrance and exit effects, timing, and loop modes. |
| **Preview** | See the formatted text composition while you work. |
| **Project files** | Save in this browser or export/import an editable Project JSON backup. |
| **Export** | Copy plain text or export HTML, animated SVG, animated HTML, or PNG. |

## Start in three steps

### 1. Download the project

    git clone https://github.com/Khayom1/textivo.git
    cd textivo

### 2. Start a local server

Requires Python 3:

    python -m http.server 8080 --bind 127.0.0.1

### 3. Open Textivo

Visit **http://127.0.0.1:8080** in your browser.

On Android, these commands also work in Termux. Keep Termux running while the local server is active. See [INSTALL.txt](INSTALL.txt) for the short setup and [GUIDE.md](GUIDE.md) for the full manual.

## A simple workflow

1. **Write** your message in separate line boxes.
2. **Clean** it with the Text tools: search, replace, change case, or remove repeated lines.
3. **Select** the exact word, letter, or phrase you want to style.
4. **Design** with font, size, color, highlight, spacing, alignment, and canvas settings.
5. **Animate** the whole line, each word, or every character.
6. **Save** the editable project and keep a JSON backup.
7. **Export** the format that fits your next step.

## Languages

The interface is available in:

- 🇬🇧 English
- 🇷🇺 Russian
- 🇹🇯 Tajik

The interface language does not translate your own text.

## Privacy and project storage

- The editor runs in your browser; no account is needed.
- Core editing does not require a paid API or a backend.
- Browser-saved projects stay in local storage on that device.
- JSON, HTML, SVG, and PNG exports are generated locally.
- The service worker can cache the app for offline use after its first successful load.

**Back up important work.** Browser storage can be cleared by you, browser settings, private-browsing sessions, or the operating system. Export a Project JSON file to move or restore an editable project.

## Export formats

| Format | Best for | Editable in Textivo? |
|---|---|---|
| **Project JSON** | Backup and continuing a project later | Yes — import it back into Textivo |
| **HTML** | A simple, portable text composition | No — export output |
| **Animated HTML** | A standalone animated text presentation | No — export output |
| **SVG** | Scalable vector typography with supported motion | No — export output |
| **PNG** | A static text composition for sharing | No — export output |
| **Plain text** | Reuse the words in another app | Text only |

## Full guide

The [Textivo User Guide](GUIDE.md) explains every tool step by step, including mobile text selection, text cleanup, motion settings, export behavior, project backups, privacy, and troubleshooting.

## Project status

Textivo is an independent project under active development. The editor and export features are browser-based; rendering and font behavior can vary between browsers and devices. The repository includes automated integrity checks, but manual browser testing is still required for touch selection and export fidelity.

A hosted public demo is not currently configured. Run the project locally using the commands above.

## Technology

HTML5 · CSS3 · Vanilla JavaScript · DOM Selection APIs · Web Animations API · Canvas · SVG · Web App Manifest · Service Worker · Local Storage.

No framework or backend is required for the core editor.

## Quality checks

Requires Node.js 20 or newer:

    node --check js/app.js
    node --check sw.js
    node --check scripts/check-project.mjs
    node scripts/check-project.mjs

For the manual browser checklist, see [TESTING.md](TESTING.md).

## Author

<div align="center">

**Khayom Abdurahmonov**

Creator & Developer · Independent Project

[GitHub: @Khayom1](https://github.com/Khayom1) · [Textivo Repository](https://github.com/Khayom1/textivo)

</div>

---

<div align="center">

**TEXTIVO — YOUR WORDS. YOUR STYLE. YOUR MOTION.**

Built to make creative text design simpler and more accessible.

</div>
