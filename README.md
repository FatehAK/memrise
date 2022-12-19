# Memrise

Memrise is a card matching game written in Vanilla Javascript with PWA support. Have a good time building your memory and don't forget to have fun :)

You can play the game at - https://memrise.pages.dev

### How to play

- Click on a card to flip and reveal its underlying symbol.
- Click on another card to find a match to the first card.
- When a match is found both cards stay opened.
- If no match is found both cards are bought to the initial state.
- Reapeat the process until you find all the matching pairs.
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
