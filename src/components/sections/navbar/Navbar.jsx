/** Sayfanın üstüne yapışan gezinme çubuğu; desktop'ta linkler, lg altında hamburger menü. */
import { useEffect, useState } from 'react'

import { LinkButton } from '../../ui/Button.jsx'
import { MobileMenu } from './MobileMenu.jsx'

import menuIcon from '../../../assets/icon-menu.svg'
import { navLinks } from '../../../data/content.js'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleMenuToggle() {
    setIsMenuOpen((wasMenuOpen) => !wasMenuOpen)
  }

  function handleMenuClose() {
    setIsMenuOpen(false)
  }

  // Klavye kullanıcıları menüyü Escape ile kapatabilsin
  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream">
      <nav
        aria-label="Ana menü"
        className="flex min-h-[72px] items-center justify-between px-5 md:px-10 lg:h-[72px] lg:px-[60px]"
      >
        <a
          href="#top"
          className="flex min-h-11 items-center font-serif text-[26px] leading-[1.2] text-brown"
        >
          Yâren
        </a>

        {/* Linkler tek satıra ancak lg genişliğinde sığıyor; altında hamburger menü devreye giriyor */}
        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex h-11 items-center text-[14px] leading-none text-brown transition-colors hover:text-olive"
            >
              {link.label}
            </a>
          ))}
          <LinkButton href="#kahveler" size="small">
            Kahveleri Keşfet
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={handleMenuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          className="flex size-12 items-center justify-center rounded-full border border-line-strong lg:hidden"
        >
          <img src={menuIcon} alt="" width={20} height={20} />
        </button>
      </nav>

      {isMenuOpen && <MobileMenu onLinkClick={handleMenuClose} />}
    </header>
  )
}
