import { createContext, useState, useContext } from 'react';
import { addToHistory } from '../services/api';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); // Store the list of songs

  // Play a specific track and set the queue (list of songs)
  const playTrack = (track, list = []) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // If a list is provided, set it as the queue. 
    // If not, default to just this one song (or keep existing queue).
    if (list.length > 0) {
      setQueue(list);
    } else if (queue.length === 0) {
      setQueue([track]);
    }

    if (track.id) addToHistory(track.id);
  };

  const pauseTrack = () => setIsPlaying(false);

  // Play Next Song
  const playNext = () => {
    if (!currentTrack || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < queue.length - 1) {
      playTrack(queue[currentIndex + 1], queue); // Play next
    } else {
      // Optional: Loop back to start
      playTrack(queue[0], queue);
    }
  };

  // Play Previous Song
  const playPrevious = () => {
    if (!currentTrack || queue.length === 0) return;

    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(queue[currentIndex - 1], queue); // Play previous
    }
  };

  return (
    <PlayerContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      setIsPlaying, 
      playTrack, 
      pauseTrack, 
      playNext, 
      playPrevious 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);