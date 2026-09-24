import { useMemo, useState } from "react"
import type { CalculatorDef } from "../data/calculators"

interface Props {
  def: CalculatorDef
}

type Values = Record<string, string>

/** Build the initial form state from the field definitions. */
function initialValues(def: CalculatorDef): Values {
  const values: Values = {}
  def.fields.forEach((f) => {
    values[f.key] = f.defaultValue ?? ""
  })
  return values
}

const formatNumber = (n: number): string => {
  if (!Number.isFinite(n)) return ""
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10000) / 10000)
}

export default function Calculator({ def }: Props) {
  const [modeId, setModeId] = useState(def.modes[0].id)
  const [values, setValues] = useState<Values>(() => initialValues(def))
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const activeMode = def.modes.find((m) => m.id === modeId) ?? def.modes[0]
  const unknownKey = activeMode.unknown

  const setField = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setError(null)
    setResult(null)
  }

  const reset = () => {
    setValues(initialValues(def))
    setResult(null)
    setError(null)
    setModeId(def.modes[0].id)
  }

  const handleCalculate = () => {
    // Collect all required (known) numeric inputs.
    const numeric: Record<string, number> = {}
    for (const field of def.fields) {
      if (field.key === unknownKey) continue
      const raw = values[field.key]?.trim() ?? ""
      const num = Number(raw)
      if (raw === "" || Number.isNaN(num)) {
        setError(`Mohon isi kolom "${field.label}" dengan angka yang valid.`)
        setResult(null)
        return
      }
      numeric[field.key] = num
    }

    // Some formulas require certain conditions.
    if (def.id === "newton" && numeric.v <= numeric.v0) {
      setError("Kecepatan akhir harus lebih besar daripada kecepatan awal.")
      setResult(null)
      return
    }
    if (def.id === "kinetic" && modeId === "mass" && numeric.v === 0) {
      setError("Kecepatan tidak boleh nol.")
      setResult(null)
      return
    }
    if (def.id === "glbb" && modeId === "time" && numeric.a === 0) {
      setError("Percepatan tidak boleh nol.")
      setResult(null)
      return
    }

    const answer = def.solve(numeric, modeId)
    if (!Number.isFinite(answer)) {
      setError("Perhitungan tidak valid dengan nilai yang dimasukkan.")
      setResult(null)
      return
    }
    setError(null)
    setResult(answer)
  }

  const resultField = def.fields.find((f) => f.key === unknownKey)
  const resultUnit = resultField?.unit ?? ""

  const resultText = useMemo(
    () => (result === null ? "" : `${formatNumber(result)} ${resultUnit}`.trim()),
    [result, resultUnit],
  )

  return (
    <div className="card p-5 sm:p-7">
      {/* Solve-mode selector */}
      {def.modes.length > 1 && (
        <fieldset className="mb-6">
          <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-400">
            Hitung apa?
          </legend>
          <div className="flex flex-wrap gap-2">
            {def.modes.map((m) => (
              <label
                key={m.id}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  modeId === m.id
                    ? "border-transparent bg-brand-gradient text-white shadow-glow"
                    : "border-white/15 bg-white/5 text-ink-muted hover:border-brand-400 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="solve-mode"
                  value={m.id}
                  checked={modeId === m.id}
                  onChange={() => {
                    setModeId(m.id)
                    setResult(null)
                    setError(null)
                  }}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        {def.fields.map((field) => {
          const isUnknown = field.key === unknownKey
          const val = isUnknown && result !== null ? formatNumber(result) : values[field.key]
          return (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label htmlFor={`f-${field.key}`} className="field-label">
                {field.label}
                {isUnknown && (
                  <span className="ml-2 rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
                    dicari
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  id={`f-${field.key}`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  readOnly={isUnknown}
                  value={val}
                  placeholder={field.placeholder}
                  onChange={(e) => setField(field.key, e.target.value)}
                  className={`field-input pr-16 ${
                    isUnknown ? "border-accent-400/40 bg-brand-500/10 font-bold text-accent-300" : ""
                  }`}
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-ink-dim">
                  {field.unit}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Error */}
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200"
        >
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={handleCalculate} className="btn-primary">
          Hitung
        </button>
        <button type="button" onClick={reset} className="btn-ghost">
          Reset
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div
          aria-live="polite"
          className="mt-6 flex flex-col items-start gap-1 rounded-xl2 border border-accent-400/30 bg-brand-500/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-sm font-semibold text-ink-muted">
            Hasil {resultField?.label}
          </span>
          <span className="text-2xl font-extrabold text-accent-300">{resultText}</span>
        </div>
      )}
    </div>
  )
}
