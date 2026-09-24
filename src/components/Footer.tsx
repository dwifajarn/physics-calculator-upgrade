import { Link } from "react-router-dom"
import { calculators } from "../data/calculators"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-soft/60">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2.5 font-extrabold text-white">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-sm shadow-glow"
            >
              Φ
            </span>
            Physics<span className="-ml-1.5 text-brand-400">Calc</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Kalkulator fisika interaktif untuk membantu memahami konsep dasar dengan cepat
            dan mudah.
          </p>
        </div>

        <nav aria-label="Kalkulator">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ink-dim">
            Kalkulator
          </h2>
          <ul className="mt-4 space-y-2">
            {calculators.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/kalkulator/${c.slug}`}
                  className="text-sm text-ink-muted transition-colors hover:text-white"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ink-dim">
            Proyek
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Tugas Ujian Akhir Semester (UAS)
            <br />
            Mata kuliah Fisika Dasar 1
            <br />
            Program Studi Informatika S1
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Physics Calculator</p>
          <p>Dibangun dengan React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
