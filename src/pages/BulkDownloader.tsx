import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Package,
  Loader2,
  Download,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';

interface BulkDownloaderProps {
  onBack: () => void;
}

function BulkDownloader({ onBack }: BulkDownloaderProps) {
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [zipStarted, setZipStarted] = useState(false);

  const API_BASE = 'https://sora-api-ahsan.ahsanlabs.workers.dev/';

  const extractPostId = (url: string): string | null => {
    const match = url.match(/s_[a-f0-9]{32}/);
    return match ? match[0] : null;
  };

  const handleBulkDownload = async () => {
    const urlList = urls
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0);

    if (urlList.length === 0) {
      setError('Please paste at least one Sora link');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setZipStarted(true);
    setProgress({ current: 0, total: urlList.length });

    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      let successCount = 0;

      for (let i = 0; i < urlList.length; i++) {
        const url = urlList[i];
        const id = extractPostId(url);
        setProgress({ current: i + 1, total: urlList.length });

        if (!id) continue;

        try {
          const response = await fetch(`${API_BASE}/?id=${id}`);
          if (!response.ok) continue;

          const disposition = response.headers.get('Content-Disposition');
          let filename = `${id}.mp4`;
          if (disposition) {
            const match = disposition.match(/filename="?(.+?)("?);?$/);
            if (match) filename = match[1];
          }

          const blob = await response.blob();
          zip.file(filename, blob);
          successCount++;
        } catch (err) {
          console.error(`Failed to download ${id}`);
        }
      }

      if (successCount === 0) {
        setError('No videos were downloaded. Check your links.');
        setLoading(false);
        return;
      }

      // Generate ZIP
      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      // Silent download
      const blobUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `Sora_Pakistan_${successCount}_Videos_${new Date().toISOString().slice(0,10)}.zip`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);

      setSuccess(`Downloaded ${successCount} videos as ZIP!`);
      setUrls('');
      setTimeout(() => setSuccess(''), 7000);
    } catch (err) {
      setError('Failed to create ZIP. Try fewer videos (max 30 recommended)');
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
      setZipStarted(false);
    }
  };

  const linkCount = urls.split('\n').filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white overflow-x-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-900/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-800/20 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Back Button */}
        <div className="pt-6 pb-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
            <span className="font-medium text-lg">Back to Home</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-10">
          <div className="w-full max-w-5xl">

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/10">

              {/* Badge */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-purple-900/30 backdrop-blur-md border border-purple-700/50 rounded-full px-5 py-2.5 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-300 font-bold text-sm sm:text-base">PAKISTAN'S #1 BULK DOWNLOADER</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-tight">
                  Bulk ZIP Download
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mt-4">
                  Download <span className="text-purple-400 font-bold">100+ videos</span> as one ZIP file
                </p>
              </div>

              {/* Textarea */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-lg font-semibold text-white/90">
                    Paste Sora links (one per line)
                  </label>
                  <span className="text-purple-400 font-bold text-lg">
                    {linkCount} link{linkCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <textarea
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  placeholder={`https://sora.chatgpt.com/p/s_6910c6372de8819190b35e3b2ee3df1f
https://sora.chatgpt.com/p/s_690a2c7d00d88191a03ab14f6d992153
https://sora.chatgpt.com/p/s_1234567890abcdef1234567890abcdef
...paste up to 100 links`}
                  rows={14}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-white placeholder-white/40 font-mono text-sm leading-relaxed resize-none backdrop-blur-xl"
                  spellCheck={false}
                />
              </div>

              {/* Instant Start Flash */}
              {zipStarted && !loading && (
                <div className="mb-8 bg-blue-500/20 border border-blue-500/50 text-blue-300 px-6 py-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl animate-pulse">
                  <Package className="w-8 h-8" />
                  <p className="font-bold text-lg">ZIP creation started!</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-8 bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl">
                  <span className="text-2xl">Warning</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-8 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-6 py-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl animate-pulse">
                  <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-xl">{success}</p>
                    <p className="text-sm">Check your Downloads folder</p>
                  </div>
                </div>
              )}

              {/* Progress */}
              {loading && (
                <div className="mb-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <Loader2 className="w-9 h-9 animate-spin text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold">
                        {progress.current} / {progress.total} videos
                      </p>
                      <p className="text-purple-300">Creating ZIP file... please wait</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
                      style={{ width: `${(progress.current / progress.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={handleBulkDownload}
                disabled={loading || linkCount === 0}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-700 text-white font-bold py-8 rounded-3xl transition-all duration-200 flex items-center justify-center gap-6 text-2xl sm:text-3xl shadow-2xl disabled:cursor-not-allowed mb-10"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-11 h-11 animate-spin" />
                    Creating ZIP File...
                  </>
                ) : (
                  <>
                    
                    DOWNLOAD ALL AS ZIP
                  
                  </>
                )}
                <div className="absolute inset-0 bg-white/30 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Zap, text: "Fast ZIP" },
                  { icon: Shield, text: "100% Safe" },
                  { icon: Globe, text: "No VPN" },
                  { icon: Sparkles, text: "Real Names" },
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

export default BulkDownloader;
