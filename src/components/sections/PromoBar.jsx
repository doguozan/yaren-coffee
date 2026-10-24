/** Sayfanın en üstündeki zeytin yeşili kampanya şeridi ve indirim kodu. */

export function PromoBar() {
  return (
    // Mobilde metin iki satıra kırılıp kod alta iniyor; desktop'ta hepsi tek satır
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-olive px-5 py-2 text-center text-[13px] leading-[1.3] text-cream lg:h-10 lg:flex-nowrap lg:gap-3 lg:py-1.5">
      <p className="max-w-[300px] tracking-[0.04em] lg:max-w-none">
        Sosyal medyadan gelenlere özel · İlk siparişte %15 indirim · Kod:
      </p>
      <p className="font-bold tracking-[0.1em]">YAREN15</p>
    </div>
  )
}
