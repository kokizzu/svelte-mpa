import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

let plugins = [
  resolve(),
  commonjs(), 
  buble(),
  uglify()
]; 

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: pkg.name,
			file: pkg.browser,
			format: 'umd',
			sourcemap: true
		},
		plugins
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: [],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];