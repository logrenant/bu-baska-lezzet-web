export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "soguk-sikim",
    question: "Soğuk sıkım nedir ve neden önemlidir?",
    answer: "Soğuk sıkım, zeytinlerin 27°C'nin altındaki sıcaklıklarda mekanik yöntemlerle sıkılması işlemidir. Bu yöntem, zeytinyağının içindeki polifenollerin, antioksidanların ve vitaminlerin ısıdan zarar görmeden yağa geçmesini sağlar. Bu sayede yağımızın duyusal özellikleri (meyvemsilik, acılık, yakıcılık) en üst seviyede korunur."
  },
  {
    id: "asit-orani",
    question: "Zeytinyağınızın asitlik oranı nedir?",
    answer: "Premium sızma zeytinyağlarımızın serbest yağ asitliği değeri (oleik asit cinsinden) her zaman %0.8'in çok altındadır. Erken hasat ve doğru sıkım yöntemlerimiz sayesinde genellikle %0.2 ile %0.4 arasında değişen, son derece düşük asitli ve yüksek kaliteli yağlar elde ediyoruz."
  },
  {
    id: "saklama-kosullari",
    question: "Zeytinyağımı nasıl saklamalıyım?",
    answer: "Zeytinyağının en büyük üç düşmanı ışık, ısı ve oksijendir. Yağınızı koyu renkli cam şişesinde, serin (15°C - 18°C idealdir), rutubetsiz ve güneş ışığı görmeyen bir dolapta saklamalısınız. Ayrıca kapağını her kullanımdan sonra sıkıca kapatarak havayla temasını minimumda tutmalısınız."
  },
  {
    id: "erken-hasat",
    question: "Erken hasat zeytinyağının farkı nedir?",
    answer: "Erken hasat, zeytinler henüz yeşilken ve tam olgunlaşmadan (Ekim-Kasım aylarında) toplanmasıdır. Bu dönemde zeytinin yağ verimi düşük olsa da, elde edilen yağ polifenol ve antioksidan açısından en zengin halindedir. Yoğun çimen kokusu ve genizde bıraktığı hafif yakıcılık, erken hasat yağlarımızın karakteristik özellikleridir."
  },
  {
    id: "filtresiz-zeytinyagi",
    question: "Zeytinyağınız filtrelenmiş mi?",
    answer: "Bazı özel serilerimizde, zeytinin en doğal halini sunabilmek için hafif tortulu, filtresiz zeytinyağı tercih ediyoruz. Filtresiz yağlarda zamanla şişenin dibinde tortu birikmesi tamamen doğaldır ve yağın doğallığının bir göstergesidir."
  },
  {
    id: "kargo-teslimat",
    question: "Siparişler nasıl kargolanıyor ve teslimat süresi nedir?",
    answer: "Tüm siparişleriniz, cam şişelerin kırılmasını önleyen özel korumalı ambalajlarla paketlenir. Siparişleriniz genellikle 1-3 iş günü içerisinde anlaşmalı kargo firmalarına teslim edilerek, güvenli bir şekilde kapınıza kadar ulaştırılır."
  }
];
