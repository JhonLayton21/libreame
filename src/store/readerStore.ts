import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReaderState {
  // Estado del PDF actual
  currentPDFPath: string | null;
  currentPDFName: string | null;
  currentPDFSize: number | null;
  
  // Control de carga
  isLoadingPDF: boolean;
  error: string | null;
  
  // Acciones
  setPDFPath: (path: string, name: string, size: number) => Promise<void>;
  clearPDF: () => Promise<void>;
  loadSavedPDF: () => Promise<void>;
}

export const useReaderStore = create<ReaderState>(
  (set) => ({
    currentPDFPath: null,
    currentPDFName: null,
    currentPDFSize: null,
    isLoadingPDF: false,
    error: null,

    setPDFPath: async (path: string, name: string, size: number) => {
      try {
        set({ isLoadingPDF: true, error: null });
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem(
          'savedPDF',
          JSON.stringify({ path, name, size, timestamp: Date.now() })
        );
        
        set({
          currentPDFPath: path,
          currentPDFName: name,
          currentPDFSize: size,
          isLoadingPDF: false,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        set({ error: message, isLoadingPDF: false });
      }
    },

    clearPDF: async () => {
      try {
        await AsyncStorage.removeItem('savedPDF');
        set({
          currentPDFPath: null,
          currentPDFName: null,
          currentPDFSize: null,
          error: null,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        set({ error: message });
      }
    },

    loadSavedPDF: async () => {
      try {
        const saved = await AsyncStorage.getItem('savedPDF');
        if (saved) {
          const { path, name, size } = JSON.parse(saved);
          set({
            currentPDFPath: path,
            currentPDFName: name,
            currentPDFSize: size,
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        set({ error: message });
      }
    },
  })
);
