import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SingleDownloader from './pages/SingleDownloader';
import BulkDownloader from './pages/BulkDownloader';
import { MessageCircle } from 'lucide-react';

type Page = 'landing' | 'single' | 'bulk';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'single':
        return <SingleDownloader onBack={() => setCurrentPage('landing')} />;
      case 'bulk':
        return <BulkDownloader onBack={() => setCurrentPage('landing')} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      {/* Page Content */}
      <div className="min-h-screen">
        {renderPage()}
      </div>

      {/* WhatsApp Button – CLEAN, NO WHITE BORDER */}
      <a
        href="https://whatsapp.com/channel/0029Vb6cRL43GJOqdGUq4q0Q"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Join WhatsApp Channel"
      >
        <div className="relative">
          {/* Pulse Ring */}
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 scale-110"></div>
          
          {/* Main Button – NO WHITE BORDER */}
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/70">
            <MessageCircle className="w-8 h-8" fill="white" strokeWidth={0} />
          </div>

          {/* Tooltip */}
          <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <div className="bg-black/95 text-white text-xs font-bold rounded-lg py-2 px-4 shadow-xl">
              Join WhatsApp Channel
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black/95"></div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default App;
