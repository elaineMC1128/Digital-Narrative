/* =====================================================================
   SOUND SYSTEM (Howler.js)
   • One ambience bed at a time (sea, under water, music…), crossfaded on scroll.
   • Each bed loops seamlessly: two players take turns and crossfade near the
     end of the file, so there is never a gap or click at the loop point.
   • One-shot cues (the plunge into 02, the sumbisori on the way back up).
   • "Voice": a video that plays its own sound while on screen (01-2, 03-2, 03-5);
     the bed dips a little underneath it.
   • Browsers only allow audio after one click → started by "Enter with sound".
   • html5 audio is used so the site also works opened straight from the folder.
   ===================================================================== */
window.Sound = (() => {
  const FADE = 4000;           // default crossfade between chapter beds (ms)
  const LOOP_XF = 4;           // crossfade at the loop point (s)
  const beds = {};             // key → bed
  let files = {};
  let enabled = false;         // user wants sound
  let unlocked = false;        // user has clicked once
  let currentKey = null;
  let currentVol = 0.5;
  let duckBy = 1;              // 1 = full, 0.5 = half (while a text block is read)
  let voiceDuck = 1;           // lower while a video plays its own sound
  let pending = 0;             // timer for a delayed bed entry

  /* volume ramp done here rather than with Howler's fade, which can be dropped
     when a paused html5 sound is resumed */
  function ramp(p, to, ms, done) {
    clearInterval(p._ramp);
    const from = p.volume(), t0 = Date.now();
    if (ms <= 0) { p.volume(to); if (done) done(); return; }
    /* equal-power curves: a rise follows sin, a fall follows cos, so two sounds
       crossfading keep a steady loudness instead of dipping in the middle */
    const up = to > from;
    p._ramp = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / ms);
      const f = up ? Math.sin(k * Math.PI / 2) : 1 - Math.cos(k * Math.PI / 2);
      p.volume(from + (to - from) * f);
      if (k >= 1) { clearInterval(p._ramp); if (done) done(); }
    }, 40);
  }

  /* ---------- seamless looping bed ---------- */
  function makeBed(key) {
    const mk = () => new Howl({ src: [files[key]], volume: 0, html5: true, preload: true });
    const bed = { players: [mk(), mk()], i: 0, target: 0, on: false, timer: 0, xfading: false };
    bed.cur = () => bed.players[bed.i];
    bed.tick = () => {
      const p = bed.cur();
      const d = p.duration();
      if (!bed.on || !d || bed.xfading) return;
      const t = p.seek();
      if (typeof t === 'number' && t > d - LOOP_XF) {
        /* the other player starts at the top and takes over */
        bed.xfading = true;
        const next = bed.players[1 - bed.i];
        next.seek(0); next.volume(0); next.play();
        ramp(next, bed.target, LOOP_XF * 1000);
        ramp(p, 0, LOOP_XF * 1000, () => { p.stop(); bed.xfading = false; });
        bed.i = 1 - bed.i;
      }
    };
    return bed;
  }
  function bed(key) {
    if (!files[key]) return null;
    return beds[key] || (beds[key] = makeBed(key));
  }
  function bedIn(key, vol, ms = FADE) {
    const b = bed(key);
    if (!b) return;
    b.target = vol;
    const p = b.cur();
    if (!b.on) {
      b.on = true;
      if (!p.playing()) { p.volume(0); p.play(); }
      clearInterval(b.timer); b.timer = setInterval(b.tick, 200);
    }
    ramp(p, vol, ms);
  }
  function bedOut(key, ms = FADE) {
    const b = beds[key];
    if (!b || !b.on) return;
    b.on = false; b.target = 0;
    clearInterval(b.timer);
    b.xfading = false;
    b.players.forEach((p) => {
      if (!p.playing()) return;
      ramp(p, 0, ms, () => { if (!b.on) p.pause(); });
    });
  }
  function bedLevel(key, vol, ms) {
    const b = beds[key];
    if (!b || !b.on) return;
    b.target = vol;
    if (b.xfading) { ramp(b.cur(), vol, ms); return; }   // the outgoing player is already fading away
    b.players.forEach((p) => { if (p.playing()) ramp(p, p === b.cur() ? vol : 0, ms); });
  }

  const level = () => currentVol * duckBy * voiceDuck;

  /* ---------- video with its own sound ---------- */
  let voiceEl = null, voiceVol = 0, voiceDip = 0.6, voiceRaf = 0;
  function fadeVideo(v, to, ms, done) {
    cancelAnimationFrame(voiceRaf);
    const from = v.volume, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      try { v.volume = from + (to - from) * k; } catch (e) {}   // iOS ignores volume and just unmutes
      if (k < 1) voiceRaf = requestAnimationFrame(step); else if (done) done();
    };
    voiceRaf = requestAnimationFrame(step);
  }
  function startVoice() {
    const v = voiceEl;
    if (!v) return;
    voiceDuck = voiceDip; bedLevel(currentKey, level(), 2000);
    v.currentTime = 0; v.volume = 0; v.muted = false;
    v.play().catch(() => {});
    fadeVideo(v, voiceVol, 2000);
  }
  function stopVoice(v) {
    voiceDuck = 1; bedLevel(currentKey, level(), 2000);
    if (v) fadeVideo(v, 0, 1500, () => { v.muted = true; });
  }

  return {
    init(soundFiles) { files = soundFiles || {}; },

    /* called by the Enter buttons and the sound toggle */
    setEnabled(on) {
      enabled = on;
      unlocked = unlocked || on;
      if (on && currentKey) bedIn(currentKey, level());
      if (on && voiceEl) startVoice();
      if (!on) {
        Object.keys(beds).forEach((k) => bedOut(k));
        if (voiceEl) { voiceEl.muted = true; voiceDuck = 1; }
      }
    },
    isEnabled() { return enabled; },

    /* change the bed. opts: { out, in, delay } in ms — e.g. let a cue finish before the new bed rises */
    setScene(key, vol = 0.5, opts = {}) {
      if (key === currentKey && vol === currentVol) return;
      const prev = currentKey;
      currentKey = key; currentVol = vol;
      clearTimeout(pending);
      if (!enabled || !unlocked) return;
      if (prev && prev !== key) bedOut(prev, opts.out || FADE);
      if (prev === key) { bedLevel(key, level(), opts.in || FADE); return; }
      const go = () => { if (currentKey === key && enabled) bedIn(key, level(), opts.in || FADE); };
      if (opts.delay) pending = setTimeout(go, opts.delay); else go();
    },

    /* temporarily lower the bed (e.g. 0.5 while a text block is read) */
    duck(factor = 1) {
      duckBy = factor;
      if (enabled) bedLevel(currentKey, level(), 1500);
    },

    /* a video that plays its own sound while on screen; dip = how far the bed drops under it */
    voiceOn(v, vol = 0.9, dip = 0.6) {
      voiceEl = v; voiceVol = vol; voiceDip = dip;
      if (enabled) startVoice();
    },
    voiceOff(v) {
      if (voiceEl === v) voiceEl = null;
      if (enabled) stopVoice(v); else if (v) v.muted = true;
    },

    /* fade the current bed away (e.g. while the plunge plays) */
    silence(ms = 600) {
      clearTimeout(pending);
      if (currentKey) bedOut(currentKey, ms);
      currentKey = null;
    },

    /* one-shot sound, faded in (never starts with a click); returns it so it can be stopped early */
    cue(key, vol = 0.8, fadeIn = 300) {
      if (!enabled || !files[key]) return null;
      const h = new Howl({ src: [files[key]], volume: 0, html5: true });
      h.play();
      ramp(h, vol, fadeIn);
      return h;
    },
    stop(h, ms = 800) {
      if (!h) return;
      ramp(h, 0, ms, () => h.stop());
    }
  };
})();
