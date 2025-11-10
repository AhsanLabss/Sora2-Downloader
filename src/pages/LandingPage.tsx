import { Download, Package, Zap, Shield, Globe, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'single' | 'bulk') => void;
}

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white overflow-hidden">

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-900/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-800/20 rounded-full blur-3xl animate-ping" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-6xl mx-auto text-center relative z-10">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-900/30 backdrop-blur-md border border-purple-700/50 rounded-full px-5 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Pakistan's #1 Sora Downloader • 100% Working Nov 2025
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-tight animate-fade-up">
            SORA DOWNLOADER
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light animate-fade-up animation-delay-200">
            Download any Sora AI video in <span className="text-purple-400 font-bold">4K</span> — 
            No watermark • No login
            <div> Made By Ahsan Labs</div>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16 animate-fade-up animation-delay-400">
            <button
              onClick={() => onNavigate('single')}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6 group-hover:translate-y-[-4px] transition-transform" />
              Download Single Video
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            <button
              onClick={() => onNavigate('bulk')}
              className="group bg-white/10 backdrop-blur-md border border-purple-500/50 hover:bg-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Package className="w-6 h-6" />
              Bulk Download (ZIP)
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-up animation-delay-600">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Downloads in 2-3 seconds even on 4G", color: "from-yellow-500 to-orange-500" },
              { icon: Shield, title: "100% Safe", desc: "No virus • No tracking • No login required", color: "from-emerald-500 to-teal-500" },
              { icon: Globe, title: "Pakistan Optimized", desc: "Bypasses all ISP blocks automatically", color: "from-purple-500 to-pink-500" },
            ].map((feat, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <feat.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 text-sm text-gray-400 animate-fade-up animation-delay-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Used by 87,000+ Pakistanis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Ad-Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
             Made By Ahsan Labs 
            
          </p>
          <p className="text-gray-600 text-xs mt-4">
            © 2025 SoraDownloader.pk • Unofficial Tool • Not affiliated with OpenAI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;