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
     decline   F  pinned dot field: 23,000 → 3,500

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
/* video(src, poster, alt, credit) — muted, looping, autoplays when on screen */
const video = (src = PH.video, poster = PH.poster, alt = '', credit = '') =>
  ({ type: 'video', src, poster, alt, credit });
/* img(src, alt, credit) */
const img = (src = PH.wide, alt = '', credit = '') =>
  ({ type: 'image', src, alt, credit });

/* ---------- sounds: key → file ---------- */
const SOUNDS = {
  waves:       'assets/audio/waves.mp3',        // PLACEHOLDER — replace with real sea ambience
  underwater:  'assets/audio/underwater.mp3',   // PLACEHOLDER
  warm:        'assets/audio/warm-drone.mp3',   // PLACEHOLDER — voices / intimate sound
  music:       'assets/audio/music.mp3',        // PLACEHOLDER — documentary score
  quiet:       'assets/audio/near-silence.mp3', // PLACEHOLDER — thin wind
  sumbisori:   'assets/audio/sumbisori.mp3'     // PLACEHOLDER — one-shot breath whistle
};

window.SITE = {
  sounds: SOUNDS,

  /* ---------------- LANDING ---------------- */
  landing: {
    media: video(),
    eyebrow: 'An interactive documentary',
    title: 'Jeju Haenyeo',
    kr: '제주 해녀',
    subtitle: 'The women who dive the sea of Jeju',
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
        { type: 'opener', media: video(), subtitle: 'Before you see them, you hear them.' },
        { type: 'film', media: video(), line: 'A float bobs on the water. Then, a sharp whistle.', align: 'left', cue: 'sumbisori' },
        { type: 'text',
          heading: 'Sumbisori',
          lead: 'When a haenyeo surfaces after a dive, she lets out the air she has held in one long, high whistle.',
          body: [
            'The sound is called <i>sumbisori</i> (숨비소리), “the sound of breath”. It empties the lungs quickly so she can breathe again, and dive again.',
            'For generations along Jeju’s coast, this sound has marked the work of women who harvest the sea without oxygen tanks.'
          ] },
        { type: 'film', media: img(PH.wide), line: 'Who are the women behind the breath?', align: 'center' }
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
        { type: 'opener', media: video(), subtitle: 'Work, knowledge and the cost of every dive.' },
        { type: 'depth', media: video(), maxDepth: 30,
          stops: [
            { depth: 0,  text: 'The surface. An orange float, the <i>tewak</i> (테왁), marks where she went down.' },
            { depth: 5,  text: 'Light fades. Sound disappears.' },
            { depth: 10, text: 'Around 10 metres: the typical working depth.' },
            { depth: 20, text: 'Up to three minutes on a single breath.' },
            { depth: 30, text: 'Some divers are reported to reach 30 metres.' }
          ] },
        { type: 'facts', heading: 'One working day',
          items: [
            { value: '≈10', unit: 'm', label: 'typical depth' },
            { value: '3', unit: 'min', label: 'up to one breath' },
            { value: '7', unit: 'hrs', label: 'up to one workday' }
          ],
          rhythm: ['Descend', 'Hold', 'Harvest', 'Surface'] },
        { type: 'spread', media: img(PH.portrait), side: 'right',
          heading: 'What she carries',
          lead: 'A wetsuit, a mask, fins, a net, and the orange tewak.',
          body: [
            'Everything else is knowledge: where the currents turn, which rocks hide abalone, when it is time to come up.',
            'The risks are real. Cold, exhaustion, strong currents, fishing nets and passing boats. Each dive is measured against her own breath.'
          ],
          caption: 'Placeholder · diver with tewak and net' }
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
        { type: 'opener', media: img(PH.wide), subtitle: 'Family, motherhood, independence and pride.' },
        { type: 'horizontal', panels: [
          { kind: 'spread', media: img(PH.portrait), heading: 'For the family',
            body: ['For many women on Jeju, the sea paid for food, school fees and a future for their children.', 'Diving was a way to carry a household.'] },
          { kind: 'portrait', media: img(PH.portrait),
            quote: 'I can earn money and I can have freedom. Wherever I go, I will proudly tell people that I am a haenyeo.',
            cite: 'A haenyeo, interviewed by Vogue Taiwan (Chan & Ku 2020)' },
          { kind: 'spread', media: img(PH.square), heading: 'Her own income',
            body: ['Haenyeo earned their own money, and with it a rare kind of independence.', 'The sea gave them a place in the family economy that was theirs.'] },
          { kind: 'image', media: img(PH.wide), caption: 'Mothers taught daughters. What passed on was not only the work, but a kind of freedom.' }
        ] }
      ]
    },

    {
      id: 'beauty', num: '04',
      title: 'The Beauty <i>of</i> Haenyeo',
      short: 'The Beauty of Haenyeo',
      kr: '불턱', krGloss: 'bulteok · the divers’ stone shelter',
      mood: 'admiration',
      theme: { bg: '#EEF3F1', fg: '#15302F', muted: '#5E7875', accent: '#3F7E77' },
      tone: 'colour', sound: 'music', volume: 0.5,
      modules: [
        { type: 'opener', media: video(), subtitle: 'Dignity, community and a life shaped by the sea.' },
        { type: 'spread', media: img(PH.landscape), side: 'left',
          heading: 'The bulteok',
          lead: 'A ring of volcanic stone by the shore, where divers change, rest and warm themselves by the fire.',
          body: ['Here they share knowledge, agree on rules and decide together when and where to dive.', 'They watch over one another. Safety comes before the size of the catch.'],
          caption: 'Placeholder · the bulteok' },
        { type: 'facts', heading: 'Status comes from skill',
          items: [
            { value: '하군', label: 'Hagun · novice' },
            { value: '중군', label: 'Junggun · experienced' },
            { value: '상군', label: 'Sanggun · senior guide' }
          ] },
        { type: 'strip', heading: 'A year in the sea',
          items: [
            { media: img(PH.landscape), title: 'March – May', caption: 'Sea urchins' },
            { media: img(PH.square), title: 'Summer', caption: 'Seaweed' },
            { media: img(PH.landscape), title: 'October', caption: 'Conches' },
            { media: img(PH.portrait), title: '영등굿', caption: 'Yeongdeunggut · prayers for safety and a good harvest' },
            { media: img(PH.landscape), title: 'Taking only what the sea can give', caption: 'Seasons, rest periods and shared rules protect the sea' }
          ] },
        { type: 'film', media: video(), line: 'In 2016, UNESCO recognised the culture of Jeju haenyeo as Intangible Cultural Heritage.', align: 'left' }
      ]
    },

    {
      id: 'risk', num: '05',
      title: 'A Culture <i>at</i> Risk',
      short: 'A Culture at Risk',
      kr: '할망', krGloss: 'halmang · grandmother, in Jeju dialect',
      mood: 'regret',
      theme: { bg: '#141516', fg: '#C9CACA', muted: '#777B7D', accent: '#A9ACAD' },
      tone: 'mono', sound: 'quiet', volume: 0.35,
      modules: [
        { type: 'opener', media: img(PH.wide), subtitle: 'Visible, but still vulnerable.' },
        { type: 'decline', from: 23000, to: 3500, perDot: 100,
          fromLabel: 'haenyeo at the historical peak',
          toLabel: 'registered haenyeo in 2021',
          caption: 'Each dot is 100 divers.' },
        { type: 'facts', heading: 'A changing sea',
          items: [
            { value: '<100', label: 'divers under the age of 50 (2021)' },
            { value: '3×', label: 'faster warming than the global trend' },
            { value: '+2', unit: '°C', label: 'sea temperature, past 80 years' }
          ] },
        { type: 'text',
          lead: 'Kelp forests are thinning. Coral is moving in. The sea they know is changing.',
          body: ['Recognition brought visitors, festivals and documentaries. It has not brought back the divers.'] },
        { type: 'film', media: img(PH.wide), line: 'Recognition cannot guarantee continuation.', align: 'center' }
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
      ['Media', 'Documentary footage, photography and sound credits to be added'],
      ['AI use', 'Code and planning assisted by Claude (Anthropic)']
    ],
    references: [
      'Chan E & Ku D (2020) World Oceans Day / Interview with a Korean Haenyeo (female diver), Vogue Taiwan.',
      'Gormley N (2020) Lessons from Jeju | Freediving and Motherhood with Kimi Werner, YouTube.',
      'Gu X (2026) What are Haenyeo (female divers)?, Marie Claire.',
      'Henderson E (2024) A new generation of Haenyeo, Erin Henderson.',
      'Stevens L (2025) Encounters with Haenyeo, Monash University Arts News and Blog.',
      'UNESCO (2016) Culture of Jeju Haenyeo (women divers), ich.unesco.org.'
    ]
  }
};
