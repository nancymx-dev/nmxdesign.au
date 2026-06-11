import { animated, SpringValue, useSpring } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  slug: string;
  title: string;
  description: string;
  display_photo?: string;
  hover_video?: string;
  hover_video_preload?: 'none' | 'metadata' | 'auto';
  media_fit?: 'contain' | 'cover';
  media_wrapper_class?: string;
  media_image_class?: string;
  media_video_class?: string;
  tags?: string[];
  // This correctly accepts the animation style from the parent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: { [key: string]: SpringValue<any> };
}

const Card = ({
  slug,
  title,
  description,
  display_photo,
  hover_video,
  hover_video_preload = 'metadata',
  media_fit = 'cover',
  media_wrapper_class,
  media_image_class,
  media_video_class,
  tags,
  style,
}: CardProps) => {
  const [isHovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // This spring handles the hover effect
  const hoverAnimation = useSpring({
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)',
    boxShadow: isHovered
      ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    config: { tension: 300, friction: 15 },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hover_video) return;

    if (isHovered) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [hover_video, isHovered]);

  return (
    <Link to={`/case-studies/${slug}`}>
      <animated.div
        style={{ ...style, ...hoverAnimation }}
        className="bg-white/80 rounded-xl border border-gray-200 cursor-pointer h-full overflow-hidden flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {(display_photo || hover_video) ? (
          <div className={`relative h-64 overflow-hidden bg-[#f1efe9] ${media_wrapper_class ?? ''}`}>
            {display_photo ? (
              <img
                src={display_photo}
                alt={title}
                className={`absolute inset-0 h-full w-full ${media_fit === 'contain' ? 'object-contain' : 'object-cover'} ${media_image_class ?? ''} transition-opacity duration-300 ${hover_video && isHovered ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
              />
            ) : null}
            {hover_video ? (
              <video
                ref={videoRef}
                src={hover_video}
                poster={display_photo}
                muted
                loop
                playsInline
                preload={hover_video_preload}
                aria-hidden="true"
                className={`absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none ${media_fit === 'contain' ? 'object-contain' : 'object-cover'} ${media_image_class ?? ''} ${media_video_class ?? ''} transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            ) : null}
          </div>
        ) : null}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-[#AAAADD] mb-3 font-pfMarlet">{title}</h2>
          <p className="text-gray-700 text-lg">{description}</p>
          {Array.isArray(tags) && tags.length > 0 ? (
            <div className="mt-auto pt-5 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={`${slug}-tag-${i}`}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </animated.div>
    </Link>
  );
};

export default Card;
