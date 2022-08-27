import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
export default {
  input: "./index.ts",
  output: {
    file: "build/index.js",
    format: "cjs",
  },
  external: [
    "fs",
    "json-schema-to-typescript",
    "ajv/dist/standalone",
    "ajv",
    "terser",
  ],
  plugins: [typescript(), terser({ format: { comments: false } })],
};
