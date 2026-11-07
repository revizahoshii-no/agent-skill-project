import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = normalize(join(fileURLToPath(new URL('.', import.meta.url)), '..'))
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://127.0.0.1')
    let pathname = decodeURIComponent(url.pathname)
    if (pathname === '/') pathname = '/docs/'
    let file = normalize(join(root, pathname))
    if (!file.startsWith(root)) throw new Error('Path outside root')
    const info = await stat(file)
    if (info.isDirectory()) file = join(file, 'index.html')
    const body = await readFile(file)
    response.writeHead(200, { 'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream' })
    response.end(body)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const address = server.address()
const base = `http://127.0.0.1:${address.port}`
const browser = await chromium.launch({ headless: true })
const jobs = [
  ['/docs/', 1440, 1000],
  ['/docs/', 390, 844],
  ['/docs/examples/editorial.html', 1365, 900],
  ['/docs/examples/editorial.html', 390, 844],
  ['/docs/examples/color-systems.html', 1365, 900],
  ['/docs/examples/color-systems.html', 390, 844],
  ['/docs/examples/style-atlas.html', 1365, 900],
  ['/docs/examples/style-atlas.html', 390, 844],
  ['/docs/examples/loading-experience.html', 1365, 900],
  ['/docs/examples/loading-experience.html', 390, 844],
  ['/docs/examples/interaction-motion.html', 1365, 900],
  ['/docs/examples/interaction-motion.html', 390, 844],
  ['/docs/examples/workspace.html', 1365, 900],
  ['/docs/examples/workspace.html', 390, 844],
  ['/docs/examples/form.html', 1200, 850],
  ['/docs/examples/form.html?state=error', 390, 844],
  ['/docs/examples/article.html', 1365, 900],
  ['/docs/examples/article.html', 390, 844],
  ['/docs/examples/quality.html', 1365, 900],
  ['/docs/examples/quality.html', 390, 844],
  ['/docs/examples/knowledge.html', 1365, 900],
  ['/docs/examples/knowledge.html', 390, 844],
  ['/docs/examples/presentation.html?slide=1', 1365, 900],
  ['/docs/examples/presentation.html?slide=2', 390, 844],
  ['/docs/examples/motion.html?frame=1', 1365, 900],
  ['/docs/examples/motion.html?frame=2', 390, 844],
  ['/docs/examples/release.html', 1365, 900],
  ['/docs/examples/release.html', 390, 844]
]
const failures = []

for (const [route, width, height] of jobs) {
  const page = await browser.newPage({ viewport: { width, height } })
  const runtimeErrors = []
  page.on('pageerror', error => runtimeErrors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') runtimeErrors.push(message.text())
  })
  page.on('requestfailed', request => runtimeErrors.push(`${request.url()}: ${request.failure()?.errorText || 'failed'}`))
  const response = await page.goto(base + route, { waitUntil: 'networkidle' })
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    brokenImages: [...document.images].filter(image => image.naturalWidth === 0).length,
    unnamedImages: [...document.images].filter(image => !image.alt.trim()).length,
    title: document.title.trim(),
    skills: [...document.querySelectorAll('article.skill')].map(article => article.querySelectorAll('img').length),
    paletteCards: document.querySelectorAll('.palette-card').length,
    contrastRatios: [...document.querySelectorAll('.contrast-row b')].map(node => Number.parseFloat(node.textContent || '0')),
    referenceCards: document.querySelectorAll('.reference-card').length,
    atlasGroups: document.querySelectorAll('.atlas-group').length,
    loaderCards: document.querySelectorAll('.loader-card').length,
    progressBars: [...document.querySelectorAll('[role="progressbar"]')].map(node => ({
      min: Number.parseFloat(node.getAttribute('aria-valuemin') || ''),
      max: Number.parseFloat(node.getAttribute('aria-valuemax') || ''),
      now: Number.parseFloat(node.getAttribute('aria-valuenow') || '')
    })),
    shieldedSelection: document.querySelector('#shieldedCard') ? getComputedStyle(document.querySelector('#shieldedCard')).userSelect : '',
    copyableSelection: document.querySelector('#copyableCard') ? getComputedStyle(document.querySelector('#copyableCard')).userSelect : '',
    drawerDialogs: document.querySelectorAll('[role="dialog"][aria-modal="true"]').length
  }))
  if (!response || response.status() !== 200) failures.push(`${route} at ${width}px returned ${response?.status() || 'no response'}`)
  if (result.overflow > 0) failures.push(`${route} at ${width}px overflows by ${result.overflow}px`)
  if (result.brokenImages) failures.push(`${route} at ${width}px has ${result.brokenImages} broken images`)
  if (result.unnamedImages) failures.push(`${route} at ${width}px has ${result.unnamedImages} images without alt text`)
  if (!result.title) failures.push(`${route} at ${width}px has no document title`)
  if (route === '/docs/' && (result.skills.length !== 21 || result.skills.some(count => count < 2))) {
    failures.push(`${route} at ${width}px does not show two examples for each domain skill`)
  }
  if (route === '/docs/examples/color-systems.html' && result.paletteCards !== 24) {
    failures.push(`${route} at ${width}px does not show all 24 palette systems`)
  }
  if (route === '/docs/examples/color-systems.html' && result.contrastRatios.some(ratio => ratio < 4.5)) {
    failures.push(`${route} at ${width}px includes a documented text pair below 4.5:1`)
  }
  if (route === '/docs/examples/style-atlas.html' && (result.referenceCards !== 20 || result.atlasGroups !== 4)) {
    failures.push(`${route} at ${width}px does not show 20 references in four curated families`)
  }
  if (route === '/docs/examples/loading-experience.html' && result.loaderCards !== 12) {
    failures.push(`${route} at ${width}px does not show all 12 loading patterns`)
  }
  if (route === '/docs/examples/loading-experience.html' && result.progressBars.some(bar => !Number.isFinite(bar.now) || bar.now < bar.min || bar.now > bar.max)) {
    failures.push(`${route} at ${width}px has an invalid semantic progress value`)
  }
  if (route === '/docs/examples/interaction-motion.html' && (result.shieldedSelection !== 'none' || result.copyableSelection !== 'text')) {
    failures.push(`${route} at ${width}px does not preserve the selective text-selection policy`)
  }
  if (route === '/docs/examples/interaction-motion.html' && result.drawerDialogs !== 1) {
    failures.push(`${route} at ${width}px does not expose one semantic modal drawer`)
  }
  for (const error of runtimeErrors) failures.push(`${route} at ${width}px runtime error: ${error}`)
  await page.close()
}

