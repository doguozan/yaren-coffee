/** Alıntı bölümü: mobilde Türk sözü, desktop'ta kahve çekirdekli arka planda marka sloganı. */
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
    <section aria-label="Alıntı" className="relative overflow-hidden">
      {/* Mobil/tablet: arka plan görseli dar ekranda metni boğduğu için düz zemin */}
      <div className="flex flex-col items-center gap-12 px-5 pb-20 md:px-10 lg:hidden">
        <figure className="flex flex-col items-center gap-5">
          <blockquote className="max-w-[640px] text-center font-serif text-[28px] leading-[1.25] tracking-[-0.01em] text-brown md:text-[34px]">
            “Gönül ne kahve ister ne kahvehane; gönül sohbet ister, kahve bahane.”
          </blockquote>
          <figcaption className="text-[13px] leading-none tracking-[0.14em] text-muted uppercase">
            Türk sözü
          </figcaption>
        </figure>
        <ShareHashtag />
      </div>

      <div className="relative hidden h-[425px] flex-col items-center justify-center gap-12 px-10 py-[120px] lg:flex xl:px-[162px]">
        {/* Dekoratif arka plan; ekran okuyucular atlasın */}
        <img
          src={quoteBackgroundImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <blockquote className="relative w-full max-w-[860px] text-center font-serif text-[44px] leading-[1.25] tracking-[-0.01em] text-brown">
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
