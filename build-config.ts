import { UserScriptConfig, type BuildConfigs } from "bun-build-userscript";

export const userscript = new UserScriptConfig({
  logErrors: !process.argv.includes("--build"),
});

export const bun: BuildConfigs["bun"] = {
  naming: "dist/index.js",
};
