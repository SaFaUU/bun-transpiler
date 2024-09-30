import { select, Separator, input } from '@inquirer/prompts';
import { readdirSync, existsSync, mkdirSync, writeFileSync, cpSync } from "fs";
import { activeExp } from '../config/activeExp';

const createDir = (directoryPath) => {
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath);
    }
}

function clientList() {
    return readdirSync('./src/').map((dir) => {
        return {
            name: dir,
            value: dir,
        } || {};
    });
}


function testList(clientName) {
    return readdirSync(`./src/${clientName}/`).map((dir) => {
        return {
            name: dir,
            value: dir,
        };
    });
}

function variationList(testName) {
    return readdirSync(`./src/${activeExp.clientName}/${testName}/`).filter((dir) => dir !== 'info.js').map((dir) => ({
        name: dir,
        value: dir,
    }));
}

function templateList() {
    return readdirSync('./template/').map((dir) => {
        return {
            name: dir,
            value: dir,
        };
    });
}

export async function expPrompter() {
    return new Promise(async (resolve, reject) => {
        const clientSelect = await select({
            message: 'Please Select a Client Name',
            choices: [
                ...clientList(),
                new Separator(),
                {
                    name: 'Create a New Client',
                    value: 'create',
                },

            ],
        }, { clearPromptOnDone: true });

        if (clientSelect === 'create') {
            const clientName = await input({ message: 'Please Enter the Client name: ' });
            createDir(`./src/${clientName}/`);
            activeExp.clientName = clientName;
        } else {
            activeExp.clientName = clientSelect;
        }

        const testSelect = await select({
            message: 'Please Select your Test',
            choices: [
                ...testList(activeExp.clientName),
                new Separator(),
                {
                    name: 'Create a Test',
                    value: 'create',
                },

            ],
        }, { clearPromptOnDone: true });

        if (testSelect === 'create') {
            const testName = await input({ message: 'Please Enter the Test name: ' });
            createDir(`./src/${activeExp.clientName}/${testName}/`);
            activeExp.testName = testName;
        } else {
            activeExp.testName = testSelect;
        }

        const variationSelect = await select({
            message: 'Please Select your Variation',
            choices: [
                ...variationList(activeExp.testName),
                new Separator(),
                {
                    name: 'Create a Variation',
                    value: 'create',
                },
            ],
        }, { clearPromptOnDone: true });

        if (variationSelect === 'create') {

            const variationName = await input({ message: 'Please Enter the Variation name: ' });

            const templateSelect = await select({
                message: 'Please Select your Template',
                choices: [
                    ...templateList(),
                ],
            }, { clearPromptOnDone: true });


            const siteLink = await input({ message: 'Please Enter the Site Link: ' });

            createDir(`./src/${activeExp.clientName}/${activeExp.testName}/${variationName}/`);
            activeExp.variation = variationName;
            cpSync(`./template/${templateSelect}/`, `./src/${activeExp.clientName}/${activeExp.testName}/${activeExp.variation}/`, { recursive: true });
            writeFileSync(`./src/${activeExp.clientName}/${activeExp.testName}/info.js`, `
export const siteLink = '${siteLink || ""}';
export const clientName = '${activeExp.clientName}';
export const testName = '${activeExp.testName}';
export const variation = '${activeExp.variation}';
`);
        } else {
            activeExp.variation = variationSelect;
        }

        writeFileSync(`./config/activeExp.js`, `export const activeExp = ${JSON.stringify(activeExp)}`);
        console.log(`Experiment Running: ${activeExp.clientName} ${activeExp.testName} ${activeExp.variation}`);
        resolve();
    })
}