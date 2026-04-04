/* ===================================================
   work.js — Scripts exclusive to work.html
   1. Animated Wave Canvas (hero background)
   2. Project card scroll-in animations
   =================================================== */

// ── 1. Animated Wave Canvas ──────────────────────────
(function initWaveCanvas() {
    const canvas = document.getElementById('wave-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    // 8 wave layers — each with slowly drifting amplitude
    const waveData = Array.from({ length: 8 }).map(() => ({
        value: Math.random() * 0.5 + 0.1,
        targetValue: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
    }));

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.closest
            ? canvas.closest('.work-hero')
                ? canvas.closest('.work-hero').offsetHeight
                : window.innerHeight
            : window.innerHeight;
    }

    function updateWaveData() {
        waveData.forEach(data => {
            // Occasionally change target amplitude
            if (Math.random() < 0.01) {
                data.targetValue = Math.random() * 0.7 + 0.1;
            }
            const diff = data.targetValue - data.value;
            data.value += diff * data.speed;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Very subtle dark background fill (waves stand on transparent canvas)
        ctx.fillStyle = 'rgba(5, 5, 16, 0.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        waveData.forEach((data, i) => {
            const freq = data.value * 7;
            ctx.beginPath();

            for (let x = 0; x <= canvas.width; x += 2) {
                const nx = (x / canvas.width) * 2 - 1;
                const px = nx + i * 0.04 + freq * 0.03;
                const py =
                    Math.sin(px * 10 + time) *
                    Math.cos(px * 2) *
                    freq *
                    0.1 *
                    ((i + 1) / 8);
                const y = (py + 1) * (canvas.height / 2);

                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }

            // Colour interpolated from indigo → cyan based on amplitude
            const intensity = Math.min(1, freq * 0.3);
            const r = Math.round(79  + intensity * 100);
            const g = Math.round(70  + intensity * 130);
            const b = 229;

            ctx.lineWidth = 1 + i * 0.3;
            ctx.strokeStyle = `rgba(${r},${g},${b},0.55)`;
            ctx.shadowColor  = `rgba(${r},${g},${b},0.45)`;
            ctx.shadowBlur   = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;
        });
    }

    function animate() {
        time += 0.018;
        updateWaveData();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
})();


// ── 2. Project Card Scroll-In Animations ─────────────
(function initProjectCardAnimations() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Small stagger so multiple visible cards cascade
                const delay = idx * 0.08;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    cards.forEach(card => observer.observe(card));
})();


// ── 3. Image placeholder visibility toggle ────────────
// When the real <img> loads correctly hide the placeholder;
// when it errors the onerror on the img tag already does this.
(function initImageFallbacks() {
    const imgs = document.querySelectorAll('.project-img');
    imgs.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            // Image already loaded — hide placeholder
            const placeholder = img.nextElementSibling;
            if (placeholder && placeholder.classList.contains('project-img-placeholder')) {
                placeholder.style.display = 'none';
            }
        } else {
            img.addEventListener('load', () => {
                const placeholder = img.nextElementSibling;
                if (placeholder && placeholder.classList.contains('project-img-placeholder')) {
                    placeholder.style.display = 'none';
                }
            });
        }
    });
})();
