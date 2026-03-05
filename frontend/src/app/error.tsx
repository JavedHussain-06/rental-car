"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <button className="mt-6 rounded bg-slate-900 px-4 py-2 text-white" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
