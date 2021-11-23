import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_APY_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  });
} else {
  firebaseApp = getApp("[DEFAULT]");
}

export default firebaseApp;
