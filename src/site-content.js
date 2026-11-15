export const leaders = [
  {
    name: 'Arjun Nehra',
    role: 'CEO & Co-Founder',
    portrait: '/arjun-nehra.webp',
    linkedIn: 'https://www.linkedin.com/in/arjun-nehra-1b4979202/',
    introduction: [
      'Hey, I’m Arjun Nehra, an entrepreneur, engineer, and the Co-Founder and CEO at Orbix Connect.',
      'I’m driven by curiosity, ambitious thinking, and a passion for turning unconventional ideas into meaningful ventures. With a background in Civil Engineering and a growing interest in AI, emerging technologies, and entrepreneurship, I enjoy exploring how traditional industries can be reimagined through innovation.',
      'At Orbix, I’m working towards transforming the construction ecosystem by bringing together technology, AI, builders, suppliers, and customers under one connected platform.',
      'I believe in thinking big, questioning the conventional, and having the courage to build something that doesn’t exist yet.',
      'An engineer by education, an entrepreneur by instinct, and a builder by ambition.',
      'Orbix — Where Construction Connects.',
    ],
  },
  {
    name: 'Yash Vardhan Singh',
    role: 'CTO & Co-Founder',
    portrait: '/yash-vardhan-singh.png',
    portraitWidth: 640,
    portraitHeight: 762,
    linkedIn: 'https://www.linkedin.com/in/yash-vardhan-singh-7161332aa/',
    introduction: [
      'I’m the Cofounder and CTO at Orbix Connect, and an entrepreneur, engineer, designer, and builder.',
      "I'm a full-stack and AI engineer obsessed with turning ambitious ideas into real products.",
      "From building high-performance backend systems to deploying AI pipelines that eliminate 70% of manual work, I've learned to approach engineering with a founder's mindset: move fast, solve the right problems, and build for scale.",
      'I work across the entire stack, combining software engineering, AI, and product thinking to take ideas from zero to production.',
      'My philosophy is simple: Think big. Build fast. Ship things that matter.',
    ],
  },
]

export const services = [
  {
    key: 'qr-batch-tracking',
    name: 'QR batch tracking',
    title: 'QR Code Batch Tracking for Warehouses',
    description: 'Scan one QR label to check a batch’s available stock, warehouse location, and movement history, even after a transfer or partial dispatch.',
    steps: [
      ['Identify stock by batch', 'Use a QR label to identify the batch instead of relying on a product name alone.'],
      ['Check stock where you work', 'Scan the label to see the current quantity and warehouse location before moving or picking stock.'],
      ['Keep using the same label', 'The label identifies the same batch after transfers and partial dispatches, so staff can look up its history.'],
    ],
  },
  {
    key: 'fifo-dispatch',
    name: 'FIFO dispatch',
    title: 'First-In, First-Out Warehouse Dispatch',
    description: 'Use Orbix to help warehouse staff identify older available batches and pick them first with a first-in, first-out dispatch workflow.',
    steps: [
      ['Find the older batch', 'Use batch information to see which available stock came in first.'],
      ['Confirm before picking', 'Check the batch label, location, and remaining stock before taking units for dispatch.'],
      ['Review what shipped', 'Check the dispatch in the movement history and see what remains after a partial shipment.'],
    ],
  },
  {
    key: 'stock-movement-history',
    name: 'Stock movement history',
    title: 'Warehouse Stock Movement History',
    description: 'Trace changes to warehouse stock by batch. Review receipts, transfers, dispatches, and adjustments when recorded quantities differ from a stock count.',
    steps: [
      ['Start with the batch', 'Look up the batch that has a quantity or location discrepancy.'],
      ['Review each type of movement', 'Check receipts, transfers, dispatches, and adjustments to see what changed and where.'],
      ['Compare against the stock count', 'Use the recorded movements to narrow down where the physical count and inventory record began to differ.'],
    ],
  },
].map((service) => ({ ...service, path: '/services/' + service.key + '/' }))

export const faqs = [
  ['Who is Orbix for?', 'Orbix is being built for the people who keep civil construction moving: contractors, suppliers, site teams, and warehouse teams. Our first tools help teams track material batches from receipt to dispatch.'],
  ['Do I need a new QR code after a transfer or partial dispatch?', 'No. You can scan the same batch label to see its current stock, warehouse location, and movement history.'],
  ['What does FIFO mean?', 'FIFO means first in, first out. In a warehouse, it means picking older available stock before newer stock.'],
  ['Which stock movements can I review?', 'You can review receipts, transfers, dispatches, and adjustments for a batch.'],
]

export const pages = {
  home: { path: '/', title: 'Orbix | Where Construction Connects', description: 'Orbix is building a better way for civil construction teams to work together, starting with material tracking from receipt to dispatch.' },
  services: { path: '/services/', title: 'Material Tracking Services | Orbix', description: 'Explore QR batch tracking, FIFO dispatch, and stock movement history for construction materials.' },
  ...Object.fromEntries(services.map((service) => [service.key, {
    path: service.path, title: service.title + ' | Orbix', description: service.description,
  }])),
  about: { path: '/about/', title: 'About Orbix & Its Founders', description: 'Meet the Orbix founders and learn how they plan to connect contractors, suppliers, and site teams across civil construction.' },
  contact: { path: '/contact/', title: 'Contact & Leadership | Orbix', description: 'Meet the co-founders building Orbix for the civil construction industry.' },
  privacy: { path: '/privacy/', title: 'Privacy Policy | Orbix', description: 'Learn how the Orbix website and its hosting provider may handle information about your visit.' },
  updates: { path: '/updates/', title: 'Product Updates | Orbix', description: 'Find announcements and release notes for Orbix.', noindex: true },
  'not-found': { path: '/404.html', title: 'Page Not Found | Orbix', description: 'The requested Orbix page could not be found. Explore material tracking and meet the team on the Orbix homepage.', noindex: true },
}

export const htmlPath = (page) => page.path.endsWith('/') ? page.path.slice(1) + 'index.html' : page.path.slice(1)
