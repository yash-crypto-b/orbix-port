import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { htmlPath, pages } from '../src/site-content.js'

const server = await createServer({
  mode: 'production',
  server: { middlewareMode: true, ws: false, watch: null },
})
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const outDir = join(server.config.root, server.config.build.outDir)
  for (const [key, page] of Object.entries(pages)) {
    const file = join(outDir, htmlPath(page))
    const html = await readFile(file, 'utf8')
    const root = '<div id="root" data-page="' + key + '"></div>'
    if (!html.includes(root)) throw new Error('Missing page mount in ' + file)
    const markup = renderToString(createElement(App, { page: key }))
    await writeFile(file, html.replace(root, () => root.slice(0, -6) + markup + '</div>'))
  }
} finally {
  await server.close()
}
