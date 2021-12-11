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
import { IFeedback, ISite } from "@typings";

const firestore = getFirestore(firebaseApp);

export const createUser = (uid: string, data: User): Promise<void> => {
  return setDoc(doc(firestore, "users", uid), data, { merge: true });
};

export const createSite = (
  data: Omit<ISite, "id">,
): Promise<DocumentReference> => {
  return addDoc(collection(firestore, "sites"), data);
};

export const createFeedback = (
  data: Omit<IFeedback, "id">,
): Promise<DocumentReference> => {
  return addDoc(collection(firestore, "feedback"), data);
};
