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
  /* small reference code on a piece of media / text, linking to the reference list */
  const refTag = (code, cls = 'ref-tag') => (code ? String(code).split(/[\s,]+/).filter(Boolean).map((c) => `<a class="${cls}" href="#ref-${c}" data-scroll-to="#ref-${c}" title="Source ${c}">${c}</a>`).join(cls.includes('inline') ? '' : ' ') : '');
  const inlineRef = (code) => refTag(code, 'ref-tag ref-tag--inline');
  /* withTag = false for full-screen frames: their tag sits outside the moving media layer */
  const media = (m, cls = 'media', withTag = true) => {
    if (!m) return '';
    const tag = withTag ? refTag(m.ref) : '';
    if (m.type === 'video') {
      return `<video class="${cls}" src="${m.src}" poster="${m.poster || ''}" muted loop playsinline preload="auto" aria-label="${m.alt || ''}"></video>${tag}`;
    }
    return `<img class="${cls}" src="${m.src}" alt="${m.alt || ''}" decoding="async">${tag}`;
  };
  const credit = (m) => (m && m.credit ? `<p class="credit caption">${m.credit}</p>` : '');
  const paras = (arr = [], ref) => arr.map((p, i) => `<p>${p}${ref && i === arr.length - 1 ? refTag(ref, 'ref-tag ref-tag--inline') : ''}</p>`).join('');

  const factsInner = (m) => `
        ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
        <ul class="facts">
          ${m.items.map((f) => {
            const isKr = /[가-힯]/.test(f.value);
            return `<li class="fact">
              <span class="fact__value${isKr ? ' is-kr' : ''}"><span class="num">${f.value}</span>${f.unit ? `<span class="unit">${f.unit}</span>` : ''}</span>
              <span class="fact__label">${f.label || ''}${inlineRef(f.ref)}</span>
            </li>`;
          }).join('')}
        </ul>
        ${m.rhythm ? `<ol class="rhythm">${m.rhythm.map((r) => `<li>${r}</li>`).join('')}</ol>` : ''}`;

  const R = {
    opener: (m, ch, prev) => `
      <div class="m-opener" data-module="opener" ${prev && prev.tone === 'mono' && ch.tone !== 'mono' ? 'data-from-mono' : ''}>
        <div class="m-opener__media">${media(m.media, 'media', false)}</div>
        <div class="shade"></div>
        <div class="veil"></div>
        ${refTag(m.media && m.media.ref)}
        <div class="m-opener__inner">
          <div class="m-opener__label">Chapter</div>
          <div class="m-opener__num" aria-hidden="true">${ch.num}</div>
          <h2 class="m-opener__title">${ch.title}</h2>
          ${ch.kr || ch.krGloss ? `<div class="m-opener__meta">
            <span class="kr m-opener__kr">${ch.kr || ''}</span>
            <span class="m-opener__gloss">${ch.krGloss || ''}</span>
          </div>` : ''}
          ${m.subtitle ? `<p class="m-opener__sub">${m.subtitle}</p>` : ''}
        </div>
      </div>`,

    /* full-screen footage with a text block on the left; uncovered like the frames (03-2) */
    scene: (m) => `
      <div class="m-scene${m.fit === 'contain' ? ' is-contain' : ''}" data-module="scene" ${m.duck ? `data-duck="${m.duck}"` : ''}>
        <div class="m-scene__media">${media(m.media, 'media', false)}</div>
        <div class="shade m-scene__shade"></div>
        ${refTag(m.media && m.media.ref)}
        <div class="m-scene__text">
          ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
          ${m.lead ? `<p class="lead">${m.lead}${refTag(m.ref, 'ref-tag ref-tag--inline')}</p>` : ''}
          ${paras(m.body, m.bodyRef)}
        </div>
      </div>`,

    film: (m) => `
      <div class="m-film align-${m.align || 'left'}" data-module="film" ${m.cue ? `data-cue="${m.cue}"` : ''}>
        <div class="m-film__media">${media(m.media, 'media', false)}</div>
        <div class="shade"></div>
        <div class="veil"></div>
        ${refTag(m.media && m.media.ref)}
        <p class="m-film__line"><span>${m.line || ''}${refTag(m.lineRef, 'ref-tag ref-tag--inline')}</span>${m.cite ? `<cite class="m-film__cite">${m.cite}</cite>` : ''}</p>
        ${credit(m.media)}
      </div>`,

    text: (m) => `
      <div class="m-text${m.media ? (m.figure === 'wide' ? ' has-wide' : ' has-figure') : ''}${!m.heading && !m.media ? ' is-statement' : ''}" data-module="text" ${m.duck ? `data-duck="${m.duck}"` : ''}>
        <div class="m-text__inner">
          ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
          ${m.lead ? `<p class="lead">${m.lead}${refTag(m.ref, 'ref-tag ref-tag--inline')}</p>` : ''}
          ${paras(m.body, m.bodyRef)}
        </div>
        ${m.media ? `<figure class="m-text__fig${m.figure === 'wide' ? ' is-wide' : ''}">${media(m.media)}${m.figure === 'wide' ? refTag(m.media.ref) : ''}</figure>` : ''}
      </div>`,

    spread: (m) => `
      <div class="m-spread side-${m.side || 'left'}" data-module="spread">
        <figure class="m-spread__fig${m.media2 ? ' is-pair' : ''}">
          <div class="m-spread__frame">${media(m.media)}</div>
          ${m.media2 ? `<div class="m-spread__frame m-spread__frame--2">${media(m.media2)}</div>` : ''}
          ${m.caption ? `<figcaption>${m.caption}</figcaption>` : ''}
        </figure>
        <div class="m-spread__text">
          ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
          ${m.lead ? `<p class="lead">${m.lead}${refTag(m.leadRef, 'ref-tag ref-tag--inline')}</p>` : ''}
          ${paras(m.body, m.bodyRef)}
        </div>
      </div>`,

    portrait: (m) => `
      <div class="m-portrait" data-module="portrait">
        <figure>${media(m.media)}</figure>
        <blockquote><p class="quote">${m.quote}</p><cite>${m.cite || ''}</cite></blockquote>
      </div>`,

    facts: (m) => `
      <div class="m-facts" data-module="facts">${factsInner(m)}</div>`,

    /* 02-2 → 02-4: one pinned screen; the footage changes underneath, only the text moves */
    dive: (m) => {
      const max = m.maxDepth || 30;
      const ticks = [];
      for (let d = 0; d <= max; d += 5) ticks.push(`<span class="gauge__tick" style="top:${(d / max) * 100}%">${d}</span>`);
      const layers = m.scenes.map((sc) => `
          <div class="m-dive__layer">${media(sc.media, 'media', false)}<div class="m-dive__dim" style="opacity:${sc.dim || 0}"></div>${refTag(sc.media && sc.media.ref)}</div>`).join('');
      const texts = m.scenes.map((sc, i) => {
        if (sc.stops) return sc.stops.map((st) => `<p class="dive-text dive-stop" data-step="${i}" data-depth="${st.depth}">${st.text}${inlineRef(st.ref)}</p>`).join('');
        if (sc.line) return `<p class="dive-text dive-line" data-step="${i}"><span>${sc.line}</span></p>`;
        if (sc.facts) return `<div class="dive-text dive-facts m-facts" data-step="${i}">${factsInner(sc.facts)}</div>`;
        return '';
      }).join('');
      return `
      <div class="m-dive" data-module="dive" data-max="${max}">
        <div class="m-dive__media">${layers}<div class="m-dive__water"></div></div>
        <div class="gauge" aria-hidden="true">
          <div class="gauge__scale">${ticks.join('')}</div>
          <div class="gauge__marker"><span class="gauge__value"><b>0</b><small>m</small></span></div>
        </div>
        <div class="m-dive__texts">${texts}</div>
      </div>`;
    },

    /* 02-5: rises with a slanted edge; text holds while photos pass beneath it, right to left */
    gallery: (m) => `
      <div class="m-gallery" data-module="gallery" data-angle="${m.angle || 30}">
        <div class="m-gallery__stage">
          <div class="m-gallery__track">${(m.images || []).map((im, i) => `<figure class="g-item g-item--${i % 4}">${media(im)}</figure>`).join('')}</div>
          <div class="m-gallery__fade"></div>
          <div class="m-gallery__text">
            ${m.heading ? `<h3 class="section-h">${m.heading}</h3>` : ''}
            ${m.lead ? `<p class="lead">${m.lead}${inlineRef(m.leadRef)}</p>` : ''}
            ${(m.body || []).map((p, i, a) => `<p>${p}${i === a.length - 1 ? inlineRef(m.bodyRef) : ''}</p>`).join('')}
          </div>
        </div>
      </div>`,



    horizontal: (m) => `
      <div class="m-horizontal" data-module="hscroll">
        <div class="h-track">
          ${m.panels.map((p) => {
            if (p.kind === 'portrait') return `
              <article class="panel panel--portrait${p.fit === 'full' ? ' is-full' : ''}">
                <div class="panel__frame">${media(p.media)}</div>
                <blockquote><p class="quote">${p.quote}</p><cite>${p.cite || ''}</cite>${p.note ? `<p class="panel__note">${p.note}${refTag(p.noteRef, 'ref-tag ref-tag--inline')}</p>` : ''}</blockquote>
              </article>`;
            if (p.kind === 'image') return `
              <article class="panel panel--image">
                <div class="panel__frame">${media(p.media)}</div>
                ${p.caption ? `<p>${p.caption}${refTag(p.ref, 'ref-tag ref-tag--inline')}</p>` : ''}
              </article>`;
            return `
              <article class="panel panel--spread">
                <div class="panel__frame">${media(p.media)}</div>
                <div class="panel__text">
                  ${p.heading ? `<h3 class="section-h">${p.heading}</h3>` : ''}
                  ${p.lead ? `<p class="lead">${p.lead}</p>` : ''}
                  ${paras(p.body, p.bodyRef)}
                </div>
              </article>`;
          }).join('')}
        </div>
        <div class="h-progress"><span></span></div>
      </div>`,

    strip: (m) => `
      <div class="m-strip${m.uniform ? ' is-uniform' : ''}" data-module="hscroll">
        <div class="h-track">
          <div class="strip-head">
            <h3 class="section-h">${m.heading || ''}</h3>
            ${m.intro ? `<p class="strip-intro">${m.intro}</p>` : `<p class="caption">${m.items.length} moments · scroll</p>`}
          </div>
          ${m.items.map((it) => `
            <figure class="strip-item${it.shape === 'wide' ? ' is-landscape' : ''}">
              <div class="strip-frame">${media(it.media)}</div>
              <figcaption><b>${it.title || ''}</b>${it.caption || ''}${refTag(it.ref, 'ref-tag ref-tag--inline')}</figcaption>
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
        <div class="m-depth__media">${media(m.media, 'media', false)}</div>
        <div class="m-depth__water"></div>
        ${refTag(m.media && m.media.ref)}
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
            ${m.heading ? `<h3 class="section-h decline-h">${m.heading}</h3>` : ''}
            <span class="decline-count__num">${m.from.toLocaleString('en-US')}</span>
            <div class="decline-count__labels"><span>${m.fromLabel}</span><span>${m.toLabel}</span></div>
          </div>
          <div class="dots" aria-hidden="true"${m.cols ? ` style="--cols:${m.cols}"` : ''}>${'<i></i>'.repeat(total)}</div>
          <p class="caption">${m.caption || ''}${refTag(m.ref, 'ref-tag ref-tag--inline')}</p>
        </div>
      </div>`;
    }
  };

  /* Reference list: built from SITE.references; each entry lists where it is used */
  function buildReferences() {
    const used = {};
    const note = (code, label, target) => {
      if (!code) return;
      (used[code] = used[code] || []);
      if (!used[code].some((u) => u.label === label)) used[code].push({ label, target });
    };
    const walk = (o, label, target) => {
      if (!o || typeof o !== 'object') return;
      ['ref', 'leadRef', 'bodyRef', 'lineRef', 'noteRef'].forEach((k) => { if (typeof o[k] === 'string') o[k].split(/[\s,]+/).forEach((c) => note(c, label, target)); });
      Object.values(o).forEach((v) => walk(v, label, target));
    };
    walk(S.landing, 'Landing', '#top');
    S.chapters.forEach((ch) => walk(ch.modules, ch.num + ' ' + ch.short, '#ch-' + ch.num));
    const groups = [['F', 'Film & video'], ['P', 'Photography & illustration'], ['S', 'Sound & music'], ['T', 'Texts & data']];
    const refs = S.references || {};
    return groups.map(([k, name]) => {
      const codes = Object.keys(refs).filter((c) => c[0] === k);
      if (!codes.length) return '';
      return `<p class="refs__group">${name}</p><ol class="refs">${codes.map((c) => `
        <li id="ref-${c}"><span class="refs__code">${c}</span><span>${refs[c]}${used[c] ? `<span class="refs__used">Used in: ${used[c].map((u) => `<a href="${u.target}" data-scroll-to="${u.target}">${u.label}</a>`).join(' · ')}</span>` : ''}</span></li>`).join('')}</ol>`;
    }).join('');
  }

  const story = $('#story');
  const L = S.landing;
  let html = `
    <section class="landing" id="top" data-scene="landing">
      <div class="landing__media">${media(L.media, 'media', false)}</div>
      <div class="shade"></div>
      <div class="veil"></div>
      ${refTag(L.media && L.media.ref)}
      <div class="landing__inner">
        ${L.eyebrow ? `<p class="eyebrow">${L.eyebrow}</p>` : ''}
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
          <div id="references"><p class="eyebrow" style="margin-bottom:14px">References</p>${buildReferences()}</div>
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

  /* REVEAL for full-screen frames (opener, film): from the moment the frame
     enters at the bottom until it reaches the top, its footage stays fixed on
     screen (see .is-revealing in style.css), so the section above slides away
     like a turned page and uncovers it. Then the frame is pinned, and finally
     slides away itself, with its footage, to uncover the next one. */
  const reveal = (el) => ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'top top', toggleClass: 'is-revealing' });

  /* PARALLAX for editorial blocks: one layer moves faster than another */
  const drift = (target, trigger, from, to) => target && gsap.fromTo(target, { y: from }, { y: to, ease: 'none',
    scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } });

  /* the slanted top edge of 02-5: a line at 30°, so its drop = width × tan 30° */
  const slant = () => {
    const g = document.querySelector('.m-gallery');
    const deg = g ? +g.dataset.angle || 30 : 30;
    return window.innerWidth * Math.tan(deg * Math.PI / 180);
  };
  const setScreenVars = () => {
    document.documentElement.style.setProperty('--slant', slant() + 'px');
    document.documentElement.style.setProperty('--vhpx', window.innerHeight + 'px');
  };
  setScreenVars();
  ScrollTrigger.addEventListener('refreshInit', setScreenVars);

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
      reveal(el);
    },

    scene(el) {
      /* the text arrives with the frame, holds, then lifts away before the frame leaves */
      const text = $('.m-scene__text', el);
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=120%', pin: true, scrub: true } })
        .to({}, { duration: .7 })
        .to(text, { y: -60, opacity: 0, ease: 'power1.in', duration: .3 });
      if (el.dataset.duck) {
        ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%',
          onToggle: (self) => Sound.duck(self.isActive ? +el.dataset.duck : 1) });
      }
      reveal(el);
    },

    film(el) {
      const words = splitWords($('.m-film__line span', el));
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', pin: true, scrub: true } })
        .fromTo($('.m-film__media', el), { scale: 1.1 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(words, { opacity: .1 }, { opacity: 1, stagger: .05, duration: .2, ease: 'none' }, .05);
      /* sound cue lands as the last word of the line appears (scrolling down only) */
      if (el.dataset.cue) {
        const at = Math.min(.9, .05 + words.length * .05 + .15);
        tl.call(() => { if (tl.scrollTrigger && tl.scrollTrigger.direction > 0) Sound.cue(el.dataset.cue); }, null, at);
      }
      reveal(el);
    },

    text(el) {
      fadeUp($$('.m-text__inner > *', el), el);
      drift($('.m-text__inner', el), el, 70, -70);
      const fig = $('.m-text__fig', el);
      if (fig) {
        const d = fig.classList.contains('is-wide') ? 60 : 180;
        drift(fig, el, d, -d);   // the photo moves faster than the text: two depths
        gsap.fromTo($('.media', fig), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from(fig, { opacity: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' } });
      }
      /* lower the ambience while the reader is reading this block */
      if (el.dataset.duck) {
        ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%',
          onToggle: (self) => Sound.duck(self.isActive ? +el.dataset.duck : 1) });
      }
    },

    spread(el) {
      const frame = $('.m-spread__frame', el);
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 45%', scrub: true } })
        .fromTo(frame, { clipPath: 'inset(16% 8% 16% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
        .fromTo($('.media', frame), { scale: 1.25 }, { scale: 1, ease: 'none' }, 0);
      fadeUp($$('.m-spread__text > *, figcaption', el), el, 'top 60%');
      drift($('.m-spread__fig', el), el, 110, -110);
      const second = $('.m-spread__frame--2', el);
      if (second) drift(second, el, 90, -90);   // the second photo sits on a nearer layer
      drift($('.m-spread__text', el), el, 40, -40);
    },

    portrait(el) {
      drift($('figure', el), el, 120, -120);
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

    /* 02-2 → 02-4 on one pinned screen. Units of the timeline = one screen height of scrolling. */
    dive(el) {
      const vh = () => window.innerHeight;
      const layers = $$('.m-dive__layer', el);
      const water = $('.m-dive__water', el);
      const gauge = $('.gauge', el);
      const marker = $('.gauge__marker', el);
      const value = $('.gauge__value b', el);
      const max = +el.dataset.max;
      const texts = $$('.dive-text', el);
      const stops = texts.filter((t) => t.classList.contains('dive-stop'));
      const line = texts.find((t) => t.classList.contains('dive-line'));
      const facts = texts.find((t) => t.classList.contains('dive-facts'));
      /* the next module (02-5) rises over this screen while it is still pinned */
      const next = el.nextElementSibling;
      const coverNext = next && next.classList.contains('m-gallery');
      if (coverNext) next.classList.add('is-covering');

      gsap.set(layers.slice(1), { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      /* a text block travels from below the screen to above it, at scroll speed */
      const span = (t) => 1 + t.offsetHeight / vh();
      const pass = (t, at) => tl.fromTo(t, { y: 0 }, { y: () => -(vh() + t.offsetHeight), duration: span(t) }, at);

      /* 02-2 descent: each depth line appears in the middle of the screen and is replaced by the next;
         the gauge moves to that line's depth as it appears */
      const depth = { d: 0 };
      const setDepth = () => { marker.style.top = (depth.d / max) * 100 + '%'; value.textContent = Math.round(depth.d); };
      const STEP = .6;
      let prevC = 0, prevD = 0;
      gsap.set(stops, { opacity: 0, y: 30 });
      stops.forEach((st, i) => {
        const at = .1 + i * STEP;
        const d = +st.dataset.depth;
        if (d !== prevD) tl.to(depth, { d, duration: at - prevC, onUpdate: setDepth }, prevC);
        tl.to(st, { opacity: 1, y: 0, duration: .12, ease: 'power2.out' }, at);
        tl.to(st, { opacity: 0, y: -30, duration: .1, ease: 'power2.in' }, at + STEP - .12);
        prevC = at; prevD = d;
      });
      prevC += STEP - .1;
      tl.fromTo(water, { opacity: 0 }, { opacity: .55, duration: prevC }, 0);

      /* 02-3 the footage changes to the seabed; the line passes */
      let x = prevC + 0.45;
      if (layers[1]) tl.to(layers[1], { opacity: 1, duration: .2 }, x).to([gauge, water], { opacity: 0, duration: .2 }, x);
      if (line) { pass(line, x + .05); x += .05 + span(line) * .62; }

      /* 02-4 the footage changes to picking (darkened); the numbers rise and stay */
      if (layers[2]) tl.to(layers[2], { opacity: 1, duration: .2 }, x);
      if (facts) {
        const rise = .5 + facts.offsetHeight / (2 * vh());
        tl.fromTo(facts, { y: 0 }, { y: () => -(vh() + facts.offsetHeight) / 2, duration: rise }, x + .05);
        $$('.num', facts).forEach((n) => {
          const m = n.textContent.match(/^([^\d]*)([\d,.]+)(.*)$/);
          if (!m) return;
          const o = { v: 0 };
          tl.to(o, { v: parseFloat(m[2].replace(/,/g, '')), duration: rise, onUpdate: () => { n.textContent = m[1] + Math.round(o.v) + m[3]; } }, x + .05);
        });
        const lis = $$('.rhythm li', facts);
        const k = { v: 0 };
        tl.to(k, { v: lis.length, duration: .5, onUpdate: () => lis.forEach((li, i) => li.classList.toggle('is-on', i < Math.round(k.v))) }, x + .05 + rise);
      }
      /* hold while 02-5 rises over it: exactly one screen + the slanted edge */
      tl.to({}, { duration: coverNext ? 1 + slant() / vh() : .3 });

      ScrollTrigger.create({ animation: tl, trigger: el, start: 'top top', end: () => '+=' + tl.duration() * vh(),
        pin: true, scrub: true, invalidateOnRefresh: true });
      reveal(el);
    },

    /* 02-5: text holds, photos pass beneath it from right to left */
    gallery(el) {
      const items = $$('.g-item', el);
      const text = $('.m-gallery__text', el);
      /* while 02-5 rises, its text waits fixed in its final place (clipped by the slanted edge)
         and fades in once the slant has covered about a third of the screen */
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: () => 'top top-=' + slant(), toggleClass: 'is-rising' });
      gsap.fromTo(text, { opacity: 0 }, { opacity: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 45%', end: 'top 12%', scrub: true } });
      /* photos pass right to left beneath the text; the last one stops on the right */
      const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });
      const STAG = .36;
      let endT = 0;
      items.forEach((it, i) => {
        const last = i === items.length - 1;
        const full = () => window.innerWidth + it.offsetWidth;
        if (!last) tl.fromTo(it, { x: 0 }, { x: () => -full(), duration: 1 }, i * STAG);
        else {
          const stopAt = .41;                                  // stops with its left edge at 59 % of the screen
          const dur = (stopAt * window.innerWidth) / full();     // same speed as the others
          tl.fromTo(it, { x: 0 }, { x: () => -stopAt * window.innerWidth, duration: dur }, i * STAG);
          endT = i * STAG + dur;
        }
      });
      ScrollTrigger.create({ animation: tl.tweenFromTo(0, endT || tl.duration(), { ease: 'none', paused: true }),
        trigger: el, start: () => 'top top-=' + slant(), end: () => '+=' + (endT || tl.duration()) * window.innerHeight * .9,
        pin: true, scrub: true, invalidateOnRefresh: true });
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
      reveal(el);
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
        .to(obj, { v: to, ease: 'none', duration: 1, onUpdate: () => {
          const step = from - to > 5000 ? 100 : 10;   // round while counting; land on the exact figure
          num.textContent = (Math.abs(obj.v - to) < 1 ? to : Math.round(obj.v / step) * step).toLocaleString('en-US'); } }, 0)
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
    gsap.to('.landing__inner', { y: -180, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.landing', start: 'top top', end: 'bottom top', scrub: true } });
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
    e.preventDefault();
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
