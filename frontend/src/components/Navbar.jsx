import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path 
    ? "text-green-500 border-b-2 border-green-500" 
    : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-black/90 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO UPDATED: FreeStream */}
        <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
          Free<span className="text-green-500">Stream</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 font-medium">
          <Link to="/" className={`pb-1 transition ${isActive('/')}`}>
            Music
          </Link>
          <Link to="/podcasts" className={`pb-1 transition ${isActive('/podcasts')}`}>
            Podcasts
          </Link>
          <Link to="/playlists" className={`pb-1 transition ${isActive('/playlists')}`}>
            Library
          </Link>
          <Link to="/search" className={`pb-1 transition ${isActive('/search')}`}>
            Search
          </Link>
        </div>

        {/* Upload Button */}
        <div>
           <Link to="/admin" className="text-yellow-500 hover:text-yellow-400 font-bold border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-500 hover:text-black transition">
              Upload
           </Link>
        </div>
      </div>
    </nav>
  );
}