/** Hero'nun altındaki üç marka değeri; dar ekranda alt alta, tablet ve üstünde yan yana. */
import { brandValues } from '../../../data/content.js'

// İlk öğenin solunda çizgi olmaz; diğerleri yan yana dizilince sol çizgiyle ayrılır
const FIRST_VALUE_CLASSES = 'md:pr-6 lg:pr-8'
const OTHER_VALUE_CLASSES = 'border-t border-line md:border-l md:border-t-0 md:px-6 lg:px-8'

export function HeroValues() {
  return (
    <div className="px-5 md:px-10 lg:border-b lg:border-line lg:px-[60px]">
      <ul className="flex flex-col border-b border-line md:flex-row lg:h-[157px] lg:border-b-0">
        {brandValues.map((value, index) => {
          const positionClasses = index === 0 ? FIRST_VALUE_CLASSES : OTHER_VALUE_CLASSES

          return (
            <li
              key={value.title}
              className={`flex flex-col gap-2 py-6 md:flex-1 md:py-8 lg:py-9 ${positionClasses}`}
            >
              <h3 className="font-serif text-[21px] leading-[1.3] text-brown">{value.title}</h3>
              <p className="text-[15px] leading-[1.65] text-muted">{value.body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
