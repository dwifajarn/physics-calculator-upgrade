import { Link } from "react-router-dom"
import { calculators, teamMembers } from "../data/calculators"

const features = [
  { icon: "⚡", title: "Cepat & Akurat", text: "Hasil perhitungan langsung dengan presisi yang dapat diandalkan." },
  { icon: "🧠", title: "Mudah Dipahami", text: "Setiap kalkulator dilengkapi rumus dan penjelasan variabelnya." },
  { icon: "📱", title: "Responsif", text: "Nyaman dipakai di ponsel, tablet, maupun desktop." },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(70%_70%_at_50%_40%,#000_40%,transparent_100%)]"
        />
        <div className="container-page relative flex flex-col items-center py-20 text-center sm:py-28 lg:py-36">
          <span className="animate-fade-up rounded-full border border-brand-400/35 bg-brand-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-300">
            Fisika Dasar 1 · Proyek UAS
          </span>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">Kalkulator Fisika</span>
            <br />
            <span className="text-white">Berbasis Website</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Hitung Energi Kinetik, Energi Potensial, Hukum Newton II, dan Kecepatan GLBB
            secara interaktif — cepat, akurat, dan mudah dipahami.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/kalkulator/energi-kinetik" className="btn-primary">
              Mulai Menghitung
            </Link>
            <a href="#kalkulator" className="btn-ghost">
              Lihat Semua Kalkulator
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="tentang" className="border-y border-white/10 bg-bg-soft/60">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Belajar fisika jadi lebih mudah
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Proyek ini dibuat untuk membantu mempermudah perhitungan berbagai konsep fisika
              secara interaktif. Cukup masukkan nilai yang diketahui, pilih besaran yang ingin
              dicari, dan hasilnya langsung tampil.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card p-6 text-center transition hover:-translate-y-1">
                <span
                  aria-hidden="true"
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-2xl shadow-glow"
                >
                  {f.icon}
                </span>
                <h3 className="mt-4 font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator grid */}
      <section id="kalkulator" className="container-page py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Pilih Kalkulator</h2>
          <p className="mt-3 text-ink-muted">
            Empat konsep dasar fisika yang dapat kamu hitung saat ini.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {calculators.map((c) => (
            <Link
              key={c.slug}
              to={`/kalkulator/${c.slug}`}
              className={`card group relative overflow-hidden p-6 transition hover:-translate-y-1.5 hover:border-brand-400/50 sm:p-7`}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.accent} blur-2xl transition-opacity group-hover:opacity-100`}
              />
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10"
                >
                  {c.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-brand-300">{c.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300">
                  Buka kalkulator
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="tim" className="border-t border-white/10 bg-bg-soft/60">
        <div className="container-page py-16 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Anggota Kelompok</h2>
            <p className="mt-3 text-ink-muted">
              Disusun oleh mahasiswa Program Studi Informatika S1.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <div key={m.nim} className="card p-6 text-center transition hover:-translate-y-1">
                <span
                  aria-hidden="true"
                  className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-gradient text-xl font-extrabold text-white shadow-glow"
                >
                  {m.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </span>
                <h3 className="mt-4 font-bold text-white">{m.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">NIM {m.nim}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-ink-dim">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
