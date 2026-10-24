/** Kahve kartlarını sürükleme, oklar ve klavyeyle gezilebilen yatay bir slider'da gösterir. */
import { useState } from 'react'
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductCard } from './ProductCard.jsx'
import { SliderArrowButton } from './SliderArrowButton.jsx'

import 'swiper/css'

// Mobilde 1.15 kart: bir sonraki kartın ucu görünsün ki kaydırılabildiği anlaşılsın
const MOBILE_SLIDER_SETTINGS = {
  slidesPerView: 1.15,
  spaceBetween: 20,
}

// Anahtarlar Tailwind'in md (768px) ve lg (1024px) kırılımlarıyla aynı
const SLIDER_BREAKPOINTS = {
  768: { slidesPerView: 2, spaceBetween: 40 },
  1024: { slidesPerView: 3, spaceBetween: 40 },
}

const SLIDER_MODULES = [Navigation, Pagination, Keyboard, A11y]

const SLIDER_A11Y_MESSAGES = {
  prevSlideMessage: 'Önceki kahveler',
  nextSlideMessage: 'Sonraki kahveler',
  slideLabelMessage: '{{index}} / {{slidesLength}}',
}

export function ProductSlider({ products, header }) {
  // Oklar ve noktalar Swiper'ın dışında; ref yerine state kullanıyoruz ki elementler
  // DOM'a eklendiğinde bileşen yeniden render olsun ve Swiper onları alabilsin.
  const [previousButton, setPreviousButton] = useState(null)
  const [nextButton, setNextButton] = useState(null)
  const [paginationElement, setPaginationElement] = useState(null)

  return (
    <>
      <div className="pb-14">{header}</div>

      {/* group: desktop'ta oklar slider'a fare gelince ya da içeride odak varken görünür */}
      <div className="group relative">
        <SliderArrowButton
          ref={setPreviousButton}
          direction="previous"
          label={SLIDER_A11Y_MESSAGES.prevSlideMessage}
        />
        <SliderArrowButton
          ref={setNextButton}
          direction="next"
          label={SLIDER_A11Y_MESSAGES.nextSlideMessage}
        />

        <Swiper
          aria-label="Kahve menüsü"
          modules={SLIDER_MODULES}
          {...MOBILE_SLIDER_SETTINGS}
          breakpoints={SLIDER_BREAKPOINTS}
          navigation={{ prevEl: previousButton, nextEl: nextButton }}
          pagination={{ el: paginationElement }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={SLIDER_A11Y_MESSAGES}
        >
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Nokta stilleri index.css'te (.product-slider-pagination) */}
      <div ref={setPaginationElement} className="product-slider-pagination pt-10 pb-12" />
    </>
  )
}
