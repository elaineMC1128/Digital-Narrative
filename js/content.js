/* =====================================================================
   JEJU HAENYEO — CONTENT FILE
   ---------------------------------------------------------------------
   This is the main file you edit. It holds every chapter's text, media,
   colours and sound. The animation code (main.js) reads from here.

   HOW TO…
   • Change text ............ edit the strings below. Use <i>…</i> for italic,
                              <br> for a line break.
   • Replace a placeholder .. put your file in assets/img or assets/video,
                              then change the path, e.g.
                              img('assets/img/bulteok.webp', 'Divers at the bulteok')
   • Reorder a chapter ...... move the { type: … } blocks inside "modules".
   • Change chapter colours . edit "theme" (bg = background, fg = text,
                              muted = secondary text, accent = highlights).
   • Change chapter sound ... edit "sound" (a key from SOUNDS below).

   MODULE TYPES (the layout kit)
     opener    G  chapter opening screen (uses the chapter's num/title/kr)
     film      A  full-screen video/photo + one line of text
     text         editorial text block (heading, lead, paragraphs)
     spread    B  image + text columns
     horizontal   magazine pages that move sideways (spread/portrait/image panels)
     strip     C  horizontal photo sequence with captions
     portrait  D  portrait + quote
     facts     E  big numbers / words
     depth     F  pinned dive: depth gauge moves with scroll
     decline   F  pinned dot field: 4,500 → 2,839

   ALL TEXT BELOW IS DRAFT COPY based on the A2 research — rewrite freely.
   ===================================================================== */

/* ---------- media helpers (keep these) ---------- */
const PH = {
  video:     'assets/video/placeholder-16x9.mp4',
  poster:    'assets/img/placeholder-video-poster.jpg',
  wide:      'assets/img/placeholder-wide.jpg',
  landscape: 'assets/img/placeholder-landscape.jpg',
  portrait:  'assets/img/placeholder-portrait.jpg',
  square:    'assets/img/placeholder-square.jpg'
};
/* video(src, poster, alt, ref) — muted, looping, autoplays when on screen.
   ref = reference code shown on the media (e.g. 'F2'); it links to the
   matching entry in REFERENCES below. Leave '' if the source is not known yet. */
const video = (src = PH.video, poster = PH.poster, alt = '', ref = '') =>
  ({ type: 'video', src, poster, alt, ref });
/* img(src, alt, ref) */
const img = (src = PH.wide, alt = '', ref = '') =>
  ({ type: 'image', src, alt, ref });

/* ---------- sounds: key → file ---------- */
const SOUNDS = {
  waves:       'assets/audio/waves.mp3',        // PLACEHOLDER — replace with real sea ambience
  underwater:  'assets/audio/underwater.mp3',   // PLACEHOLDER
  warm:        'assets/audio/warm-drone.mp3',   // PLACEHOLDER — voices / intimate sound
  music:       'assets/audio/music.mp3',        // PLACEHOLDER — documentary score
  quiet:       'assets/audio/near-silence.mp3', // PLACEHOLDER — thin wind
  sumbisori:   'assets/audio/sumbisori.mp3',    // REAL — cut from F2 (Lessons from Jeju), 0–3.6 s
  chorus:      'assets/audio/sumbisori-chorus.mp3', // made from the sumbisori: 4 layers offset in time, pitch and pan (not used at the moment)
  whistle:     'assets/audio/sumbisori-whistle.mp3' // the original whistle effect, used for 01-2
};

/* ---------- references: one entry per source (RMIT Harvard) ----------
   Codes: F = film/video · P = photo/illustration · S = sound · T = text/data.
   Every media item or text that uses a source carries its code; the
   reference list at the end of the site is built from this list and shows
   where each source is used. [Square brackets] = still to fill in. */
