import { useState, useEffect, useContext, createContext, FC } from "react";
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from "@firebase/auth";
import firebaseApp from "./firebase";
import { createUser } from "./database";

export type User = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string;
  photoUrl: string | null;
};

type AuthContextType = {
  user?: User;
  signInWithGithub: () => Promise<User | undefined>;
  signout: () => Promise<User | undefined>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const formatUser = ({
  uid,
  email,
  displayName,
  providerData,
  photoURL,
}: FirebaseUser): User => ({
  uid,
  email,
  name: displayName,
  provider: providerData[0].providerId,
  photoUrl: photoURL,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const auth = getAuth(firebaseApp);

  const handleUser = async (rawUser?: FirebaseUser | null) => {
    if (!rawUser) {
      setUser(undefined);
      return;
    }
    const user = formatUser(rawUser);
    await createUser(user.uid, user);
    setUser(user);
    return user;
  };

  const signInWithGithub = async () => {
    const response = await signInWithPopup(auth, new GithubAuthProvider());
    return handleUser(response.user);
  };

  const signout = async () => {
    await signOut(auth);
    return handleUser();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, [auth]);

  const value: AuthContextType = {
    user,
    signInWithGithub,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context incorrectly initialised");

  return context;
};
