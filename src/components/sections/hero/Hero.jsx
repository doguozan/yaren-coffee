/** Sayfanın açılış bölümü: marka başlığı, tanıtım metni, CTA'lar ve üç temel değer. */
import { HeroContent } from './HeroContent.jsx'
import { HeroValues } from './HeroValues.jsx'

import heroImage from '../../../assets/hero.png'

const HERO_IMAGE_ALT = 'Yâren kahve dükkânının tezgâhı ve espresso makinesi'

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* Desktop'ta metin fotoğrafın üstüne biniyor; okunabilsin diye soldan karartan gradient */}
      <div className="relative hidden h-[701px] overflow-hidden lg:block">
        <img
          src={heroImage}
          alt={HERO_IMAGE_ALT}
          className="absolute inset-0 size-full rounded-[6px] bg-cream-2 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 from-20% to-black/35 to-65%" />
      </div>

      <HeroContent />

      {/* Mobil ve tablette ekran dar; fotoğraf metnin altında ayrı bir blok olarak duruyor */}
      <div className="px-5 md:px-10 lg:hidden">
        <img
          src={heroImage}
          alt={HERO_IMAGE_ALT}
          className="h-[263px] w-full rounded-[6px] bg-cream-2 object-cover md:h-[420px]"
        />
      </div>

      <HeroValues />
    </section>
  )
}