const REFERENCES = {
  F1: 'Patagonia ([year]) <i>Daughter of the Sea: Sisterhood in the Sea</i> [video], Patagonia Films, YouTube, accessed [date]. https://youtu.be/5nNXdzvex08',
  F2: 'Gormley N (2020) <i>Lessons from Jeju | Freediving and Motherhood with Kimi Werner</i> [video], Patagonia, YouTube, accessed [date]. https://youtu.be/r4jLplyxXqI',
  F3: 'ABC News ([year]) <i>Follow Korea’s oldest free divers on their underwater treasure hunt</i> [video], YouTube, accessed [date]. https://youtu.be/VHMngOUUYvc',
  F4: 'Apple TV ([year]) <i>The Last of the Sea Women — Official Trailer</i> [video], YouTube, accessed [date]. https://youtu.be/uAAaSUgqvB8',
  P1: 'Park M (2018) <i>The Haenyo of Jeju</i> [photograph], SOOK, accessed 12 October 2026. https://minapark.com/journal/2018/8/20/jeju-island-haenyo',
  P2: 'Haenyeo Museum (2012) <i>Culture of Jeju Haenyeo (women divers)</i> [photograph], UNESCO Intangible Cultural Heritage, accessed 12 October 2026. https://ich.unesco.org/en/RL/culture-of-jeju-haenyeo-women-divers-01068',
  P3: 'Haenyeo Museum (2012) <i>Jeju Haenyeo</i> [photograph], Jeju Provincial Self-governing Haenyeo Museum, Google Arts &amp; Culture, accessed 12 October 2026. https://artsandculture.google.com/asset/jeju-haenyeo/rwFN3rDE0zQ7Yg',
  P4: 'Seo JC (1976) <i>Bitchang of abalone harvested</i> [photograph], Jeju Provincial Self-governing Haenyeo Museum, Google Arts &amp; Culture, accessed 12 October 2026. https://artsandculture.google.com/asset/bitchang-of-abalone-harvested/-wGdylyTN5H-dQ',
  T1: 'UNESCO (2016) <i>Culture of Jeju Haenyeo (women divers)</i>, ich.unesco.org, accessed 6 September 2026. https://ich.unesco.org/en/RL/culture-of-jeju-haenyeo-women-divers-01068',
  T2: 'Chan E and Ku D (2020) <i>World Oceans Day / Interview with a Korean Haenyeo (female diver)</i>, Vogue Taiwan, accessed 6 September 2026. https://www.vogue.com.tw/lifestyle/article/korea-haenyeo-world-ocean-day',
  T3: 'Gu X (ed.) (2026) <i>What are haenyeo? Udo, haenyeo culture and a mother’s love beneath the sea</i> [in Chinese], text by Ji-Sun Kim, photographs by Joon Choi, Marie Claire Taiwan, accessed 13 October 2026. https://www.marieclaire.com.tw/lifestyle/issue/20532',
  T4: 'Henderson E (2024) <i>A new generation of Haenyeo</i>, Erin Henderson, accessed 6 September 2026. https://www.erinhendersonmedia.com/blog/a-new-generation-of-haenyeo',
  T5: 'Stevens L (2025) <i>Encounters with Haenyeo</i>, Monash University Arts News and Blog, accessed 31 August 2026. https://www.monash.edu/arts/monash-indigenous-studies/global-encounters-and-first-nations-peoples/news-and-blog/encounters-with-haenyeo'
};

