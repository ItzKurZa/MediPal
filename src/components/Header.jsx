import React, { useState } from 'react';
import { Menu, Activity, UserCircle } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function Header({ toggleSidebar }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center sticky top-0 z-10">
      <button
        onClick={toggleSidebar}
        className="md:hidden mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>
      
      <div className="flex items-center">
        <Activity size={24} className="text-primary-500 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800">MediPal</h1>
      </div>
      
      <div className="ml-auto flex items-center">
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors"
        >
          <UserCircle size={20} />
          <span className="text-sm">Sign In</span>
        </button>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </header>
  );
}

export default Header;