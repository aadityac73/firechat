import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthContextProvider } from 'main-app/context/auth.tsx';
import { ChatContextProvider } from 'main-app/context/chat.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
