const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- ROBUST CORS CONFIGURATION ---
app.use(cors({
    origin: (origin, callback) => {
        // 1. Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin) return callback(null, true);

        // 2. Allow Localhost (for development)
        if (origin.includes("localhost")) {
            return callback(null, true);
        }

        // 3. Allow ANY Vercel App (Fixes the "Mismatched URL" issue permanently)
        if (origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }

        // 4. Block everything else
        console.log("Blocked by CORS:", origin); // Log it so you can see it in Render logs
        callback(new Error('Not allowed by CORS'));
    }
}));

app.use(express.json());

// --- ROUTES ---

// 1. GET /tracks
app.get('/tracks', async (req, res) => {
    const { data, error } = await supabase.from('tracks').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 2. GET /podcasts
app.get('/podcasts', async (req, res) => {
    const { data, error } = await supabase.from('podcasts').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 3. GET /podcasts/:id
app.get('/podcasts/:id', async (req, res) => {
    const { id } = req.params;
    const { data: podcast, error: podcastError } = await supabase.from('podcasts').select('*').eq('id', id).single();
    if (podcastError) return res.status(500).json({ error: podcastError.message });

    const { data: episodes, error: episodesError } = await supabase.from('episodes').select('*').eq('podcast_id', id);
    if (episodesError) return res.status(500).json({ error: episodesError.message });

    res.json({ ...podcast, episodes });
});

// 4. GET /playlists
app.get('/playlists', async (req, res) => {
    const { data, error } = await supabase.from('playlists').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 5. POST /playlists
app.post('/playlists', async (req, res) => {
    const { title, description } = req.body;
    const { data, error } = await supabase.from('playlists').insert([{ title, description }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// 6. GET /playlists/:id
app.get('/playlists/:id', async (req, res) => {
    const { id } = req.params;
    const { data: playlist, error: plError } = await supabase.from('playlists').select('*').eq('id', id).single();
    if (plError) return res.status(500).json({ error: plError.message });

    const { data: linkData, error: linkError } = await supabase.from('playlist_tracks').select('track_id').eq('playlist_id', id);
    if (linkError) return res.status(500).json({ error: linkError.message });

    const trackIds = linkData.map(item => item.track_id);
    if (trackIds.length > 0) {
        const { data: tracks, error: tracksError } = await supabase.from('tracks').select('*').in('id', trackIds);
        if (tracksError) return res.status(500).json({ error: tracksError.message });
        res.json({ ...playlist, tracks });
    } else {
        res.json({ ...playlist, tracks: [] });
    }
});

// 7. POST /playlists/:id/add
app.post('/playlists/:id/add', async (req, res) => {
    const { id } = req.params;
    const { track_id } = req.body;
    const { error } = await supabase.from('playlist_tracks').insert([{ playlist_id: id, track_id }]);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Track added to playlist" });
});

// 8. POST /history
app.post('/history', async (req, res) => {
    const { track_id } = req.body;
    const { error } = await supabase.from('recently_played').insert([{ track_id, played_at: new Date() }]);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "History updated" });
});

// 9. GET /history
app.get('/history', async (req, res) => {
    const { data, error } = await supabase.from('recently_played').select(`track_id, played_at, tracks ( * )`).order('played_at', { ascending: false }).limit(10);
    if (error) return res.status(500).json({ error: error.message });
    const uniqueTracks = [];
    const seenIds = new Set();
    data.forEach(item => {
        if (item.tracks && !seenIds.has(item.track_id)) {
            uniqueTracks.push(item.tracks);
            seenIds.add(item.track_id);
        }
    });
    res.json(uniqueTracks.slice(0, 5));
});

// 10. POST /tracks (Admin Upload)
app.post('/tracks', async (req, res) => {
    const { title, artist, audio_url, cover_image } = req.body;
    const { data, error } = await supabase.from('tracks').insert([{ title, artist, audio_url, cover_image }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// 11. GET /search
app.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.json({ tracks: [], podcasts: [] });
    const { data: tracks, error: tracksError } = await supabase.from('tracks').select('*').ilike('title', `%${q}%`);
    if (tracksError) return res.status(500).json({ error: tracksError.message });
    const { data: podcasts, error: podcastsError } = await supabase.from('podcasts').select('*').ilike('title', `%${q}%`);
    if (podcastsError) return res.status(500).json({ error: podcastsError.message });
    res.json({ tracks, podcasts });
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
