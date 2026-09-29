import { Link } from "react-router-dom";
import { calculators } from "../data/calculators";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2.5 text-lg font-extrabold text-ink"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-sm text-white">
              Φ
            </span>
            <span>
              Physics<span className="text-brand-600">Calc</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Kalkulator fisika interaktif untuk membantu memahami konsep dasar
            dengan cepat dan mudah.
          </p>
        </div>

        <nav aria-label="Kalkulator">
          <h2 className="text-sm font-bold uppercase tracking-widest text-faint">
            Kalkulator
          </h2>
          <ul className="mt-4 space-y-2">
            {calculators.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/kalkulator/${c.slug}`}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-faint">
            Proyek
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tugas Ujian Akhir Semester (UAS)
            <br />
            Mata kuliah Fisika Dasar 1
            <br />
            Program Studi Informatika S1
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-faint sm:flex-row">
          <p>© {year} Physics Calculator</p>
          <p>Dibangun dengan React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
