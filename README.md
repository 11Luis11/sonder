# 🎮 GLITCH REALM - Rockstar Aesthetic Web Experience

## 📋 DESCRIPCIÓN
Página web interactiva con temática Rockstar Games, efectos glitch dinámicos, música de fondo y sistema modular para agregar segmentos con imágenes y sonidos.

---

## 🚀 CÓMO EMPEZAR

1. **Abre el archivo `index.html`** en tu navegador
2. **Haz clic en "▶ REPRODUCIR"** para escuchar la música de fondo
3. **Haz clic en "+ AGREGAR SEGMENTO"** para crear nuevos elementos

---

## 🎵 MÚSICA DE FONDO

### Ubicación del archivo:
```
/assets/music/background.mp3
```

### Cómo reemplazar:
1. Coloca tu archivo de música en la carpeta `assets/music/`
2. **Renómbralo como: `background.mp3`**
3. Recarga la página

### Formato recomendado:
- **Formato:** MP3, OGG o WAV
- **Duración:** 3-5 minutos (será repetitiva)
- **Volumen:** Mantenlo suave (algo de 20-40%)
- **Tempo:** Lento/Atmosférico para mejor efecto

---

## 🎨 SEGMENTOS - CÓMO CREAR

### Paso 1: Imágenes
**Carpeta:** `assets/images/`

**Nombres recomendados:**
```
segment_001.png  ← Primer segmento
segment_002.png  ← Segundo segmento
segment_003.png  ← Tercer segmento
segment_004.png  ← Y así sucesivamente...
```

**Características:**
- Tamaño recomendado: 400x300px o similar
- Formatos: PNG, JPG, JPEG, GIF, WEBP
- La imagen se mostrará con efecto glitch

### Paso 2: Sonidos de Efectos
**Carpeta:** `assets/sounds/`

**Nombres recomendados:**
```
glitch_001.mp3   ← Primer efecto de sonido
glitch_002.mp3   ← Segundo efecto
glitch_003.mp3   ← Tercer efecto
glitch_004.mp3   ← Y así sucesivamente...
```

**Características:**
- Duración: 0.5-2 segundos (sonidos cortos)
- Formatos: MP3, OGG, WAV
- Ejemplos de sonidos:
  - Glitch digital
  - Sonidos de error
  - Pitidos futuristas
  - Ruido blanco procesado
  - Síntesis FM

---

## 🎪 TIPOS DE GLITCH DISPONIBLES

Al crear un segmento, puedes elegir entre 4 tipos de animaciones:

### 1. **Distorsión Roja** (`glitch-1`)
- Efecto de deformación clásico
- Movimiento en capas aleatorias
- Perfecto para imágenes dinámicas

### 2. **Scan Lines** (`glitch-2`)
- Efecto de líneas de escaneo
- Simulación de pantalla antigua
- Glow dinámico

### 3. **Dispersión Caótica** (`glitch-3`)
- Cortes y saltos aleatorios
- Muy visual y agresivo
- Ideal para efectos dramaticos

### 4. **Deformación Digital** (`glitch-4`)
- Efecto de onda suave
- Distorsión de sesgo
- Más elegante y fluido

---

## 🛠️ ESTRUCTURA DE CARPETAS

```
rockstar-glitch-web/
│
├── index.html                (Página principal)
├── styles.css                (Estilos Rockstar)
├── script.js                 (Lógica interactiva)
├── README.md                 (Este archivo)
│
└── assets/
    ├── music/
    │   └── background.mp3    (Tu música aquí)
    │
    ├── sounds/
    │   ├── glitch_001.mp3    (Tus sonidos aquí)
    │   ├── glitch_002.mp3
    │   └── ...
    │
    └── images/
        ├── segment_001.png   (Tus imágenes aquí)
        ├── segment_002.png
        └── ...
```

---

## 🎯 GUÍA PASO A PASO - CREAR UN SEGMENTO

