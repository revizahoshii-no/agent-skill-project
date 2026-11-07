---
name: seo-security
description: Review crawlability, metadata, structured data, production headers, dependency hygiene, credential exposure, and browser-facing security without promising rankings or claiming a full penetration test.
version: 1.0.0
---

# SEO and Security

## Use when

- preparing a public page for discovery;
- reviewing metadata, canonical URLs, sitemap, or robots rules;
- validating production headers and browser security;
- scanning dependencies and credentials;
- hardening a release.

## Boundaries

- A technical SEO pass does not guarantee ranking.
- A best-practices score does not prove security.
- This skill is not a penetration test.
- Keep measured production evidence separate from configuration inspection.

## SEO review

Check:

- descriptive, page-specific title;
- useful meta description;
- canonical URL;
- language and viewport;
- logical headings;
- descriptive link text;
- indexability and accidental noindex rules;
- valid robots file;
- valid sitemap containing canonical public URLs;
- consistent protocol, hostname, and trailing-slash policy;
- social metadata when the site needs link previews;
- structured data only when it matches visible content;
- rendered DOM when structured data may be injected by JavaScript;
- mobile and desktop content equivalence.

Do not invent keywords or structured data entities that the content does not support.

## Production security review

Verify from the deployed response where applicable:

- HTTPS and redirect behavior;
- Content Security Policy;
- Strict Transport Security after HTTPS coverage is confirmed;
- content-type sniffing protection;
- referrer policy;
- framing restrictions;
- base URI and form action restrictions;
- secure cookie attributes for authenticated applications;
- absence of mixed content;
- appropriate cache behavior for sensitive responses.

## Source and dependency review

- Scan for tokens, keys, credentials, and private material.
- Check dependency vulnerabilities.
- Remove debug output and accidental source exposure.
- Sanitize untrusted HTML and input.
- Prefer text APIs over HTML injection.
- Pin third-party resources and use integrity where supported.
- Avoid untrusted remote scripts.
- Keep secrets on the server and outside the repository.

## Anti-bot and anti-copy

Select controls according to the threat model. They must not block keyboard use, zoom, screen readers, legitimate crawling, or ordinary navigation. Describe them as friction or deterrence, never absolute protection.

## Verification

1. Inspect configuration.
2. Request the production URL.
3. Compare actual headers with intended headers.
4. Test public files and canonical destinations.
5. Scan repository content and dependencies.
6. Repair findings.
7. Repeat production checks.

## Output contract

Report findings by severity with evidence, affected path, repair, and verification status. Keep SEO, browser security, dependency risk, and credential exposure as separate categories.

Human documentation: `../../docs/guides/seo-security.md`.
