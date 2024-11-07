import { useEffect, useState } from 'react';
import { useEPDService } from '@/hooks/useEPDService';

export function useFetchTemplates(search?: string) {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const epdService = useEPDService();

  useEffect(() => {
    if (epdService) {
      const fetchTemplates = async () => {
        try {
          const data = await epdService.getTemplates();
          setTemplates(data.objects);
        } catch (error) {
          console.error('Error fetching templates:', error);
        }
      };

      fetchTemplates();
    }
  }, [epdService]);

  useEffect(() => {
    if (epdService) {
      const fetchTemplates = async () => {
        try {
          const data = await epdService.getTemplates();
          setTemplates(data.objects);
        } catch (error) {
          console.error('Error fetching templates:', error);
        }
      };

      fetchTemplates();
    }
  }, [epdService?.token]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const fetchedTemplates = await epdService?.getTemplates(search);
        if (!fetchedTemplates) return;
        setTemplates(fetchedTemplates.objects);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [search]);

  return { templates, isLoading };
}