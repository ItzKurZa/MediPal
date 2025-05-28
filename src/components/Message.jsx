import React from 'react';
import { Activity } from 'lucide-react';

function Message({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 relative`}>
      {/* Message container with max width */}
      <div 
        className={`
          relative max-w-[85%] px-4 py-3 rounded-lg 
          ${isUser 
            ? 'bg-primary-500 text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none ml-10'}
        `}
      >
        {/* Avatar for assistant messages */}
        {!isUser && (
          <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
            <Activity size={16} />
          </div>
        )}
        
        {/* Message content */}
        <div className="prose prose-sm max-w-none">
          {message.content.split('\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Timestamp */}
        <div 
          className={`text-xs mt-1 
            ${isUser ? 'text-primary-100' : 'text-gray-400'}`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default Message;