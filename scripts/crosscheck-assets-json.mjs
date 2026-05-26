/**
 * Cross-check JSON media references vs assets-names.txt (one filename per line).
 * Run: node scripts/crosscheck-assets-json.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assetsLines = fs
	.readFileSync(path.join(root, "assets-names.txt"), "utf8")
	.split(/\r?\n/)
	.filter(Boolean)
	.map((l) => l.trim().split(/[/\\]/).pop());

const assetsLower = new Set(assetsLines.map((s) => s.toLowerCase()));

const assetStems = new Set(
	assetsLines.map((a) => {
		const b = a.toLowerCase();
		const i = b.lastIndexOf(".");
		return i > 0 ? b.slice(0, i) : b;
	})
);

/** Igual que acogas_import_media_reference_basename (PHP): no usar path.basename con una «/» en el título. */
function mediaReferenceBasename(filename) {
	const p = String(filename).trim().replace(/\\/g, "/");
	if (p === "") {
		return "";
	}
	const parts = p.split("/");
	if (parts.length === 1) {
		return p;
	}
	if (parts.length === 2 && /^\d{4}$/.test(parts[0])) {
		return parts[1];
	}
	if (parts.length === 2) {
		return p;
	}
	if (/^\d{4}\/\d{2}\//.test(p)) {
		return path.basename(p);
	}
	return p.replace(/\//g, "_");
}

/**
 * Approximate wp sanitize_file_name: remove WP special_chars, hyphenate whitespace.
 */
function wpishSanitizeFileNamePiece(baseOriginal) {
	// Caracteres que elimina sanitize_file_name (+ comillas tipográficas típicas).
	const specials = Array.from(
		new Set([
			"?",
			"[",
			"]",
			"/",
			"\\",
			"=",
			"<",
			">",
			":",
			";",
			",",
			"'",
			'"',
			"&",
			"$",
			"#",
			"*",
			"(",
			")",
			"|",
			"~",
			"`",
			"!",
			"{",
			"}",
			"%",
			"+",
			String.fromCharCode(0),
			"\u2019",
			"\u201c",
			"\u201d",
			"\u00ab",
			"\u00bb",
		])
	).filter((c) => c.length > 0);

	let s = baseOriginal
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.replace(/\p{Zs}+/gu, " ");

	for (const ch of specials) {
		s = s.split(ch).join("");
	}
	s = s.replace(/%20|\+/g, "-");
	s = s.replace(/\.{2,}/g, ".");
	s = s.replace(/[\r\n\t \-]+/g, "-");
	s = s.replace(/^[\.\-_]+|[\.\-_]+$/g, "");
	return (s || "file").toLowerCase();
}

/** Two strategies: verbatim basename, and '/' → '_' (muchas carpetas Emerson coinciden con medios WP). */
function wpishVariants(name) {
	const base = mediaReferenceBasename(name);
	const sources = new Set([base]);
	if (base.includes("/")) {
		sources.add(base.replace(/\//g, "_"));
	}

	return [...new Set([...sources].map((b) => wpishSanitizeFileNamePiece(b)))];
}

const j = JSON.parse(
	fs.readFileSync(path.join(root, "wp-import-acf-payload.json"), "utf8")
);

/** @type {{ kind: string, slug: string, val: string, extra?: string }[]} */
const refs = [];
for (const p of j.posts || []) {
	const img = (p.imagen_filename || "").trim();
	if (img) refs.push({ kind: "imagen_filename", slug: p.slug || "", val: img });

	const cat = p.acf?.catalogo && typeof p.acf.catalogo === "object" ? p.acf.catalogo : {};
	for (const [k, v] of Object.entries(cat)) {
		if (!k.startsWith("documento_pdf_") || !v || typeof v !== "object") continue;
		const nv = (v.nombre_visible || "").trim();
		if (nv) refs.push({ kind: "nombre_visible", slug: p.slug || "", val: nv, extra: k });
	}
}

function stemNoExt(fn) {
	const b = mediaReferenceBasename(fn).toLowerCase();
	const i = b.lastIndexOf(".");
	return i > 0 ? b.slice(0, i) : b;
}

let exact = 0;
let sanit = 0;
const miss = [];
let stemOnly = 0;

for (const r of refs) {
	const base = mediaReferenceBasename(r.val);
	const lc = base.toLowerCase();
	if (assetsLower.has(lc)) {
		exact++;
		continue;
	}
	const tries = wpishVariants(r.val);
	let hit = null;
	for (const san of tries) {
		if (assetsLower.has(san)) {
			hit = san;
			break;
		}
	}
	if (hit !== null) {
		sanit++;
		continue;
	}
	if (assetStems.has(stemNoExt(r.val))) {
		stemOnly++;
	}
	miss.push({ ...r, tried: tries.join(" | ") });
}

console.log("Total references:", refs.length);
console.log("Exact basename (case-insensitive):", exact);
console.log("After wp-ish sanitize match:", sanit);
console.log("No match in assets-names.txt:", miss.length);
console.log(
	"  → of those, same stem / different extension (e.g. .png vs .webp):",
	stemOnly
);
console.log(
	"  → no stem match at all:",
	miss.length - stemOnly
);

const uniqueMiss = new Map();
for (const m of miss) {
	const k = m.val + " || " + m.tried;
	if (!uniqueMiss.has(k)) uniqueMiss.set(k, m);
}
console.log("Unique missing reference strings:", uniqueMiss.size);

if (uniqueMiss.size) {
	console.log("\nFirst 40 unique misses (val → sanitized tried):");
	let n = 0;
	for (const m of uniqueMiss.values()) {
		if (n++ >= 40) break;
		console.log(`- ${m.val}\n  tried: ${m.tried}`);
	}
}
