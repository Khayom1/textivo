# Changelog

## v16 — animation and release integrity

### Fixed
- Corrected the automated repository check that still expected v14 asset URLs while the application and service worker were on v15.
- Synchronized HTML asset query strings, the application build identifier, the service-worker cache name, and precache URLs to v16.
- Fixed word-unit grouping in Motion Studio and standalone Animated HTML export: whitespace now separates word units while remaining attached to the adjacent word, including leading and trailing spaces.
- Preserved text content and inline formatting while splitting words for animation.

### Validation
- Extended repository integrity checks to verify the current release cache and both animation splitters.
- Static browser/device checks remain part of the manual testing checklist.


## v15 — Text Studio workflow

### Added
- Live character, word, and line counters.
- Find and replace: replace the first match or all matches in the text workspace.
- Text case tools: uppercase, lowercase, and title case.
- Text cleanup: normalize repeated spaces, remove empty lines, remove duplicate lines, and sort lines alphabetically.
- Fully multilingual labels and feedback for the new text tools in English, Russian, and Tajik.
- A complete user guide covering the text-only workflow, exports, project backups, privacy, and troubleshooting.
- Explicit creator attribution and GitHub profile links in the application, project metadata, and exported files.

### Improved
- Clarified that each editor box is a separate text line.
- Refocused product positioning on a text-only creative studio.
- Updated the PWA cache and asset versions to v15.

### Validation
- Repository integrity checks cover the new controls, text utilities, author attribution, and synchronized app/cache versions.
- Automated checks validate JavaScript syntax, static DOM references, duplicate IDs, manifest metadata, cache assets, and export safeguards.
- Browser rendering, touch selection, and export fidelity should still be checked manually on target devices.

## v14 and earlier

Previous project history is preserved in the Git commit history.
