import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof sessionStorage === 'undefined') return null;
    return sessionStorage.getItem('token') || null;
  });

  const setToken = (token: string) => {
    if (typeof sessionStorage === 'undefined') return;
    setTokenState(token);
    sessionStorage.setItem('token', token);
  };

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return;
    const storedToken = sessionStorage?.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};