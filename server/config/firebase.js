const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, auth };
