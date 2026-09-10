#!/usr/bin/env node
/**
 * Precompute BGE-small-en-v1.5 embeddings for every verse at build time.
 *
 * Reads the compact client/src/data/verses.search.json manifest emitted by
 * scripts/build-verses.py, loads the local model weights from the npm package
 * @coree-ai/coree-model-bge-small-en-v1.5 (no Hugging Face network access), and
 * writes client/public/embeddings.json as a static asset.
 *
 * The browser never runs this script. At runtime it fetches embeddings.json and
 * only embeds the single user query.
 */
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const MODEL_ID = "Xenova/bge-small-en-v1.5";
const QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";
const MODEL_PACKAGE = "@coree-ai/coree-model-bge-small-en-v1.5";
const SNAPSHOT = "ea104dacec62c0de699686887e3f920caeb4f3e3";
const DIM = 384;
const BATCH_SIZE = 32;
const DECIMALS = 6;
const NORM_TOLERANCE = 1e-3;

const SEARCH_IN = path.join(ROOT, "client", "src", "data", "verses.search.json");
const EMBEDDINGS_OUT = path.join(ROOT, "client", "public", "embeddings.json");

// Resolve the model snapshot directory inside the npm package, so the build
// does not reach out to huggingface.co.
const require = createRequire(import.meta.url);
const MODEL_DIR = path.join(
  path.dirname(require.resolve(`${MODEL_PACKAGE}/package.json`)),
  "model",
  "models--Xenova--bge-small-en-v1.5",
  "snapshots",
  SNAPSHOT,
);

function round(value) {
  return Number(value.toFixed(DECIMALS));
}

function validateVector(vector, label) {
  if (!Array.isArray(vector) || vector.length !== DIM) {
    throw new Error(`Expected a ${DIM}-dim vector for ${label}.`);
  }
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (Math.abs(norm - 1) > NORM_TOLERANCE) {
    throw new Error(
      `Cosine normalization failed for ${label}: |v| = ${norm.toFixed(6)}, expected ~1.0.`,
    );
  }
}

const { env, pipeline } = await import("@huggingface/transformers");
env.allowLocalModels = true;
env.useBrowserCache = false;
env.allowRemoteModels = false;
env.cacheDir = path.join(ROOT, ".hf-cache");

const verses = JSON.parse(readFileSync(SEARCH_IN, "utf-8"));
if (!Array.isArray(verses) || verses.length === 0) {
  throw new Error(`No verses found in ${SEARCH_IN}.`);
}
console.log(`Embedding ${verses.length} verses with ${MODEL_ID} (fp32, local).`);

const extractor = await pipeline("feature-extraction", MODEL_DIR, {
  dtype: "fp32",
});

const vectors = [];
for (let start = 0; start < verses.length; start += BATCH_SIZE) {
  const batch = verses.slice(start, start + BATCH_SIZE);
  const output = await extractor(
    batch.map((entry) => entry.searchText),
    { pooling: "mean", normalize: true },
  );
  const rows = output.tolist();
  for (let index = 0; index < batch.length; index += 1) {
    const verse = batch[index];
    const row = Array.from(rows[index], Number);
    validateVector(row, `verse ${verse.id}`);
    vectors.push(row.map(round));
  }
  const done = Math.min(start + BATCH_SIZE, verses.length);
  console.log(`  embedded ${done}/${verses.length} verses`);
}

if (vectors.length !== verses.length) {
  throw new Error(
    `Embedding count mismatch: got ${vectors.length}, expected ${verses.length}.`,
  );
}

const payload = {
  model: MODEL_ID,
  dim: DIM,
  count: vectors.length,
  queryPrefix: QUERY_PREFIX,
  verseIds: verses.map((entry) => entry.id),
  vectors,
};

mkdirSync(path.dirname(EMBEDDINGS_OUT), { recursive: true });
writeFileSync(EMBEDDINGS_OUT, JSON.stringify(payload));

const sizeMb = (Buffer.byteLength(JSON.stringify(payload)) / (1024 * 1024)).toFixed(2);
console.log(`Wrote ${vectors.length} ${DIM}-dim vectors to ${EMBEDDINGS_OUT} (${sizeMb} MB).`);
