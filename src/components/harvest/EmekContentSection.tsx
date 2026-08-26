import React from 'react';

export default function EmekContentSection() {
  return (
    <section className="w-full bg-[#fafaf5] py-16 md:py-32 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Text Content */}
        <div className="w-full max-w-4xl text-left">
          <p className="font-sans text-stone-600 text-base md:text-xl lg:text-2xl leading-relaxed mb-12">
            Her yılın mahsulü, toprağın bize o yıla özel yazdığı, tekrarı olmayan bir mektuptur. Üretimi fabrikasyonlaştıran modern dünyaya inat, biz ağacın bize sunduğu kadarına şükrediyor, rekolteyi zorla artırmak için doğaya boyun eğdirmeye çalışmıyoruz. Hasadı standartlaştıran devasa makineleri reddediyor; zeytinlerimizi en doğru zamanda, tıpkı eskiden olduğu gibi dallarından ellerimizle topluyoruz. Bizim hasadımız, o yıla özgü ve bir daha asla kopyalanamayacak, tamamen özüne sadık bir karakter taşır.
          </p>
        </div>
      </div>
    </section>
  );
}
