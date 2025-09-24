import React, { useEffect, useRef } from 'react';
import type { VocabularyItem } from '../types';

interface SidebarProps {
  items: VocabularyItem[];
  currentItemIndex: number;
  onSelectItem: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, currentItemIndex, onSelectItem }) => {
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentItemIndex]);

  return (
    <aside className="w-full md:w-80 bg-slate-800 flex-shrink-0 md:h-screen overflow-y-auto p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Lingo Commute</h1>
      <h2 className="text-lg font-semibold mb-2 text-gray-300">Vocabulary List</h2>
      <nav className="flex-1">
        <ul>
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                ref={index === currentItemIndex ? activeItemRef : null}
                onClick={() => onSelectItem(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  index === currentItemIndex
                    ? 'bg-blue-600 text-white font-semibold shadow-lg'
                    : 'text-gray-300 hover:bg-slate-700'
                }`}
                aria-current={index === currentItemIndex ? 'page' : undefined}
              >
                {item.term}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
