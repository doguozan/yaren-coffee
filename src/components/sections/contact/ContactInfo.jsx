/** İletişim bölümünün sol sütunu: başlık, kısa açıklama ve adres/e-posta/saat listesi. */
import { SectionHeading } from '../../ui/SectionHeading.jsx'

import { contactInfo } from '../../../data/content.js'

export function ContactInfo() {
  return (
    // 1024–1279px arasında forma yer kalsın diye sütun biraz daha dar, xl'de tasarımdaki 434px
    <div className="flex flex-col gap-10 lg:w-[380px] lg:shrink-0 xl:w-[434px]">
      <div className="flex flex-col gap-6">
        <SectionHeading eyebrow="İletişim" title="Bir kahve içimi sohbet edelim" />
        <p className="text-[16px] leading-[1.7] text-brown-text md:max-w-[560px]">
          Toptan sipariş, etkinlik ya da sadece merhaba demek için yaz; en kısa sürede dönüş
          yapalım.
        </p>
      </div>

      <dl className="flex flex-col border-b border-line">
        {contactInfo.map((infoRow) => (
          <div
            key={infoRow.label}
            className="flex items-center justify-between gap-4 border-t border-line py-4"
          >
            <dt className="text-[12px] leading-none tracking-[0.16em] text-muted uppercase">
              {infoRow.label}
            </dt>
            {/* Uzun e-posta adresi 320px ekranda taşmasın diye gerekirse satır kırılabiliyor */}
            <dd className="min-w-0 text-right text-[15px] leading-[1.65] wrap-anywhere text-brown-text">
              {infoRow.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
