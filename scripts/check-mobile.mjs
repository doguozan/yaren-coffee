/**
 * Mobil / tablet / desktop görünümünü gerçek bir tarayıcıda (Playwright + Chromium) kontrol eder.
 *
 *   npm run test:mobile
 *
 * Önce siteyi derler ve `vite preview` ile ayağa kaldırır, her genişlikte otomatik kontrolleri
 * çalıştırır, scripts/screenshots/ altına ekran görüntüsü kaydeder ve sonunda sunucuyu kapatır.
 * Herhangi bir kontrol başarısızsa çıkış kodu 1 olur.
 */
import { execSync, spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SCREENSHOT_DIR = join(PROJECT_ROOT, 'scripts', 'screenshots')

const PREVIEW_PORT = 4173
const BASE_URL = `http://localhost:${PREVIEW_PORT}/`

const VIEWPORT_WIDTHS = [320, 375, 390, 768, 1024, 1440]
const VIEWPORT_HEIGHT = 844
const INTERACTION_WIDTH = 390

// Tailwind kırılımları: md = 768, lg = 1024
const MAX_MOBILE_WIDTH = 768
const LG_BREAKPOINT = 1024

const MIN_TOUCH_TARGET_SIZE = 44
const MIN_FORM_FONT_SIZE = 16
const MAX_REPORTED_ELEMENTS = 10

const SELECTORS = {
  hamburgerButton: 'button[aria-controls="mobile-menu"]',
  mobileMenu: '#mobile-menu',
  desktopNavLinks: 'nav[aria-label="Ana menü"] > div',
  stickyCtaBar: 'div.fixed.bottom-0',
  sliderNextArrow: 'button[aria-label="Sonraki kahveler"]',
  backToTopLink: 'footer a[href="#top"]',
  submitButton: 'form button[type="submit"]',
  fieldError: 'form p[id$="-error"]',
  successDialog: 'dialog',
}

// ---------------------------------------------------------------- Sunucu

function buildSite() {
  console.log('▸ npm run build')
  execSync('npm run build', { cwd: PROJECT_ROOT, stdio: 'ignore' })
}

/** `npx vite preview` ile aynı komut; shell olmadan başlatıldığı için kill() alt süreci de kapatır. */
function startPreviewServer() {
  console.log(`▸ vite preview --port ${PREVIEW_PORT}`)
  const viteBin = join(PROJECT_ROOT, 'node_modules', 'vite', 'bin', 'vite.js')

  return spawn(process.execPath, [viteBin, 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    cwd: PROJECT_ROOT,
    stdio: 'ignore',
  })
}

async function waitForServer(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Sunucu henüz dinlemiyor; biraz bekleyip tekrar dene
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Önizleme sunucusu ${timeoutMs}ms içinde açılmadı: ${url}`)
}

// ---------------------------------------------------------------- Yardımcılar

/** Her kontrol { name, passed, details } olarak toplanır; özet bunlardan üretilir. */
function createCheckList() {
  const checks = []

  return {
    checks,
    add(name, passed, details = []) {
      checks.push({ name, passed, details })
    },
  }
}

async function openPage(browser, width) {
  const isMobileWidth = width <= MAX_MOBILE_WIDTH
  const context = await browser.newContext({
    viewport: { width, height: VIEWPORT_HEIGHT },
    isMobile: isMobileWidth,
    hasTouch: isMobileWidth,
    deviceScaleFactor: isMobileWidth ? 2 : 1,
  })
  const page = await context.newPage()

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  return { context, page }
}

/** loading="lazy" görseller ekran görüntüsünde boş kalmasın diye sayfayı baştan sona gezer. */
async function loadLazyImages(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2

    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    await Promise.all(
      [...document.images].map((image) => (image.complete ? null : image.decode().catch(() => null))),
    )
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
}

/** Smooth scroll bitene kadar (scrollY iki ölçümde aynı kalana kadar) bekler. */
async function waitForScrollToSettle(page) {
  await page.evaluate(async () => {
    let previousY = -1
    let stableFrames = 0

    while (stableFrames < 5) {
      await new Promise((resolve) => requestAnimationFrame(resolve))
      stableFrames = window.scrollY === previousY ? stableFrames + 1 : 0
      previousY = window.scrollY
    }
  })
}

function rectanglesOverlap(first, second) {
  return (
    first.left < second.right &&
    second.left < first.right &&
    first.top < second.bottom &&
    second.top < first.bottom
  )
}

// ---------------------------------------------------------------- Genişlik bazlı kontroller

async function checkHorizontalOverflow(page, width, report) {
  const result = await page.evaluate(
    ({ viewportWidth, maxReported }) => {
      function describe(element) {
        const id = element.id ? `#${element.id}` : ''
        const classes = element.classList.length ? `.${[...element.classList].join('.')}` : ''
        return `${element.tagName.toLowerCase()}${id}${classes}`.slice(0, 140)
      }

      // overflow:hidden/clip olan bir atanın içinde kalan öğe sayfayı taşırmaz (ör. Swiper slaytları)
      function isClippedByAncestor(element) {
        for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
          if (ancestor === document.body || ancestor === document.documentElement) return false
          const { overflowX } = getComputedStyle(ancestor)
          if (overflowX !== 'visible') return true
        }
        return false
      }

      const scrollWidth = document.documentElement.scrollWidth
      const offenders = [...document.body.querySelectorAll('*')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.width > 0 && rect.right > viewportWidth + 0.5 && !isClippedByAncestor(element)
        })
        .slice(0, maxReported)
        .map((element) => `${describe(element)} → right: ${Math.round(element.getBoundingClientRect().right)}px`)

      return { scrollWidth, offenders }
    },
    { viewportWidth: width, maxReported: MAX_REPORTED_ELEMENTS },
  )

  const hasOverflow = result.scrollWidth > width
  report.add(
    `Yatay taşma yok (scrollWidth ${result.scrollWidth} ≤ ${width})`,
    !hasOverflow,
    hasOverflow ? result.offenders : [],
  )
}

async function checkTouchTargets(page, report) {
  const smallTargets = await page.evaluate(
    ({ minSize, maxReported }) => {
      return [...document.querySelectorAll('button, a, input')]
        .filter((element) => element.checkVisibility({ visibilityProperty: true }))
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width > 0 && (rect.width < minSize || rect.height < minSize))
        .slice(0, maxReported)
        .map(({ element, rect }) => {
          const label = (element.getAttribute('aria-label') || element.textContent || element.name || '')
            .trim()
            .slice(0, 40)
          return `<${element.tagName.toLowerCase()}> "${label}" ${Math.round(rect.width)}×${Math.round(rect.height)}px`
        })
    },
    { minSize: MIN_TOUCH_TARGET_SIZE, maxReported: MAX_REPORTED_ELEMENTS },
  )

  report.add(`Dokunmatik hedefler ≥ ${MIN_TOUCH_TARGET_SIZE}×${MIN_TOUCH_TARGET_SIZE}px`, smallTargets.length === 0, smallTargets)
}

async function checkFormFontSizes(page, report) {
  const smallFields = await page.evaluate((minFontSize) => {
    return [...document.querySelectorAll('input, textarea, select')]
      .map((field) => ({ field, fontSize: parseFloat(getComputedStyle(field).fontSize) }))
      .filter(({ fontSize }) => fontSize < minFontSize)
      .map(({ field, fontSize }) => `${field.tagName.toLowerCase()}[name="${field.name}"] ${fontSize}px`)
  }, MIN_FORM_FONT_SIZE)

  report.add(`Form alanı yazı boyutu ≥ ${MIN_FORM_FONT_SIZE}px`, smallFields.length === 0, smallFields)
}

async function checkResponsiveVisibility(page, width, report) {
  const isBelowLg = width < LG_BREAKPOINT

  const visibility = await page.evaluate((selectors) => {
    function isVisible(selector) {
      const element = document.querySelector(selector)
      return Boolean(element?.checkVisibility({ visibilityProperty: true }))
    }

    // Desktop'ta oklar fare gelene kadar opacity-0; "görünür" = display/visibility ile gizli değil
    function isArrowRendered(selector) {
      const element = document.querySelector(selector)
      return Boolean(element) && getComputedStyle(element).display !== 'none'
    }

    return {
      'Hamburger buton': isVisible(selectors.hamburgerButton),
      'Sabit CTA çubuğu': isVisible(selectors.stickyCtaBar),
      'Desktop nav linkleri': isVisible(selectors.desktopNavLinks),
      'Slider okları': isArrowRendered(selectors.sliderNextArrow),
    }
  }, SELECTORS)

  const expectedVisibility = {
    'Hamburger buton': isBelowLg,
    'Sabit CTA çubuğu': isBelowLg,
    'Desktop nav linkleri': !isBelowLg,
    'Slider okları': !isBelowLg,
  }

  for (const [elementName, shouldBeVisible] of Object.entries(expectedVisibility)) {
    const isActuallyVisible = visibility[elementName]
    report.add(
      `${elementName} ${shouldBeVisible ? 'görünür' : 'gizli'}`,
      isActuallyVisible === shouldBeVisible,
      isActuallyVisible === shouldBeVisible ? [] : [`beklenen: ${shouldBeVisible ? 'görünür' : 'gizli'}`],
    )
  }
}