window.SITE = {
  sounds: SOUNDS,
  references: REFERENCES,

  /* ---------------- LANDING ---------------- */
  landing: {
    // 3.mp4 (Lessons from Jeju): a diver rises toward the light, then her orange tewak appears on the surface
    media: video('assets/video/landing-float.mp4', 'assets/img/landing-float-poster.jpg', 'A haenyeo rising toward the surface, then her orange tewak float on the waves', 'F2'),
    eyebrow: '',
    title: 'Jeju Haenyeo',
    kr: '제주 해녀',
    subtitle: 'To dive into the deep, or to become part of the sea.',
    enterSound: 'Enter with sound',
    enterSilent: 'Enter in silence',
    note: 'Best with headphones · Scroll to move through the story',
    sound: 'waves',
    theme: { bg: '#0B2A35', fg: '#F2EFE9', muted: '#9DB3B8', accent: '#D8653B' }
  },

  /* ---------------- CHAPTERS ---------------- */
  chapters: [
    {
      id: 'breath', num: '01',
      title: 'A Breath <i>from</i> the Sea',
      short: 'A Breath from the Sea',
      kr: '숨비소리', krGloss: 'sumbisori · the sound of breath',
      mood: 'curious',
      theme: { bg: '#0B2A35', fg: '#F2EFE9', muted: '#9DB3B8', accent: '#D8653B' },
      tone: 'colour', sound: 'waves', volume: 0.6,
      modules: [
        // up.mp4 (F1, Daughter of the Sea) 0–8 s
        { type: 'opener', media: video('assets/video/ch01-surface.mp4', 'assets/img/ch01-surface-poster.jpg', 'Camera rising from under the water as a haenyeo surfaces', 'F1'),
          subtitle: 'Before you see them, you hear them.' },
        // Sumbisori.mp4 (Lessons from Jeju) 0–7.6 s: a diver beside her tewak, then a close-up as she breathes
        { type: 'film', media: video('assets/video/ch01-float.mp4', 'assets/img/ch01-float-poster.jpg', 'A haenyeo surfacing beside her orange tewak float', 'F2'),
          line: 'A float bobs on the water. Then, a sharp whistle.', align: 'left', cue: 'whistle' },
        { type: 'text',
          heading: 'Sumbisori',
          lead: 'When a haenyeo surfaces after a dive, she lets out the air she has held in one long, high whistle.',
          body: [
            'The sound is called <i>sumbisori</i> (숨비소리), “the sound of breath”. It empties the lungs quickly so she can breathe again, and dive again.',
            'For generations along Jeju’s coast, this sound has marked the work of women who harvest the sea without oxygen tanks.'
          ],
          ref: 'T1',
          media: img('assets/img/ch01-mask.jpg', 'Close-up of a haenyeo in her mask beside an orange tewak', 'F2'),
          duck: 0.5 },
        // 2.mp4 (F1, Daughter of the Sea) 4.5–14 s
        { type: 'film', media: video('assets/video/ch01-group.mp4', 'assets/img/ch01-group-poster.jpg', 'Several haenyeo and their orange floats spread across a glittering sea', 'F1'),
          line: 'Who are the women behind the breath?', align: 'center' }  // only the sea ambience here (Meilin, 11 Oct)
      ]
    },

    {
      id: 'closer', num: '02',
      title: 'Getting <i>Closer</i>',
      short: 'Getting Closer',
      kr: '물질', krGloss: 'muljil · the work of diving',
      mood: 'impressed',
      theme: { bg: '#061A21', fg: '#E6E5E1', muted: '#7F9AA0', accent: '#D8653B' },
      tone: 'colour', sound: 'underwater', volume: 0.55,
      modules: [
        // 2-1, 2-2, 2-3.mp4 are from F1 (Daughter of the Sea); harvest.mp4 is from F2 (Lessons from Jeju)
        // 2-1.mp4 0–4.7 s, slowed to 80 %: she duck-dives beside her tewak, fins last
        { type: 'opener', media: video('assets/video/ch02-dive.mp4', 'assets/img/ch02-dive-poster.jpg', 'A haenyeo duck-dives beside her orange tewak, her fins disappearing last', 'F1'),
          subtitle: 'Work, knowledge and the cost of every dive.' },
        // 02-2 → 02-4 as ONE pinned screen ('dive'): the footage stays on screen and changes
        // underneath (descent → seabed → picking), only the text moves through it.
        { type: 'dive', maxDepth: 30,
          scenes: [
            // 02-2 · 2-2.mp4 0–18.6 s: seen from below, a diver descends away from the sunlit surface
            { media: video('assets/video/ch02-descent.mp4', 'assets/img/ch02-descent-poster.jpg', 'Seen from below, a diver descends away from the sunlit surface', 'F1'),
              stops: [
                { depth: 0,  text: 'The surface. An orange float, the <i>tewak</i> (테왁), marks where she went down.' },
                { depth: 5,  text: 'Light fades. Sound disappears.' },
                { depth: 10, text: 'Around 10 metres: the typical working depth.', ref: 'T1' },
                { depth: 20, text: 'Up to three minutes on a single breath.', ref: 'F4' },
                { depth: 30, text: 'Some divers are reported to reach 30 metres.', ref: 'F4' }
              ] },
            // 02-3 · harvest.mp4 0–5.8 s at 80 %: searching the seabed among the kelp
            { media: video('assets/video/ch02-harvest.mp4', 'assets/img/ch02-harvest-poster.jpg', 'A haenyeo searching the rocky seabed among the kelp', 'F2'),
              line: 'Down here, she works on the breath she brought.' },
            // 02-4 · 2-3.mp4 55–66.6 s: two divers picking among the kelp (darkened behind the numbers)
            { media: video('assets/video/ch02-pick.mp4', 'assets/img/ch02-pick-poster.jpg', 'Two haenyeo picking among the kelp on the seabed', 'F1'), dim: 0.55,
              facts: { heading: 'One working day',
                items: [
                  { value: '≈10', unit: 'm', label: 'typical depth', ref: 'T1' },
                  { value: '3', unit: 'min', label: 'up to one breath', ref: 'F4' },
                  { value: '7', unit: 'hrs', label: 'up to one workday', ref: 'T1' },
                  { value: '90', unit: 'days', label: 'at sea each year', ref: 'T1' }
                ],
                rhythm: ['Descend', 'Hold', 'Harvest', 'Surface'] } }
          ] },
        // 02-5 · rises over 02-4 with a slanted edge; the text holds while four photos pass beneath it, right to left
        { type: 'gallery', angle: 30,   // angle of the slanted top edge, in degrees
          heading: 'What she carries',
          lead: 'A wetsuit, a mask, fins, a net, and the orange tewak.', leadRef: 'T5',
          bodyRef: 'T4 T5',   // shown after the last paragraph (the risks)
          body: [
            'Everything else is knowledge: where the currents turn, which rocks hide abalone, when it is time to come up.',
            'The risks are real. Freezing water, strong tides and swells, discarded fishing nets and passing boats. Each dive is measured against her own breath.'
          ],
          images: [
            img('assets/img/ch02-carry-1.jpg', 'Haenyeo on the rocks, sorting their nets and orange tewak', 'P1'),   // The Haenyo of Jeju — SOOK.jpg
            img('assets/img/ch02-carry-2.jpg', 'Underwater, a haenyeo reaches into the rocks beside her net', 'P2'), // 4.webp
            img('assets/img/ch02-carry-5.jpg', 'Underwater, a haenyeo in a mask looks up beside her full net', 'P3'),          // Jeju Haenyeo.png
            img('assets/img/ch02-carry-3.jpg', 'Black-and-white photo of haenyeo climbing back onto a boat with their catch', 'P4')  // Bitchang of abalone harvested.png (stops on the right)
          ] }
      ]
    },

    {
      id: 'why', num: '03',
      title: 'Why They <i>Enter</i> the Sea',
      short: 'Why They Enter the Sea',
      kr: '어머니', krGloss: 'eomeoni · mother',
      mood: 'empathy',
      theme: { bg: '#E8DFCC', fg: '#2B2E31', muted: '#6E675A', accent: '#B4532F' },
      tone: 'colour', sound: 'warm', volume: 0.45,
      modules: [
        // Two linked angles (Meilin, 12 Oct): A. Motherhood, family and sacrifice · B. Labour, independence and pride.
        // "Motherhood explains what they worked for. Independence explains what the work gave back."
        // All 03 footage: Lessons from Jeju (F2), from the screen recording ScreenRecording_09-30 (warm grade)
        // 274–279 s: a haenyeo on the harbour at dusk
        { type: 'opener', media: video('assets/video/ch03-harbor.mp4', 'assets/img/ch03-harbor-poster.jpg', 'A haenyeo on the harbour at dusk', 'F2'),
          subtitle: 'What they worked for, and what the work gave back.' },

        // ── A. Motherhood, family and sacrifice ──
        // 03-2.mp4 (Meilin's cut from F2, uncropped): mending nets, the patterned headscarf, haenyeo on the rocks
        { type: 'scene', heading: 'Motherhood, family and sacrifice',
          lead: 'For the older generation, choices were few. Diving was how a mother kept her family going.', ref: 'T5',
          body: [
            'They dived to feed and raise their children, and to give the next generation more choices than they had.',
            'The photographer Joon Choi saw what held them to such hard work: without a strong maternal instinct, he said, they could not have raised their children.'
          ], bodyRef: 'T3',
          media: video('assets/video/ch03-scene.mp4', 'assets/img/ch03-scene-poster.jpg', 'Haenyeo mending nets and working on the rocks by the sea', 'F2'), duck: 0.5 },
        // the haenyeo's own words; pages move sideways
        { type: 'horizontal', panels: [
          // 03-3-1.mp4 (Meilin's cut from F2)
          { kind: 'spread', media: video('assets/video/ch03-duedate.mp4', 'assets/img/ch03-duedate-poster.jpg', 'Haenyeo pulling on their wetsuits and fins', 'F2'),
            heading: 'Up to the due date',
            body: [
              '“Back in the old days, all the Haenyeo would work up to their due date, around ten months.”',
              '“The hardest part was bending over your belly to put your fins on!”',
              '<span class="cite">A haenyeo in <i>Lessons from Jeju</i> (Gormley 2020)</span>'
            ] },
          // 03-3-2.mp4 (Meilin's cut from F2; the film's own subtitles are visible)
          { kind: 'portrait', media: video('assets/video/ch03-childbirth.mp4', 'assets/img/ch03-childbirth-poster.jpg', 'Older haenyeo talking with Kimi Werner at the table', 'F2'), fit: 'full',
            quote: 'Back then, after childbirth, you only had a week before you had to go back to work.',
            cite: 'A haenyeo in <i>Lessons from Jeju</i> (Gormley 2020)' },
          // 03-3-3.mp4 (Meilin's cut from F2): seabed, the full net, back on the boat
          { kind: 'portrait', media: video('assets/video/ch03-daughter.mp4', 'assets/img/ch03-daughter-poster.jpg', 'A haenyeo on the seabed, then the full net hauled onto the boat', 'F2'), fit: 'full',
            quote: 'Before, I didn’t want my daughter to do this work.',
            cite: 'A haenyeo in <i>Lessons from Jeju</i> (Gormley 2020)',
            note: 'They knew how hard and dangerous the work was, and did not want their daughters to inherit it. They carried it so the next generation could choose a different life.', noteRef: 'T3' }
        ] },

        // ── B. Labour, independence and pride ──
        { type: 'text', heading: 'Labour, independence and pride',
          lead: 'But the sea was never only a burden. Diving gave haenyeo an income of their own.', ref: 'T5',
          body: [
            'They did not have to depend entirely on a husband, their children or anyone else. Their skill gave them a central place in the family.',
            'The culture of Jeju haenyeo has contributed to the advancement of women’s status in the community.'
          ], bodyRef: 'T1', duck: 0.5 },
        // 614–627.5 s: the haenyeo who says these words, cropped above the film's subtitles
        { type: 'film', media: video('assets/video/ch03-freedom.mp4', 'assets/img/ch03-freedom-poster.jpg', 'Two older haenyeo talking at the table', 'F2'),
          line: '“But now, I can make money and I have freedom.”', align: 'left' },
        // 705–707.5 s at 70 %: portrait of a haenyeo on the shore, mask on her forehead
        { type: 'portrait', media: video('assets/video/ch03-proud.mp4', 'assets/img/ch03-proud-poster.jpg', 'Portrait of a haenyeo on the shore, her mask pushed up on her forehead', 'F2'),
          quote: 'Wherever I go, I tell people I’m Haenyeo proudly!',
          cite: 'A haenyeo in <i>Lessons from Jeju</i> (Gormley 2020)' },
        // the chapter's core relation (Meilin)
        { type: 'text',
          lead: 'Motherhood explains what they worked for. Independence explains what the work gave back.',
          body: [ 'Love, labour and independence were never three separate stories. They were parts of the same life.' ] }
      ]
    },

    {
      // 04 Learning from Haenyeo (Meilin, 12 Oct): Recognition of Their Value.
      // A · their plain beauty (inner value) → B · seen by the world (recognition).
      // Admiration → Appreciation → Recognition. T2 / T3 are in Chinese; English here is translated.
      id: 'beauty', num: '04',
      title: 'Learning <i>from</i> Haenyeo',
      short: 'Learning from Haenyeo',
      kr: '', krGloss: '',
      mood: 'admiration',
      theme: { bg: '#EEF3F1', fg: '#15302F', muted: '#5E7875', accent: '#3F7E77' },
      tone: 'colour', sound: 'music', volume: 0.5,
      modules: [
        // 04-1 · 04-1.mp4 (Meilin's cut from F2): haenyeo on the boat, then a portrait
        { type: 'opener', media: video('assets/video/ch04-open.mp4', 'assets/img/ch04-open-poster.jpg', 'Haenyeo heading out on the boat, then a portrait of one of them', 'F2'),
          subtitle: 'A plain beauty, and a way of living with the sea.' },
        // 04-2 · thesis (Meilin)
        { type: 'text',
          lead: 'The haenyeo are not a heritage label. They carry a philosophy of survival built on living with nature at its limits, and the courage to meet the sea with nothing but the body.' },

        // ── A · their beauty ──
        // 04-3 · 04-3.mp4 (Meilin's cut from F2): a haenyeo surfaces holding up her catch
        { type: 'scene', heading: 'What is beautiful?',
          lead: 'Photographer Joon Choi asked a haenyeo what was the most beautiful sight of her sixty years at sea. She thought for a long time, then said: “When I see a pile of shellfish.”', ref: 'T3',
          body: [
            'Her answer was not an abstract idea of beauty, but the plainest picture of a real life.',
            'They may not fit what most people call beautiful. But, as Choi says, they are truly beautiful: their stories and the deep lines on their faces run as deep as their love for their children.'
          ], bodyRef: 'T3',
          media: video('assets/video/ch04-shellfish.mp4', 'assets/img/ch04-shellfish-poster.jpg', 'A haenyeo surfaces and holds up the shellfish she has caught', 'F2') },
        // 04-4 · nine kinds of beauty
        // TODO: sources of 04-4-1.jpg, the .avif portrait, 04-4-5.jpg, 04-4-7.jpg, 7401…jpg and bdcf03…jpg; Haenyo+Truck is assumed to be from the SOOK post (P1)
        { type: 'strip', heading: 'Not mermaids. Not warriors.',
          intro: 'Their beauty is not an ideal image. It comes from a real life.',
          uniform: true,   // every frame the same size (Meilin, 13 Oct)
          items: [
            { media: img('assets/img/ch04-q1-family.jpg', 'Two smiling haenyeo sitting on the harbour wall with their orange tewak and nets', ''),
              title: 'Love for their families', caption: 'To Choi, mothers who risked their lives to raise their children were the ultimate form of beauty.', ref: 'T3' },
            { media: img('assets/img/ch02-carry-3.jpg', 'Black-and-white photo of haenyeo climbing back onto a boat with their catch', 'P4'),
              title: 'Strength and courage', caption: 'They jump into the sea without hesitation, “like soldiers parachuting”.', ref: 'T3' },
            { media: img('assets/img/ch04-q3-pride.jpg', 'Black-and-white portrait of a smiling haenyeo, old diving goggles on her head', ''),
              title: 'Pride in their work', caption: 'They are deeply proud to be haenyeo, and rarely retire.', ref: 'T3' },
            { media: img('assets/img/ch04-q4-independence.jpg', 'Haenyeo riding home in the back of a small truck', 'P1'),
              title: 'Independence and dignity', caption: 'They work until old age, and never ask their children for money.', ref: 'T3' },
            { media: img('assets/img/ch04-q5-life.jpg', 'Black-and-white photo of two haenyeo laughing together on the rocks', ''),
              title: 'Love for life', caption: 'Facing the sea’s risks every day, they still greet a stranger with a gentle smile.', ref: 'T3' },
            { media: img('assets/img/ch02-carry-1.jpg', 'Haenyeo on the rocks, sorting their nets and orange tewak', 'P1'),
              title: 'Honesty and simplicity', caption: 'Quiet and calm, with the composure of people who have lived close to danger.', ref: 'T3' },
            { media: img('assets/img/ch04-q7-knowledge.jpg', 'Haenyeo on the rocks with their nets and orange tewak, a diver standing above them', ''),
              title: 'Knowledge shaped by experience', caption: 'They know this sea inside out: what is in season, and what is not.', ref: 'T2' },
            { media: img('assets/img/ch04-q8-nature.jpg', 'Aerial view of a single haenyeo diving over a green reef', ''),
              title: 'Respect for nature', caption: '“Catching food by hand underwater teaches you to respect the sea.”', ref: 'T2' },
            { media: img('assets/img/ch04-q9-enough.jpg', 'Two haenyeo walking back across the rocks at low tide, carrying their catch', ''),
              title: 'Knowing when to take and when to stop', caption: 'They know how to strive, and when to let go.', ref: 'T3' }
          ] },
        // 04-5 · living with the sea (ch03-shore: 684.25–685.8 s of F2 at 50 %)
        { type: 'spread', media: video('assets/video/ch03-shore.mp4', 'assets/img/ch03-shore-poster.jpg', 'Haenyeo resting together on the volcanic rocks', 'F2'), side: 'left',
          heading: 'Living with the sea',
          lead: 'They do not try to conquer nature. They try to understand it, adapt to it, and live alongside it.', leadRef: 'T3',
          body: [
            'Before they dive, they pray for their safety and for the sea’s bounty.',
            'At the bulteok, the stone shelter by the shore, they share what they know about the sea.'
          ], bodyRef: 'T5 T1' },
        // 04-6 · only what is enough (ch04-conch: 496–500.2 s of F2)
        { type: 'text', heading: 'Only what is enough',
          lead: 'Working together, the haenyeo see overfishing as one of the greatest threats to the sea. So they take only what they truly need.', ref: 'T2',
          body: [
            '“You have enough money to feed your family and to help your community. That is enough.”',
            '<span class="cite">Kimi Werner, freediver, in <i>Vogue Taiwan</i> (Chan &amp; Ku 2020), translated from Chinese</span>',
            'Elsewhere, the old ways of catching food by hand are giving way to machines built for the greatest profit. Werner calls it a great loss: of a valuable culture, and of the health of the planet.'
          ], bodyRef: 'T2',
          media: video('assets/video/ch04-conch.mp4', 'assets/img/ch04-conch-poster.jpg', 'Gloved hands picking horned conch from the volcanic rocks', 'F2'), duck: 0.5 },
        // 04-7 · statement (Meilin)
        { type: 'text',
          lead: 'As the ocean deteriorates, their simple wisdom, to take only what is enough and to give thanks, becomes a silent critique of modern consumerism.' },

        // ── B · seen by the world ──
        // 04-8 · ch04-rocks: 486–492.5 s of F2, haenyeo on the rocks with Jeju city behind
        { type: 'scene', heading: 'Seen by the world',
          lead: 'As these values became visible, the wider world began to look, and to recognise them.',
          body: [
            'Haenyeo have been called some of the first working women in Korea: they broke social norms and became the breadwinners of their families.',
            'On 30 November 2016, the Culture of Jeju Haenyeo was inscribed on UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity.'
          ], bodyRef: 'T2 T1 T3',
          media: video('assets/video/ch04-rocks.mp4', 'assets/img/ch04-rocks-poster.jpg', 'Two haenyeo working on the rocks, the city of Jeju behind them', 'F2') },
        // 04-9 · closing (ch04-faces: 714.4–716.8 s of F2 at 60 %)
        { type: 'film', media: video('assets/video/ch04-faces.mp4', 'assets/img/ch04-faces-poster.jpg', 'Two haenyeo laughing together on the boat', 'F2'),
          line: '“It matters not only to tell these women’s stories, but to respect this way of living from the sea, and in peace with it.”', lineRef: 'T2', align: 'left',
          cite: 'Kimi Werner, freediver, in <i>Vogue Taiwan</i> (Chan &amp; Ku 2020), translated from Chinese' }
      ]
    },

    {
      id: 'risk', num: '05',
      title: 'A Culture <i>at</i> Risk',
      short: 'A Culture at Risk',
      kr: '', krGloss: '',
      mood: 'regret',
      theme: { bg: '#141516', fg: '#C9CACA', muted: '#777B7D', accent: '#A9ACAD' },
      tone: 'mono', sound: 'quiet', volume: 0.35,
      modules: [
        // 05-1 · 05-1.png (Meilin): haenyeo walking away from the camera, black and white
        // TODO: sources of 05-1.png, 05-4-1.png, 05-4-2.jpg, 05-5.jpg, 05-6.png, 05-7.mp4, 05-8.jpg
        { type: 'opener', media: img('assets/img/ch05-open.jpg', 'Black-and-white photo of five haenyeo walking away down a dirt track, floats on their backs', ''),
          subtitle: 'Visible, but still vulnerable.' },
        // 05-2 · the "However" turn (Meilin)
        { type: 'text',
          lead: 'However, being seen is not the same as being able to go on.',
          body: ['UNESCO has inscribed their culture. Jeju puts them in its tourism promotions. Films and visitors come to watch them work. Yet fewer women are diving every year.'],
          bodyRef: 'T1 T5 T3' },
        // ── A · the decline ──
        // 05-3 · T3: about 4,500 working in 2015 → about 2,839 registered at the end of 2023
        { type: 'decline', from: 4500, to: 2839, perDot: 10, cols: 30,
          heading: 'Fewer every year',
          fromLabel: 'haenyeo still working on Jeju in 2015',
          toLabel: 'registered haenyeo at the end of 2023, nearly 12% fewer than the year before',
          caption: 'Each dot is 10 divers.', ref: 'T3' },
        // 05-4 · two photos: then (05-4-1) and now (05-4-2)
        { type: 'spread', side: 'left',
          media: img('assets/img/ch05-shallows.jpg', 'Old black-and-white photo of many women wading across the rocks in shallow water', ''),
          media2: img('assets/img/ch05-elders.jpg', 'Four elderly haenyeo in wetsuits sitting on a sea wall', ''),
          heading: 'Diving into old age',
          lead: 'They learn as girls in the shallows and keep diving for the rest of their lives.', leadRef: 'T3',
          body: ['Today six in ten are over 70, and some still dive in their eighties.'], bodyRef: 'T3 T1' },
        // 05-5 · what the body pays
        { type: 'spread', side: 'right',
          media: img('assets/img/ch05-body.jpg', 'A haenyeo wading out of the sea, bent under her net and tewak', ''),
          heading: 'What the body pays',
          lead: 'Years of diving bring a good catch, and the illnesses of the trade: dulled hearing, arthritis, chronic headaches, brittle bones.', leadRef: 'T3' },
        // ── B · the contradiction ──
        // 05-6 · film still (05-6.png): a family at the kitchen table; shown whole, under the text
        { type: 'text', heading: 'So that their daughters could choose',
          lead: 'They do not want their daughters to inherit such hard and dangerous work. In a few decades, the haenyeo may be gone.', ref: 'T3',
          body: ['They worked so their children could have more choices. Many of those children chose other lives. The decline is not a failure, and not a lack of respect for tradition. It is, in part, what their love made possible.'],
          media: img('assets/img/ch05-home.jpg', 'A younger woman, an older haenyeo and a friend talking at a kitchen table', ''), figure: 'wide', duck: 0.5 },
        // 05-7 · 05-7.mp4 (Meilin): fish over the kelp, then a haenyeo on the seabed; shown uncropped
        { type: 'scene', fit: 'contain', heading: 'A sea that gives less',
          lead: 'The sea is changing too.',
          body: ['Warmer water means less sea life, and poachers dive at night without licences, taking far more than is allowed.'], bodyRef: 'T4',
          media: video('assets/video/ch05-sea.mp4', 'assets/img/ch05-sea-poster.jpg', 'Fish above the kelp, then a haenyeo on the seabed with her net', '') },
        // 05-8 · closing (Meilin)
        { type: 'film', media: img('assets/img/ch05-end.jpg', 'Haenyeo walking out across the rocks at sunset, in silhouette', ''),
          line: 'Even as the world begins to see them, this culture may slowly slip away.', align: 'center' }
      ]
    },

    {
      id: 'continuation', num: '06',
      title: 'Different <i>Continuation</i>',
      short: 'Different Continuation',
      kr: '다시', krGloss: 'dasi · again',
      mood: 'acceptance',
      theme: { bg: '#0D3B4A', fg: '#F5F1EA', muted: '#A9C3C4', accent: '#E0703F' },
      tone: 'colour', sound: 'waves', volume: 0.55,
      modules: [
        { type: 'opener', media: video(), subtitle: 'New choices, new pathways.' },
        { type: 'portrait', media: img(PH.portrait),
          quote: '[Add a quote from a new-generation haenyeo]',
          cite: '[Source]' },
        { type: 'spread', media: img(PH.landscape), side: 'right',
          heading: 'A new generation',
          lead: 'Younger apprentices are learning from senior divers.',
          body: ['Some come from other careers and other cities. They wear modern wetsuits, share their dives on social media and sell their catch online.', 'The work looks different. The breath is the same.'],
          caption: 'Placeholder · apprentice and senior diver' },
        { type: 'film', media: video(), line: 'The sea is still here. So is the breath.', align: 'center', cue: 'sumbisori' }
      ]
    }
  ],

  /* ---------------- ENDING ---------------- */
  ending: {
    kr: '제주 해녀',
    statement: 'Their future is not ours to decide. But what they carry — knowledge, strength, community and respect for the sea — can travel with us.',
    loopLabel: 'Return to the surface',
    theme: { bg: '#111315', fg: '#E6E5E1', muted: '#8A8E90', accent: '#D8653B' },
    sound: 'waves', volume: 0.3,
    credits: [
      ['Design & development', 'Meilin Chen · s4151128'],
      ['Course', 'COMM2595 Digital Narrative Theory and Practice · RMIT University · 2026'],
      ['Media', 'Documentary footage reworked from the films listed below (F1–F4); photographs as credited (P1–P4); the sumbisori sound is cut from F2'],
      ['AI use', 'Code and planning assisted by Claude (Anthropic)']
    ]

  }
};
