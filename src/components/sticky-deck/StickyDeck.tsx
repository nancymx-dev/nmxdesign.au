import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { type ApexSlide } from '../../data/apexWrappedCards';
import StickyCard from './StickyCard';
import StickyProgress from './StickyProgress';

gsap.registerPlugin(ScrollTrigger);

const MAX_VISIBLE = 2;
const STICKY_TOP = 0;

interface StickyDeckProps {
  slides: ApexSlide[];
}

const StickyDeck = ({ slides }: StickyDeckProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const hiddenBeforeIndex = Math.max(0, activeIndex - (MAX_VISIBLE - 1));

  const scrollToSlide = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const children = section.children;
    let targetY = sectionTop;
    const targetChildIdx = index * 2;
    for (let c = 0; c < targetChildIdx && c < children.length; c++) {
      targetY += (children[c] as HTMLElement).offsetHeight;
    }

    const distance = Math.abs(window.scrollY - targetY);
    window.scrollTo({ top: targetY, behavior: distance > 3000 ? 'auto' : 'smooth' });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cards = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll('.slide-card'),
    );

    cards.forEach((card: HTMLElement, i: number) => {
      gsap.set(card, { zIndex: i + 1 });
    });

    const triggers: ScrollTrigger[] = [];

    // Show/hide dots when the deck section is in view
    const sectionTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onToggle: ({ isActive }: ScrollTrigger) => setDotsVisible(isActive),
    });
    triggers.push(sectionTrigger);

    // Track which slide is active for the progress indicator
    cards.forEach((card: HTMLElement, i: number) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: ({ isActive }: ScrollTrigger) => {
          if (isActive) setActiveIndex(i);
        },
      });
      triggers.push(st);
    });

    if (!prefersReduced) {
      // Push oldest card off-screen when the (i + MAX_VISIBLE)th card arrives
      cards.forEach((card: HTMLElement, i: number) => {
        const pushTriggerIndex = i + MAX_VISIBLE;
        if (pushTriggerIndex < cards.length) {
          const anim = gsap.to(card, {
            y: '-120%',
            ease: 'none',
            scrollTrigger: {
              trigger: cards[pushTriggerIndex],
              start: 'top bottom',
              end: `top top+=${STICKY_TOP}px`,
              scrub: true,
            },
          });
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
        }
      });
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [slides]);

  return (
    <>
      {createPortal(
        <StickyProgress total={slides.length} activeIndex={activeIndex} onSelect={scrollToSlide} visible={dotsVisible} />,
        document.body,
      )}
      <div ref={sectionRef} className="slide-deck-section relative bg-[var(--brand-sand)]">
        {slides.map((slide, i) => (
          <Fragment key={slide.id}>
            <div
              className={`slide-card bg-[var(--brand-sand)] ${
                i < hiddenBeforeIndex
                  ? 'pointer-events-none opacity-0'
                  : 'pointer-events-auto opacity-100'
              }`}
              data-slide={i}
              data-testid={`slide-card-${slide.id}`}
              aria-hidden={i < hiddenBeforeIndex}
            >
              <div className="h-full overflow-hidden rounded-3xl border border-[rgba(24,64,39,0.12)] bg-[var(--brand-sand)] shadow-[0_30px_80px_rgba(24,64,39,0.1)]">
                <StickyCard slide={slide} index={i} />
              </div>
            </div>
            <div className="slide-spacer" aria-hidden="true" />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default StickyDeck;
