import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";

const path = require("path");
const projectRootDir = path.resolve(__dirname);

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: false,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: false,
    },
  ],
  external: ["react", "antd"],
  plugins: [
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(projectRootDir, "src"),
          // OR place `customResolver` here. See explanation below.
        },
      ],
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    terser(),
  ],
};
