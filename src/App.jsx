/** Sayfanın iskeleti: bölümleri tasarımdaki sırayla bir araya getirir. */
import { Contact } from './components/sections/contact/Contact.jsx'
import { Footer } from './components/sections/Footer.jsx'
import { Hero } from './components/sections/hero/Hero.jsx'
import { Menu } from './components/sections/menu/Menu.jsx'
import { MobileStickyCta } from './components/sections/MobileStickyCta.jsx'
import { Navbar } from './components/sections/navbar/Navbar.jsx'
import { PromoBar } from './components/sections/PromoBar.jsx'
import { Quote } from './components/sections/Quote.jsx'
import { Story } from './components/sections/Story.jsx'
import { Divider } from './components/ui/Divider.jsx'

export default function App() {
  return (
    // Mobilde sabit CTA çubuğu (73px) footer'ın üstünü kapatmasın diye alt boşluk;
    // çubuk lg ve üstünde gizlendiği için boşluk da orada kalkar.
    <div className="pb-[73px] lg:pb-0">
      <PromoBar />
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Divider />
        <Story />
        <Quote />
        {/* Desktop'ta Quote'un arka plan görseli bölümleri zaten ayırıyor */}
        <Divider className="lg:hidden" />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  )
}
