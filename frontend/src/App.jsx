import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { Suspense, lazy } from 'react'; // Import lazy & Suspense
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import Loader from './components/Loader'; // Use your existing Loader

// Lazy Load Pages (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Podcasts = lazy(() => import('./pages/Podcasts'));
const PodcastDetails = lazy(() => import('./pages/PodcastDetails'));
const Playlists = lazy(() => import('./pages/Playlists'));
const PlaylistDetails = lazy(() => import('./pages/PlaylistDetails'));
const Search = lazy(() => import('./pages/Search'));
const AdminUpload = lazy(() => import('./pages/AdminUpload'));

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
          <Navbar />
          
          <div className="flex-1">
            {/* Suspense shows the Loader while the page code is being downloaded */}
            <Suspense fallback={<div className="pt-20"><Loader /></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/podcasts" element={<Podcasts />} />
                <Route path="/podcasts/:id" element={<PodcastDetails />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/playlists/:id" element={<PlaylistDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/admin" element={<AdminUpload />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Suspense>
          </div>
          
          <AudioPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;