async function runWidthChecks(browser, width) {
  const report = createCheckList()
  const { context, page } = await openPage(browser, width)

  await loadLazyImages(page)
  await checkHorizontalOverflow(page, width, report)
  await page.screenshot({ path: join(SCREENSHOT_DIR, `${width}.png`), fullPage: true })

  if (width < LG_BREAKPOINT) {
    await checkTouchTargets(page, report)
  }
  await checkFormFontSizes(page, report)
  await checkResponsiveVisibility(page, width, report)

  await context.close()
  return report.checks
}

// ---------------------------------------------------------------- Etkileşim testleri (390px)

async function testMobileMenu(page, report) {
  await page.click(SELECTORS.hamburgerButton)
  const isMenuVisible = await page.locator(SELECTORS.mobileMenu).isVisible()
  report.add('Hamburger menü açılıyor', isMenuVisible)
  if (!isMenuVisible) return

  const menuLink = page.locator(`${SELECTORS.mobileMenu} a`).first()
  const targetHash = await menuLink.getAttribute('href')
  await menuLink.click()
  await waitForScrollToSettle(page)

  const isMenuClosed = (await page.locator(SELECTORS.mobileMenu).count()) === 0
  report.add('Linke tıklayınca menü kapanıyor', isMenuClosed)

  const targetTop = await page.evaluate(
    (hash) => document.querySelector(hash)?.getBoundingClientRect().top ?? null,
    targetHash,
  )
  const isScrolledToTarget = targetTop !== null && targetTop >= -2 && targetTop < VIEWPORT_HEIGHT / 3
  report.add(`${targetHash} bölümüne kaydırıyor`, isScrolledToTarget, [
    `bölümün üst kenarı: ${Math.round(targetTop)}px`,
  ])
}

/** Chromium'a CDP üzerinden gerçek dokunma olayları gönderir (Swiper pointer olaylarını dinliyor). */
async function swipeHorizontally(page, { startX, endX, y, steps = 10 }) {
  const cdp = await page.context().newCDPSession(page)
  const touchPoint = (x) => [{ x, y, id: 1 }]

  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: touchPoint(startX) })
  for (let step = 1; step <= steps; step++) {
    const x = startX + ((endX - startX) * step) / steps
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: touchPoint(x) })
    await page.waitForTimeout(16)
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await cdp.detach()

  // Swiper'ın geçiş animasyonu (varsayılan 300ms) bitsin
  await page.waitForTimeout(500)
}

async function testSliderSwipe(page, report) {
  const swiperElement = page.locator('.swiper').first()
  await swiperElement.scrollIntoViewIfNeeded()

  const readSliderState = () =>
    page.evaluate(() => {
      const swiper = document.querySelector('.swiper').swiper
      const nextSlide = swiper.slides[swiper.activeIndex + 1]
      const nextSlideLeft = nextSlide ? nextSlide.getBoundingClientRect().left : Infinity

      return { activeIndex: swiper.activeIndex, nextSlideLeft, viewportWidth: window.innerWidth }
    })

  const before = await readSliderState()
  const isNextCardPeeking = before.nextSlideLeft < before.viewportWidth
  report.add('Bir sonraki kartın kenarı görünüyor', isNextCardPeeking, [
    `sonraki kartın sol kenarı: ${Math.round(before.nextSlideLeft)}px`,
  ])

  const box = await swiperElement.boundingBox()
  const swipeY = box.y + Math.min(box.height / 2, 130)
  await swipeHorizontally(page, { startX: box.x + box.width * 0.8, endX: box.x + box.width * 0.2, y: swipeY })

  const after = await readSliderState()
  report.add('Parmakla kaydırınca aktif slide değişiyor', after.activeIndex > before.activeIndex, [
    `activeIndex: ${before.activeIndex} → ${after.activeIndex}`,
  ])
}

async function testStickyCtaDoesNotCoverFooter(page, report) {
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await waitForScrollToSettle(page)

  const rects = await page.evaluate((selectors) => {
    const toPlainRect = (element) => {
      const { top, right, bottom, left } = element.getBoundingClientRect()
      return { top, right, bottom, left }
    }

    return {
      ctaBar: toPlainRect(document.querySelector(selectors.stickyCtaBar)),
      backToTop: toPlainRect(document.querySelector(selectors.backToTopLink)),
    }
  }, SELECTORS)

  const isCovered = rectanglesOverlap(rects.ctaBar, rects.backToTop)
  report.add('Sabit CTA çubuğu "Başa dön" linkini kapatmıyor', !isCovered, [
    `CTA üst: ${Math.round(rects.ctaBar.top)}px, "Başa dön" alt: ${Math.round(rects.backToTop.bottom)}px`,
  ])
}