const interaction = await browser.newPage({ viewport: { width: 1200, height: 850 } })
await interaction.goto(base + '/docs/examples/workspace.html', { waitUntil: 'networkidle' })
await interaction.getByRole('button', { name: 'Open' }).click()
if (await interaction.locator('[data-state="done"]:visible').count()) failures.push('Workspace filter did not hide completed items')
if ((await interaction.locator('#filterValue').textContent())?.trim() !== 'Open') failures.push('Workspace filter did not update its summary')

await interaction.goto(base + '/docs/examples/form.html', { waitUntil: 'networkidle' })
await interaction.getByRole('button', { name: 'Save brief' }).click()
if (!(await interaction.locator('#topicError').isVisible())) failures.push('Form did not expose its error state')
await interaction.locator('#topic').fill('Mobile navigation')
await interaction.getByRole('button', { name: 'Save brief' }).click()
if (!(await interaction.locator('#formMessage').isVisible())) failures.push('Form did not expose its success state')

await interaction.goto(base + '/docs/examples/presentation.html?slide=1', { waitUntil: 'networkidle' })
await interaction.getByRole('link', { name: 'Next' }).click()
await interaction.waitForURL(/slide=2/)
if (!(await interaction.getByRole('link', { name: 'Previous' }).isVisible())) failures.push('Presentation did not expose previous navigation on slide two')

await interaction.goto(base + '/docs/examples/motion.html?frame=1', { waitUntil: 'networkidle' })
await interaction.getByRole('link', { name: /next frame/ }).click()
await interaction.waitForURL(/frame=2/)
if ((await interaction.locator('#motionWord').textContent())?.trim() !== 'Pause') failures.push('Motion frame route did not update the style frame')

await interaction.goto(base + '/docs/examples/loading-experience.html', { waitUntil: 'networkidle' })
await interaction.getByRole('button', { name: 'Pause motion' }).click()
if (!(await interaction.locator('body').evaluate(node => node.classList.contains('is-paused')))) failures.push('Loading library did not pause its animated patterns')
if ((await interaction.locator('#motionToggle').textContent())?.trim() !== 'Resume motion') failures.push('Loading library pause control did not update its label')
await interaction.getByRole('button', { name: 'Replay' }).click()
if ((await interaction.locator('#replayProgress').getAttribute('data-replayed')) !== 'true') failures.push('Loading library did not replay determinate progress')

