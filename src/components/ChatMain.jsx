import React, { useRef, useEffect } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import { useChat } from '../contexts/ChatContext';
import { Activity } from 'lucide-react';

function ChatMain() {
  const { currentChat, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  // Sample questions that can be clicked
  const sampleQuestions = [
    ["What are common symptoms of the flu?", "How much water should I drink daily?"],
    ["What can help with headaches?", "How can I improve my sleep?"]
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleQuestionClick = (question) => {
    sendMessage(question);
  };

  return (
    <main className="flex-1 flex flex-col h-full">
      {/* Messages area with padding top to account for header */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {currentChat && currentChat.messages.length > 0 ? (
          <div className="max-w-3xl mx-auto mt-12">
            {currentChat.messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-500 animate-pulse rounded-tl-none">
                  Thinking...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Activity size={32} className="text-primary-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to MediChat
              </h2>
              <p className="text-gray-600 mb-6">
                Your AI medical assistant, designed to provide informational support on health-related questions.
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-2">Try asking:</p>
                <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
                  {sampleQuestions.map((row, rowIndex) => (
                    row.map((question, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleQuestionClick(question)}
                        className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors text-left"
                      >
                        {question}
                      </div>
                    ))
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </main>
  );
}

export default ChatMain;