# NOCTURNO

Sitio de una sola página, blanco y negro, con una galería interactiva
(zoom al pasar el mouse, vista ampliada al hacer clic, navegación con
flechas del teclado). No usa música ni paneles de subida — las
imágenes se agregan directamente en el código, así que no depende de
que nadie más las suba.

---

## Cómo nombrar y añadir tus imágenes

### Paso 1 — Nombra tus archivos

Ponles nombres simples y en orden:

```
01.jpg
02.jpg
03.jpg
04.jpg
```

Puedes usar `.jpg`, `.png` o `.webp` — cualquiera funciona igual.
Evita espacios, tildes o mayúsculas en el nombre del archivo
(`01.jpg` sí, `Foto Final (1).JPG` no).

### Paso 2 — Colócalas en la carpeta correcta

```
assets/images/01.jpg
assets/images/02.jpg
assets/images/03.jpg
```

### Paso 3 — Decláralas en `script.js`

Abre `script.js` y busca el arreglo `GALLERY`, cerca del inicio del
archivo. Por cada imagen agrega una línea:

```js
const GALLERY = [
  { file: "01.jpg", title: "Fragmento I",   textura: "grano" },
  { file: "02.jpg", title: "Fragmento II",  textura: "scan" },
  { file: "03.jpg", title: "Fragmento III", textura: "distortion" },
  { file: "04.jpg", title: "Fragmento IV",  textura: "onda" },
];
```

- `file` → debe coincidir exactamente con el nombre del archivo.
- `title` → el texto que se muestra sobre la imagen (puedes poner lo
  que quieras).
- `textura` → opcional. Una de: `grano`, `scan`, `distortion`, `onda`.
  Si la omites, usa `grano` por defecto.

Guarda y recarga la página — no hace falta tocar nada más. El sitio
lee ese arreglo y arma la galería, el contador de piezas y la vista
ampliada automáticamente.

> Todas las imágenes se muestran siempre en blanco y negro (aunque
> subas una foto a color), para que la paleta del sitio no se rompa.

---

## Cambiar el nombre "Nocturno"

Aparece en tres lugares de `index.html`:

- `.nav__mark` → versión corta ("N.")
- `.hero__mark` (el texto y el atributo `data-text`)
- `.footer__mark`

Cámbialo ahí y en el `<title>` del `<head>`.

---

## Estructura de carpetas

```
nocturno/
├── index.html
├── styles.css
├── script.js      ← aquí declaras tus imágenes (arreglo GALLERY)
├── README.md
└── assets/
    └── images/    ← aquí van tus archivos (01.jpg, 02.jpg...)
```

---

## Compatibilidad

- Chrome, Edge, Firefox, Safari (versiones recientes)
- Responsive: escritorio, tablet y móvil
- El cursor circular personalizado solo aparece en dispositivos con
  mouse; en móvil se desactiva automáticamente
- Respeta `prefers-reduced-motion` para quienes desactivan animaciones
