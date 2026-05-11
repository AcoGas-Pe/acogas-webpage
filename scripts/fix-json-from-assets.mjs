/**
 * Corrige imagen_filename y catalogo.*.nombre_visible usando nombres reales de assets-names.txt.
 * Copia de seguridad: wp-import-acf-payload.json.bak antes de sobrescribir.
 *
 * Run: node scripts/fix-json-from-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "wp-import-acf-payload.json");
const assetsPath = path.join(root, "assets-names.txt");

function mediaReferenceBasename(filename) {
	const p = String(filename).trim().replace(/\\/g, "/");
	if (p === "") return "";
	const parts = p.split("/");
	if (parts.length === 1) return p;
	if (parts.length === 2 && /^\d{4}$/.test(parts[0])) return parts[1];
	if (parts.length === 2) return p;
	if (/^\d{4}\/\d{2}\//.test(p)) return path.basename(p);
	return p.replace(/\//g, "_");
}

function wpishSanitizeFileNamePiece(baseOriginal) {
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

function wpishVariants(name) {
	const base = mediaReferenceBasename(name);
	const sources = new Set([base]);
	if (base.includes("/")) {
		sources.add(base.replace(/\//g, "_"));
	}
	return [...new Set([...sources].map((b) => wpishSanitizeFileNamePiece(b)))];
}

function isDerivativeBasename(b) {
	return (
		/-\d+x\d+\.(jpg|jpeg|png|gif|webp)$/i.test(b) ||
		/-pdf-\d+x\d+/i.test(b) ||
		/-pdf\.jpg$/i.test(b)
	);
}

function stemKeyFromBasename(b) {
	const s = wpishSanitizeFileNamePiece(b);
	return s.replace(/\.[a-z0-9]{1,8}$/i, "");
}

function extLc(b) {
	const m = String(b).toLowerCase().match(/(\.[a-z0-9]+)$/i);
	return m ? m[1] : "";
}

function levenshtein(a, b) {
	if (a.length < b.length) {
		return levenshtein(b, a);
	}
	if (b.length === 0) {
		return a.length;
	}
	let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
	for (let i = 1; i <= a.length; i++) {
		let cur = [i];
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			cur[j] = Math.min(
				prev[j] + 1,
				cur[j - 1] + 1,
				prev[j - 1] + cost
			);
		}
		prev = cur;
	}
	return prev[b.length];
}

/** Typos habituales en el JSON respecto a los archivos WP. */
function applyTypoHints(s) {
	let t = s;
	t = t.replace(/\bseerie\b/gi, "serie");
	t = t.replace(/\bnatual\b/gi, "natural");
	t = t.replace(/recontrucci/gi, "reconstrucci");
	t = t.replace(/\s+\.(png|jpg|jpeg|pdf)\b/gi, ".$1");
	return t;
}

function pickFromStemGroup(refBase, group) {
	const nonDer = group.filter((b) => !isDerivativeBasename(b));
	const pool = nonDer.length ? nonDer : group;
	const want = extLc(refBase);
	const exact = pool.find((b) => b.toLowerCase() === refBase.toLowerCase());
	if (exact) return exact;

	const sameExt = pool.filter((b) => extLc(b) === want);
	if (sameExt.length === 1) return sameExt[0];
	if (sameExt.length > 1) {
		sameExt.sort((a, b) => a.length - b.length);
		return sameExt[0];
	}

	const prefOrder = want === ".pdf" ? [".pdf", ".PDF"] : [".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"];
	for (const ext of prefOrder) {
		const hit = pool.find((b) => extLc(b) === ext.toLowerCase());
		if (hit) return hit;
	}
	pool.sort((a, b) => a.length - b.length);
	return pool[0];
}

