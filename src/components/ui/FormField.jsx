/** Etiket, giriş alanı ve hata mesajını erişilebilir şekilde birbirine bağlayan form alanı. */
import { useId } from 'react'

const FIELD_BASE_CLASSES = [
  'w-full rounded-[6px] border bg-white px-4 py-[14px]',
  'font-sans text-[16px] leading-[1.7] text-brown-text placeholder:text-placeholder',
  'outline-none transition-colors focus:border-brown',
].join(' ')

export function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  autoComplete,
  inputMode,
  className = '',
}) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  const hasError = Boolean(error)
  const borderClasses = hasError ? 'border-[#a3412a]' : 'border-line-strong'

  // input ve textarea aynı erişilebilirlik bağlantılarını paylaşıyor
  const sharedFieldProps = {
    id: fieldId,
    name,
    placeholder,
    value,
    onChange: (event) => onChange(event.target.value),
    'aria-invalid': hasError,
    'aria-describedby': hasError ? errorId : undefined,
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={fieldId}
        className="text-[13px] leading-none font-medium tracking-[0.04em] text-brown"
      >
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...sharedFieldProps}
          className={`${FIELD_BASE_CLASSES} ${borderClasses} h-[150px] resize-none`}
        />
      ) : (
        <input
          {...sharedFieldProps}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={`${FIELD_BASE_CLASSES} ${borderClasses} h-[52px] py-0`}
        />
      )}

      {hasError && (
        <p id={errorId} className="text-[12px] leading-[1.5] text-[#a3412a]">
          {error}
        </p>
      )}
    </div>
  )
}
