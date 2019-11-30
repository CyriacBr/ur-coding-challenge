import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    json(),
    typescript({
      typescript: require('typescript')
    })
  ]
};
