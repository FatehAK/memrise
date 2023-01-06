<div align="center">
  <a href="https://memrise.pages.dev/">
    <img width="180" height="180" hspace="10"
      src="https://memrise.pages.dev/logo.svg" alt="memrise logo">
  </a>
  <h1>Memrise</h1>
  <img src="https://img.shields.io/github/package-json/v/fatehak/memrise" alt="version" />
<img src="https://img.shields.io/github/package-json/dependency-version/fatehak/memrise/dev/vite" alt="vite" />
<img src="https://img.shields.io/badge/pnpm-latest-yellow" alt="pnpm" />
  <img src="https://img.shields.io/github/actions/workflow/status/fatehak/memrise/lint_build_publish.yaml?branch=main" alt="build status" />
</div>

Memrise is a card matching game written in Vanilla Javascript with PWA support. Have a good time building your memory and don't forget to have fun :)

You can play the game at - https://memrise.pages.dev

### How to play

- Click on a card to flip and reveal its underlying symbol.
- Click on another card to find a match to the open card.
- Repeat the process until you find all the matching pairs.
- Once all matches are found the score and star rating will be displayed.
- Clicking on 'Play again?' will reset the game to its initial state

### Tech Used

- Vanilla Javascript
- Workbox for PWA support
- Vite for bundling
- Prettier, Stylelint, Eslint for formatting and linting
- Husky, lint-staged, commitlint for clean linted commits
- Github Actions for CI/CD
- Cloudflare Pages for publishing
