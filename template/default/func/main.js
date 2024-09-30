import { qaLog } from "../../../../../utils/common";
import { testName, variation } from "../../info";

export function main() {
    qaLog(`${testName}_${variation} Experiment Running`);
}