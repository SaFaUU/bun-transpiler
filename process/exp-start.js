import { watch } from "fs";
import { activeExp } from "../config/activeExp";
import { build } from "./exp-build";
import { broadcastChange } from "./exp-serve";
import Watcher from 'watcher';

console.clear();
console.log(`Experiment Running: ${activeExp.name} ${activeExp.version}`);

const watcher = new Watcher(`./src/${activeExp.name}/${activeExp.version}/`, { recursive: true });

watcher.on('change', async (event, targetPath) => {
    console.clear();
    console.log(`Experiment Running: ${activeExp.name} ${activeExp.version}`);
    await build().then(() => {
        broadcastChange();
    });
});