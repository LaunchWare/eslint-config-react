import copy from "rollup-plugin-copy"
import typescript from "@rollup/plugin-typescript"

import { writeFile, mkdir } from "fs/promises"

export default [
  {
    input: "./src/index.ts",
    plugins: [
      typescript({ declaration: false }),
    ],
    output: [
      { sourcemap: true, format: "es", file: "./dist/esm/index.js" },
      { sourcemap: true, format: "cjs", file: "./dist/cjs/index.js" },
    ],
  },
]
