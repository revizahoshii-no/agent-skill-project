from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
TEXT_EXTENSIONS = {".md", ".json", ".html", ".css", ".js", ".mjs", ".py", ".yml", ".yaml", ".txt"}
SKIP_DIRECTORIES = {".git", "node_modules"}
DOMAIN_IDS = [
    "design-direction",
    "color-systems",
    "interface-craft",
    "responsive-mobile",
    "accessibility",
    "product-copy",
    "asset-image",
    "performance",
    "seo-security",
    "browser-acceptance",
    "release-delivery",
    "knowledge-retrieval",
    "editorial-article",
    "web-presentation",
    "motion-showreel",
    "clean-build-core",
    "clean-build-web",
    "clean-build-runtime",
    "clean-build-verification",
]
COMPLETION_SECTIONS = [
    "Output contract",
    "Completion check",
    "Evidence",
    "Delivery",
    "Reporting",
    "Final report",
    "Boundaries",
]


class DocumentationParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.current_skill: str | None = None
        self.skill_images = {skill_id: 0 for skill_id in DOMAIN_IDS}
        self.references: list[str] = []
        self.images_without_alt: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        element_id = values.get("id")
        if tag == "article" and element_id in self.skill_images:
            self.current_skill = element_id
        if tag == "img":
            source = values.get("src")
            if source:
                self.references.append(source)
            if not values.get("alt", "").strip():
                self.images_without_alt.append(source or "<unknown>")
            if self.current_skill:
                self.skill_images[self.current_skill] += 1
        if tag in {"a", "link", "script"}:
            reference = values.get("href") or values.get("src")
            if reference:
                self.references.append(reference)

    def handle_endtag(self, tag: str) -> None:
        if tag == "article":
            self.current_skill = None


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def load_json(path: Path, errors: list[str]) -> object:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as error:
        fail(errors, f"Invalid JSON at {path.relative_to(ROOT)}: {error}")
        return {}


def frontmatter(path: Path, errors: list[str]) -> dict[str, object]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        fail(errors, f"Missing frontmatter in {path.relative_to(ROOT)}")
        return {}
    end = text.find("\n---\n", 4)
    if end < 0:
        fail(errors, f"Unclosed frontmatter in {path.relative_to(ROOT)}")
        return {}
    values: dict[str, object] = {}
    for raw_line in text[4:end].splitlines():
        if not raw_line.strip() or raw_line.startswith("  - "):
            continue
        if ":" not in raw_line:
            continue
        key, raw_value = raw_line.split(":", 1)
        value = raw_value.strip().strip('"')
        if value == "true":
            values[key] = True
        elif value == "false":
            values[key] = False
        elif value.isdigit():
            values[key] = int(value)
        else:
            values[key] = value
    return values


def resolve_local(base: Path, reference: str) -> Path | None:
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or reference.startswith("mailto:") or reference.startswith("data:"):
        return None
    route = unquote(parsed.path)
    if not route:
        return None
    candidate = ROOT / route.lstrip("/") if route.startswith("/") else base / route
    return candidate.resolve()


def markdown_references(text: str) -> list[str]:
    return [match.group(1).strip() for match in re.finditer(r"!?\[[^\]]*\]\(([^)]+)\)", text)]


