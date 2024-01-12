import { useState } from 'react';
import Chatcard from './Chatcard';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from 'main-app/firebase/firebase';
import { useAuth } from 'main-app/context/auth';
import useDebounce from 'main-app/hooks/useDebounce';
import { useChat } from 'main-app/context/chat';

const Search = () => {
  // const [search, setSearch] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [err, setErr] = useState<boolean>(false);
  const currentUser = useAuth();
  const { dispatch } = useChat();

  const handleSearch = async (e: React.ChangeEvent) => {
    setErr(false);
    // setSearch(e.target.value)
    const userRef = collection(db, 'users');
    const q = query(
      userRef,
      where('searchName', '>=', e.target.value.toLowerCase()),
      where('searchName', '<=', e.target.value.toLowerCase() + '\uf8ff')
    );
    if (e.target.value === '') setUser(null);
    else {
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((item) => {
          if (item.exists()) setUser(item.data());
        });
      } catch (error) {
        setErr(true);
      }
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 700);

  const handleContactClick = async () => {
    if (currentUser && currentUser.uid) {
      const combineId =
        currentUser?.uid > user?.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      try {
        const res = await getDoc(doc(db, 'chats', combineId));
        if (!res.exists()) {
          await setDoc(doc(db, 'chats', combineId), { messages: [] });

          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combineId + '.userInfo']: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combineId + '.date']: serverTimestamp()
          });

          await updateDoc(doc(db, 'userChats', user.uid), {
            [combineId + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combineId + '.date']: serverTimestamp()
          });
        }
        setUser(null);
        dispatch({
          type: 'CHANGE_USER',
          payload: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      <div>
        <input
          onChange={debouncedSearch}
          className="w-full px-2 py-1 bg-theme-bg-secondary text-lg text-white focus:outline-none border-b border-gray"
          type="text"
          placeholder="Find a user"
        />
      </div>
      {err && (
        <div className="text-sm text-white text-center py-2 border-b border-gray">
          User not found!
        </div>
      )}
      {user && (
        <div
          onClick={handleContactClick}
          className="text-white border-b border-gray cursor-pointer"
        >
          <Chatcard isSearch image={user?.photoURL} name={user?.displayName} />
        </div>
      )}
    </div>
  );
};

export default Search;
