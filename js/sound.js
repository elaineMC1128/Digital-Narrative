/* =====================================================================
   SOUND SYSTEM (Howler.js)
   • One looping ambience per chapter, crossfaded on scroll.
   • One-shot cues (e.g. sumbisori) played when a module enters.
   • Browsers only allow audio after one click → started by "Enter with sound".
   ===================================================================== */
window.Sound = (() => {
  const FADE = 1800;           // crossfade length in ms
  const loops = {};            // key → Howl
  let files = {};
  let enabled = false;         // user wants sound
  let unlocked = false;        // user has clicked once
  let currentKey = null;
  let currentVol = 0.5;

  function get(key, loop = true) {
    if (!files[key]) return null;
    if (!loops[key]) {
      loops[key] = new Howl({ src: [files[key]], loop, volume: 0, html5: true, preload: true });
    }
    return loops[key];
  }

  function fadeOut(key) {
    const h = loops[key];
    if (!h || !h.playing()) return;
    h.fade(h.volume(), 0, FADE);
    h.once('fade', () => { if (key !== currentKey || !enabled) h.pause(); });
  }

  function fadeIn(key, vol) {
    const h = get(key);
    if (!h) return;
    if (!h.playing()) { h.volume(0); h.play(); }
    h.fade(h.volume(), vol, FADE);
  }

  return {
    init(soundFiles) { files = soundFiles || {}; },

    /* called by the Enter buttons and the sound toggle */
    setEnabled(on) {
      enabled = on;
      unlocked = unlocked || on;
      if (on && currentKey) fadeIn(currentKey, currentVol);
      if (!on) Object.keys(loops).forEach(fadeOut);
    },
    isEnabled() { return enabled; },

    /* called when a chapter becomes active */
    setScene(key, vol = 0.5) {
      if (key === currentKey && vol === currentVol) return;
      const prev = currentKey;
      currentKey = key; currentVol = vol;
      if (!enabled || !unlocked) return;
      if (prev && prev !== key) fadeOut(prev);
      fadeIn(key, vol);
    },

    /* one-shot sound, e.g. the sumbisori whistle */
    cue(key, vol = 0.8) {
      if (!enabled || !files[key]) return;
      const h = new Howl({ src: [files[key]], volume: vol, html5: true });
      h.play();
    }
  };
})();
