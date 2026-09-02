import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-background px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[680px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-surface shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-brown-dark p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-40 border-white/10" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-28 border-brown-light/20" />
          <Link href="/" className="relative z-10">
            <Image
              src="/VivntLogo.png"
              alt="Vivnt"
              width={150}
              height={70}
              className="brightness-0 invert"
            />
          </Link>
          <div className="relative z-10 max-w-sm">
            <p className="mb-4 text-sm uppercase tracking-[0.24em] text-brown-light">
              Experiences, together
            </p>
            <h2 className="font-dynapuff text-4xl leading-tight">
              Make room for something memorable.
            </h2>
            <p className="mt-6 text-lg text-white/75">
              Find the rooms, people, and moments that make your city feel
              alive.
            </p>
          </div>
          <p className="relative z-10 text-sm text-white/60">
            Vivnt event community
          </p>
        </aside>
        <section className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-8 inline-block lg:hidden">
              <Image src="/VivntLogo.png" alt="Vivnt" width={130} height={60} />
            </Link>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brown-normal">
              Welcome to Vivnt
            </p>
            <h1 className="font-dynapuff text-3xl font-semibold text-text-dark sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-text-light">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <div className="mt-8 border-t border-divider pt-5 text-center text-sm text-text-light">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
