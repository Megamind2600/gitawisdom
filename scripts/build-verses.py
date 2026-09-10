#!/usr/bin/env python3
"""Build client/src/data/verses.ts from the open Bhagavad Gita JSON dataset.

Source: https://github.com/gita/gita (MIT-licensed).
Translation: Swami Adidevananda.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = Path("/tmp/gita-data/data")
OUT = ROOT / "client" / "src" / "data" / "verses.ts"
# Compact {id, searchText} manifest for the Node-side embedding precompute.
# Node can't import the .ts module directly, so this mirrors the exact
# searchText string the `verse()` helper builds at runtime in verses.ts.
SEARCH_OUT = ROOT / "client" / "src" / "data" / "verses.search.json"

# Canonical chapter titles used by the UI (IAST transliteration).
CHAPTER_TITLES = {
    1: "Arjuna Viṣāda Yoga",
    2: "Sāṅkhya Yoga",
    3: "Karma Yoga",
    4: "Jñāna Karma Sannyāsa Yoga",
    5: "Karma Sannyāsa Yoga",
    6: "Dhyāna Yoga",
    7: "Jñāna Vijñāna Yoga",
    8: "Akṣara Brahma Yoga",
    9: "Rāja Vidyā Rāja Guhya Yoga",
    10: "Vibhūti Yoga",
    11: "Viśvarūpa Darśana Yoga",
    12: "Bhakti Yoga",
    13: "Kṣhetra-Kṣhetrajña Vibhāga Yoga",
    14: "Guṇa Traya Vibhāga Yoga",
    15: "Puruṣottama Yoga",
    16: "Daivāsura Sampad Vibhāga Yoga",
    17: "Śraddhā Traya Vibhāga Yoga",
    18: "Mokṣa Sannyāsa Yoga",
}

# Lightweight thematic hints per chapter to seed themes/keywords for search.
CHAPTER_THEMES = {
    1: (["conflict", "grief", "doubt", "dilemma", "sorrow"],
        ["war", "family", "confusion", "despondency", "loss"]),
    2: (["self", "soul", "duty", "wisdom", "equanimity", "change"],
        ["death", "rebirth", "eternity", "courage", "detachment", "knowledge"]),
    3: (["action", "duty", "karma", "sacrifice", "purpose"],
        ["work", "responsibility", "service", "yajna", "selflessness"]),
    4: (["knowledge", "renunciation", "tradition", "wisdom"],
        ["jnana", "sacrifice", "teacher", "liberation", "divine"]),
    5: (["renunciation", "action", "detachment", "peace"],
        ["sannyasa", "equanimity", "freedom", "balance"]),
    6: (["meditation", "discipline", "mind", "self-mastery"],
        ["dhyana", "focus", "practice", "stillness", "yoga"]),
    7: (["knowledge", "devotion", "divine", "wisdom"],
        ["jnana", "vijnana", "krishna", "refuge", "faith"]),
    8: (["death", "eternal", "liberation", "remembrance"],
        ["imperishable", "brahman", "departure", "attainment"]),
    9: (["devotion", "sovereign", "secret", "grace", "trust"],
        ["raja vidya", "raja guhya", "surrender", "worship", "abandon"]),
    10: (["divine", "glories", "majesty", "manifestation"],
        ["opulence", "vibhuti", "wonders", "infinite", "creation"]),
    11: (["vision", "cosmic", "awe", "form", "surrender"],
        ["vishvarupa", "universal", "terror", "wonder", "arjuna"]),
    12: (["devotion", "love", "bhakti", "faith"],
        ["surrender", "worship", "devotee", "steadfastness"]),
    13: (["field", "knower", "nature", "consciousness"],
        ["prakriti", "purusha", "body", "witness", "discernment"]),
    14: (["gunas", "modes", "nature", "transcendence"],
        ["sattva", "rajas", "tamas", "illumination", "freedom"]),
    15: (["supreme", "person", "tree", "liberation"],
        ["purushottama", "ashvattha", "attachment", "refuge"]),
    16: (["divine", "demonic", "virtue", "vice"],
        ["daivi", "asuri", "heritage", "character", "tendencies"]),
    17: (["faith", "threefold", "worship", "food"],
        ["shraddha", "sattvic", "rajasic", "tamasic", "austerity"]),
    18: (["renunciation", "liberation", "surrender", "conclusion"],
        ["moksha", "tyaga", "fruit", "duty", "final", "grace"]),
}


def clean_sanskrit(text: str) -> str:
    """Strip trailing verse markers like '।।2.47।।' and normalize spacing."""
    text = text.replace("\r", "").strip()
    # Remove line-internal markers like ||ch.v|| or ।।ch.v।। at the end.
    text = re.sub(r"\s*[|।]{1,2}\s*\d+\.\d+\s*[|।]{1,2}\s*$", "", text)
    # Collapse blank lines and trim.
    lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
    return "\n".join(lines)


def clean_transliteration(text: str) -> str:
    text = text.replace("\r", "").strip()
    lines = [ln.strip().rstrip("|") for ln in text.split("\n") if ln.strip()]
    out = []
    for ln in lines:
        if not ln.endswith(("|", "||")):
            ln = ln.rstrip() + " |"
        out.append(ln)
    return "\n".join(out)


def clean_translation(text: str) -> str:
    text = (text or "").replace("\r", " ").strip()
    # Remove leading markers like "।।1.1।।"
    text = re.sub(r"^[|।\s\d\.]+", "", text).strip()
    # Collapse whitespace.
    text = re.sub(r"\s+", " ", text)
    return text


def first_sentence(text: str) -> str:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return parts[0] if parts else text.strip()


def ts_escape(value: str) -> str:
    return (
        value.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace("`", "\\`")
        .replace("${", "\\${")
    )


def ts_string(value: str, *, indent: str = "      ") -> str:
    """Format a possibly multi-line string as a TypeScript template literal."""
    if "\n" in value:
        lines = value.split("\n")
        body = ("\\n" + indent).join(ts_escape(lines[0]) if i == 0 else ts_escape(ln) for i, ln in enumerate(lines))
        # We'll produce a multiline template literal using explicit \n joins for single-line readability safety.
        return '"' + ts_escape(value.replace("\n", "\\n")) + '"'
    return '"' + ts_escape(value) + '"'


def main() -> None:
    with open(DATA_DIR / "verse.json", encoding="utf-8") as f:
        raw_verses = json.load(f)
    with open(DATA_DIR / "translation.json", encoding="utf-8") as f:
        translations = json.load(f)

    # Map verse_id -> Adidevananda English translation.
    adidev = {
        t["verse_id"]: t["description"]
        for t in translations
        if t.get("lang") == "english" and t.get("authorName") == "Swami Adidevananda"
    }

    # Build entries sorted in the traditional reading order (by verse_order).
    raw_verses.sort(key=lambda v: (v["chapter_number"], v["verse_number"]))

    entries = []
    seen_ids = set()
    for v in raw_verses:
        ch = v["chapter_number"]
        vnum = v["verse_number"]
        vid = f"{ch}.{vnum}"
        if vid in seen_ids:
            continue
        seen_ids.add(vid)

        sanskrit = clean_sanskrit(v.get("text", ""))
        translit = clean_transliteration(v.get("transliteration", ""))
        meaning = clean_translation(adidev.get(v["id"], ""))
        if not meaning:
            meaning = "(Translation unavailable.)"
        # A compact reflection: pull the first sentence of the translation and
        # frame it as a gentle invitation, so every verse has a reflection line
        # without inventing commentary.
        hook = first_sentence(meaning)
        reflection = (
            f"Pause with this line and see where it touches the situation you are carrying today."
        )
        # Derive a working title from the first line of meaning.
        title = hook.rstrip(".!?")
        if len(title) > 72:
            title = title[:69].rstrip() + "…"

        themes, keywords = CHAPTER_THEMES.get(ch, ([], []))
        # Add chapter name as a keyword for broader matching.
        chapter_hint = CHAPTER_TITLES[ch].lower().split()[0] if ch in CHAPTER_TITLES else ""
        if chapter_hint and chapter_hint not in keywords:
            keywords = list(keywords) + [chapter_hint]

        entries.append(
            {
                "id": vid,
                "chapter": ch,
                "verse": str(vnum),
                "title": title,
                "sanskrit": sanskrit,
                "transliteration": translit,
                "meaning": meaning,
                "reflection": reflection,
                "themes": themes[:4],
                "keywords": keywords[:8],
            }
        )

    # Emit the TypeScript file.
    lines: list[str] = []
    lines.append("export interface GitaVerse {")
    lines.append("  id: string;")
    lines.append("  chapter: number;")
    lines.append("  verse: string;")
    lines.append("  title: string;")
    lines.append("  sanskrit: string;")
    lines.append("  transliteration: string;")
    lines.append("  meaning: string;")
    lines.append("  reflection: string;")
    lines.append("  themes: string[];")
    lines.append("  searchText: string;")
    lines.append("}")
    lines.append("")
    lines.append("const verse = (")
    lines.append('  details: Omit<GitaVerse, "searchText"> & { keywords: string[] },')
    lines.append("): GitaVerse => ({")
    lines.append("  ...details,")
    lines.append("  searchText: [")
    lines.append("    details.title,")
    lines.append("    details.meaning,")
    lines.append("    details.reflection,")
    lines.append('    details.themes.join(" "),')
    lines.append('    details.keywords.join(" "),')
    lines.append('  ].join(". "),')
    lines.append("});")
    lines.append("")
    lines.append("/**")
    lines.append(" * The complete 700 verses of the Bhagavad Gita (18 chapters),")
    lines.append(" * sourced from the MIT-licensed gita/gita JSON dataset.")
    lines.append(" *")
    lines.append(" * - Sanskrit text: traditional Devanagari")
    lines.append(" * - Transliteration: IAST (with diacritics)")
    lines.append(" * - English translation: Swami Adidevananda")
    lines.append(" *")
    lines.append(" * The reflection prompt is kept intentionally short so the verse can")
    lines.append(" * speak for itself; the plain-language titles help the local retrieval")
    lines.append(" * match everyday phrasing without a server.")
    lines.append(" */")
    lines.append("export const VERSES: GitaVerse[] = [")

    for e in entries:
        lines.append("  verse({")
        lines.append(f'    id: "{e["id"]}",')
        lines.append(f"    chapter: {e['chapter']},")
        lines.append(f'    verse: "{e["verse"]}",')
        lines.append(f"    title: {ts_string(e['title'])},")
        lines.append(f"    sanskrit: {ts_string(e['sanskrit'])},")
        lines.append(f"    transliteration: {ts_string(e['transliteration'])},")
        lines.append(f"    meaning: {ts_string(e['meaning'])},")
        lines.append(f"    reflection: {ts_string(e['reflection'])},")
        themes_js = "[" + ", ".join(f'"{t}"' for t in e["themes"]) + "]"
        lines.append(f"    themes: {themes_js},")
        keywords_js = "[" + ", ".join(f'"{ts_escape(k)}"' for k in e["keywords"]) + "]"
        lines.append(f"    keywords: {keywords_js},")
        lines.append("  }),")

    lines.append("];")
    lines.append("")
    lines.append("export const CHAPTER_TITLES: Record<number, string> = {")
    for ch in sorted(CHAPTER_TITLES):
        lines.append(f'  {ch}: "{CHAPTER_TITLES[ch]}",')
    lines.append("};")
    lines.append("")

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(entries)} verses to {OUT}")

    # Mirror the runtime `verse()` helper's searchText construction exactly
    # (title + meaning + reflection + themes + keywords, joined with ". ").
    search_entries = [
        {
            "id": e["id"],
            "searchText": ". ".join(
                [
                    e["title"],
                    e["meaning"],
                    e["reflection"],
                    " ".join(e["themes"]),
                    " ".join(e["keywords"]),
                ]
            ),
        }
        for e in entries
    ]
    SEARCH_OUT.write_text(
        json.dumps(search_entries, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Wrote {len(search_entries)} search texts to {SEARCH_OUT}")


if __name__ == "__main__":
    main()
