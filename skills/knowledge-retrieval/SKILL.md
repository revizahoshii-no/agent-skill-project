---
name: knowledge-retrieval
description: Retrieve answers from local documents progressively, using indexes, targeted search, file-specific extraction, source tracing, and explicit uncertainty.
version: 1.0.0
---

# Knowledge Retrieval

## Use when

- answering from a local knowledge directory;
- locating facts in project documents;
- searching Markdown, text, PDF, or spreadsheet content;
- building an evidence-backed summary from local files.

Do not add open-web facts when the task explicitly limits evidence to the local knowledge base.

## Step 1: locate the root

Use the user-provided path. Otherwise check the project convention. If the expected root does not exist, ask for the correct path rather than guessing.

## Step 2: follow indexes

Read directory indexes or structure files first. Use them to choose the most relevant branch. Do not scan every file before understanding the organization.

## Step 3: form the query

Extract three to eight terms:

- exact phrases;
- synonyms;
- abbreviations;
- product or domain terms;
- time and version limits;
- expected field or output type.

## Step 4: search progressively

1. Search the most relevant files and extensions.
2. Record file and match location.
3. Read a small range around each match.
4. Judge whether the evidence answers the question.
5. Refine terms and repeat only as needed.
6. Stop when evidence is sufficient or the search limit is reached.

Avoid reading large files in full when targeted ranges are enough.

## File-specific handling

### Text and Markdown

Search headings and exact terms first. Follow links or section references only when needed.

### PDF

Extract text to a file before searching. Use page-aware extraction when page citation matters. Use a table extractor for tabular content.

### Spreadsheet

Inspect workbook structure, sheet names, columns, types, and a limited sample. Then filter or aggregate only the needed fields. Preserve the sheet and field names in the evidence record.

## Evidence record

For each useful result, retain:

- file path;
- section, line range, page, or sheet;
- relevant excerpt or structured value;
- confidence;
- assumptions or conflicts.

## Answer rules

- Lead with the answer.
- Cite the local file and location.
- Separate direct evidence from inference.
- State when information is incomplete or absent.
- Never fabricate a missing value.
- Suggest a narrower file, field, date, or keyword when more evidence is needed.

## Context efficiency

Do not paste entire documents into working context. Keep only the index, targeted excerpts, evidence notes, and final synthesis.

Human documentation: `../../docs/guides/knowledge-retrieval.md`.
