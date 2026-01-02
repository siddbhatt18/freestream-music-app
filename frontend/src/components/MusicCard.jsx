import { usePlayer } from '../context/PlayerContext';

export default function MusicCard({ track, contextList = [] }) {
  const { playTrack } = usePlayer();

  return (
    <div 
      onClick={() => playTrack(track, contextList)}
      className="group p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Cover Image Container */}
      <div className="w-full h-40 bg-gray-600 rounded-md mb-3 overflow-hidden relative">
        {track.cover_image ? (
          <img 
            src={track.cover_image} 
            alt={track.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
        
        {/* Play Icon Overlay (appears on hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
           <div className="bg-green-500 rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition duration-300">
             {/* Simple Play Triangle SVG */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black fill-current" viewBox="0 0 24 24">
               <path d="M8 5v14l11-7z" />
             </svg>
           </div>
        </div>
      </div>

      {/* Text Info */}
      <h3 className="font-bold text-white truncate">{track.title}</h3>
      <p className="text-sm text-gray-400 truncate">{track.artist}</p>
    </div>
  );
}