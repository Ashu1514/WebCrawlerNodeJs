import * as functions from "firebase-functions";
import crawlerExpress from "./crawler";
import { routineCleanUp } from "./schedulers/crawler.cleanup";
const SCHEDULER_REGION = "Asia/Kolkata";

export const crawler = functions
  .runWith({
    timeoutSeconds: 300,
    memory: "1GB",
  })
  .https.onRequest(crawlerExpress);

export const crawlerQueriesCleanUp = functions.pubsub
  .schedule("every 2 hours")
  .timeZone(SCHEDULER_REGION)
  .onRun(() => {
    return routineCleanUp();
  });
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
