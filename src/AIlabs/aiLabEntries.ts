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
      {
        type: 'image',
        src: '/AIlabs/endtoendexperiment/experiment-question-workflow.webp',
        alt: 'Workflow diagram showing the experiment from product definition through prototype generation.',
        frame: 'diagram',
        caption: 'The initial workflow framed the experiment as a sequence of product definition, PRD creation, design generation, and coded prototype output.',
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
      {
        type: 'gallery',
        title: 'Brain dump source material',
        columns: 2,
        items: [
          {
            src: '/AIlabs/endtoendexperiment/project-board.webp',
            alt: 'Project board outlining the travel-concierge concept, user pain points, and nice-to-have ideas.',
            title: 'Project framing',
            caption:
              'The first board captured the product concept, differentiators, user problems, and the trust and transparency themes that the prototype needed to carry through.',
          },
          {
            src: '/AIlabs/endtoendexperiment/research-board.png',
            alt: 'Research board capturing task flows and prioritised requirements for the travel-concierge concept.',
            title: 'Research and flow mapping',
            caption:
              'The second board broke down the problem space into jobs, navigation paths, task flows, and booking versus re-booking logic before any UI decisions were made.',
          },
        ],
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
      {
        type: 'image',
        src: '/AIlabs/endtoendexperiment/prd-comparison.webp',
        alt: 'Comparison board showing the PRDs generated by GPT-5.4, Gemini, and Claude.',
        caption: 'Seeing the PRDs side by side made the gap obvious: the strongest design results came from the models that asked the strongest upstream questions.',
      },
      { type: 'heading', level: 2, text: '06 Generating UI in Stitch and Figma Make' },
      {
        type: 'paragraph',
        text: 'I then took each PRD into Google Stitch and Figma Make to generate UI concepts. This helped test whether stronger PRDs produced better design outputs, and whether different design tools interpreted the same product direction differently.',
      },
      {
        type: 'paragraph',
        text: 'Stitch produced the strongest UI output overall. The GPT-5.4-derived directions were the most complete because the PRD carried more ecosystem detail, while Claude-derived concepts were often simpler and easier to read.',
      },
      {
        type: 'gallery',
        title: 'Generated UI directions',
        columns: 3,
        items: [
          {
            src: '/AIlabs/endtoendexperiment/ui-home-comparison.webp',
            alt: 'Composite comparison of OpenAI, Claude, and Gemini generated travel-concierge home and trip screens.',
            title: 'Cross-model output snapshot',
            caption:
              'A broad side-by-side view of the OpenAI, Claude, and Gemini directions showed how much the upstream PRD quality changed the resulting screen systems.',
          },
          {
            src: '/AIlabs/endtoendexperiment/ui-home-dashboard.webp',
            alt: 'Travel concierge home screen with a concierge recommendation card and pending flight-review tasks.',
            title: 'Homepage direction',
            caption:
              'This direction translated the brief into a homepage focused on pending decisions, recent activity, and concierge-led recommendations.',
          },
          {
            src: '/AIlabs/endtoendexperiment/ui-trip-actions.webp',
            alt: 'Trip action screen highlighting dinner reservations, directions, passes, and local context.',
            title: 'In-trip action design',
            caption:
              'The more refined explorations added richer in-trip states, quick actions, and location-specific context that made the concierge concept feel more tangible.',
          },
        ],
      },
      {
        type: 'gallery',
        title: 'Concierge and trip interaction concepts',
        columns: 3,
        items: [
          {
            src: '/AIlabs/endtoendexperiment/ui-concierge-chat.webp',
            alt: 'Voyager Elite concierge chat screen proposing a premium flight and asking follow-up preference questions.',
            title: 'Conversational planning',
            caption:
              'One exploration leaned into a guided chat flow, showing how a concierge assistant might narrow preferences while keeping the trip context visible.',
          },
          {
            src: '/AIlabs/endtoendexperiment/ui-private-gallery.webp',
            alt: 'Private concierge gallery screen with per-trip threads and a live concierge conversation panel.',
            title: 'Threaded concierge support',
            caption:
              'Another concept focused on persistent per-trip threads, giving the experience a more editorial and service-driven feel.',
          },
          {
            src: '/AIlabs/endtoendexperiment/ui-trip-details.webp',
            alt: 'Trip details screen with curated hotel options and a confirm and view curated options call to action.',
            title: 'Structured trip details',
            caption:
              'The structured trip view made logistics easier to scan by combining itinerary details, travellers, and curation options in one place.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Figma Make screens required clearer design-system and visual guidance before they could reach a higher-fidelity result.',
      },
      { type: 'heading', level: 2, text: '07 Testing brand fidelity' },
      {
        type: 'paragraph',
        text: 'I also tested how different types of brand guidance affected the generated outputs. I compared a generic design.md template, my own design system in design.md format, and a website reference without Design Markdown.',
      },
      {
        type: 'paragraph',
        text: 'The structured Design Markdown approach produced stronger brand alignment because it gave the AI clearer rules to follow. It worked better than loose written brand descriptions or simply pasting in a website reference.',
      },
      {
        type: 'gallery',
        title: 'Brand fidelity comparison',
        columns: 3,
        items: [
          {
            src: '/AIlabs/endtoendexperiment/brand-website-reference.webp',
            alt: 'Editorial travel booking screen generated from a website reference only.',
            title: 'Website reference only',
            caption:
              'Using only a visual reference captured some atmosphere, but it was less reusable and less precise about how the system should behave.',
          },
          {
            src: '/AIlabs/endtoendexperiment/brand-generic-design-md.webp',
            alt: 'Travel concierge booking screen generated from a generic design markdown file.',
            title: 'Generic design.md',
            caption:
              'A generic design markdown improved consistency, but the result still felt closer to a polished template than a true extension of the target brand.',
          },
          {
            src: '/AIlabs/endtoendexperiment/brand-own-design-system.webp',
            alt: 'Travel concierge home screen generated using the author’s own design system markdown file.',
            title: 'Your own design system design.md',
            caption:
              'The strongest result came from encoding the existing design system directly, which gave the model clearer rules for typography, colour, and interaction tone.',
          },
        ],
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
      {
        type: 'videoGallery',
        title: 'Prototype comparison',
        items: [
          {
            src: '/AIlabs/endtoendexperiment/prototype-gemini.mp4',
            poster: '/AIlabs/endtoendexperiment/prototype-gemini-poster.png',
            title: 'OpenAI prototype',
            caption: 'Required a couple of extra prompts before the prototype became meaningfully clickable.',
          },
          {
            src: '/AIlabs/endtoendexperiment/prototype-claude.mp4',
            poster: '/AIlabs/endtoendexperiment/prototype-claude-poster.png',
            title: 'Claude prototype',
            caption: 'The strongest coded prototype in the experiment, with the most polished interaction quality and the least additional prompting.',
          },
          {
            src: '/AIlabs/endtoendexperiment/prototype-openai.mp4',
            poster: '/AIlabs/endtoendexperiment/prototype-openai-poster.png',
            title: 'Gemini prototype',
            caption: 'Produced a working direction, but the experience landed less refined and less usable than the Claude output.',
          },
        ],
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
      {
        type: 'image',
        src: '/AIlabs/endtoendexperiment/recommended-workflow.webp',
        alt: 'Recommended workflow showing the path from rough concept through product definition, UI generation, and coding.',
        frame: 'diagram',
        caption: 'The best result came from orchestrating several tools intentionally rather than expecting one model to win every stage end to end.',
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
