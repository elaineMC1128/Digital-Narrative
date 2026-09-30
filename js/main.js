/* The prototype uses classic scripts so index.html also works from a local file URL. */
gsap.registerPlugin(ScrollTrigger);

const links = [...document.querySelectorAll('.chapter-nav a')];
const chapters = [...document.querySelectorAll('.chapter')];
const rail = document.querySelector('.chapter-nav__rail i');
const soundButton = document.querySelector('.sound');
soundButton.disabled = true; // Enable only after attributed audio assets are integrated.

chapters.forEach((chapter, index) => {
  ScrollTrigger.create({
    trigger: chapter,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => activate(index),
    onEnterBack: () => activate(index)
  });
});

function activate(index) {
  links.forEach((link, i) => {
    link.classList.toggle('active', i === index);
    if (i === index) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  document.body.dataset.theme = chapters[index].dataset.theme;
}

ScrollTrigger.create({
  trigger: 'main', start: 'top top', end: 'bottom bottom',
  onUpdate: self => { rail.style.height = `${Math.round(self.progress * 100)}%`; }
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.from('.landing__content > *', { opacity: 0, y: 28, duration: 1, stagger: .15, ease: 'power2.out' });
  document.querySelectorAll('.chapter-heading').forEach(heading => {
    gsap.from(heading.children, { opacity: 0, y: 45, duration: .85, stagger: .12, ease: 'power2.out', scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' } });
  });
  gsap.to('.dive__diver', { y: '58vh', x: '-7vw', scale: .65, ease: 'none', scrollTrigger: { trigger: '.dive', start: 'top top', end: 'bottom bottom', scrub: true } });
  gsap.to('.dive__light', { opacity: .1, ease: 'none', scrollTrigger: { trigger: '.dive', start: 'top top', end: 'bottom bottom', scrub: true } });
  const depth = { value: 0 };
  gsap.to(depth, { value: 10, ease: 'none', scrollTrigger: { trigger: '.dive', start: 'top top', end: 'bottom bottom', scrub: true }, onUpdate: () => { document.querySelector('.depth strong').textContent = String(Math.round(depth.value)).padStart(2, '0'); } });
}
