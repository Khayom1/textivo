# Changelog

## v13 — Reliability and creative workflow

### Added
- Five built-in starting templates: quote, announcement, study card, creator title, and minimal statement.
- Four canvas presets: 16:9, 1:1, 9:16, and 4:5.
- PNG export dimensions that follow the selected canvas preset.
- Repository integrity script for maintainers.

### Fixed and improved
- Reworked undo/redo history to store the previous editor state.
- Reset now restores a properly editable text line and resets the history baseline.
- Local project saving now includes the full set of motion settings and canvas preset.
- Project JSON import validates the file, enforces a 2 MB size limit, restricts accepted settings, and sanitizes rich HTML.
- Pasted content is inserted as plain text to prevent untrusted markup from entering the editor.
- Preview and exports use sanitized editor markup.
- SVG text shadow is now applied to the exported composition.
- SVG delete-only mode starts its exit animation at the correct time.
- PNG export preserves inline text styling, colors, font weights, highlights, spacing, and decorations more accurately.
- Updated the PWA manifest, metadata, asset versions, and offline cache.
- Added the author marker to the application source.

### Repository cleanup
- Removed two obsolete JavaScript backup files.
- Removed a malformed duplicate logo asset name.
- Rebuilt the README and refreshed the installation guide.

### Validation
- JavaScript source parsed successfully.
- All 126 statically referenced DOM IDs were found in the HTML or documented as generated controls.
- No duplicate HTML IDs were found.
- Manifest JSON parsed successfully.
- Browser interaction, device-specific rendering, and export compatibility still require manual testing on target browsers.
