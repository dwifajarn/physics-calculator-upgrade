import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Gauge,
  Rocket,
  Zap,
  Target,
  Weight,
  MoveRight,
} from "lucide-react";

export interface FieldDef {
  /** Unique key used as the form value identifier. */
  key: string;
  label: string;
  unit: string;
  placeholder?: string;
  /** Pre-filled value, e.g. standard gravity. */
  defaultValue?: string;
  /** Numeric constraints (optional, for validation messaging). */
  min?: number;
}

export interface ModeDef {
  /** Mode id from the original app: kinetic | mass | velocity | ... */
  id: string;
  /** Human label shown in the segmented control. */
  label: string;
  /** Which field key is the unknown (result) for this mode. */
  unknown: string;
}

export interface LegendItem {
  symbol: string;
  meaning: string;
  unit: string;
}

export interface CalculatorDef {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  formula: string;
  legend: LegendItem[];
  fields: FieldDef[];
  modes: ModeDef[];
  /**
   * Solve for `unknown` given the other numeric inputs.
   * All inputs are already parsed to finite numbers.
   */
  solve: (values: Record<string, number>, unknown: string) => number;
  /** Optional custom validation. Return an error string or null. */
  validate?: (
    values: Record<string, number>,
    unknown: string
  ) => string | null;
}

/** Standard gravity. Original app defaulted the g field to 9.8. */
export const GRAVITY = 9.8;

