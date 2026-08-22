# Danidu Kavishan — Developer Portfolio

A responsive personal portfolio for showcasing my software projects, technical skills, experience, and résumé. The site is built with React and Vite, with portfolio content kept in JSON files so it can be updated without changing component code.

[View the live website](https://danidukavishan.site/) · [GitHub profile](https://github.com/dananjaya2002) · [LinkedIn](https://www.linkedin.com/in/danidu-kavishan-a2b31126b/)

## Features

- Responsive single-page layout
- Light and dark themes with the preference saved locally
- Featured-project view with category filters
- Scroll reveal animations
- Embedded résumé preview and PDF download
- Accessible keyboard navigation and résumé dialog
- Contact and social links
- JSON-driven portfolio content

## Tech stack

- [React](https://react.dev/) for the user interface
- [Vite](https://vite.dev/) for local development and production builds
- [Lucide React](https://lucide.dev/) for icons
- CSS for the responsive layout, themes, and animations

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/dananjaya2002/KavishanPortfolio.git
cd KavishanPortfolio
npm install
npm run dev
```

Vite will print the local development URL in the terminal, normally `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
KavishanPortfolio/
├── public/
│   ├── documents/          # Résumé PDF
│   └── favicon.svg
├── src/
│   ├── assets/             # Project images and other media
│   ├── components/         # Reusable React components
│   ├── data/               # Portfolio content in JSON
│   ├── App.jsx             # Page composition and theme state
│   ├── iconMap.jsx         # Lucide icon mapping
│   ├── main.jsx            # React entry point
│   └── styles.css          # Global styles and responsive layout
├── index.html
├── package.json
└── vite.config.js
```

## Customizing the portfolio

Most content can be changed in `src/data/`:

| File | Content |
| --- | --- |
| `profile.json` | Name, introduction, navigation, social links, and résumé path |
| `projects.json` | Project cards, categories, tags, images, and links |
| `skills.json` | Skill groups and technologies |
| `experience.json` | Experience timeline and achievements |
| `about.json` | Biography, highlights, and interests |
| `contact.json` | Contact details and social profiles |

Place project media in `src/assets/` and public files such as a résumé in `public/`. When adding an icon name to a data file, ensure it is also exported through `src/iconMap.jsx`.

## Production build

```bash
npm run build
npm run preview
```

The generated `dist/` directory can be deployed to any static hosting service.

## Contact

**Danidu Kavishan** — Software Developer based in Colombo, Sri Lanka

- Email: [kavishandananjaya2002@gmail.com](mailto:kavishandananjaya2002@gmail.com)
- Website: [danidukavishan.site](https://danidukavishan.site/)
- GitHub: [dananjaya2002](https://github.com/dananjaya2002)
