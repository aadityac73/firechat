import cn from 'classnames';
import { defaultAvatar } from 'main-app/utils/constants';

type ChatcardProps = {
  isSearch?: boolean;
  image: string;
  name: string;
  lastMessage?: string;
  onClick?: () => void;
  unreadMessages?: number;
};

const Chatcard: React.FC<ChatcardProps> = ({
  onClick,
  isSearch = false,
  image,
  name,
  lastMessage,
  unreadMessages
}) => {
  return (
    <li
      onClick={isSearch ? () => null : onClick}
      className="flex p-3 items-center cursor-pointer hover:bg-theme-bg-secondary-bold"
    >
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={image ? image : defaultAvatar}
        alt="user"
        onError={(e) => {
          e.target.src = defaultAvatar;
        }}
      />
      <div className="flex justify-between w-full">
        <div className="ml-3">
          <span
            className={cn('block leading-[17px]', {
              ['font-semibold']: unreadMessages && unreadMessages > 0
            })}
          >
            {name}
          </span>
          {!isSearch && (
            <span
              className={cn('block text-[.85rem] text-gray-400 pt-1', {
                ['font-semibold']: unreadMessages && unreadMessages > 0
              })}
            >
              {lastMessage}
            </span>
          )}
        </div>
        {unreadMessages && unreadMessages > 0 ? <span
          className={cn(
            'block mr-8 font-semibold text-theme-bg-secondary',
            'bg-white rounded-full h-6 w-6 text-center'
          )}
        >
          {unreadMessages}
        </span> : <></>}
      </div>
    </li>
  );
};

export default Chatcard;
