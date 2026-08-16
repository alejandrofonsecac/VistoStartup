import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })

await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json')

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async entry => {
    const filePath = path.join(directory, entry.name)
    return entry.isDirectory() ? listFiles(filePath) : [filePath]
  }))

  return files.flat()
}

const staticFiles = (await listFiles('dist')).filter(filePath =>
  !filePath.startsWith(`dist${path.sep}server${path.sep}`) &&
  !filePath.startsWith(`dist${path.sep}.openai${path.sep}`)
)
const assets = Object.fromEntries(await Promise.all(staticFiles.map(async filePath => {
  const route = `/${path.relative('dist', filePath).split(path.sep).join('/')}`
  const extension = path.extname(filePath).toLowerCase()
  const content = (await readFile(filePath)).toString('base64')
  return [route, { content, type: mimeTypes[extension] ?? 'application/octet-stream' }]
})))

assets['/'] = assets['/index.html']

await writeFile('dist/server/index.js', `const assets = ${JSON.stringify(assets)}

function decodeBase64(value) {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

export default {
  async fetch(request) {
    const pathname = new URL(request.url).pathname
    const asset = assets[pathname] ?? assets['/']

    return new Response(decodeBase64(asset.content), {
      headers: { 'content-type': asset.type },
    })
  },
}
`)
