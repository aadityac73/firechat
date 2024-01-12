import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'main-app/firebase/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextProviderType = {
  children: React.ReactNode;
};

type AuthUser = {
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
};

export const AuthContext = createContext<AuthUser | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderType> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user)
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
