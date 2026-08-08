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
    const storedName = localStorage.getItem('username') || localStorage.getItem('user_name') || 'user';;
    setName(storedName);
    setUsername('@' + storedName.toLowerCase().replace(/\s+/g, ''));
  }, []);

  // Handle image selection from device
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
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-800 flex justify-center p-6">
      <Toaster position="top-right" />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-sm border border-gray-100 flex overflow-hidden">
        
        {/* Left Sidebar Menu */}
        <div className="w-64 border-r border-gray-100 p-6 hidden md:block bg-gray-50/50">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Settings</h2>
          <ul className="space-y-2 text-sm font-semibold">
            <li className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 text-teal-600 cursor-pointer">👤 Profile</li>
            <li className="flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/dashboard')}>📊 Dashboard</li>
            <li className="flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/transfer')}>💸 Transfer</li>
            <li className="flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/transactions')}>🔄 Transactions</li>
          </ul>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 md:p-10">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-6 max-w-2xl">
            
            {/* Profile Picture Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Profile picture</label>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="flex gap-3">
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()}
                    className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
                  >
                    Change picture
                  </button>

                  <button 
                    type="button" 
                    onClick={handleDeletePicture}
                    className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition border border-red-100"
                  >
                    Delete picture
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 font-medium focus:outline-none" 
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status recently</label>
              <input 
                type="text" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500" 
              />
            </div>

            {/* About me */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About me</label>
              <textarea 
                rows="4" 
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write something about yourself..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" 
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                className="bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
              >
                Save changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}