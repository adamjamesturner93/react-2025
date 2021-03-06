import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: "https://react-2025-7708e.firebaseio.com",
  });
}

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };
