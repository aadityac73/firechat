import { createContext, useContext, useReducer } from 'react';
import { useAuth } from './auth';

type ChatContextProviderType = {
  children: React.ReactNode;
};

const ChatContext = createContext<any>(null);

export const useChat = () => useContext(ChatContext);

export const ChatContextProvider: React.FC<ChatContextProviderType> = ({
  children
}) => {
  const currentUser = useAuth();

  const INITIAL_STATE = {
    chatId: null,
    user: {}
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser && currentUser.uid
              ? currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
              : null
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
