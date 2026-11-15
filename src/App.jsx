import { useRef, useState } from 'react'
import { faqs, leaders, services } from './site-content.js'
import './App.css'

const teamPath = '/contact/#leadership'

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggle = useRef(null)

  function closeOnEscape(event) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      toggle.current?.focus()
    }
  }

  return (
    <header className="shell site-header" onKeyDown={closeOnEscape}>
      <a className="wordmark" href="/">
        <span className="brand-mark" aria-hidden="true" />
        Orbix
      </a>
      <button className="menu-toggle" type="button" ref={toggle} aria-controls="main-nav"
        aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? 'Close menu' : 'Menu'}
      </button>
      <nav id="main-nav" aria-label="Main navigation" data-open={menuOpen}>
        {[
          ['/services/', 'Services', page === 'services' || services.some(({ key }) => key === page)],
          ['/about/', 'About', page === 'about'],
          ['/#faq', 'FAQ', false],
          [teamPath, 'Contact', page === 'contact'],
        ].map(([href, label, current]) => (
          <a key={label} href={href} aria-current={current ? (page === 'contact' || page === 'about' || page === 'services' ? 'page' : 'location') : undefined}
            onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

function TeamButton() {
  return <a className="button" href={teamPath}>Meet the leadership team <span aria-hidden="true">→</span></a>
}

function Leadership() {
  return (
    <section className="section" id="leadership" aria-labelledby="leadership-title" tabIndex={-1}>
      <h2 id="leadership-title">Leadership</h2>
      <ul className="leaders" role="list">
        {leaders.map(({ name, role, portrait, portraitWidth = 320, portraitHeight = 483, linkedIn, introduction }) => (
          <li className={introduction ? 'leader leader--with-introduction' : 'leader'} key={name}>
            {linkedIn ? (
              <a className="leader-profile" href={linkedIn}>
                <img src={portrait} alt="" width={portraitWidth} height={portraitHeight} loading="lazy" decoding="async" />
                <div>
                  <h3>{name}</h3>
                  <p>{role}</p>
                  <span className="leader-profile-label">LinkedIn <span aria-hidden="true">↗</span></span>
                </div>
              </a>
            ) : (
              <><h3>{name}</h3><p>{role}</p></>
            )}
            {introduction && (
              <div className="leader-introduction">
                {introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

function ServiceCards() {
  return (
    <ul className="service-cards" role="list">
      {services.map(({ key, name, description, path }) => (
        <li className="leader service-card" key={key}>
          <h3><a href={path}>{name} <span aria-hidden="true">↗</span></a></h3>
          <p>{description}</p>
        </li>
      ))}
    </ul>
  )
}

function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="page-label">Built for civil construction</span>
          <h1 id="hero-title">Where construction connects</h1>
          <p>Orbix is building a better way for contractors, suppliers, and site teams to work together. It starts with making materials easier to track from receipt to dispatch.</p>
          <a className="button" href="/services/">Explore what Orbix offers <span aria-hidden="true">→</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit">
            <div className="orbit-ring orbit-ring--wide" />
            <div className="orbit-ring orbit-ring--tall" />
            <div className="sphere" />
            <div className="satellite" />
          </div>
        </div>
      </section>
      <section className="section" id="features" aria-labelledby="features-title">
        <h2 id="features-title">It starts with material tracking</h2>
        <ServiceCards />
      </section>
      <section className="section" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </div>
      </section>
      <Leadership />
    </>
  )
}

function Services({ service }) {
  if (!service) {
    return (
      <>
        <section className="content-page">
          <h1>Material tracking services</h1>
          <p>Follow stock from receipt through dispatch with QR batch tracking, FIFO picking, and a record of what moved.</p>
        </section>
        <section className="section" aria-labelledby="service-options">
          <h2 id="service-options">Explore the workflows</h2>
          <ServiceCards />
        </section>
      </>
    )
  }
  return (
    <article className="content-page policy">
      <p className="page-label"><a href="/services/">Material tracking services</a></p>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      {service.steps.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}
      <h2>Related workflows</h2>
      <ul className="feature-list">
        {services.filter(({ key }) => key !== service.key).map(({ key, name, path }) => <li key={key}><a href={path}>{name}</a></li>)}
      </ul>
      <TeamButton />
    </article>
  )
}

function Company({ contact }) {
  return (
    <>
      <section className="content-page">
        <h1>{contact ? 'Contact Orbix' : 'About Orbix'}</h1>
        <p>{contact
          ? 'Meet the co-founders building Orbix for the civil construction industry.'
          : 'We’re building Orbix to change how people work together in civil construction, from suppliers and warehouse teams to contractors and crews on site. Our first focus is materials: helping teams see what’s in stock, where it is, and how it moved.'}</p>
        {contact
          ? <a className="button" href="#leadership">View the leadership team <span aria-hidden="true">↓</span></a>
          : <a className="button" href="/services/">See how Orbix works <span aria-hidden="true">→</span></a>}
      </section>
      <Leadership />
    </>
  )
}

function StatusPage({ missing }) {
  return (
    <section className="content-page">
      {missing && <p className="page-label">404</p>}
      <h1>{missing ? 'Page not found' : 'Product updates'}</h1>
      <div className="status-card">
        <h2>{missing ? 'Let’s get you back on track' : 'No updates yet'}</h2>
        <p>{missing
          ? 'The page may have moved, or the address may be incorrect.'
          : 'There are no announcements or release notes to browse yet. In the meantime, see how Orbix helps teams track materials.'}</p>
        <a className="button" href={missing ? '/' : '/services/'}>
          {missing ? 'Back to home' : 'Explore material tracking'}
        </a>
      </div>
    </section>
  )
}

function Privacy() {
  return (
    <article className="content-page policy">
      <h1>Privacy policy</h1>
      <p>This notice covers the public Orbix website. It does not cover use of the Orbix product.</p>
      <h2>Information you provide</h2>
      <p>This website has no accounts, sign-up forms, or contact forms. You can browse it without submitting personal information.</p>
      <h2>Technical information</h2>
      <p>When you visit, the hosting provider receives the technical information needed to deliver the site, such as your IP address and the pages you request. The provider may keep logs to operate, secure, and troubleshoot the site.</p>
      <h2>Cookies and analytics</h2>
      <p>The website code does not set cookies, store visitor information in your browser, or include analytics or advertising trackers.</p>
      <h2>Changes to this notice</h2>
      <p>If the website starts handling information in new ways, this page will describe those changes.</p>
    </article>
  )
}

function Page({ page }) {
  if (page === 'home') return <Home />
  if (page === 'about' || page === 'contact') return <Company contact={page === 'contact'} />
  if (page === 'privacy') return <Privacy />
  const service = services.find(({ key }) => key === page)
  if (page === 'services' || service) return <Services service={service} />
  return <StatusPage missing={page !== 'updates'} />
}

export default function App({ page }) {
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header page={page} />
      <main className="shell" id="main-content" tabIndex={-1}>
        <Page page={page} />
      </main>
      <footer className="shell site-footer">
        <span>Orbix</span>
        <a href="/updates/" aria-current={page === 'updates' ? 'page' : undefined}>Updates</a>
        <a href="/privacy/" aria-current={page === 'privacy' ? 'page' : undefined}>Privacy policy</a>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  )
}
