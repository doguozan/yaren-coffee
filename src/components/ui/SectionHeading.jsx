/** Bölümlerin başındaki küçük üst başlık (eyebrow) + h2 ikilisi; Menü, Hikâye ve İletişim'de ortak. */

export function SectionHeading({ eyebrow, title, titleClassName = '' }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`h2 ${titleClassName}`}>{title}</h2>
    </div>
  )
}
