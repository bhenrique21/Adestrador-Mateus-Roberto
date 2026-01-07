import React from 'react';
import { PhaseData } from '../types';
import { Heart, Target, Dumbbell, Trophy, CheckCircle2 } from 'lucide-react';

interface PhaseCardProps {
  phase: PhaseData;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  return (
    <div className="relative mt-8 mb-4 h-full print-break-inside-avoid">
      {/* Header Pill */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-[95%] sm:w-auto">
        <div className="bg-black text-brand-primary rounded-full py-2 px-6 shadow-xl flex items-center justify-center text-center border-2 border-brand-primary/20">
          <span className="font-bold text-lg sm:text-xl whitespace-normal leading-tight">
            {/* Split title to bold the Fase X part */}
            {phase.title.split('—')[0]} 
            <span className="hidden sm:inline mx-2 text-white/40">|</span>
            <span className="block sm:inline text-white font-normal text-base sm:text-lg">
               {phase.title.split('—')[1]}
            </span>
          </span>
        </div>
      </div>

      <div className="bg-brand-cream rounded-[2rem] p-6 pt-16 pb-8 shadow-sm h-full flex flex-col border-b-4 border-brand-primary">
        
        {/* Duration Label */}
        <div className="flex justify-center mb-8">
           <span className="bg-brand-primary/10 text-brand-darker text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
             Duração: {phase.duration}
           </span>
        </div>

        {/* Phase 8 Description special case */}
        {phase.description && (
           <p className="text-center italic text-gray-600 mb-8 px-4 text-lg">"{phase.description}"</p>
        )}

        <div className="space-y-8 flex-1">
            {/* Objetivos Emocionais */}
            {phase.emotionalObjectives.length > 0 && (
                <div>
                    <h3 className="font-bold text-black mb-3 text-lg flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500/10" />
                        <span className="uppercase tracking-wide text-sm">Objetivos Emocionais</span>
                    </h3>
                    <ul className="space-y-2">
                        {phase.emotionalObjectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                <span className="block w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Objetivos Práticos */}
            {phase.practicalObjectives.length > 0 && (
                <div>
                    <h3 className="font-bold text-black mb-3 text-lg flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="uppercase tracking-wide text-sm">
                           {phase.id === 8 ? "Práticas Recomendadas" : "Objetivos Práticos"}
                        </span>
                    </h3>
                    <ul className="space-y-2">
                        {phase.practicalObjectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Treinos Indicados */}
            {phase.indicatedTraining.length > 0 && (
                <div>
                    <h3 className="font-bold text-black mb-3 text-lg flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                        <Dumbbell className="w-5 h-5 text-purple-600" />
                        <span className="uppercase tracking-wide text-sm">Treinos Indicados</span>
                    </h3>
                    <ul className="space-y-2">
                        {phase.indicatedTraining.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                <span className="block w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Critério de Avanço - Footer Style */}
        {phase.advancementCriteria && phase.advancementCriteria.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
             <h3 className="font-bold text-black mb-3 text-sm flex items-center gap-2 uppercase tracking-wider text-green-700">
                <Trophy className="w-4 h-4" />
                Critério de Avanço
             </h3>
             <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                {phase.advancementCriteria.map((crit, idx) => (
                    <p key={idx} className="text-green-900 font-medium text-sm md:text-base flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span> {crit}
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