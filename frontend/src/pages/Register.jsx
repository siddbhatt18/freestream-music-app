import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
        alert("Registration successful!");
        navigate('/');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-3 bg-gray-700 rounded border border-gray-600"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-3 bg-gray-700 rounded border border-gray-600"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="w-full bg-blue-500 p-2 rounded font-bold hover:bg-blue-600">Sign Up</button>
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}