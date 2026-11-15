import { useEffect, useState } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Site({ page }) {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
  }, [])
  return <App page={page} />
}

const root = document.getElementById('root')
const site = <Site page={root.dataset.page} />

if (root.hasChildNodes()) hydrateRoot(root, site)
else createRoot(root).render(site)
