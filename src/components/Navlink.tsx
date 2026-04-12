import { animated, useTransition } from '@react-spring/web';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DrawingCirclesSVG from './CircleAnimatedSVG';

interface AnimatedIndicatorProps {
  show: boolean;
  scale: number;
}

const AnimatedIndicator = ({ show, scale }: AnimatedIndicatorProps) => {
  const transitions = useTransition(show, {
    from: { opacity: 0, transform: `scale(${scale * 0.95})` },
    enter: { opacity: 1, transform: `scale(${scale})` },
    leave: { opacity: 0, transform: `scale(${scale * 0.95})` },
    config: { tension: 300, friction: 20 },
  });

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          className="absolute pointer-events-none"
          style={{
            ...style,
            top: '-5px',
            left: '50%',
            marginLeft: -65,
            width: 130,
            height: 46,
          }}
        >
          <DrawingCirclesSVG />
        </animated.div>
      ),
  );
};

interface NavLinkProps {
  label: string;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
  scale?: number;
}

export const NavLink = ({ label, isActive, className, onClick, scale = 1 }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const showIndicator = isActive || isHovered;
  const href = `/${label}`;
  const requiresDocumentNavigation = href === '/case-studies';
  const displayLabel =
    label === 'aboutme'
      ? 'About me'
      : label
          .split('-')
          .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
          .join(' ');

  const commonProps = {
    className: `text-[#184027] hover:text-gray-600 transition-colors ${className ?? ''}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick,
  };

  const content = (
    <button className="bg-transparent relative py-2 px-4">
      {displayLabel}

      <AnimatedIndicator show={showIndicator} scale={scale} />
    </button>
  );

  if (requiresDocumentNavigation) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} {...commonProps}>
      {content}
    </Link>
  );
};
