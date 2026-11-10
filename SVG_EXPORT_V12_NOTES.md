# Textivo v12 — Native Animated SVG Export

## Install (Android / Termux)

Copy `apply_textivo_svg_export_v12.py` into `~/textivo/`, then run:

```bash
cd ~/textivo
python apply_textivo_svg_export_v12.py
```

The installer requires the v11 project, creates `js/app.js.v11-backup`, updates the SVG export handler, and bumps cache/build versions to v12.

## SVG export behavior

- Emits native SVG `<text>` and `<tspan>` elements.
- Uses embedded SVG SMIL `<animate>` / `<animateTransform>` for configured entrance and exit motion.
- Embeds the selected canvas background and text shadow filter.
- Keeps inline font family, size, weight, italic, underline/strike decoration, letter/word spacing, color and supported stroke styling as vector attributes.
- Does not emit `<image>`, canvas snapshots, base64 data, external CSS, or external JavaScript.
- The saved SVG is intended to play in modern browsers that support SVG SMIL.

## Important scope limits

The supplied v9/v10/v11 project UI does not contain controls for linear/radial gradients, arbitrary SVG paths, or user-defined transforms/strokes. The exporter cannot export settings that the supplied application does not expose or store. Existing inline text stroke styling is retained where the browser exposes it through computed style; arbitrary CSS gradient backgrounds are not converted to SVG paint servers in this version.

SVG sizing is measured from browser SVG text bounding boxes during export. Actual glyph metrics can differ on devices that substitute unavailable fonts.
