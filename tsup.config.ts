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

export default defineConfig(options => {
	const baseOptionList: Options[] = [
		{
			...commonOptions,
			...options,
			dts: isProduction,
			format: ['cjs'],
			outDir: isProduction ? 'dist/cjs' : 'lib/cjs',
		},
		{
			...commonOptions,
			...options,
			dts: isProduction,
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
			dts: {
				only: true,
			},
			outDir: 'lib',
		}
	]
})