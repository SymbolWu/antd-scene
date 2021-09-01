import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";

const path = require("path");
const packageJson = require("./package.json");
const projectRootDir = path.resolve(__dirname);

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    // {
    //   file: packageJson.module,
    //   format: "es",
    //   sourcemap: true,
    // },
  ],
  external: ["react", "antd", "@ant-design/icons"],
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
