import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="mt-1 text-sm text-muted">Alamat yang Anda buka tidak tersedia.</p>
      <Link href="/dashboard" className={buttonStyles("primary", "md", "mt-6")}>
        Kembali ke Dashboard
      </Link>
    </main>
  );
}
