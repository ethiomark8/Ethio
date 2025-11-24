import React from 'react';
import { Settings, Heart, List, LogOut, Star, User, Moon, Sun } from 'lucide-react';

interface ProfileProps {
    isDark: boolean;
    toggleTheme: () => void;
}

const Profile: React.FC<ProfileProps> = ({ isDark, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
        {/* Header Background */}
        <div className="h-48 bg-gradient-to-r from-ethio-green to-teal-600 relative">
            <div className="absolute top-4 right-4 text-white cursor-pointer hover:bg-white/20 p-2 rounded-full">
                <Settings size={24} />
            </div>
        </div>

        {/* Profile Card */}
        <div className="px-4 -mt-16 relative z-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden -mt-16 bg-gray-200">
                     <img src="https://picsum.photos/200/200" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="mt-3 text-xl font-bold dark:text-white">Abebe Kebede</h2>
                <p className="text-gray-500 text-sm">Addis Ababa, Ethiopia</p>
                
                <div className="flex items-center gap-1 mt-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                    <Star size={14} className="text-ethio-yellow fill-ethio-yellow" />
                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">4.8</span>
                    <span className="text-xs text-yellow-600 dark:text-yellow-500">(12 reviews)</span>
                </div>
            </div>
        </div>

        {/* Menu */}
        <div className="mt-6 px-4 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <MenuItem icon={<List size={20} />} label="My Listings" count={3} />
                <MenuItem icon={<Heart size={20} />} label="Saved Items" count={12} />
                <MenuItem icon={<BriefcaseIcon />} label="Applied Jobs" count={2} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                 <button 
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                            {isDark ? <Sun size={20}/> : <Moon size={20}/>}
                        </div>
                        <span className="font-medium dark:text-white">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </div>
                </button>
                <MenuItem icon={<User size={20} />} label="Edit Profile" />
            </div>

             <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 flex items-center gap-3 text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10">
                    <LogOut size={20} />
                    <span className="font-medium">Log Out</span>
                </div>
             </div>
        </div>
    </div>
  );
};

const MenuItem = ({ icon, label, count }: { icon: React.ReactNode, label: string, count?: number }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                {icon}
            </div>
            <span className="font-medium dark:text-white">{label}</span>
        </div>
        {count !== undefined && (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full font-bold">
                {count}
            </span>
        )}
    </div>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
)

export default Profile;
