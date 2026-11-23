import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { existsSync, statSync } from 'node:fs'
import { pageMetadata, siteConfig } from './src/data/siteConfig.ts'

const resumePath = siteConfig.resumePdfPath
const resumeAvailable = /^\/[\w/-]+\.pdf$/.test(resumePath)
  && existsSync(new URL(`./public${resumePath}`, import.meta.url))
  && statSync(new URL(`./public${resumePath}`, import.meta.url)).isFile()

const escapeHtml = (text: string) => text.replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'portfolio-metadata',
    transformIndexHtml: (html) => html
      .replaceAll('__PORTFOLIO_TITLE__', escapeHtml(pageMetadata.home.title))
      .replaceAll('__PORTFOLIO_DESCRIPTION__', escapeHtml(pageMetadata.home.description)),
  }],
  define: { __RESUME_AVAILABLE__: JSON.stringify(resumeAvailable) },
})
