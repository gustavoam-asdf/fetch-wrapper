import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
	entry: [
		'src/index.ts',
	],
	format: ['cjs', 'esm'],
	splitting: true,
	outDir: 'lib',
	sourcemap: true,
	minify: !options.watch,
	clean: true,
}))