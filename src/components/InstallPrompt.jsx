import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 flex items-center justify-between w-[90%] max-w-md border border-gray-200 dark:border-gray-700">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Install M360 App</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Install our application on your device for a better experience.</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setShowPrompt(false)} 
          className="text-xs px-3 py-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Later
        </button>
        <button 
          onClick={handleInstallClick} 
          className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
        >
          Install
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
