import { useEffect, useState } from 'react';
import { fetchTracks, fetchHistory } from '../services/api';
import MusicCard from '../components/MusicCard';
import Loader from '../components/Loader';

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tracksData, historyData] = await Promise.all([
          fetchTracks(),
          fetchHistory()
        ]);
        setTracks(tracksData || []);
        setHistory(historyData || []);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-6 pb-32">
      
      {/* 1. Recently Played Section */}
      {history.length > 0 && (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {history.map((track) => (
                    <MusicCard 
                      key={`history-${track.id}`} 
                      track={track} 
                      contextList={history} // Clicking these plays the history queue
                    />
                ))}
            </div>
        </div>
      )}

      {/* 2. All Tracks Section */}
      <h2 className="text-3xl font-bold text-white mb-6">Trending Music</h2>
      {tracks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tracks.map((track) => (
            <MusicCard 
              key={track.id} 
              track={track} 
              contextList={tracks} // Clicking these plays the main trending queue
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-10">No music found.</div>
      )}
    </div>
  );
}