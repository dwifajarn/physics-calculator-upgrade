import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { calculators } from "../data/calculators"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    isActive
      ? "bg-white/10 text-white"
      : "text-ink-muted hover:bg-white/5 hover:text-white",
  ].join(" ")

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/70 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-white">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-sm shadow-glow"
          >
            Φ
          </span>
          <span className="text-base sm:text-lg">
            Physics<span className="text-brand-400">Calc</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>
          {calculators.map((c) => (
            <NavLink key={c.slug} to={`/kalkulator/${c.slug}`} className={navLinkClass}>
              {c.title}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-brand-400 hover:bg-white/10 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 rounded bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-bg/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>
          {calculators.map((c) => (
            <NavLink key={c.slug} to={`/kalkulator/${c.slug}`} className={navLinkClass}>
              <span className="mr-2" aria-hidden="true">
                {c.icon}
              </span>
              {c.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
