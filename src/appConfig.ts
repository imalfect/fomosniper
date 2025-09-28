import type { Config } from "./types/appConfig";
import fs from "fs";
// More like a config loader
const configPath = "./config.json";

export const appConfig: Config = JSON.parse(
  fs.readFileSync(configPath, "utf-8")
);
