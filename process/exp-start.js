import { watch } from "fs";
import { activeExp } from "../config/activeExp";
import { build, buildSass } from "./exp-build";
import { broadcastChange } from "./exp-serve";
import Watcher from 'watcher';
import { expPrompter } from "./exp-prompter";

expPrompter().then(() => {
    build();
    buildSass();
    const watcher = new Watcher(`./src/${activeExp.clientName}/${activeExp.testName}/${activeExp.variation}/`, { recursive: true });

    watcher.on('change', async (event, targetPath) => {
        console.clear();
        console.log(`Experiment Running: ${activeExp.clientName} ${activeExp.testName} ${activeExp.variation}`);
        await build().then(() => buildSass()).then(() => {
            broadcastChange();
        });
    });
})