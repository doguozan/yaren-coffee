/** Sayfanın açılış bölümü: marka başlığı, tanıtım metni, CTA'lar ve üç temel değer. */
import { HeroContent } from './HeroContent.jsx'
import { HeroValues } from './HeroValues.jsx'

import heroImage from '../../../assets/hero.png'

const HERO_IMAGE_ALT = 'Yâren kahve dükkânının tezgâhı ve espresso makinesi'

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[560px] overflow-hidden lg:h-[701px]">
        <img
          src={heroImage}
          alt={HERO_IMAGE_ALT}
          className="absolute inset-0 size-full rounded-[6px] bg-cream-2 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 from-20% to-black/55 to-65% lg:from-black/70 lg:to-black/35" />
        <HeroContent />
      </div>

      <HeroValues />
    </section>
  )
}
