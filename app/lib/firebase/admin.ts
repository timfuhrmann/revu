import admin from "firebase-admin";

const serviceAccount = require("./keys/key.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://case-study-bynd.firebaseio.com",
    });
}

export const db = admin.firestore();
export const auth = admin.auth();
