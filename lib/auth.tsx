import { useState, useEffect, useContext, createContext, FC } from "react";
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "@firebase/auth";
import firebaseApp from "./firebase";

type AuthContextType = {
  user?: User;
  signInWithGithub: () => Promise<User>;
  signout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const auth = getAuth(firebaseApp);

  const signInWithGithub = async () => {
    const response = await signInWithPopup(auth, new GithubAuthProvider());
    setUser(response.user);
    return response.user;
  };

  const signout = async () => {
    await signOut(auth);
    setUser(undefined);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
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
