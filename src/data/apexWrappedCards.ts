export type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  label?: string;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  backgroundClass?: string;
  naturalSize?: boolean;
};

export type ApexSlide = {
  id: string;
  stepNumber: string;
  eyebrow: string;
  title: string;
  primarySectionTitle?: string;
  description: string;
  bodyBeforeBullets?: string[];
  bullets?: string[];
  bodyAfterBullets?: string[];
  secondaryTitle?: string;
  secondaryDescription?: string;
  secondaryBullets?: string[];
  secondaryBodyAfterBullets?: string[];
  statValue?: string;
  statLabel?: string;
  mediaHeightClass?: string;
  mediaImageClass?: string;
  mediaFrameClass?: string;
  mediaOffsetClass?: string;
  sideLayoutClass?: string;
  mediaPlacement?: 'below' | 'right';
  layout: 'text-only' | 'text-image-below' | 'process-overview' | 'process-details' | 'product-launch' | 'product-demos';
  media?: MediaItem[];
  bulletMedia?: MediaItem[];
};

export const apexSlides: ApexSlide[] = [
  {
    id: 'problem',
    stepNumber: '01',
    eyebrow: 'Problem & Goal',
    title: 'Problem & Goal',
    layout: 'text-image-below',
    description:
      'Frequently employees would often submit their performance review just before the deadline as on the day of the deadline out of the entire org there\'s still 35% of employees who haven\'t submitted.',
    bullets: [
      'Risk: If employees struggle to balance their performance reviews submissions along with their high priority projects it could be a compliance risk as well as not meeting project deadlines.',
      'The Goal: Improve how employees prepare for performance reviews by designing a more structured self-preparation experience that increases efficiency and supports both individual contributors and managers in starting the process with clarity.',
    ],
    media: [
      { type: 'image', src: '/perftooldesigns/Apexwrapped/Problem.png', alt: 'Performance review submission timeline showing 35% of employees submitting on deadline day.' },
    ],
  },
  {
    id: 'opportunity',
    stepNumber: '02',
    eyebrow: 'Business Opportunity',
    title: 'Business Opportunity',
    layout: 'text-only',
    description:
      'At Atlassian we have roughly 15,000 employees with that in mind our interviews uncovered that it takes roughly about 10 hours to complete each performance review. Our tool takes an estimated ~10 minutes to complete which would reduce at least ~4-6 hours as most employees said it would take them to collect relevant information and write up their performance review.',
    statValue: '~10min',
    statLabel: 'vs ~10 hours',
  },
  {
    id: 'status-quo',
    stepNumber: '03',
    eyebrow: 'Status Quo',
    title: 'Status Quo',
    layout: 'text-only',
    description:
      'At Atlassian, we have a dedicated performance review team who manages the performance review system with full roadmaps ownership. Which meant if I wanted to positively influence the performance review process it would be how employees conducted their Self-preparation.',
    bullets: [
      'Performance review consists of: Guide, Resources, Time, and Self-preparation.',
      'In an ideal world it would be a much better experience if we could update and influence all of these areas as well as integrating our designs with the performance team\'s product.',
    ],
  },
  {
    id: 'process-overview',
    stepNumber: '04',
    eyebrow: 'The Process',
    title: 'The Process',
    layout: 'process-overview',
    description:
      'This is a brand new project and product so it involved all a lot of the stages.',
    media: [
      { type: 'image', src: '/perftooldesigns/Apexwrapped/process.png', alt: 'Process overview diagram.' },
    ],
    bullets: [
      'Product vision and scope: I led the direction, gathered a team of designers and engineers and defined the Product vision and Design scope for the project. Documenting features that should be included for the MVP (Minimum Viable Product).',
      'User interviews: I conducted a survey to validate assumptions from quantitative analysis and qualitative user interviews. Managers and individual contributors reported similar challenges, so I focused on the two most actionable issues: 61.9% struggled to write their self-assessment, and 46% struggled to find and gather information about their work.',
    ],
    bulletMedia: [
      { type: 'image', src: '/perftooldesigns/Apexwrapped/productvision.png', alt: 'Product vision and scope documentation.' },
      { type: 'image', src: '/perftooldesigns/Apexwrapped/userinterview.png', alt: 'User interview survey results.' },
    ],
  },
  {
    id: 'process-details',
    stepNumber: '04',
    eyebrow: 'The Process — Continued',
    title: 'The Process',
    layout: 'process-details',
    description: '',
    bullets: [
      'Defining AI strategy and vision: Defined AI strategy and vision to ensure we\'re effectively using AI in the product we\'re building also including necessary guardrails to help navigate the weaknesses of AI too.',
      'Designing user flow mapping: I ran workshops with engineers and designers to align on the user flow and map the key screens. From there, we moved directly into high-fidelity design and engineering handoff.',
    ],
    bulletMedia: [
      { type: 'image', src: '/perftooldesigns/Apexwrapped/aivision.png', alt: 'AI strategy and vision document.' },
      { type: 'image', src: '/perftooldesigns/Apexwrapped/userflow.png', alt: 'User flow mapping workshop output.' },
    ],
  },
  {
    id: 'product-launch',
    stepNumber: '05',
    eyebrow: 'Final Product — Launch',
    title: 'Final Product',
    layout: 'product-launch',
    description:
      'To drive adoption at scale, I aligned with Design Operations to integrate launch communications through Slack and other platforms organization wide. We structured announcements, brand identity, documentation and live support to reduce rollout friction also maintain ongoing support for users.',
    media: [
      { type: 'image', src: '/perftooldesigns/Apexwrapped/slackrelease.png', alt: 'Slack launch announcement.' },
      { type: 'image', src: '/perftooldesigns/Apexwrapped/blogrelease.png', alt: 'Blog release announcement.' },
    ],
  },
  {
    id: 'product-demos',
    stepNumber: '05',
    eyebrow: 'Final Product — Our Product',
    title: 'Our Product',
    layout: 'product-demos',
    description: '',
    bullets: [
      'Users can fill in details and find relevant links.',
      'Review and select relevant links.',
      'Generate their first Apex summary.',
      'Settings page to manage any confidential sites.',
    ],
    bulletMedia: [
      { type: 'video', src: '/perftooldesigns/Apexwrapped/findlinks.MOV', alt: 'Finding relevant links flow.' },
      { type: 'video', src: '/perftooldesigns/Apexwrapped/Chooselinks.MOV', alt: 'Selecting relevant links flow.' },
      { type: 'video', src: '/perftooldesigns/Apexwrapped/Summary.MOV', alt: 'Generating Apex summary flow.' },
      { type: 'video', src: '/perftooldesigns/Apexwrapped/Settings.MOV', alt: 'Settings page for confidential sites.' },
    ],
  },
  {
    id: 'impact',
    stepNumber: '06',
    eyebrow: 'Impact',
    title: 'Impact',
    layout: 'text-only',
    description:
      'We successfully launched Atlassian\'s first AI-powered tool and achieved 30% employee adoption in the first review cycle, reaching 1,800 employees. In that same cycle, the Performance team observed earlier completion rates, and we received extensive positive feedback from users.',
    bullets: [
      'If each user saved approximately 10 hours, that represents around 10,000 hours returned to project work.',
      'By reducing the stress and effort associated with APEX, employees were able to invest more time in meaningful project work and were less likely to experience burnout.',
      'Atlassians could also write more detailed, evidence-based performance reviews, contributing to better outcomes for individuals and the company.',
      'As Atlassian\'s first AI project, APEX Wrapped helped pave the way for future AI-powered initiatives and showed how LLMs can be used effectively when combined with thoughtful design.',
    ],
    statValue: '1,800',
    statLabel: 'Employees reached',
  },
  {
    id: 'learnings',
    stepNumber: '07',
    eyebrow: 'Learnings',
    title: 'Learnings',
    layout: 'text-only',
    description:
      'Key takeaways from building Atlassian\'s first AI-powered internal tool.',
    bullets: [
      'Rapid testing with engineers and exploring different implementation approaches were key to shaping an effective solution for a brand-new product and concept, especially in the absence of prior research or existing patterns.',
      'Prioritising great user experience and smooth user flow over polished UI design enabled engineers to begin building earlier, which was critical given the project\'s complexity and timeline.',
      'Being intentional about where we applied AI was important to the project\'s success. Through testing, we mapped the areas where it was most effective and where it could genuinely improve the product experience.',
      'Team work is critical without building a strong connection and sense of goal it would be difficult to power through as a team of engineers, designers and design operation team to create a successful product that\'s still used today and maintained.',
    ],
  },
];
