import React from 'react';

interface StorySectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export default function StorySection({
  title,
  subtitle,
  children,
  id,
  className = '',
  titleAs = 'h2'
}: StorySectionProps) {
  const TitleTag = titleAs;

  return (
    <section id={id} className={`min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 ${className}`}>
      {/* Background/Visual layers will be injected here or layered via CSS/GSAP */}
      <div className="z-10 relative max-w-4xl mx-auto flex flex-col items-center text-center">
        {subtitle && (
          <span className="text-olive-primary font-sans text-sm tracking-[0.2em] uppercase mb-4 block">
            {subtitle}
          </span>
        )}
        <TitleTag className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 text-stone-900 leading-tight">
          {title}
        </TitleTag>
        <div className="font-sans text-lg md:text-xl leading-relaxed text-stone-700 space-y-6 max-w-2xl text-balance">
          {children}
        </div>
      </div>
    </section>
  );
}
