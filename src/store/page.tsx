"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to /auth/login when the page is mounted
    router.push('/auth/login');
  }, [router]);

  return null; // Return null or a loading state while redirecting
};

export default Page;
