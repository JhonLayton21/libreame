export interface PDFValidationResult {
  isValid: boolean;
  error?: string;
}

const MAX_PDF_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_MIME_TYPES = ['application/pdf'];

export const pdfValidator = {
  /**
   * Valida si un archivo es un PDF válido
   */
  validatePMCFile: (
    mimeType?: string,
    name?: string,
    size?: number
  ): PDFValidationResult => {
    // Validar nombre
    if (!name || typeof name !== 'string') {
      return {
        isValid: false,
        error: 'Nombre de archivo no válido',
      };
    }

    // Validar extensión
    const extension = name.toLowerCase().split('.').pop();
    if (extension !== 'pdf') {
      return {
        isValid: false,
        error: 'El archivo debe ser PDF',
      };
    }

    // Validar MIME type si está disponible
    if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
      return {
        isValid: false,
        error: 'Tipo de archivo no válido',
      };
    }

    // Validar tamaño
    if (!size || size === 0) {
      return {
        isValid: false,
        error: 'El archivo está vacío',
      };
    }

    if (size > MAX_PDF_SIZE) {
      return {
        isValid: false,
        error: `El archivo excede el tamaño máximo de ${MAX_PDF_SIZE / 1024 / 1024}MB`,
      };
    }

    return { isValid: true };
  },

  /**
   * Obtiene un nombre de archivo seguro
   */
  sanitizeFilename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase();
  },
};
