import { activeExp } from "../config/activeExp";
import * as sass from "sass";
import fs from 'fs';


export function buildSass() {
    const result = sass.compile(`./src/${activeExp.clientName}/${activeExp.testName}/${activeExp.variation}/scss/index.scss`, { sourceMap: true });
    fs.writeFileSync(`./www/index.css`, result.css);
}


export function build() {
    return new Promise((resolve, reject) => {
        Bun.build({
            entrypoints: [`./src/${activeExp.clientName}/${activeExp.testName}/${activeExp.variation}/index.js`],
            outdir: './www/',
            target: "browser",
            format: "esm",
            plugins: [],
        }).then(() => {
            const code = fs.readFileSync(`./www/index.js`, 'utf8');
            fs.writeFileSync(`./www/index.js`, `(function () {${code}})();`);
            resolve();
        }).catch((error) => {
            reject(error);
        })
    }
    )
}