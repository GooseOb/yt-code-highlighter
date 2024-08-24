import { BunBuildUserscriptConfig } from "bun-build-userscript";

export default {
  naming: "dist/index.js",
  userscript: {
    logErrors: !process.argv.includes("--build"),
  },
} satisfies BunBuildUserscriptConfig;
