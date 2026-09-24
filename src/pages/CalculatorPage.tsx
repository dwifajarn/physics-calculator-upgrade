import { Link, useParams } from "react-router-dom"
import Calculator from "../components/Calculator"
import FormulaPanel from "../components/FormulaPanel"
import { calculators, getCalculator } from "../data/calculators"
import NotFound from "./NotFound"

export default function CalculatorPage() {
  const { slug } = useParams<{ slug: string }>()
  const def = slug ? getCalculator(slug) : undefined

  if (!def) return <NotFound />

  const others = calculators.filter((c) => c.slug !== def.slug)

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-ink-dim">
          <li>
            <Link to="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink-muted">{def.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span
          aria-hidden="true"
          className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-3xl shadow-glow"
        >
          {def.icon}
        </span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {def.title}
          </h1>
          <p className="mt-1 text-ink-muted">{def.tagline}</p>
        </div>
      </header>

      <p className="mb-8 max-w-3xl leading-relaxed text-ink-muted">{def.description}</p>

      {/* Calculator + formula */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Calculator def={def} />
        <FormulaPanel def={def} />
      </div>

      {/* Other calculators */}
      <section className="mt-14">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-ink-dim">
          Kalkulator lainnya
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              to={`/kalkulator/${c.slug}`}
              className="card flex items-center gap-3 p-4 transition hover:-translate-y-1 hover:border-brand-400/50"
            >
              <span aria-hidden="true" className="text-2xl">
                {c.icon}
              </span>
              <span className="font-semibold text-white">{c.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
