import { useEffect, useState } from 'react';
import { fetchPlaylists, createPlaylist } from '../services/api';
import { Link } from 'react-router-dom';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const loadPlaylists = async () => {
    const data = await fetchPlaylists();
    setPlaylists(data || []);
  };

  useEffect(() => { loadPlaylists(); }, []);

  const handleCreate = async () => {
    if (!newTitle) return;
    await createPlaylist(newTitle, "My custom playlist");
    setNewTitle('');
    loadPlaylists(); // Refresh list
  };

  return (
    <div className="container mx-auto p-6 pb-24 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Library</h2>

      {/* Create New Playlist Box */}
      <div className="bg-gray-800 p-4 rounded-lg mb-8 max-w-md">
        <h3 className="font-bold mb-2">Create New Playlist</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Playlist Name" 
            className="bg-gray-700 p-2 rounded w-full text-white"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleCreate} className="bg-green-500 text-black px-4 py-2 rounded font-bold">
            +
          </button>
        </div>
      </div>

      {/* List Playlists */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {playlists.map((list) => (
          <Link to={`/playlists/${list.id}`} key={list.id} className="block p-6 bg-gradient-to-br from-purple-900 to-gray-800 rounded-lg hover:scale-105 transition">
             <h3 className="font-bold text-xl">{list.title}</h3>
             <p className="text-gray-400 text-sm">{list.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}