import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-extrabold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        Maaf, halaman atau kalkulator yang kamu cari tidak tersedia.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
