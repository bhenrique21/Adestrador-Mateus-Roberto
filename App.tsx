import React, { useState } from 'react';
import { PHASES, GENERAL_GUIDELINES, FINAL_OBSERVATION } from './constants';
import PhaseCard from './components/PhaseCard';
import TextCard from './components/TextCard';
import { PawPrint, BookOpen, ScrollText, Download, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    // Elemento original
    const element = document.getElementById('content-to-print');
    if (!element) {
      setIsGenerating(false);
      return;
    }

    // 1. Cria um container temporário para o PDF
    // Usamos um container 'absoluto' no topo para garantir que o html2canvas capture tudo,
    // mas com z-index negativo para não atrapalhar o usuário.
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '1280px'; // Força largura de Desktop (Grid 2 colunas)
    container.style.zIndex = '-9999'; 
    container.style.backgroundColor = '#00a5c5'; // Garante fundo da marca
    
    // 2. Clona o conteúdo
    const clone = element.cloneNode(true) as HTMLElement;
    
    // 3. Ajustes de estilo no clone para garantir fidelidade
    clone.style.width = '1280px'; // Largura fixa
    clone.style.minHeight = '100vh'; // Altura mínima
    clone.style.height = 'auto'; // Permite crescer infinitamente
    clone.style.padding = '40px';
    clone.style.boxSizing = 'border-box';
    clone.style.overflow = 'visible'; // Impede cortes de conteúdo
    clone.style.backgroundColor = '#00a5c5'; // Reforça cor de fundo no clone
    
    // Remove elementos que não devem aparecer (botões, etc)
    clone.querySelectorAll('.no-print').forEach(el => el.remove());

    // 4. Monta a estrutura no DOM temporariamente
    container.appendChild(clone);
    document.body.appendChild(container);

    // 5. Configurações otimizadas do html2pdf
    const opt = {
      margin: [10, 10, 10, 10], // Margem (Top, Left, Bottom, Right) em mm
      filename: 'Protocolo_HEC_Cronograma.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      enableLinks: true, // Garante que links funcionem se houver
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'] // Tenta evitar cortar componentes (cards) ao meio
      },
      html2canvas: { 
        scale: 2, // Alta resolução (evita texto borrado)
        useCORS: true, 
        width: 1280, // Largura do Canvas
        windowWidth: 1280, // Largura da Janela simulada
        scrollY: 0, // Garante captura desde o topo
        scrollX: 0,
        backgroundColor: '#00a5c5' // Cor de fundo do canvas (evita partes brancas)
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // Pequeno delay para garantir que estilos/fontes renderizem no clone
      await new Promise(resolve => setTimeout(resolve, 800));

      // @ts-ignore
      await window.html2pdf().set(opt).from(clone).save();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar o PDF. Tente novamente.");
    } finally {
      // Limpeza
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary pb-10 md:pb-20 font-sans selection:bg-black selection:text-brand-primary">
      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="pt-6 md:pt-8 pb-8 md:pb-10 sticky top-0 z-50 bg-brand-primary/95 backdrop-blur-sm">
          <div className="bg-black text-brand-primary rounded-[2rem] px-6 py-6 md:px-8 md:py-8 shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden border-b-4 border-brand-darker">
             {/* Decorative background element for header */}
             <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl"></div>
             <div className="absolute top-0 left-0 w-full h-full bg-pattern-cubes opacity-10"></div>
             
             <div className="flex flex-col gap-2 relative z-10 text-center md:text-left w-full md:w-auto">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                   <div className="bg-brand-primary text-black px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">Protocolo H.E.C.</div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none break-words">
                  Homeostase<br className="hidden md:block"/> Emocional Canina
                </h1>
                <p className="text-sm md:text-xl text-gray-400 font-medium mt-2">Cronograma Base de Aplicação</p>
             </div>
             
             <div className="flex flex-col items-center gap-4 relative z-10 mt-6 md:mt-0 w-full md:w-auto">
               <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary text-black shadow-lg shadow-brand-primary/20 transform rotate-12 transition-transform hover:rotate-0">
                 <PawPrint className="w-10 h-10" />
               </div>
               
               {/* PDF Button */}
               <button 
                 onClick={handleDownloadPDF}
                 disabled={isGenerating}
                 className="no-print w-full md:w-auto bg-white/10 hover:bg-white/20 active:bg-white/30 text-brand-primary border border-brand-primary/50 font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 text-sm backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-primary/20"
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
          
          <main className="space-y-12 md:space-y-16">
            
            {/* General Guidelines Section */}
            <section className="animate-fade-in-up break-inside-avoid">
              <TextCard data={GENERAL_GUIDELINES} variant="primary" />
            </section>

            {/* Phases Grid */}
            <section>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 opacity-60 px-2">
                  <ScrollText className="w-5 h-5 md:w-6 md:h-6 text-black" />
                  <h2 className="text-lg md:text-2xl font-black uppercase text-black tracking-widest">Fases do Protocolo</h2>
                  <div className="h-1 bg-black flex-1 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
                  {PHASES.map((phase) => (
                    <PhaseCard key={phase.id} phase={phase} />
                  ))}
              </div>
            </section>

            {/* Final Observation Section */}
            <section className="break-inside-avoid">
              <TextCard data={FINAL_OBSERVATION} variant="black" />
            </section>

          </main>

          <footer className="mt-16 md:mt-24 text-center text-black/60 font-medium text-xs md:text-sm border-t border-black/10 pt-8 pb-8 break-inside-avoid">
            <div className="flex flex-col items-center gap-2">
              <p className="flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                © {new Date().getFullYear()} Protocolo H.E.C. | Homeostase Emocional Canina
              </p>
              <p>
                Conteúdo desenvolvido por Adestrador Mateus Roberto. Direitos Reservados.
              </p>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
};

export default App;