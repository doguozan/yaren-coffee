/** Slider'ın önceki/sonraki oku; tıklama ve devre dışı durumu Swiper tarafından yönetilir. */
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

// Oklar görsellerin (259px) dikey ortasında, kartın kenarından 16px içeride durur.
// Mobilde parmakla kaydırmak daha doğal; oklar md altında gizli.
const ARROW_BUTTON_CLASSES = [
  'absolute top-[129.5px] z-10 hidden size-12 -translate-y-1/2 items-center justify-center md:flex',
  'rounded-full border border-line-strong bg-cream/90 text-brown shadow-sm backdrop-blur-sm',
  'transition-[opacity,visibility,background-color,color] duration-200 hover:bg-brown hover:text-cream',
  // Desktop'ta oklar slider'a fare gelince ya da içeride klavye odağı varken belirir
  'lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 lg:focus-visible:opacity-100',
  // Swiper başta/sonda o yöndeki oka `swiper-button-disabled` ekliyor; `invisible` hover'daki
  // opacity-100'ü de ezdiği için devre dışı ok hiçbir durumda görünmez
  '[&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:invisible [&.swiper-button-disabled]:opacity-0',
].join(' ')

const POSITION_CLASSES = {
  previous: 'left-4',
  next: 'right-4',
}

export function SliderArrowButton({ ref, direction, label }) {
  const ArrowIcon = direction === 'previous' ? FiArrowLeft : FiArrowRight

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={`${ARROW_BUTTON_CLASSES} ${POSITION_CLASSES[direction]}`}
    >
      <ArrowIcon size={20} aria-hidden="true" />
    </button>
  )
}
