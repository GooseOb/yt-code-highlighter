import type { BuildConfigs } from "bun-build-userscript";

export const userscript: BuildConfigs["userscript"] = {
  logErrors: !process.argv.includes("--build"),
};

export const bun: BuildConfigs["bun"] = {
  naming: "dist/index.js",
};
