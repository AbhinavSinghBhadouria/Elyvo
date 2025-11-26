import React from 'react';

const WelcomePage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* ============================== */}
      {/* 1. ATMOSPHERE / LIGHTING */}
      {/* ============================== */}
      
      {/* The "Aurora" that appears at the top */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>

      {/* The "Sunrise" glow at the bottom center (initially hidden, rises up) */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary via-secondary to-transparent blur-[80px] rounded-full opacity-0 animate-sunrise"></div>


      {/* ============================== */}
      {/* 2. THE HORIZON LINE */}
      {/* ============================== */}
      <div className="absolute z-10 w-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-horizon-expand"></div>


      {/* ============================== */}
      {/* 3. MAIN CONTENT */}
      {/* ============================== */}
      <div className="relative z-20 flex flex-col items-center">
        
        {/* LOGO CONTAINER - Rises slightly */}
        <div className="relative mb-8 opacity-0 animate-float-up">
            
            {/* Back Glow behind logo */}
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
            
            {/* The Logo */}
            <div className="relative w-24 h-24 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                {/* Shine effect passing through logo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-150%] animate-shine"></div>
                
                <img src="/Elyvologo.png" alt="Elyvo" className="w-14 h-14 object-contain relative z-10" />
            </div>
        </div>

        {/* TEXT REVEAL - Cinematic spacing */}
        <div className="text-center space-y-4 overflow-hidden">
            <h1 className="text-6xl font-bold tracking-tight text-white opacity-0 animate-text-reveal">
                ELYVO
            </h1>
            
            <div className="flex items-center justify-center gap-4 opacity-0 animate-text-reveal delay-200">
                <span className="text-xs tracking-[0.6em] text-gray-400 uppercase">
                    Interview
                </span>
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                <span className="text-xs tracking-[0.6em] text-gray-400 uppercase">
                    Collaborate
                </span>
            </div>
        </div>

        {/* MINIMAL LOADER - A thin line expanding */}
        <div className="mt-16 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden opacity-0 animate-fade-in delay-500">
            <div className="h-full bg-gradient-to-r from-primary via-white to-primary w-full animate-indeterminate-bar"></div>
        </div>

      </div>

      {/* ============================== */}
      {/* STYLES & KEYFRAMES */}
      {/* ============================== */}
      <style>{`
        /* 1. Expand the horizontal line */
        @keyframes horizonExpand {
            0% { width: 0%; opacity: 0; }
            30% { width: 40%; opacity: 1; }
            100% { width: 0%; opacity: 0; } /* Fades out as sun rises */
        }
        .animate-horizon-expand {
            animation: horizonExpand 2.5s ease-in-out forwards;
        }

        /* 2. The Sunrise Glow moving up */
        @keyframes sunrise {
            0% { bottom: -200px; opacity: 0; }
            50% { opacity: 0.6; }
            100% { bottom: -50px; opacity: 0.2; }
        }
        .animate-sunrise {
            animation: sunrise 3s ease-out forwards;
        }

        /* 3. Logo rising and fading in */
        @keyframes floatUp {
            0% { transform: translateY(40px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-float-up {
            animation: floatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.3s; /* Wait for line to start expanding */
        }

        /* 4. Text Reveal (Slide up slightly) */
        @keyframes textReveal {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-text-reveal {
            animation: textReveal 1s ease-out forwards;
            animation-delay: 0.6s;
        }
        .delay-200 { animation-delay: 0.8s; }
        .delay-500 { animation-delay: 1.2s; }

        /* 5. Shine passing over logo */
        @keyframes shine {
            0% { transform: translateX(-150%) translateY(150%); }
            100% { transform: translateX(150%) translateY(-150%); }
        }
        .animate-shine {
            animation: shine 2s ease-in-out infinite;
        }

        /* 6. Indeterminate Loader */
        @keyframes indeterminate {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(50%); }
            100% { transform: translateX(100%); }
        }
        .animate-indeterminate-bar {
            animation: indeterminate 1.5s linear infinite;
        }

        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;