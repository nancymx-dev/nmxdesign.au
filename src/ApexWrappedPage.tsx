import { useCallback, useRef, useState } from 'react';
import StickyDeck from './components/sticky-deck/StickyDeck';
import { apexSlides } from './data/apexWrappedCards';

const scopeItems = [
  { label: 'Scope', value: 'Org-wide internal product (Jira, Atlas, Confluence)' },
  { label: 'Scale', value: '10,000+ employees' },
  { label: 'Team', value: 'Cross-functional team' },
  { label: 'Delivery', value: '9-month delivery' },
];

const ApexWrappedPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div ref={pageRef} data-testid="apex-wrapped-page">
      {/* Hero intro section */}
      <section className="relative flex min-h-[85vh] flex-col justify-center bg-[var(--brand-sand)] px-6 py-20 sm:px-10 md:px-16 lg:px-24">

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
            {/* Left — text content */}
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                Case Study
              </p>

              <h1 className="mt-3 max-w-[14ch] font-pfMarlet text-[2.2rem] leading-[1.02] text-[var(--brand-green)] sm:text-5xl lg:text-[3.8rem]">
                Apex Wrapped
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7">
                Created Atlassian's first AI-powered performance review tool, leading a
                cross-functional team to launch this internal tool which saved ~10,000 hours
                for 30% of Atlassian employees.
              </p>
            </div>

            {/* Right — launch video */}
            <div className="relative flex items-center justify-center">
              <div className="w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(24,64,39,0.10)]">
                <video
                  ref={videoRef}
                  className="w-full rounded-2xl bg-[var(--brand-sand)]"
                  src="/perftooldesigns/Apexwrapped/APEXWrapped launch video.MP4"
                  preload="auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="absolute bottom-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(24,64,39,0.18)] bg-[rgba(255,246,237,0.92)] text-sm text-[var(--brand-green)] shadow-[0_8px_20px_rgba(24,64,39,0.1)] backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(255,246,237,1)]"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>

          {/* Role + team + scope — below the two-column grid, lower than the video */}
          <div className="mt-14 text-sm text-[rgba(24,64,39,0.78)]">
            <span className="font-semibold text-[var(--brand-green)]">My Role:</span>{' '}
            Driver, Owner & Product designer &nbsp;&middot;&nbsp;{' '}
            <span className="font-semibold text-[var(--brand-green)]">Team:</span>{' '}
            Zeynep (Visual Design), Jesse & Hamish (Engineering)
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

      {/* Sticky slide deck */}
      <StickyDeck slides={apexSlides} />

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

export default ApexWrappedPage;
