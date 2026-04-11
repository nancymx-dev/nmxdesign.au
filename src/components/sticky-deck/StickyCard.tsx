import { type ApexSlide, type MediaItem } from '../../data/apexWrappedCards';

interface StickyCardProps {
  slide: ApexSlide;
  index: number;
}

const MediaFrame = ({ item, className = '' }: { item: MediaItem; className?: string }) => (
  <div className={`overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(24,64,39,0.08)] ${className}`}>
    {item.type === 'video' ? (
      <video
        src={item.src}
        controls
        muted
        playsInline
        preload="metadata"
        className="w-full bg-[var(--brand-sand)]"
      />
    ) : (
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full bg-[var(--brand-sand)] object-contain"
      />
    )}
  </div>
);

const Eyebrow = ({ slide }: { slide: ApexSlide }) => (
  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-orange)]">
    {slide.stepNumber} &middot; {slide.eyebrow}
  </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-pfMarlet text-2xl leading-tight text-[var(--brand-green)] sm:text-3xl lg:text-[2.75rem] lg:leading-[1.08]">
    {children}
  </h2>
);

const StatBadge = ({ value, label }: { value: string; label: string }) => (
  <div className="inline-flex max-w-fit flex-col rounded-2xl border border-[rgba(24,64,39,0.18)] bg-[var(--brand-green)] px-5 py-3.5 text-[var(--brand-sand)] shadow-[0_16px_36px_rgba(24,64,39,0.22)]">
    <span className="font-pfMarlet text-3xl leading-none lg:text-[2.6rem]">
      {value}
    </span>
    <span className="mt-1 text-xs uppercase tracking-[0.14em] text-[rgba(255,246,237,0.88)]">
      {label}
    </span>
  </div>
);

/* ── Slide 01: Problem & Goal ── */
const ProblemLayout = ({ slide }: { slide: ApexSlide }) => {
  const riskBullet = slide.bullets?.find(b => b.startsWith('Risk:'));
  const goalBullet = slide.bullets?.find(b => b.startsWith('The Goal:'));

  return (
    <div className="flex min-h-full flex-col gap-5 p-6 sm:p-8 md:p-10 lg:gap-6 lg:p-14">
      <Eyebrow slide={slide} />
      <Title>{slide.title}</Title>
      <p className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7">
        {slide.description}
      </p>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {riskBullet && (
          <div className="flex flex-col gap-2">
            <h3 className="font-pfMarlet text-lg text-[var(--brand-green)]">Risk</h3>
            <p className="text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base">
              {riskBullet.replace('Risk: ', '')}
            </p>
          </div>
        )}
        {goalBullet && (
          <div className="flex flex-col gap-2">
            <h3 className="font-pfMarlet text-lg text-[var(--brand-green)]">The Goal</h3>
            <p className="text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base">
              {goalBullet.replace('The Goal: ', '')}
            </p>
          </div>
        )}
      </div>
      {slide.media?.[0] && (
        <div className="mt-auto">
          <MediaFrame item={slide.media[0]} className="border border-[rgba(24,64,39,0.1)]" />
        </div>
      )}
    </div>
  );
};

/* ── Text-only (02, 03, 06, 07) — LEFT aligned ── */
const TextOnlyLayout = ({ slide }: { slide: ApexSlide }) => (
  <div className="flex h-full flex-col gap-6 p-6 sm:p-8 md:p-10 lg:gap-8 lg:p-14">
    <Eyebrow slide={slide} />
    <h2 className="max-w-2xl font-pfMarlet text-3xl leading-tight text-[var(--brand-green)] sm:text-4xl lg:text-[3.2rem] lg:leading-[1.08]">
      {slide.title}
    </h2>
    <p className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base lg:text-[1.05rem] lg:leading-7">
      {slide.description}
    </p>
    {slide.bullets && slide.bullets.length > 0 && (
      <ul className="flex max-w-3xl flex-col gap-3 lg:gap-4">
        {slide.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-orange)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    )}
    {slide.statValue && slide.statLabel && (
      <StatBadge value={slide.statValue} label={slide.statLabel} />
    )}
  </div>
);

