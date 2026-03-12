# 📚 App Lectora de Libros — Guía de Desarrollo

## 🎯 Objetivo del proyecto

Construir una aplicación móvil de lectura que simule la experiencia de leer un libro físico, priorizando:

* Experiencia de lectura natural
* Comodidad visual
* Animación realista de páginas
* Interfaz minimalista
* Carga de PDF local

El enfoque principal es el hábito de lectura, no la búsqueda de contenido.

---

# 🧱 Stack Tecnológico

## Base

* React Native
* Expo
* TypeScript

## Librerías principales

* react-native-pdf → renderizar PDF
* react-native-reanimated → animaciones fluidas
* react-native-gesture-handler → gestos
* expo-document-picker → subir PDF
* expo-file-system → almacenamiento local
* expo-brightness → control de brillo
* zustand o redux toolkit → estado global
* react-navigation → navegación

---

# 🏗 Arquitectura del proyecto

```
src/
 ├── components/
 │   ├── Reader/
 │   ├── PageFlip/
 │   ├── Controls/
 │
 ├── screens/
 │   ├── HomeScreen
 │   ├── ReaderScreen
 │
 ├── hooks/
 │   ├── useBrightness
 │   ├── useReaderState
 │
 ├── store/
 │   ├── readerStore.ts
 │
 ├── utils/
 │
 └── services/
```

---

# 🚀 MVP (Versión 1)

## Requisitos funcionales

### 1. Subir PDF local

* Seleccionar archivo del dispositivo
* Guardar ruta local

### 2. Visualizar PDF

* Renderizado por páginas
* Scroll deshabilitado
* Navegación por gesto

### 3. Pasar páginas estilo libro

* Swipe horizontal
* Animación tipo hoja
* Transición suave

### 4. Guardar progreso

* Última página leída
* Persistencia local

### 5. Modo lectura

* Modo oscuro
* Modo sepia
* Control de brillo

---

# ✨ Experiencia tipo libro (Core UX)

## Animación de páginas

Debe simular:

* curvatura de hoja
* resistencia del gesto
* velocidad dependiente del swipe

Implementación:

* Reanimated v3
* Gesture handler
* interpolación de transformaciones

---

## Modos de lectura

### Claro

* fondo blanco
* alto contraste

### Oscuro

* fondo negro
* texto claro

### Sepia

* fondo beige
* estilo libro antiguo

---

## Comodidad visual

* control manual de brillo
* márgenes amplios
* bloqueo de rotación opcional

---

# 🧠 Estado Global

Guardar:

* libro actual
* página actual
* progreso
* modo de lectura
* brillo

---

# 💾 Persistencia

Usar:

* AsyncStorage
* FileSystem

Guardar:

* último libro abierto
* página
* preferencias visuales

---

# 🎨 UI/UX Guidelines

* interfaz minimalista
* evitar distracciones
* controles ocultos al leer
* animaciones suaves
* tipografía legible

---

# 🔮 Roadmap futuro

## Fase 2

* biblioteca de libros
* marcadores
* subrayado
* notas
* estadísticas de lectura

## Fase 3

* sincronización en la nube
* cuentas de usuario
* recomendaciones IA

## Fase 4

* audiolibros con IA
* comunidad lectora
* marketplace de libros

---

# ⚡ Orden recomendado de desarrollo

1. Setup proyecto Expo + TypeScript
2. Subir PDF
3. Renderizar PDF
4. Navegación de páginas
5. Animación tipo libro
6. Guardar progreso
7. Modos de lectura
8. Control de brillo
9. UI refinada

---

# 🧪 Métrica de éxito del MVP

La app cumple su objetivo si:

* leer es cómodo durante 20+ minutos
* animación se siente natural
* no hay lag al cambiar páginas
* experiencia es mejor que abrir PDF normal

---

# 🎯 Filosofía del proyecto

No construir un lector PDF.
Construir una experiencia de lectura.
