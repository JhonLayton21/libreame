import { useState } from 'react';
import { pdfService, PickedPDF } from '@/services/pdfService';
import { pdfValidator } from '@/utils/pdfValidator';
import { useReaderStore } from '@/store/readerStore';

export const useSelectPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPDFPath = useReaderStore((state) => state.setPDFPath);

  const selectAndSavePDF = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Paso 1: Abrir document picker
      const pickedPDF: PickedPDF = await pdfService.pickPDFDocument();

      // Paso 2: Validar PDF
      const validation = pdfValidator.validatePMCFile(
        undefined,
        pickedPDF.name,
        pickedPDF.size
      );

      if (!validation.isValid) {
        setError(validation.error || 'Error validando el PDF');
        setIsLoading(false);
        return false;
      }

      // Paso 3: Guardar PDF localmente
      const savedPath = await pdfService.savePDFLocally(pickedPDF);

      // Paso 4: Actualizar store (incluye AsyncStorage)
      await setPDFPath(savedPath, pickedPDF.name, pickedPDF.size);

      setIsLoading(false);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      setIsLoading(false);
      return false;
    }
  };

  return {
    selectAndSavePDF,
    isLoading,
    error,
  };
};
