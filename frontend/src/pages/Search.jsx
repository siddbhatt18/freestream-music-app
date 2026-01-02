import { useState, useEffect } from 'react';
import { searchContent } from '../services/api';
import { Link } from 'react-router-dom';
import MusicCard from '../components/MusicCard'; // Reusing your card
import { usePlayer } from '../context/PlayerContext';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ tracks: [], podcasts: [] });
  const { playTrack } = usePlayer();

  // "Debounce" logic: Search automatically when user stops typing for 500ms
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.trim()) {
        const data = await searchContent(query);
        setResults(data);
      } else {
        setResults({ tracks: [], podcasts: [] });
      }
    }, 500); // Wait 500ms before calling API

    return () => clearTimeout(delaySearch); // Cleanup if user types again
  }, [query]);

  return (
    <div className="container mx-auto p-6 pb-24 text-white">
      {/* Search Input */}
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search for songs, artists, or podcasts..." 
          className="w-full p-4 text-xl bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-green-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Results Area */}
      {query && (
        <div>
          {/* Songs Results */}
          <h3 className="text-2xl font-bold mb-4">Songs</h3>
          {results.tracks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {results.tracks.map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          ) : (
             <p className="text-gray-500 mb-8">No songs found.</p>
          )}

          {/* Podcast Results */}
          <h3 className="text-2xl font-bold mb-4">Podcasts</h3>
          {results.podcasts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {results.podcasts.map((pod) => (
                  <Link to={`/podcasts/${pod.id}`} key={pod.id} className="block bg-gray-800 rounded p-4 hover:bg-gray-700">
                     <img src={pod.cover_image} className="w-full h-32 object-cover rounded mb-2" />
                     <div className="font-bold truncate">{pod.title}</div>
                  </Link>
               ))}
            </div>
          ) : (
             <p className="text-gray-500">No podcasts found.</p>
          )}
        </div>
      )}
    </div>
  );
}