import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: {
  index: "src/index.ts",
  server: "src/server.ts",
},
output: [
  {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].esm.js",
    sourcemap: true,
  },
  {
    dir: "dist",
    format: "cjs",
    entryFileNames: "[name].js",
    sourcemap: true,
  },
],
  plugins: [
    peerDepsExternal(),
    resolve({
  preferBuiltins: false,
}),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      modules: false,
      extract: false,
      inject: true,
    }),
  ],
external: [
  'react',
  'react-dom',
  'react/jsx-runtime'
],
};
