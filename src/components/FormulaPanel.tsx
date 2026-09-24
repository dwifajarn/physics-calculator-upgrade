import type { CalculatorDef } from "../data/calculators"

export default function FormulaPanel({ def }: { def: CalculatorDef }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-white/10 bg-white/5 px-6 py-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-accent-400">
          Rumus &amp; Variabel
        </h2>
      </div>
      <div className="p-6">
        <div className="rounded-xl border border-white/10 bg-bg/60 px-5 py-4 text-center">
          <code className="text-lg font-bold text-white">{def.formula}</code>
        </div>

        <dl className="mt-5 space-y-3">
          {def.legend.map((l) => (
            <div key={l.symbol} className="flex items-baseline gap-3 text-sm">
              <dt className="grid h-7 min-w-7 place-items-center rounded-lg bg-brand-500/15 px-2 font-bold italic text-brand-300">
                {l.symbol}
              </dt>
              <dd className="flex-1 text-ink-muted">
                {l.meaning}
                {l.unit && <span className="text-ink-dim"> — {" "}{l.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
