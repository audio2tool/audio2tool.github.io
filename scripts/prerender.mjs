import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { build } from 'vite'

// Render the same React tree used by the browser, so paper content is available
// to plain HTTP clients without maintaining a separate crawler-only page.
const root = fileURLToPath(new URL('../', import.meta.url))
const serverDir = join(root, '.prerender')

try {
  await build({
    root,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: serverDir,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
    },
  })
  const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.mjs')).href)
  const indexPath = join(root, 'dist/index.html')
  const template = await readFile(indexPath, 'utf8')
  const marker = '<div id="root"></div>'
  if (!template.includes(marker)) {
    throw new Error('Expected an empty React root in dist/index.html before prerendering')
  }
  await writeFile(indexPath, template.replace(marker, () => `<div id="root">${render()}</div>`))
  console.log('Prerendered paper content into dist/index.html')
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
