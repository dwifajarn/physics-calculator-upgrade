import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  calculators,
  coreCalculators,
  extendedCalculators,
} from "../data/calculators";
import { ThemeToggle } from "./ThemeToggle";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 text-lg font-extrabold text-ink"
      aria-label="PhysicsCalc beranda"
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-sm text-white">
        Φ
      </span>
      <span>
        Physics<span className="text-brand-600">Calc</span>
      </span>
    </Link>
  );
}

/** A compact "Kalkulator" dropdown for desktop nav (Modern-SaaS style). */
function CalculatorsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname.startsWith("/kalkulator");

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          isActive
            ? "bg-surface-2 text-ink"
            : "text-muted hover:bg-surface-2 hover:text-ink"
        }`}
      >
        Kalkulator
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[30rem] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-surface p-3 shadow-card">
            <p className="col-span-2 px-2 pb-1 pt-1 text-xs font-bold uppercase tracking-widest text-faint">
              Dasar
            </p>
            {coreCalculators.map((c) => (
              <MenuLink key={c.slug} calc={c} />
            ))}
            <p className="col-span-2 px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-faint">
              Tambahan
            </p>
            {extendedCalculators.map((c) => (
              <MenuLink key={c.slug} calc={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({ calc }: { calc: (typeof calculators)[number] }) {
  const Icon = calc.icon;
  return (
    <Link
      to={`/kalkulator/${calc.slug}`}
      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-surface-2"
    >
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">
          {calc.title}
        </span>
        <span className="block truncate text-xs text-muted">
          {calc.tagline}
        </span>
      </span>
    </Link>
  );
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? "bg-surface-2 text-ink"
      : "text-muted hover:bg-surface-2 hover:text-ink"
  }`;

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>
          <CalculatorsMenu />
          <a href="#kalkulator" className={navLinkClass({ isActive: false })}>
            Jelajahi
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition hover:bg-surface-2 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-bg transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[40rem]" : "max-h-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>
          <p className="px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-faint">
            Kalkulator
          </p>
          {calculators.map((c) => {
            const Icon = c.icon;
            return (
              <NavLink
                key={c.slug}
                to={`/kalkulator/${c.slug}`}
                className={navLinkClass}
              >
                <span className="mr-2 inline-flex align-middle">
                  <Icon size={15} />
                </span>
                {c.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
