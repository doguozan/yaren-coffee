// Figma tasarımındaki görselleri src/assets klasörüne indirir.
// Çalıştır:  npm run assets
//
// Not: Bu linkler Figma MCP'nin geçici asset linkleridir ve ~7 gün geçerlidir.
// Süresi dolduysa görselleri Figma'dan elle dışa aktar (Export → PNG/WebP)
// ve aşağıdaki dosya adlarıyla src/assets içine koy.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const desktop = 'https://www.figma.com/api/mcp/asset/49c265b9-cd87-4452-b998-20984a3e6cea'
const mobile = 'https://www.figma.com/api/mcp/asset/796df62e-1dfb-41cd-b975-5372fc3b73bf'

const assets = {
  'hero.png': `${desktop}/f2411.png`, // Hero Photo
  'turk-kahvesi.png': `${desktop}/4cf29.png`, // Card — Türk Kahvesi
  'espresso.png': `${desktop}/1d031.png`, // Card — Espresso
  'filtre-kahve.png': `${desktop}/92178.png`, // Card — Filtre Kahve
  'story.png': `${desktop}/402b1.png`, // Story Photo
  'quote-beans.png': `${desktop}/e2c74.png`, // Quote arka planı
  'icon-menu.svg': `${mobile}/a1162.svg`, // icon/menu
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets')

let failed = 0
for (const [file, url] of Object.entries(assets)) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(join(outDir, file), buf)
    console.log(`✓ ${file} (${Math.round(buf.length / 1024)} KB)`)
  } catch (err) {
    failed++
    console.error(`✗ ${file}: ${err.message}`)
  }
}

if (failed) {
  console.error(
    `\n${failed} görsel indirilemedi. Figma'dan elle export edip src/assets içine koyabilirsin.`,
  )
  process.exit(1)
}
console.log('\nTüm görseller indirildi.')
