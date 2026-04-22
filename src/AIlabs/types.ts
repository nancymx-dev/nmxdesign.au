export type AiLabEntryType = 'experiment' | 'benchmark' | 'project' | 'note';

export type AiLabCardVariant = 'standard' | 'benchmark' | 'note';

export type AiLabCardSize = 'sm' | 'md' | 'lg';

export type AiLabLink =
  | { kind: 'internal'; to: string }
  | { kind: 'external'; href: string; newTab?: boolean };

export type AiLabMediaItem = {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  poster?: string;
};

export type AiLabContentBlock =
  | { type: 'heading'; level?: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; title?: string; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'gallery'; title?: string; columns?: 2 | 3; items: AiLabMediaItem[] }
  | { type: 'videoGallery'; title?: string; items: AiLabMediaItem[] }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { type: 'embed'; title?: string; url: string };

export type AiLabEntry = {
  id: string;
  type: AiLabEntryType;
  variant: AiLabCardVariant;
  size?: AiLabCardSize;
  preview?: 'collage' | 'none';

  title: string;
  summary?: string;
  date?: string; // ISO date string when available

  tags?: string[];
  tools?: string[];

  takeaway?: string;

  // Benchmark-focused fields
  whatWasTested?: string;
  keyMetric?: { label: string; value: string };
  conclusion?: string;
  methodTag?: string;

  // Learning/note focused fields
  sourceType?: 'blog' | 'article' | 'reflection';
  readTimeMinutes?: number;

  link: AiLabLink;

  // Optional internal long-form content
  content?: AiLabContentBlock[];
};
