
/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t && a.getAttribute('href') !== '#') { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }) }
    });
});

/* Reveal on scroll */
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target) } });
}, { threshold: 0.07 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* Nav shadow */
window.addEventListener('scroll', () => {
    document.querySelector('.nav-wrap').style.boxShadow =
        window.scrollY > 40 ? '0 4px 28px rgba(10,31,92,.16)' : '0 2px 16px rgba(10,31,92,.09)';
});

/* Video controller */
(function () {
    const vs = [document.getElementById('v0'), document.getElementById('v1'), document.getElementById('v2')];
    const dots = document.querySelectorAll('.vd');
    let cur = 0, timer = null, muted = true;
    vs[0].play().catch(() => { });

    function go(i) {
        if (i === cur) return;
        vs[cur].classList.remove('on'); dots[cur].classList.remove('on');
        cur = i;
        vs[cur].load(); vs[cur].muted = muted; vs[cur].play().catch(() => { });
        vs[cur].classList.add('on'); dots[cur].classList.add('on');
    }
    function auto() { clearInterval(timer); timer = setInterval(() => go((cur + 1) % vs.length), 8000) }
    auto();
    dots.forEach(d => d.addEventListener('click', () => { go(parseInt(d.dataset.v)); auto() }));
    document.getElementById('muteBtn').addEventListener('click', function () {
        muted = !muted; vs.forEach(v => v.muted = muted);
        this.textContent = muted ? '🔇' : '🔊';
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') go((cur + 1) % vs.length);
        if (e.key === 'ArrowLeft') go((cur + vs.length - 1) % vs.length);
    });
})();

/* Buttons */
document.getElementById('cbBtn').addEventListener('click', function () {
    this.textContent = "✓ We'll call you back shortly!";
    this.style.background = '#0a1f5c'; this.disabled = true;
});
document.getElementById('mainSub').addEventListener('click', function () {
    this.textContent = "✓ Submitted — We'll reach out within 24 hrs";
    this.style.background = '#0a1f5c'; this.disabled = true;
});