import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import PostItem from './components/PostItem';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import { ViewState, Listing } from './types';
import { CITIES, CATEGORIES, FEATURED_LISTINGS } from './constants';
import { Search, MapPin, Bell, Filter, ShoppingBag, Car, Home, Briefcase, Wrench, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [splashFinished, setSplashFinished] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedListings, setSavedListings] = useState<string[]>([]);
  
  // Theme state with persistence
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (splashFinished) {
      // Simulate data fetching delay for shimmer effect
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [splashFinished]);

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedListings(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedListings.includes(id);

  if (!splashFinished) {
    return <SplashScreen onFinish={() => setSplashFinished(true)} />;
  }

  // --- Components defined inline to share state easily in this single file architecture ---

  const HomeView = () => (
    <div className="animate-fade-in">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xl dark:text-white">ETHIO</span>
            <span className="text-ethio-yellow text-xl">🛍</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
               <Bell size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for anything..." 
            className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl py-3 pl-10 pr-10 outline-none focus:ring-2 ring-ethio-green/50 border border-transparent focus:border-ethio-green transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-600">
             <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 px-1">Browse Categories</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {isLoading 
              ? Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col items-center min-w-[70px] gap-2 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
                    <div className="w-12 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  </div>
                ))
              : CATEGORIES.map(cat => {
                  const getIcon = () => {
                     switch(cat.id) {
                        case 'items': return <ShoppingBag size={28} />;
                        case 'cars': return <Car size={28} />;
                        case 'properties': return <Home size={28} />;
                        case 'jobs': return <Briefcase size={28} />;
                        case 'services': return <Wrench size={28} />;
                        default: return <ShoppingBag size={28} />;
                     }
                  };

                  const getColorClass = () => {
                     switch(cat.id) {
                        case 'items': return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
                        case 'cars': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
                        case 'properties': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
                        case 'jobs': return 'bg-ethio-green/10 text-ethio-green dark:bg-green-900/20 dark:text-green-400';
                        case 'services': return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
                        default: return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
                     }
                  };

                  return (
                  <button 
                    key={cat.id} 
                    onClick={() => cat.id === 'jobs' ? setCurrentView('jobs') : null}
                    className="flex flex-col items-center min-w-[70px] gap-2"
                  >
                    <div className={`w-16 h-16 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center transition-colors ${getColorClass()}`}>
                       {getIcon()}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                  </button>
                )})
            }
          </div>
        </div>

        {/* Trending / Featured */}
        <div>
           <div className="flex justify-between items-center mb-3">
             <h2 className="text-lg font-bold dark:text-white">Featured Listings</h2>
             <span className="text-ethio-green text-sm">See All</span>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
             {isLoading
               ? Array(4).fill(0).map((_, i) => (
                   <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
                     <div className="h-32 bg-gray-200 dark:bg-gray-700"></div>
                     <div className="p-3 space-y-2">
                       <div className="w-10 h-2.5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                       <div className="w-full h-3.5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                       <div className="w-2/3 h-3.5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                       <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                     </div>
                   </div>
                 ))
               : FEATURED_LISTINGS.map(item => (
                   <div 
                     key={item.id} 
                     onClick={() => { setSelectedListing(item); setCurrentView('detail'); }}
                     className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-transform"
                   >
                     <div className="h-32 bg-gray-200 relative">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                       <button 
                          onClick={(e) => toggleSave(item.id, e)}
                          className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 rounded-full p-1.5 backdrop-blur-sm transition-transform active:scale-90 shadow-sm"
                       >
                         <Heart size={16} className={isSaved(item.id) ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-300"} />
                       </button>
                     </div>
                     <div className="p-3">
                       <p className="text-xs text-ethio-green font-bold uppercase mb-1">{item.category}</p>
                       <h3 className="font-semibold text-sm line-clamp-2 mb-2 dark:text-white h-10">{item.title}</h3>
                       <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                         <MapPin size={10} /> {item.location}
                       </div>
                       <p className="font-bold text-gray-900 dark:text-white">{item.price} {item.currency}</p>
                     </div>
                   </div>
                 ))
             }
           </div>
        </div>

         {/* Location Pills */}
         <div>
            <h2 className="text-sm font-bold mb-3 dark:text-white">Popular Cities</h2>
            <div className="flex flex-wrap gap-2">
                {CITIES.slice(0, 5).map(city => (
                    <span key={city} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">
                        {city}
                    </span>
                ))}
            </div>
         </div>
      </div>
    </div>
  );

  const ListingDetail = () => {
    if (!selectedListing) return null;
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen relative animate-slide-up pb-24">
        {/* Navigation Controls */}
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between p-4 pointer-events-none">
          <button 
              onClick={() => setCurrentView('home')}
              className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full p-2 text-black dark:text-white pointer-events-auto hover:bg-white dark:hover:bg-black transition-colors shadow-sm"
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={(e) => toggleSave(selectedListing.id, e)}
            className="bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full p-2 text-black dark:text-white pointer-events-auto hover:bg-white dark:hover:bg-black transition-colors shadow-sm active:scale-95"
          >
            <Heart size={24} className={isSaved(selectedListing.id) ? "fill-red-500 text-red-500" : "text-white dark:text-gray-200"} />
          </button>
        </div>

        <div className="h-72 bg-gray-200 relative">
             <img src={selectedListing.image} className="w-full h-full object-cover" alt="Detail" />
             <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                1/5 Photos
             </div>
        </div>
        <div className="p-6 -mt-6 bg-white dark:bg-gray-900 rounded-t-3xl relative z-10 transition-colors duration-300">
            <div className="flex justify-between items-start mb-2">
                 <span className="px-3 py-1 bg-ethio-green/10 text-ethio-green rounded-full text-xs font-bold uppercase">{selectedListing.category}</span>
                 <span className="text-gray-400 text-xs">{selectedListing.postedAt}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 dark:text-white">{selectedListing.title}</h1>
            <p className="text-3xl font-bold text-ethio-green mb-4">{selectedListing.price} <span className="text-sm text-gray-500">{selectedListing.currency}</span></p>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <MapPin size={16} /> {selectedListing.location}
            </div>

            <h3 className="font-bold mb-2 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {selectedListing.description}
            </p>

            <h3 className="font-bold mb-3 dark:text-white">Seller Info</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-20 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${selectedListing.seller.name}&background=random`} alt={selectedListing.seller.name} />
                    </div>
                    <div>
                        <p className="font-bold dark:text-white">{selectedListing.seller.name}</p>
                        <p className="text-xs text-gray-500">⭐ {selectedListing.seller.rating} Rating</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 p-4 border-t border-gray-100 dark:border-gray-800 flex gap-4 z-20">
            <button className="flex-1 bg-ethio-green text-white py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-transform">Call Seller</button>
            <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-xl font-bold border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform">Message</button>
        </div>
      </div>
    );
  };

  const MessagesView = () => (
      <div className="p-4 pt-12 animate-fade-in pb-24">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Messages</h2>
          <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://ui-avatars.com/api/?name=Dawit+Mekonnen&background=random" alt="User" />
                  </div>
                  <div className="flex-1">
                      <div className="flex justify-between mb-1">
                          <h4 className="font-bold dark:text-white">Dawit Mekonnen</h4>
                          <span className="text-xs text-gray-400">10:30 AM</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">Is the price negotiable for the Vitz?</p>
                  </div>
              </div>
              <div className="text-center mt-10 text-gray-400 text-sm">No more messages</div>
          </div>
      </div>
  );

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {currentView === 'home' && <HomeView />}
      {currentView === 'detail' && <ListingDetail />}
      {currentView === 'post' && <PostItem onBack={() => setCurrentView('home')} onSuccess={() => setCurrentView('home')} />}
      {currentView === 'jobs' && <Jobs />}
      {currentView === 'messages' && <MessagesView />}
      {currentView === 'profile' && <Profile isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />}
    </Layout>
  );
};

export default App;