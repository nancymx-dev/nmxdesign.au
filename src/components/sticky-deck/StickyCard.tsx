import { type ApexSlide, type MediaItem } from '../../data/apexWrappedCards';

interface StickyCardProps {
  slide: ApexSlide;
  index: number;
}

const MediaFrame = ({
  item,
  className = '',
  imageClassName = '',
}: {
  item: MediaItem;
  className?: string;
  imageClassName?: string;
}) => (
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
        className={`w-full ${item.backgroundClass ?? 'bg-[var(--brand-sand)]'} ${
          item.naturalSize
            ? 'h-auto object-contain'
            : item.objectFit === 'cover'
              ? 'h-full object-cover'
              : 'h-full object-contain'
        } ${imageClassName}`}
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
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

const renderRichText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`} className="font-semibold text-[rgba(24,64,39,0.96)]">{part.slice(2, -2)}</strong>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

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
  const genericBullets = slide.bullets?.filter(
    (bullet) => !bullet.startsWith('Risk:') && !bullet.startsWith('The Goal:'),
  );
  const mediaItem = slide.media?.[0];
  const isSideMedia = slide.mediaPlacement === 'right' && mediaItem;
  const textColumn = (
    <div className="flex min-w-0 flex-col gap-5 lg:gap-6">
      <Eyebrow slide={slide} />
      <Title>{slide.title}</Title>
      {slide.primarySectionTitle && (
        <h3 className="font-pfMarlet text-xl leading-tight text-[var(--brand-green)] lg:text-[2rem]">
          {slide.primarySectionTitle}
        </h3>
      )}
      <p className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7">
        {slide.description}
      </p>
      {slide.bodyBeforeBullets?.map((paragraph) => (
        <p
          key={paragraph}
          className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7"
        >
          {paragraph}
        </p>
      ))}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {riskBullet && (
          <div className="flex flex-col gap-2">
            <h3 className="font-pfMarlet text-lg text-[var(--brand-green)]">Risk</h3>
            <p className="text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base">
              {renderRichText(riskBullet.replace('Risk: ', ''))}
            </p>
          </div>
        )}
        {goalBullet && (
          <div className="flex flex-col gap-2">
            <h3 className="font-pfMarlet text-lg text-[var(--brand-green)]">The Goal</h3>
            <p className="text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base">
              {renderRichText(goalBullet.replace('The Goal: ', ''))}
            </p>
          </div>
        )}
      </div>
      {genericBullets && genericBullets.length > 0 && (
        <ul className="flex max-w-3xl flex-col gap-3 lg:gap-4">
          {genericBullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-orange)]" />
              <span>{renderRichText(bullet)}</span>
            </li>
          ))}
        </ul>
      )}
      {slide.bodyAfterBullets?.map((paragraph) => (
        <p
          key={paragraph}
          className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7"
        >
          {renderRichText(paragraph)}
        </p>
      ))}
      {slide.secondaryTitle && (
        <div className="flex max-w-3xl flex-col gap-3">
          <h3 className="font-pfMarlet text-lg text-[var(--brand-green)] lg:text-[1.45rem]">
            {slide.secondaryTitle}
          </h3>
          {slide.secondaryDescription && (
            <p className="text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7">
              {renderRichText(slide.secondaryDescription)}
            </p>
          )}
          {slide.secondaryBullets && slide.secondaryBullets.length > 0 && (
            <ul className="flex flex-col gap-3 lg:gap-4">
              {slide.secondaryBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-orange)]" />
                  <span>{renderRichText(bullet)}</span>
                </li>
              ))}
            </ul>
          )}
          {slide.secondaryBodyAfterBullets?.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-relaxed text-[rgba(24,64,39,0.88)] sm:text-base lg:text-[0.95rem] lg:leading-7"
            >
              {renderRichText(paragraph)}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-full flex-col gap-5 p-6 sm:p-8 md:p-10 lg:gap-6 lg:p-14">
      {isSideMedia ? (
        <div className={`grid min-h-full grid-cols-1 gap-8 lg:items-start ${slide.sideLayoutClass ?? 'lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:gap-10'}`}>
          {textColumn}
          <div className={slide.mediaOffsetClass ?? 'lg:pt-24'}>
            {mediaItem.type === 'image' ? (
              <img
                src={mediaItem.src}
                alt={mediaItem.alt}
                loading="lazy"
                className={`w-full ${slide.mediaImageClass ?? 'h-auto'} ${mediaItem.backgroundClass ?? 'bg-transparent'}`}
                style={mediaItem.objectPosition ? { objectPosition: mediaItem.objectPosition } : undefined}
              />
            ) : (
              <MediaFrame
                item={mediaItem}
                className={`${slide.mediaHeightClass ?? 'h-[320px] lg:h-[360px]'} border border-[rgba(24,64,39,0.1)] ${slide.mediaFrameClass ?? ''}`}
                imageClassName={slide.mediaImageClass ?? ''}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {textColumn}
          {mediaItem && (
            <div className="mt-auto">
              <MediaFrame
                item={mediaItem}
                className={`${slide.mediaHeightClass ?? 'h-[320px] lg:h-[360px]'} border border-[rgba(24,64,39,0.1)] ${slide.mediaFrameClass ?? ''}`}
                imageClassName={slide.mediaImageClass ?? ''}
              />
            </div>
          )}
        </>
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
      {renderRichText(slide.description)}
    </p>
    {slide.bodyBeforeBullets?.map((paragraph) => (
      <p
        key={paragraph}
        className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base lg:text-[1.05rem] lg:leading-7"
      >
        {renderRichText(paragraph)}
      </p>
    ))}
    {slide.bullets && slide.bullets.length > 0 && (
      <ul className="flex max-w-3xl flex-col gap-3 lg:gap-4">
        {slide.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-orange)]" />
            <span>{renderRichText(bullet)}</span>
          </li>
        ))}
      </ul>
    )}
    {slide.bodyAfterBullets?.map((paragraph) => (
      <p
        key={paragraph}
        className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base lg:text-[1.05rem] lg:leading-7"
      >
        {renderRichText(paragraph)}
      </p>
    ))}
    {slide.secondaryTitle && (
      <p className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base lg:text-[1.05rem] lg:leading-7">
        {renderRichText(slide.secondaryTitle)}
      </p>
    )}
    {slide.secondaryBullets && slide.secondaryBullets.length > 0 && (
      <ul className="flex max-w-3xl flex-col gap-3 lg:gap-4">
        {slide.secondaryBullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-orange)]" />
            <span>{renderRichText(bullet)}</span>
          </li>
        ))}
      </ul>
    )}
    {slide.secondaryBodyAfterBullets?.map((paragraph) => (
      <p
        key={paragraph}
        className="max-w-3xl text-sm leading-relaxed text-[rgba(24,64,39,0.85)] sm:text-base lg:text-[1.05rem] lg:leading-7"
      >
        {renderRichText(paragraph)}
      </p>
    ))}
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
          <div key={bullet} className="flex flex-col gap-3 lg:gap-4">
            {slide.bulletMedia![i] && (
              <div className="h-[320px] overflow-hidden rounded-xl border border-[rgba(24,64,39,0.1)] shadow-[0_8px_24px_rgba(24,64,39,0.08)] lg:h-[380px]">
                <video
                  src={slide.bulletMedia![i].src}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-[var(--brand-sand)] object-contain"
                />
              </div>
            )}
            <p className="text-base font-semibold leading-snug text-[var(--brand-green)] lg:text-[1.1rem]">
              {renderRichText(bullet)}
            </p>
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
