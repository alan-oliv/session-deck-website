# session-deck-website

Landing page for [Session Deck](https://github.com/alan-oliv/session-deck), a macOS app that finds, inspects and resumes your local Claude Code sessions.

Live at https://alan-oliv.github.io/session-deck-website/

Vite + React + Tailwind v4 + motion. Deploys to GitHub Pages on every push to `main`.

```sh
npm install
npm run dev
```

The demo video in `public/demo.mp4` is `docs/assets/session-full-deck.mp4` from the app repo, transcoded to 1280px:

```sh
ffmpeg -i session-full-deck.mp4 -vf scale=1280:-2 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -an public/demo.mp4
ffmpeg -ss 1.5 -i public/demo.mp4 -frames:v 1 -q:v 3 public/demo-poster.jpg
```
