import { FormEvent, type ReactNode, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  Cpu,
  Heart,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { CHAPTER_TITLES } from "./data/verses";
import {
  getInstantResults,
  searchVerses,
  type RetrievalStatus,
  type SearchMethod,
  type SearchResult,
} from "./lib/retrieval";

const EXAMPLE_PROMPTS = [
  "I feel anxious about a decision and keep imagining the worst outcome.",
  "I am exhausted from work and have lost my sense of purpose.",
  "Someone criticized me and I cannot stop replaying it in my mind.",
  "I am grieving a loss and looking for something steady to hold on to.",
];

type SearchState = {
  results: SearchResult[];
  method: SearchMethod;
  warning?: string;
};

function App() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState<RetrievalStatus>({
    stage: "ready",
    message: "Ready when you are.",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchError, setSearchError] = useState("");
  const requestNumberRef = useRef(0);
  const resultsRef = useRef<HTMLElement>(null);

  const runSearch = async (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setSearchError("Tell the Gita a little about what you are living through.");
      return;
    }

    const currentRequest = requestNumberRef.current + 1;
    requestNumberRef.current = currentRequest;
    setQuery(trimmedValue);
    setActiveQuery(trimmedValue);
    setSearchError("");
    setIsSearching(true);
    setIsPreview(true);
    setStatus({
      stage: "searching",
      message: "Finding a close passage…",
    });

    // Show a deterministic preview immediately while the local model warms up.
    // It is replaced by semantic results as soon as the model is ready.
    setSearchState({
      results: getInstantResults(trimmedValue),
      method: "keyword",
    });
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const response = await searchVerses(trimmedValue, setStatus);
    if (currentRequest !== requestNumberRef.current) return;

    setSearchState(response);
    setIsPreview(false);
    setIsSearching(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runSearch(query);
  };

  const handleExample = (example: string) => {
    setMobileMenuOpen(false);
    void runSearch(example);
  };

  const handleReset = () => {
    requestNumberRef.current += 1;
    setQuery("");
    setActiveQuery("");
    setSearchState(null);
    setSearchError("");
    setIsPreview(false);
    setStatus({ stage: "ready", message: "Ready when you are." });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectRelated = (result: SearchResult) => {
    setSearchState((current) =>
      current
        ? {
            ...current,
            results: [
              result,
              ...current.results.filter((item) => item.verse.id !== result.verse.id),
            ],
          }
        : current,
    );
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const hasResults = Boolean(searchState?.results.length);
  const primaryResult = searchState?.results[0];
  const relatedResults = searchState?.results.slice(1, 4) ?? [];

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Gita Wisdom home">
            <span className="brand-mark" aria-hidden="true">
              <Leaf size={18} strokeWidth={2.1} />
            </span>
            <span>
              <strong>Gita</strong> Wisdom
            </span>
          </a>

          <nav className={`site-nav ${mobileMenuOpen ? "is-open" : ""}`}>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
              How it works
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About the practice
            </a>
            <button className="nav-prompt" onClick={() => handleExample(EXAMPLE_PROMPTS[0])}>
              Try a prompt <ArrowRight size={15} />
            </button>
          </nav>

          <button
            className="menu-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span /> A quiet place for a noisy day</p>
              <h1>
                A little wisdom
                <em> for this moment.</em>
              </h1>
              <p className="hero-intro">
                Share what is on your mind. Find a verse from the Bhagavad Gita
                that meets you there — with its meaning, not a prescription.
              </p>
              <div className="hero-trust-row" aria-label="Privacy promises">
                <span><LockKeyhole size={14} /> Private by design</span>
                <span><Sparkles size={14} /> No generated answers</span>
              </div>
            </div>

            <div className="hero-orbit" aria-hidden="true">
              <div className="orbit-ring orbit-ring-back" />
              <div className="orbit-ring orbit-ring-front" />
              <div className="orbit-dot orbit-dot-one" />
              <div className="orbit-dot orbit-dot-two" />
              <div className="orbit-core">
                <span>ॐ</span>
                <small>योगः<br />समत्वम्</small>
              </div>
            </div>
          </div>
        </section>

        <section className="search-section" id="how-it-works" aria-labelledby="search-heading">
          <div className="content-width">
            <div className="section-kicker"><span>01</span> Begin with your own words</div>
            <div className="search-heading-row">
              <div>
                <h2 id="search-heading">What are you carrying today?</h2>
                <p className="section-subtitle">
                  There is no right way to ask. A sentence, a question, or a feeling is enough.
                </p>
              </div>
              <div className="local-badge">
                <span className="status-dot" />
                <span>Search happens on your device</span>
              </div>
            </div>

            <form className="search-card" onSubmit={handleSubmit}>
              <div className="search-card-topline">
                <span className="search-icon-wrap"><Search size={19} /></span>
                <span className="search-card-label">Your situation</span>
                <span className="search-card-hint">{query.length}/500</span>
              </div>
              <textarea
                value={query}
                maxLength={500}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (searchError) setSearchError("");
                }}
                placeholder="For example: I keep comparing my life to everyone else’s and feel behind…"
                aria-label="Describe what you are going through"
                rows={4}
              />
              <div className="search-card-bottom">
                <span className="search-note"><ShieldCheck size={15} /> Your situation is not saved or sent to a server.</span>
                <button className="primary-button" type="submit" disabled={isSearching && !query.trim()}>
                  {isSearching ? <LoaderCircle className="spin" size={17} /> : <Search size={17} />}
                  {isSearching ? "Searching…" : "Find my verse"}
                </button>
              </div>
            </form>
            {searchError && <p className="form-error" role="alert">{searchError}</p>}

            <div className="example-row">
              <span className="example-label">Try a prompt</span>
              <div className="example-chips">
                {EXAMPLE_PROMPTS.slice(0, 3).map((example) => (
                  <button key={example} onClick={() => handleExample(example)}>
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {hasResults && primaryResult && (
          <section className="results-section" ref={resultsRef} aria-labelledby="results-heading">
            <div className="content-width">
              <div className="results-toolbar">
                <div>
                  <div className="section-kicker"><span>02</span> A verse for your reflection</div>
                  <h2 id="results-heading">A place to begin</h2>
                </div>
                <button className="reset-button" onClick={handleReset}>
                  <RotateCcw size={15} /> Start over
                </button>
              </div>

              <div className="query-echo">
                <span>“</span>
                <p>{activeQuery}</p>
                <span>”</span>
              </div>

              <div className="retrieval-status" aria-live="polite">
                <div className="retrieval-status-main">
                  {isSearching ? <LoaderCircle className="spin" size={15} /> : <Cpu size={15} />}
                  <span>{status.message}</span>
                </div>
                <div className="retrieval-status-detail">
                  {isPreview ? "Quick preview while the local model warms up" : searchState?.method === "semantic" ? "BGE-small semantic match" : "Built-in keyword match"}
                  {status.progress !== undefined && isSearching && (
                    <span className="progress-value">{status.progress}%</span>
                  )}
                </div>
              </div>

              {searchState?.warning && <p className="fallback-note">{searchState.warning}</p>}

              <div className="results-grid">
                <VerseCard result={primaryResult} primary />
                <aside className="related-panel" aria-labelledby="related-heading">
                  <div className="related-heading">
                    <div>
                      <p className="mini-label">Also nearby</p>
                      <h3 id="related-heading">Related wisdom</h3>
                    </div>
                    <span className="related-count">{relatedResults.length}</span>
                  </div>
                  <div className="related-list">
                    {relatedResults.map((result) => (
                      <RelatedVerseCard
                        key={result.verse.id}
                        result={result}
                        onSelect={() => selectRelated(result)}
                      />
                    ))}
                  </div>
                  <p className="related-footnote">
                    These are the closest passages in this small, hand-curated index — not generated recommendations.
                  </p>
                </aside>
              </div>
            </div>
          </section>
        )}

        {!hasResults && (
          <section className="quiet-section">
            <div className="content-width">
              <div className="quiet-section-heading">
                <div>
                  <div className="section-kicker"><span>02</span> Before you begin</div>
                  <h2>Nothing to perform here.</h2>
                </div>
                <p>Put the polished version away. The Gita meets a real question better than a perfect one.</p>
              </div>
              <div className="principles-grid">
                <PrincipleCard
                  icon={<CircleHelp size={20} />}
                  number="01"
                  title="Say what is true"
                  text="The search understands themes and meaning, so you can write naturally instead of guessing the right keywords."
                />
                <PrincipleCard
                  icon={<Cpu size={20} />}
                  number="02"
                  title="Let retrieval do less"
                  text="There is no chatbot inventing an answer. A fixed verse index finds the passages closest to your situation."
                />
                <PrincipleCard
                  icon={<Heart size={20} />}
                  number="03"
                  title="Keep your agency"
                  text="A verse can be a companion for reflection, not a command. Take what resonates and leave the rest."
                />
              </div>
            </div>
          </section>
        )}

        <section className="about-section" id="about">
          <div className="content-width about-inner">
            <div className="about-quote-mark">“</div>
            <div className="about-copy">
              <p className="eyebrow eyebrow-light"><span /> About the practice</p>
              <h2>Ancient words.<br /><em>A present-tense practice.</em></h2>
              <p>
                Gita Wisdom is a small, honest tool for meeting the Bhagavad Gita
                where life is actually happening. Its meanings are plain-language
                editorial summaries, designed to open a door to reflection — not to
                replace study, a teacher, or care from a professional.
              </p>
              <div className="about-details">
                <div><LockKeyhole size={17} /><span><strong>Private</strong> Your situation stays in this browser.</span></div>
                <div><BookOpen size={17} /><span><strong>Grounded</strong> A curated index of 40+ traditional verses.</span></div>
                <div><Cpu size={17} /><span><strong>Deterministic</strong> No AI-generated response or advice.</span></div>
              </div>
            </div>
            <div className="about-emblem" aria-hidden="true">
              <div className="emblem-inner">ॐ</div>
              <div className="emblem-line" />
              <span>सत्यम् · शिवम् · सुन्दरम्</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-width footer-inner">
          <div className="footer-brand"><span className="brand-mark"><Leaf size={16} /></span><span><strong>Gita</strong> Wisdom</span></div>
          <p>Made for a moment of reflection. <span>ॐ</span></p>
          <a href="#top">Back to top <ArrowDown size={14} /></a>
        </div>
      </footer>
    </div>
  );
}

function PrincipleCard({
  icon,
  number,
  title,
  text,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="principle-card">
      <div className="principle-topline"><span className="principle-icon">{icon}</span><span>{number}</span></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function VerseCard({ result, primary }: { result: SearchResult; primary?: boolean }) {
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [copied, setCopied] = useState(false);
  const item = result.verse;

  const copyText = async () => {
    const text = `${item.sanskrit}\n\nBhagavad Gita ${item.chapter}.${item.verse}\n${item.meaning}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className={`verse-card ${primary ? "is-primary" : ""}`}>
      <div className="verse-card-header">
        <div>
          <p className="verse-reference">Chapter {item.chapter} <span>·</span> Verse {item.verse}</p>
          <p className="chapter-name">{CHAPTER_TITLES[item.chapter]}</p>
        </div>
        <div className="match-pill"><span /> Closest match</div>
      </div>
      <div className="verse-card-body">
        <h3>{item.title}</h3>
        <div className="sanskrit-block">
          <p className="sanskrit-text" lang="sa">{item.sanskrit}</p>
          <button
            className="text-toggle"
            onClick={() => setShowTransliteration((shown) => !shown)}
            aria-expanded={showTransliteration}
          >
            {showTransliteration ? "Hide transliteration" : "Read transliteration"}
            <ChevronDown className={showTransliteration ? "rotate" : ""} size={15} />
          </button>
          {showTransliteration && <p className="transliteration" lang="sa-Latn">{item.transliteration}</p>}
        </div>
        <div className="meaning-block">
          <p className="block-label">In plain language</p>
          <p className="meaning-text">{item.meaning}</p>
        </div>
        <div className="reflection-block">
          <div className="reflection-label"><Sparkles size={14} /> A door to reflection</div>
          <p>{item.reflection}</p>
        </div>
      </div>
      <div className="verse-card-footer">
        <div className="theme-list">
          {item.themes.slice(0, 3).map((theme) => <span key={theme}>{theme}</span>)}
        </div>
        <button className="copy-button" onClick={copyText} aria-label="Copy verse and meaning">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Keep this verse"}
        </button>
      </div>
    </article>
  );
}

function RelatedVerseCard({ result, onSelect }: { result: SearchResult; onSelect: () => void }) {
  const item = result.verse;
  return (
    <button className="related-card" onClick={onSelect}>
      <div className="related-card-topline">
        <span>Gita {item.chapter}.{item.verse}</span>
        <ArrowRight size={15} />
      </div>
      <h4>{item.title}</h4>
      <p>{item.meaning}</p>
      <div className="related-themes">
        {item.themes.slice(0, 2).map((theme) => <span key={theme}>{theme}</span>)}
      </div>
    </button>
  );
}

export default App;
