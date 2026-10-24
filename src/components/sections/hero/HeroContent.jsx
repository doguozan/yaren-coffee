/** Hero'nun metin bloğu: marka adı, slogan, tanıtım paragrafı ve yönlendirme butonları. */
import { LinkButton } from '../../ui/Button.jsx'

// Mobil/tablette metin normal akışta, fotoğrafın üstünde yer alıyor
const STACKED_LAYOUT_CLASSES = 'flex flex-col gap-7 px-5 pb-9 pt-14 md:px-10 md:pt-16'

// Desktop'ta aynı blok, 701px yüksekliğindeki fotoğrafın üstüne dikey ortalanarak biniyor
const DESKTOP_OVERLAY_CLASSES =
  'lg:absolute lg:inset-x-0 lg:top-0 lg:h-[701px] lg:justify-center lg:gap-12 lg:px-[60px] lg:py-0'

export function HeroContent() {
  return (
    <div className={`${STACKED_LAYOUT_CLASSES} ${DESKTOP_OVERLAY_CLASSES}`}>
      <div className="flex flex-col gap-[18px] lg:w-[641px]">
        <p className="eyebrow lg:hidden">Geleneksel ruh · Çağdaş demleme</p>
        <h1 className="font-serif text-[72px] leading-[0.92] tracking-[-0.02em] text-brown md:text-[96px] lg:text-[120px] lg:text-cream">
          Yâren
        </h1>
        <p className="font-serif text-[26px] leading-[1.2] text-olive italic md:text-[30px] lg:text-[34px] lg:text-line-strong">
          Her fincanda ortak bir hikâye.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-[17px] leading-[1.75] text-brown-text md:max-w-[560px] lg:w-[420px] lg:text-cream">
          Cezvede köpüren Türk kahvesinden ipeksi espressoya, sabırla süzülen filtre kahveye. Kırk
          yıllık hatırı bugünün ritmiyle buluşturuyoruz.
        </p>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          {/* Mobilde koyu ve tam genişlik (başparmakla kolay erişim); desktop'ta fotoğrafın
              üstünde öne çıksın diye zeytin yeşili */}
          <LinkButton href="#kahveler" className="w-full md:w-auto lg:hidden">
            Kahveleri Keşfet
          </LinkButton>
          {/* Sarmalayıcı div şart: butonun kendi inline-flex sınıfı `hidden` ile çakışıyor */}
          <div className="hidden lg:block">
            <LinkButton href="#kahveler" variant="olive">
              Kahveleri Keşfet
            </LinkButton>
          </div>

          <a
            href="#hikayemiz"
            className="flex h-11 items-center border-b border-brown pb-0.5 text-[16px] leading-none font-medium text-brown transition-opacity hover:opacity-70 lg:border-cream lg:text-cream"
          >
            Hikâyemiz
          </a>
        </div>
      </div>
    </div>
  )
}
