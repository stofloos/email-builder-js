import { useEffect, useRef, useState } from 'react';

import { useToken } from '../contexts/TokenContext';
import { EPDService } from '../services/epd-service';

let epdServiceInstance: EPDService | null = null;

export const useEPDService = () => {
  const { token } = useToken();
  const [service, setService] = useState<EPDService | null>(null);
  const previousToken = useRef<string | null>(null);

  useEffect(() => {
    if (token && token !== previousToken.current) {
      if (!epdServiceInstance) {
        epdServiceInstance = new EPDService(token);
      } else {
        epdServiceInstance.updateToken(token);
      }
      setService(epdServiceInstance);
      previousToken.current = token;
    }
  }, [token]);

  return service;
};
