import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";
import { 
    ArrowRight, Check, Video, Code, Globe, Shield, Users, Clock, 
    Zap, Star, TrendingUp, Lock 
} from "lucide-react";

function HomePage() {
    return (
        <div className="min-h-screen w-full bg-base-100 text-base-content overflow-hidden relative">

            {/* Elegant Animated Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary rounded-full blur-[140px] animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-accent rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            {/* Subtle Grid Overlay */}
            <div 
                className="fixed inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            ></div>

            {/* NAVBAR */}
            <nav className="navbar bg-base-200/70 backdrop-blur-2xl border-b border-base-300 sticky top-0 z-50 shadow-xl">
                <div className="navbar-start">
                    <Link to="/" className="flex items-center gap-3 hover:scale-[1.02] transition-all duration-300 ml-4">
                        
                        {/* Logo Box */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                            <img src="/Elyvologo.png" alt="Elyvo Logo" className="w-9 h-9 object-contain" />
                        </div>

                        {/* Brand Text */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-wide text-primary">
                                ELYVO
                            </span>
                            <span className="text-[9px] text-base-content/60 font-semibold tracking-wider uppercase">
                                Elevate Your World
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="navbar-end mr-4">
                    <SignInButton mode="modal">
                        <button className="btn btn-primary btn-sm md:btn-md gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                            <span className="font-semibold">Get Started</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </SignInButton>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="hero min-h-[calc(100vh-80px)] relative">
                <div className="hero-content max-w-7xl w-full px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

                        {/* LEFT CONTENT */}
                        <div className="space-y-8 relative z-10">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-xl shadow-md">
                                <Zap className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">Transform Your Interview Experience</span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                Interview From<br />
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    Anywhere
                                </span>
                                <br />
                                Shine Everywhere
                            </h1>

                            <p className="text-lg lg:text-xl text-base-content/70 max-w-xl leading-relaxed">
                                Professional remote interview platform with smooth video calls, built-in coding tools, and real-time collaboration.
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: Video, text: "HD Video Interviews" },
                                    { icon: Code, text: "Live Coding" },
                                    { icon: Globe, text: "Global Access" },
                                ].map((feature, i) => (
                                    <div 
                                        key={i} 
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-base-200 border border-base-300 hover:bg-base-300 transition-all shadow-sm"
                                    >
                                        <Check className="w-4 h-4 text-success" />
                                        <feature.icon className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                <SignInButton mode="modal">
                                    <button className="btn btn-primary btn-lg gap-2 shadow-xl hover:scale-[1.02] transition-all">
                                        Start Free Trial
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </SignInButton>

                                <button className="btn btn-outline btn-lg hover:scale-[1.02] transition-all">
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* =============================== */}
                        {/* RIGHT GRAPHIC: ABSTRACT INTERFACE */}
                        {/* =============================== */}
                        <div className="hidden lg:flex justify-center relative perspective-[1000px]">
                            <div className="relative w-[500px] h-[500px]">

                                {/* 1. Orbiting Elements (Background) */}
                                {/* Outer Ring - Dashed */}
                                <div className="absolute inset-0 rounded-full border border-dashed border-base-content/10 animate-spin-slow"></div>
                                
                                {/* Middle Ring - Gradient */}
                                <div className="absolute inset-12 rounded-full border border-primary/20 animate-spin-reverse-slow"></div>

                                {/* Orbiting Badge 1: Security */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 animate-float-slow">
                                    <div className="px-3 py-1.5 rounded-full bg-base-100/80 backdrop-blur-md border border-base-300 shadow-lg flex items-center gap-2">
                                        <Shield className="w-3 h-3 text-success" />
                                        <span className="text-xs font-bold">Encrypted</span>
                                    </div>
                                </div>

                                {/* Orbiting Badge 2: Global */}
                                <div className="absolute bottom-10 right-0 animate-float-mid">
                                     <div className="p-3 rounded-2xl bg-base-100/80 backdrop-blur-md border border-base-300 shadow-lg">
                                        <Globe className="w-6 h-6 text-secondary" />
                                    </div>
                                </div>

                                {/* 2. CENTRAL COMPONENT: The "Product" Mockup */}
                                <div className="absolute inset-16 z-20">
                                    {/* Main Glass Card (Simulating Code Editor) */}
                                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-base-100/90 to-base-200/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative group hover:scale-[1.02] transition-transform duration-500">
                                        
                                        {/* Header Bar */}
                                        <div className="h-8 border-b border-base-300 flex items-center px-4 gap-2 bg-base-300/30">
                                            <div className="w-2.5 h-2.5 rounded-full bg-error/80"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-warning/80"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-success/80"></div>
                                            <div className="ml-auto flex items-center gap-1.5 opacity-50">
                                                <Code className="w-3 h-3" />
                                                <span className="text-[10px] font-mono">main.js</span>
                                            </div>
                                        </div>

                                        {/* Mock Code Content */}
                                        <div className="p-6 space-y-3 opacity-60">
                                            <div className="flex gap-3">
                                                <span className="text-xs text-primary font-mono">01</span>
                                                <div className="h-2 w-1/3 bg-primary/40 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="text-xs text-primary font-mono">02</span>
                                                <div className="h-2 w-2/3 bg-secondary/40 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="text-xs text-primary font-mono">03</span>
                                                <div className="h-2 w-1/2 bg-accent/40 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-3 mt-4">
                                                <span className="text-xs text-primary font-mono">04</span>
                                                <div className="h-2 w-3/4 bg-base-content/20 rounded-full"></div>
                                            </div>
                                            {/* Animated Typing Cursor */}
                                            <div className="w-1.5 h-4 bg-primary animate-pulse ml-8"></div>
                                        </div>

                                        {/* Gradient Glow Effect at bottom */}
                                        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
                                    </div>

                                    {/* 3. FLOATING VIDEO CARD (Overlapping the Editor) */}
                                    <div className="absolute -right-8 -bottom-8 w-44 h-52 rounded-2xl bg-base-100 border-4 border-base-100 shadow-2xl overflow-hidden animate-float-fast z-30">
                                        <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex flex-col items-center justify-center relative">
                                            {/* Fake User Avatar */}
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accent p-0.5">
                                                <div className="w-full h-full rounded-full bg-base-100 flex items-center justify-center">
                                                    <Users className="w-8 h-8 text-base-content/70" />
                                                </div>
                                            </div>
                                            
                                            {/* Status Badge */}
                                            <div className="absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                                                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                                                <span className="text-[10px] font-bold text-white">Live Call</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. DECORATIVE ELEMENTS */}
                                    {/* Code Icon Floating Top Left */}
                                    <div className="absolute -top-6 -left-6 p-4 rounded-2xl bg-primary shadow-xl shadow-primary/30 animate-float-mid z-30">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING ANIMATION KEYFRAMES */}
            <style>{`
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes floatMid {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes floatFast {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
                .animate-float-mid { animation: floatMid 5s ease-in-out infinite; }
                .animate-float-fast { animation: floatFast 4s ease-in-out infinite; }

                .animate-spin-slow { animation: spin 20s linear infinite; }
                .animate-spin-reverse-slow { animation: spin 25s linear infinite reverse; }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            {/* STATS SECTION */}
            <div className="w-full bg-base-200/50 backdrop-blur-xl border-y border-base-300 py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full bg-base-100 border border-base-300">

                        {/* Stat Items */}
                        {[
                            { number: "99.9%", label: "Uptime Guarantee", icon: Shield },
                            { number: "<500ms", label: "Average Latency", icon: Zap },
                            { number: "Enterprise", label: "Security Grade", icon: Lock },
                            { number: "24/7", label: "Support Available", icon: Clock },
                        ].map((stat, i) => (
                            <div key={i} className="stat hover:bg-base-200 transition-all duration-300">
                                <div className="stat-figure text-primary">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="stat-title font-medium">{stat.label}</div>
                                <div className="stat-value text-primary text-3xl">{stat.number}</div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* FEATURE GRID SECTION */}
            <div className="w-full py-24 bg-base-100 relative z-10">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Heading */}
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Powerful Features
                            </span>
                        </h2>
                        <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
                            Everything you need to deliver a smooth, professional, and effective remote interview experience.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { icon: Video, title: "Crystal-Clear Video", desc: "High-quality, low-latency interviews for real-time clarity." },
                            { icon: Code, title: "Live Coding Environment", desc: "Smooth, collaborative coding for technical rounds." },
                            { icon: Shield, title: "Secure & Reliable", desc: "End-to-end encrypted sessions with enterprise security." },
                            { icon: Users, title: "Panel Interviews", desc: "Invite multiple interviewers with a single link." },
                            { icon: Clock, title: "Smart Scheduling", desc: "Integrated scheduling to eliminate coordination hassle." },
                            { icon: Globe, title: "Worldwide Access", desc: "Connect with recruiters and candidates anywhere." },
                        ].map((item, i) => (
                            <div 
                                key={i}
                                className="group p-8 rounded-3xl bg-base-200/50 backdrop-blur-xl 
                                           border border-base-300 hover:border-primary/40 
                                           hover:bg-base-200 transition-all duration-300 shadow-xl 
                                           hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent 
                                                flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                                    <item.icon className="w-7 h-7 text-base-100" />
                                </div>

                                <h3 className="text-xl font-semibold mt-6">{item.title}</h3>
                                <p className="text-base-content/60 mt-2 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HomePage;