// Lógica do carrossel(Projetos):
(function () {
    const carousel = document.getElementById('carousel');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    if (!carousel || !next || !prev) return;
    const container = carousel.parentElement;

    let pos = 0;
    let step = 0;
    let maxShift = 0; // Limite.

    //Update da posição:
    function update() {
        carousel.style.transform = `translateX(${Math.round(pos)}px)`;
    }

    function recalc() {
        const project = carousel.querySelector('.project');
        if (!project) return;

        const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
        step = Math.round(project.offsetWidth + gap);

        maxShift = Math.min(0, container.offsetWidth - carousel.scrollWidth);

        if (pos < maxShift) pos = maxShift;
        if (pos > 0) pos = 0;

        update();
    }

    next.addEventListener('click', () => {
        // Se já estamos no limite, volta ao início (loop)
        if (pos === maxShift) {
            pos = 0;
        } else if (pos - step <= maxShift) {
            pos = maxShift;
        } else {
            pos -= step;
        }
        update();
    });

    prev.addEventListener('click', () => {
        // Se já estamos no início, ir para o fim (loop)
        if (pos === 0) {
            pos = maxShift;
        } else if (pos + step >= 0) {
            pos = 0;
        } else {
            pos += step;
        }
        update();
    });

    //Controlar carrossel por teclado:
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next.click();
        if (e.key === 'ArrowLeft') prev.click();
    });

    // Autoplay:
    let autoplay = setInterval(() => next.click(), 3000); // 3seg.
    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', () => {
        clearInterval(autoplay);
        autoplay = setInterval(() => next.click(), 3000); // Depois que o mouse sai, volta com 3 seg de novo.
    });

    // Recalcula ao redimensionar:
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(recalc, 120);
    });

    // Inicializa!
    recalc();
})();

// Zoom certificados:
function openModal(img) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalImg").src = img.src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

