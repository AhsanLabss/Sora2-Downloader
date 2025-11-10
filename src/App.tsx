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
    <div className="min-h-screen relative">
      {/* Page Content */}
      {renderPage()}

      {/* WhatsApp Floating Button - ALWAYS VISIBLE */}
      <a
        href="https://whatsapp.com/channel/0029Vb6cRL43GJOqdGUq4q0Q" // CHANGE THIS TO YOUR NUMBER
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Main Button */}
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50">
            <MessageCircle className="w-8 h-8" fill="white" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">

          </div>
        </div>
      </a>

      {/* Optional: Extra spacing at bottom for mobile */}
      <div className="pb-24 md:pb-0"></div>
    </div>
  );
}

export default App;