export const calculators: CalculatorDef[] = [
  {
    id: "kinetic",
    slug: "energi-kinetik",
    title: "Energi Kinetik",
    tagline: "Energi gerak suatu benda",
    description:
      "Energi kinetik adalah energi yang dimiliki benda karena kecepatannya. Benda yang diam tidak memiliki energi kinetik. Besarnya berbanding lurus dengan massa dan kuadrat kecepatan benda.",
    icon: Zap,
    formula: "Ek = ½ × m × v²",
    legend: [
      { symbol: "Ek", meaning: "Energi kinetik", unit: "J" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "v", meaning: "Kecepatan", unit: "m/s" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 5", min: 0 },
      { key: "v", label: "Kecepatan", unit: "m/s", placeholder: "mis. 10" },
      { key: "ek", label: "Energi Kinetik", unit: "J", placeholder: "hasil" },
    ],
    modes: [
      { id: "kinetic", label: "Energi Kinetik (Ek)", unknown: "ek" },
      { id: "mass", label: "Massa (m)", unknown: "m" },
      { id: "velocity", label: "Kecepatan (v)", unknown: "v" },
    ],
    solve: (v, unknown) => {
      if (unknown === "ek") return 0.5 * v.m * v.v * v.v;
      if (unknown === "m") return (2 * v.ek) / (v.v * v.v);
      return Math.sqrt((2 * v.ek) / v.m);
    },
    validate: (v, unknown) => {
      if (unknown === "m" && v.v === 0) return "Kecepatan tidak boleh nol.";
      return null;
    },
  },
  {
    id: "potential",
    slug: "energi-potensial",
    title: "Energi Potensial",
    tagline: "Energi karena posisi/ketinggian",
    description:
      "Energi potensial adalah energi yang dimiliki benda akibat kedudukan atau posisinya terhadap suatu acuan. Benda diam di ketinggian tertentu dapat memiliki energi potensial.",
    icon: Target,
    formula: "Ep = m × g × h",
    legend: [
      { symbol: "Ep", meaning: "Energi potensial", unit: "J" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "g", meaning: "Percepatan gravitasi", unit: "m/s²" },
      { symbol: "h", meaning: "Ketinggian", unit: "m" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 2", min: 0 },
      {
        key: "g",
        label: "Percepatan Gravitasi",
        unit: "m/s²",
        defaultValue: String(GRAVITY),
      },
      { key: "h", label: "Ketinggian", unit: "m", placeholder: "mis. 10" },
      { key: "ep", label: "Energi Potensial", unit: "J", placeholder: "hasil" },
    ],
    modes: [
      { id: "potential", label: "Energi Potensial (Ep)", unknown: "ep" },
      { id: "mass", label: "Massa (m)", unknown: "m" },
      { id: "gravity", label: "Gravitasi (g)", unknown: "g" },
      { id: "height", label: "Ketinggian (h)", unknown: "h" },
    ],
    solve: (v, unknown) => {
      if (unknown === "ep") return v.m * v.g * v.h;
      if (unknown === "m") return v.ep / (v.g * v.h);
      if (unknown === "g") return v.ep / (v.m * v.h);
      return v.ep / (v.m * v.g);
    },
    validate: (v, unknown) => {
      if (unknown === "m" && v.g * v.h === 0)
        return "Gravitasi dan ketinggian tidak boleh nol.";
      if (unknown === "g" && v.m * v.h === 0)
        return "Massa dan ketinggian tidak boleh nol.";
      if (unknown === "h" && v.m * v.g === 0)
        return "Massa dan gravitasi tidak boleh nol.";
      return null;
    },
  },
  {
    id: "newton",
    slug: "hukum-newton",
    title: "Hukum Newton II",
    tagline: "Gaya dari perubahan kecepatan",
    description:
      "Hukum II Newton menyatakan bahwa percepatan benda berbanding lurus dengan gaya total yang bekerja dan berbanding terbalik dengan massanya. Gaya dihitung dari perubahan kecepatan tiap waktu.",
    icon: Weight,
    formula: "F = m × (v - v₀) / t",
    legend: [
      { symbol: "F", meaning: "Gaya", unit: "N" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "v", meaning: "Kecepatan akhir", unit: "m/s" },
      { symbol: "v₀", meaning: "Kecepatan awal", unit: "m/s" },
      { symbol: "t", meaning: "Waktu", unit: "s" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 4", min: 0 },
      {
        key: "v",
        label: "Kecepatan Akhir",
        unit: "m/s",
        placeholder: "mis. 12",
      },
      {
        key: "v0",
        label: "Kecepatan Awal",
        unit: "m/s",
        placeholder: "mis. 2",
      },
      { key: "t", label: "Waktu", unit: "s", placeholder: "mis. 5", min: 0 },
    ],
    modes: [{ id: "force", label: "Gaya (F)", unknown: "f" }],
    solve: (v) => v.m * (v.v - v.v0) / v.t,
    validate: (v) => {
      if (v.t === 0) return "Waktu tidak boleh nol.";
      if (v.v <= v.v0)
        return "Kecepatan akhir harus lebih besar daripada kecepatan awal.";
      return null;
    },
  },
  {
    id: "glbb",
    slug: "kecepatan-glbb",
    title: "Kecepatan GLBB",
    tagline: "Gerak lurus berubah beraturan",
    description:
      "GLBB adalah gerak pada lintasan lurus dengan percepatan tetap. Kecepatan benda berubah secara teratur tiap satuan waktu, sehingga dapat dipercepat maupun diperlambat.",
    icon: Rocket,
    formula: "v = v₀ + a × t",
    legend: [
      { symbol: "v", meaning: "Kecepatan akhir", unit: "m/s" },
      { symbol: "v₀", meaning: "Kecepatan awal", unit: "m/s" },
      { symbol: "a", meaning: "Percepatan", unit: "m/s²" },
      { symbol: "t", meaning: "Waktu", unit: "s" },
    ],
    fields: [
      {
        key: "v0",
        label: "Kecepatan Awal",
        unit: "m/s",
        placeholder: "mis. 0",
      },
      { key: "a", label: "Percepatan", unit: "m/s²", placeholder: "mis. 2" },
      { key: "t", label: "Waktu", unit: "s", placeholder: "mis. 5" },
      {
        key: "v",
        label: "Kecepatan Akhir",
        unit: "m/s",
        placeholder: "hasil",
      },
    ],
    modes: [
      { id: "velocity", label: "Kecepatan (v)", unknown: "v" },
      { id: "v0", label: "Kecepatan Awal (v₀)", unknown: "v0" },
      { id: "accel", label: "Percepatan (a)", unknown: "a" },
      { id: "time", label: "Waktu (t)", unknown: "t" },
    ],
    solve: (v, unknown) => {
      if (unknown === "v") return v.v0 + v.a * v.t;
      if (unknown === "v0") return v.v - v.a * v.t;
      if (unknown === "a") return (v.v - v.v0) / v.t;
      return (v.v - v.v0) / v.a;
    },
    validate: (v, unknown) => {
      if (unknown === "a" && v.t === 0) return "Waktu tidak boleh nol.";
      if (unknown === "t" && v.a === 0) return "Percepatan tidak boleh nol.";
      return null;
    },
  },
  {
    id: "mechanical",
    slug: "energi-mekanik",
    title: "Energi Mekanik",
    tagline: "Total energi kinetik + potensial",
    description:
      "Energi mekanik adalah jumlah energi kinetik dan energi potensial suatu benda. Pada sistem tanpa gesekan, energi mekanik total bersifat kekal.",
    icon: Activity,
    formula: "Em = Ek + Ep = ½mv² + mgh",
    legend: [
      { symbol: "Em", meaning: "Energi mekanik", unit: "J" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "v", meaning: "Kecepatan", unit: "m/s" },
      { symbol: "g", meaning: "Percepatan gravitasi", unit: "m/s²" },
      { symbol: "h", meaning: "Ketinggian", unit: "m" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 2", min: 0 },
      { key: "v", label: "Kecepatan", unit: "m/s", placeholder: "mis. 6" },
      {
        key: "g",
        label: "Percepatan Gravitasi",
        unit: "m/s²",
        defaultValue: String(GRAVITY),
      },
      { key: "h", label: "Ketinggian", unit: "m", placeholder: "mis. 4" },
      { key: "em", label: "Energi Mekanik", unit: "J", placeholder: "hasil" },
    ],
    modes: [{ id: "mechanical", label: "Energi Mekanik (Em)", unknown: "em" }],
    solve: (v) => 0.5 * v.m * v.v * v.v + v.m * v.g * v.h,
  },
  {
    id: "glb",
    slug: "glb",
    title: "GLB (Jarak, Kecepatan)",
    tagline: "Gerak lurus beraturan",
    description:
      "GLB adalah gerak pada lintasan lurus dengan kecepatan tetap. Hubungan jarak, kecepatan, dan waktu dinyatakan sebagai s = v × t.",
    icon: MoveRight,
    formula: "s = v × t",
    legend: [
      { symbol: "s", meaning: "Jarak", unit: "m" },
      { symbol: "v", meaning: "Kecepatan", unit: "m/s" },
      { symbol: "t", meaning: "Waktu", unit: "s" },
    ],
    fields: [
      { key: "s", label: "Jarak", unit: "m", placeholder: "hasil" },
      { key: "v", label: "Kecepatan", unit: "m/s", placeholder: "mis. 8" },
      { key: "t", label: "Waktu", unit: "s", placeholder: "mis. 10" },
    ],
    modes: [
      { id: "distance", label: "Jarak (s)", unknown: "s" },
      { id: "velocity", label: "Kecepatan (v)", unknown: "v" },
      { id: "time", label: "Waktu (t)", unknown: "t" },
    ],
    solve: (v, unknown) => {
      if (unknown === "s") return v.v * v.t;
      if (unknown === "v") return v.s / v.t;
      return v.s / v.v;
    },
    validate: (v, unknown) => {
      if (unknown === "v" && v.t === 0) return "Waktu tidak boleh nol.";
      if (unknown === "t" && v.v === 0) return "Kecepatan tidak boleh nol.";
      return null;
    },
  },
  {
    id: "power",
    slug: "daya",
    title: "Daya",
    tagline: "Laju usaha per satuan waktu",
    description:
      "Daya adalah laju dilakukannya usaha atau perubahan energi tiap satuan waktu. Daya menyatakan seberapa cepat suatu kerja diselesaikan.",
    icon: Gauge,
    formula: "P = W / t",
    legend: [
      { symbol: "P", meaning: "Daya", unit: "W" },
      { symbol: "W", meaning: "Usaha/Energi", unit: "J" },
      { symbol: "t", meaning: "Waktu", unit: "s" },
    ],
    fields: [
      { key: "p", label: "Daya", unit: "W", placeholder: "hasil" },
      { key: "w", label: "Usaha/Energi", unit: "J", placeholder: "mis. 100" },
      { key: "t", label: "Waktu", unit: "s", placeholder: "mis. 5", min: 0 },
    ],
    modes: [
      { id: "power", label: "Daya (P)", unknown: "p" },
      { id: "work", label: "Usaha (W)", unknown: "w" },
      { id: "time", label: "Waktu (t)", unknown: "t" },
    ],
    solve: (v, unknown) => {
      if (unknown === "p") return v.w / v.t;
      if (unknown === "w") return v.p * v.t;
      return v.w / v.p;
    },
    validate: (v, unknown) => {
      if (unknown === "p" && v.t === 0) return "Waktu tidak boleh nol.";
      if (unknown === "t" && v.p === 0) return "Daya tidak boleh nol.";
      return null;
    },
  },
];

/** Calculators shown in the hero / first grid (the originals). */
export const coreCalculators = calculators.filter((c) =>
  ["kinetic", "potential", "newton", "glbb"].includes(c.id)
);

/** The extra calculators added in this redesign. */
export const extendedCalculators = calculators.filter(
  (c) => !coreCalculators.includes(c)
);

export function getCalculator(slug: string): CalculatorDef | undefined {
  return calculators.find((c) => c.slug === slug);
}
