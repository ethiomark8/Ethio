import React, { useEffect, useState } from 'react';
import { WifiOff, X, RefreshCw } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      checkNetwork();
    }
  }, [loadingProgress]);

  const checkNetwork = () => {
    if (navigator.onLine) {
      setTimeout(onFinish, 500); // Small delay for smoothness
    } else {
      setShowNetworkError(true);
    }
  };

  const handleRetry = () => {
    setShowNetworkError(false);
    // Simulate retry delay
    setTimeout(() => {
      checkNetwork();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ethio-green via-gray-900 to-gray-900"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-slide-up">
        <h1 className="text-5xl font-bold mb-2 tracking-tighter">
          <span className="text-white">ETHIO</span>
          <span className="text-ethio-yellow">🛍</span>
        </h1>
        <p className="text-gray-400 text-sm tracking-widest uppercase mb-8">Marketplace</p>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mb-4 relative">
          <div 
            className="h-full bg-gradient-to-r from-ethio-green via-ethio-yellow to-ethio-red transition-all duration-100 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 font-mono">0941090959</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-center opacity-60">
        <p className="text-[10px] text-gray-500">POWERED BY AFROTIE TECH</p>
      </div>

      {/* Network Error Dialog */}
      {showNetworkError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl transform scale-100 transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 text-red-500">
                <WifiOff size={24} />
                <h3 className="font-bold text-white text-lg">No Internet</h3>
              </div>
              <button onClick={() => setShowNetworkError(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 text-sm mb-6">
              Please check your connection and try again. For support:
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded-xl mb-6 space-y-2 border border-gray-700">
              <p className="text-ethio-yellow font-mono text-sm">☎️ 0942303002</p>
              <p className="text-blue-400 font-mono text-sm">📧 Ethiopianmark8@gmail.com</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleRetry}
                className="flex-1 bg-ethio-green hover:bg-green-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw size={18} /> Retry
              </button>
              <button 
                onClick={() => setShowNetworkError(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
