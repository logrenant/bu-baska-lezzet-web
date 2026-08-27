"use client";

import { useState } from 'react';
import { faqData, FaqItem } from '@/lib/content/faq';

/**
 * A cleanly styled accordion for the FAQ.
 * Uses local state rather than `<details>` purely because it allows for
 * smoother animations (framer-motion or simple CSS height transitions)
 * and easier "only one open at a time" control if desired.
 */
export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-8 pb-32">
      <div className="flex flex-col border-t border-stone-300">
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-stone-300">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
      >
        <h3 className="font-serif text-xl sm:text-2xl text-stone-900 pr-8">
          {item.question}
        </h3>
        <span
          className={`relative flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-hidden="true"
        >
          {/* Vertical line of the plus */}
          <span className="absolute h-full w-px bg-stone-500" />
          {/* Horizontal line of the plus */}
          <span className="absolute h-px w-full bg-stone-500" />
        </span>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
