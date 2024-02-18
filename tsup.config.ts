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
	dts: true,
	shims: true,
	skipNodeModulesBundle: true,
	watch: !isProduction,
	target: 'es2022',
	entry: ['src/**/*.ts'],
}

export default defineConfig(options => {
	const baseOptionList: Options[] = [
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
	]

	if (isProduction) {
		return baseOptionList
	}

	return [
		...baseOptionList,
		{
			...commonOptions,
			...options,
			format: ['esm'],
			dts: {
				only: true,
			},
			outDir: 'lib',
		}
	]
})