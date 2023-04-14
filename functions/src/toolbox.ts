import * as admin from "firebase-admin";
import * as corsMiddleware from "cors";

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert("./secrets/webcrawlernode.json"),
  databaseURL: "https://webcrawlernode-default-rtdb.firebaseio.com",
});

export const cors = corsMiddleware;
