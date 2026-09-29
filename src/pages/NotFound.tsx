import { Link } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

export function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="gradient-text text-7xl font-extrabold">404</p>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Maaf, halaman atau kalkulator yang kamu cari tidak tersedia.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <HomeIcon size={16} />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
