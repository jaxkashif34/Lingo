import React, { useState, useEffect, useCallback, useRef } from 'react';
import { parseVocabularyText, rawText } from './services/parser';
import type { VocabularyItem } from './types';
import Sidebar from './components/Sidebar';
import VocabularyCard from './components/VocabularyCard';
import AudioPlayer from './components/AudioPlayer';

const App: React.FC = () => {
  const [items, setItems] = useState<VocabularyItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const parsedItems = parseVocabularyText(rawText);
    setItems(parsedItems);
    setIsLoading(false);
  }, []);
  
  const speak = useCallback((text: string, onEndCallback: () => void) => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = onEndCallback;
      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
  }, []);

  const playItem = useCallback((index: number) => {
    if (index < 0 || index >= items.length) {
      setIsPlaying(false);
      return;
    }
    setCurrentItemIndex(index);
    
    const item = items[index];
    let textToSpeak = `${item.term}.`;

    item.parts.forEach(part => {
        let contentText = Array.isArray(part.content) ? part.content.join('. ') : part.content;
        textToSpeak += ` ${part.label}: ${contentText}.`;
    });
    
    speak(textToSpeak, () => {
        if (isPlaying && index < items.length - 1) {
            playItem(index + 1);
        } else {
            setIsPlaying(false);
        }
    });

  }, [items, isPlaying, speak]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playItem(currentItemIndex);
    }
  }, [isPlaying, currentItemIndex, playItem]);

  const handleNext = useCallback(() => {
    const nextIndex = currentItemIndex + 1;
    if (nextIndex < items.length) {
      setCurrentItemIndex(nextIndex);
      if (isPlaying) {
        playItem(nextIndex);
      }
    } else {
      setIsPlaying(false);
    }
  }, [currentItemIndex, items.length, isPlaying, playItem]);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentItemIndex - 1;
    if (prevIndex >= 0) {
      setCurrentItemIndex(prevIndex);
      if (isPlaying) {
        playItem(prevIndex);
      }
    }
  }, [currentItemIndex, isPlaying, playItem]);

  const handleSelectItem = useCallback((index: number) => {
    setCurrentItemIndex(index);
    if(isPlaying) {
       playItem(index);
    } else {
      setIsPlaying(true);
      playItem(index);
    }
  }, [isPlaying, playItem]);
  
   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handlePlayPause();
      } else if (event.code === 'ArrowRight') {
        handleNext();
      } else if (event.code === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause, handleNext, handlePrevious]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p>Loading Vocabulary...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen font-sans flex flex-col md:flex-row">
      <Sidebar items={items} currentItemIndex={currentItemIndex} onSelectItem={handleSelectItem} />
      <main className="flex-1 flex flex-col p-4 md:p-8 relative overflow-y-auto h-screen">
        <div className="flex-1 flex items-center justify-center">
             {items.length > 0 && <VocabularyCard key={currentItemIndex} item={items[currentItemIndex]} />}
        </div>
        <AudioPlayer
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentItemIndex={currentItemIndex}
          totalItems={items.length}
          currentItemName={items.length > 0 ? items[currentItemIndex].term : ''}
        />
      </main>
    </div>
  );
};

export default App;