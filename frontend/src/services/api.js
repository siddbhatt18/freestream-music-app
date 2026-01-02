const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// --- MUSIC ---
export const fetchTracks = async () => {
  try {
    const response = await fetch(`${API_URL}/tracks`);
    if (!response.ok) throw new Error('Failed to fetch tracks');
    return await response.json();
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};

// --- PODCASTS ---
export const fetchPodcasts = async () => {
  try {
    const response = await fetch(`${API_URL}/podcasts`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return [];
  }
};

export const fetchPodcastDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/podcasts/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    return null;
  }
};

// --- PLAYLISTS ---
export const fetchPlaylists = async () => {
  const response = await fetch(`${API_URL}/playlists`);
  return await response.json();
};

export const createPlaylist = async (title, description) => {
  const response = await fetch(`${API_URL}/playlists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  return await response.json();
};

export const fetchPlaylistDetails = async (id) => {
  const response = await fetch(`${API_URL}/playlists/${id}`);
  return await response.json();
};

export const addTrackToPlaylist = async (playlistId, trackId) => {
  await fetch(`${API_URL}/playlists/${playlistId}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ track_id: trackId }),
  });
};

// --- HISTORY ---
export const addToHistory = async (trackId) => {
  await fetch(`${API_URL}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ track_id: trackId }),
  });
};

export const fetchHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/history`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};

// --- ADMIN ---
export const addTrackToDb = async (trackData) => {
  const response = await fetch(`${API_URL}/tracks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
  });
  return await response.json();
};

// --- SEARCH ---
export const searchContent = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${query}`);
    return await response.json();
  } catch (error) {
    console.error("Error searching:", error);
    return { tracks: [], podcasts: [] };
  }
};
