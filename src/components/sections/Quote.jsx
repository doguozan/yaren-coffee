/** Alıntı bölümü: kahve çekirdekli arka planda marka sloganı. */
import quoteBackgroundImage from '../../assets/quote-beans.png'

/** Her iki düzende de alıntının altında yer alan paylaşım çağrısı. */
function ShareHashtag() {
  return (
    <p className="text-center text-[16px] leading-[1.7] text-brown-text">
      Fincanını paylaş, bizi etiketle:{' '}
      <span className="font-serif text-[20px] leading-[1.3] text-olive italic">#YârenHikâyesi</span>
    </p>
  )
}

export function Quote() {
  return (
    <section aria-label="Alıntı" className="relative overflow-hidden lg:h-[425px]">
      <img
        src={quoteBackgroundImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-cream/60 lg:hidden" />
      <div className="relative flex flex-col items-center justify-center gap-12 px-5 py-20 md:px-10 lg:h-[425px] lg:px-10 lg:py-[120px] xl:px-[162px]">
        <blockquote className="relative w-full max-w-[860px] text-center font-serif text-[28px] leading-[1.25] tracking-[-0.01em] text-brown md:text-[36px] lg:text-[44px]">
          Eski usul yarenlik,
          <br />
          yeni usul kahve.
        </blockquote>
        <div className="relative">
          <ShareHashtag />
        </div>
      </div>
    </section>
  )
}
