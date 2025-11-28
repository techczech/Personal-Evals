import React from 'react';
import { Lightbulb } from 'lucide-react';

interface InfoBlockProps {
  children: React.ReactNode;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ children }) => {
  return (
    <aside className="my-6 p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-400 shadow-sm flex gap-4">
      <div className="flex-shrink-0 pt-1">
        <Lightbulb className="text-yellow-600 w-6 h-6" />
      </div>
      <div className="text-gray-700 text-sm leading-relaxed space-y-2">
        {children}
      </div>
    </aside>
  );
};
