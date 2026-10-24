/** Tek bir kahvenin kartı: görsel, ad + fiyat, açıklama ve boyut/seçenek bilgisi. */

export function ProductCard({ product }) {
  return (
    <article className="flex flex-col gap-5">
      {/* Fotoğrafların oranı farklı; sabit yükseklik + object-cover ile slider'daki tüm kartlar hizalı */}
      <img
        src={product.image}
        alt={product.imageAlt}
        loading="lazy"
        className="h-[259px] w-full rounded-[6px] bg-cream-2 object-cover"
      />
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3.5 font-serif leading-[1.2] text-brown">
        <h3 className="text-[28px]">{product.title}</h3>
        <p className="text-[24px]">{product.price}</p>
      </div>
      <p className="text-[15px] leading-[1.65] text-brown-text">{product.description}</p>
      <p className="text-[13px] leading-[1.5] tracking-[0.04em] text-olive">{product.meta}</p>
    </article>
  )
}
