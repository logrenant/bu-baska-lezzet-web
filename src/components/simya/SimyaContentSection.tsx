import React from 'react';

/**
 * The three milling steps from content.md's BÖLÜM 3 (Ezme / Yoğurma / Süzülme).
 * Kept as data so the grid stays a single markup block — the numbering is the
 * rail, so order here IS the order on screen.
 */
const steps = [
  {
    step: '01',
    title: 'Ezme',
    subtitle: 'Kırma',
    body: 'Dalından ayrılan zeytin, birkaç saat içinde taşın altındadır. Isınmasına izin verilmeden, çekirdeğiyle birlikte yavaşça ezilir. Acele eden bir kırıcı meyveyi yakar; bizimki ağırdan alır, çünkü aromayı taşıyan ne posadır ne su — meyvenin kendi serinliğidir.',
  },
  {
    step: '02',
    title: 'Yoğurma',
    subtitle: 'Malaksasyon',
    body: 'Hamur, 27°C\'nin altında sabırla yoğrulur. Soğuk sıkımın tek şartı budur: ısıyla verimi artırma cazibesine kapılmamak. Isı verimi büyütür ama kokuyu, acılığı ve polifenolü alıp götürür. Biz suyun değil, zeytinin kendi öz yağının açığa çıkmasını bekleriz.',
  },
  {
    step: '03',
    title: 'Süzülme',
    subtitle: 'Ayrışma',
    body: 'Suyundan ve posasından doğal yollarla ayrışan sıvı altın, en taze kokusuyla ilk kez gün yüzüne çıkar. O ilk akış, o yılın hasadının ne olduğunu tek başına söyler — yeşil, biberli, boğazı yakan bir dürüstlükte.',
  },
];

export default function SimyaContentSection() {
  return (
    <section className="w-full bg-[#fafaf5] py-8 md:py-16 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Pull quote + hikâye metni */}
        <div className="w-full max-w-4xl text-left">
          <h3 className="font-serif text-olive-eyebrow text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-[1.4] mb-10">
            &quot;Tıpkı iyi bir şarap gibi, geleneksel zeytinyağı üretimi de bilimden çok bir sanattır. Usta zeytinyağı sıkımcımız, makinelere değil meyvenin diline kulak verir.&quot;
          </h3>

          <p className="font-sans text-stone-600 text-base md:text-lg leading-relaxed">
            Sıkım, hasadın devamı değil; hasadın sınavıdır. Bahçede kazanılan ne varsa taş kırıcının altında kaybedilebilir. Endüstriyel tesis bu yüzden ısıya, suya ve hıza güvenir — üçü de daha fazla litre demektir. Biz üçünü de reddediyoruz. Zeytinimiz dalından ayrıldıktan sonra beklemez, yığılmaz, terlemez; nefes alan kasalarda ve saatler içinde sıkıma iner. Ustamızın elinde kronometre değil, koku vardır: hamurun rengine, kokusuna ve tutuşuna bakarak yoğurmanın ne zaman biteceğine karar verir. Aynı bahçenin zeytini, aynı gün, farklı iki saatte farklı davranır — ve bunu bir makineye anlatmanın yolu yoktur.
          </p>
        </div>

        {/* Üçlü süreç: Ezme → Yoğurma → Süzülme */}
        <ol className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mt-16 md:mt-24">
          {steps.map((item) => (
            <li key={item.step} className="border-t border-stone-900/15 pt-6">
              <span className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow block">
                {item.step} — {item.subtitle}
              </span>
              <h4 className="font-serif text-2xl md:text-3xl text-stone-900 mt-4 leading-snug">
                {item.title}
              </h4>
              <p className="font-sans text-stone-600 text-sm md:text-base leading-relaxed mt-4">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
