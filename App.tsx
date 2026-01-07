import React, { useState } from 'react';
import { PHASES, GENERAL_GUIDELINES, FINAL_OBSERVATION } from './constants';
import PhaseCard from './components/PhaseCard';
import TextCard from './components/TextCard';
import { PawPrint, BookOpen, ScrollText, Download, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    // Get the element to print
    const element = document.getElementById('content-to-print');
    if (!element) return;

    // CONFIGURAÇÃO DO PDF
    // Truque para Mobile: Clonamos o elemento e forçamos uma largura de Desktop
    // para garantir que o PDF saia com 2 colunas mesmo se gerado pelo celular.
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Configurações do clone para simular desktop
    clone.style.width = '1280px'; // Força largura desktop
    clone.style.padding = '40px';
    clone.style.background = '#00a5c5'; // Garante a cor de fundo
    
    // Removemos elementos que não devem sair no PDF (botões, etc que estejam dentro da div)
    const noPrintElements = clone.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.remove());

    // Adiciona o clone fora da tela
    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right in mm
      filename: 'Protocolo_HEC_Cronograma.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, // Melhora a qualidade
        useCORS: true, 
        scrollY: 0,
        windowWidth: 1280 // Importante para renderizar como desktop
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore - html2pdf is loaded via CDN
      await window.html2pdf().set(opt).from(clone).save();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar o PDF. Tente novamente.");
    } finally {
      document.body.removeChild(clone);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary pb-20 font-sans selection:bg-black selection:text-brand-primary">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Fixed on top for UI, but included in print div below logic */}
        <header className="pt-8 pb-10 sticky top-0 z-50 bg-brand-primary/95 backdrop-blur-sm">
          <div className="bg-black text-brand-primary rounded-[2rem] px-6 md:px-8 py-6 md:py-8 shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden border-b-4 border-brand-darker">
             {/* Decorative background element for header */}
             <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl"></div>
             {/* CSS Pattern instead of external image to prevent load errors */}
             <div className="absolute top-0 left-0 w-full h-full bg-pattern-cubes opacity-10"></div>
             
             <div className="flex flex-col gap-2 relative z-10 text-center md:text-left w-full md:w-auto">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                   <div className="bg-brand-primary text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Protocolo H.E.C.</div>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                  Homeostase<br/>Emocional Canina
                </h1>
                <p className="text-base md:text-xl text-gray-400 font-medium mt-2">Cronograma Base de Aplicação</p>
             </div>
             
             <div className="flex flex-col items-center gap-4 relative z-10 mt-6 md:mt-0 w-full md:w-auto">
               <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary text-black shadow-lg shadow-brand-primary/20 transform rotate-12">
                 <PawPrint className="w-10 h-10" />
               </div>
               
               {/* PDF Button */}
               <button 
                 onClick={handleDownloadPDF}
                 disabled={isGenerating}
                 className="no-print w-full md:w-auto bg-white/10 hover:bg-white/20 active:bg-white/30 text-brand-primary border border-brand-primary/50 font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 text-sm backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
               >
                 {isGenerating ? (
                   <>
                     <Loader2 className="w-4 h-4 animate-spin" />
                     <span>Gerando...</span>
                   </>
                 ) : (
                   <>
                     <Download className="w-4 h-4" />
                     <span>Baixar PDF</span>
                   </>
                 )}
               </button>
             </div>
          </div>
        </header>

        {/* Content Wrapper for PDF Generation */}
        <div id="content-to-print">
          {/* We re-insert a header-like visual for the PDF only if needed, 
              or rely on the app structure. Since the header above is sticky and has buttons,
              let's create a clean structure for the PDF content below. 
          */}
          
          <main className="space-y-12 md:space-y-16">
            
            {/* General Guidelines Section */}
            <section className="animate-fade-in-up">
              <TextCard data={GENERAL_GUIDELINES} variant="primary" />
            </section>

            {/* Phases Grid */}
            <section>
              <div className="flex items-center gap-4 mb-8 opacity-60 px-2">
                  <ScrollText className="w-6 h-6 text-black" />
                  <h2 className="text-xl md:text-2xl font-black uppercase text-black tracking-widest">Fases do Protocolo</h2>
                  <div className="h-1 bg-black flex-1 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
                  {PHASES.map((phase) => (
                    <PhaseCard key={phase.id} phase={phase} />
                  ))}
              </div>
            </section>

            {/* Final Observation Section */}
            <section>
              <TextCard data={FINAL_OBSERVATION} variant="black" />
            </section>

          </main>

          <footer className="mt-16 md:mt-24 text-center text-black/60 font-medium text-xs md:text-sm border-t border-black/10 pt-8 pb-8">
            <p className="flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              © {new Date().getFullYear()} Protocolo H.E.C. - Homeostase Emocional Canina
            </p>
          </footer>
        </div>

      </div>
    </div>
  );
};

export default App;