def validate_manifest_and_registry(errors: list[str]) -> None:
    manifest_path = ROOT / "manifest.json"
    registry_path = ROOT / "skills" / "registry.json"
    manifest = load_json(manifest_path, errors)
    registry = load_json(registry_path, errors)
    if not isinstance(manifest, dict) or not isinstance(registry, dict):
        return
    if manifest.get("entrypoint") != "skills/router/SKILL.md":
        fail(errors, "Manifest entrypoint must be skills/router/SKILL.md")
    policy = manifest.get("loadPolicy", {})
    if not isinstance(policy, dict):
        fail(errors, "Manifest loadPolicy must be an object")
        return
    expected_policy = {
        "maxPrimarySkills": 2,
        "maxSupportingSkills": 1,
        "preloadReferences": False,
        "allowLoadAll": False,
    }
    for key, expected in expected_policy.items():
        if policy.get(key) != expected:
            fail(errors, f"Manifest loadPolicy.{key} must be {expected!r}")
    registry_policy = registry.get("loadPolicy")
    if not isinstance(registry_policy, dict):
        fail(errors, "Registry loadPolicy must be an object")
    else:
        for key, expected in expected_policy.items():
            if registry_policy.get(key) != expected:
                fail(errors, f"Registry loadPolicy.{key} must be {expected!r}")
        if registry_policy.get("rerouteAtPhaseChange") is not True:
            fail(errors, "Registry must require rerouting at phase change")
    skills = registry.get("skills")
    if not isinstance(skills, list):
        fail(errors, "Registry skills must be an array")
        return
    if len(skills) != 20:
        fail(errors, f"Registry must contain 20 entries, found {len(skills)}")
    seen: set[str] = set()
    paths: set[str] = set()
    for entry in skills:
        if not isinstance(entry, dict):
            fail(errors, "Every registry entry must be an object")
            continue
        skill_id = entry.get("name")
        path_value = entry.get("path")
        if not isinstance(skill_id, str) or not skill_id:
            fail(errors, "Registry entry has an invalid name")
            continue
        if skill_id in seen:
            fail(errors, f"Duplicate registry name: {skill_id}")
        seen.add(skill_id)
        if not isinstance(path_value, str) or not path_value:
            fail(errors, f"Registry entry {skill_id} has an invalid path")
            continue
        if path_value in paths:
            fail(errors, f"Duplicate registry path: {path_value}")
        paths.add(path_value)
        path = ROOT / path_value
        if not path.is_file():
            fail(errors, f"Registry path does not exist: {path_value}")
            continue
        metadata = frontmatter(path, errors)
        if metadata.get("name") != skill_id:
            fail(errors, f"Frontmatter name mismatch at {path_value}")
        triggers = entry.get("triggers")
        exclusions = entry.get("excludes")
        if not isinstance(triggers, list) or not triggers:
            fail(errors, f"Registry entry {skill_id} needs triggers")
        if not isinstance(exclusions, list) or not exclusions:
            fail(errors, f"Registry entry {skill_id} needs exclusions")
    expected_ids = {"router", *DOMAIN_IDS}
    if seen != expected_ids:
        fail(errors, f"Registry ids differ from expected set: {sorted(seen ^ expected_ids)}")


def validate_skills(errors: list[str]) -> None:
    router_path = ROOT / "skills" / "router" / "SKILL.md"
    router = router_path.read_text(encoding="utf-8")
    for phrase in ["Load at most two primary skills.", "Load at most one supporting skill.", "Never load all skills.", "must not trigger recursive loading"]:
        if phrase not in router:
            fail(errors, f"Router is missing hard rule: {phrase}")
    for skill_id in DOMAIN_IDS:
        path = ROOT / "skills" / skill_id / "SKILL.md"
        if not path.is_file():
            fail(errors, f"Missing domain skill: {skill_id}")
            continue
        text = path.read_text(encoding="utf-8")
        if "## Use when" not in text:
            fail(errors, f"{path.relative_to(ROOT)} is missing ## Use when")
        if not any(f"## {section}" in text for section in COMPLETION_SECTIONS):
            fail(errors, f"{path.relative_to(ROOT)} needs an evidence, delivery, boundary, or completion section")
        if len(text.splitlines()) < 35:
            fail(errors, f"{path.relative_to(ROOT)} is too short to be operational")
        metadata = frontmatter(path, errors)
        if metadata.get("name") != skill_id:
            fail(errors, f"Frontmatter name mismatch in {path.relative_to(ROOT)}")
        domain_references = re.findall(r"skills/([a-z-]+)/SKILL\.md", text)
        if domain_references:
            fail(errors, f"{path.relative_to(ROOT)} must not load another domain skill")
    combined = "\n".join(path.read_text(encoding="utf-8") for path in (ROOT / "skills").glob("*/SKILL.md"))
    forbidden_patterns = [
        r"(?:cat|less|sed|awk)\s+skills/\*",
        r"find\s+skills(?:\s|$)",
        r"for\s+\w+\s+in\s+skills/\*",
    ]
    for pattern in forbidden_patterns:
        if re.search(pattern, combined, flags=re.IGNORECASE):
            fail(errors, f"Forbidden bulk-loading command found: {pattern}")


