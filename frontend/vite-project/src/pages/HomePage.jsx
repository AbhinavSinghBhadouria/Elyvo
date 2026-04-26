import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";
import { 
    ArrowRight, Video, Code, Shield, Users, 
    Zap, Sparkles, Globe, Lock, Cpu, MousePointer2, Check,
    Monitor, ShieldCheck, Activity, Layers, MessageSquare
} from "lucide-react";
import { useEffect, useRef } from "react";

function HomePage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-active");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#020203] text-slate-100 selection:bg-blue-500/30 selection:text-white custom-scrollbar overflow-x-hidden font-inter">
            
            {/* Soft Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[1200px] h-[1200px] bg-blue-600/[0.03] blur-[200px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-600/[0.03] blur-[180px]" />
            </div>

            {/* NAV BAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 md:px-16 bg-[#020203]/40 backdrop-blur-xl border-b border-white/[0.03]">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="size-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Zap className="size-5 text-white fill-white/20" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase tracking-premium">Elyvo</span>
                </div>

                <div className="flex items-center gap-12">
                    <div className="hidden lg:flex items-center gap-10">
                        {["Platform", "Features", "Security", "About"].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-premium text-slate-500 hover:text-white transition-all">{item}</a>
                        ))}
                    </div>
                    <SignInButton mode="modal">
                        <button className="px-6 py-2.5 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
                            Enter App
                        </button>
                    </SignInButton>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-48 pb-32 px-6">
                <div className="max-w-6xl mx-auto text-center space-y-12">
                    <div className="reveal inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 shadow-inner">
                        <Sparkles className="size-3.5 text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-premium text-blue-400">Introducing Version 2.0</span>
                    </div>

                    <h1 className="reveal text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] text-balance">
                        The Professional Way to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-600">Interview Developers.</span>
                    </h1>

                    <p className="reveal max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed opacity-80">
                        A seamless, collaborative environment for real-time coding assessments. 
                        Designed for engineering teams who value <span className="text-white">clarity and performance.</span>
                    </p>

                    <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                        <SignInButton mode="modal">
                            <button className="w-full sm:w-auto px-10 py-6 bg-blue-600 text-white rounded-2xl font-bold text-base hover:bg-blue-500 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center justify-center gap-4 group/btn overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                                <span className="relative z-10">Start Building</span>
                                <ArrowRight className="size-5 group-hover/btn:translate-x-1.5 transition-transform relative z-10" />
                            </button>
                        </SignInButton>
                        <Link to="/demo" className="w-full sm:w-auto px-10 py-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-4">
                            View Demo
                        </Link>
                    </div>

                    <div className="reveal pt-20">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-premium mb-12">
                            Designed for high-performance engineering teams.
                        </p>
                        
                        {/* TRUSTED BY ICONS MOCK */}
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                             {['NEXTJS', 'VERCEL', 'STRIPE', 'AIRBNB', 'REPLICATE'].map(logo => (
                                 <span key={logo} className="text-lg font-black tracking-tighter text-white">{logo}</span>
                             ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DASHBOARD PREVIEW */}
            <section className="relative px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal relative group">
                        <div className="absolute -inset-1 bg-gradient-to-b from-blue-600/20 to-transparent blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative rounded-[2.5rem] border border-white/5 bg-[#0a0a0f] p-3 shadow-2xl overflow-hidden">
                            <img 
                                src="/dashboard-preview.png" 
                                alt="Dashboard Preview" 
                                className="w-full rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE SECTION */}
            <section id="features" className="py-40 px-6 relative">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
                    <div className="reveal space-y-12">
                        <div className="space-y-6">
                            <div className="size-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shadow-inner">
                                <Code className="size-7 text-blue-400" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                                Engineered for <br />
                                <span className="text-slate-600">Peak Performance.</span>
                            </h2>
                        </div>
                        
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            Our platform handles the complexity of real-time collaboration so you can focus on the candidate. 
                            Experience zero-lag coding and crystal-clear communication.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-y-10 gap-x-12">
                            {[
                                { icon: Activity, text: "Real-time IDE sync" },
                                { icon: Video, text: "HD Video & Audio" },
                                { icon: Globe, text: "Multi-language support" },
                                { icon: Monitor, text: "Session recording" },
                                { icon: Layers, text: "Collaborative whiteboards" },
                                { icon: ShieldCheck, text: "Advanced analytics" }
                            ].map((item, i) => (
                                <div key={i} className="group/feat flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/feat:bg-blue-600/10 group-hover/feat:border-blue-500/20 transition-colors">
                                        <item.icon className="size-5 text-slate-500 group-hover/feat:text-blue-400" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300 tracking-tight">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="reveal grid grid-cols-2 gap-6 relative">
                         {/* Stats / Proof Cards */}
                         <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4 hover:bg-white/[0.04] transition-all">
                                <p className="text-4xl font-black text-white tracking-tighter">0.1s</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-premium">Average Latency</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-blue-600/10 border border-blue-500/20 space-y-4">
                                <p className="text-4xl font-black text-blue-400 tracking-tighter">99.9%</p>
                                <p className="text-[10px] font-bold text-blue-500/60 uppercase tracking-premium">Uptime SLA</p>
                            </div>
                         </div>
                         <div className="space-y-6 pt-12">
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                                <p className="text-4xl font-black text-white tracking-tighter">50k+</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-premium">Sessions Hosted</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                                <p className="text-4xl font-black text-white tracking-tighter">15+</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-premium">Languages</p>
                            </div>
                         </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-40 px-6">
                <div className="max-w-5xl mx-auto reveal relative p-16 md:p-32 rounded-[4rem] bg-[#0a0a0f] border border-white/5 text-center space-y-12 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 size-96 bg-blue-600/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 size-64 bg-indigo-600/5 blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                        Ready to elevate your <br />
                        <span className="text-blue-500">interview process?</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-slate-500 text-lg md:text-xl font-semibold opacity-70">
                        Join the future of technical assessments. Simple, fast, and designed for engineers.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                        <SignInButton mode="modal">
                            <button className="w-full sm:w-auto px-12 py-6 bg-white text-black rounded-2xl font-black text-base hover:bg-slate-100 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95">
                                Join the Platform
                            </button>
                        </SignInButton>
                        <button className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black text-base transition-all active:scale-95">
                            Talk to Us
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-32 border-t border-white/[0.03] px-6">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-20">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center">
                                    <Zap className="size-5 text-white" />
                                </div>
                                <span className="text-2xl font-black text-white tracking-tighter">ELYVO</span>
                            </div>
                            <p className="max-w-xs text-slate-500 font-medium text-sm leading-relaxed">
                                The high-performance collaboration platform for modern engineering teams. Built for clarity and speed.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-premium">Platform</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                                    <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
                                    <li><a href="#" className="hover:text-blue-400 transition-colors">Roadmap</a></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-premium">Company</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                                    <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                                    <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/[0.03] gap-6">
                        <p className="text-[10px] font-bold text-slate-700 uppercase tracking-premium">&copy; 2026 Elyvo Platform. All rights reserved.</p>
                        <div className="flex items-center gap-8 text-slate-500">
                            <MessageSquare className="size-5 hover:text-white cursor-pointer transition-colors" />
                            <Globe className="size-5 hover:text-white cursor-pointer transition-colors" />
                            <Cpu className="size-5 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                .reveal {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal-active {
                    opacity: 1;
                    transform: translateY(0);
                }
                .tracking-premium {
                    letter-spacing: 0.3em;
                }
            `}</style>
        </div>
    );
}

export default HomePage;