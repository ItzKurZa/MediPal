import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateId } from '../utils/helpers';
import { sendMessage } from '../services/api';

const ChatContext = createContext(undefined);

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load chats from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats).map(chat => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChats(parsedChats);
        if (parsedChats.length > 0) {
          setCurrentChat(parsedChats[0]);
        }
      } catch (error) {
        console.error('Error parsing saved chats:', error);
      }
    } else {
      // Create a default chat if none exists
      createNewChat();
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = () => {
    const newChat = {
      id: generateId(),
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
    return newChat;
  };

  const selectChat = (chatId) => {
    const selected = chats.find(chat => chat.id === chatId) || null;
    setCurrentChat(selected);
  };

  const sendMessage = async (content) => {
    if (!currentChat) return;

    // Create user message
    const userMessage = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Update current chat with user message
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      updatedAt: new Date(),
      title: currentChat.messages.length === 0 ? truncateText(content) : currentChat.title,
    };

    // Update chats state
    setChats(chats.map(chat => (chat.id === currentChat.id ? updatedChat : chat)));
    setCurrentChat(updatedChat);

    // Set loading state
    setIsLoading(true);

    try {
      // Get response from API
      const responseContent = await sendMessage(content);

      // Create assistant message
      const assistantMessage = {
        id: generateId(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      // Update chat with assistant response
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
        updatedAt: new Date(),
      };

      // Update chats state with assistant response
      setChats(chats.map(chat => (chat.id === currentChat.id ? finalChat : chat)));
      setCurrentChat(finalChat);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChat = (chatId) => {
    // If we're deleting the last chat, create a new one first
    if (chats.length === 1 && chats[0].id === chatId) {
      const newChat = createNewChat();
      setChats([newChat]); // Replace the old chat with the new one
    } else {
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      setChats(updatedChats);
      
      // If the current chat is deleted, select the first available chat
      if (currentChat && currentChat.id === chatId) {
        setCurrentChat(updatedChats[0]);
      }
    }
  };

  // Helper function to truncate text for chat titles
  function truncateText(text) {
    const maxLength = 30;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        isLoading,
        createNewChat,
        selectChat,
        sendMessage,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}