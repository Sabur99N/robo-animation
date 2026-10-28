import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from './components/Scene';
import { SectionOverlay } from './components/SectionOverlay';
import { STORY_SECTIONS } from './constants';
import { useLenis } from './hooks/useLenis';
import { AnimationState } from './types';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] = useState<string>(AnimationState.IDLE);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useLenis();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const timer = setTimeout(() => setLoading(false), 1800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    STORY_SECTIONS.forEach((section) => {
      ScrollTrigger.create({
        trigger: `[data-section="${section.id}"]`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setCurrentAnimation(section.animation),
        onEnterBack: () => setCurrentAnimation(section.animation),
      });
    });
  }, [loading]);

  if (loading) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: 'var(--accent-orange)', animation: 'pulse-glow 1s ease-in-out infinite' }}
          />
          <h1
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Calibrating Unit...
          </h1>
        </div>
        <div
          className="w-56 h-1.5 overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--border-light)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: '60%',
              background: 'linear-gradient(90deg, var(--accent-orange), var(--accent-orange-light))',
              animation: 'loading 1.8s ease-in-out infinite',
            }}
          />
        </div>
        <p className="mt-6 text-xs font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Bot Lab // v2.0
        </p>
      </div>
    );
  }

  return (
    <div id="main-container" ref={containerRef} style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Scene currentAnimation={currentAnimation} mousePos={mousePos} />

      <div className="relative z-10">
        <header className="header-glass fixed top-0 left-0 w-full px-6 md:px-10 py-5 flex justify-between items-center z-50">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: 'var(--accent-orange)', color: '#fff' }}
            >
              BL
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                BOT LAB
              </div>
              <div className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
                Mech Division
              </div>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase font-semibold">
            {['Assembly', 'Mechanics', 'Deploy'].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-300"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {STORY_SECTIONS.map((section, idx) => (
          <div key={section.id} data-section={section.id}>
            <SectionOverlay section={section} index={idx} />
          </div>
        ))}

        <footer
          className="h-screen flex flex-col items-center justify-center text-center px-6"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: 'var(--accent-metal-dark)' }}
          >
            Unit Status: Online
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Ready for Deployment
          </h2>
          <p className="max-w-lg text-base md:text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The sentinel stands calibrated — low-poly chassis, warm ochre finish, and silver-jointed limbs.
            Scroll back to reassemble the journey.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 rounded-full uppercase text-xs tracking-[0.25em] font-bold transition-all duration-300"
            style={{
              border: '2px solid var(--accent-orange)',
              color: 'var(--accent-orange-dark)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--accent-orange-dark)';
            }}
          >
            Return to Assembly
          </button>
        </footer>
      </div>

      <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {STORY_SECTIONS.map((s) => (
          <div key={s.id} className="flex items-center gap-2 justify-end">
            <span
              className="text-[8px] font-mono tracking-wider uppercase opacity-0 hover:opacity-100 transition-opacity hidden md:block"
              style={{ color: 'var(--text-muted)' }}
            >
              {s.title}
            </span>
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: currentAnimation === s.animation ? '10px' : '6px',
                height: currentAnimation === s.animation ? '10px' : '6px',
                backgroundColor:
                  currentAnimation === s.animation ? 'var(--accent-orange)' : 'var(--accent-metal)',
                boxShadow:
                  currentAnimation === s.animation ? '0 0 8px rgba(217, 160, 67, 0.5)' : 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
