import React from 'react';

interface WhatsAppCTAProps {
  phoneNumber?: string;
  message?: string;
  label?: string;
  className?: string;
}

export default function WhatsAppCTA({
  phoneNumber = "905000000000",
  message = "Merhaba, premium zeytinyağlarınız hakkında bilgi almak istiyorum.",
  label = "Sipariş Ver",
  className = "",
}: WhatsAppCTAProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-8 py-4 bg-olive-dark text-stone-50 font-sans font-medium text-lg tracking-wide uppercase transition-all duration-500 hover:bg-olive-primary focus:outline-none focus:ring-1 focus:ring-olive-light focus:ring-offset-2 focus:ring-offset-stone-50 border border-transparent hover:border-olive-light ${className}`}
    >
      {label}
    </a>
  );
}
