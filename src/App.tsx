import { animated, useTransition } from '@react-spring/web';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { NavLink } from './components/Navlink.tsx';

function App() {
  const sections = ['case-studies', 'resume', 'aboutme'];
  const location = useLocation();
  const isHomepageRoute = location.pathname === '/';
  const isStickyDeckRoute =
    location.pathname === '/case-studies/apex-wrapped' ||
    location.pathname === '/case-studies/apexwrapped' ||
    location.pathname === '/case-studies/modc' ||
    location.pathname === '/case-study/apex-wrapped' ||
    location.pathname === '/case-study/apexwrapped' ||
    location.pathname === '/case-study/modc' ||
    location.pathname === '/portfolio/modc';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentOutlet = useOutlet();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const transitions = useTransition(currentOutlet, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: {
      opacity: 0,
      transform: 'translateY(-10px)',
      position: 'absolute',
      width: '100%',
    },
    key: location.pathname,
  });

  const menuTransition = useTransition(isMenuOpen, {
    from: { transform: 'translateY(-100%)', opacity: 0 },
    enter: { transform: 'translateY(0%)', opacity: 1 },
    leave: { transform: 'translateY(-100%)', opacity: 0 },
    config: { tension: 220, friction: 24 },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, location]);

  useLayoutEffect(() => {
    if (!shellRef.current || !navRef.current) return;

    const updateNavHeight = () => {
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
      shellRef.current?.style.setProperty('--shell-nav-height', `${Math.round(navHeight)}px`);
    };

    updateNavHeight();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateNavHeight);

      return () => {
        window.removeEventListener('resize', updateNavHeight);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateNavHeight();
    });

    resizeObserver.observe(navRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="w-full min-h-screen flex flex-col relative"
      style={{
        backgroundColor: '#FFF6ED',
      }}
    >
      <div className="grid-background" aria-hidden="true" />
      <div className="relative z-10">
        <nav
          ref={navRef}
          className={`w-full flex items-center justify-between p-4 pr-8 bg-[#FFF6ED] sticky top-0 z-20 font-pfMarlet ${isStickyDeckRoute ? '' : 'backdrop-blur-sm'}`}
        >
          <Link to={'/'} className="z-30">
            <div className="font-pfMarletItalic text-[#AAAADD]">NMX DESIGN</div>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden text-2xl z-30">
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <div className="hidden sm:flex sm:flex-row sm:items-center sm:space-x-6 gap-4">
            {sections.map((label) => (
              <NavLink key={label} label={label} isActive={location.pathname.includes(label)} />
            ))}
          </div>
        </nav>
        {menuTransition(
          (style, item) =>
            item && (
              <animated.div
                className="sm:hidden fixed inset-0 z-20 flex flex-col items-center justify-center space-y-4 bg-[#FFF6ED] h-screen"
                style={style}
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 text-3xl"
                >
                  ✕
                </button>
                <div
                  className="flex flex-col items-center space-y-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  {sections.map((label) => (
                    <NavLink
                      key={label}
                      label={label}
                      isActive={location.pathname.includes(label)}
                      className="text-3xl font-pfMarlet"
                      onClick={() => setIsMenuOpen(false)}
                      scale={1.7}
                    />
                  ))}
                </div>
              </animated.div>
            ),
        )}

        <main
          className={`relative w-full flex-grow ${isStickyDeckRoute ? 'overflow-visible' : 'overflow-hidden'} ${isHomepageRoute ? 'pb-0' : 'pb-12'}`}
        >
          {isStickyDeckRoute ? (
            <div className="min-h-full bg-transparent">
              {currentOutlet}
            </div>
          ) : (
            transitions((style, outlet) => (
              <animated.div
                style={style}
                className={isHomepageRoute ? 'bg-transparent' : 'bg-[#FFF6ED]'}
              >
                {outlet}
              </animated.div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
