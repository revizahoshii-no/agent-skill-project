---
name: color-systems
description: Select, derive, assign, and verify coherent color systems for websites and interfaces using semantic roles, contextual palette families, contrast evidence, and complete interaction states.
version: 1.0.0
---

# Color Systems

## Use when

- selecting a website or product palette;
- translating references, photography, or brand colors into UI tokens;
- designing light, dark, or paired themes;
- repairing muddy hierarchy, excessive accents, weak contrast, or inconsistent state colors;
- deciding which color combinations fit a product, audience, and content density.

Do not use for photo color grading, print production, or an isolated token change whose value is already specified.

## Core principle

A useful palette is a role system, not a row of attractive swatches. Start with context, assign every color a job, verify the actual foreground and background pairs, and judge the result inside real components.

## Step 1: read the context

Record:

```text
Artifact:
Audience:
Product posture:
Content density:
Primary environment: light, dark, or paired
Image dependence:
Required brand colors:
Required semantic states:
Desired temperature:
Accessibility target:
```

Choose posture before hue:

| Posture | Useful direction | Common failure |
| --- | --- | --- |
| Editorial or cultural | warm neutrals, one intellectual cool, one restrained warm accent | too many decorative earth tones |
| Finance or enterprise | navy, slate, cool neutral, limited signal color | generic blue on blue with no hierarchy |
| Health or wellbeing | botanical green, mineral neutral, humane warm counterpoint | pale green text with weak contrast |
| Luxury or hospitality | deep field, tactile neutral, metal-like accent | gold everywhere and unreadable thin type |
| Creator or entertainment | saturated anchor, clear neutral field, energetic counter-accent | multiple neon colors competing equally |
| Developer or data | stable neutral field, precise cool accent, semantic states kept distinct | dark surfaces with low-contrast gray text |
| Commerce | trustworthy dark anchor, warm action color, quiet utility neutrals | promotional color used for every control |
| Public service or utility | high-legibility neutrals, familiar action blue, explicit states | branding overriding task clarity |

## Step 2: assign semantic roles

Every system should define at least:

```text
canvas
surface
surface-raised
ink
ink-muted
border
brand
brand-strong
accent
focus
success
warning
danger
```

Role rules:

- Canvas carries the page field.
- Surface separates content without requiring a shadow.
- Raised surface is reserved for genuine elevation or emphasis.
- Ink is the default readable foreground.
- Muted ink is secondary, not disposable; it still needs sufficient contrast.
- Border must remain visible against both adjacent surfaces.
- Brand identifies ownership and primary actions.
- Accent is scarce and must not compete with brand.
- Focus is chosen for visibility, not brand purity.
- Success, warning, and danger retain meaning and must not be replaced by brand colors.

## Step 3: derive from references

When a reference image is supplied:

1. Identify its dominant field, support tone, deepest anchor, lightest relief, and smallest high-energy note.
2. Ignore blur, glow, shadow, and compression artifacts when reading swatches.
3. Separate atmosphere from interface duty. A beautiful background color may be a poor text color.
4. Keep the reference relationship, not every sampled hex value.
5. Add any missing neutral or semantic color required by the interface.
6. Test the derived system in text, controls, cards, focus, selected, disabled, error, and data states.

Useful relationship patterns:

- Monochromatic depth: one hue across several lightness levels, plus a neutral text system.
- Analogous calm: neighboring hues with one dominant and one quiet support.
- Complementary signal: neutral field with two opposing hues used at unequal strength.
- Split complementary energy: one anchor hue and two restrained counterpoints.
- Warm-cool balance: warm field with a cool action color, or cool field with a warm action color.
- Tinted neutral system: near-neutral surfaces biased toward the brand hue.

## Step 4: choose a proven starting family

Notation in the table is `canvas / surface | ink / muted | brand / accent`. Treat each row as a starting system and verify the exact component pairs before release.

