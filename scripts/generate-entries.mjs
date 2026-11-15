import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { htmlPath, pages } from '../src/site-content.js'

for (const [key, page] of Object.entries(pages)) {
  const file = htmlPath(page)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon-32.webp" sizes="32x32" type="image/webp" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#f6f4e9" />
  </head>
  <body>
    <div id="root" data-page="${key}"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`)
}
