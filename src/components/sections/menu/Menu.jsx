/** Kahveler bölümü: bölüm başlığını ve ürün slider'ını bir araya getirir. */
import { SectionHeading } from '../../ui/SectionHeading.jsx'
import { ProductSlider } from './ProductSlider.jsx'

import { products } from '../../../data/content.js'

function MenuHeader() {
  return (
    <header className="flex flex-col gap-8 lg:gap-6">
      <SectionHeading
        eyebrow="Menü"
        title="Her fincan, ayrı bir hikâye"
        titleClassName="lg:w-[560px]"
      />
      <p className="text-[16px] leading-[1.7] text-muted lg:w-[380px]">
        Geleneğin köpüğünden modern demlemenin berraklığına; kendine en yakın olanı seç.
      </p>
    </header>
  )
}

export function Menu() {
  return (
    <section id="kahveler" className="px-5 py-20 md:px-10 lg:p-[60px]">
      <ProductSlider products={products} header={<MenuHeader />} />

      <p className="text-[12px] leading-[1.5] text-muted lg:hidden">
        Fiyatlar örnek amaçlıdır. Kampanya kodu ilk siparişte geçerlidir.
      </p>
    </section>
  )
}
