/* =========================================
   INVITACIÓN PARA ASHLEY
   JavaScript principal
   ========================================= */


/* =========================================
   ELEMENTOS DEL DOCUMENTO
   ========================================= */

const stage = document.getElementById('stage');

const scenes = [
    ...document.querySelectorAll('.scene')
];

const envelope = document.getElementById('envelope');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');
const musicButton = document.getElementById('musicBtn');


/* =========================================
   CONTROL DE ESCENAS
   ========================================= */

function show(id) {

    // Mostrar únicamente la escena seleccionada
    scenes.forEach(scene => {
        scene.classList.toggle(
            'active',
            scene.id === id
        );
    });

    // Oscurecer el escenario durante la revelación
    stage.classList.toggle(
        'blackout',
        id === 'reveal'
    );

    // Activar efectos especiales
    if (id === 'reveal') {
        createParticles();
    }
}


/* =========================================
   PARTÍCULAS DE LA REVELACIÓN
   ========================================= */

function createParticles() {

    // Generar 26 partículas luminosas
    for (let i = 0; i < 26; i++) {

        const particle = document.createElement('i');

        particle.className = 'spark';

        // Posición horizontal aleatoria
        particle.style.left =
            Math.random() * 100 + '%';

        // Retraso aleatorio de animación
        particle.style.animationDelay =
            Math.random() * 4 + 's';

        // Duración aleatoria entre 3 y 7 segundos
        particle.style.animationDuration =
            (3 + Math.random() * 4) + 's';

        // Agregar partícula al escenario
        stage.appendChild(particle);

        // Eliminarla después de 8.5 segundos
        setTimeout(() => {
            particle.remove();
        }, 8500);
    }
}


/* =========================================
   INTERACCIÓN CON EL SOBRE
   ========================================= */

envelope.addEventListener('click', () => {

    // Abrir la carta romántica
    show('letter');

});


/* =========================================
   REVELACIÓN DE JUNIOR H
   ========================================= */

nextButton.addEventListener('click', () => {

    // Mostrar la sorpresa del concierto
    show('reveal');

});


/* =========================================
   REINICIAR INVITACIÓN
   ========================================= */

restartButton.addEventListener('click', () => {

    // Regresar al sobre inicial
    show('intro');

});


/* =========================================
   CONTROL DE MÚSICA
   ========================================= */

let audio = null;

musicButton.addEventListener('click', async () => {

    // Crear el reproductor en el primer intento
    if (!audio) {

        audio = new Audio(
            'assets/audio/musica.mp3'
        );

        audio.loop = true;
    }

    // Pausar si la música está reproduciéndose
    if (!audio.paused) {

        audio.pause();

        musicButton.textContent = '♫ Música: off';

        return;
    }

    // Intentar reproducir la música
    try {

        await audio.play();

        musicButton.textContent = '♫ Música: on';

    } catch (error) {

        musicButton.textContent =
            '♫ Añade musica.mp3';

        console.error(
            'No se pudo reproducir la música:',
            error
        );
    }

});
