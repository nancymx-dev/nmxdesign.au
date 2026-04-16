import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AiLabBackground from './AiLabBackground';
import AiLabContentBlocks from './AiLabContentBlocks';
import { aiLabEntries } from './aiLabEntries';

function formatDate(date?: string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function TitleWithItalicSuffix({ title, suffix }: { title: string; suffix: string }) {
  const index = title.lastIndexOf(suffix);
  if (index === -1) return <>{title}</>;
  const head = title.slice(0, index);
  const tail = title.slice(index);
  return (
    <>
      {head}
      <span className="italic text-[rgba(24,64,39,0.95)]">{tail}</span>
    </>
  );
}

function HeroMediaVideo() {
  return (
    <div className="relative h-full w-full bg-[rgba(255,246,237,0.65)]">
      <video
        className="h-full w-full object-cover"
        style={{ objectPosition: '50% 18%' }}
        src="/AIlabs/endtoendexperiment/heroeverything.MOV"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}

export default function AiLabEntryPage() {
  const { entryId } = useParams();

  const entry = useMemo(() => aiLabEntries.find((e) => e.id === entryId), [entryId]);
  if (!entry) return <Navigate to="/ai-lab" replace />;

  const dateLabel = formatDate(entry.date);

  return (
    <div className="relative w-full min-h-[calc(100dvh-var(--shell-nav-height,64px))] px-4 py-14 sm:px-8 md:px-12 lg:px-24">
      <AiLabBackground />
      <div className="relative z-[2] mx-auto w-full max-w-6xl">
        <Link
          to="/ai-lab"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-green)] underline decoration-[rgba(170,170,221,0.6)] underline-offset-4 hover:decoration-[rgba(170,170,221,0.9)]"
        >
          <span aria-hidden="true">←</span> Back to AI Lab
        </Link>

        <header className="mt-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[rgba(24,64,39,0.12)] bg-[rgba(190,235,199,0.22)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.85)]">
                  {entry.type}
                </span>
                {Array.isArray(entry.tags) && entry.tags.length > 0 ? (
                  <span className="rounded-full border border-[rgba(24,64,39,0.12)] bg-[rgba(234,225,216,0.9)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.68)]">
                    {entry.tags[0]}
                  </span>
                ) : null}
              </div>

              <h1 className="font-pfMarlet text-6xl font-medium leading-[0.9] tracking-[-0.03em] text-[var(--brand-green)] sm:text-7xl md:text-8xl">
                <TitleWithItalicSuffix title={entry.title} suffix="with AI" />
              </h1>

              {entry.summary ? (
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[rgba(24,64,39,0.78)]">
                  {entry.summary}
                </p>
              ) : null}
            </div>

            <div className="border-l border-[rgba(24,64,39,0.18)] pl-8 py-2 text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.82)]">
                AI Lab
              </p>
              {dateLabel ? (
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.55)]">
                  {dateLabel}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(24,64,39,0.18)]">
            <div className="aspect-[21/9] w-full">
              <HeroMediaVideo />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
            {Array.isArray(entry.tools) && entry.tools.length > 0 ? (
              <div className="md:col-span-7 rounded-3xl border border-[rgba(24,64,39,0.12)] bg-white/75 p-8 shadow-[0_16px_40px_rgba(24,64,39,0.06)]">
                <div className="text-sm font-semibold uppercase tracking-wide text-[rgba(24,64,39,0.55)]">
                  Tools / models
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tools.map((tool) => (
                    <span
                      key={`${entry.id}-tool-${tool}`}
                      className="inline-flex items-center rounded-full border border-[rgba(24,64,39,0.12)] bg-white/80 px-3 py-1 text-xs font-semibold text-[rgba(24,64,39,0.82)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {entry.takeaway ? (
              <div className="md:col-span-5 rounded-3xl border border-[rgba(170,170,221,0.45)] bg-[rgba(170,170,221,0.16)] p-8 shadow-[0_16px_40px_rgba(24,64,39,0.06)]">
                <div className="font-pfMarletItalic text-2xl text-[var(--brand-purple)]">
                  Takeaway
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(24,64,39,0.78)]">
                  {entry.takeaway}
                </p>
              </div>
            ) : null}
          </div>
        </header>

        <div className="mt-14">
          {Array.isArray(entry.content) && entry.content.length > 0 ? (
            <AiLabContentBlocks blocks={entry.content} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
