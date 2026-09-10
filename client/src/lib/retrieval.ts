import { VERSES, type GitaVerse } from "../data/verses";

export const MODEL_ID = "Xenova/bge-small-en-v1.5";
const QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";
const CACHE_KEY = "gita-wisdom:bge-small-en-v1.5:verse-index:v2";

export type SearchMethod = "semantic" | "keyword";

export interface SearchResult {
  verse: GitaVerse;
  score: number;
}

export interface RetrievalStatus {
  stage: "loading-model" | "indexing" | "searching" | "ready" | "fallback";
  message: string;
  progress?: number;
}

export interface SearchResponse {
  results: SearchResult[];
  method: SearchMethod;
  warning?: string;
}

type Extractor = (
  texts: string | string[],
  options?: { pooling?: "mean" | "cls" | "last"; normalize?: boolean },
) => Promise<unknown>;

type StatusCallback = (status: RetrievalStatus) => void;

let extractorPromise: Promise<Extractor> | null = null;
let corpusVectorsPromise: Promise<number[][]> | null = null;

const STOP_WORDS = new Set([
  "a",
  "about",
  "after",
  "again",
  "all",
  "am",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "being",
  "but",
  "by",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "feel",
  "feeling",
  "get",
  "getting",
  "had",
  "has",
  "have",
  "having",
  "how",
  "i",
  "if",
  "im",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "me",
  "my",
  "of",
  "on",
  "or",
  "so",
  "that",
  "the",
  "their",
  "them",
  "there",
  "this",
  "to",
  "too",
  "very",
  "was",
  "we",
  "what",
  "when",
  "with",
  "would",
  "you",
  "your",
]);

function report(callback: StatusCallback | undefined, status: RetrievalStatus): void {
  callback?.(status);
}

function tokenize(text: string): string[] {
  return text
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function getVectorRows(output: unknown): number[][] {
  const tensor = output as {
    tolist?: () => unknown;
    data?: ArrayLike<number>;
    dims?: number[];
  };

  if (typeof tensor.tolist === "function") {
    const listed = tensor.tolist();
    if (Array.isArray(listed) && listed.length > 0) {
      if (typeof listed[0] === "number") {
        return [listed as number[]];
      }
      return (listed as unknown[]).map((row) =>
        Array.from(row as ArrayLike<number>, Number),
      );
    }
  }

  if (tensor.data && tensor.dims?.length) {
    const data = Array.from(tensor.data, Number);
    const width = tensor.dims[tensor.dims.length - 1];
    const rows: number[][] = [];
    for (let start = 0; start < data.length; start += width) {
      rows.push(data.slice(start, start + width));
    }
    return rows;
  }

  throw new Error("The local embedding model returned an unreadable vector.");
}

async function embed(extractor: Extractor, texts: string[]): Promise<number[][]> {
  const output = await extractor(texts, { pooling: "mean", normalize: true });
  return getVectorRows(output);
}

async function loadExtractor(
  onStatus?: StatusCallback,
): Promise<Extractor> {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      report(onStatus, {
        stage: "loading-model",
        message: "Loading the local semantic model…",
        progress: 0,
      });

      // This import is intentionally lazy. The model and its WASM runtime are
      // only downloaded when someone asks for a verse, never from a server.
      const { env, pipeline } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      env.useBrowserCache = true;

      const extractor = await pipeline("feature-extraction", MODEL_ID, {
        dtype: "q8",
        progress_callback: (progress: {
          status?: string;
          progress?: number;
        }) => {
          if (progress.status === "progress") {
            report(onStatus, {
              stage: "loading-model",
              message: "Downloading the local semantic model…",
              progress: Math.round(progress.progress ?? 0),
            });
          }
        },
      });

      report(onStatus, {
        stage: "loading-model",
        message: "Local model ready. Preparing the verse index…",
        progress: 100,
      });
      return extractor as unknown as Extractor;
    })().catch((error) => {
      // Allow a later search to retry after a transient network or browser error.
      extractorPromise = null;
      throw error;
    });
  }

  return extractorPromise;
}

