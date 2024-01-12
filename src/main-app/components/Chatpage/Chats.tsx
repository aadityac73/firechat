import { useEffect, useState } from 'react';
import Chatcard from './Chatcard';
import { useAuth } from 'main-app/context/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'main-app/firebase/firebase';
import { useChat } from 'main-app/context/chat';

const Chats = () => {
  const [chats, setChats] = useState<any>([]);
  const currentUser = useAuth();
  const {dispatch} = useChat()

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser.uid),
        (chat) => {
          setChats(chat.data());
        }
      );

      return () => {
        unsub();
      };
    }
  }, [currentUser?.uid]);

  const handleChatClick = (u) => () => {
    dispatch({
      type: 'CHANGE_USER',
      payload: u
    })
  }

  return (
    <ul className="text-white h-[calc(90vh-96px)] overflow-y-auto">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => (
          <Chatcard
            onClick={handleChatClick(chat[1]?.userInfo)}
            key={chat[0]}
            name={chat[1]?.userInfo?.displayName}
            image={chat[1]?.userInfo?.photoURL}
            lastMessage={chat[1].lastMessage}
            unreadMessages={chat[1].unreadMessages}
          />
        ))}
    </ul>
  );
};

export default Chats;