| Palette | Role values | Best fit |
| --- | --- | --- |
| Paper Cobalt | `#F4F0E8 / #FFFDF8 | #171719 / #5D5A55 | #1746A2 / #C94C3F` | editorial products, documentation, portfolios |
| Cocoa Linen | `#E1D4C2 / #F2E8DB | #291C0E / #6E473B | #70483D / #A06E57` | hospitality, craft, food, heritage |
| Burgundy Peach | `#FED7B8 / #FFE9D8 | #351015 / #7B3D3D | #59171B / #B85C54` | beauty, fashion, intimate editorial work |
| Terracotta Sand | `#F7E3CF / #FFF7ED | #2C1810 / #6F4A3B | #A4472B / #D97745` | artisan commerce, travel, lifestyle |
| Rose Espresso | `#F4E3E1 / #FFF8F6 | #2D1518 / #74555A | #6B1F2B / #B95669` | cosmetics, boutique services, personal brands |
| Navy Sage | `#F4F1DE / #FFFDF3 | #0D1B2A / #526354 | #1B263B / #6B806D` | architecture, consulting, premium sustainability |
| Deep Teal Fog | `#0D1F23 / #132E35 | #E8F0F2 / #AFB3B7 | #69818D / #7BC5C9` | cinematic tools, audio, focused dark interfaces |
| Steel Cyan | `#101A21 / #172A35 | #EDF6F8 / #A7BBC3 | #177E89 / #7DD7DE` | developer tools, monitoring, technical media |
| Arctic Blue | `#EAF2F7 / #FFFFFF | #102A43 / #52677A | #276FBF / #3E91A8` | cloud products, education, civic technology |
| Midnight Gold | `#0B1623 / #13243A | #F3E7CF / #B7C2CC | #B6924D / #79C2D0` | luxury travel, premium finance, events |
| Sapphire Silver | `#071B3A / #0C2A5E | #F1F4F8 / #B8C1CE | #2F6FD0 / #AEB8C6` | security, aerospace, premium technology |
| Emerald Brass | `#0D211B / #153B2F | #F2E8D2 / #B9C3B9 | #3A7B5E / #C2A56E` | spirits, heritage brands, private clubs |
| Garnet Rose | `#26090E / #530F1D | #F7E3E8 / #CAA7AE | #9D174D / #E7A4B3` | music, nightlife, dramatic fashion |
| Aubergine Magenta | `#1E0C26 / #3A1247 | #F8EAF8 / #CBB6CF | #8D35AD / #EF5DA8` | entertainment, fandom, digital creators |
| Ivory Charcoal | `#F8F4EC / #FFFFFF | #202124 / #66615A | #373B3F / #9A7147` | minimalist commerce, galleries, resumes |
| Plum Mint | `#F0F8F2 / #FFFFFF | #24122F / #5F5365 | #6A2E75 / #3F8F70` | wellness technology, communities, education |
| Coral Aqua | `#FFF5EF / #FFFFFF | #263238 / #607078 | #C94F4A / #237F75` | creator products, social tools, playful SaaS |
| Indigo Lime | `#F4F5FF / #FFFFFF | #1E1B3A / #5F5C78 | #4B46B8 / #6F8F22` | learning products, innovation programs, youth tech |
| Clay Sky | `#F5EBDD / #FFFFFF | #2C2521 / #6B625B | #985136 / #3D7E96` | local services, travel journals, sustainable goods |
| Neutral Data | `#F5F7FA / #FFFFFF | #18212B / #5E6C78 | #2762C5 / #0F806B` | dashboards, administration, analytics |
| Health Sage | `#EFF6F0 / #FFFFFF | #183126 / #566B5F | #287A50 / #B9644A` | clinics, wellbeing, care coordination |
| Commerce Navy | `#F7F8FB / #FFFFFF | #111B2E / #596273 | #163A63 / #C85E1E` | marketplaces, logistics, subscriptions |
| Warning Amber | `#FFF8E6 / #FFFFFF | #33210B / #735C3B | #945000 / #B88200` | operational alerts, maintenance, safety workflows |
| Mono Red | `#F7F7F5 / #FFFFFF | #171719 / #666666 | #B42318 / #7A1F18` | severe editorial systems, incident tools, advocacy |

## Step 5: control proportion and hierarchy

Use proportion as a diagnostic, not a rigid formula:

- 60 to 80 percent field and neutral surfaces;
- 15 to 30 percent supporting surfaces and structural color;
- 5 to 10 percent brand or accent emphasis;
- fewer than 5 percent high-urgency semantic color.

A saturated color becomes weaker when it appears everywhere. If brand, link, selected state, focus, chart series, and decoration share one hue, split their roles before adding new colors.

## Step 6: verify contrast and states

For web interfaces, check actual pairs against the intended accessibility target. As a practical WCAG baseline:

- normal text: at least 4.5:1;
- large text: at least 3:1;
- essential icons, control boundaries, and focus indicators: at least 3:1 against adjacent colors;
- disabled states may be subdued but must remain understandable;
- color must not be the only carrier of status, selection, validation, or chart meaning.

Verify at minimum:

```text
ink on canvas
ink on surface
muted ink on canvas
muted ink on surface
button text on brand
link on canvas
focus against canvas and surface
success, warning, and danger text or icon pairs
selected and unselected controls
chart series against the plotting field and each other
```

Do not claim compliance from a palette table alone. Measure the rendered foreground and background combinations.

## Light and dark pairing

Dark mode is not an inversion.

- Reduce large-area saturation before increasing brightness.
- Use more than one dark surface level to preserve depth.
- Avoid pure black fields and pure white body text unless the product requires maximum starkness.
- Rebuild borders, focus, shadows, illustrations, and semantic colors for the dark field.
- Keep brand recognition through hue relationships, not identical hex values.
- Verify halation and readability on real devices when thin light text appears on dark surfaces.

## Failure patterns

Reject or revise:

- five colors with no semantic roles;
- multiple accents of equal visual weight;
- gray text chosen only because it looks subtle;
- a gradient used to hide weak hierarchy;
- a dark theme made by swapping white and black;
- luxury palettes that rely on tiny gold text;
- pastel state colors with unreadable labels;
- brand color used for destructive actions;
- palette extraction that copies image shadows and compression noise;
- chart colors selected without testing distinguishability and labels.

## Output contract

Return a compact color decision record:

```text
Context and posture:
Selected family:
Reference relationship:
Semantic role map:
Light theme tokens:
Dark theme tokens, if required:
Component pair checks:
State colors:
Chart colors, if required:
Contrast evidence:
Rejected alternatives and reason:
Remaining uncertainty:
```

## Completion check

- Every color has a named role.
- The palette fits the audience and product posture.
- Brand and accent do not compete.
- Required component and state pairs were measured.
- Focus remains visible on every relevant field.
- Status is understandable without color alone.
- Dark mode was rebuilt rather than inverted, when applicable.
- The rendered interface, not the swatch row, is the final evidence.

Human documentation: `../../docs/guides/color-systems.md`.