await interaction.goto(base + '/docs/examples/interaction-motion.html', { waitUntil: 'networkidle' })
await interaction.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
await interaction.waitForTimeout(120)
await interaction.evaluate(() => scrollTo(0, 0))
await interaction.waitForTimeout(180)
const upwardReveal = await interaction.locator('.hero-copy').getAttribute('data-reveal-direction')
if ((await interaction.locator('body').getAttribute('data-scroll-direction')) !== 'up' || upwardReveal !== 'up') failures.push('Interaction field did not reveal from the upward scroll direction')
await interaction.evaluate(() => {
  const target = document.querySelector('#drawer-title')
  scrollTo(0, scrollY + target.getBoundingClientRect().top)
})
await interaction.waitForTimeout(180)
if ((await interaction.locator('body').getAttribute('data-scroll-direction')) !== 'down') failures.push('Interaction field did not record downward scrolling')
const selectionPolicy = await interaction.evaluate(() => ({
  shielded: getComputedStyle(document.querySelector('#shieldedCard')).userSelect,
  copyable: getComputedStyle(document.querySelector('#copyableCard')).userSelect
}))
if (selectionPolicy.shielded !== 'none' || selectionPolicy.copyable !== 'text') failures.push('Interaction field did not preserve selective accidental-selection shielding')
await interaction.getByRole('button', { name: 'Test scroll lock' }).click()
await interaction.waitForTimeout(60)
const lockedState = await interaction.evaluate(() => ({
  locked: document.body.classList.contains('is-locked'),
  stored: Number(document.body.dataset.lockedScroll || '-1'),
  inert: document.querySelector('#pageShell').inert,
  expanded: document.querySelector('#drawerTriggerSection').getAttribute('aria-expanded'),
  active: document.activeElement?.id || ''
}))
if (!lockedState.locked || lockedState.stored <= 0 || !lockedState.inert || lockedState.expanded !== 'true' || lockedState.active !== 'drawerClose') failures.push('Interaction drawer did not establish scroll lock, inert background, and initial focus')
await interaction.keyboard.press('Shift+Tab')
if ((await interaction.evaluate(() => document.activeElement?.id)) !== 'drawerDone') failures.push('Interaction drawer did not wrap backward focus')
await interaction.keyboard.press('Tab')
if ((await interaction.evaluate(() => document.activeElement?.id)) !== 'drawerClose') failures.push('Interaction drawer did not wrap forward focus')
await interaction.keyboard.press('Escape')
await interaction.waitForTimeout(580)
const restoredState = await interaction.evaluate(() => ({
  scroll: scrollY,
  locked: document.body.classList.contains('is-locked'),
  inert: document.querySelector('#pageShell').inert,
  top: document.body.style.top,
  expanded: document.querySelector('#drawerTriggerSection').getAttribute('aria-expanded'),
  active: document.activeElement?.id || ''
}))
if (Math.abs(restoredState.scroll - lockedState.stored) > 1 || restoredState.locked || restoredState.inert || restoredState.top || restoredState.expanded !== 'false' || restoredState.active !== 'drawerTriggerSection') failures.push('Interaction drawer did not restore scroll, background behavior, and trigger focus')

await interaction.close()

const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
const reducedPage = await reducedContext.newPage()
await reducedPage.goto(base + '/docs/examples/loading-experience.html', { waitUntil: 'networkidle' })
const reducedResult = await reducedPage.evaluate(() => ({
  preference: matchMedia('(prefers-reduced-motion: reduce)').matches,
  longAnimations: document.getAnimations().filter(animation => Number(animation.effect?.getTiming().duration || 0) > 1).length,
  status: document.querySelector('#progressStatus')?.textContent?.trim() || '',
  progress: document.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow') || ''
}))
if (!reducedResult.preference) failures.push('Loading library did not receive the reduced-motion preference')
if (reducedResult.longAnimations) failures.push(`Loading library kept ${reducedResult.longAnimations} long animations under reduced motion`)
if (!reducedResult.status || reducedResult.progress !== '72') failures.push('Loading library lost progress meaning under reduced motion')
await reducedPage.goto(base + '/docs/examples/interaction-motion.html', { waitUntil: 'networkidle' })
const reducedMotionResult = await reducedPage.evaluate(() => ({
  preference: matchMedia('(prefers-reduced-motion: reduce)').matches,
  longAnimations: document.getAnimations().filter(animation => Number(animation.effect?.getTiming().duration || 0) > 1).length,
  hiddenReveals: [...document.querySelectorAll('.reveal')].filter(element => getComputedStyle(element).opacity === '0').length,
  shielded: getComputedStyle(document.querySelector('#shieldedCard')).userSelect,
  copyable: getComputedStyle(document.querySelector('#copyableCard')).userSelect
}))
if (!reducedMotionResult.preference || reducedMotionResult.longAnimations || reducedMotionResult.hiddenReveals) failures.push('Interaction field did not preserve complete content under reduced motion')
if (reducedMotionResult.shielded !== 'none' || reducedMotionResult.copyable !== 'text') failures.push('Interaction field lost its selection policy under reduced motion')
await reducedContext.close()

await browser.close()
await new Promise(resolve => server.close(resolve))

if (failures.length) {
  console.error('Browser acceptance failed')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Browser acceptance passed for ${jobs.length} viewport scenarios, 6 interaction paths, and 2 reduced-motion pages`)
