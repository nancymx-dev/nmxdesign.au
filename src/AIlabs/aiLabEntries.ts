import type { AiLabEntry } from './types';

export const aiLabEntries: AiLabEntry[] = [
  {
    id: 'designing-an-end-to-end-product-prototype-with-ai',
    type: 'experiment',
    variant: 'standard',
    size: 'lg',
    title: 'Designing an End-to-End Product Prototype with AI',
    summary:
      'A designer-led experiment comparing how frontier models, AI design tools, and coding agents perform across one end-to-end product workflow.',
    date: '2026-04-12',
    tools: [
      'GPT-5.4',
      'Claude Opus 4.6',
      'Gemini 3.1 Pro',
      'Google Stitch',
      'Figma Make',
      'Coding agents',
    ],
    takeaway:
      'AI-assisted design quality starts upstream: stronger questioning and PRDs led to stronger downstream UI and prototype outputs. Structured Design Markdown improved brand fidelity.',
    tags: ['Workflow', 'Prototype', 'Design Markdown'],
    link: {
      kind: 'internal',
      to: '/ai-lab/designing-an-end-to-end-product-prototype-with-ai',
    },
    content: [
      {
        type: 'paragraph',
        text: 'A designer-led experiment comparing how frontier models, AI design tools, and coding agents perform across one end-to-end product workflow.',
      },
      { type: 'heading', level: 2, text: '01 Overview' },
      {
        type: 'paragraph',
        text: 'I ran a designer-led experiment to understand how AI tools perform across a full product design workflow, from early product definition to generated UI and functional prototype output.',
      },
      {
        type: 'paragraph',
        text: 'Using the same brief, “Designing a chat-based travel concierge that plans, books and re-books trips across web and mobile,” I compared GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, Google Stitch, Figma Make, and coding agents across product thinking, UI generation, brand fidelity, and prototype quality.',
      },
      { type: 'heading', level: 2, text: '02 The experiment question' },
      {
        type: 'paragraph',
        text: 'One of the things I wanted to understand is whether better AI-led product definition leads to better downstream design and prototype outputs.',
      },
      {
        type: 'paragraph',
        text: 'How should designers intentionally use AI tools across product definition, UI generation, brand fidelity, and functional prototyping?',
      },
      {
        type: 'list',
        items: [
          'Stronger upstream product thinking would improve downstream design quality',
          'Different models were better suited to different stages of the process',
          'AI-generated design could stay more on brand when given better structured guidance',
        ],
      },
      {
        type: 'paragraph',
        text: 'Rather than looking for a single winning tool, this experiment focused on how a designer might orchestrate several tools together more effectively.',
      },
      { type: 'heading', level: 2, text: '03 Starting point: the brain dump' },
      {
        type: 'paragraph',
        text: 'I started with a rough brain dump that captured the product concept, user needs, pain points, feature ideas, and key flows. This included signup, profile, settings, homepage, My Trips, plan trip, book trip, and re-book trip.',
      },
      {
        type: 'list',
        items: [
          'The functionality of the product',
          'Listing features that will enhance user experience',
          'User key pain points and how to solve them',
        ],
      },
      {
        type: 'paragraph',
        text: 'The brain dump intentionally did not mention UI elements, design system, or components. I wanted to test how well each model could critique an early idea, identify gaps, ask useful questions, and turn ambiguity into a stronger product definition.',
      },
      { type: 'heading', level: 2, text: '04 Prompting the models' },
      {
        type: 'paragraph',
        text: 'I gave the same prompt to GPT-5.4, Claude Opus 4.6, and Gemini 3.1 Pro. Each model was asked to critique my concept, identify missing information, ask follow-up questions, and only create a PRD once it had enough context.',
      },
      {
        type: 'table',
        caption: 'Comparison table',
        columns: ['Model', 'Follow-up questions asked', 'PRD quality'],
        rows: [
          ['GPT-5.4', '36', 'Most comprehensive'],
          ['Claude Opus 4.6', '28', 'Strong and balanced'],
          ['Gemini 3.1 Pro', '6', 'More generalised'],
        ],
      },
      { type: 'heading', level: 2, text: '05 Creating the PRDs' },
      {
        type: 'paragraph',
        text: 'The biggest quality difference appeared before any UI was generated. GPT-5.4 asked the most comprehensive questions and produced the most detailed PRD. Claude asked fewer questions, but did so across two rounds and produced a strong, balanced PRD. Gemini asked only six questions before moving into a more generalised PRD.',
      },
      {
        type: 'paragraph',
        text: 'This showed me that the quality of AI-generated design starts upstream. The better the model interrogated the product idea, the stronger the design inputs became.',
      },
      { type: 'heading', level: 2, text: '08 Turning designs into prototypes' },
      {
        type: 'paragraph',
        text: 'After generating the UI, I pushed selected outputs into coding agents to create functional prototypes.',
      },
      {
        type: 'paragraph',
        text: 'Claude produced the strongest prototype with no additional prompting required. It created a more clickable and usable experience. Gemini’s implementation was less strong, and Codex did not produce a meaningfully clickable prototype, although this may have been affected by prompt quality.',
      },
      { type: 'heading', level: 2, text: '09 Recommended AI workflow' },
      {
        type: 'table',
        columns: ['Stage', 'Best tool in this experiment', 'Why'],
        rows: [
          [
            'Product definition',
            'GPT-5.4',
            'Asked the most comprehensive questions and produced the strongest PRD',
          ],
          ['UI generation', 'Stitch', 'Produced the strongest generated UI output'],
          ['Brand fidelity', 'Design Markdown', 'Created clearer, reusable design guidance'],
          [
            'Functional prototype',
            'Claude',
            'Produced the most clickable prototype with the least additional prompting',
          ],
        ],
      },
      { type: 'heading', level: 2, text: '10 Key learnings' },
      {
        type: 'paragraph',
        text: 'The main learning was that AI-assisted design quality starts before visual generation. Better questioning created better PRDs, and better PRDs created stronger UI and prototype outputs.',
      },
      {
        type: 'paragraph',
        text: 'I also learned that different tools are better suited to different stages. GPT-5.4 was strongest for product definition, Stitch was strongest for generated UI, Claude was strongest for functional prototyping, and Design Markdown improved brand consistency.',
      },
      {
        type: 'paragraph',
        text: 'The designer’s role is still critical. The value comes from shaping the input, choosing the right handoff points, evaluating trade-offs, and deciding when human judgment needs to intervene.',
      },
      {
        type: 'list',
        items: [
          'Better questioning upstream led to better downstream outputs',
          'GPT-5.4 was strongest at product thinking',
          'Claude Opus 4.6 was strongest at implementation',
          'Simpler outputs sometimes looked better',
          'Design Markdown improved brand fidelity',
        ],
      },
    ],
  },
  {
    id: 'figma-ai-performance-placeholder',
    type: 'benchmark',
    variant: 'benchmark',
    size: 'md',
    title: 'Figma AI Performance (coming soon)',
    whatWasTested: 'Stress-testing AI design tools on complex multi-layer design systems.',
    keyMetric: { label: 'Primary metric', value: 'TBD' },
    conclusion: 'A structured evaluation with method notes and scoring rubric.',
    methodTag: 'Benchmark',
    date: '2026-04-16',
    tags: ['Benchmarks'],
    link: { kind: 'internal', to: '/ai-lab' },
  },
  {
    id: 'design-token-automation-placeholder',
    type: 'project',
    variant: 'standard',
    size: 'lg',
    title: 'Design Token Automation (coming soon)',
    summary:
      'Building a bridge between Figma variables and GitHub Pull Requests using LLM-driven style extraction.',
    date: '2026-04-16',
    tools: ['Figma', 'GitHub', 'LLMs'],
    tags: ['Project'],
    link: { kind: 'internal', to: '/ai-lab' },
  },
];
