# Yâren Coffee — Landing


## Yapı

```
src/
├─ index.css              # Figma variables → Tailwind @theme token'ları
├─ data/content.ts        # Menü, değerler, adımlar, iletişim içerikleri
├─ components/
│  ├─ ui/                 # Button, FormField
│  └─ sections/           # PromoBar, Navbar, Hero, Menu, Story, Quote, Contact, Footer, MobileStickyCta
└─ App.tsx
```

Yâren Coffee — Landing Page

Renkler ve tipografi: Paleti doğrudan kahvenin kendisinden aldım. Koyu kahverengi (
#2B1A12) kavrulmuş çekirdeği ve Türk kahvesini, krem (
#F7F3EC) süt köpüğünü ve sıcak bir kâğıt dokusunu temsil ediyor. Zeytin yeşili (
#5E6B3A) ise henüz kavrulmamış yeşil çekirdeğe ve Anadolu’nun doğal tonlarına gönderme yapıyor. Tipografide de aynı ikiliği kurdum: başlıklarda geleneksel ve sıcak bir serif olan Fraunces, metinlerde modern ve okunaklı DM Sans. Böylece “eski usul yarenlik, yeni usul kahve” fikri görsel dilde de karşılık buluyor.

Neler yaptım:
Desktop ve mobil için ayrı ayrı Figma tasarımı; renk ve yazı stillerini değişken olarak tanımlayıp koda token olarak aktardım.
React, Vite ve Tailwind CSS ile mobile-first, tam responsive yapı.
Kahve menüsü için kaydırılabilir ürün slider’ı (Swiper).
Doğrulamalı iletişim formu ve gönderim sonrası açılan erişilebilir teşekkür modalı.
Sosyal medyadan gelenlere özel indirim kodlu promosyon çubuğu ve mobilde alta sabit CTA çubuğu.
Okunabilir, bileşenlere ayrılmış kod yapısı.