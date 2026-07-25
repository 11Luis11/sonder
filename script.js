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

    el.addEventListener('click', () => openLightbox(index));
    el.addEventListener('mouseenter', () => cursorLabel.classList.add('is-visible'));
    el.addEventListener('mouseleave', () => cursorLabel.classList.remove('is-visible'));

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

function updateLightbox() {
  const item = GALLERY[currentIndex];
  const num = String(currentIndex + 1).padStart(3, '0');
  lightboxImage.src = `${IMAGES_PATH}${item.file}`;
  lightboxImage.alt = item.title;
  lightboxCaption.textContent = `N° ${num} — ${item.title}`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % GALLERY.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + GALLERY.length) % GALLERY.length;
  updateLightbox();
}

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
// CURSOR PERSONALIZADO — solo sobre la galería
// ----------------------------------------------------------

const cursorLabel = document.getElementById('cursorLabel');

document.addEventListener('mousemove', (e) => {
  cursorLabel.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// ----------------------------------------------------------
// NAV — fondo sólido al hacer scroll
// ----------------------------------------------------------

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
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
