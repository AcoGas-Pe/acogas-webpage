/**
 * Sustituye los nombres que no resolvió el emparejado automático por los basenames
 * reales en assets-names.txt (mapeo manual revisado).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = path.join(root, "wp-import-acf-payload.json");

/** [literal en JSON, nombre de archivo en medios WP] */
const OVERRIDES = [
	[
		"Instruction Manual (Type FL) Año 2024.pdf",
		"Instruction-Manual-Type-FL-Year-2024.pdf",
	],
	[
		"Instruction Manual (Type FL) Año 2025.pdf",
		"Instruction-Manual-Type-FL-Year-2025.pdf",
	],
	[
		"Instruction Manual (Type FL) Año 2019.pdf",
		"Instruction-Manual-Type-FL-Year-2019.pdf",
	],
	[
		"Instruction Manual (Type FL) Año 2024 - 2.pdf",
		"Instruction-Manual-Type-FL-Year-2024-2.pdf",
	],
	[
		"Instruction Manual (Type EZR Relief) Año 2019.pdf",
		"Instruction-Manual-Type-EZR-Relief-Year-2019.pdf",
	],
	[
		"Instruction Manual (Type EZR Relief) Año 2024.pdf",
		"Instruction-Manual-Type-EZR-Relief-Year-2024.pdf",
	],
	[
		"Important Product Safety Notice.pdf",
		"Important-Product-Safety-Notice-Models-215V-and-337.pdf",
	],
	[
		"Proven Results - Emerson’s High-Capacity Valves Cut Costs and Enhance Reliability for LNG Facility Overpressure Protection.pdf",
		"Case-Study-Emersons-High-Capacity-Valves-Cut-Costs-and-Enhance-Reliability-for-LNG-Facility-Overpressure-Protection.pdf",
	],
	[
		"Instrucciones de Instalación, Mantenimiento y Ajuste (Serie BP).pdf",
		"Instrucciones-de-Instalacion-Mantenimiento-y-Ajuste-Serie-BP-OMNI-TRIM.pdf",
	],
	[
		"Instrucciones de Instalación y Manteniento (Series 800 y 900).pdf",
		"Instrucciones-de-Instalacion-y-Mantenimiento-Series-800-y-900-OMNI-TRIM.pdf",
	],
	["2010B.png", "Serie-2010B.webp"],
	[
		"Instruction Manual (800 and 900 Series).pdf",
		"Instruction-Manual-North-America-Only-800-and-900-Series.pdf",
	],
	[
		"Instruction Manual (ES-800 and ES-900 Series).pdf",
		"Instruction-Manual-North-America-Only-ES-800-and-ES-900-Series.pdf",
	],
	[
		"Instruction Manual (ES-805 and ES-905 Series).pdf",
		"Instruction-Manual-North-America-Only-ES-805-and-ES-905-Series.pdf",
	],
	[
		"Instruction Manual (Serie 850 y 950).pdf",
		"Instruction-Manual-North-America-Only-Serie-850-y-950.pdf",
	],
	[
		"Manual de Instrucciones (Serie ES-850 y ES-950).pdf",
		"Manual-de-Instrucciones-Unicamente-Fuera-de-Norteamerica-Enardo-Serie-ES-850-y-Enardo-Serie-ES-950.pdf",
	],
	[
		"Instruccion Manual - North America Only (Enardo ES-850 y Enardo ES-950 Series).pdf",
		"Instruccion-Manual-Outside-North-America-Only-Enardo-ES-850-y-Enardo-ES-950-Series.pdf",
	],
	[
		"Instruccion Manual (ES-850 y ES-950 Series).pdf",
		"Instruction-Manual-North-America-Only-ES-850-y-ES-950-Series.pdf",
	],
	[
		"Instruction Manual (860 and 960 Series).pdf",
		"Instruction-Manual-North-America-Only-860-and-960-Series.pdf",
	],
	[
		"Instruction Manual (2000 and 2500 Series).pdf",
		"Instruction-Manual-North-America-Only-2000-and-2500-Series.pdf",
	],
	[
		"Installation Guide (Type Y693) Año 2002.pdf",
		"Installation-Guide-Type-Y693-Year-2002.pdf",
	],
	[
		"Installation Guide (Type Y693) Año 2015.pdf",
		"Installation-Guide-Type-Y693-Year-2015.pdf",
	],
	["LCR.iQ.png", "LCR.iQ_.webp"],
	["LCR.iQ.pdf", "LCR.iQ_.pdf"],
	[
		"Instruction Manual (FVFA Series).pdf",
		"Instruction-Manual-North-America-Only-EN-FVFA-Series.pdf",
	],
	[
		"Instruction Manual (7 Series) Year 2015.pdf",
		"Instruction-Manual-North-America-Only-7-Series.pdf",
	],
	[
		"Instruction Manual (7 Series) Year 2020.pdf",
		"Instruction-Manual-North-America-Only-7-Series.pdf",
	],
	[
		"Instruction Manual (7 Series) Year 2022.pdf",
		"Instruction-Manual-North-America-Only-7-Series.pdf",
	],
	[
		"Instruction Manual (DFA Series) Year 2020.pdf",
		"Instruction-Manual-North-America-Only-DFA-Series.pdf",
	],
	[
		"Instruction Manual (DFA Series) Year 2021.pdf",
		"Instruction-Manual-North-America-Only-DFA-Series.pdf",
	],
];

const map = new Map(OVERRIDES);

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
let n = 0;

for (const post of data.posts || []) {
	if (post.imagen_filename && map.has(post.imagen_filename.trim())) {
		post.imagen_filename = map.get(post.imagen_filename.trim());
		n++;
	}
	const cat = post.acf?.catalogo;
	if (!cat || typeof cat !== "object") continue;
	for (const v of Object.values(cat)) {
		if (!v || typeof v !== "object") continue;
		const nv = v.nombre_visible;
		if (!nv || typeof nv !== "string") continue;
		const t = nv.trim();
		if (map.has(t)) {
			v.nombre_visible = map.get(t);
			n++;
		}
	}
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
console.log("Overrides aplicados (campos tocados):", n);
console.log("Registros en mapa:", OVERRIDES.length);
