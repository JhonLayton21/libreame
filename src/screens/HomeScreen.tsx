import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelectPDF } from '@/hooks/useSelectPDF';
import { useReaderStore } from '@/store/readerStore';

export default function HomeScreen() {
  const { selectAndSavePDF, isLoading, error } = useSelectPDF();
  const {
    currentPDFName,
    currentPDFSize,
    isLoadingPDF,
    loadSavedPDF,
  } = useReaderStore();

  // Cargar PDF guardado al montar el componente
  useEffect(() => {
    loadSavedPDF();
  }, [loadSavedPDF]);

  // Mostrar error si existe
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleSelectPDF = async () => {
    const success = await selectAndSavePDF();
    if (success) {
      Alert.alert('Éxito', 'PDF subido correctamente');
    }
  };

  const handleRemovePDF = () => {
    const clearPDF = useReaderStore.getState().clearPDF;
    clearPDF();
    Alert.alert('PDF eliminado', 'El PDF ha sido removido');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Libreame</Text>
          <Text style={styles.subtitle}>Aplicación de lectura de PDF</Text>
        </View>

        {/* Estado actual del PDF */}
        <View style={styles.pdfStatusSection}>
          {currentPDFName ? (
            <View style={styles.pdfCard}>
              <MaterialIcons name="picture-as-pdf" size={48} color="#EF4444" />
              <Text style={styles.pdfName} numberOfLines={2}>
                {currentPDFName}
              </Text>
              <Text style={styles.pdfSize}>
                {currentPDFSize ? formatFileSize(currentPDFSize) : 'Tamaño desconocido'}
              </Text>
              
              <TouchableOpacity
                style={styles.removePDFButton}
                onPress={handleRemovePDF}
              >
                <MaterialIcons name="delete" size={20} color="#EF4444" />
                <Text style={styles.removePDFButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="folder-open" size={64} color="#CBD5E1" />
              <Text style={styles.emptyStateText}>No hay PDF cargado</Text>
              <Text style={styles.emptyStateSubtext}>
                Selecciona un PDF para comenzar
              </Text>
            </View>
          )}
        </View>

        {/* Botón principal */}
        <TouchableOpacity
          style={[
            styles.selectButton,
            (isLoading || isLoadingPDF) && styles.selectButtonDisabled,
          ]}
          onPress={handleSelectPDF}
          disabled={isLoading || isLoadingPDF}
        >
          {isLoading || isLoadingPDF ? (
            <>
              <ActivityIndicator color="white" style={styles.spinner} />
              <Text style={styles.selectButtonText}>Cargando...</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="upload" size={24} color="white" />
              <Text style={styles.selectButtonText}>
                {currentPDFName ? 'Cambiar PDF' : 'Subir PDF'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Info footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            La app permite leer PDFs con experiencia tipo libro
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  pdfStatusSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 32,
  },
  pdfCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  pdfName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 12,
    textAlign: 'center',
  },
  pdfSize: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },
  removePDFButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  removePDFButtonText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  selectButtonDisabled: {
    backgroundColor: '#93C5FD',
    shadowOpacity: 0.15,
  },
  spinner: {
    marginRight: 12,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
