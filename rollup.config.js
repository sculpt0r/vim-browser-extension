import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';

// rollup.config.js
export default {
	input: [
		'src/main.ts'
	],
	output: {
		file: 'src_js/plugin.js',
		format: 'cjs'
	},
	plugins: [
		copy( {
			targets: [
				{ src: 'src/manifest.json', dest: 'src_js/' },
				{ src: 'src/worker.js', dest: 'src_js/' }
			]
		} ),
		typescript()
	]
};
