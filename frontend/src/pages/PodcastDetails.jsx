import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPodcastDetails } from '../services/api';
import { usePlayer } from '../context/PlayerContext';

export default function PodcastDetails() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const { playTrack } = usePlayer();

  useEffect(() => {
    const load = async () => {
      const data = await fetchPodcastDetails(id);
      setPodcast(data);
    };
    load();
  }, [id]);

  if (!podcast) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="p-8 pb-24 text-white">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img src={podcast.cover_image} alt={podcast.title} className="w-48 h-48 rounded object-cover" />
        <div>
          <h1 className="text-4xl font-bold mb-2">{podcast.title}</h1>
          <p className="text-xl text-gray-400 mb-4">Hosted by {podcast.host}</p>
          <p>{podcast.description}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Episodes</h3>
      <div className="space-y-4">
        {podcast.episodes?.map((ep) => (
          <div key={ep.id} className="bg-gray-800 p-4 rounded flex justify-between items-center hover:bg-gray-700">
             <span>{ep.title}</span>
             <button 
               onClick={() => playTrack({ ...ep, artist: podcast.title, cover_image: podcast.cover_image })}
               className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold"
             >
               Play
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}