import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Video,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';

interface SingleDownloaderProps {
  onBack: () => void;
}

function SingleDownloader({ onBack }: SingleDownloaderProps) {
  const [url, setUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [justDownloaded, setJustDownloaded] = useState(false);

  const API_BASE = 'https://sora-api-ahsan.jodoffcl2.workers.dev';

  const extractId = (input: string): string | null => {
    const match = input.match(/s_[a-f0-9]{32}/);
    return match ? match[0] : null;
  };

  const triggerInstantDownload = (id: string) => {
    const a = document.createElement('a');
    a.href = `${API_BASE}/?id=${id}`;
    a.download = '';
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();

    setJustDownloaded(true);
    setTimeout(() => setJustDownloaded(false), 3000);

    fetch(`https://api.soracdn.workers.dev/api-proxy/https%3A%2F%2Fsora.chatgpt.com%2Fp%2F${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.post_info?.title) {
          setVideoTitle(data.post_info.title.replace(/[\r\n]/g, ' ').slice(0, 120));
        }
      })
      .catch(() => {});
  };

  const handleDownload = () => {
    const id = extractId(url);
    if (!id) {
      alert('Invalid link! Make sure it has s_ + 32 characters');
      return;
    }
    triggerInstantDownload(id);
    setUrl('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && url.trim()) handleDownload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white overflow-x-hidden">

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-900/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-800/20 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top Padding + Back Button */}
        <div className="pt-6 pb-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
            <span className="font-medium text-lg">Back to Home</span>
          </button>
        </div>

        {/* Main Content - Centered with max width */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-10">
          <div className="w-full max-w-3xl">

            {/* Glass Card */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/10">

              {/* Badge */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-purple-900/30 backdrop-blur-md border border-purple-700/50 rounded-full px-5 py-2.5 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-300 font-bold text-sm sm:text-base">FASTEST IN PAKISTAN</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-tight">
                  Instant Sora Download
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mt-4">
                  No loading • No spinner • Just <span className="text-purple-400 font-bold">pure speed</span>
                </p>
              </div>

              {/* Input */}
              <div className="mb-8">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Paste Sora link → press Enter or click below"
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-white placeholder-white/50 text-base sm:text-lg transition-all backdrop-blur-xl"
                  autoFocus
                />
              </div>

              {/* Success Flash */}
              {justDownloaded && (
                <div className="mb-8 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-6 py-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl animate-pulse">
                  <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Download Added Instantly!</p>
                    <p className="text-sm">Check your Downloads folder</p>
                  </div>
                </div>
              )}

              {/* Title Preview */}
              {videoTitle && (
                <div className="mb-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <p className="text-purple-300 text-sm mb-3 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Downloading:
                  </p>
                  <p className="text-white font-bold text-xl leading-tight">{videoTitle}</p>
                </div>
              )}

              {/* MAIN DOWNLOAD BUTTON */}
              <button
                onClick={handleDownload}
                disabled={!url.trim()}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-700 text-white font-bold py-7 rounded-3xl transition-all duration-200 flex items-center justify-center gap-5 text-2xl sm:text-3xl shadow-2xl disabled:cursor-not-allowed mb-10"
              >
               
                DOWNLOAD NOW
                
                <div className="absolute inset-0 bg-white/30 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Zap, text: "0.3 Second" },
                  { icon: Shield, text: "No Virus" },
                  { icon: Globe, text: "No VPN" },
                  { icon: Sparkles, text: "Real Name" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10 hover:bg-white/10 transition-all">
                    <item.icon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                    <p className="text-xs sm:text-sm text-gray-300 font-bold">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center text-gray-500 text-xs sm:text-sm">
                <p className="mb-1">
                   Made By Ahsan Labs
                </p>
                <p>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleDownloader;