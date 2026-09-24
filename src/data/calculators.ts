/**
 * Central definition of every calculator in the app.
 * Keeping the physics + metadata in one place means the landing page and the
 * individual calculator pages always stay in sync.
 */

export type SolveMode = "kinetic" | "potential" | "newton" | "glbb"

export interface FieldDef {
  /** key used in the form state */
  key: string
  /** visible label */
  label: string
  /** unit suffix shown next to the input */
  unit: string
  /** placeholder text */
  placeholder?: string
  /** default value, if any */
  defaultValue?: string
}

export interface SolveModeDef {
  /** value passed to the calculator to select the unknown */
  id: string
  /** radio label, e.g. "Energi Kinetik" */
  label: string
  /** which field key is the unknown for this mode */
  unknown: string
}

export interface CalculatorDef {
  id: SolveMode
  /** route slug */
  slug: string
  /** short title */
  title: string
  /** one-line tagline */
  tagline: string
  /** longer description for the landing cards / detail page */
  description: string
  /** icon emoji (keeps the bundle tiny, no icon lib needed) */
  icon: string
  /** accent used for the card glow */
  accent: string
  /** formula shown in the "Rumus" panel (plain text/JSX-safe string) */
  formula: string
  /** variable legend */
  legend: { symbol: string; meaning: string; unit?: string }[]
  /** input fields */
  fields: FieldDef[]
  /** selectable solve modes */
  modes: SolveModeDef[]
  /**
   * Pure function that computes the result.
   * Receives the raw numeric inputs and the selected mode id,
   * returns the numeric answer for the unknown field.
   */
  solve: (values: Record<string, number>, modeId: string) => number
}

const round = (n: number, decimals = 2): number => {
  const f = Math.pow(10, decimals)
  return Math.round(n * f) / f
}

