import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlaylistDetails, fetchTracks, addTrackToPlaylist } from '../services/api';
import { usePlayer } from '../context/PlayerContext';

export default function PlaylistDetails() {
  const { id } = useParams();
  const { playTrack } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [allTracks, setAllTracks] = useState([]); // Used for adding songs
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Load Playlist Info
  const loadPlaylist = async () => {
    const data = await fetchPlaylistDetails(id);
    setPlaylist(data);
  };

  useEffect(() => { 
    loadPlaylist(); 
    // Also fetch all available tracks so we can add them
    fetchTracks().then(setAllTracks);
  }, [id]);

  const handleAddTrack = async (trackId) => {
    await addTrackToPlaylist(id, trackId);
    setShowAddMenu(false);
    loadPlaylist(); // Refresh to see new song
  };

  if (!playlist) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6 pb-24 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-4xl font-bold">{playlist.title}</h1>
           <p className="text-gray-400">{playlist.description}</p>
        </div>
        <button 
           onClick={() => setShowAddMenu(!showAddMenu)}
           className="bg-green-500 text-black px-4 py-2 rounded font-bold"
        >
           {showAddMenu ? "Close Menu" : "Add Songs"}
        </button>
      </div>

      {/* Add Song Menu (Hidden by default) */}
      {showAddMenu && (
        <div className="bg-gray-800 p-4 rounded mb-6 border border-gray-600">
            <h3 className="font-bold mb-2">Tap a song to add it:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {allTracks.map(track => (
                    <button key={track.id} onClick={() => handleAddTrack(track.id)} className="text-left bg-gray-700 p-2 rounded hover:bg-gray-600 text-sm truncate">
                        {track.title}
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* Songs List */}
      <div className="space-y-2">
         {playlist.tracks && playlist.tracks.length > 0 ? (
             playlist.tracks.map((track) => (
               <div key={track.id} onClick={() => playTrack(track)} className="flex items-center gap-4 p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer">
                  <img src={track.cover_image} className="w-10 h-10 rounded" alt="art" />
                  <div>
                      <div className="font-bold">{track.title}</div>
                      <div className="text-sm text-gray-400">{track.artist}</div>
                  </div>
               </div>
             ))
         ) : (
             <p className="text-gray-500">This playlist is empty.</p>
         )}
      </div>
    </div>
  );
}