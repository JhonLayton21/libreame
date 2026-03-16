import * as FileSystem from 'expo-file-system/legacy';
import * as DocumentPicker from 'expo-document-picker';

export interface PickedPDF {
  uri: string;
  name: string;
  size: number;
}

const PDF_STORAGE_DIRECTORY = FileSystem.documentDirectory + 'libreame/pdfs/';

export const pdfService = {
  /**
   * Obtiene o crea el directorio de almacenamiento de PDFs
   */
  ensurePDFDirectory: async (): Promise<void> => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(PDF_STORAGE_DIRECTORY);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(PDF_STORAGE_DIRECTORY, {
          intermediates: true,
        });
      }
    } catch (error) {
      console.error('Error creando directorio de PDFs:', error);
      throw new Error('No se pudo crear el directorio de almacenamiento');
    }
  },

  /**
   * Abre el file picker para seleccionar un PDF
   */
  pickPDFDocument: async (): Promise<PickedPDF> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        throw new Error('Selección cancelada');
      }

      const asset = result.assets[0];
      
      return {
        uri: asset.uri,
        name: asset.name,
        size: asset.size || 0,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error seleccionando archivo';
      throw new Error(`Error en document picker: ${message}`);
    }
  },

  /**
   * Copia el PDF a almacenamiento persistente
   */
  savePDFLocally: async (pickedPDF: PickedPDF): Promise<string> => {
    try {
      // Asegurar que existe el directorio
      await pdfService.ensurePDFDirectory();

      // Crear nombre único para el archivo (evitar conflictos)
      const timestamp = Date.now();
      const filename = `${timestamp}_${pickedPDF.name}`;
      const destinationPath = PDF_STORAGE_DIRECTORY + filename;

      // Copiar archivo
      await FileSystem.copyAsync({
        from: pickedPDF.uri,
        to: destinationPath,
      });

      console.log('PDF guardado en:', destinationPath);
      return destinationPath;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error guardando PDF: ${message}`);
    }
  },

  /**
   * Elimina un PDF del almacenamiento local
   */
  deletePDFLocally: async (filePath: string): Promise<void> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
        console.log('PDF eliminado:', filePath);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error eliminando PDF: ${message}`);
    }
  },
};
