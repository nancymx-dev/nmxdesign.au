import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import AiLabContentBlocks from './AiLabContentBlocks';
import type { AiLabContentBlock } from './types';

const galleryBlocks: AiLabContentBlock[] = [
  {
    type: 'gallery',
    title: 'Testing brand fidelity',
    columns: 2,
    items: [
      {
        src: '/example-brand-reference.webp',
        alt: 'Website reference only example',
        title: 'Website reference only',
        caption: 'Using only a visual reference captured atmosphere.',
      },
      {
        src: '/example-generic-design.webp',
        alt: 'Generic design.md example',
        title: 'Generic design.md',
        caption: 'A generic design markdown improved consistency.',
      },
    ],
  },
];

describe('AiLabContentBlocks', () => {
  it('renders gallery images as zoomable button triggers', () => {
    const markup = renderToStaticMarkup(<AiLabContentBlocks blocks={galleryBlocks} />);

    expect(markup).toContain('aria-label="Open full-size image for Generic design.md example"');
    expect(markup).toContain('<button');
  });

  it('uses full-height gallery cards so text blocks align across a row', () => {
    const markup = renderToStaticMarkup(<AiLabContentBlocks blocks={galleryBlocks} />);

    expect(markup).toContain(
      'class="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[rgba(24,64,39,0.12)] bg-white/80 p-3 shadow-[0_22px_55px_rgba(24,64,39,0.08)]"',
    );
  });
});
