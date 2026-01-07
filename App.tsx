import React, { useState } from 'react';
import { PHASES, GENERAL_GUIDELINES, FINAL_OBSERVATION } from './constants';
import PhaseCard from './components/PhaseCard';
import TextCard from './components/TextCard';
import { PawPrint, BookOpen, ScrollText, Download, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    const element = document.getElementById('content-to-print');
    if (!element) {
      setIsGenerating(false);
      return;
    }

    // CONFIGURAÇÃO DE LARGURA
    const desktopWidth = 1280; 

    // 1. Container temporário para renderização off-screen
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = `${desktopWidth}px`;
    container.style.zIndex = '-9999'; 
    container.style.backgroundColor = '#00a5c5'; 
    
    // 2. Clone do conteúdo
    const clone = element.cloneNode(true) as HTMLElement;
    
    // 3. Ajustes de Estilo no Clone
    clone.style.width = `${desktopWidth}px`;
    clone.style.minHeight = '100vh';
    clone.style.height = 'auto'; 
    clone.style.padding = '40px'; 
    clone.style.margin = '0 auto'; 
    clone.style.boxSizing = 'border-box';
    clone.style.overflow = 'visible'; 
    clone.style.backgroundColor = '#00a5c5'; 
    
    // Centralização do conteúdo interno
    const internalContainer = clone; 
    internalContainer.style.display = 'flex';
    internalContainer.style.flexDirection = 'column';
    internalContainer.style.alignItems = 'center';

    // Limpeza de elementos interativos e fixes de layout
    clone.querySelectorAll('.no-print').forEach(el => el.remove());

    // Remove classes sticky/fixed
    clone.querySelectorAll('.sticky').forEach(el => {
      el.classList.remove('sticky', 'top-0', 'z-50', 'backdrop-blur-sm');
      el.classList.add('relative');
    });

    // Força layout de 2 colunas (Grid)
    const grids = clone.querySelectorAll('.lg\\:grid-cols-2');
    grids.forEach(grid => {
        grid.classList.remove('grid-cols-1');
        grid.classList.add('grid-cols-2');
        (grid as HTMLElement).style.width = '100%';
        (grid as HTMLElement).style.maxWidth = '1200px'; 
    });

    // Ajuste do Header
    const header = clone.querySelector('header');
    if (header) {
        header.style.width = '100%';
        header.style.maxWidth = '1200px';
    }
    
    // Ajuste do Footer
    const footer = clone.querySelector('footer');
    if (footer) {
        footer.style.width = '100%';
    }

    // --- FIX MOBILE CUTOFF ---
    // Adicionamos um elemento físico no final do clone para servir de buffer.
    // Se o renderizador do celular cortar o final, cortará apenas este bloco vazio.
    const spacer = document.createElement('div');
    spacer.style.height = '200px'; // 200px de segurança extra
    spacer.style.width = '100%';
    spacer.style.backgroundColor = '#00a5c5'; // Mesma cor do fundo para ficar invisível
    spacer.style.flexShrink = '0';
    clone.appendChild(spacer);

    // 4. Adiciona ao DOM invisível
    container.appendChild(clone);
    document.body.appendChild(container);

    // 5. Delay para garantir carregamento
    await new Promise(resolve => setTimeout(resolve, 800));

    // 6. CÁLCULO DE DIMENSÕES
    // Usamos o scrollHeight do container que já inclui o nosso spacer gigante
    const scrollHeight = clone.scrollHeight;
    
    // Definimos a altura explicita para evitar que o html2canvas corte
    container.style.height = `${scrollHeight}px`;
    clone.style.height = `${scrollHeight}px`;

    const pdfWidthPt = desktopWidth * 0.75;
    const pdfHeightPt = scrollHeight * 0.75;

    // 7. Configurações da biblioteca
    const opt = {
      margin: 0,
      filename: 'Protocolo_HEC_Completo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      enableLinks: true,
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        width: desktopWidth,
        height: scrollHeight, // Altura exata calculada com buffer
        windowWidth: desktopWidth,
        windowHeight: scrollHeight, // CRÍTICO: Janela virtual do tamanho total
        scrollY: 0,
        backgroundColor: '#00a5c5',
        x: 0,
        y: 0
      },
      jsPDF: { 
        unit: 'pt',
        format: [pdfWidthPt, pdfHeightPt],
        orientation: 'portrait' 
      }
    };

    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(clone).save();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar o PDF. Tente novamente.");
    } finally {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary pb-10 md:pb-20 font-sans selection:bg-black selection:text-brand-primary">
      <div id="content-to-print" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <header className="w-full pt-6 md:pt-8 pb-8 md:pb-10 sticky top-0 z-50 bg-brand-primary/95 backdrop-blur-sm transition-all duration-300">
          <div className="bg-black text-brand-primary rounded-[2rem] px-6 py-6 md:px-8 md:py-8 shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden border-b-4 border-brand-darker w-full">
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
               {/* Paw Icon (Restored) */}
               <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(0,165,197,0.4)] mb-2">
                  <PawPrint className="w-10 h-10 text-black" strokeWidth={2.5} />
               </div>
               
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

        {/* Main Content */}
        <main className="space-y-12 md:space-y-16 w-full">
          
          <section className="animate-fade-in-up break-inside-avoid w-full">
            <TextCard data={GENERAL_GUIDELINES} variant="primary" />
          </section>

          <section className="w-full">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 opacity-60 px-2">
                <ScrollText className="w-5 h-5 md:w-6 md:h-6 text-black" />
                <h2 className="text-lg md:text-2xl font-black uppercase text-black tracking-widest">Fases do Protocolo</h2>
                <div className="h-1 bg-black flex-1 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16 w-full">
                {PHASES.map((phase) => (
                  <PhaseCard key={phase.id} phase={phase} />
                ))}
            </div>
          </section>

          <section className="break-inside-avoid w-full">
            <TextCard data={FINAL_OBSERVATION} variant="black" />
          </section>

        </main>

        <footer className="mt-16 md:mt-24 text-center text-black/60 font-medium text-xs md:text-sm border-t border-black/10 pt-8 pb-8 break-inside-avoid w-full">
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
  );
};

export default App;