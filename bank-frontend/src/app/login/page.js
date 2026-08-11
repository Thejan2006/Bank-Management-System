'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../lib/api';

// අර අපි අලුතෙන් හදපු UI Component එක මෙතනින් Import කරගන්නවා
import LoginUI from '../../components/LoginUI'; 

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const endpoint = isLogin
      ? `${API_BASE_URL}/login`
      : `${API_BASE_URL}/register`;
    
    const payload = isLogin 
      ? { username, password } 
      : { name: username, pin: password, email };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.error) {
          toast.error(typeof data.error === 'object' ? JSON.stringify(data.error) : data.error);
        } else {
          if (isLogin) {
            if (data.user_id) {
              localStorage.setItem('user_id', data.user_id);
              localStorage.setItem('username', data.username || username);
              if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
              }
              
              toast.success('Login successful! Redirecting...');
              setTimeout(() => router.push('/dashboard'), 1000);
            } else {
              toast.success(data.message || 'Login successful!');
            }
          } else {
            if (data.user_id) {
              localStorage.setItem('user_id', data.user_id);
              localStorage.setItem('username', username);
              if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
              }
              
              toast.success('Registration successful! Redirecting...');
              setTimeout(() => router.push('/dashboard'), 1000);
            } else {
              toast.success('Registration successful! Please login.');
              setIsLogin(true);
            }
          }
        }
      } else {
        const errorMsg = data.detail || data.error || 'Invalid credentials or server error.';
        toast.error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to connect to the backend server.');
    }
  };

  // connect ui here
  return (
    <LoginUI 
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
}
