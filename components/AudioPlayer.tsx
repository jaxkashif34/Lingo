import React from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentItemIndex: number;
  totalItems: number;
  currentItemName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  currentItemIndex,
  totalItems,
  currentItemName,
}) => {
  const isFirstItem = currentItemIndex === 0;
  const isLastItem = currentItemIndex === totalItems - 1;

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg mt-8 sticky bottom-4">
      <div className="flex items-center justify-between text-gray-300">
        <div className="w-1/3">
           <p className="font-semibold truncate" title={currentItemName}>{currentItemName || 'Select an item'}</p>
           <p className="text-sm text-gray-400">{totalItems > 0 ? `Item ${currentItemIndex + 1} of ${totalItems}`: 'No items loaded'}</p>
        </div>
        
        <div className="flex items-center gap-4 w-1/3 justify-center">
          <button
            onClick={onPrevious}
            disabled={isFirstItem}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={onPlayPause}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 transition-transform transform hover:scale-110"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>

          <button
            onClick={onNext}
            disabled={isLastItem}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="w-1/3"></div>
      </div>
    </div>
  );
};

export default AudioPlayer;