function readCachedVectors(): number[][] | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.length === VERSES.length &&
      parsed.every(
        (row) =>
          Array.isArray(row) &&
          row.length > 0 &&
          row.every((value) => typeof value === "number"),
      )
    ) {
      return parsed as number[][];
    }
  } catch {
    // Private browsing and full storage are both fine; retrieval still works.
  }
  return null;
}

function writeCachedVectors(vectors: number[][]): void {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(vectors));
  } catch {
    // The index is an optimization, not a requirement.
  }
}

async function getCorpusVectors(
  extractor: Extractor,
  onStatus?: StatusCallback,
): Promise<number[][]> {
  const cached = readCachedVectors();
  if (cached) return cached;

  if (!corpusVectorsPromise) {
    corpusVectorsPromise = (async () => {
      report(onStatus, {
        stage: "indexing",
        message: `Indexing ${VERSES.length} verses in this browser…`,
        progress: 0,
      });
      const vectors = await embed(
        extractor,
        VERSES.map((item) => item.searchText),
      );
      if (vectors.length !== VERSES.length) {
        throw new Error("The local model could not index every verse.");
      }
      writeCachedVectors(vectors);
      report(onStatus, {
        stage: "indexing",
        message: "Verse index ready.",
        progress: 100,
      });
      return vectors;
    })().catch((error) => {
      // A failed index should not permanently disable retries for this tab.
      corpusVectorsPromise = null;
      throw error;
    });
  }

  return corpusVectorsPromise;
}

function cosineSimilarity(left: number[], right: number[]): number {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  const length = Math.min(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] ** 2;
    rightMagnitude += right[index] ** 2;
  }

  if (!leftMagnitude || !rightMagnitude) return 0;
  return dot / Math.sqrt(leftMagnitude * rightMagnitude);
}

function lexicalSearch(query: string): SearchResult[] {
  const queryTerms = tokenize(query);
  if (!queryTerms.length) {
    return VERSES.slice(0, 5).map((item, index) => ({
      verse: item,
      score: 0.5 - index * 0.01,
    }));
  }

  const normalizedQuery = query.toLocaleLowerCase();
  return VERSES.map((item, index) => {
    const searchable = item.searchText.toLocaleLowerCase();
    const documentTerms = new Set(tokenize(item.searchText));
    let score = 0;

    for (const term of queryTerms) {
      if (documentTerms.has(term)) score += 1;
      else if (
        Array.from(documentTerms).some(
          (documentTerm) =>
            documentTerm.startsWith(term) || term.startsWith(documentTerm),
        )
      ) {
        score += 0.35;
      }
    }

    if (searchable.includes(normalizedQuery)) score += 2;
    if (item.title.toLocaleLowerCase().includes(normalizedQuery)) score += 1;

    return { verse: item, score: score / Math.max(queryTerms.length, 1) + (VERSES.length - index) / 100000 };
  })
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);
}

export function getInstantResults(query: string): SearchResult[] {
  return lexicalSearch(query);
}

export async function searchVerses(
  query: string,
  onStatus?: StatusCallback,
): Promise<SearchResponse> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return { results: lexicalSearch(""), method: "keyword" };
  }

  try {
    report(onStatus, {
      stage: "searching",
      message: "Finding the closest passages…",
    });
    const extractor = await loadExtractor(onStatus);
    const corpusVectors = await getCorpusVectors(extractor, onStatus);
    const [queryVector] = await embed(extractor, [
      `${QUERY_PREFIX}${trimmedQuery}`,
    ]);

    const results = VERSES.map((item, index) => ({
      verse: item,
      score: cosineSimilarity(queryVector, corpusVectors[index]),
    }))
      .sort((left, right) => right.score - left.score)
      .slice(0, 5);

    report(onStatus, {
      stage: "ready",
      message: "Matched locally with semantic search.",
    });
    return { results, method: "semantic" };
  } catch (error) {
    console.warn("Local semantic search unavailable; using keyword search.", error);
    report(onStatus, {
      stage: "fallback",
      message: "Semantic model unavailable — using the built-in verse index.",
    });
    return {
      results: lexicalSearch(trimmedQuery),
      method: "keyword",
      warning:
        "The model could not load in this browser, so this result uses deterministic keyword matching instead.",
    };
  }
}

export function clearSearchCache(): void {
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore storage restrictions.
  }
  corpusVectorsPromise = null;
}
