/** Sayfa altı: marka imzası, ikonlu sosyal medya linkleri, telif notu ve başa dön linki. */
import { socials } from '../../data/content.js'

// İsim + ikon tek link; min 44x44px dokunma alanı, hover'da ikisi birlikte renk değiştirir
const SOCIAL_LINK_CLASSES = [
  'flex min-h-11 min-w-11 flex-col items-center justify-center gap-2',
  'text-brown transition-colors hover:text-olive',
].join(' ')

export function Footer() {
  return (
    <footer className="border-t border-line px-5 pt-14 pb-10 md:px-10 lg:px-[60px] xl:px-[162px]">
      {/* Mobilde imza ve sosyal linkler alt alta (sola yaslı); md'den itibaren iki uca yaslı */}
      <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="font-serif text-[26px] leading-[1.2] text-brown">Yâren</p>
          <p className="font-serif text-[20px] leading-[1.3] text-olive italic">
            Her fincanda ortak bir hikâye.
          </p>
        </div>

        <ul className="flex gap-7 text-[14px] leading-none">
          {socials.map((social) => {
            const SocialIcon = social.icon

            return (
              <li key={social.label}>
                <a href={social.href} className={SOCIAL_LINK_CLASSES}>
                  {social.label}
                  {/* Linkin erişilebilir adı metinden geliyor; ikon sadece görsel */}
                  <SocialIcon size={20} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col items-start gap-4 text-[12px] leading-[1.5] text-muted md:flex-row md:items-center md:justify-between">
        <p>© 2026 Yâren. Hayali bir marka için hazırlanmış çalışmadır.</p>
        <a
          href="#top"
          className="flex min-h-11 items-center underline underline-offset-2 transition-colors hover:text-brown"
        >
          Başa dön ↑
        </a>
      </div>
    </footer>
  )
}
