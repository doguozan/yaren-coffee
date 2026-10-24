/** Hero'nun metin bloğu: marka adı, slogan, tanıtım paragrafı ve yönlendirme butonları. */
import { LinkButton } from '../../ui/Button.jsx'

const STACKED_LAYOUT_CLASSES = 'flex flex-col gap-7 px-5 py-20 md:px-10'

const DESKTOP_OVERLAY_CLASSES =
  'lg:absolute lg:inset-x-0 lg:top-0 lg:h-[701px] lg:justify-center lg:gap-12 lg:px-[60px] lg:py-0'

export function HeroContent() {
  return (
    <div className={`${STACKED_LAYOUT_CLASSES} ${DESKTOP_OVERLAY_CLASSES}`}>
      <div className="flex flex-col gap-[18px] lg:w-[641px]">
        <h1 className="font-serif text-[72px] leading-[0.92] tracking-[-0.02em] text-cream md:text-[96px] lg:text-[120px]">
          Yâren
        </h1>
        <p className="font-serif text-[26px] leading-[1.2] text-line-strong italic md:text-[30px] lg:text-[34px]">
          Her fincanda ortak bir hikâye.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <p className="text-[17px] leading-[1.75] text-cream md:max-w-[560px] lg:w-[420px]">
          Cezvede köpüren Türk kahvesinden ipeksi espressoya, sabırla süzülen filtre kahveye. Kırk
          yıllık hatırı bugünün ritmiyle buluşturuyoruz.
        </p>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <LinkButton href="#kahveler" variant="olive" className="w-full md:w-auto">
            Kahveleri Keşfet
          </LinkButton>

          <a
            href="#hikayemiz"
            className="flex h-11 items-center border-b border-cream pb-0.5 text-[16px] leading-none font-medium text-cream transition-opacity hover:opacity-70"
          >
            Hikâyemiz
          </a>
        </div>
      </div>
    </div>
  )
}
