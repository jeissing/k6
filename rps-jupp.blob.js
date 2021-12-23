/*
    Note: this is not a real-life example unless you want to test for the absolute RPS limit of your system.
    This is extremely aggressive test.
*/

import http from "k6/http";
import { sleep } from "k6";

export let options = {
	discardResponseBodies: true,
    ext: {
        loadimpact: {
            name: `${__ENV.TEST_NAME}` || "RPS hammering test",
            projectID: 3478725,
        }
    }
};

export default function() {
    // relentless hammering of these 6 URLs.
    // 20 batches per iteration.
    for(let i=0; i<20; i++){
        http.batch([
            ['GET', "https://loadtestfork6.blob.core.windows.net/svg/123.svg"],
            ['GET', "https://loadtestfork6.blob.core.windows.net/svg/activity.svg"],
            ['GET', "https://loadtestfork6.blob.core.windows.net/svg/alarm.svg"],
            ['GET', "https://loadtestfork6.blob.core.windows.net/svg/alarm-fill.svg"],
            ['GET', "https://loadtestfork6.blob.core.windows.net/svg/align-bottom.svg"],
            ['GET', "https://loadtestfork6.blob.core.windows.net/svg/align-center.svg"],
        ]);
    }
  sleep(0.1); // 100ms sleep between iterations.
}
