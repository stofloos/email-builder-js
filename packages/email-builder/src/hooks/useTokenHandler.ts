import { useEffect } from 'react';
import { useToken } from '@/contexts/TokenContext';
const EPD_FRONTEND_URL = process.env.NEXT_PUBLIC_EPD_FRONTEND_URL || "http://localhost:8001";

export function useTokenHandler() {
  const { setToken } = useToken();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== EPD_FRONTEND_URL) return; // Adjust to the correct origin
      const { token } = event.data;
      setToken(token);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setToken]);
}