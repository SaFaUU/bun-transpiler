
import { watch } from "fs";
import { activeExp } from "../config/activeExp";
import { build } from "./exp-build";
import ws from 'ws';


export const watcher = watch(
    `./src/${activeExp.name}/${activeExp.version}/`,
    { recursive: true },
    (event, filename) => {
        console.log(`Detected ${event} in ${filename}`);
        if (event === 'change') {
            build();
        }
    },
);