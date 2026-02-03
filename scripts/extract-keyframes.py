"""
Style Extractor: extract @keyframes blocks from downloaded CSS files.

Usage:
  python scripts/extract-keyframes.py <folder> [--out out.md] [--limit 50]

Notes:
  - This is a helper for evidence gathering when you can pull stylesheet bodies
    (e.g., via Chrome MCP get_network_request) and want complete keyframes.
"""

from __future__ import annotations

import argparse
import glob
import os
import re
from dataclasses import dataclass


@dataclass(frozen=True)
class KeyframesBlock:
    name: str
    file: str
    css: str


def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def extract_keyframes_blocks(css_text: str, source_file: str) -> list[KeyframesBlock]:
    blocks: list[KeyframesBlock] = []
    for match in re.finditer(r"@keyframes\s+([^\s{]+)\s*\{", css_text):
        name = match.group(1)
        i = match.end() - 1
        depth = 0
        while i < len(css_text):
            c = css_text[i]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    blocks.append(KeyframesBlock(name=name, file=source_file, css=css_text[match.start() : end]))
                    break
            i += 1
    return blocks


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("folder", help="Folder containing .css files")
    ap.add_argument("--out", default="", help="Write markdown output to file")
    ap.add_argument("--limit", type=int, default=200, help="Max keyframes blocks to output")
    args = ap.parse_args()

    css_files = sorted(glob.glob(os.path.join(args.folder, "*.css")))
    all_blocks: list[KeyframesBlock] = []
    for path in css_files:
        text = read_text(path)
        all_blocks.extend(extract_keyframes_blocks(text, os.path.basename(path)))

    # Deduplicate by name keeping first appearance (minified CSS often repeats)
    dedup: dict[str, KeyframesBlock] = {}
    for b in all_blocks:
        dedup.setdefault(b.name, b)

    names = sorted(dedup.keys())
    names = names[: max(0, args.limit)]

    out_lines: list[str] = []
    out_lines.append(f"# Keyframes Extraction\n")
    out_lines.append(f"- folder: `{os.path.abspath(args.folder)}`")
    out_lines.append(f"- keyframes (unique): {len(dedup)}")
    out_lines.append("")

    for name in names:
        b = dedup[name]
        out_lines.append(f"## `{name}`")
        out_lines.append(f"- source: `{b.file}`")
        out_lines.append("")
        out_lines.append("```css")
        out_lines.append(b.css)
        out_lines.append("```")
        out_lines.append("")

    output = "\n".join(out_lines)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(output)
    else:
        print(output)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

