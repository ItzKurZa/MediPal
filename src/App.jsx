import React, { useState } from 'react';
import { ChatProvider } from './contexts/ChatContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatMain from './components/ChatMain';

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen} 
          toggleMobileSidebar={toggleMobileSidebar} 
        />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header toggleSidebar={toggleMobileSidebar} />
          <ChatMain />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;