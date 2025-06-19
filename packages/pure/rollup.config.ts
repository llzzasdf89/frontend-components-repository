import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
export default {
  input: './index.ts',
  output: [
    {
      file: 'dist/pure.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/pure.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/pure.umd.js',
      name: 'pure',
      format: 'umd',
    },
  ],
  plugins: [resolve(), commonjs(), terser(), typescript()],
}
