import Navbar from '../components/Navbar';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Bank Management System',
  description: 'Next.js & Python Bank System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}