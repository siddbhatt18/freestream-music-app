import { useEffect, useState } from 'react';
import { fetchPodcasts } from '../services/api';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPodcasts();
      setPodcasts(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-6 pb-32">
      <h2 className="text-3xl font-bold text-white mb-6">Top Podcasts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {podcasts.map((pod) => (
          <Link to={`/podcasts/${pod.id}`} key={pod.id} className="group block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
            <div className="overflow-hidden">
                <img src={pod.cover_image} alt={pod.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-white truncate">{pod.title}</h3>
                <p className="text-sm text-gray-400">By {pod.host}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}