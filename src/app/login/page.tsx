import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { readString, type SearchParams } from "@/lib/search-params";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = { title: "Masuk" };

type LoginPageProps = { searchParams: Promise<SearchParams> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = getSafeRedirectPath(readString(params, "from"));

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <section className="hidden flex-col justify-between bg-primary p-12 text-white lg:flex">
        <div className="w-fit rounded-xl bg-white px-5 py-3">
          <Logo className="h-10 w-auto" />
        </div>
        <div>
          <p className="text-4xl leading-tight font-semibold text-balance">
            Pantau lalu lintas dan pendapatan gerbang tol dalam satu tempat.
          </p>
          <p className="mt-4 max-w-md text-white/75">
            Laporan harian per metode pembayaran, master data gerbang, dan dashboard grafik.
          </p>
        </div>
        <div
          aria-hidden
          className="h-2 w-full bg-[repeating-linear-gradient(90deg,var(--color-accent)_0_48px,transparent_48px_80px)]"
        />
      </section>

      <section className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Logo className="mb-10 h-10 w-auto lg:hidden" />
          <h1 className="text-2xl font-semibold">Masuk</h1>
          <p className="mt-1 text-sm text-muted">Gunakan akun yang diberikan administrator.</p>
          <div className="mt-8">
            <LoginForm redirectTo={redirectTo} />
          </div>
        </div>
      </section>
    </main>
  );
}
