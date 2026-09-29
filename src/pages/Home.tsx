import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../components/Badge";
import { Section, SectionHeading } from "../components/Section";
import { CalculatorCard } from "../components/CalculatorCard";
import {
  calculators,
  coreCalculators,
  extendedCalculators,
} from "../data/calculators";
import { team, initials } from "../data/team";

const features = [
  {
    title: "Cepat & Akurat",
    body: "Hasil perhitungan langsung dengan presisi yang dapat diandalkan.",
  },
  {
    title: "Mudah Dipahami",
    body: "Setiap kalkulator dilengkapi rumus dan penjelasan variabelnya.",
  },
  {
    title: "Mode Terang & Gelap",
    body: "Nyaman dipakai kapan saja, siang maupun malam, di perangkat apa pun.",
  },
  {
    title: "Salin Hasil",
    body: "Satu klik untuk menyalin hasil perhitungan ke catatan atau tugasmu.",
  },
];

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* single soft glow, kept light for paint performance */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 max-w-4xl rounded-full bg-brand-500/10 blur-2xl"
        />

        <div className="container-page relative flex flex-col items-center py-20 text-center sm:py-28 lg:py-32">
          <div className="animate-fade-up">
            <Badge>
              <Sparkles size={13} />
              Fisika Dasar 1 · Proyek UAS
            </Badge>
          </div>
          <h1 className="animate-fade-up mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Kalkulator Fisika{" "}
            <span className="gradient-text">Berbasis Website</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Hitung Energi Kinetik, Energi Potensial, Hukum Newton II, Kecepatan
            GLBB, dan lainnya secara interaktif — cepat, akurat, dan mudah
            dipahami.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/kalkulator/energi-kinetik" className="btn-primary">
              Mulai Menghitung
              <ArrowRight size={16} />
            </Link>
            <a href="#kalkulator" className="btn-ghost">
              Lihat Semua Kalkulator
            </a>
          </div>

          {/* trust row: quick category chips */}
          <div className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-faint">
              {calculators.length} kalkulator:
            </span>
            {coreCalculators.map((c) => (
              <Link
                key={c.slug}
                to={`/kalkulator/${c.slug}`}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted transition hover:border-brand-500/40 hover:text-ink"
              >
                {c.title}
              </Link>
            ))}
            <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted">
              +{extendedCalculators.length} lagi
            </span>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <div className="border-y border-line bg-surface">
        <Section>
          <div className="container-page">
            <SectionHeading
              title="Belajar fisika jadi lebih mudah"
              subtitle="Proyek ini dibuat untuk membantu mempermudah perhitungan berbagai konsep fisika secara interaktif. Cukup masukkan nilai yang diketahui, pilih besaran yang ingin dicari, dan hasilnya langsung tampil."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="card card-hover p-6">
                  <h3 className="font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Kalkulator inti */}
      <Section id="kalkulator">
        <div className="container-page">
          <SectionHeading
            eyebrow="Mulai dari sini"
            title="Pilih Kalkulator"
            subtitle="Empat konsep dasar fisika yang paling sering dipakai."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {coreCalculators.map((c, i) => (
              <CalculatorCard key={c.slug} calc={c} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* Kalkulator tambahan */}
      <div className="border-y border-line bg-surface">
        <Section>
          <div className="container-page">
            <SectionHeading
              eyebrow="Baru"
              title="Kalkulator Tambahan"
              subtitle="Konsep fisika lain yang juga sering dibutuhkan."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {extendedCalculators.map((c, i) => (
                <CalculatorCard key={c.slug} calc={c} index={i} />
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Tim */}
      <Section id="tim">
        <div className="container-page">
          <SectionHeading
            title="Anggota Kelompok"
            subtitle="Disusun oleh mahasiswa Program Studi Informatika S1."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.nim} className="card card-hover p-6 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xl font-extrabold text-white">
                  {initials(m.name)}
                </span>
                <h3 className="mt-4 font-bold text-ink">{m.name}</h3>
                <p className="mt-1 text-sm text-muted">NIM {m.nim}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-faint">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
