import React from 'react';
import { SectionData } from '../types';
import { Info, AlertCircle } from 'lucide-react';

interface TextCardProps {
  data: SectionData;
  variant?: 'primary' | 'black';
}

const TextCard: React.FC<TextCardProps> = ({ data, variant = 'primary' }) => {
  const isPrimary = variant === 'primary';
  
  return (
    <div className={`rounded-[2rem] p-6 md:p-10 shadow-lg ${isPrimary ? 'bg-brand-cream text-black' : 'bg-black text-brand-primary'} print-break-inside-avoid`}>
      <div className="flex items-center gap-3 mb-6">
        {isPrimary ? <Info className="w-8 h-8 text-brand-darker" /> : <AlertCircle className="w-8 h-8 text-brand-primary" />}
        <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${isPrimary ? 'text-black' : 'text-white'}`}>
          {data.title}
        </h2>
      </div>

      <div className={`space-y-4 ${isPrimary ? 'text-gray-800' : 'text-gray-200'} text-lg leading-relaxed`}>
        {data.isList ? (
          <ul className="space-y-3">
            {data.content.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                 <span className={`block w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 ${isPrimary ? 'bg-brand-darker' : 'bg-brand-primary'}`}></span>
                 <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          data.content.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default TextCard;