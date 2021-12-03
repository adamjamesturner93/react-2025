import firebaseApp from "./firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from "@firebase/firestore";
import { User } from "./auth";
import { ISite } from "../types/site";

const firestore = getFirestore(firebaseApp);

export const createUser = (uid: string, data: User): Promise<void> => {
  return setDoc(doc(firestore, "users", uid), data, { merge: true });
};

export const createSite = (data: ISite): Promise<DocumentReference> => {
  return addDoc(collection(firestore, "sites"), data);
};
