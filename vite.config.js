import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { htmlPath, pages } from './src/site-content.js'
import { readOrigin, seoMarkup, sitemap } from './site-seo.mjs'

const input = Object.values(pages).map(htmlPath)
const routes = new Set(input.flatMap((page) => {
  if (page === '404.html') return []
  const directory = '/' + page.slice(0, -'index.html'.length)
  return ['/' + page, directory, directory.slice(0, -1)]
}))

// Local servers mirror the custom 404 response of a configured static host.
function notFoundPage() {
  function install(server, readPage) {
    server.middlewares.use(async (request, response, next) => {
      const path = request.url?.split('?')[0]
      if (!['GET', 'HEAD'].includes(request.method) || routes.has(path) ||
          ['/robots.txt', '/sitemap.xml'].includes(path) ||
          !(request.headers.accept?.includes('text/html') || path === '/404.html')) {
        next()
        return
      }
      try {
        const html = await readPage()
        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end(request.method === 'HEAD' ? undefined : html)
      } catch (error) {
        next(error)
      }
    })
  }

  return {
    name: 'orbix-not-found',
    configureServer(server) {
      install(server, async () => server.transformIndexHtml('/404.html',
        await readFile(resolve(server.config.root, '404.html'), 'utf8')))
    },
    configurePreviewServer(server) {
      install(server, () => readFile(resolve(server.config.root, server.config.build.outDir, '404.html'), 'utf8'))
    },
  }
}

function siteSeo(origin, verification) {
  return {
    name: 'orbix-search-metadata',
    transformIndexHtml(html) {
      const key = html.match(/data-page="([^"]+)"/)?.[1]
      if (!key || !Object.hasOwn(pages, key)) return html
      return html.replace('</head>', () => '  ' + seoMarkup(key, origin, verification) + '\n  </head>')
    },
    generateBundle() {
      const robots = 'User-agent: *\nAllow: /\n'
      this.emitFile({
        type: 'asset', fileName: 'robots.txt',
        source: robots + (origin ? 'Sitemap: ' + origin + '/sitemap.xml\n' : ''),
      })
      if (origin) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(origin) })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  return {
    appType: 'mpa',
    plugins: [react(), notFoundPage(), siteSeo(readOrigin(env), env.GOOGLE_SITE_VERIFICATION)],
    build: { rollupOptions: { input } },
  }
})
