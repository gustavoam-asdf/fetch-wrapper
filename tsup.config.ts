import { defineConfig } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
	splitting: true,
	clean: true,
	dts: true,
	format: ['cjs', 'esm'],
	minify: isProduction,
	bundle: isProduction,
	skipNodeModulesBundle: true,
	watch: !isProduction,
	target: 'es2022',
	outDir: 'lib',
	entry: ['src/**/*.ts'],
})