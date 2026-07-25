// ==========================================================
// NOCTURNO — script principal
// ==========================================================
//
// CÓMO AÑADIR TUS IMÁGENES (lee esto primero)
// ----------------------------------------------------------
// 1. Guarda tus fotos dentro de la carpeta:  assets/images/
// 2. Nómbralas así, en orden:
//        01.jpg
//        02.jpg
//        03.jpg
//        ...
//    (jpg, png o webp — todas funcionan igual)
// 3. Agrega o edita una línea aquí abajo en GALLERY por cada
//    imagen, con el mismo nombre de archivo y el título que
//    quieras que aparezca:
//
//        { file: "04.jpg", title: "Fragmento IV" },
//
// 4. Guarda el archivo y recarga la página. Eso es todo —
//    no hay que subir nada desde el navegador.
//
// El campo "textura" es opcional (grano | scan | distortion | onda).
// Si lo omites, se usa "grano" por defecto.
// ==========================================================

const GALLERY = [
  { file: "01.jpg", title: "Fragmento I",   textura: "grano" },
  { file: "02.jpg", title: "Fragmento II",  textura: "scan" },
  { file: "03.jpg", title: "Fragmento III", textura: "distortion" },
  { file: "04.jpg", title: "Fragmento IV",  textura: "onda" },
];

const IMAGES_PATH = "assets/images/";

const segmentsContainer = document.getElementById('segmentsContainer');
const emptyState        = document.getElementById('emptyState');
const segmentCount      = document.getElementById('segmentCount');

// ----------------------------------------------------------
// PLACEHOLDER — para cuando la imagen todavía no existe
// (evita el ícono de "imagen rota" mientras el usuario
//  todavía no ha copiado sus fotos a assets/images/)
// ----------------------------------------------------------

function makePlaceholder(index, title) {
  const shades = ['#2a2a2a', '#1a1a1a', '#333', '#151515'];
  const c1 = shades[index % shades.length];
  const c2 = shades[(index + 2) % shades.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
      <defs>
        <linearGradient id="g${index}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
        <filter id="n${index}">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </defs>
      <rect width="600" height="750" fill="url(#g${index})"/>
      <rect width="600" height="750" filter="url(#n${index})" opacity="0.06"/>
      <text x="300" y="385" font-family="Georgia, serif" font-style="italic" font-size="42"
            fill="rgba(255,255,255,0.28)" text-anchor="middle">${title}</text>
    </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// ----------------------------------------------------------
// RENDER DE LA GALERÍA
// ----------------------------------------------------------

function renderGallery() {
  segmentsContainer.innerHTML = '';
  segmentCount.textContent = GALLERY.length;
  emptyState.style.display = GALLERY.length ? 'none' : 'block';

  GALLERY.forEach((item, index) => {
    const num = String(index + 1).padStart(3, '0');
    const textureClass = `tex-${item.textura || 'grano'}`;

    const el = document.createElement('article');
    el.className = `segment ${textureClass} reveal`;
    el.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;

    el.innerHTML = `
      <span class="segment__num">N&deg; ${num}</span>
      <div class="segment__image-wrap">
        <img class="segment__image" src="${IMAGES_PATH}${item.file}" alt="${item.title}" loading="lazy">
      </div>
      <div class="segment__body">
        <span class="segment__title">${item.title}</span>
      </div>
    `;

    const img = el.querySelector('.segment__image');
    img.addEventListener('error', () => {
      img.src = makePlaceholder(index, item.title);
      img.classList.add('is-placeholder');
    }, { once: true });

    el.addEventListener('click', () => openLightbox(index, el));
    el.addEventListener('mouseenter', () => cursorLabel.classList.add('is-visible'));
    el.addEventListener('mouseleave', () => {
      cursorLabel.classList.remove('is-visible');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--s', '1');
    });

    // tilt 3D siguiendo el mouse
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--rx', `${px * 10}deg`);
      el.style.setProperty('--ry', `${-py * 10}deg`);
      el.style.setProperty('--s', '1.02');
    });

    segmentsContainer.appendChild(el);
  });

  observeReveals();
}

// ----------------------------------------------------------
// LIGHTBOX — vista ampliada con navegación
// ----------------------------------------------------------

const lightbox        = document.getElementById('lightbox');
const lightboxImage    = document.getElementById('lightboxImage');
const lightboxCaption  = document.getElementById('lightboxCaption');
const lightboxClose    = document.getElementById('lightboxClose');
const lightboxPrev     = document.getElementById('lightboxPrev');
const lightboxNext     = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox(direction) {
  const item = GALLERY[currentIndex];
  const num = String(currentIndex + 1).padStart(3, '0');
  const swap = () => {
    lightboxImage.onerror = () => {
      lightboxImage.src = makePlaceholder(currentIndex, item.title);
    };
    lightboxImage.src = `${IMAGES_PATH}${item.file}`;
    lightboxImage.alt = item.title;
    lightboxCaption.textContent = `N° ${num} — ${item.title}`;
    lightboxImage.classList.remove('is-swapping');
  };

  if (direction && lightbox.classList.contains('is-open')) {
    lightboxImage.classList.add('is-swapping');
    setTimeout(swap, 180);
  } else {
    swap();
  }
}

function showNext() {
  currentIndex = (currentIndex + 1) % GALLERY.length;
  updateLightbox('next');
}

function showPrev() {
  currentIndex = (currentIndex - 1 + GALLERY.length) % GALLERY.length;
  updateLightbox('prev');
}

// --- soporte táctil: swipe para navegar ---
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) < 40) return;
  if (dx < 0) showNext(); else showPrev();
}, { passive: true });

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNext);
lightboxPrev.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

// ----------------------------------------------------------
// CURSOR PERSONALIZADO — con inercia (lerp) para que se
// sienta fluido en vez de pegado en seco al puntero
// ----------------------------------------------------------

const cursorLabel = document.getElementById('cursorLabel');
const cursorLabelText = document.getElementById('cursorLabelText');

let mouseX = -100, mouseY = -100;
let cursorX = -100, cursorY = -100;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  cursorLabel.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// el cursor cambia de texto/estado sobre los botones de cerrar/navegar
document.querySelectorAll('.lightbox__close, .lightbox__nav').forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    cursorLabel.classList.add('is-visible', 'is-close');
    cursorLabelText.textContent = btn.classList.contains('lightbox__close') ? 'CERRAR' : '';
  });
  btn.addEventListener('mouseleave', () => {
    cursorLabel.classList.remove('is-visible', 'is-close');
  });
});

// ----------------------------------------------------------
// EFECTO MAGNÉTICO — enlaces con [data-magnetic] se acercan
// levemente hacia el cursor al pasar por encima
// ----------------------------------------------------------

document.querySelectorAll('[data-magnetic]').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// ----------------------------------------------------------
// NAV — fondo sólido al hacer scroll
// ----------------------------------------------------------

const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}, { passive: true });

// ----------------------------------------------------------
// REVELADO AL HACER SCROLL
// ----------------------------------------------------------

let revealObserver;

function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    revealObserver.observe(el);
  });
}

// ----------------------------------------------------------
// INICIALIZAR
// ----------------------------------------------------------

document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  observeReveals();
});

// ----------------------------------------------------------
// INTRO — pequeña pantalla de carga con el logo antes de
// mostrar el sitio, para reforzar la sensación editorial
// ----------------------------------------------------------

const intro = document.getElementById('intro');
window.addEventListener('load', () => {
  setTimeout(() => {
    intro.classList.add('is-hidden');
  }, 900);
});
