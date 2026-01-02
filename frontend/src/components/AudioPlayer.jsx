import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function AudioPlayer() {
  const { currentTrack, isPlaying, setIsPlaying, playNext, playPrevious } = usePlayer();
  const audioRef = useRef(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isReady, setIsReady] = useState(false); // Track if song is loaded

  // --- PLAYBACK LOGIC ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Reset readiness when track changes
    setIsReady(false);

    if (isPlaying) {
      // Try to play. If it fails (e.g., song not loaded yet), the 'onCanPlay' event will handle it.
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Ignore "AbortError" (happens when skipping fast)
          if (error.name !== 'AbortError') {
            console.error("Playback failed:", error);
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // --- EVENT HANDLERS ---
  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsReady(true); // Song is ready!
    }
  };

  // If song fails to load (e.g., 403 Forbidden), this runs
  const handleError = (e) => {
    console.error("Audio Error Code:", e.target.error ? e.target.error.code : "Unknown");
    console.error("Audio Error Details:", e.target.error);
    alert("Error playing song. Check Console for details (likely Supabase Permissions).");
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-green-900/30 p-3 z-50 h-24 flex flex-col justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.6)] transition-all duration-500">
      
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* LEFT: Song Info */}
        <div className="flex items-center gap-4 w-1/4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-green-500/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <img 
              src={currentTrack.cover_image || "https://placehold.co/50"} 
              alt="cover" 
              className="relative w-14 h-14 rounded-md object-cover shadow-lg border border-white/5" 
            />
          </div>
          <div className="hidden md:block truncate">
            <h4 className="font-bold text-sm truncate text-white tracking-wide">{currentTrack.title}</h4>
            <p className="text-xs text-green-400 truncate font-medium opacity-80">{currentTrack.artist}</p>
          </div>
        </div>

        {/* CENTER: Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          
          <div className="flex items-center gap-6 mb-2">
             <button onClick={playPrevious} className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
             </button>

             <button 
               onClick={() => setIsPlaying(!isPlaying)}
               className="relative group focus:outline-none"
             >
               <div className="absolute inset-0 bg-green-500/40 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
               <div className="relative bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-95">
                 {isPlaying ? 
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-green-700" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> 
                   : 
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-green-700 ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 }
               </div>
             </button>

             <button onClick={playNext} className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
             </button>
          </div>

          <div className="flex items-center gap-3 w-full max-w-xl group">
            <span className="text-xs text-gray-400 w-10 text-right font-mono">{formatTime(currentTime)}</span>
            <div className="relative w-full h-1 bg-gray-700 rounded-full cursor-pointer overflow-hidden">
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={currentTime} 
                onChange={handleSeek}
                className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
              />
              <div 
                className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 w-10 font-mono">{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT: Volume */}
        <div className="flex items-center justify-end w-1/4 gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
           </svg>
           <input 
             type="range" 
             min="0" 
             max="1" 
             step="0.01" 
             value={volume} 
             onChange={handleVolumeChange}
             className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
           />
        </div>

      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.audio_url} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext} 
        onError={handleError}     // <--- Added Error Handling
        preload="auto"            // <--- Forces browser to load it
        autoPlay={isPlaying}      // <--- Helps browser understand intent
      />
    </div>
  );
}