### Opción A: Desde cero
1. **Prepara tu imagen** (ej: glitch_visual_1.png)
2. **Prepara tu sonido** (ej: glitch_sound_1.mp3)
3. Haz clic en **"+ AGREGAR SEGMENTO"**
4. Completa los campos:
   - **Título:** "Falla Digital #1" (o lo que desees)
   - **Imagen:** Selecciona tu PNG
   - **Sonido:** Selecciona tu MP3
   - **Tipo de Glitch:** Elige el efecto visual
5. Haz clic en **"CREAR SEGMENTO"**

### Opción B: Sin imagen o sin sonido
- Puedes crear segmentos solo con título
- O solo con imagen (sin sonido)
- O solo con sonido (sin imagen)
- ¡La página es flexible!

---

## 🎨 PALETA DE COLORES ROCKSTAR

Colores usados en la página (inspirados en Rockstar Games):

```
Rojo Intenso:      #DD0000
Rojo Oscuro:       #990000
Negro Profundo:    #0a0a0a
Blanco Puro:       #ffffff
Oro/Amarillo:      #FFD700
Verde Glitch:      #00ff00
Gris Base:         #1a1a1a
```

---

## ⚙️ CARACTERÍSTICAS PRINCIPALES

✅ **Música de fondo** con control de volumen
✅ **4 tipos de efectos glitch** diferentes
✅ **Segmentos modulares** - agrega cuántos quieras
✅ **Almacenamiento local** - los segmentos se guardan automáticamente
✅ **Efectos de sonido generados** - cada clic produce un glitch
✅ **Diseño responsivo** - funciona en móvil y desktop
✅ **Animaciones suaves** - transiciones naturales
✅ **Tema Rockstar Games** - colores vibrantes y agresivos

---

## 💡 CONSEJOS PRO

### Para mejor experiencia visual:
- Usa imágenes con contraste alto (blanco/negro/rojo)
- Experimenta con diferentes tipos de glitch
- Mezcla segmentos con y sin imagen

### Para mejor experiencia sonora:
- Mantén la música de fondo suave (20-40%)
- Los efectos glitch deben ser cortos y punzantes
- Alterna entre sonidos altos y bajos

### Diseño:
- Los "espacios grandes" son los segmentos - úsalos generosamente
- Cada segmento se puede hacer clic para reproducir sonidos
- Pasa el mouse sobre los botones para ver efectos hover

---

## 📱 COMPATIBILIDAD

- ✅ Chrome, Edge, Firefox, Safari (últimas versiones)
- ✅ Móvil (iOS Safari, Chrome Mobile)
- ✅ Tablet
- ⚠️ Algunos navegadores pueden bloquear reproducción automática de audio

---

## 🎬 EJEMPLO DE SEGMENTO COMPLETO

```
TÍTULO:         "Falla del Sistema"
IMAGEN:         assets/images/segment_001.png
SONIDO:         assets/sounds/glitch_001.mp3
TIPO GLITCH:    Distorsión Roja (glitch-1)
EFECTO:         Al hacer clic, reproduces el sonido
                La imagen tiene animación de glitch
                Hover muestra efectos visuales extras
```

---

## 🔊 GENERAR SONIDOS DE GLITCH

Si necesitas crear tus propios sonidos de glitch, puedes usar:

1. **Online:** freesound.org, zapsplat.com
2. **Software:** Audacity (libre), GarageBand, FL Studio
3. **Generadores:** jsfxr.net (genera sonidos retro pixelados)

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### La música no se reproduce
- Comprueba que `background.mp3` está en `assets/music/`
- Algunos navegadores requieren interacción del usuario primero
- Haz clic en "▶ REPRODUCIR"

### Los segmentos no se guardan
- Verifica que localStorage está habilitado
- Los datos se guardan automáticamente en tu navegador

### Los sonidos no suenan
- Comprueba que tu archivo está en formato MP3
- Verifica el volumen de tu computadora
- Prueba con Chrome si otro navegador tiene problemas

---

## 📝 LICENCIA Y CRÉDITOS

Creado como experiencia web estilo Rockstar Games.
Puedes personalizarlo completamente con tu contenido.

---

## 🎮 ¡DIVIÉRTETE CREANDO!

Experimenta con diferentes colores, sonidos e imágenes. 
La temática de "fallas" permite ser muy creativo.

¡Haz tu página glitch! 🔴⚫💛
