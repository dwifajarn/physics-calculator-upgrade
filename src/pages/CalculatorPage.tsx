import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { CalculatorForm } from "../components/CalculatorForm";
import { FormulaCard } from "../components/FormulaCard";
import { calculators, getCalculator } from "../data/calculators";
import { NotFound } from "./NotFound";

export function CalculatorPage() {
  const { slug = "" } = useParams();
  const calc = getCalculator(slug);

  if (!calc) return <NotFound />;

  const others = calculators.filter((c) => c.slug !== calc.slug).slice(0, 4);
  const Icon = calc.icon;

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1.5 text-sm text-muted">
          <li>
            <Link to="/" className="transition-colors hover:text-ink">
              Beranda
            </Link>
          </li>
          <li aria-hidden className="text-faint">
            <ChevronRight size={14} />
          </li>
          <li className="font-semibold text-ink">{calc.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/15">
          <Icon size={26} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {calc.title}
          </h1>
          <p className="mt-1 text-muted">{calc.tagline}</p>
        </div>
      </div>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {calc.description}
      </p>

      {/* Form + formula */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <CalculatorForm calc={calc} />
        <FormulaCard calc={calc} />
      </div>

      {/* Kalkulator lainnya */}
      <div className="mt-16">
        <h2 className="text-lg font-bold text-ink">Kalkulator lainnya</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => {
            const OtherIcon = c.icon;
            return (
              <Link
                key={c.slug}
                to={`/kalkulator/${c.slug}`}
                className="card card-hover flex items-center gap-3 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand-600">
                  <OtherIcon size={18} />
                </span>
                <span className="text-sm font-semibold text-ink">
                  {c.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
