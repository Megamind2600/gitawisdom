# Gita Wisdom

A static, private reflection tool for finding a relevant Bhagavad Gita verse for the situation someone is living through.

## How retrieval works

- The app ships all 700 verses of the Bhagavad Gita (18 chapters) with an English translation by Swami Adidevananda, sourced from the MIT-licensed [gita/gita](https://github.com/gita/gita) dataset.
- Verse embeddings are precomputed at build time with `Xenova/bge-small-en-v1.5` and served as a static file (`embeddings.json`), so there is no first-run indexing in the browser.
- On the first search, [Transformers.js](https://github.com/huggingface/transformers.js) loads `Xenova/bge-small-en-v1.5` in the browser to encode only the user’s query, then cosine similarity returns the closest passages.
- The model weights are cached by the browser and the verse vectors are a static asset. No situation is sent to an API and there is no generative AI response.
- If the model or embeddings cannot load (for example, while offline), the app falls back to deterministic keyword matching and says so.

The English translation is Swami Adidevananda's, from the MIT-licensed [gita/gita](https://github.com/gita/gita) dataset — not Prabhupada/BBT, which remains under copyright. Sanskrit verse text is traditional Bhagavad Gita text.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal. `npm run check` runs TypeScript checks and `npm run build` creates the static site in `dist/`.

`npm run build` first runs the `prebuild` step, which regenerates `client/src/data/verses.ts` and precomputes `client/public/embeddings.json` from the local model weights (no Hugging Face access needed). Run `npm run build:data` to regenerate just those two artifacts.

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds and deploys `dist/` whenever `main` changes. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once; future pushes to `main` deploy automatically at:

`https://megamind2600.github.io/gitawisdom/`

The Vite base path is enabled automatically in GitHub Actions so the project also works locally at `/`.
