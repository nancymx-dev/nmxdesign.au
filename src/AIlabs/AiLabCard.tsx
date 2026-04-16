import { Link } from 'react-router-dom';
import type { AiLabEntry, AiLabEntryType } from './types';

const typeLabel: Record<AiLabEntryType, string> = {
  experiment: 'Experiment',
  benchmark: 'Benchmark',
  project: 'Project',
  note: 'Note',
};

function formatDate(date?: string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function CardLink({ entry, children }: { entry: AiLabEntry; children: React.ReactNode }) {
  if (entry.link.kind === 'internal') {
    return (
      <Link to={entry.link.to} className="block h-full">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={entry.link.href}
      target={entry.link.newTab ? '_blank' : undefined}
      rel={entry.link.newTab ? 'noreferrer' : undefined}
      className="block h-full"
    >
      {children}
    </a>
  );
}

function CollagePreview() {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl border border-[rgba(24,64,39,0.12)] bg-[rgba(237,107,46,0.18)] sm:h-56">
      <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4">
        <div className="rounded-xl border border-[rgba(24,64,39,0.12)] bg-white/70" />
        <div className="rounded-xl border border-[rgba(24,64,39,0.12)] bg-white/55" />
        <div className="rounded-xl border border-[rgba(24,64,39,0.12)] bg-white/55" />
        <div className="rounded-xl border border-[rgba(24,64,39,0.12)] bg-white/70" />
      </div>
      <div className="absolute right-4 top-4 w-24 -rotate-2 rounded-xl border border-[rgba(24,64,39,0.14)] bg-[rgba(239,244,131,0.85)] p-3 text-xs font-semibold text-[rgba(24,64,39,0.85)] shadow-[0_10px_22px_rgba(24,64,39,0.12)]">
        Models are getting eerily good at spatial reasoning.
      </div>
    </div>
  );
}

export default function AiLabCard({ entry }: { entry: AiLabEntry }) {
  const dateLabel = formatDate(entry.date);
  const sizeClass =
    entry.size === 'lg'
      ? 'md:col-span-2 xl:col-span-2'
      : entry.size === 'sm'
        ? 'md:col-span-1'
        : 'md:col-span-1';

  return (
    <div className={sizeClass}>
      <CardLink entry={entry}>
        <div className="group h-full rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-[0_4px_10px_rgba(24,64,39,0.06)] transition-all hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_16px_34px_rgba(24,64,39,0.12)]">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--brand-green)]">
              {typeLabel[entry.type]}
            </span>
            {entry.methodTag ? (
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-[rgba(170,170,221,0.15)] px-3 py-1 text-xs font-semibold text-[var(--brand-green)]">
                {entry.methodTag}
              </span>
            ) : null}
            {dateLabel ? (
              <span className="text-xs font-medium text-[rgba(24,64,39,0.7)]">{dateLabel}</span>
            ) : null}
          </div>

          {entry.preview === 'collage' ? <CollagePreview /> : null}

          <h3 className="mb-2 font-pfMarlet text-3xl font-medium text-[var(--brand-green)]">
            <span className="underline decoration-[rgba(170,170,221,0.45)] underline-offset-[6px] decoration-[2px]">
              {entry.title}
            </span>
          </h3>

          {entry.variant === 'benchmark' ? (
            <div className="space-y-3">
              {entry.whatWasTested ? (
                <p className="text-base text-[rgba(24,64,39,0.9)]">
                  <span className="font-semibold">What was tested:</span> {entry.whatWasTested}
                </p>
              ) : null}
              {entry.keyMetric ? (
                <div className="rounded-xl border border-gray-200 bg-[rgba(239,244,131,0.20)] p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[rgba(24,64,39,0.65)]">
                    {entry.keyMetric.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[var(--brand-green)]">
                    {entry.keyMetric.value}
                  </div>
                </div>
              ) : null}
              {entry.conclusion ? (
                <p className="text-base text-[rgba(24,64,39,0.9)]">{entry.conclusion}</p>
              ) : null}
            </div>
          ) : entry.variant === 'note' ? (
            <div className="space-y-3">
              {entry.summary ? (
                <p className="text-base text-[rgba(24,64,39,0.92)]">{entry.summary}</p>
              ) : null}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[rgba(24,64,39,0.7)]">
                {entry.sourceType ? <span>Source: {entry.sourceType}</span> : null}
                {entry.readTimeMinutes ? <span>• {entry.readTimeMinutes} min read</span> : null}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {entry.summary ? (
                <p className="text-base text-[rgba(24,64,39,0.92)]">{entry.summary}</p>
              ) : null}
              {Array.isArray(entry.tools) && entry.tools.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {entry.tools.slice(0, 6).map((tool) => (
                    <span
                      key={`${entry.id}-tool-${tool}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100/60 px-3 py-1 text-xs font-semibold text-[rgba(24,64,39,0.85)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              ) : null}
              {entry.takeaway ? (
                <p className="text-sm text-[rgba(24,64,39,0.78)]">{entry.takeaway}</p>
              ) : null}
            </div>
          )}

          {Array.isArray(entry.tags) && entry.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={`${entry.id}-tag-${tag}`}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100/50 px-3 py-1 text-xs font-medium text-[rgba(24,64,39,0.8)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-green)]">
            <span className="underline decoration-[rgba(24,64,39,0.25)] underline-offset-4 transition-colors group-hover:decoration-[rgba(24,64,39,0.6)]">
              Read entry
            </span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </CardLink>
    </div>
  );
}
