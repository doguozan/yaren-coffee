/** Form başarıyla gönderildikten sonra açılan teşekkür modalı (native <dialog> + showModal). */
import { useEffect, useRef } from 'react'

import { Button } from '../../ui/Button.jsx'

const TITLE_ID = 'contact-success-title'
const DESCRIPTION_ID = 'contact-success-description'

export function ContactSuccessModal({ isOpen, name, onClose }) {
  const dialogRef = useRef(null)
  const newMessageButtonRef = useRef(null)

  // `open` attribute'u yerine showModal(): backdrop, focus trap ve Escape ancak böyle çalışır
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
      newMessageButtonRef.current?.focus()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  // Modal açıkken arkadaki sayfa kaymasın; kapanınca eski değer geri gelsin
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Dialog'un padding'i 0 olduğu için hedef dialog'un kendisiyse tıklama backdrop'a yapılmıştır
  function handleDialogClick(event) {
    if (event.target === dialogRef.current) {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleDialogClick}
      aria-labelledby={TITLE_ID}
      aria-describedby={DESCRIPTION_ID}
      className="m-auto w-[calc(100%-32px)] max-w-[667px] rounded-[6px] border-0 bg-cream p-0 shadow-xl backdrop:bg-brown/40 backdrop:backdrop-blur-sm open:animate-[modal-in_200ms_ease-out] motion-reduce:animate-none"
    >
      <div className="p-6 md:p-10">
        <div className="flex flex-col items-start gap-4 border-y border-line py-10">
          <p className="eyebrow">Mesajın alındı</p>
          <h2
            id={TITLE_ID}
            className="font-serif text-[28px] leading-[1.2] text-brown md:text-[34px]"
          >
            Teşekkürler, {name}!
          </h2>
          <p
            id={DESCRIPTION_ID}
            className="max-w-[440px] text-[16px] leading-[1.7] text-brown-text"
          >
            Mesajın bize ulaştı. Kahveni demlerken biz de sana en kısa sürede dönüş yapacağız.
          </p>
          <Button ref={newMessageButtonRef} variant="line" onClick={onClose}>
            Yeni mesaj gönder
          </Button>
        </div>
      </div>
    </dialog>
  )
}
