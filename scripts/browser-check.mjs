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
    skills: [...document.querySelectorAll('article.skill')].map(article => article.querySelectorAll('img').length)
  }))
  if (!response || response.status() !== 200) failures.push(`${route} at ${width}px returned ${response?.status() || 'no response'}`)
  if (result.overflow > 0) failures.push(`${route} at ${width}px overflows by ${result.overflow}px`)
  if (result.brokenImages) failures.push(`${route} at ${width}px has ${result.brokenImages} broken images`)
  if (result.unnamedImages) failures.push(`${route} at ${width}px has ${result.unnamedImages} images without alt text`)
  if (!result.title) failures.push(`${route} at ${width}px has no document title`)
  if (route === '/docs/' && (result.skills.length !== 18 || result.skills.some(count => count < 2))) {
    failures.push(`${route} at ${width}px does not show two examples for each domain skill`)
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

await interaction.close()
await browser.close()
await new Promise(resolve => server.close(resolve))

if (failures.length) {
  console.error('Browser acceptance failed')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Browser acceptance passed for ${jobs.length} viewport scenarios and 4 interaction paths`)
