/** Hikâyemiz bölümü: markanın anlamını anlatan metin, cezve fotoğrafı ve üç adımlık felsefe. */
import { SectionHeading } from '../ui/SectionHeading.jsx'

import storyImage from '../../assets/story.png'
import { storySteps } from '../../data/content.js'

// Mobil/tablette fotoğraf tam genişlik ve metnin üstünde; desktop'ta solda sabit genişlikli sütun
const STORY_IMAGE_CLASSES = [
  'h-[438px] w-full shrink-0 rounded-[6px] bg-cream-2 object-cover md:h-[520px]',
  'lg:h-[638px] lg:w-[42%] xl:w-[510px]',
].join(' ')

export function Story() {
  return (
    <section id="hikayemiz" className="px-5 py-20 md:px-10 lg:px-[60px] lg:py-[120px]">
      <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-14 xl:gap-24">
        <img
          src={storyImage}
          alt="Kahve çekirdekleri arasında bakır cezve"
          loading="lazy"
          className={STORY_IMAGE_CLASSES}
        />

        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-7">
            <SectionHeading eyebrow="Hikâyemiz" title="Cezveden demliğe, aynı masa" />
            <p className="text-[17px] leading-[1.75] text-brown-text">
              Yâren, “dost, yakın arkadaş” demek. Kahveyi de böyle görüyoruz: insanları aynı masaya
              toplayan bir bahane. Türk kahvesinin köklü ritüelini espresso ve modern demleme
              kültürüyle aynı menüde buluşturuyoruz.
            </p>
          </div>

          <ol className="flex flex-col border-b border-line">
            {storySteps.map((step) => (
              <li
                key={step.number}
                className="flex items-start gap-2 border-t border-line py-[18px]"
              >
                <span className="w-12 shrink-0 font-serif text-[18px] leading-[1.6] text-olive italic">
                  {step.number}
                </span>
                <p className="flex-1 text-[15px] leading-[1.65] text-brown-text">
                  <strong className="font-medium text-brown">{step.title}</strong> {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
