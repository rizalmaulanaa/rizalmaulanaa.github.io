// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://rizalmaulanaa.github.io",
  // Keep links from the old Jekyll site working.
  redirects: {
    "/cv": "/experience",
    "/portfolio": "/projects",
    "/publications": "/research",
    "/talks": "/teaching",
    "/publication/2021-10-24-Robustness-Prob-U-Net": "/research/robustness-prob-u-net",
    "/publication/2021-09-25-Evolution-WMHs": "/research/evolution-wmhs",
  },
});
