import React from 'react';
import type { VocabularyItem } from '../types';

interface VocabularyCardProps {
  item: VocabularyItem;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-4xl animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-6 capitalize">{item.term}</h2>
      <div className="space-y-6">
        {item.parts.map((part, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold text-gray-300 mb-2">{part.label}</h3>
            {Array.isArray(part.content) ? (
              <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
                {part.content.map((contentItem, contentIndex) => (
                  <li key={contentIndex}>{contentItem}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">{part.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyCard;
