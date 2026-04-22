import { useState } from 'react';
import ImageModal from '../components/ImageModal';
import type { AiLabContentBlock } from './types';

type SectionHeading = { number: string; title: string };

function parseSectionHeading(text: string): SectionHeading | null {
  const trimmed = text.trim();
  const match = /^(?<num>\d{2}(?:\s*&\s*\d{2})?)\s+(?<title>.+)$/.exec(trimmed);
  if (!match?.groups) return null;
  const { num, title } = match.groups;
  if (!num || !title) return null;
  return { number: num, title };
}

type ZoomableImageProps = {
  src: string;
  alt: string;
  buttonClassName: string;
  frameClassName: string;
  imageClassName: string;
};

function ZoomableImage({
  src,
  alt,
  buttonClassName,
  frameClassName,
  imageClassName,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`Open full-size image for ${alt}`}
        className={buttonClassName}
        onClick={() => setIsOpen(true)}
      >
        <div className={frameClassName}>
          <img src={src} alt={alt} className={imageClassName} loading="lazy" />
        </div>
      </button>

      <ImageModal src={src} alt={alt} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

function renderBlock(block: AiLabContentBlock, key: string) {
  if (block.type === 'heading') {
    const level = block.level ?? 2;
    if (level === 3) {
      return (
        <h3
          key={key}
          className="font-pfMarlet text-2xl font-medium text-[var(--brand-green)]"
        >
          {block.text}
        </h3>
      );
    }
    return (
      <h2 key={key} className="font-pfMarlet text-3xl font-medium text-[var(--brand-green)]">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'paragraph') {
    return (
      <p key={key} className="text-[rgba(24,64,39,0.88)]">
        {block.text}
      </p>
    );
  }

  if (block.type === 'list') {
    return (
      <ul key={key} className="list-disc pl-6 text-[rgba(24,64,39,0.88)]">
        {block.items.map((item) => (
          <li key={`${key}-${item}`}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'note') {
    return (
      <div
        key={key}
        className="my-8 rounded-3xl border border-[rgba(24,64,39,0.12)] bg-white/75 p-7 shadow-[0_16px_40px_rgba(24,64,39,0.06)]"
      >
        {block.title ? (
          <div className="font-pfMarlet text-2xl font-medium text-[var(--brand-purple)]">
            {block.title}
          </div>
        ) : null}
        <p className="mt-3 text-[rgba(24,64,39,0.88)]">{block.text}</p>
      </div>
    );
  }

  if (block.type === 'image') {
    return (
      <figure key={key} className="my-10">
        <ZoomableImage
          src={block.src}
          alt={block.alt}
          buttonClassName="group block w-full overflow-hidden rounded-3xl text-left transition-transform duration-200 hover:scale-[1.005] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(170,170,221,0.95)] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgba(255,248,243,0.92)]"
          frameClassName="overflow-hidden rounded-3xl border border-[rgba(24,64,39,0.12)] bg-white shadow-[0_22px_55px_rgba(24,64,39,0.10)]"
          imageClassName="w-full transition-transform duration-300 group-hover:scale-[1.01]"
        />
        {block.caption ? (
          <figcaption className="mt-3 text-sm text-[rgba(24,64,39,0.7)]">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === 'gallery') {
    const gridClass =
      block.columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3';

    return (
      <div key={key} className="my-12 space-y-5">
        {block.title ? (
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.55)]">
            {block.title}
          </div>
        ) : null}

        <div className={`grid grid-cols-1 gap-5 ${gridClass}`}>
          {block.items.map((item, itemIndex) => (
            <figure
              key={`${key}-gallery-item-${item.src}-${itemIndex}`}
              className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[rgba(24,64,39,0.12)] bg-white/80 p-3 shadow-[0_22px_55px_rgba(24,64,39,0.08)]"
            >
              <ZoomableImage
                src={item.src}
                alt={item.alt ?? item.title ?? 'Gallery image'}
                buttonClassName="group block w-full flex-1 overflow-hidden rounded-[1.4rem] text-left transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(170,170,221,0.95)] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                frameClassName="flex h-full items-start overflow-hidden rounded-[1.4rem] border border-[rgba(24,64,39,0.08)] bg-[rgba(255,248,243,0.7)]"
                imageClassName="w-full transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {item.title || item.caption ? (
                <figcaption className="mt-4 flex flex-col gap-2 px-1 pb-1">
                  {item.title ? (
                    <div className="text-sm font-semibold text-[rgba(24,64,39,0.84)]">
                      {item.title}
                    </div>
                  ) : null}
                  {item.caption ? (
                    <div className="text-sm leading-relaxed text-[rgba(24,64,39,0.7)]">
                      {item.caption}
                    </div>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'videoGallery') {
    return (
      <div key={key} className="my-12 space-y-5">
        {block.title ? (
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.55)]">
            {block.title}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {block.items.map((item, itemIndex) => (
            <figure
              key={`${key}-video-item-${item.src}-${itemIndex}`}
              className="overflow-hidden rounded-[2rem] border border-[rgba(24,64,39,0.12)] bg-white/80 p-3 shadow-[0_22px_55px_rgba(24,64,39,0.08)]"
            >
              <div className="overflow-hidden rounded-[1.4rem] border border-[rgba(24,64,39,0.08)] bg-[rgba(255,248,243,0.7)]">
                <video
                  className="w-full"
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                >
                  <source src={item.src} />
                </video>
              </div>

              {item.title ? (
                <div className="mt-4 text-sm font-semibold text-[rgba(24,64,39,0.84)]">
                  {item.title}
                </div>
              ) : null}
              {item.caption ? (
                <figcaption className="mt-2 text-sm leading-relaxed text-[rgba(24,64,39,0.7)]">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'table') {
    return (
      <div key={key} className="my-12 overflow-x-auto">
        {block.caption ? (
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.55)]">
            {block.caption}
          </div>
        ) : null}
        <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-3xl border border-[rgba(24,64,39,0.12)] bg-white/75 text-left text-sm shadow-[0_22px_55px_rgba(24,64,39,0.08)]">
          <thead className="bg-[rgba(24,64,39,0.04)]">
            <tr>
              {block.columns.map((col) => (
                <th
                  key={`${key}-col-${col}`}
                  className="border-b border-[rgba(24,64,39,0.12)] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.75)]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${key}-row-${rowIndex}`} className="border-b border-[rgba(24,64,39,0.08)]">
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-cell-${rowIndex}-${cellIndex}`} className="px-6 py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === 'embed') {
    return (
      <div key={key} className="my-10">
        {block.title ? (
          <div className="mb-2 text-sm font-semibold text-[rgba(24,64,39,0.8)]">
            {block.title}
          </div>
        ) : null}
        <div className="rounded-3xl border border-[rgba(24,64,39,0.12)] bg-white/75 p-7 shadow-[0_16px_40px_rgba(24,64,39,0.06)]">
          <a
            href={block.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--brand-green)] underline decoration-[rgba(24,64,39,0.25)] underline-offset-4 hover:decoration-[rgba(24,64,39,0.55)]"
          >
            Open embed
          </a>
        </div>
      </div>
    );
  }

  return null;
}

export default function AiLabContentBlocks({ blocks }: { blocks: AiLabContentBlock[] }) {
  const sections: Array<{ heading: SectionHeading; blocks: AiLabContentBlock[] }> = [];
  let current: { heading: SectionHeading; blocks: AiLabContentBlock[] } | null = null;

  blocks.forEach((block) => {
    if (block.type === 'heading' && (block.level ?? 2) === 2) {
      const parsed = parseSectionHeading(block.text);
      if (parsed) {
        if (current) sections.push(current);
        current = { heading: parsed, blocks: [] };
        return;
      }
    }
    if (!current) {
      current = { heading: { number: '', title: '' }, blocks: [] };
    }
    current.blocks.push(block);
  });

  if (current) sections.push(current);

  return (
    <div className="space-y-24">
      {sections
        .filter((section) => section.blocks.length > 0)
        .map((section, sectionIndex) => (
          <section
            key={`section-${sectionIndex}-${section.heading.number}-${section.heading.title}`}
            className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-3">
              {section.heading.number ? (
                <>
                  <div className="font-pfMarletItalic text-4xl italic text-[var(--brand-purple)]">
                    {section.heading.number}
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.45)]">
                    {section.heading.title}
                  </div>
                </>
              ) : null}
            </div>

            <div className="md:col-span-9">
              <div className="space-y-6 leading-relaxed">
                {section.blocks.map((block, blockIndex) =>
                  renderBlock(block, `${block.type}-${sectionIndex}-${blockIndex}`),
                )}
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}
