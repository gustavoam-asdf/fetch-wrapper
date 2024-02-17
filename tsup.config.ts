import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
	entry: [
		'src/index.ts',
	],
	splitting: true,
	outDir: 'lib',
	sourcemap: true,
	minify: !options.watch,
	clean: true,
}))