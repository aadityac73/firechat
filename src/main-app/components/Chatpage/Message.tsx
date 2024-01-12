import dayjs from 'dayjs';
import { useEffect,useRef } from 'react';

type MessageProps = {
  isMe?: boolean;
  message: string;
  time: string;
};

const Message: React.FC<MessageProps> = ({ isMe = false, message, time }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const timestamp = dayjs(time).format('HH:mm');
  return (
    <div ref={ref} className="py-2 px-12">
      {isMe ? (
        <>
          <p className="ml-auto w-max max-w-[300px] px-3 py-2 rounded-xl rounded-tr-none bg-theme-bg-secondary-bold text-white">
            {message}
          </p>
          <p className="ml-auto w-max text-gray-500 text-xs">{timestamp}</p>
        </>
      ) : (
        <>
          <p className="w-max max-w-[300px] bg-[#202c33] text-white px-3 py-2 rounded-xl rounded-tl-none">
            {message}
          </p>
          <p className="w-max text-gray-500 text-xs">{timestamp}</p>
        </>
      )}
    </div>
  );
};

export default Message;