def validate_guides(errors: list[str]) -> None:
    for skill_id in DOMAIN_IDS:
        path = ROOT / "docs" / "guides" / f"{skill_id}.md"
        if not path.is_file():
            fail(errors, f"Missing human guide: {skill_id}")
            continue
        text = path.read_text(encoding="utf-8")
        image_references = [reference for reference in markdown_references(text) if Path(urlsplit(reference).path).suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}]
        if len(image_references) < 2:
            fail(errors, f"Guide {skill_id} needs at least two images")
        for reference in markdown_references(text):
            target = resolve_local(path.parent, reference)
            if target is not None and ROOT not in target.parents and target != ROOT:
                fail(errors, f"Guide link escapes repository: {path.relative_to(ROOT)} -> {reference}")
            elif target is not None and not target.exists():
                fail(errors, f"Broken guide link: {path.relative_to(ROOT)} -> {reference}")


def validate_documentation(errors: list[str]) -> None:
    path = ROOT / "docs" / "index.html"
    parser = DocumentationParser()
    parser.feed(path.read_text(encoding="utf-8"))
    for skill_id, count in parser.skill_images.items():
        if count < 2:
            fail(errors, f"Documentation section {skill_id} needs at least two images")
    for source in parser.images_without_alt:
        fail(errors, f"Documentation image has no alt text: {source}")
    for reference in parser.references:
        target = resolve_local(path.parent, reference)
        if target is None:
            continue
        if ROOT not in target.parents and target != ROOT:
            fail(errors, f"Documentation link escapes repository: {reference}")
        elif not target.exists():
            fail(errors, f"Broken documentation link: {reference}")
    for html_path in (ROOT / "docs" / "examples").glob("*.html"):
        parser = DocumentationParser()
        parser.feed(html_path.read_text(encoding="utf-8"))
        for reference in parser.references:
            target = resolve_local(html_path.parent, reference)
            if target is not None and not target.exists():
                fail(errors, f"Broken demo reference: {html_path.relative_to(ROOT)} -> {reference}")
        for source in parser.images_without_alt:
            fail(errors, f"Demo image has no alt text: {html_path.relative_to(ROOT)} -> {source}")


def validate_markdown_links(errors: list[str]) -> None:
    for path in [ROOT / "README.md", ROOT / "README.id.md"]:
        text = path.read_text(encoding="utf-8")
        for reference in markdown_references(text):
            target = resolve_local(path.parent, reference)
            if target is not None and not target.exists():
                fail(errors, f"Broken README link: {path.name} -> {reference}")


def validate_content_safety(errors: list[str]) -> None:
    credential_patterns = [
        "-----BEGIN " + r"(?:RSA|OPENSSH|EC|DSA) PRIVATE KEY-----",
        r"gh[pousr]_[A-Za-z0-9]{30,}",
        r"AKIA[0-9A-Z]{16}",
        r"AIza[0-9A-Za-z_-]{30,}",
        r"(?i)(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*['\"][^'\"]{8,}['\"]",
    ]
    excluded = {ROOT / "scripts" / "validate.py"}
    for path in ROOT.rglob("*"):
        if any(part in SKIP_DIRECTORIES for part in path.relative_to(ROOT).parts):
            continue
        if not path.is_file() or path in excluded or path.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        text = path.read_text(encoding="utf-8")
        if "\u2014" in text or "\u2013" in text:
            fail(errors, f"Non-ASCII dash found in {path.relative_to(ROOT)}")
        for pattern in credential_patterns:
            if re.search(pattern, text):
                fail(errors, f"Credential-like content found in {path.relative_to(ROOT)}")
    forbidden_names = {"credentials", ".env", ".env.local", "id_rsa", "id_ed25519"}
    for path in ROOT.rglob("*"):
        if any(part in SKIP_DIRECTORIES for part in path.relative_to(ROOT).parts):
            continue
        if path.name.lower() in forbidden_names:
            fail(errors, f"Forbidden sensitive path found: {path.relative_to(ROOT)}")


def main() -> int:
    errors: list[str] = []
    validate_manifest_and_registry(errors)
    validate_skills(errors)
    validate_guides(errors)
    validate_documentation(errors)
    validate_markdown_links(errors)
    validate_content_safety(errors)
    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Validation passed")
    print("20 registry entries, 19 documented domains, bounded loading policy, local links, and content safety checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
