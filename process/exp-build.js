import { activeExp } from "../config/activeExp";

export function build() {
    return new Promise((resolve, reject) => {
        Bun.build({
            entrypoints: [`./src/${activeExp.clientName}/${activeExp.testName}/${activeExp.variation}/index.js`],
            outdir: './www/',
            targets: ['browser'],
            plugins: [],
        }).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        })
    }
    )
}