export const calculators: CalculatorDef[] = [
  {
    id: "kinetic",
    slug: "energi-kinetik",
    title: "Energi Kinetik",
    tagline: "Energi gerak suatu benda",
    description:
      "Energi kinetik adalah energi yang dimiliki benda karena kecepatannya. Benda yang diam tidak memiliki energi kinetik. Besarnya berbanding lurus dengan massa dan kuadrat kecepatan benda.",
    icon: "⚡",
    accent: "from-brand-500/30 to-accent-500/20",
    formula: "Ek = ½ · m · v²",
    legend: [
      { symbol: "Ek", meaning: "Energi kinetik", unit: "J" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "v", meaning: "Kecepatan", unit: "m/s" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 5" },
      { key: "v", label: "Kecepatan", unit: "m/s", placeholder: "mis. 10" },
      { key: "ek", label: "Energi Kinetik", unit: "J", placeholder: "hasil" },
    ],
    modes: [
      { id: "kinetic", label: "Energi Kinetik (Ek)", unknown: "ek" },
      { id: "mass", label: "Massa (m)", unknown: "m" },
      { id: "velocity", label: "Kecepatan (v)", unknown: "v" },
    ],
    solve: (val, modeId) => {
      if (modeId === "kinetic") return round(0.5 * val.m * val.v * val.v)
      if (modeId === "mass") return round((2 * val.ek) / (val.v * val.v))
      return round(Math.sqrt((2 * val.ek) / val.m))
    },
  },
  {
    id: "potential",
    slug: "energi-potensial",
    title: "Energi Potensial",
    tagline: "Energi karena posisi/ketinggian",
    description:
      "Energi potensial adalah energi yang dimiliki benda akibat kedudukan atau posisinya terhadap suatu acuan. Benda diam di ketinggian tertentu dapat memiliki energi potensial.",
    icon: "🎯",
    accent: "from-accent-500/30 to-brand-500/20",
    formula: "Ep = m · g · h",
    legend: [
      { symbol: "Ep", meaning: "Energi potensial", unit: "J" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "g", meaning: "Percepatan gravitasi", unit: "m/s²" },
      { symbol: "h", meaning: "Ketinggian", unit: "m" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 2" },
      { key: "g", label: "Percepatan Gravitasi", unit: "m/s²", defaultValue: "9.8" },
      { key: "h", label: "Ketinggian", unit: "m", placeholder: "mis. 10" },
      { key: "ep", label: "Energi Potensial", unit: "J", placeholder: "hasil" },
    ],
    modes: [
      { id: "potential", label: "Energi Potensial (Ep)", unknown: "ep" },
      { id: "mass", label: "Massa (m)", unknown: "m" },
      { id: "gravity", label: "Gravitasi (g)", unknown: "g" },
      { id: "height", label: "Ketinggian (h)", unknown: "h" },
    ],
    solve: (val, modeId) => {
      if (modeId === "potential") return round(val.m * val.g * val.h)
      if (modeId === "mass") return round(val.ep / (val.g * val.h))
      if (modeId === "gravity") return round(val.ep / (val.m * val.h))
      return round(val.ep / (val.m * val.g))
    },
  },
  {
    id: "newton",
    slug: "hukum-newton",
    title: "Hukum Newton II",
    tagline: "Gaya dari perubahan kecepatan",
    description:
      "Hukum II Newton menyatakan bahwa percepatan benda berbanding lurus dengan gaya total yang bekerja dan berbanding terbalik dengan massanya. Gaya dihitung dari perubahan kecepatan tiap waktu.",
    icon: "🧲",
    accent: "from-brand-500/30 to-accent-500/30",
    formula: "F = m · (v − v₀) / t",
    legend: [
      { symbol: "F", meaning: "Gaya", unit: "N" },
      { symbol: "m", meaning: "Massa", unit: "kg" },
      { symbol: "v", meaning: "Kecepatan akhir", unit: "m/s" },
      { symbol: "v₀", meaning: "Kecepatan awal", unit: "m/s" },
      { symbol: "t", meaning: "Waktu", unit: "s" },
    ],
    fields: [
      { key: "m", label: "Massa", unit: "kg", placeholder: "mis. 4" },
      { key: "v", label: "Kecepatan Akhir", unit: "m/s", placeholder: "mis. 12" },
      { key: "v0", label: "Kecepatan Awal", unit: "m/s", placeholder: "mis. 2" },
      { key: "t", label: "Waktu", unit: "s", placeholder: "mis. 5" },
    ],
    modes: [{ id: "newton", label: "Gaya (F)", unknown: "f" }],
    solve: (val) => round((val.m * (val.v - val.v0)) / val.t, 4),
  },
  {
    id: "glbb",
    slug: "kecepatan-glbb",
    title: "Kecepatan GLBB",
    tagline: "Gerak lurus berubah beraturan",
    description:
      "GLBB adalah gerak pada lintasan lurus dengan percepatan tetap. Kecepatan benda berubah secara teratur tiap satuan waktu, sehingga dapat dipercepat maupun diperlambat.",
    icon: "🚀",
    accent: "from-accent-500/30 to-brand-500/20",
    formula: "v = v₀ + a · t",
    legend: [
      { symbol: "v", meaning: "Kecepatan akhir", unit: "m/s" },
      { symbol: "v₀", meaning: "Kecepatan awal", unit: "m/s" },
      { symbol: "a", meaning: "Percepatan", unit: "m/s²" },
      { symbol: "t", meaning: "Waktu", unit: "s" },
    ],
    fields: [
      { key: "v0", label: "Kecepatan Awal", unit: "m/s", placeholder: "mis. 0" },
      { key: "a", label: "Percepatan", unit: "m/s²", placeholder: "mis. 2" },
      { key: "t", label: "Waktu", unit: "s", placeholder: "mis. 5" },
      { key: "v", label: "Kecepatan Akhir", unit: "m/s", placeholder: "hasil" },
    ],
    modes: [
      { id: "velocity", label: "Kecepatan (v)", unknown: "v" },
      { id: "v0", label: "Kecepatan Awal (v₀)", unknown: "v0" },
      { id: "accel", label: "Percepatan (a)", unknown: "a" },
      { id: "time", label: "Waktu (t)", unknown: "t" },
    ],
    solve: (val, modeId) => {
      if (modeId === "velocity") return round(val.v0 + val.a * val.t)
      if (modeId === "v0") return round(val.v - val.a * val.t)
      if (modeId === "accel") return round((val.v - val.v0) / val.t)
      return round((val.v - val.v0) / val.a)
    },
  },
]

export const getCalculator = (slug: string): CalculatorDef | undefined =>
  calculators.find((c) => c.slug === slug)

export const teamMembers = [
  { name: "Dwi Fajar Nugroho", nim: "230611002", role: "Informatika S1" },
  { name: "Igris Rizkia Kurniawan", nim: "230611011", role: "Informatika S1" },
  { name: "Pandu Kukuh Waskito Wibowo", nim: "230611018", role: "Informatika S1" },
]
