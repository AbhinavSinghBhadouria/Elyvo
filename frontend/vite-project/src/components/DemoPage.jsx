import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Code, 
  Video, 
  MessageSquare, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Zap,
  Activity,
  Layers
} from 'lucide-react';

function DemoPage() {
  const navigate = useNavigate();

  const demoSteps = [
    {
      icon: <Layers className="size-6 text-blue-400" />,
      title: "Premium Workspace",
      desc: "Experience a distraction-free, dark-mode environment optimized for deep technical focus.",
      image: "/collaboration-ide.png"
    },
    {
      icon: <Activity className="size-6 text-emerald-400" />,
      title: "Real-time Sync",
      desc: "Every keystroke and cursor movement is synchronized across continents with zero latency.",
      image: "/hero-tech.png"
    },
    {
      icon: <Sparkles className="size-6 text-amber-400" />,
      title: "AI Co-pilot",
      desc: "Intelligent hints and code reviews powered by Groq Llama-3, designed to assist without hand-holding.",
      image: "/pro-insight.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020203] text-white font-inter overflow-x-hidden selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-8 py-8 flex items-center justify-between max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Interactive Preview</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-40">
        <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Play className="size-3 text-blue-400 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Walkthrough</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 italic">Redefined.</span>
            </h1>

            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                Take a closer look at the features that make Elyvo the choice for 
                modern engineering teams building tomorrow's tech.
            </p>
        </div>

        {/* Feature Showcase */}
        <div className="mt-40 space-y-40">
          {demoSteps.map((step, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-8">
                <div className="size-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                  {step.icon}
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tight">{step.title}</h2>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Zap className="size-3 text-amber-500" /> High Performance
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="size-3 text-emerald-500" /> Secure by Default
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full relative group">
                <div className="absolute -inset-4 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative rounded-3xl border border-white/5 bg-[#0a0a0f] p-2 shadow-2xl overflow-hidden aspect-video">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-60 text-center space-y-12 py-32 rounded-[4rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2" />
            
            <div className="relative z-10 space-y-8">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Ready to experience it?</h2>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-12 py-6 bg-white text-black rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
                >
                  Start Building Now
                </button>
            </div>
        </div>
      </main>

      <footer className="relative z-10 px-8 py-20 border-t border-white/5 text-center">
         <p className="text-[10px] font-bold text-slate-600 uppercase tracking-premium">
            Elyvo Version 2.0 • The Future of Engineering Interviews
         </p>
      </footer>

      <style>{`
        .tracking-premium {
            letter-spacing: 0.3em;
        }
      `}</style>
    </div>
  );
}

export default DemoPage;
