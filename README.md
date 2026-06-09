# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# High Performance Table Management App

A high-performance React table application built with Vite, TypeScript, Material React Table, React Query, and json-server.

The app displays a large dataset with virtualization, pagination, sorting, filtering, inline editing, CSV export, and bulk actions.

---

# Dataset Used

Spotify Tracks Dataset (~30,000 rows)

Why this dataset?

- Large enough to test virtualization and performance
- Includes text, numeric, and categorical fields
- Good fit for filtering, sorting, and searching

---

# Features Implemented

## Table & Performance

- Virtualized rendering
- Server-side pagination
- Server-side sorting
- Large dataset support
- Smooth scrolling

## Pagination

- Page size selector (25 / 50 / 100)
- Previous / next navigation
- Total records count

## Sorting

- Ascending / descending sorting
- Numeric and string sorting

## Filtering

- Global debounced search
- Genre dropdown filter
- Popularity range filter
- Combined filtering support

## Inline Editing

- Editable artist field
- Save / cancel actions
- Validation
- PATCH persistence using json-server

## Bulk Actions

- Row selection
- Export selected rows

## Column Management

- Column visibility toggle
- Column ordering
- Column resizing
- localStorage persistence

## CSV Export

- Export visible data to CSV
- Proper CSV escaping support

## UX & States

- Loading state
- Error state with retry
- Empty state
- Responsive layout

---

# Tech Stack

- React 18
- TypeScript
- Vite
- Material React Table
- TanStack React Query
- Axios
- json-server
- Vitest

---

# Project Setup

## Install Dependencies

```bash
npm install
```

---

# Environment Setup

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:3001
```

---

# Dataset Setup

Place Spotify CSV file inside:

```txt
/data/spotify.csv
```

Convert CSV to JSON:

```bash
node scripts/csv-to-json.cjs
```

This generates:

```txt
db.json
```

---

# Start json-server

```bash
npm run server
```

Server runs at:

```txt
http://localhost:3001
```

---

# Start Frontend

```bash
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

---

# Run Tests

```bash
npm run test
```

---

# Performance Optimizations

- Virtualized table rendering
- Server-side pagination
- Debounced search
- Memoized column definitions
- React Query caching

---

# Folder Structure

```txt
src/
├── api/
├── components/
├── hooks/
├── util/
├── App.tsx
```

---

# Known Limitations

- Bulk edit not implemented
- Full optimistic rollback can be improved
- Accessibility can be enhanced further

---

# Future Improvements

- Dark mode
- Infinite scrolling
- Saved filter presets
- Better accessibility
- Deployment on Vercel

---
