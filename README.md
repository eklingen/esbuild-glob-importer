
# esbuild-glob-importer

ESBuild plugin to add globbing support to import statements.

## Installation

Add this to your `esbuild.config.js`:

```javascript
import globImporterPlugin from './esbuild.glob-importer.js'
plugins: [globImporterPlugin()],
```

## Usage

```javascript
import('components/**/*.js')
```
will get expanded to:
```javascript
import('components/button/button.js')
import('components/link/link.js')
import('components/video/video.js')
```

## Dependencies

This package requires ["fast-glob"](https://www.npmjs.com/package/fast-glob).

---

Copyright (c) 2024 Elco Klingen. MIT License.
