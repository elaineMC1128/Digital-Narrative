/* =====================================================================
   JEJU HAENYEO — MAIN
   1. Build the page from content.js
   2. Smooth scroll (Lenis) + ScrollTrigger
   3. Chapter changes: colours, nav, sound
   4. One animation function per module type
   You normally don't need to edit this file — edit content.js instead.
   ===================================================================== */
(() => {
  const S = window.SITE;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DESKTOP = '(min-width: 801px)';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  gsap.registerPlugin(ScrollTrigger);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  Sound.init(S.sounds);

  /* ===================================================================
     1. RENDER
     =================================================================== */
  const media = (m, cls = 'media') => {
    if (!m) return '';
    if (m.type === 'video') {
      return `<video class="${cls}" src="${m.src}" poster="${m.poster || ''}" muted loop playsinline preload="auto" aria-label="${m.alt || ''}"></video>`;
    }
    return `<img class="${cls}" src="${m.src}" alt="${m.alt || ''}" decoding="async">`;
  };
  const credit = (m) => (m && m.credit ? `<p class="credit caption">${m.credit}</p>` : '');
  const paras = (arr = []) => arr.map((p) => `<p>${p}</p>`).join('');

  const R = {
    opener: (m, ch, prev) => `
      <div class="m-opener" data-module="opener" ${prev && prev.tone === 'mono' && ch.tone !== 'mono' ? 'data-from-mono' : ''}>
        <div class="m-opener__media">${media(m.media)}</div>
        <div class="shade"></div>
        <div class="m-opener__inner">
          <div class="m-opener__label">Chapter</div>
          <div class="m-opener__num" aria-hidden="true">${ch.num}</div>
          <h2 class="m-opener__title">${ch.title}</h2>
          <div class="m-opener__meta">
            <span class="kr m-opener__kr">${ch.kr || ''}</span>
            <span class="m-opener__gloss">${ch.krGloss || ''}</span>
          </div>
          ${m.subtitle ? `<p class="m-opener__sub">${m.subtitle}</p>` : ''}
        </div>
      </div>`,

    film: (m) => `
      <div class="m-film align-${m.align || 'left'}" data-module="film" ${m.cue ? `data-cue="${m.cue}"` : ''}>
        <div class="m-film__media">${media(m.media)}</div>
        <div class="shade"></div>
        <p class="m-film__line"><span>${m.line || ''}</span></p>
        ${credit(m.media)}
      </div>`,

    text: (m) => `
      <div class="m-text" data-module="text">
        <div class="m-text__inner">
          ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
          ${m.lead ? `<p class="lead">${m.lead}</p>` : ''}
          ${paras(m.body)}
        </div>
      </div>`,

    spread: (m) => `
      <div class="m-spread side-${m.side || 'left'}" data-module="spread">
        <figure class="m-spread__fig">
          <div class="m-spread__frame">${media(m.media)}</div>
          ${m.caption ? `<figcaption>${m.caption}</figcaption>` : ''}
        </figure>
        <div class="m-spread__text">
          ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
          ${m.lead ? `<p class="lead">${m.lead}</p>` : ''}
          ${paras(m.body)}
        </div>
      </div>`,

    portrait: (m) => `
      <div class="m-portrait" data-module="portrait">
        <figure>${media(m.media)}</figure>
        <blockquote><p class="quote">${m.quote}</p><cite>${m.cite || ''}</cite></blockquote>
      </div>`,

    facts: (m) => `
      <div class="m-facts" data-module="facts">
        ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
        <ul class="facts">
          ${m.items.map((f) => {
            const isKr = /[가-힯]/.test(f.value);
            return `<li class="fact">
              <span class="fact__value${isKr ? ' is-kr' : ''}"><span class="num">${f.value}</span>${f.unit ? `<span class="unit">${f.unit}</span>` : ''}</span>
              <span class="fact__label">${f.label || ''}</span>
            </li>`;
          }).join('')}
        </ul>
        ${m.rhythm ? `<ol class="rhythm">${m.rhythm.map((r) => `<li>${r}</li>`).join('')}</ol>` : ''}
      </div>`,

    horizontal: (m) => `
      <div class="m-horizontal" data-module="hscroll">
        <div class="h-track">
          ${m.panels.map((p) => {
            if (p.kind === 'portrait') return `
              <article class="panel panel--portrait">
                <div class="panel__frame">${media(p.media)}</div>
                <blockquote><p class="quote">${p.quote}</p><cite>${p.cite || ''}</cite></blockquote>
              </article>`;
            if (p.kind === 'image') return `
              <article class="panel panel--image">
                <div class="panel__frame">${media(p.media)}</div>
                ${p.caption ? `<p>${p.caption}</p>` : ''}
              </article>`;
            return `
              <article class="panel panel--spread">
                <div class="panel__frame">${media(p.media)}</div>
                <div class="panel__text">
                  ${p.heading ? `<h3 class="section-h">${p.heading}</h3>` : ''}
                  ${p.lead ? `<p class="lead">${p.lead}</p>` : ''}
                  ${paras(p.body)}
                </div>
              </article>`;
          }).join('')}
        </div>
        <div class="h-progress"><span></span></div>
      </div>`,

    strip: (m) => `
      <div class="m-strip" data-module="hscroll">
        <div class="h-track">
          <div class="strip-head">
            <h3 class="section-h">${m.heading || ''}</h3>
            <p class="caption">${m.items.length} moments · scroll</p>
          </div>
          ${m.items.map((it) => `
            <figure class="strip-item${it.shape === 'wide' ? ' is-landscape' : ''}">
              <div class="strip-frame">${media(it.media)}</div>
              <figcaption><b>${it.title || ''}</b>${it.caption || ''}</figcaption>
            </figure>`).join('')}
          <div class="strip-end"></div>
        </div>
        <div class="h-progress"><span></span></div>
      </div>`,

    depth: (m) => {
      const max = m.maxDepth || 30;
      const ticks = [];
      for (let d = 0; d <= max; d += 5) ticks.push(`<span class="gauge__tick" style="top:${(d / max) * 100}%">${d}</span>`);
      return `
      <div class="m-depth" data-module="depth" data-max="${max}">
        <div class="m-depth__media">${media(m.media)}</div>
        <div class="m-depth__water"></div>
        <div class="gauge" aria-hidden="true">
          <div class="gauge__scale">${ticks.join('')}</div>
          <div class="gauge__marker"><span class="gauge__value"><b>0</b><small>m</small></span></div>
        </div>
        <div class="depth-stops">
          ${m.stops.map((s) => `<p class="depth-stop" data-depth="${s.depth}">${s.text}</p>`).join('')}
        </div>
      </div>`;
    },

    decline: (m) => {
      const total = Math.round(m.from / m.perDot);
      return `
      <div class="m-decline" data-module="decline" data-from="${m.from}" data-to="${m.to}" data-per="${m.perDot}">
        <div class="m-decline__inner">
          <div class="decline-count">
            <span class="decline-count__num">${m.from.toLocaleString('en-US')}</span>
            <div class="decline-count__labels"><span>${m.fromLabel}</span><span>${m.toLabel}</span></div>
          </div>
          <div class="dots" aria-hidden="true">${'<i></i>'.repeat(total)}</div>
          <p class="caption">${m.caption || ''}</p>
        </div>
      </div>`;
    }
  };

  const story = $('#story');
  const L = S.landing;
  let html = `
    <section class="landing" id="top" data-scene="landing">
      <div class="landing__media">${media(L.media)}</div>
      <div class="shade"></div>
      <div class="landing__inner">
        <p class="eyebrow">${L.eyebrow}</p>
        <h1 class="landing__title">${L.title}</h1>
        <p class="kr landing__kr">${L.kr}</p>
        <p class="landing__sub">${L.subtitle}</p>
        <div class="landing__enter">
          <button class="btn" type="button" data-enter="sound">${L.enterSound}</button>
          <button class="btn btn--ghost" type="button" data-enter="silent">${L.enterSilent}</button>
        </div>
        <p class="landing__note">${L.note}</p>
      </div>
      <div class="scroll-cue">Scroll</div>
    </section>`;

  S.chapters.forEach((ch, i) => {
    const prev = S.chapters[i - 1];
    html += `<section class="chapter chapter--${ch.id} tone-${ch.tone || 'colour'}" id="ch-${ch.num}" data-scene="${i}">`;
    ch.modules.forEach((m) => {
      if (R[m.type]) html += R[m.type](m, ch, prev);
      else console.warn('Unknown module type:', m.type);
    });
    html += `</section>`;
  });

  const E = S.ending;
  html += `
    <section class="ending" id="ending" data-scene="ending">
      <div class="wrap">
        <p class="kr ending__kr">${E.kr}</p>
        <p class="ending__statement">${E.statement}</p>
        <button class="btn btn--ghost" type="button" data-loop>↑ ${E.loopLabel}</button>
        <div class="ending__grid">
          <dl class="credits">${E.credits.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
          <div><p class="eyebrow" style="margin-bottom:14px">References</p><ol class="refs">${E.references.map((r) => `<li>${r}</li>`).join('')}</ol></div>
        </div>
        <p class="ending__foot">Jeju Haenyeo · 제주 해녀 · 2026</p>
      </div>
    </section>`;
  story.innerHTML = html;

  /* chapter nav */
  $('.chapnav').innerHTML = S.chapters.map((ch) =>
    `<button type="button" data-scroll-to="#ch-${ch.num}" aria-label="Chapter ${ch.num}: ${ch.short}">
      <span class="chapnav__label">${ch.short}</span><span class="chapnav__num">${ch.num}</span><span class="chapnav__line"></span>
    </button>`).join('');

  /* ===================================================================
     2. SMOOTH SCROLL
     =================================================================== */
  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollToTarget = (target, duration = 2) => {
    if (lenis) lenis.scrollTo(target, { duration });
    else (typeof target === 'number' ? window.scrollTo({ top: target }) : $(target).scrollIntoView());
  };

  /* ===================================================================
     3. SCENES: colours, nav, topbar, sound
     =================================================================== */
  const root = document.documentElement;
  const setTheme = (t, instant = false) => gsap.to(root, {
    '--bg': t.bg, '--fg': t.fg, '--muted': t.muted, '--accent': t.accent,
    duration: instant ? 0 : 1.4, ease: 'power2.inOut', overwrite: 'auto'
  });
  setTheme(L.theme, true);

  const navBtns = $$('.chapnav button');
  const nowNum = $('.topbar__num');
  const nowName = $('.topbar__name');
  function activate(scene) {
    if (scene === 'landing') {
      setTheme(L.theme); Sound.setScene(L.sound, 0.6);
      navBtns.forEach((b) => b.classList.remove('is-active'));
      nowNum.textContent = ''; nowName.textContent = '';
    } else if (scene === 'ending') {
      setTheme(E.theme); Sound.setScene(E.sound, E.volume);
      navBtns.forEach((b) => b.classList.remove('is-active'));
      nowNum.textContent = ''; nowName.textContent = 'Credits';
    } else {
      const ch = S.chapters[scene];
      setTheme(ch.theme); Sound.setScene(ch.sound, ch.volume ?? 0.5);
      navBtns.forEach((b, i) => b.classList.toggle('is-active', i === +scene));
      nowNum.textContent = ch.num; nowName.textContent = ch.short;
    }
  }
  Sound.setScene(L.sound, 0.6);

  /* ===================================================================
     4. MODULE ANIMATIONS
     =================================================================== */
  /* wrap every word in <span class="w"> (keeps <i> and <br>) */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    return $$('.w', el);
  }
  const fadeUp = (targets, trigger, start = 'top 72%') => gsap.from(targets, {
    y: 40, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger, start, toggleActions: 'play none none reverse' }
  });

  const A = {
    opener(el) {
      const mediaBox = $('.m-opener__media', el);
      const inner = $('.m-opener__inner', el);
      const words = splitWords($('.m-opener__title', el));
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 60%', toggleActions: 'play none none reverse' } })
        .from($('.m-opener__label', el), { opacity: 0, y: 20, duration: .8 })
        .from($('.m-opener__num', el), { opacity: 0, y: 60, duration: 1.4, ease: 'power3.out' }, '<')
        .from(words, { opacity: 0, y: 36, rotate: 2, duration: 1.1, stagger: .08, ease: 'power3.out' }, '-=1.1')
        .from($$('.m-opener__meta, .m-opener__sub', el), { opacity: 0, y: 20, duration: .9, stagger: .12 }, '-=.6');

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=90%', pin: true, scrub: true } })
        .fromTo(mediaBox, { scale: 1.14 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .to(inner, { y: -80, opacity: 0, ease: 'power1.in', duration: .45 }, .55);
      if (el.hasAttribute('data-from-mono')) {
        tl.fromTo($('.media', mediaBox), { filter: 'grayscale(1) brightness(.8)' }, { filter: 'grayscale(0) brightness(1)', ease: 'none', duration: 1 }, 0);
      }
    },

    film(el) {
      const words = splitWords($('.m-film__line span', el));
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', pin: true, scrub: true } })
        .fromTo($('.m-film__media', el), { scale: 1.1 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(words, { opacity: .1 }, { opacity: 1, stagger: .05, duration: .2, ease: 'none' }, .05);
      if (el.dataset.cue) {
        ScrollTrigger.create({ trigger: el, start: 'top 30%', onEnter: () => Sound.cue(el.dataset.cue) });
      }
    },

    text(el) { fadeUp($$('.m-text__inner > *', el), el); },

    spread(el) {
      const frame = $('.m-spread__frame', el);
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 45%', scrub: true } })
        .fromTo(frame, { clipPath: 'inset(16% 8% 16% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
        .fromTo($('.media', frame), { scale: 1.25 }, { scale: 1, ease: 'none' }, 0);
      fadeUp($$('.m-spread__text > *, figcaption', el), el, 'top 60%');
    },

    portrait(el) {
      gsap.fromTo($('figure .media', el), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      const words = splitWords($('.quote', el));
      gsap.fromTo(words, { opacity: .12 }, { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 65%', end: 'center 35%', scrub: true } });
      fadeUp($('cite', el), el, 'top 40%');
    },

    facts(el) {
      const items = $$('.fact', el);
      gsap.from(items, { opacity: 0, y: 40, duration: 1, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } });
      /* count up numbers like "≈10", "3", "<100", "+2" */
      $$('.num', el).forEach((n) => {
        const m = n.textContent.match(/^([^\d]*)([\d,.]+)(.*)$/);
        if (!m) return;
        const [, pre, numStr, post] = m;
        const target = parseFloat(numStr.replace(/,/g, ''));
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
          onUpdate: () => { n.textContent = pre + Math.round(obj.v).toLocaleString('en-US') + post; }
        });
      });
      const rhythm = $('.rhythm', el);
      if (rhythm) {
        const lis = $$('li', rhythm);
        ScrollTrigger.create({
          trigger: rhythm, start: 'top 85%', end: 'bottom 45%',
          onUpdate: (self) => { const k = Math.ceil(self.progress * lis.length); lis.forEach((li, i) => li.classList.toggle('is-on', i < k)); }
        });
      }
    },

    hscroll(el) {
      const track = $('.h-track', el);
      const bar = $('.h-progress span', el);
      gsap.matchMedia().add(DESKTOP, () => {
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true }
        })
          .to(track, { x: () => -dist(), ease: 'none' }, 0)
          .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      });
      fadeUp($$('.panel__text > *, .panel blockquote, .strip-head > *', el).slice(0, 4), el, 'top 60%');
    },

    depth(el) {
      const max = +el.dataset.max;
      const marker = $('.gauge__marker', el);
      const value = $('.gauge__value b', el);
      const stops = $$('.depth-stop', el);
      const pos = (s) => (+s.dataset.depth / max) * 0.92;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=' + (stops.length * 70) + '%', pin: true, scrub: true },
        onUpdate() { value.textContent = Math.min(max, Math.round((tl.progress() / 0.92) * max)); }
      });
      tl.fromTo(marker, { top: '0%' }, { top: '100%', ease: 'none', duration: .92 }, 0)
        .fromTo($('.m-depth__water', el), { opacity: 0 }, { opacity: .92, ease: 'none', duration: .92 }, 0)
        .fromTo($('.m-depth__media', el), { scale: 1 }, { scale: 1.35, ease: 'none', duration: .92 }, 0)
        .to({}, { duration: .08 });
      gsap.set(stops, { opacity: 0, y: 30 });
      stops.forEach((s, i) => {
        const at = pos(s);
        tl.to(s, { opacity: 1, y: 0, duration: .05, ease: 'power2.out' }, Math.max(0, at - (i === 0 ? 0 : .03)));
        const next = stops[i + 1];
        if (next) tl.to(s, { opacity: 0, y: -30, duration: .04, ease: 'power2.in' }, pos(next) - .06);
      });
    },

    decline(el) {
      const from = +el.dataset.from, to = +el.dataset.to, per = +el.dataset.per;
      const dots = $$('.dots i', el);
      const keep = Math.round(to / per);
      /* fixed pseudo-random order so the gaps look scattered */
      const order = dots.map((d, i) => ({ d, r: Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1 })).sort((a, b) => a.r - b.r).map((o) => o.d);
      const kept = order.slice(0, keep);
      const lost = order.slice(keep);
      const num = $('.decline-count__num', el);
      const [lblFrom, lblTo] = $$('.decline-count__labels span', el);
      const obj = { v: from };
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=260%', pin: true, scrub: true } })
        .to(obj, { v: to, ease: 'none', duration: 1, onUpdate: () => { num.textContent = (Math.round(obj.v / 100) * 100).toLocaleString('en-US'); } }, 0)
        .to(lost, { opacity: .07, scale: .55, ease: 'none', duration: .2, stagger: { amount: .8 } }, 0)
        .to(lblFrom, { opacity: 0, duration: .1 }, .9)
        .to(lblTo, { opacity: 1, duration: .1 }, .95)
        .to(kept, { backgroundColor: 'var(--accent)', duration: .1 }, .95)
        .to({}, { duration: .25 });
      fadeUp($('.caption', el), el, 'top 40%');
    }
  };

  if (!REDUCED) {
    $$('[data-module]').forEach((el) => A[el.dataset.module] && A[el.dataset.module](el));
    /* landing: subtle drift of the title as you leave */
    gsap.to('.landing__inner', { y: -120, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.landing', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* progress bar */
  gsap.to('.progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });

  /* scene triggers — created last so pinned spacing is already measured */
  $$('[data-scene]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) activate(sec.dataset.scene); }
    });
  });

  /* ===================================================================
     5. VIDEOS: play only while on screen
     =================================================================== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.05 });
  $$('video').forEach((v) => io.observe(v));

  /* ===================================================================
     6. BUTTONS: enter, sound toggle, nav, loop
     =================================================================== */
  const toggle = $('.sound-toggle');
  const syncToggle = () => {
    const on = Sound.isEnabled();
    toggle.setAttribute('aria-pressed', String(on));
    $('.sound-toggle__label', toggle).textContent = on ? 'Sound on' : 'Sound off';
  };

  $$('[data-enter]').forEach((b) => b.addEventListener('click', () => {
    Sound.setEnabled(b.dataset.enter === 'sound');
    syncToggle();
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-entered');
    if (lenis) lenis.start();
    gsap.to('.landing__enter, .landing__note', { opacity: 0, y: 10, duration: .6, pointerEvents: 'none' });
    gsap.to('.scroll-cue', { opacity: 1, duration: 1, delay: .4 });
    ScrollTrigger.refresh();
  }));

  toggle.addEventListener('click', () => { Sound.setEnabled(!Sound.isEnabled()); syncToggle(); });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-scroll-to]');
    if (!t || !document.body.classList.contains('is-entered')) return;
    const target = t.dataset.scrollTo;
    scrollToTarget(target === '#top' ? 0 : target);
  });

  $('[data-loop]').addEventListener('click', () => {
    scrollToTarget(0, 4.5);
    setTimeout(() => Sound.cue('sumbisori'), 4200);
  });

  /* recalculate positions once fonts and media have loaded */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
