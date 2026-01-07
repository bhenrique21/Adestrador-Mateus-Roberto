import React from 'react';
import { PHASES, GENERAL_GUIDELINES, FINAL_OBSERVATION } from './constants';
import PhaseCard from './components/PhaseCard';
import TextCard from './components/TextCard';
import { PawPrint, BookOpen, ScrollText, Printer } from 'lucide-react';

const App: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-primary pb-20 font-sans selection:bg-black selection:text-brand-primary">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="pt-8 pb-10 sticky top-0 z-50 bg-brand-primary/95 backdrop-blur-sm print:static print:bg-transparent">
          <div className="bg-black text-brand-primary rounded-[2rem] px-8 py-8 shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden border-b-4 border-brand-darker">
             {/* Decorative background element for header */}
             <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div className="flex flex-col gap-2 relative z-10 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                   <div className="bg-brand-primary text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Protocolo H.E.C.</div>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                  Homeostase<br/>Emocional Canina
                </h1>
                <p className="text-lg md:text-xl text-gray-400 font-medium mt-2">Cronograma Base de Aplicação</p>
             </div>
             
             <div className="flex flex-col items-center gap-4 relative z-10 mt-6 md:mt-0">
               <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary text-black shadow-lg shadow-brand-primary/20 transform rotate-12">
                 <PawPrint className="w-10 h-10" />
               </div>
               
               {/* PDF Button */}
               <button 
                 onClick={handlePrint}
                 className="no-print bg-white/10 hover:bg-white/20 text-brand-primary border border-brand-primary/50 font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2 text-sm backdrop-blur-md"
               >
                 <Printer className="w-4 h-4" />
                 <span>Salvar PDF</span>
               </button>
             </div>
          </div>
        </header>

        {/* Content */}
        <main className="space-y-16">
          
          {/* General Guidelines Section */}
          <section className="animate-fade-in-up print-break-inside-avoid">
            <TextCard data={GENERAL_GUIDELINES} variant="primary" />
          </section>

          {/* Phases Grid */}
          <section>
             <div className="flex items-center gap-4 mb-8 opacity-60 px-2 print:opacity-100">
                <ScrollText className="w-6 h-6 text-black" />
                <h2 className="text-2xl font-black uppercase text-black tracking-widest">Fases do Protocolo</h2>
                <div className="h-1 bg-black flex-1 rounded-full"></div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
                {PHASES.map((phase) => (
                  <PhaseCard key={phase.id} phase={phase} />
                ))}
             </div>
          </section>

          {/* Final Observation Section */}
          <section className="print-break-inside-avoid">
            <TextCard data={FINAL_OBSERVATION} variant="black" />
          </section>

        </main>

        <footer className="mt-24 text-center text-black/60 font-medium text-sm border-t border-black/10 pt-8 no-print">
          <p className="flex items-center justify-center gap-2">
             <BookOpen className="w-4 h-4" />
             © {new Date().getFullYear()} Protocolo H.E.C. - Homeostase Emocional Canina
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;