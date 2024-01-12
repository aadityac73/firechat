import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { useAuth } from 'main-app/context/auth';
import { useChat } from 'main-app/context/chat';
import { db } from 'main-app/firebase/firebase';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const ChatInput = () => {
  const [msg, setMsg] = useState('');
  const currentUser = useAuth();
  const { data } = useChat();
  const handleMsgSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = msg;
    setMsg('');

    const userChat = (await getDoc(doc(db, 'userChats', data?.user?.uid))).data();

    const chatData = userChat[data.chatId]
    
    await updateDoc(doc(db, 'chats', data?.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: message,
        senderId: currentUser?.uid,
        date: Timestamp.now()
      })
    });

    await updateDoc(doc(db, 'userChats', currentUser?.uid), {
      [data.chatId + '.lastMessage']: message,
      [data.chatId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', data?.user?.uid), {
      [data.chatId + '.lastMessage']: message,
      [data.chatId + '.date']: serverTimestamp(),
      [data.chatId + '.unreadMessages'] : chatData.unreadMessages ? chatData.unreadMessages + 1 : 1
    });
  };

  return (
    <div className="h-[60px]">
      <form
        onSubmit={handleMsgSend}
        className="relative h-full flex items-center"
      >
        <input
          autoFocus
          placeholder="Type something..."
          className="absolute inset-0 focus:outline-none bg-[#202c33] text-lg pl-4 pr-[8rem]"
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="z-[1111] absolute right-[2rem] bg-black text-sm px-3 py-1.5">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
