/** Ad, e-posta ve mesaj alanlarından oluşan, gönderimden önce doğrulama yapan iletişim formu. */
import { useState } from 'react'

import { Button } from '../../ui/Button.jsx'
import { FormField } from '../../ui/FormField.jsx'

const EMPTY_FORM_VALUES = { name: '', email: '', message: '' }

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

const MIN_MESSAGE_LENGTH = 10

/** Hatalı alanları { alanAdı: mesaj } şeklinde döndürür; boş nesne = form geçerli. */
function validateContactForm(formValues) {
  const validationErrors = {}

  if (!formValues.name.trim()) {
    validationErrors.name = 'Adını yazar mısın?'
  }

  // Kopyala-yapıştırla gelen baş/son boşluklar adresi geçersiz göstermesin
  const trimmedEmail = formValues.email.trim()
  if (!trimmedEmail) {
    validationErrors.email = 'E-posta adresin gerekli.'
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    validationErrors.email = 'Geçerli bir e-posta gir.'
  }

  if (formValues.message.trim().length < MIN_MESSAGE_LENGTH) {
    validationErrors.message = `Mesajın en az ${MIN_MESSAGE_LENGTH} karakter olmalı.`
  }

  return validationErrors
}

export function ContactForm({ onSubmitSuccess }) {
  const [formValues, setFormValues] = useState(EMPTY_FORM_VALUES)
  const [fieldErrors, setFieldErrors] = useState({})

  // Her alan için ayrı onChange üretir; kullanıcı yazmaya başlayınca o alanın hatası silinir
  function handleFieldChange(fieldName) {
    return (fieldValue) => {
      setFormValues((previousValues) => ({ ...previousValues, [fieldName]: fieldValue }))

      if (fieldErrors[fieldName]) {
        setFieldErrors((previousErrors) => ({ ...previousErrors, [fieldName]: undefined }))
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateContactForm(formValues)
    const hasErrors = Object.keys(validationErrors).length > 0
    setFieldErrors(validationErrors)
    if (hasErrors) return

    // TODO: burada gerçek bir API'ye (ör. Express endpoint'i) POST atılabilir.
    const senderFirstName = formValues.name.trim().split(' ')[0]
    setFormValues(EMPTY_FORM_VALUES)
    onSubmitSuccess(senderFirstName)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-7">
      {/* Ad ve e-posta tablette yan yana sığıyor; mobilde alt alta */}
      <div className="flex flex-col gap-7 md:flex-row">
        <FormField
          className="md:flex-1"
          label="Ad Soyad"
          name="name"
          placeholder="Adın ve soyadın"
          autoComplete="name"
          value={formValues.name}
          onChange={handleFieldChange('name')}
          error={fieldErrors.name}
        />
        <FormField
          className="md:flex-1"
          label="E-posta"
          name="email"
          type="email"
          inputMode="email"
          placeholder="ornek@alanadi.com"
          autoComplete="email"
          value={formValues.email}
          onChange={handleFieldChange('email')}
          error={fieldErrors.email}
        />
      </div>

      <FormField
        label="Mesajın"
        name="message"
        type="textarea"
        placeholder="Bize ne anlatmak istersin?"
        value={formValues.message}
        onChange={handleFieldChange('message')}
        error={fieldErrors.message}
      />

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[280px] text-[12px] leading-[1.5] text-muted">
          Bilgilerin yalnızca sana dönüş yapmak için kullanılır.
        </p>
        <Button type="submit">Mesajı Gönder</Button>
      </div>
    </form>
  )
}
