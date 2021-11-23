import firebaseApp from "./firebase";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import { User } from "./auth";

const firestore = getFirestore(firebaseApp);

export const createUser = (uid: string, data: User): Promise<void> => {
  return setDoc(doc(firestore, "users", uid), data, { merge: true });
};
