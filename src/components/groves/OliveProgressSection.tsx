import React from 'react';
import Image from 'next/image';

export default function OliveProgressSection() {
  return (
    <section className="w-full bg-[#fafaf5] py-16 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Olive Progress Image */}
        <div className="w-full max-w-4xl mb-16 md:mb-32">
          <Image
            src="/assets/olive-progress-v5.webp"
            alt="Olive ripening progress"
            width={1200}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Text Content - Full Width as requested (but constrained by max-w for readability) */}
        <div className="w-full max-w-4xl text-left">
          <h3 className="font-serif text-[#7c886a] text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-[1.4] mb-10">
            Zeytin bir meyvedir ve zeytinyağı aslında bir meyve suyudur. Endüstriyel üreticiler makinelerin rahat geçmesi için ağaçları sıklaştırır ve doğayı tek tipleştirir.
          </h3>

          <p className="font-sans text-stone-600 text-base md:text-lg leading-relaxed mb-12">
            Toprağa hükmetmeye değil, onu yeniden dinlemeye geldik. Zeytinliklerimizde hiçbir suni gübre veya zirai ilaç kullanmıyor, Rüzgarın, yağmurun ve güneşin kendi dengesini bulmasına izin veriyoruz. Doğanın işine karışmadığımız için, elde ettiğimiz her bir damla zeytinyağı o yılın ikliminin eşsiz bir yansımasıdır. Çünkü en büyük ustanın insanın makineleri değil, doğanın ta kendisi olduğunu biliyoruz.
          </p>
        </div>
      </div>
    </section>
  );
}
