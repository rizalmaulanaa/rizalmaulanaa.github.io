# rizalmaulanaa.github.io

Personal portfolio of Rizal Maulana — a neobrutalist "deck" built with [Astro](https://astro.build).
The home page is an overview of every section; each card opens a detail page.

## Run locally

Requires Node.js 22.23+ (24 LTS recommended).

```sh
npm install
npm run dev        # http://localhost:4321
```

`npm run build` writes the static site to `dist/`, and `npm run preview` serves that build.

## Updating content

All content is Markdown in [`content/`](content/). Edit a file, save, and the dev server reloads.

| Folder / file | What it holds | One file per… |
| --- | --- | --- |
| `content/profile.md` | Name, tagline, bio (the body), skills, education, links | — |
| `content/experience/` | Jobs (`type: work`) and campus organizations (`type: organization`) | role |
| `content/projects/` | Portfolio projects — file name becomes the URL (`/projects/<file-name>/`) | project |
| `content/publications/` | Papers — file name becomes the URL (`/research/<file-name>/`) | paper |
| `content/teaching/` | Courses taught or assisted | course |
| `content/talks/` | Talks and webinars | talk |

To add something, copy an existing file in the same folder and change it. The front matter
(the block between `---` lines) is checked at build time, so a missing or misspelled field shows
a clear error in the terminal. Notes:

- Experience dates use `YYYY-MM` (e.g. `start: 2024-03`); use `end: present` for a current role.
- Projects with `featured: true` appear on the home page Projects card.
- Projects sort by `year` (newest first, optional). Add `order: 1`, `order: 2`, … to pin projects to the top.
- A project split across several repos lists them under `repos:` (each with `name`, `role`, optional `url`,
  and `private: true` for private repos). `status:` (e.g. `PoC`, `Production`) shows on the card.
  See `content/projects/hcc-cctv-ai.md` for an example.
- Link a project to its paper with `paper: <publication-file-name>`, and the paper back with `project: <project-file-name>`.
- Images and files (like the CV PDF) go in `public/` and are referenced from `/`, e.g. `/files/CV_Rizal_Maulana.pdf`.

Section order and colours live in `src/lib/site.ts`; styles are in `src/styles/global.css`.

## Deploying

Pushing to `master` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to GitHub Pages. One-time setup: in the repo's **Settings → Pages**, set
**Source** to **GitHub Actions**.
