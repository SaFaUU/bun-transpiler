import { activeExp } from "../config/activeExp";

export function build() {
    return new Promise((resolve, reject) => {
        Bun.build({
            entrypoints: [`./src/${activeExp.name}/${activeExp.version}/index.js`],
            outdir: './www/',
            targets: ['browser'],
        }).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        })
    }
    )
}

build();