async function testEmptyFormSubmit(page, report) {
  await page.locator(SELECTORS.submitButton).click()
  const errorCount = await page.locator(SELECTORS.fieldError).count()
  report.add('Boş form gönderilince 3 hata mesajı çıkıyor', errorCount === 3, [`hata sayısı: ${errorCount}`])
}

async function testSuccessModal(page, report) {
  await page.fill('input[name="name"]', 'Doğu Malcok')
  await page.fill('input[name="email"]', 'dogu@ornek.com')
  await page.fill('textarea[name="message"]', 'Merhaba, toptan sipariş hakkında bilgi almak istiyorum.')
  await page.locator(SELECTORS.submitButton).click()

  const dialog = page.locator(SELECTORS.successDialog)
  const isModalOpen = await dialog.evaluate((element) => element.open && element.matches(':modal'))
  report.add('Modal açılıyor (showModal)', isModalOpen)
  if (!isModalOpen) return

  // Giriş animasyonu (200ms) bitsin ki ölçüm ve ekran görüntüsü son hâli yansıtsın
  await page.waitForTimeout(300)

  const title = (await dialog.locator('h2').textContent()).trim()
  report.add('Başlık "Teşekkürler, Doğu!"', title === 'Teşekkürler, Doğu!', [`başlık: "${title}"`])

  const fit = await dialog.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height,
      fitsHorizontally: rect.left >= 0 && rect.right <= window.innerWidth && rect.width < window.innerWidth,
      fitsVertically: rect.top >= 0 && rect.bottom <= window.innerHeight,
    }
  })
  report.add('Modal ekrana sığıyor', fit.fitsHorizontally && fit.fitsVertically, [
    `modal: ${Math.round(fit.width)}×${Math.round(fit.height)}px`,
  ])

  await page.screenshot({ path: join(SCREENSHOT_DIR, `${INTERACTION_WIDTH}-modal.png`) })

  await page.keyboard.press('Escape')
  const isClosedAfterEscape = await dialog.evaluate((element) => !element.open)
  report.add('Escape ile kapanıyor', isClosedAfterEscape)
}

async function runInteractionTests(browser) {
  const report = createCheckList()
  const interactionTests = [
    testMobileMenu,
    testSliderSwipe,
    testStickyCtaDoesNotCoverFooter,
    testEmptyFormSubmit,
    testSuccessModal,
  ]

  // Testler birbirini etkilemesin (açık menü, scroll konumu, form durumu) diye her biri temiz sayfada
  for (const interactionTest of interactionTests) {
    const { context, page } = await openPage(browser, INTERACTION_WIDTH)
    try {
      await interactionTest(page, report)
    } catch (error) {
      report.add(`${interactionTest.name} çalıştırılamadı`, false, [error.message.split('\n')[0]])
    }
    await context.close()
  }

  return report.checks
}

// ---------------------------------------------------------------- Rapor

function printChecks(title, checks) {
  const failedCount = checks.filter((check) => !check.passed).length
  console.log(`\n${failedCount === 0 ? '✓' : '✗'} ${title}`)

  for (const check of checks) {
    console.log(`   ${check.passed ? '✓' : '✗'} ${check.name}`)
    if (!check.passed) {
      for (const detail of check.details) console.log(`       · ${detail}`)
    }
  }

  return failedCount
}

async function main() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true })
  buildSite()

  const previewServer = startPreviewServer()
  let browser

  try {
    await waitForServer(BASE_URL)
    browser = await chromium.launch()

    let totalFailed = 0
    for (const width of VIEWPORT_WIDTHS) {
      totalFailed += printChecks(`${width}px`, await runWidthChecks(browser, width))
    }
    totalFailed += printChecks(`Etkileşim testleri (${INTERACTION_WIDTH}px)`, await runInteractionTests(browser))

    console.log(totalFailed === 0 ? '\nTüm kontroller geçti ✓' : `\n${totalFailed} kontrol başarısız ✗`)
    console.log(`Ekran görüntüleri: ${SCREENSHOT_DIR}`)
    process.exitCode = totalFailed === 0 ? 0 : 1
  } finally {
    await browser?.close()
    previewServer.kill()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
