/** lg altında hamburger butonuyla açılan, navbar'ın altına inen link listesi. */
import { navLinks } from '../../../data/content.js'

export function MobileMenu({ onLinkClick }) {
  return (
    <div id="mobile-menu" className="border-t border-line px-5 pb-6 md:px-10 lg:hidden">
      <ul className="flex flex-col">
        {navLinks.map((link) => (
          <li key={link.href} className="border-b border-line">
            {/* Sayfa içi linke gidilince açık menü içeriğin üstünde kalmasın diye kapanıyor */}
            <a
              href={link.href}
              onClick={onLinkClick}
              className="block py-4 font-serif text-[21px] leading-[1.3] text-brown"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
