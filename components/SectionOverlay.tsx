import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StorySection } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface SectionOverlayProps {
  section: StorySection;
  index: number;
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({ section, index }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = textRef.current?.children;
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 68%',
              end: 'bottom 32%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isRight = index % 2 === 1;

  return (
    <div
      ref={sectionRef}
      className={`relative h-screen flex items-center pointer-events-none ${
        isRight ? 'justify-end pr-6 md:pr-12 lg:pr-16' : 'justify-start pl-6 md:pl-12 lg:pl-16'
      }`}
    >
      <div
        ref={textRef}
        className={`section-card w-full max-w-[280px] sm:max-w-xs md:max-w-sm p-5 md:p-7 ${
          isRight ? 'text-right' : 'text-left'
        }`}
      >
        <div className={`flex items-center gap-3 mb-4 ${isRight ? 'flex-row-reverse' : ''}`}>
          <span className="section-index font-mono text-[11px] tracking-[0.3em]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`font-mono font-semibold tracking-[0.35em] uppercase text-[10px] md:text-xs ${
              isRight ? 'border-r-2 pr-3' : 'border-l-2 pl-3'
            }`}
            style={{ color: 'var(--accent-metal-dark)', borderColor: 'var(--accent-orange)' }}
          >
            {section.subtitle}
          </span>
        </div>

        <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-[0.92]">
          {section.title}
        </h2>

        <div
          className={`h-1 w-14 mb-5 rounded-full ${isRight ? 'ml-auto' : ''}`}
          style={{ background: 'linear-gradient(90deg, var(--accent-orange), var(--accent-metal))' }}
        />

        <p className="section-desc text-sm md:text-base leading-relaxed">
          {section.description}
        </p>

        <div className={`flex gap-2 mt-5 ${isRight ? 'justify-end' : 'justify-start'}`}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rivet-dot w-2 h-2 rounded-full"
              style={{
                animation: `rivet-blink ${1.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
