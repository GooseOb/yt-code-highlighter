import type { BuildConfigs } from "bun-build-userscript";

module.exports = {
  bun: {
    naming: "dist/index.js",
  },
  userscript: {
    logErrors: !process.argv.includes("--build"),
  },
} satisfies BuildConfigs;
