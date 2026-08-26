import React from 'react';
import WhatsAppCTA from '@/components/shared/WhatsAppCTA';

/* ═══════════════════════════════════════════════════════════════════
 * AboutStory — the written half of /hakkimizda.
 *
 * Deliberately NOT the main flow's layout: the story sections there are
 * centred, full-bleed and parallaxed. Here the page reads as an editorial
 * spread — a sticky numbered rail on the left, a single wide measure of
 * prose on the right, no animation on any text (Agent.md §3: story copy
 * stays in the DOM, in real headings, for crawlers that never wait on GSAP).
 *
 * The copy below is placeholder. Replace the <p> bodies; the structure,
 * headings and rail labels are the parts meant to stay.
 * ═══════════════════════════════════════════════════════════════════ */

interface Chapter {
  index: string;
  label: string;
  title: string;
  body: string[];
}

const chapters: Chapter[] = [
  {
    index: '01',
    label: 'Kökler',
    title: 'Toprağı miras değil, emanet sayarız',
    body: [
      'Bu paragrafa bahçelerin hikâyesini yazın: ağaçların yaşı, toprağın karakteri, ailenin bu topraklarla ne zaman tanıştığı.',
      'İkinci paragrafta neden sıklaştırılmış modern dikim yerine geniş aralıklı asırlık ağaçlarda ısrar ettiğinizi anlatabilirsiniz.',
    ],
  },
  {
    index: '02',
    label: 'Yöntem',
    title: 'Acele etmeyen bir üretim',
    body: [
      'Bu paragrafta hasat ve sıkım yaklaşımınızı anlatın: erken hasat, elle toplama, havalandırmalı kasalar, soğuk sıkım eşiği.',
      'Rakamlarla desteklemek isterseniz — hasattan sıkıma geçen saat, malaksasyon sıcaklığı, polifenol değeri — ikinci paragraf buna uygun.',
    ],
  },
  {
    index: '03',
    label: 'Söz',
    title: 'Şişeye giren her damlanın arkasında dururuz',
    body: [
      'Bu paragrafta markanın sözünü yazın: kalite taahhüdü, izlenebilirlik, kime ve neden ürettiğiniz.',
      'Kapanışta okuru tadım ya da siparişe davet eden bir cümle iyi durur.',
    ],
  },
];

export default function AboutStory() {
  return (
    <div className="relative w-full bg-[#fafaf5]">

      {/* ── Opening spread ── */}
      <section className="px-6 md:px-12 lg:px-24 pt-24 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <span className="font-sans text-xs md:text-sm tracking-[0.28em] uppercase text-[#7c886a]">
            Hakkımızda
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-stone-900 mt-6 max-w-4xl">
            Toprağa hükmetmeye değil,
            <span className="block italic text-[#7c886a]">onu yeniden dinlemeye geldik.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-stone-700 mt-10 max-w-2xl">
            Bu giriş paragrafını siz yazacaksınız. Markanın tek cümlelik özünü ve
            okuru sayfanın geri kalanına hazırlayan kısa bir çerçeveyi buraya koyun.
          </p>
        </div>
      </section>

      {/* ── Numbered chapters: sticky rail + prose ── */}
      <div className="px-6 md:px-12 lg:px-24 pb-8">
        <div className="max-w-6xl mx-auto border-t border-stone-900/10">
          {chapters.map((chapter) => (
            <section
              key={chapter.index}
              className="grid grid-cols-1 lg:grid-cols-[10rem_1fr] gap-6 lg:gap-16 py-14 md:py-20 border-b border-stone-900/10"
            >
              <div className="lg:sticky lg:top-32 lg:self-start">
                <span className="font-serif text-3xl md:text-4xl text-stone-900/20 leading-none block">
                  {chapter.index}
                </span>
                <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#7c886a] mt-3 block">
                  {chapter.label}
                </span>
              </div>

              <div className="max-w-2xl">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug text-stone-900">
                  {chapter.title}
                </h2>
                <div className="font-sans text-base md:text-lg leading-relaxed text-stone-700 mt-6 space-y-5">
                  {chapter.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Closing ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <blockquote className="max-w-3xl">
            <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl leading-snug text-[#7c886a]">
              &ldquo;Tatmak, yüzyıllık bir destana inanmaktır.&rdquo;
            </p>
          </blockquote>
          <div className="mt-12">
            <WhatsAppCTA
              label="Tadım için yazın"
              message="Merhaba, Hakkımızda sayfanızı okudum. Tadım ve sipariş hakkında bilgi almak istiyorum."
            />
          </div>
        </div>
      </section>

    </div>
  );
}
