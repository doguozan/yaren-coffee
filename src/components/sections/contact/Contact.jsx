/** İletişim bölümü: solda iletişim bilgileri, sağda form; gönderim sonrası teşekkür modalı açılır. */
import { useState } from 'react'

import { ContactForm } from './ContactForm.jsx'
import { ContactInfo } from './ContactInfo.jsx'
import { ContactSuccessModal } from './ContactSuccessModal.jsx'

export function Contact() {
  // İsim ayrı tutuluyor: modal kapanırken başlık "Teşekkürler, !" diye boşalmasın
  const [senderFirstName, setSenderFirstName] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  function handleSubmitSuccess(firstName) {
    setSenderFirstName(firstName)
    setIsSuccessModalOpen(true)
  }

  function handleSuccessModalClose() {
    setIsSuccessModalOpen(false)
  }

  return (
    <section id="iletisim" className="px-5 py-20 md:px-10 lg:px-[60px] lg:py-[120px] xl:px-[162px]">
      {/* Mobil/tablette bilgi ve form alt alta; desktop'ta yan yana iki sütun */}
      <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
        <ContactInfo />

        <div className="flex-1">
          <ContactForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </div>

      <ContactSuccessModal
        isOpen={isSuccessModalOpen}
        name={senderFirstName}
        onClose={handleSuccessModalClose}
      />
    </section>
  )
}
