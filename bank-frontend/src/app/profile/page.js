'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfileSettingsPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('Active');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('username') || localStorage.getItem('user_name') || 'user';
    setName(storedName);
    setUsername('@' + storedName.toLowerCase().replace(/\s+/g, ''));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    localStorage.setItem('username', name);
    localStorage.setItem('user_name', name);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success('Profile picture updated locally!');
    }
  };

  const handleDeletePicture = () => {
    setProfileImage(null);
    toast.success('Profile picture removed.');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    localStorage.setItem('user_name', name);
    toast.success('Changes saved successfully!');
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 flex flex-col md:flex-row overflow-hidden">
      <Toaster position="top-right" />

      {/* Full Height Sidebar */}
      <div className="w-full md:w-72 bg-zinc-950 text-white flex flex-col md:min-h-screen">
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Arcana.</h2>
          <p className="text-zinc-500 text-sm mt-1">Account Settings</p>
        </div>
        <ul className="flex-1 px-4 space-y-2 text-sm font-semibold mt-4">
          <li className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800 text-white cursor-pointer transition">
            <span className="text-lg">👤</span> Profile
          </li>
          <li className="flex items-center gap-3 p-4 rounded-xl text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer transition" onClick={() => router.push('/dashboard')}>
            <span className="text-lg">📊</span> Dashboard
          </li>
          <li className="flex items-center gap-3 p-4 rounded-xl text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer transition" onClick={() => router.push('/transfer')}>
            <span className="text-lg">💸</span> Transfer
          </li>
          <li className="flex items-center gap-3 p-4 rounded-xl text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer transition" onClick={() => router.push('/transactions')}>
            <span className="text-lg">🔄</span> Transactions
          </li>
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto">
          
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-zinc-100">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Profile</h1>
              <p className="text-zinc-500 text-sm mt-1">Manage your personal information.</p>
            </div>
            <button onClick={() => router.push('/dashboard')} className="text-zinc-400 hover:text-zinc-900 font-bold transition">✕ Close</button>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-8">
            
            {/* Profile Picture */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Profile picture</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-100 text-zinc-400 flex items-center justify-center font-bold text-3xl shadow-sm border border-zinc-200">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()}
                    className="bg-zinc-900 hover:bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl transition shadow-md"
                  >
                    Change
                  </button>
                  <button 
                    type="button" 
                    onClick={handleDeletePicture}
                    className="bg-white hover:bg-zinc-50 text-red-600 text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl transition border border-zinc-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-500 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Status</label>
              <input 
                type="text" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">About me</label>
              <textarea 
                rows="4" 
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write something about yourself..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-zinc-900 font-medium focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all resize-none" 
              />
            </div>

            <div className="flex justify-end pt-6 border-t border-zinc-100">
              <button 
                type="submit" 
                className="bg-zinc-900 hover:bg-black text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition shadow-xl"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}