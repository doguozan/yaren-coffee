/** lg altında ekranın altına sabitlenen iki butonlu CTA çubuğu. */
import { LinkButton } from '../ui/Button.jsx'

export function MobileStickyCta() {
  return (
    // Desktop'ta aynı butonlar navbar ve hero'da hep görünür; çubuk sadece dar ekranlarda gerekli.
    // Yüksekliği (73px) App.jsx'teki alt boşlukla eşleşiyor, footer'ın üstünü kapatmıyor.
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-cream px-4 py-3 md:px-10 lg:hidden">
      <LinkButton href="#kahveler" size="compact" className="flex-1">
        Kahveleri Keşfet
      </LinkButton>
      <LinkButton href="#iletisim" size="compact" variant="line" className="flex-1">
        Bize Yaz
      </LinkButton>
    </div>
  )
}
