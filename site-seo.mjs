import { leaders, pages, services } from './src/site-content.js'

export function readOrigin(env) {
  const providerDefault = env.VERCEL_PROJECT_PRODUCTION_URL
    ? 'https://' + env.VERCEL_PROJECT_PRODUCTION_URL
    : env.NETLIFY === 'true' ? env.URL : ''
  const input = env.SITE_URL || providerDefault
  if (!input) return null
  const url = new URL(input)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be a production HTTPS origin, such as https://your-site.example')
  }
  return url.origin
}

export function seoMarkup(key, origin, verification) {
  const page = pages[key]
  const meta = [
    '<title>' + escapeHtml(page.title) + '</title>',
    '<meta name="description" content="' + escapeHtml(page.description) + '" />',
  ]
  if (page.noindex) meta.push('<meta name="robots" content="noindex" />')
  else if (origin) meta.push('<link rel="canonical" href="' + escapeHtml(origin + page.path) + '" />')
  if (key === 'home' && verification) {
    meta.push('<meta name="google-site-verification" content="' + escapeHtml(verification) + '" />')
  }
  const graph = []
  const orgId = origin ? origin + '/#organization' : undefined
  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: 'Orbix',
    url: origin ? origin + '/' : undefined,
    founder: leaders.map(({ name, role }) => ({ '@type': 'Person', name, jobTitle: role })),
  }

  if (['home', 'about', 'contact', 'services'].includes(key)) graph.push(organization)
  if (key === 'home' && origin) graph.push({
    '@type': 'WebSite', '@id': origin + '/#website', name: 'Orbix', url: origin + '/',
    publisher: { '@id': orgId },
  })

  const service = services.find(({ key: serviceKey }) => serviceKey === key)
  if (service) graph.push({
    '@type': 'Service', name: service.name, description: service.description,
    url: origin ? origin + page.path : undefined,
    provider: orgId ? { '@id': orgId } : { '@type': 'Organization', name: 'Orbix' },
  }, ...(orgId ? [organization] : []))

  if (origin && !page.noindex && key !== 'home') {
    const crumbs = [['Home', '/']]
    if (service) crumbs.push(['Services', '/services/'])
    const breadcrumbNames = { about: 'About', contact: 'Contact', services: 'Services', privacy: 'Privacy policy' }
    crumbs.push([service?.name ?? breadcrumbNames[key], page.path])
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, path], index) => ({
        '@type': 'ListItem', position: index + 1, name, item: origin + path,
      })),
    })
  }

  if (graph.length) meta.push('<script type="application/ld+json">' +
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c') + '</script>')
  return meta.join('\n    ')
}

export function sitemap(origin) {
  const urls = Object.values(pages).filter((page) => !page.noindex)
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(({ path }) => '  <url><loc>' + escapeHtml(origin + path) + '</loc></url>').join('\n') +
    '\n</urlset>\n'
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char])
}
