import React from 'react';
import { PhaseData } from '../types';
import { Heart, Target, Dumbbell, Trophy, CheckCircle2 } from 'lucide-react';

interface PhaseCardProps {
  phase: PhaseData;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  return (
    <div className="relative mt-6 mb-4 h-full break-inside-avoid">
      {/* Header Pill - Reduced size and font for better fit */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-auto max-w-[95%] flex justify-center">
        <div className="bg-black text-brand-primary rounded-full py-1.5 px-5 shadow-xl flex items-center justify-center text-center border border-brand-primary/30 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 leading-none">
            {/* Phase Number */}
            <span className="font-black text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider text-brand-primary">
              {phase.title.split('—')[0].trim()}
            </span>
            
            <span className="hidden sm:inline text-white/20 text-xs">|</span>
            
            {/* Phase Name */}
            <span className="text-white font-medium text-[10px] sm:text-xs uppercase tracking-wide leading-tight max-w-[200px] sm:max-w-none truncate sm:overflow-visible">
               {phase.title.split('—')[1]?.trim()}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-brand-cream rounded-[2rem] p-5 sm:p-6 pt-10 pb-8 shadow-sm h-full flex flex-col border-b-4 border-brand-primary">
        
        {/* Duration Label */}
        <div className="flex justify-center mb-6 mt-2">
           <span className="bg-brand-primary/10 text-brand-darker text-[10px] sm:text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider border border-brand-primary/10">
             Duração: {phase.duration}
           </span>
        </div>

        {/* Phase 8 Description special case */}
        {phase.description && (
           <p className="text-center italic text-gray-600 mb-8 px-2 sm:px-4 text-sm sm:text-base">"{phase.description}"</p>
        )}

        <div className="space-y-6 sm:space-y-8 flex-1">
            {/* Objetivos Emocionais */}
            {phase.emotionalObjectives.length > 0 && (
                <div>
                    <h3 className="font-bold text-black mb-3 text-sm sm:text-base flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500/10" />
                        <span className="uppercase tracking-wide text-[10px] sm:text-xs">Objetivos Emocionais</span>
                    </h3>
                    <ul className="space-y-2">
                        {phase.emotionalObjectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-xs sm:text-sm">
                                <span className="block w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Objetivos Práticos */}
            {phase.practicalObjectives.length > 0 && (
                <div>
                    <h3 className="font-bold text-black mb-3 text-sm sm:text-base flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="uppercase tracking-wide text-[10px] sm:text-xs">
                           {phase.id === 8 ? "Práticas Recomendadas" : "Objetivos Práticos"}
                        </span>
                    </h3>
                    <ul className="space-y-2">
                        {phase.practicalObjectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-xs sm:text-sm">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Treinos Indicados */}
            {phase.indicatedTraining.length > 0 && (
                <div>
                    <h3 className="font-bold text-black mb-3 text-sm sm:text-base flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                        <Dumbbell className="w-4 h-4 text-purple-600" />
                        <span className="uppercase tracking-wide text-[10px] sm:text-xs">Treinos Indicados</span>
                    </h3>
                    <ul className="space-y-2">
                        {phase.indicatedTraining.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-xs sm:text-sm">
                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Critério de Avanço - Footer Style */}
        {phase.advancementCriteria && phase.advancementCriteria.length > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
             <h3 className="font-bold text-black mb-3 text-[10px] sm:text-xs flex items-center gap-2 uppercase tracking-wider text-green-700">
                <Trophy className="w-3.5 h-3.5" />
                Critério de Avanço
             </h3>
             <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                {phase.advancementCriteria.map((crit, idx) => (
                    <p key={idx} className="text-green-900 font-medium text-xs sm:text-sm flex items-start gap-2">
                        <span className="text-green-500 font-bold text-xs">✓</span> {crit}
                    </p>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaseCard;