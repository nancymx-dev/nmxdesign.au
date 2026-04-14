import { animated, useTrail } from '@react-spring/web';
import AnimatedCard, { type Project } from './AnimatedCard.tsx';

const caseStudyItems: Project[] = [
  {
    slug: 'apex-wrapped',
    title: 'Apex Wrapped',
    description:
      'An AI-assisted performance review experience that helps people gather work evidence, structure their thinking, and write stronger review narratives with less friction.',
    display_photo: '/perftooldesigns/display_photo.jpeg',
    hover_video: '/perftooldesigns/Apexwrapped/Apexwrappedcardvideo.MOV',
    media_fit: 'cover',
    tags: ['AI', 'UX', 'Product Design', 'Product Management'],
  },
  {
    slug: 'modc',
    title: 'Multi-org domain claim',
    description:
      'Designed an enterprise admin experience for organizations without an identity provider to manage shared domains across complex structures, driving an estimated $100k in monthly Admin Hub revenue.',
    display_photo: '/modc/modccover.png',
    hover_video: '/modc/Claimaccounts.MOV',
    media_fit: 'cover',
    // Keep the top UI visible; crop more from the bottom.
    media_image_class: 'object-[50%_18%]',
    tags: ['Enterprise', 'Admin UX', 'Governance'],
  },
  {
    slug: 'uplinked',
    title: 'Uplinked',
    description:
      'Workforce Management System dashboard design for a physical security company managing hundreds of guards across multiple worksites.',
    display_photo: '/uplinked/FinalDashboardFigma.jpg',
    media_image_class: 'scale-[1.28] object-[50%_32%]',
    tags: ['UX', 'Project Management', 'Dashboard', 'Web', 'Mobile'],
  },
  {
    slug: 'jiraplaybook',
    title: 'Jira Playbook',
    description:
      'A practical delivery playbook to improve team alignment, planning and execution across Jira squads.',
    display_photo: '/jiraplaybook/DisplayimageJiraplaybook.jpg',
    tags: ['UX', 'Way of working', 'Playbook', 'Workshop'],
  },
];

const CaseStudies = () => {
  const trail = useTrail(3, {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 200,
  });

  return (
    <animated.div style={trail[0]} className="h-full p-4 md:p-12">
      <animated.h1
        style={trail[1]}
        className="mb-12 text-center font-pfMarlet text-5xl font-medium text-gray-700"
      >
        Case Studies
      </animated.h1>
      <animated.div
        style={trail[2]}
        className="mx-auto grid h-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2"
      >
        {caseStudyItems.map((item, index) => (
          <AnimatedCard key={item.slug || index} item={item} />
        ))}
      </animated.div>
    </animated.div>
  );
};

export default CaseStudies;
