import * as admin from "firebase-admin";
import * as corsMiddleware from "cors";

export const firebaseAdmin = admin.initializeApp();
export const cors = corsMiddleware;
