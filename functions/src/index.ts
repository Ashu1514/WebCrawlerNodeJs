import * as functions from "firebase-functions";
import crawlerExpress from "./crawler";


export const crawler = functions
  .https.onRequest(crawlerExpress);
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
