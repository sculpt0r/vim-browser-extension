import copy from 'rollup-plugin-copy'

// rollup.config.js
export default {
	input: [
		'src/main.js'
	],
	output: {
	  file: 'src_js/plugin.js',
	  format: 'cjs'
	},
	plugins: [
		copy({
		  targets: [
			{ src: 'src/manifest.json', dest: 'src_js/' },
		  ]
		})
	  ]
};
