import { useRef, useEffect, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import { useChat } from 'main-app/context/chat';
import { defaultAvatar } from 'main-app/utils/constants';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from 'main-app/firebase/firebase';
import { useAuth } from 'main-app/context/auth';
import dayjs from 'dayjs';

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const { data } = useChat();
  const currentUser = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data?.chatId) {
      const updateUserChat = async () => {
        await updateDoc(doc(db, 'userChats', currentUser?.uid), {
          [data.chatId + '.unreadMessages'] : 0
        });
      }
      const unsub = onSnapshot(doc(db, 'chats', data.chatId), (chat) => {
        const newMsgs = chat?.data()?.messages?.reduce((obj, msg) => {
          const msgDate = dayjs(msg.date.toDate()).format('DD/MM/YYYY');
          const todayDate = dayjs().format('DD/MM/YYYY');
          const yesterdayDate = dayjs().subtract(1, 'day').format('DD/MM/YYYY');
          if (msgDate === todayDate) {
            if (obj['Today']) {
              obj['Today'].push(msg);
            } else {
              obj['Today'] = [];
              obj['Today'].push(msg);
            }
          } else if (msgDate === yesterdayDate) {
            if (obj['Yesterday']) {
              obj['Yesterday'].push(msg);
            } else {
              obj['Yesterday'] = [];
              obj['Yesterday'].push(msg);
            }
          } else {
            if (obj[msgDate]) {
              obj[msgDate].push(msg);
            } else {
              obj[msgDate] = [];
              obj[msgDate].push(msg);
            }
          }

          return obj;
        }, {});

        console.log('msg object', newMsgs);

        setMessages(newMsgs);
        
      });

      updateUserChat()

      return () => {
        unsub();
      };
    }
  }, [data?.chatId]);

  return (
    <div className="w-[70%] text-white">
      {/* chat header */}
      {data?.chatId ? (
        <>
          <div className="bg-[#5d5b8d] h-[60px] flex items-center px-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={data?.user?.photoURL ? data?.user?.photoURL : defaultAvatar}
              alt="avatar"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
            <span className="ml-2">{data?.user?.displayName}</span>
          </div>

          {/* chat messages */}
          <div
            ref={ref}
            className="h-[calc(90vh-120px)] bg-[#171332] py-3 overflow-y-auto"
          >
            {Object.keys(messages).map((item) => {
              return (
                <div>
                  <div className="flex justify-center items-center sticky top-1">
                    <span className="text-white text-sm bg-[#2f2d5277] px-2 py-[3px] rounded-[3px]">
                      {item}
                    </span>
                  </div>
                  {messages[item].map((msg) => (
                    <Message
                      key={msg.id}
                      message={msg.text}
                      time={msg.date.toDate()}
                      isMe={msg.senderId === currentUser?.uid}
                    />
                  ))}
                </div>
              );
            })}
          </div>
          <ChatInput />
        </>
      ) : (
        <div className="h-[90vh] bg-[#171332] flex items-center justify-center">
          <h1 className="text-4xl font-poppins italic">
            Welcome to FireChat Web!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
