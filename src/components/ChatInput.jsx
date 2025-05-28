import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white py-3 px-4">
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2 max-w-3xl mx-auto"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message MediChat..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none min-h-[48px] max-h-[200px]"
            rows={1}
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`flex-shrink-0 rounded-full p-2.5 self-start mt-[5px] ${
            message.trim() && !isLoading
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          } transition-colors`}
        >
          <Send size={20} />
        </button>
      </form>
      
      {/* Helper text */}
      <div className="text-xs text-gray-500 mt-2 text-center max-w-3xl mx-auto">
        MediChat is a medical AI assistant. It may provide inaccurate information. 
        Please consult healthcare professionals for medical advice.
      </div>
    </div>
  );
}

export default ChatInput;