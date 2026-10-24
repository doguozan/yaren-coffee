/** Bölümler arasındaki ince yatay çizgi. */

export function Divider({ className = '' }) {
  return <hr className={`h-px border-0 bg-line ${className}`} />
}
