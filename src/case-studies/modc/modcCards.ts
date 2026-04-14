import { type ApexSlide } from '../../data/apexWrappedCards';

export const modcSlides: ApexSlide[] = [
  {
    id: 'problem',
    stepNumber: '01',
    eyebrow: 'Problem & Goal',
    title: 'Problem & Goal',
    layout: 'text-image-below',
    description:
      'Without an identity provider, enterprise organizations had no scalable way to bulk manage users on a shared domain. Admin Hub also did not support the two common enterprise structures: centralized organizations with one admin team, and decentralized organizations with separate subsidiaries or business units sharing the same domain.',
    bullets: [
      'Design an account management experience that supports both centralized and decentralized organization structures and reduces manual admin effort where automation is appropriate.',
    ],
    media: [
      {
        type: 'image',
        src: '/modc/sony.png',
        alt: 'Sony example image for the multi-org domain claim case study.',
        objectFit: 'contain',
        objectPosition: 'center center',
      },
    ],
  },
  {
    id: 'problem-current-state',
    stepNumber: '01',
    eyebrow: 'Problem & Goal — Continued',
    title: 'Current state',
    layout: 'text-image-below',
    description:
      'Existing account management system did not adequately support this complexity. Admins had to individually manage users when new users have been added, creating friction for admins who are managing large group of users in enterprise organizations. Managing users is a high-impact admin task because it affects user access, control, security policies, billing and governance.',
    bullets: [
      'This work introduced clearer decision-making, improved guidance, and new configuration options to support both centralized and decentralized enterprise models.',
    ],
    media: [
      {
        type: 'image',
        src: '/modc/problem.png',
        alt: 'Diagram showing the complexity of centralized and decentralized domain-claiming models.',
        objectFit: 'cover',
        objectPosition: 'center center',
      },
    ],
  },
  {
    id: 'opportunity',
    stepNumber: '02',
    eyebrow: 'Business Opportunity',
    title: 'Business Opportunity',
    layout: 'text-only',
    description:
      'Improving user management enable better control for enterprise customers.',
    bodyBeforeBullets: [
      'Multi-org domain claim enabled large organizations with subsidiaries to manage users more efficiently by introducing automatic account claiming using their domain.',
      'This created value in two key ways:',
    ],
    bullets: [
      'reduced manual admin effort for centralized organizations by creating automatic claiming option',
      'enabled flexibility for organizations that needed to manage subsidiaries separately with CSV file upload',
    ],
    bodyAfterBullets: [
      'It also enabled organizations to set more protective settings on their users which unlocks an estimated opportunity of $18.4M annual revenue from 1.4 million paid subscriptions.',
    ],
    statValue: 'Estimated $18.4M',
    statLabel: 'Annual revenue opportunity from 1.4 million paid subscriptions',
  },
  {
    id: 'process-overview',
    stepNumber: '03',
    eyebrow: 'The Process',
    title: 'The Process',
    primarySectionTitle: 'Understanding the admin decision model',
    layout: 'text-image-below',
    description:
      'Enterprise customers typically fell into two models:',
    bodyBeforeBullets: [],
    media: [
      {
        type: 'image',
        src: '/modc/Projectunderstanding.png',
        alt: 'Project understanding image for the domain claim flow.',
        backgroundClass: 'bg-transparent',
      },
    ],
    mediaHeightClass: 'h-auto',
    mediaImageClass: 'h-auto',
    mediaFrameClass: 'border-0 shadow-none bg-transparent rounded-none overflow-visible self-start',
    mediaPlacement: 'right',
    bullets: [
      'centralized organizations wanting full control and automation',
      'decentralized organizations needing flexibility across subsidiaries',
    ],
    secondaryTitle: 'Structuring the key decisions',
    secondaryDescription:
      'The experience was built around two primary configuration points:',
    secondaryBullets: [
      'selecting the scope of account claiming, all accounts or specific accounts',
      'determining whether future accounts should be automatically claimed',
    ],
    secondaryBodyAfterBullets: [
      'This structure allowed organizations to tailor the experience to their governance model without being forced into a single approach.',
    ],
    bodyAfterBullets: [
      'This required designing an experience that did not just present options, but helped users understand when and why to choose each one.',
    ],
  },
  {
    id: 'process-details',
    stepNumber: '03',
    eyebrow: 'The Process — Continued',
    title: 'The Process',
    primarySectionTitle: 'Refinement: adding a review step',
    layout: 'text-image-below',
    description: 'I identified that admins needed a final moment to review high-stakes decisions before committing.',
    bodyAfterBullets: [
      'Because the setup flow involved multiple decisions across large user sets, admins could lose context or accidentally confirm the wrong configuration. I documented this risk in a decision register and used it to advocate for a final review screen, helping admins verify their selections before completing the process.',
    ],
    mediaImageClass: 'h-auto object-contain',
    mediaFrameClass: 'border-0 shadow-none bg-transparent rounded-none overflow-visible self-start',
    mediaOffsetClass: 'lg:pt-4',
    sideLayoutClass: 'lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,1.05fr)] lg:gap-6',
    mediaPlacement: 'right',
    media: [
      {
        type: 'image',
        src: '/modc/DACI.png',
        alt: 'Decision register artifact used to align the team on adding a review step.',
        backgroundClass: 'bg-transparent',
      },
    ],
  },
  {
    id: 'final-product',
    stepNumber: '04',
    eyebrow: 'Final Product',
    title: 'Final Product',
    layout: 'product-demos',
    description:
      'The final experience guided admins through domain-claim setup in a structured and supported way.',
    bullets: [
      'Introduced clear account claiming process with guided contextual recommendations along with supporting documentation.',
      'Option to update the settings about enabling or disabling automatic claiming for future accounts',
    ],
    bulletMedia: [
      {
        type: 'video',
        src: '/modc/Claimaccounts.MOV',
        alt: 'Claim accounts walkthrough.',
      },
      {
        type: 'video',
        src: '/modc/Claimsettings.MOV',
        alt: 'Claim settings walkthrough.',
      },
    ],
  },
  {
    id: 'impact',
    stepNumber: '05',
    eyebrow: 'Impact',
    title: 'Impact',
    layout: 'text-only',
    description:
      'This work delivered measurable impact shortly after launch.',
    bodyBeforeBullets: [],
    bullets: [
      '**157 domains** were verified by multiple organizations.',
      '**325 organizations** were actively claiming new accounts.',
      '**42,762 previously unmanaged accounts** were brought under centralized control, enabling stronger security policies and governance.',
      'estimated **~$128k additional monthly Guard revenue (~$1.5M annually)**',
    ],
    secondaryTitle: 'Beyond metrics, the experience:',
    secondaryBullets: [
      'reduced manual admin effort for centralized organizations',
      'enabled flexible management for enterprises with subsidiaries',
      'removed a key blocker for domain management at scale',
    ],
  },
  {
    id: 'learnings',
    stepNumber: '06',
    eyebrow: 'Learnings',
    title: 'Learnings',
    layout: 'text-only',
    description:
      'This project reinforced the importance of designing for decision-making, not just configuration.',
    bullets: [
      'enterprise admin flows require clear guidance, not just more options',
      'similar domains can have very different organizational structures',
      'high-stakes flows require clear guidance upfront and a final confirmation step before users commit.',
      'supporting flexibility without sacrificing clarity is critical in enterprise UX',
    ],
  },
];