/* ── Slide 04a: Process Overview — intro + process image + first 2 stages ── */
const ProcessOverviewLayout = ({ slide }: { slide: ApexSlide }) => (
  <div className="flex min-h-full flex-col gap-4 p-6 sm:p-8 md:p-10 lg:gap-5 lg:p-14">
    <Eyebrow slide={slide} />
    <Title>{slide.title}</Title>
    <p className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-[0.95rem]">
      {slide.description}
    </p>
    {slide.media?.[0] && (
      <MediaFrame item={slide.media[0]} className="max-h-[190px] border border-[rgba(24,64,39,0.1)]" />
    )}
    {slide.bullets && slide.bulletMedia && (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
        {slide.bullets.map((bullet, i) => {
          const colonIdx = bullet.indexOf(':');
          const heading = bullet.slice(0, colonIdx);
          const body = bullet.slice(colonIdx + 2);
          return (
            <div key={bullet} className="flex flex-col gap-2 rounded-xl border border-[rgba(24,64,39,0.08)] bg-[rgba(255,246,237,0.5)] p-3.5">
              {slide.bulletMedia![i] && (
                <div className="h-[190px] overflow-hidden rounded-xl border border-[rgba(24,64,39,0.1)] shadow-[0_8px_24px_rgba(24,64,39,0.08)]">
                  <img
                    src={slide.bulletMedia![i].src}
                    alt={slide.bulletMedia![i].alt}
                    loading="lazy"
                    className="h-[calc(100%+80px)] w-full -translate-y-[80px] bg-[var(--brand-sand)] object-cover"
                  />
                </div>
              )}
              <h3 className="font-pfMarlet text-base text-[var(--brand-green)] lg:text-lg">{heading}</h3>
              <p className="text-xs leading-relaxed text-[rgba(24,64,39,0.82)] lg:text-sm">{body}</p>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

/* ── Slide 04b: Process Details — remaining 2 stages ── */
const ProcessDetailsLayout = ({ slide }: { slide: ApexSlide }) => (
  <div className="flex min-h-full flex-col gap-4 p-6 sm:p-8 md:p-10 lg:gap-5 lg:p-14">
    <Eyebrow slide={slide} />
    <Title>{slide.title}</Title>
    {slide.bullets && slide.bulletMedia && (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
        {slide.bullets.map((bullet, i) => {
          const colonIdx = bullet.indexOf(':');
          const heading = bullet.slice(0, colonIdx);
          const body = bullet.slice(colonIdx + 2);
          return (
            <div key={bullet} className="flex flex-col gap-2 rounded-xl border border-[rgba(24,64,39,0.08)] bg-[rgba(255,246,237,0.5)] p-3.5">
              {slide.bulletMedia![i] && (
                <MediaFrame item={slide.bulletMedia![i]} className="max-h-[390px] overflow-hidden" />
              )}
              <h3 className="font-pfMarlet text-base text-[var(--brand-green)] lg:text-lg">{heading}</h3>
              <p className="text-xs leading-relaxed text-[rgba(24,64,39,0.82)] lg:text-sm">{body}</p>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

/* ── Slide 05a: Product Launch ── */
const ProductLaunchLayout = ({ slide }: { slide: ApexSlide }) => (
  <div className="flex min-h-full flex-col gap-5 p-6 sm:p-8 md:p-10 lg:gap-6 lg:p-14">
    <Eyebrow slide={slide} />
    <Title>{slide.title}</Title>
    <p className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7">
      {slide.description}
    </p>
    {slide.media && slide.media.length > 0 && (
      <div className="mt-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {slide.media.map((item) => (
          <MediaFrame key={item.src} item={item} className="border border-[rgba(24,64,39,0.1)]" />
        ))}
      </div>
    )}
  </div>
);

/* ── Slide 05b: Product Demos — 2x2 grid, no autoplay, bold labels ── */
const ProductDemosLayout = ({ slide }: { slide: ApexSlide }) => (
  <div className="flex min-h-full flex-col gap-5 p-6 sm:p-8 md:p-10 lg:gap-6 lg:p-14">
    <Eyebrow slide={slide} />
    <Title>{slide.title}</Title>
    {slide.bullets && slide.bulletMedia && (
      <div className="grid grid-cols-2 gap-4 lg:gap-5">
        {slide.bullets.map((bullet, i) => (
          <div key={bullet} className="flex flex-col gap-1.5">
            {slide.bulletMedia![i] && (
              <div className="max-h-[220px] overflow-hidden rounded-xl border border-[rgba(24,64,39,0.1)] shadow-[0_8px_24px_rgba(24,64,39,0.08)]">
                <video
                  src={slide.bulletMedia![i].src}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-[var(--brand-sand)] object-cover"
                />
              </div>
            )}
            <p className="text-sm font-semibold leading-snug text-[var(--brand-green)]">{bullet}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const StickyCard = ({ slide }: StickyCardProps) => {
  switch (slide.layout) {
    case 'text-only':
      return <TextOnlyLayout slide={slide} />;
    case 'text-image-below':
      return <ProblemLayout slide={slide} />;
    case 'process-overview':
      return <ProcessOverviewLayout slide={slide} />;
    case 'process-details':
      return <ProcessDetailsLayout slide={slide} />;
    case 'product-launch':
      return <ProductLaunchLayout slide={slide} />;
    case 'product-demos':
      return <ProductDemosLayout slide={slide} />;
    default:
      return <TextOnlyLayout slide={slide} />;
  }
};

export default StickyCard;
