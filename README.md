# Gita Wisdom

A static, private reflection tool for finding a relevant Bhagavad Gita verse for the situation someone is living through.

## How retrieval works

- The app contains a small, hand-curated index of everyday-use verses and original plain-language summaries.
- On the first search, [Transformers.js](https://github.com/huggingface/transformers.js) loads `Xenova/bge-small-en-v1.5` in the browser.
- The verse index is embedded locally, the user’s situation is embedded locally, and cosine similarity returns the closest passages.
- The model and verse vectors are cached in the browser. No situation is sent to an API and there is no generative AI response.
- If the model cannot load (for example, while offline), the app falls back to deterministic keyword matching and says so.

The English copy is an original plain-language summary, not a quotation from a particular published translation. Sanskrit verse text is traditional Bhagavad Gita text.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal. `npm run check` runs TypeScript checks and `npm run build` creates the static site in `dist/`.

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds and deploys `dist/` whenever `main` changes. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once; future pushes to `main` deploy automatically at:

`https://megamind2600.github.io/gitawisdom/`

The Vite base path is enabled automatically in GitHub Actions so the project also works locally at `/`.
