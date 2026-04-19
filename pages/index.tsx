import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
