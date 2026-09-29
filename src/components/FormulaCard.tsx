import type { CalculatorDef } from "../data/calculators";

export function FormulaCard({ calc }: { calc: CalculatorDef }) {
  return (
    <div className="card p-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-faint">
        Rumus &amp; Variabel
      </h2>

      <div className="mt-4 rounded-xl bg-surface-2 px-4 py-5 text-center">
        <p className="tabnums text-xl font-bold tracking-tight text-ink">
          {calc.formula}
        </p>
      </div>

      <dl className="mt-4 divide-y divide-line">
        {calc.legend.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between gap-4 py-2.5 text-sm"
          >
            <dt className="flex items-center gap-3">
              <span className="tabnums grid h-8 min-w-8 place-items-center rounded-lg border border-line bg-surface px-2 font-bold text-brand-600">
                {item.symbol}
              </span>
              <span className="text-muted">{item.meaning}</span>
            </dt>
            <dd className="tabnums font-semibold text-ink">{item.unit}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