function buildResolver(basenames) {
	const assetsLower = new Set(basenames.map((s) => s.toLowerCase()));
	const canonByLower = new Map();
	for (const b of basenames) {
		if (!canonByLower.has(b.toLowerCase())) {
			canonByLower.set(b.toLowerCase(), b);
		}
	}

	const stemIndex = new Map();
	for (const b of basenames) {
		const k = stemKeyFromBasename(b);
		if (!stemIndex.has(k)) stemIndex.set(k, []);
		const arr = stemIndex.get(k);
		if (!arr.includes(b)) {
			arr.push(b);
		}
	}

	const stemKeys = [...stemIndex.keys()];

	function tryResolveString(candidate) {
		const base = mediaReferenceBasename(candidate);
		if (!base) return null;

		const lc = base.toLowerCase();
		if (assetsLower.has(lc)) {
			return { newVal: canonByLower.get(lc), method: "exact" };
		}

		for (const t of wpishVariants(candidate)) {
			if (assetsLower.has(t)) {
				return { newVal: canonByLower.get(t), method: "sanitize" };
			}
		}

		const sk = stemKeyFromBasename(base);
		if (stemIndex.has(sk)) {
			const picked = pickFromStemGroup(base, stemIndex.get(sk));
			if (picked && picked.toLowerCase() !== base.toLowerCase()) {
				return { newVal: picked, method: "stem" };
			}
		}
		return null;
	}

	function findFuzzyStem(baseForSk) {
		const sk = stemKeyFromBasename(baseForSk);
		if (sk.length < 8) return null;

		let bestK = null;
		let bestD = Infinity;
		for (const k of stemKeys) {
			if (Math.abs(k.length - sk.length) > 10) continue;
			const d = levenshtein(sk, k);
			const threshold = Math.max(2, Math.floor(0.08 * Math.max(sk.length, k.length)));
			if (d < bestD && d <= threshold) {
				bestD = d;
				bestK = k;
			}
		}
		if (bestK == null) return null;
		const picked = pickFromStemGroup(
			mediaReferenceBasename(baseForSk),
			stemIndex.get(bestK)
		);
		return picked && picked.toLowerCase() !== mediaReferenceBasename(baseForSk).toLowerCase()
			? picked
			: null;
	}

	function resolve(oldVal) {
		if (!oldVal || typeof oldVal !== "string") return { newVal: oldVal, method: "noop" };

		const hinted = applyTypoHints(oldVal);
		const variants = hinted === oldVal ? [oldVal] : [hinted, oldVal];

		for (const cand of variants) {
			const hit = tryResolveString(cand);
			if (hit) return hit;
		}

		for (const cand of variants) {
			const base = mediaReferenceBasename(cand);
			if (!base) continue;
			const fuzzyPicked = findFuzzyStem(base);
			if (fuzzyPicked) {
				return { newVal: fuzzyPicked, method: "fuzzy-stem" };
			}
		}

		return { newVal: oldVal, method: "unresolved" };
	}

	return { resolve };
}

const assetsLines = fs
	.readFileSync(assetsPath, "utf8")
	.split(/\r?\n/)
	.filter(Boolean);

const { resolve } = buildResolver(
	assetsLines.map((l) => l.trim().split(/[/\\]/).pop())
);

const raw = fs.readFileSync(jsonPath, "utf8");
const data = JSON.parse(raw);

const changes = [];
let changedPosts = 0;

for (const post of data.posts || []) {
	let postTouched = false;

	if (post.imagen_filename && String(post.imagen_filename).trim()) {
		const r = resolve(String(post.imagen_filename).trim());
		if (r.newVal !== post.imagen_filename && r.method !== "unresolved") {
			changes.push({
				slug: post.slug,
				field: "imagen_filename",
				from: post.imagen_filename,
				to: r.newVal,
				method: r.method,
			});
			post.imagen_filename = r.newVal;
			postTouched = true;
		} else if (r.method === "unresolved") {
			changes.push({
				slug: post.slug,
				field: "imagen_filename",
				from: post.imagen_filename,
				to: null,
				method: "UNRESOLVED",
			});
		}
	}

	const cat = post.acf?.catalogo;
	if (cat && typeof cat === "object") {
		for (const [k, v] of Object.entries(cat)) {
			if (!k.startsWith("documento_pdf_") || !v || typeof v !== "object") continue;
			const nv = v.nombre_visible;
			if (!nv || !String(nv).trim()) continue;
			const s = String(nv).trim();
			const r = resolve(s);
			if (r.newVal !== s && r.method !== "unresolved") {
				changes.push({
					slug: post.slug,
					field: `${k}.nombre_visible`,
					from: s,
					to: r.newVal,
					method: r.method,
				});
				v.nombre_visible = r.newVal;
				postTouched = true;
			} else if (r.method === "unresolved") {
				changes.push({
					slug: post.slug,
					field: `${k}.nombre_visible`,
					from: s,
					to: null,
					method: "UNRESOLVED",
				});
			}
		}
	}

	if (postTouched) changedPosts++;
}

const applied = changes.filter((c) => c.to != null);
const unresolved = changes.filter((c) => c.method === "UNRESOLVED");

fs.copyFileSync(jsonPath, jsonPath + ".bak");
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");

const reportPath = path.join(root, "scripts", "fix-json-from-assets-report.txt");
fs.writeFileSync(
	reportPath,
	[
		`Updated: ${jsonPath}`,
		`Backup: ${jsonPath}.bak`,
		`Posts with at least one field changed: ${changedPosts}`,
		`Corrections applied: ${applied.length}`,
		`Still unresolved references: ${unresolved.length}`,
		"",
		"--- Sample corrections (first 80) ---",
		...applied.slice(0, 80).map(
			(c) =>
				`[${c.method}] ${c.slug} :: ${c.field}\n  ${c.from}\n  -> ${c.to}`
		),
		"",
		"--- Unresolved (first 60) ---",
		...unresolved.slice(0, 60).map((c) => `[${c.slug}] ${c.field}: ${c.from}`),
	].join("\n"),
	"utf8"
);

console.log("Backup:", jsonPath + ".bak");
console.log("Corrections applied:", applied.length);
console.log("Unresolved:", unresolved.length);
console.log("Report:", reportPath);
