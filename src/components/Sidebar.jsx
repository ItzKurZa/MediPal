import React from 'react';
import { PlusCircle, MessageSquare, Trash2, X } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { formatDate } from '../utils/helpers';

function Sidebar({ isMobileOpen, toggleMobileSidebar }) {
  const { chats, currentChat, createNewChat, selectChat, deleteChat } = useChat();
  
  const groupedChats = chats.reduce((groups, chat) => {
    const dateKey = formatDate(chat.createdAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(chat);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedChats).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return 0;
  });

  return (
    <>
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMobileSidebar}
        />
      )}
      
      <aside 
        className={`bg-gray-50 w-72 h-screen flex flex-col border-r border-gray-200 
                   fixed md:relative z-30 transition-transform duration-300 ease-in-out
                   ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <button 
          className="md:hidden absolute right-4 top-[12px] text-gray-500 hover:text-gray-700"
          onClick={toggleMobileSidebar}
        >
          <X size={24} />
        </button>
        
        <div className="flex-1 overflow-y-auto py-4">
          {sortedDates.map(date => (
            <div key={date} className="mb-4">
              <h3 className="px-4 mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {date}
              </h3>
              <ul>
                {groupedChats[date].map(chat => (
                  <li key={chat.id} className="px-2 group">
                    <button
                      onClick={() => {
                        selectChat(chat.id);
                        if (isMobileOpen) toggleMobileSidebar();
                      }}
                      className={`flex items-center w-full px-2 py-2.5 text-sm rounded-md text-left transition-colors
                                ${currentChat?.id === chat.id 
                                  ? 'bg-primary-50 text-primary-700' 
                                  : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <MessageSquare 
                        size={16} 
                        className={`mr-2 ${currentChat?.id === chat.id ? 'text-primary-500' : 'text-gray-400'}`} 
                      />
                      <span className="flex-1 truncate">{chat.title}</span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="text-gray-400 hover:text-red-500 ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Delete chat"
                      >
                        <Trash2 size={14} />
                      </button>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={createNewChat}
            className="flex items-center justify-center w-full gap-2 py-2.5 px-4 mb-4 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            <PlusCircle size={16} />
            <span>New chat</span>
          </button>
          
          <div className="text-xs text-gray-500 text-center">
            MediPal AI Assistant<br />
            © {new Date().getFullYear()}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;