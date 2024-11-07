import { useEffect, useState } from 'react';
import { useEPDService } from '@/hooks/useEPDService';

export function useFetchTemplateById(templateId: string) {
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const epdService = useEPDService();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const fetchedTemplate = await epdService?.getTemplateById(templateId);
        if (!fetchedTemplate) return;
        setTemplate(fetchedTemplate);
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (epdService && templateId) {
      fetchTemplate();
    }
  }, [epdService, templateId]);

  return { template, isLoading };
}