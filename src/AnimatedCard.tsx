import { useInView, useSpring } from '@react-spring/web';
import Card from './Card.tsx';

export type Project = {
  slug: string;
  title: string;
  description: string;
  display_photo?: string;
  hover_video?: string;
  hover_video_preload?: 'none' | 'metadata' | 'auto';
  media_fit?: 'contain' | 'cover';
  media_wrapper_class?: string;
  media_image_class?: string;
  tags?: string[];
};

const AnimatedCard = ({ item }: { item: Project }) => {
  const [ref, inView] = useInView({
    rootMargin: '-10% 0%',
  });

  const animationStyle = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(60px)',
    config: { mass: 1, tension: 150, friction: 30 },
    delay: 200,
  });

  return (
    <div ref={ref}>
      <Card
        slug={item.slug}
        title={item.title}
        description={item.description}
        display_photo={item.display_photo}
        hover_video={item.hover_video}
        hover_video_preload={item.hover_video_preload}
        media_fit={item.media_fit}
        media_wrapper_class={item.media_wrapper_class}
        media_image_class={item.media_image_class}
        tags={item.tags}
        style={animationStyle}
      />
    </div>
  );
};

export default AnimatedCard;
