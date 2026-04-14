import { useCallback, useRef } from 'react';
import StickyDeck from '../../components/sticky-deck/StickyDeck';
import { modcSlides } from './modcCards';

const scopeItems = [
  { label: 'Scope', value: 'Enterprise admin experience in Atlassian Admin' },
  { label: 'Focus', value: 'Enterprise domain management and account claiming' },
  { label: 'Team', value: 'PM, engineers, visual design, research' },
  { label: 'Delivery', value: '3 months, with final design in 6 weeks' },
];

const MODCCaseStudyPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div ref={pageRef} data-testid="modc-page">
      <section className="relative flex min-h-[85vh] flex-col justify-center bg-[var(--brand-sand)] px-6 py-20 sm:px-10 md:px-16 lg:px-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                Case Study
              </p>

              <h1 className="mt-3 max-w-[12ch] font-pfMarlet text-[2.2rem] leading-[1.02] text-[var(--brand-green)] sm:text-5xl lg:text-[3.8rem]">
                Multi-org domain claim
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7">
                Designed an enterprise admin experience that enables large organizations
                without an identity provider to manage shared domains across complex
                organizational structures, driving an estimated $100k per month in Admin
                Hub revenue.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(24,64,39,0.10)]">
                <video
                  className="w-full rounded-2xl bg-[var(--brand-sand)]"
                  src="/modc/MODC.mov"
                  preload="auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>

          <div className="mt-14 text-sm text-[rgba(24,64,39,0.78)]">
            <span className="font-semibold text-[var(--brand-green)]">My Role:</span>{' '}
            User experience designer for this project &nbsp;&middot;&nbsp;{' '}
            <span className="font-semibold text-[var(--brand-green)]">Team:</span>{' '}
            Product Manager, Frontend Engineers, Product Designer (visual design), Researchers (early-stage product brief)
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {scopeItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[rgba(24,64,39,0.14)] bg-[rgba(255,246,237,0.9)] px-5 py-4 shadow-[0_12px_30px_rgba(24,64,39,0.06)]"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[rgba(24,64,39,0.65)]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm text-[var(--brand-green)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyDeck slides={modcSlides} />

      <section className="px-6 pb-20 pt-10 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-full border border-[rgba(24,64,39,0.2)] bg-[var(--brand-sand)] px-6 py-3 font-semibold text-[var(--brand-green)] shadow-[0_10px_30px_rgba(24,64,39,0.1)] transition-colors"
          >
            back to the top
          </button>
        </div>
      </section>
    </div>
  );
};

export default MODCCaseStudyPage;
