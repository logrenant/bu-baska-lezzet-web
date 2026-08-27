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
      'Hikâyemiz, rüzgârın zeytin yapraklarıyla dans ettiği Ayvalık yamaçlarında, kökleri yüzyıllar öncesine uzanan asırlık ağaçlarımızla başlar. Ailemizin bu topraklarla kurduğu bağ, üç kuşak önce dikilen ilk fidanla filizlendi ve toprağa duyduğumuz sonsuz saygıyla bugüne ulaştı.',
      'Biz, daha fazla ürün elde etmek uğruna doğanın dengesini bozan sıklaştırılmış modern dikim sistemlerini reddediyoruz. Geniş aralıklarla kök salmış, güneşten ve Ege rüzgârından nasibini tam alan asırlık ağaçlarımızın bilgeliğine inanıyor, onların sunduğu az ama öz meyveyi bir lütuf olarak görüyoruz.',
    ],
  },
  {
    index: '02',
    label: 'Yöntem',
    title: 'Acele etmeyen bir üretim',
    body: [
      'Mükemmellik aceleye gelmez. Hasadımız, zeytinler henüz yeşilken, en yüksek polifenol ve antioksidan değerlerine sahip oldukları Ekim ayının o serin sabahlarında başlar. Her bir zeytin tanesi, dalına ve meyvesine zarar vermemek için özenle elle toplanır ve zedelenmeleri önlemek adına özel havalandırmalı kasalarda taşınır.',
      'Bahçeden koparılan zeytinler, oksidasyona uğramadan sadece birkaç saat içinde sıkıma alınır. Sıkım işlemimiz kesinlikle 27°C\'yi aşmayan, gerçek soğuk sıkım prensibiyle gerçekleşir. Bu sayede zeytinin o kendine has meyvemsi aroması, genzi hafifçe yakan taze çimen kokusu ve tüm şifası zerre kaybolmadan zeytinyağına geçer.',
    ],
  },
  {
    index: '03',
    label: 'Söz',
    title: 'Şişeye giren her damlanın arkasında dururuz',
    body: [
      'Şişeye giren her damla, toprağa, emeğe ve size verdiğimiz bir sözdür. Ürettiğimiz her partiyi kendi mutfağımızda, kendi çocuklarımıza yedirmeyeceğimiz standartta ise asla şişelemiyoruz. Şişenin üzerindeki her detay, bahçeden sofranıza kadar süren şeffaf ve izlenebilir bir hikâyenin kanıtıdır.',
      'Bu başka lezzeti sadece anlatmak yetmez, onu duyularınızla yaşamanız gerekir. Sizi, asırlık ağaçlarımızın ruhunu taşıyan bu eşsiz zeytinyağını tatmaya ve doğanın kusursuz simyasına ortak olmaya davet ediyoruz.',
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
            Zeytinyağı bizim için sadece bir ürün değil; asırlık ağaçların fısıltısı, toprağın bereketi ve kuşaktan kuşağa aktarılan bir tutkunun şişelenmiş halidir. "Bu Başka Lezzet" diyerek çıktığımız yolda, doğanın kusursuz simyasını en saf haliyle sofralarınıza taşıyoruz.
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
