import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <div className="max-w-lg w-full rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm text-center">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-4">
          404
        </p>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-4">
          Page not found
        </h1>
        <p className="text-zinc-600 leading-relaxed mb-8">
          The route you opened does not exist in this deployment. If you were expecting the home page, double-check the Vercel URL or the path after the domain.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold tracking-widest uppercase text-white hover:bg-black transition-colors"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
