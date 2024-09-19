import { activeExp } from "../config/activeExp";

export function build() {
    Bun.build({
        entrypoints: [`./src/${activeExp.name}/${activeExp.version}/index.js`],
        outdir: './www/',
    })
}

build();