// ============================================
// GLITCH REALM - ROCKSTAR AESTHETIC
// Script principal
// ============================================

let segments = JSON.parse(localStorage.getItem('segments')) || [];
const backgroundMusic = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const addSegmentBtn = document.getElementById('addSegmentBtn');
const segmentModal = document.getElementById('segmentModal');
const closeBtn = document.querySelector('.close');
const createSegmentBtn = document.getElementById('createSegmentBtn');
const segmentsContainer = document.getElementById('segmentsContainer');

// ============================================
// CONTROLES DE MÚSICA
// ============================================

playBtn.addEventListener('click', () => {
    backgroundMusic.play();
    playBtn.classList.add('active');
    pauseBtn.classList.remove('active');
    playGlitchSound();
});

pauseBtn.addEventListener('click', () => {
    backgroundMusic.pause();
    pauseBtn.classList.add('active');
    playBtn.classList.remove('active');
});

volumeSlider.addEventListener('input', (e) => {
    backgroundMusic.volume = e.target.value / 100;
});

// ============================================
// MODAL DE AGREGAR SEGMENTO
// ============================================

addSegmentBtn.addEventListener('click', () => {
    segmentModal.style.display = 'block';
    playGlitchSound();
});

closeBtn.addEventListener('click', () => {
    segmentModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === segmentModal) {
        segmentModal.style.display = 'none';
    }
});

// ============================================
// CREAR SEGMENTO
// ============================================

createSegmentBtn.addEventListener('click', () => {
    const title = document.getElementById('segmentTitle').value;
    const imageInput = document.getElementById('segmentImage');
    const soundInput = document.getElementById('segmentSound');
    const glitchType = document.getElementById('glitchType').value;

    if (!title) {
        alert('Por favor, ingresa un título para el segmento');
        return;
    }

    let imageData = null;
    let soundData = null;

    // Procesar imagen
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageData = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Procesar sonido
    if (soundInput.files.length > 0) {
        const file = soundInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            soundData = e.target.result;
            
            // Crear segmento después de cargar ambos archivos
            setTimeout(() => {
                addSegment(title, imageData, soundData, glitchType);
                segmentModal.style.display = 'none';
                limpiarFormulario();
            }, 100);
        };
        reader.readAsDataURL(file);
    } else {
        // Crear segmento solo con imagen o sin archivos
        addSegment(title, imageData, soundData, glitchType);
        segmentModal.style.display = 'none';
        limpiarFormulario();
    }

    playGlitchSound();
});

// ============================================
// AGREGAR SEGMENTO A LA PÁGINA
// ============================================

function addSegment(title, imageData, soundData, glitchType) {
    const segment = {
        id: Date.now(),
        title,
        imageData,
        soundData,
        glitchType
    };

    segments.push(segment);
    localStorage.setItem('segments', JSON.stringify(segments));
    renderSegments();
}

// ============================================
// RENDERIZAR SEGMENTOS
// ============================================

function renderSegments() {
    segmentsContainer.innerHTML = '';

    segments.forEach(segment => {
        const segmentDiv = document.createElement('div');
        segmentDiv.className = `segment ${segment.glitchType}`;
        segmentDiv.innerHTML = `
            <button class="segment-delete" onclick="deleteSegment(${segment.id})">✕</button>
            <div class="segment-title">${segment.title}</div>
            ${segment.imageData ? `<img src="${segment.imageData}" alt="${segment.title}" class="segment-image">` : '<div style="height: 250px; background: rgba(221,0,0,0.1); border: 2px dashed #00ff00; display: flex; align-items: center; justify-content: center; color: #FFD700;"><p>Sin imagen</p></div>'}
            <button class="segment-button" onclick="playSegmentSound(${segment.id})">▶ REPRODUCIR SONIDO</button>
        `;

        segmentDiv.addEventListener('click', (e) => {
            if (!e.target.closest('.segment-button') && !e.target.closest('.segment-delete')) {
                playSegmentSound(segment.id);
            }
        });

        segmentsContainer.appendChild(segmentDiv);
    });
}

// ============================================
// ELIMINAR SEGMENTO
// ============================================

function deleteSegment(id) {
    segments = segments.filter(s => s.id !== id);
    localStorage.setItem('segments', JSON.stringify(segments));
    renderSegments();
    playGlitchSound();
}

// ============================================
// REPRODUCIR SONIDO DEL SEGMENTO
// ============================================

function playSegmentSound(id) {
    const segment = segments.find(s => s.id === id);
    
    if (segment.soundData) {
        const audio = new Audio(segment.soundData);
        audio.volume = 0.7;
        audio.play().catch(err => console.log('Error al reproducir sonido:', err));
    }

    playGlitchSound();
}

// ============================================
// SONIDO DE GLITCH (Efecto general)
// ============================================

function playGlitchSound() {
    // Crear un sonido generado con Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Oscilador para crear el efecto glitch
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    // Frecuencia aleatoria para el efecto
    osc.frequency.setValueAtTime(Math.random() * 1000 + 500, now);
    osc.frequency.exponentialRampToValueAtTime(Math.random() * 100 + 50, now + 0.1);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
}

// ============================================
// LIMPIAR FORMULARIO
// ============================================

function limpiarFormulario() {
    document.getElementById('segmentTitle').value = '';
    document.getElementById('segmentImage').value = '';
    document.getElementById('segmentSound').value = '';
    document.getElementById('glitchType').value = 'glitch-1';
}

// ============================================
// INICIALIZAR
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderSegments();
    
    // Reproducir música automáticamente (algunos navegadores no lo permiten)
    backgroundMusic.volume = 0.3;
    
    // Intentar reproducir automáticamente (puede ser bloqueado)
    backgroundMusic.play().catch(err => {
        console.log('Reproducción automática bloqueada. El usuario debe hacer clic.');
    });
});

// ============================================
// EFECTOS DE SONIDO CON GLITCH
// ============================================

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-rockstar')) {
        playGlitchSound();
    }
});
