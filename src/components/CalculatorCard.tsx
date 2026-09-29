import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CalculatorDef } from "../data/calculators";

export function CalculatorCard({
  calc,
  index = 0,
}: {
  calc: CalculatorDef;
  index?: number;
}) {
  const Icon = calc.icon;
  return (
    <Link
      to={`/kalkulator/${calc.slug}`}
      className="card card-hover group relative flex flex-col p-6 sm:p-7"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15 transition group-hover:bg-brand-500 group-hover:text-white">
          <Icon size={22} />
        </span>
        <span className="tabnums rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink">
          {calc.formula}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-ink">{calc.title}</h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{calc.tagline}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {calc.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
        Buka kalkulator
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
