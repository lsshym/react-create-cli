import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const packageFile = JSON.parse(
    readFileSync(path.join(__dirname, "../package.json"), {
        encoding: "utf-8",
    })
);