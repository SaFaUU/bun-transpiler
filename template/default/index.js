import { querySingle, waitFor } from "../../../../utils/common";
import { testName, variation } from "../info";
import { main } from "./func/main";

waitFor(querySingle('body')).then(() => {
    querySingle('body').classList.add(`${testName}_${variation}`);
    main();
})