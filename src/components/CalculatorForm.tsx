import { useMemo, useState, type FormEvent } from "react";
import { Check, Copy, RotateCcw, Sigma } from "lucide-react";
import type { CalculatorDef } from "../data/calculators";
import { formatNumber, parseInput } from "../lib/format";
import { SegmentedControl } from "./SegmentedControl";

interface SolveResult {
  value: number;
  label: string;
  unit: string;
}

export function CalculatorForm({ calc }: { calc: CalculatorDef }) {
  const outputField = useMemo(() => {
    // The field that is "hasil" (a pure output) in the original design:
    // the one whose placeholder is "hasil".
    return calc.fields.find((f) => f.placeholder === "hasil");
  }, [calc]);

  const [mode, setMode] = useState(calc.modes[0].id);
  const activeMode = calc.modes.find((m) => m.id === mode) ?? calc.modes[0];
  const unknown = activeMode.unknown;

  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of calc.fields) init[f.key] = f.defaultValue ?? "";
    return init;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SolveResult | null>(null);
  const [copied, setCopied] = useState(false);

  const setValue = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const reset = () => {
    const init: Record<string, string> = {};
    for (const f of calc.fields) init[f.key] = f.defaultValue ?? "";
    setValues(init);
    setErrors({});
    setResult(null);
    setCopied(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCopied(false);

    const numeric: Record<string, number> = {};
    const nextErrors: Record<string, string> = {};

    for (const f of calc.fields) {
      if (f.key === unknown) continue; // solved, not entered
      const parsed = parseInput(values[f.key] ?? "");
      if (!Number.isFinite(parsed)) {
        nextErrors[f.key] = `Mohon isi kolom "${f.label}" dengan angka yang valid.`;
        continue;
      }
      if (f.min !== undefined && parsed < f.min) {
        nextErrors[f.key] = `Nilai "${f.label}" tidak boleh negatif.`;
        continue;
      }
      numeric[f.key] = parsed;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const customError = calc.validate?.(numeric, unknown);
    if (customError) {
      setErrors({ [unknown]: customError });
      setResult(null);
      return;
    }

    const solved = calc.solve(numeric, unknown);
    if (!Number.isFinite(solved)) {
      setErrors({
        [unknown]: "Perhitungan tidak valid dengan nilai yang dimasukkan.",
      });
      setResult(null);
      return;
    }

    const unknownField = calc.fields.find((f) => f.key === unknown);
    setErrors({});
    setResult({
      value: solved,
      label: unknownField?.label ?? "Hasil",
      unit: unknownField?.unit ?? "",
    });
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `${result.label}: ${formatNumber(result.value)} ${result.unit}`.trim();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Inputs shown in the form: all fields except a pure-output field that is
  // never the unknown (handled below). The unknown field is rendered disabled.
  const visibleFields = calc.fields.filter((f) => f.key !== outputField?.key || f.key === unknown);

  return (
    <div className="card p-6 sm:p-7">
      <div>
        <p className="text-sm font-semibold text-muted">Hitung apa?</p>
        <div className="mt-3">
          <SegmentedControl
            name="Mode perhitungan"
            value={mode}
            options={calc.modes.map((m) => ({ value: m.id, label: m.label }))}
            onChange={(v) => {
              setMode(v);
              setResult(null);
              setErrors({});
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {visibleFields.map((f) => {
          const isUnknown = f.key === unknown;
          const fieldError = errors[f.key];
          return (
            <div key={f.key}>
              <label
                htmlFor={`field-${f.key}`}
                className="field-label"
              >
                <span>{f.label}</span>
                {isUnknown ? (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-700">
                    dicari
                  </span>
                ) : (
                  <span className="text-xs font-normal text-faint">
                    {f.unit}
                  </span>
                )}
              </label>
              <div className="relative mt-2">
                <input
                  id={`field-${f.key}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  disabled={isUnknown}
                  value={values[f.key] ?? ""}
                  placeholder={isUnknown ? "otomatis" : f.placeholder}
                  onChange={(e) => setValue(f.key, e.target.value)}
                  aria-invalid={Boolean(fieldError)}
                  className="field-input tabnums pr-16"
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-faint">
                  {f.unit}
                </span>
              </div>
              {fieldError && (
                <p className="mt-1.5 text-sm text-red-500">{fieldError}</p>
              )}
            </div>
          );
        })}

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className="btn-primary flex-1 sm:flex-none">
            <Sigma size={16} />
            Hitung
          </button>
          <button type="button" onClick={reset} className="btn-ghost">
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div
          className="mt-6 animate-fade-in rounded-2xl border border-brand-500/30 bg-brand-50 p-5"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-700">
                Hasil {result.label}
              </p>
              <p className="tabnums mt-1 text-3xl font-extrabold tracking-tight text-ink">
                {formatNumber(result.value)}
                <span className="ml-1.5 text-base font-semibold text-muted">
                  {result.unit}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={copyResult}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-500/25 bg-surface text-brand-700 transition hover:bg-surface-2"
              aria-label="Salin hasil"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
