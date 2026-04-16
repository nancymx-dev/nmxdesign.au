import { useMemo, useState } from 'react';
import AiLabBackground from './AiLabBackground';
import { aiLabEntries } from './aiLabEntries';
import type { AiLabEntryType } from './types';
import EndToEndExperimentBentoCard from './endtoendexperiment/EndToEndExperimentBentoCard';

const TYPES: { type: AiLabEntryType | 'all'; label: string }[] = [
  { type: 'all', label: 'All' },
  { type: 'experiment', label: 'Experiments' },
  { type: 'benchmark', label: 'Benchmarks' },
  { type: 'project', label: 'Projects' },
  { type: 'note', label: 'Learnings / Notes' },
];

function BenchmarkBentoCard({
  title,
  description,
  comingSoon,
}: {
  title: string;
  description: string;
  comingSoon?: boolean;
}) {
  return (
    <article className="h-full rounded-3xl border border-gray-200 bg-white/70 p-8 shadow-[0_16px_40px_rgba(24,64,39,0.06)] transition-shadow hover:shadow-[0_24px_60px_rgba(24,64,39,0.08)]">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-orange)]">
          Benchmark
        </span>
        <h3 className="mt-4 font-pfMarlet text-4xl font-medium leading-tight text-[var(--brand-green)]">
          {title}{' '}
          {comingSoon ? (
            <span className="text-[rgba(24,64,39,0.55)]">(coming soon)</span>
          ) : null}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[rgba(24,64,39,0.72)]">{description}</p>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <div className="text-[rgba(24,64,39,0.35)]" aria-hidden="true">
          ⌁
        </div>
      </div>
    </article>
  );
}

function DarkProjectBentoCard({
  title,
  summary,
  comingSoon,
}: {
  title: string;
  summary: string;
  comingSoon?: boolean;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--brand-green)] p-10 text-[var(--brand-sand)] shadow-[0_16px_40px_rgba(24,64,39,0.08)] transition-shadow hover:shadow-[0_24px_60px_rgba(24,64,39,0.1)]">
      <div className="relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
          Project
        </span>
        <h3 className="mt-4 font-pfMarlet text-5xl font-medium leading-tight">
          {title}{' '}
          {comingSoon ? <span className="text-[rgba(255,246,237,0.7)]">(coming soon)</span> : null}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgba(255,246,237,0.75)]">
          {summary}
        </p>
        <div className="mt-8 inline-flex items-center rounded-full bg-[rgba(239,244,131,0.14)] px-6 py-2 text-sm font-bold text-[var(--brand-yellow)]">
          Coming soon
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-25">
        <div className="absolute right-8 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[rgba(239,244,131,0.25)]" />
        <div className="absolute right-2 top-10 h-72 w-72 rounded-full bg-[rgba(239,244,131,0.18)]" />
      </div>
    </article>
  );
}

export default function AiLabPage() {
  const [selectedType, setSelectedType] = useState<AiLabEntryType | 'all'>('all');

  const featured = useMemo(() => {
    // Keep the layout stable while content grows.
    const index = aiLabEntries.find(
      (e) => e.id === 'designing-an-end-to-end-product-prototype-with-ai',
    );
    const benchmark = aiLabEntries.find((e) => e.id === 'figma-ai-performance-placeholder');
    const tokenAutomation = aiLabEntries.find(
      (e) => e.id === 'design-token-automation-placeholder',
    );
    return { index, benchmark, tokenAutomation };
  }, []);

  const heroTitle = 'AI Lab';
  const heroDescription =
    'Experiments, benchmarks, prototypes, and notes on applying AI to design, workflows, and product thinking.';

  const isVisible = (type: AiLabEntryType) => selectedType === 'all' || selectedType === type;
  const collapseFiltered = selectedType !== 'all';
  const keepSlot =
    (visible: boolean) =>
    (base: string) => {
      if (visible) return base;
      if (collapseFiltered) return `${base} hidden`;
      return `${base} hidden md:block md:invisible md:pointer-events-none md:select-none`;
    };

  return (
    <div className="relative w-full min-h-[calc(100dvh-var(--shell-nav-height,64px))] px-4 py-14 sm:px-8 md:px-12 lg:px-24">
      <AiLabBackground />
      <div className="relative z-[2] mx-auto w-full max-w-6xl">
        <header className="mb-12">
          <div className="relative">
            <h1 className="font-pfMarlet text-7xl font-medium leading-[0.9] text-[var(--brand-green)] sm:text-8xl">
              {heroTitle}
            </h1>
          </div>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[rgba(24,64,39,0.74)]">
            {heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="inline-flex items-center rounded-sm bg-[var(--brand-green)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-sand)] shadow-[0_10px_22px_rgba(24,64,39,0.08)]">
              Browse by type
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {TYPES.filter((t) => t.type !== 'all').map((item) => {
                const active = selectedType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setSelectedType(item.type)}
                    className={`relative bg-transparent px-1 py-2 text-lg font-pfMarletItalic italic transition-colors ${active ? 'text-[var(--brand-orange)]' : 'text-[rgba(24,64,39,0.6)] hover:text-[var(--brand-orange)]'}`}
                  >
                    {item.label}
                    {active ? (
                      <svg
                        aria-hidden="true"
                        className="absolute -bottom-2 left-0 h-3 w-full text-[rgba(237,107,46,0.35)]"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 10"
                      >
                        <path
                          d="M0 6 Q 18 1, 35 6 T 70 6 T 100 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : null}
                  </button>
                );
              })}
              {selectedType !== 'all' ? (
                <button
                  type="button"
                  onClick={() => setSelectedType('all')}
                  className="ml-1 inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs font-semibold text-[rgba(24,64,39,0.7)] transition-colors hover:bg-white"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </header>

        <section className="mb-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-stretch">
            {featured.index ? (
              <EndToEndExperimentBentoCard
                entry={featured.index}
                visible={isVisible(featured.index.type)}
                className={keepSlot(isVisible(featured.index.type))('')}
              />
            ) : null}

            {featured.benchmark ? (
              <div
                className={keepSlot(isVisible(featured.benchmark.type))('md:col-span-4')}
                aria-hidden={!isVisible(featured.benchmark.type)}
              >
                <BenchmarkBentoCard
                  title="Design AI tools"
                  description="Stress-testing AI tools and how should designers adopt those tools for UX design."
                  comingSoon
                />
              </div>
            ) : null}
          </div>

          {featured.tokenAutomation && isVisible(featured.tokenAutomation.type) ? (
            <div className={collapseFiltered ? 'mt-0' : 'mt-6'}>
              <DarkProjectBentoCard
                title="Design Workflow Automation"
                summary="Building a bridge between LLM models writing PRD to Google Stitch making designs and AI models writing out code."
                comingSoon
              />
            </div>
          ) : null}

          {(!featured.index || !isVisible(featured.index.type)) &&
          (!featured.benchmark || !isVisible(featured.benchmark.type)) &&
          (!featured.tokenAutomation || !isVisible(featured.tokenAutomation.type)) ? (
            <div className="rounded-2xl border border-[rgba(24,64,39,0.18)] bg-white/75 p-8 text-center text-[rgba(24,64,39,0.75)]">
              No entries yet.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
