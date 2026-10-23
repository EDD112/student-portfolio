# Student Developer Portfolio

A single-page portfolio built with **React + Vite**, plain modern CSS (design tokens via CSS variables), and Lucide icons. Light/dark theme, responsive, accessible, and ready for Vercel Hobby hosting. No backend, database, or paid services.

## Folder structure

```
portfolio/
├─ index.html              # Page title, meta tags, no-flash theme script
├─ package.json            # Scripts and dependencies
├─ vite.config.js
├─ public/
│  ├─ favicon.svg          # Simple original mark
│  └─ images/              # Put your photo and project screenshots here
└─ src/
   ├─ main.jsx · App.jsx
   ├─ data/portfolio.js    # ← ALL your personal content lives here
   ├─ hooks/               # useTheme, useActiveSection, useReveal
   ├─ components/          # Navbar, Hero, About, Skills, Projects, Contact, Footer, ...
   └─ styles/              # global.css (tokens, themes) · components.css
```

## Run it locally (VS Code)

1. Install [Node.js](https://nodejs.org) 20.19 or newer (22 LTS recommended).
2. In VS Code: **File → Open Folder…** and choose the `portfolio` folder.
3. Open the terminal (**Terminal → New Terminal**) and run:

```bash
npm install        # install dependencies
npm run dev        # development server (http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # serve the production build locally
```

## Personalise it

Open `src/data/portfolio.js` and replace every `[BRACKETED]` placeholder. Leave `github`, `linkedin`, `resume`, `live`, `source`, or `image` as `''` and that button or image is simply hidden or replaced by a labelled placeholder.

- Profile photo: save to `public/images/profile.jpg`, set `photo: '/images/profile.jpg'`.
- Project screenshots: save to `public/images/`, set `image: '/images/project-1.png'` (about 1200×750, under ~300 KB).
- Résumé: put `resume.pdf` in `public/`, set `resume: '/resume.pdf'`.
- Also update the `<title>` and description in `index.html` with your name.
- Mark a project `status: 'completed'` only when it really is.

## Upload to GitHub

1. Create an empty repository on github.com (no README, no .gitignore).
2. In the project terminal:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`node_modules` and `dist` are already excluded by `.gitignore`.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account (Hobby plan is free).
2. Click **Add New… → Project** and import your repository.
3. Vercel auto-detects Vite. Confirm these settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Root Directory | `./` (the folder containing `package.json`) |

4. Click **Deploy**. Every later `git push` to `main` redeploys automatically.

## Final checklist

- [ ] Name, title, school, location, intro (`profile`)
- [ ] About paragraphs, interests, goals
- [ ] Skills (remove any you do not have)
- [ ] Real projects: descriptions, your contribution, tech, links, screenshots
- [ ] Email, GitHub, LinkedIn, résumé
- [ ] Profile photo (or keep the initials placeholder)
- [ ] `<title>` and meta description in `index.html`
- [ ] Run `npm run build` once more before pushing
