import type { ReactNode } from "react";

type ConsularPageShellProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  aside?: ReactNode;
};

export function ConsularPageShell({
  title,
  eyebrow = "Consular Services",
  children,
  aside,
}: ConsularPageShellProps) {
  return (
    <main>
      <section className="diplomatic-mesh px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
        <article className="border border-line bg-surface p-6 shadow-[0_20px_50px_rgba(11,31,58,0.06)] sm:p-8 lg:col-span-8">
          {children}
        </article>
        {aside ? <aside className="space-y-6 lg:col-span-4">{aside}</aside> : null}
      </section>
    </main>
  );
}

export function makeConsularMetadata(title: string) {
  return { title };
}
