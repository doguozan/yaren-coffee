/** Sayfadaki tüm butonların ortak görünümü: aynı stil hem <a> hem <button> için kullanılır. */

const BASE_CLASSES = [
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full',
  'font-sans text-[15px] font-medium leading-none tracking-[0.02em]',
  'transition-colors duration-200',
].join(' ')

const VARIANT_CLASSES = {
  dark: 'bg-brown text-cream hover:bg-[#3d2a20]',
  olive: 'bg-olive text-cream hover:bg-[#4f5a30]',
  line: 'border border-brown text-brown hover:bg-brown hover:text-cream',
}

// En küçük boyut bile 44px: dokunmatik ekranlarda rahat tıklanabilsin diye
const SIZE_CLASSES = {
  default: 'h-[52px] px-7',
  small: 'h-11 px-[22px]',
  compact: 'h-12 px-4',
}

function getButtonClasses({ variant = 'dark', size = 'default', className = '' }) {
  return `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`
}

/** Sayfa içi bağlantılar (#kahveler gibi) için buton görünümlü link. */
export function LinkButton({ variant, size, className, children, ...anchorProps }) {
  return (
    <a className={getButtonClasses({ variant, size, className })} {...anchorProps}>
      {children}
    </a>
  )
}

export function Button({ variant, size, className, children, type = 'button', ...buttonProps }) {
  return (
    <button type={type} className={getButtonClasses({ variant, size, className })} {...buttonProps}>
      {children}
    </button>
  )
}
