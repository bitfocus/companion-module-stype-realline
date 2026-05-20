// Custom packager - replaces companion-module-build to avoid npx on Windows
import { execFileSync, execSync } from 'child_process'
import { readFileSync, mkdirSync, rmSync, cpSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const moduleDir = dirname(fileURLToPath(import.meta.url))
const toolsDir = resolve(moduleDir, 'node_modules/@companion-module/tools')
const webpackCliJs = resolve(moduleDir, 'node_modules/webpack-cli/bin/cli.js')
const webpackConfigCjs = join(toolsDir, 'webpack.config.cjs')
const pkgDir = resolve(moduleDir, 'pkg')

// Clean and recreate pkg/
if (existsSync(pkgDir)) rmSync(pkgDir, { recursive: true })
mkdirSync(pkgDir)

// Run webpack via node (no npx needed)
console.log('Bundling with webpack...')
execFileSync(
	process.execPath,
	[webpackCliJs, '-c', webpackConfigCjs, '--env', `ROOT=${moduleDir}`, '--env', 'MODULETYPE=connection'],
	{ cwd: toolsDir, stdio: 'inherit' },
)

// Copy companion/ metadata
cpSync(join(moduleDir, 'companion'), join(pkgDir, 'companion'), { recursive: true })

// Patch manifest with correct runtime fields
const srcPkg = JSON.parse(readFileSync(join(moduleDir, 'package.json'), 'utf-8'))
const frameworkPkg = JSON.parse(
	readFileSync(join(moduleDir, 'node_modules/@companion-module/base/package.json'), 'utf-8'),
)
const manifest = JSON.parse(readFileSync(join(moduleDir, 'companion/manifest.json'), 'utf-8'))

manifest.runtime.entrypoint = '../main.js'
manifest.version = srcPkg.version
manifest.runtime.api = 'nodejs-ipc'
manifest.runtime.apiVersion = frameworkPkg.version
manifest.isPrerelease = false

writeFileSync(join(pkgDir, 'companion/manifest.json'), JSON.stringify(manifest))
writeFileSync(
	join(pkgDir, 'package.json'),
	JSON.stringify({
		name: manifest.name,
		version: manifest.version,
		license: manifest.license,
		type: 'commonjs',
		dependencies: {},
	}),
)

// Create tgz (tar is built into Windows 10+)
const tgzFile = `${manifest.id}-${manifest.version}.tgz`
console.log(`Writing compressed package output to ${tgzFile}`)
execSync(`tar -czf "${tgzFile}" pkg`, { cwd: moduleDir, stdio: 'inherit' })
console.log('Done!')
