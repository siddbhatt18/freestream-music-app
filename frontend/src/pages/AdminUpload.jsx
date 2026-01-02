import { useState } from 'react';
import { supabase } from '../supabaseClient'; // We use direct client for file upload
import { addTrackToDb } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminUpload() {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    audioFile: null,
    imageFile: null
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.audioFile || !formData.imageFile) return alert("Please select both files");

    setUploading(true);
    try {
      // 1. Upload Audio
      const audioName = `${Date.now()}-${formData.audioFile.name}`;
      const { data: audioData, error: audioError } = await supabase.storage
        .from('music')
        .upload(audioName, formData.audioFile);
      
      if (audioError) throw audioError;
      
      const audioUrl = supabase.storage.from('music').getPublicUrl(audioName).data.publicUrl;

      // 2. Upload Image
      const imageName = `${Date.now()}-${formData.imageFile.name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('covers')
        .upload(imageName, formData.imageFile);
      
      if (imageError) throw imageError;

      const imageUrl = supabase.storage.from('covers').getPublicUrl(imageName).data.publicUrl;

      // 3. Save to Database
      await addTrackToDb({
        title: formData.title,
        artist: formData.artist,
        audio_url: audioUrl,
        cover_image: imageUrl
      });

      alert("Upload Successful!");
      navigate('/'); // Go back home
    } catch (error) {
      console.error(error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 pb-24 text-white">
      <h2 className="text-3xl font-bold mb-6">Upload New Track</h2>
      
      <form onSubmit={handleUpload} className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto space-y-4">
        
        {/* Title */}
        <div>
          <label className="block mb-2 font-bold">Song Title</label>
          <input 
            type="text" 
            className="w-full p-2 bg-gray-700 rounded"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        {/* Artist */}
        <div>
          <label className="block mb-2 font-bold">Artist Name</label>
          <input 
            type="text" 
            className="w-full p-2 bg-gray-700 rounded"
            value={formData.artist}
            onChange={(e) => setFormData({...formData, artist: e.target.value})}
            required
          />
        </div>

        {/* Audio File */}
        <div>
          <label className="block mb-2 font-bold text-green-400">Audio File (MP3)</label>
          <input 
            type="file" 
            name="audioFile"
            accept="audio/*"
            className="w-full p-2 bg-gray-700 rounded"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-2 font-bold text-purple-400">Cover Image</label>
          <input 
            type="file" 
            name="imageFile"
            accept="image/*"
            className="w-full p-2 bg-gray-700 rounded"
            onChange={handleFileChange}
            required
          />
        </div>

        <button 
          disabled={uploading}
          className={`w-full py-3 rounded font-bold ${uploading ? 'bg-gray-600' : 'bg-green-500 hover:bg-green-400 text-black'}`}
        >
          {uploading ? "Uploading..." : "Upload Song"}
        </button>

      </form>
    </div>
  );
}