import { Options, defineConfig } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

const commonOptions: Options = {
	splitting: true,
	clean: true,
	sourcemap: true,
	outExtension() {
		return {
			js: '.js',
			dts: '.d.ts'
		}
	},
	minify: isProduction,
	bundle: isProduction,
	shims: true,
	skipNodeModulesBundle: true,
	watch: !isProduction,
	target: 'es2022',
	entry: ['src/**/*.ts'],
}

export default defineConfig(options => [
	{
		...commonOptions,
		...options,
		format: ['cjs'],
		outDir: isProduction ? 'dist/cjs' : 'lib/cjs',
	},
	{
		...commonOptions,
		...options,
		format: ['esm'],
		outDir: isProduction ? 'dist/mjs' : 'lib/mjs',
	},
	{
		...commonOptions,
		...options,
		format: ['esm'],
		dts: {
			only: true,
		},
		outDir: 'types',
	}
])