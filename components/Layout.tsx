import React from 'react';
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  // Hide nav on detail/post pages for immersion
  const hideNav = ['post', 'detail'].includes(currentView);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content Area */}
      <main className={`${!hideNav ? 'pb-24' : ''}`}>
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      {!hideNav && (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-30 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
          <div className="flex justify-around items-center px-2 py-2">
            
            <NavItem 
              active={currentView === 'home'} 
              onClick={() => setView('home')} 
              icon={<Home size={24} />} 
              label="Home" 
            />
            
            <NavItem 
              active={currentView === 'jobs'} 
              onClick={() => setView('jobs')} 
              icon={<Search size={24} />} 
              label="Jobs" 
            />

            {/* Floating Action Button for Post */}
            <div className="relative -top-6">
              <button 
                onClick={() => setView('post')}
                className="w-14 h-14 bg-ethio-green rounded-full flex items-center justify-center text-white shadow-lg shadow-green-600/30 transform transition-transform active:scale-95 border-4 border-gray-50 dark:border-gray-900"
              >
                <PlusCircle size={28} />
              </button>
            </div>

            <NavItem 
              active={currentView === 'messages'} 
              onClick={() => setView('messages')} 
              icon={<MessageCircle size={24} />} 
              label="Chat" 
            />

            <NavItem 
              active={currentView === 'profile'} 
              onClick={() => setView('profile')} 
              icon={<User size={24} />} 
              label="Profile" 
            />

          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 w-16 transition-colors ${
      active ? 'text-ethio-green' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
    }`}
  >
    {icon}
    <span className="text-[10px] font-medium mt-1">{label}</span>
  </button>
);

export default Layout;
