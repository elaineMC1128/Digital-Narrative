/* =====================================================================
   JEJU HAENYEO — CONTENT FILE
   ---------------------------------------------------------------------
   This is the main file you edit. It holds every chapter's text, media,
   colours and sound. The animation code (main.js) reads from here.

   HOW TO…
   • Change text ............ edit the strings below. Use <i>…</i> for italic,
                              <br> for a line break.
   • Replace a photo/video .. put your file in assets/img or assets/video,
                              then change the path, e.g.
                              img('assets/img/bulteok.jpg', 'Divers at the bulteok')
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
     scene        full-screen footage with a text block on the left
     dive         02: one pinned screen, footage changes underneath (depth gauge, numbers)
     gallery      02-5: slanted page, photos pass under the text
     decline   F  pinned dot field: 4,500 → 2,839

   ALL TEXT BELOW IS DRAFT COPY based on the A2 research — rewrite freely.
   ===================================================================== */

/* ---------- media helpers (keep these) ---------- */
/* video(src, poster, alt, ref) — muted, looping, autoplays when on screen.
   ref = reference code shown on the media (e.g. 'F2'); it links to the
   matching entry in REFERENCES below. Leave '' if the source is not known yet. */
const video = (src, poster, alt = '', ref = '') =>
  ({ type: 'video', src, poster, alt, ref });
/* img(src, alt, ref) */
const img = (src, alt = '', ref = '') =>
  ({ type: 'image', src, alt, ref });

/* ---------- sounds: key → file ---------- */
const SOUNDS = {
  waves:       'assets/audio/waves.mp3',        // original bed: landing, 01, ending
  underwater:  'assets/audio/underwater.mp3',   // original bed: 02-1
  warm:        'assets/audio/warm-drone.mp3',   // original bed: 03 (a little louder since 14 Oct)
  plunge:      'assets/audio/plunge.mp3',       // 02-1.wav (Meilin) from 2.3 s: only the moment 02-1 turns into 02-2
  deep:        'assets/audio/deep.mp3',         // under water.mp3 (Meilin), 60–120 s: from 02-2 to the end of 02
  pad04:       'assets/audio/pad04.mp3',        // the light cine pad (samuelfjohanns), looped: 04 background and 05, kept low
  voices04:    'assets/audio/voices04.mp3',     // 04.wav (Meilin), 0–96 s: played once from 04-3, fading out at the end
  tail04:      'assets/audio/music04-tail.mp3', // 04.wav 72–98 s, looped: its music carries on to the end of 04, fading out early in 05
  drift:       'assets/audio/drift.mp3',        // 05.wav (Meilin), 0–53 s: 06 and on through the ending, one continuous bed
  sumbisori:   'assets/audio/sumbisori.mp3'     // REAL — cut from F2 (Lessons from Jeju), 0–3.6 s; plays on the loop back to the surface
};

/* ---------- references: one entry per source (RMIT Harvard) ----------
   Codes: F = film/video · P = photo/illustration · S = sound · T = text/data.
   Every media item or text that uses a source carries its code; the
   reference list at the end of the site is built from this list and shows
   where each source is used. [Square brackets] = still to fill in. */
const REFERENCES = {
  F1: 'Patagonia ([year]) <i>Daughter of the Sea: Sisterhood in the Sea</i> [video], Patagonia Films, YouTube, accessed [date]. https://youtu.be/5nNXdzvex08',
  F2: 'Gormley N (2020) <i>Lessons from Jeju | Freediving and Motherhood with Kimi Werner</i> [video], Patagonia, YouTube, accessed [date]. https://youtu.be/r4jLplyxXqI',
  F3: 'ABC News (Australia) (2021) <i>Follow Korea’s oldest free divers on their underwater treasure hunt | ABC News</i> [video], YouTube, 21 November, accessed 24 October 2026. https://youtu.be/uAAaSUgqvB8',
  F4: 'Apple TV (2024) <i>The Last of the Sea Women — Official Trailer | Apple TV</i> [video], YouTube, 5 September, accessed 24 October 2026. https://youtu.be/VHMngOUUYvc',
  F5: 'Korea Foundation (한국국제교류재단_KF) (2021) <i>[ASMR] 2021 Sound Healing with Korea – Listen to Jeju | 5. Sumbisori of Jeju Haenyeo</i> [video], YouTube, accessed 23 October 2026. https://youtu.be/y1c3IKkmpTA',
  P1: 'Park M (2018) <i>The Haenyo of Jeju</i> [photograph], SOOK, accessed 12 October 2026. https://minapark.com/journal/2018/8/20/jeju-island-haenyo',
  P2: 'Haenyeo Museum (2012) <i>Culture of Jeju Haenyeo (women divers)</i> [photograph], UNESCO Intangible Cultural Heritage, accessed 12 October 2026. https://ich.unesco.org/en/RL/culture-of-jeju-haenyeo-women-divers-01068',
  P3: 'Haenyeo Museum (2012) <i>Jeju Haenyeo</i> [photograph], Jeju Provincial Self-governing Haenyeo Museum, Google Arts &amp; Culture, accessed 12 October 2026. https://artsandculture.google.com/asset/jeju-haenyeo/rwFN3rDE0zQ7Yg',
  P4: 'Seo JC (1976) <i>Bitchang of abalone harvested</i> [photograph], Jeju Provincial Self-governing Haenyeo Museum, Google Arts &amp; Culture, accessed 12 October 2026. https://artsandculture.google.com/asset/bitchang-of-abalone-harvested/-wGdylyTN5H-dQ',
  P5: 'The West Australian (n.d.) [Haenyeo fins, net and tewak] [photograph], <i>The West Australian</i>, accessed 23 October 2026. https://images.thewest.com.au/publication/C-16434235/2f42debefd20ba96df35389731ca6734613ec659.jpg',
  P6: 'Kim HS (n.d.) [Haenyeo portrait] [photograph], in Billing L (2015) Meet the badass, eco-feminist free divers of South Korea, <i>BuzzFeed</i>, 26 May, accessed 23 October 2026. https://www.buzzfeed.com/lynzybilling/meet-the-badass-eco-feminist-free-divers-of-south-korea',
  P7: 'Unknown photographer (n.d.) [Young haenyeo in the shallows] [photograph], accessed 23 October 2026 [original page to be confirmed].',
  P8: 'Seo JC (1968) <i>The gotmuljil</i> [photograph], Jeju Provincial Self-governing Haenyeo Museum, Google Arts &amp; Culture, accessed 23 October 2026. https://artsandculture.google.com/asset/the-gotmuljil-seo-jae-chul/kAG7Ym6-8VcPBA',
  T1: 'UNESCO (2016) <i>Culture of Jeju Haenyeo (women divers)</i>, ich.unesco.org, accessed 6 September 2026. https://ich.unesco.org/en/RL/culture-of-jeju-haenyeo-women-divers-01068',
  T2: 'Chan E and Ku D (2020) <i>World Oceans Day / Interview with a Korean Haenyeo (female diver)</i>, Vogue Taiwan, accessed 6 September 2026. https://www.vogue.com.tw/lifestyle/article/korea-haenyeo-world-ocean-day',
  T3: 'Gu X (ed.) (2026) <i>What are haenyeo? Udo, haenyeo culture and a mother’s love beneath the sea</i> [in Chinese], text by Ji-Sun Kim, photographs by Joon Choi, Marie Claire Taiwan, accessed 13 October 2026. https://www.marieclaire.com.tw/lifestyle/issue/20532',
  T4: 'Henderson E (2024) <i>A new generation of Haenyeo</i>, Erin Henderson, accessed 6 September 2026. https://www.erinhendersonmedia.com/blog/a-new-generation-of-haenyeo',
  T5: 'Stevens L (2025) <i>Encounters with Haenyeo</i>, Monash University Arts News and Blog, accessed 31 August 2026. https://www.monash.edu/arts/monash-indigenous-studies/global-encounters-and-first-nations-peoples/news-and-blog/encounters-with-haenyeo',
  T6: 'Krüger L (2023) ‘There is no mercy!’: the young women swapping South Korea’s work culture for freediving, <i>The Guardian</i>, 20 June, accessed 13 October 2026. https://www.theguardian.com/environment/2023/jun/20/there-is-no-mercy-the-young-women-swapping-south-koreas-work-culture-for-freediving',
  T7: 'Jeju Provincial Self-governing Haenyeo Museum (n.d.) <i>Haenyeo</i>, Google Arts &amp; Culture, accessed 22 October 2026. https://artsandculture.google.com/story/zgVhw3W370wfIQ',
  T8: 'Koo B (2026) Jeju’s underwater forests vanish as seaweed output plunges 97% in 15 years, <i>The Herald Business</i>, 8 October, accessed 24 October 2026. https://mbiz.heraldcorp.com/article/10897144',
  T9: 'Choi J (2025) Two haenyeo in their 70s found near Busan beach declared dead, <i>The Korea Herald</i>, 24 August, accessed 24 October 2026. https://www.koreaherald.com/article/10560423',
  T10: 'Clarke C (2021) Come on an underwater treasure hunt with Korea’s haenyeo — the women of the sea, <i>ABC News</i>, 21 November, accessed 24 October 2026. https://www.abc.net.au/news/2021-11-21/come-on-an-underwater-treasure-hunt-with-korean-haenyeo/100597018'
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
    subtitle: 'Women who dive to the seabed on a single breath, with no oxygen tanks.',   // copy audit 23 Oct; was 'To dive into the deep, or to become part of the sea.'
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
      kr: '숨비소리', krGloss: 'sumbisori',
      mood: 'curious',
      theme: { bg: '#0B2A35', fg: '#F2EFE9', muted: '#9DB3B8', accent: '#D8653B' },
      tone: 'colour', sound: 'waves', volume: 0.6,
      modules: [
        // 01-1 · Sumbisori.mp4 (Lessons from Jeju) 0–7.6 s: a diver beside her tewak, then a close-up as she breathes (was 01-2; moved here 14 Oct)
        { type: 'opener', media: video('assets/video/ch01-float.mp4', 'assets/img/ch01-float-poster.jpg', 'A haenyeo surfacing beside her orange tewak float', 'F2'),
          subtitle: 'Before you see them, you hear them.' },
        // 01-2 · 01-2.mp4 (Meilin, 14 Oct): floats on a choppy sea, divers surfacing among them.
        // Plays with its own sound (sea + two real sumbisori whistles, levelled and faded at the loop);
        // the chapter ambience dips while it plays, so the two blend. voice = its volume.
        { type: 'film', media: video('assets/video/ch01-breath.mp4', 'assets/img/ch01-breath-poster.jpg', 'Orange floats on a choppy sea as haenyeo surface among them, Jeju city on the horizon', ''),
          line: 'If you have been to Jeju, South Korea’s largest island, you have probably already heard them breathe. From far away, it sounds like a whistle.',   // 23 Oct (Meilin); was 'A float bobs on the water. Then, a sharp whistle.'
          align: 'left', lineWidth: '34ch', lineSize: 'clamp(24px, 2.6vw, 42px)', voice: 0.8, voiceDip: 0.4 },
        { type: 'text',
          heading: 'Sumbisori',
          lead: 'When a haenyeo surfaces after a dive, she lets out the air she has held in one long, high whistle.',
          body: [
            'The sound is called <i>sumbisori</i> (숨비소리), “the sound of breath”. It empties the lungs quickly so she can breathe again, and dive again.',
            'For generations along Jeju’s coast, this sound has marked the work of women who harvest the sea without oxygen tanks.'
          ],
          ref: 'T1',
          // 01-3 · 10月9日.mp4 (Meilin, 22 Oct): her own words about the first breath. Only the black subtitle band
          // is cut off (picture uncropped); the subtitles are laid over the footage on the site (captions, in seconds).
          // The video sits against the left edge, the text overlaps its right side over a gradient.
          // Plays once with its own sound and rests on its last shot, the floats on the open sea, where 01-4 picks up.
          media: video('assets/video/ch01-sumbisori.mp4', 'assets/img/ch01-sumbisori-poster.jpg', 'Haenyeo prepare on the rocks, drop their nets into the sea and surface; one breathes out at the surface', 'F1'),
          figure: 'split', voice: 0.8, voiceDip: 0.4, voiceFade: 500,
          captions: [
            [0.4, 1.5, 'When we go into the sea,'],
            [2.0, 4.1, 'the first thing we do is'],
            [8.8, 10.3, 'take a deep breath.'],
            [10.3, 11.7, 'That sound is called sumbisori'],
            [11.7, 13.8, 'and it sounds like a whistle.']
          ],
          duck: 0.5 },
        // 2.mp4 (F1, Daughter of the Sea) 4.5–14 s
        { type: 'film', media: video('assets/video/ch01-group.mp4', 'assets/img/ch01-group-poster.jpg', 'Several haenyeo and their orange floats spread across a glittering sea', 'F1'),
          line: 'Who is the woman behind the breath?', align: 'center' }   // copy audit 23 Oct  // only the sea ambience here (Meilin, 11 Oct)
      ]
    },

    {
      id: 'closer', num: '02',
      title: 'Getting <i>Closer</i>',
      short: 'Getting Closer',
      kr: '물질', krGloss: 'muljil · the work of diving',
      mood: 'impressed',
      theme: { bg: '#061A21', fg: '#E6E5E1', muted: '#7F9AA0', accent: '#D8653B' },
      /* 23 Oct (Meilin): 02 follows one haenyeo through a working day:
         setting out → into the water → down → harvest → back up. Each stage is one pinned screen;
         what used to be separate blocks (gear, training, data, knowledge, risks) now sits inside the stage it belongs to.
         journey = the stage names shown along the bottom of the screen while the journey runs. */
      journey: ['Setting out', 'Into the water', 'Down', 'Harvest', 'Back up'],
      /* sound: the sea from 01 carries on under the opener; each stage plays its own footage sound
         (the bed drops away beneath it); the plunge + under-water bed stay with the dive */
      tone: 'colour', sound: 'waves', volume: 0.5,
      modules: [
        // 02-depart.mp4 14.3–18.9 s (F5): the breakwater and the harbour, before they set out
        { type: 'opener', media: video('assets/video/ch02-open.mp4', 'assets/img/ch02-open-poster.jpg', 'A breakwater and small fishing boats on a grey morning sea', 'F5'),
          subtitle: 'Follow her.' },
        // stage 1 · Setting out: 02-depart.mp4 (F5), its own sound; the gear photos pass right to left
        { type: 'stage', step: 0, dim: 0.5,
          clips: [ { media: video('assets/video/ch02-depart.mp4', 'assets/img/ch02-depart-poster.jpg', 'Haenyeo ride to the shore on a small cart loaded with orange tewak, then walk down with their nets and fins', 'F5'), voice: 0.55 } ],
          images: [
            img('assets/img/ch02-tools.jpg', 'Yellow fins, a green net and an orange tewak on the rocks', 'P5'),   // 02-tool.jpg
            img('assets/img/ch02-suit.jpg', 'An older haenyeo in full gear: mask, wetsuit, net, fins and a long hooked pole', 'P6'),   // 02-2.jpg · Hyung S. Kim, via BuzzFeed
            img('assets/img/ch02-gear.jpg', 'A haenyeo’s wetsuit, hood, socks, weight belt and fins laid out in a museum display', '')   // work.jpg (Meilin, 14 Oct)
          ],
          texts: [
            { lead: 'Her tools are simple: a wetsuit, mask and fins, a net, the orange <i>tewak</i>, and a <i>bitchang</i> to prise abalone off the rock.', ref: 'T5 T7' },
            { lead: 'At about eight in the morning, the women go into the sea together.', ref: 'T10' }   // ABC (24 Oct)
          ] },
        // stage 2 · Into the water: 02-下水.mp4 (F5), its own sound; two archive photos of girls learning in the shallows
        { type: 'stage', step: 1, dim: 0.5,
          clips: [ { media: video('assets/video/ch02-entry.mp4', 'assets/img/ch02-entry-poster.jpg', 'From above, the sea breaks on black rocks; a haenyeo swims out to her tewak and dives, fins last', 'F5'), voice: 0.55 } ],
          images: [
            img('assets/img/ch02-girls.jpg', 'Archive photograph: young haenyeo standing in the shallows with nets and gourd floats', 'P7'),   // 02-5-1.png
            img('assets/img/ch02-shore.jpg', 'Archive photograph: a group of haenyeo walking out across the rocks at low tide', 'P8')   // 02-5-2.png
          ],
          texts: [
            { heading: 'Muljil', lead: 'The skill of diving, <i>muljil</i>, takes years of training to learn.', ref: 'T7' },
            { lead: 'Girls on the coast began swimming and diving in shallow water at about eight. By fifteen they were “baby haenyeo”.', ref: 'T7' }
          ] },
        // stage 3 · Down: the depth gauge and the numbers (unchanged), one pinned screen
        // sound: the plunge (02-1.wav) sounds only while this screen rises; once it fills the screen the under-water bed starts
        { type: 'dive', maxDepth: 30, step: 2,
          ambience: { key: 'deep', vol: 0.55, cue: 'plunge', cueVol: 0.9 },
          scenes: [
            // 2-2.mp4 0–18.6 s (F1): seen from below, a diver descends away from the sunlit surface
            { media: video('assets/video/ch02-descent.mp4', 'assets/img/ch02-descent-poster.jpg', 'Seen from below, a diver descends away from the sunlit surface', 'F1'),
              stops: [
                { depth: 0,  text: 'The surface. An orange float, the <i>tewak</i> (테왁), marks where she went down.' },
                { depth: 5,  text: 'Most dives last about a minute.', ref: 'T1' },
                { depth: 10, text: 'Around 10 metres: the typical working depth.', ref: 'T1' },
                { depth: 20, text: 'Up to three minutes on a single breath.', ref: 'F3 T10' },
                { depth: 30, text: 'Some divers are reported to reach 30 metres.', ref: 'F3 T10' }
              ] },
            // 2-3.mp4 55–66.6 s (F1): two divers picking among the kelp (darkened behind the numbers)
            { media: video('assets/video/ch02-pick.mp4', 'assets/img/ch02-pick-poster.jpg', 'Two haenyeo picking among the kelp on the seabed', 'F1'), dim: 0.55,
              facts: { heading: 'One working day',
                items: [
                  { value: '≈10', unit: 'm', label: 'typical depth', ref: 'T1' },
                  { value: '3', unit: 'min', label: 'up to one breath', ref: 'F3' },
                  { value: '7', unit: 'hrs', label: 'up to one workday', ref: 'T1' },
                  { value: '90', unit: 'days', label: 'at sea each year', ref: 'T1' }
                ] } }   // the Descend · Hold · Harvest · Surface row is gone: the journey bar now does that job (23 Oct)
          ] },
        // stage 4 · Harvest: 02-harvest.mp4 (F5) with its own sound, then harvest.mp4 (F2) with 02-underwater.wav
        { type: 'stage', step: 3, dim: 0.3, bed: { key: 'deep', vol: 0.55 },
          clips: [
            { media: video('assets/video/ch02-search.mp4', 'assets/img/ch02-search-poster.jpg', 'A diver kicks down into golden kelp and reaches into a rock covered in weed', 'F5'), voice: 0.55 },
            { media: video('assets/video/ch02-harvest.mp4', 'assets/img/ch02-harvest-poster.jpg', 'A haenyeo searching the rocky seabed among the kelp', 'F2'), voice: 0.55 }   // sound: 02-underwater.wav (Meilin)
          ],
          texts: [
            { lead: 'She searches the rocks for abalone and sea urchins.', ref: 'T1', clip: 0 },
            { heading: 'Reading the sea', lead: 'She knows the shape of the seabed, the turn of the tides and where each creature lives.', ref: 'T7', clip: 1 },
            { body: [
                'She times her harvest to the seasons: sea urchins from March to May, seaweed mostly in summer, conch by October. The best time to gather agar-agar changes from year to year, and no one takes abalone or conch while they spawn.',
                'This knowledge is passed down from older divers to younger ones.'
              ], bodyRef: 'T1 T7 T10', clip: 1 }
          ] },
        // stage 5 · Back up: narrative-media/02-up.mp4 (F5, 38 s): rising, breaking the surface, the net, the catch on shore, her face.
        // Sound (no voices): 0–5.5 s 02-underwater.wav; then 02-downtoup.wav, aligned so she breaks the surface (15.65 s)
        // as the sound does (wav 10.15 s; the sumbisori follows); 24–33 s the clip's own sound (the net and the catch
        // poured out, in sync); then the surface sea from 02-downtoup.wav to the end. Plays once and rests on the last shot.
        { type: 'stage', step: 4, dim: 0.3, bed: { key: 'waves', vol: 0.5 },
          clips: [ { media: video('assets/video/ch02-up.mp4', 'assets/img/ch02-up-poster.jpg', 'A haenyeo swims up and breaks the surface, empties her net, and sits on the shore to catch her breath', 'F5'), voice: 0.5, once: true } ],
          texts: [
            { lead: 'Under water there is no gauge to read. She judges the water pressure, the air left in her lungs and the distance back to the surface herself.', ref: 'T7' },
            { heading: 'The risks', lead: 'The greatest danger is time. If she misjudges how long her breath will last, she can drown.', ref: 'T7' },
            { body: [
                'The water is cold, the tides and swells are strong, and discarded fishing nets and passing boats add to the danger.',
                'The rule is never to dive alone. Working together helps them avoid danger.'
              ], bodyRef: 'T4 T5 T7' }
          ] }
      ]
    },

    {
      id: 'why', num: '03',
      title: 'Why They <i>Enter</i> the Sea',
      short: 'Why They Enter the Sea',
      // kr / krGloss removed (Meilin, 24 Oct)
      mood: 'empathy',
      theme: { bg: '#E8DFCC', fg: '#2B2E31', muted: '#6E675A', accent: '#B4532F' },
      tone: 'colour', sound: 'warm', volume: 0.55,
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
          media: video('assets/video/ch03-scene.mp4', 'assets/img/ch03-scene-poster.jpg', 'Haenyeo mending nets and working on the rocks by the sea', 'F2'),
          voice: 0.42, voiceDip: 0.85 },   // plays its own sound, a little above the sea (Meilin, 14 Oct)
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
          lead: 'Diving also gave haenyeo an income of their own.', ref: 'T5',
          body: [
            'They did not have to depend entirely on a husband, their children or anyone else. Their skill gave them a central place in the family.',
            'The culture of Jeju haenyeo has contributed to the advancement of women’s status in the community.'
          ], bodyRef: 'T1', duck: 0.5 },
        // 614–627.5 s: the haenyeo who says these words, cropped above the film's subtitles
        { type: 'film', media: video('assets/video/ch03-freedom.mp4', 'assets/img/ch03-freedom-poster.jpg', 'Two older haenyeo talking at the table', 'F2'),
          line: '“But now, I can make money and I have freedom.”', align: 'left',
          voice: 0.42, voiceDip: 0.85 },   // her own voice, a little above the sea (Meilin, 14 Oct)
        // 705–707.5 s at 70 %: portrait of a haenyeo on the shore, mask on her forehead
        { type: 'portrait', media: video('assets/video/ch03-proud.mp4', 'assets/img/ch03-proud-poster.jpg', 'Portrait of a haenyeo on the shore, her mask pushed up on her forehead', 'F2'),
          quote: 'Wherever I go, I tell people I’m Haenyeo proudly!',
          cite: 'A haenyeo in <i>Lessons from Jeju</i> (Gormley 2020)' },
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
      tone: 'colour', sound: 'pad04', volume: 0.3,
      modules: [
        // 04-1 · 04-1.mp4 (Meilin's cut from F2): haenyeo on the boat, then a portrait
        { type: 'opener', media: video('assets/video/ch04-open.mp4', 'assets/img/ch04-open-poster.jpg', 'Haenyeo heading out on the boat, then a portrait of one of them', 'F2'),
        },   // copy audit 23 Oct: subtitle removed

        // ── A · their beauty ──
        // 04-3 · 04-3.mp4 (Meilin's cut from F2): a haenyeo surfaces holding up her catch
        // sound: 04.wav starts here and plays once (a little softer than before). At 60 s, where its music
        // begins, the pad fades away; at 92 s the track fades into a loop of its own music (72–98 s),
        // which carries on to the end of 04.
        { type: 'scene', heading: 'What is beautiful?',
          voiceover: { key: 'voices04', vol: 0.75, bedOutAt: 60, tail: 'tail04', tailAt: 91.5 },
          lead: 'Photographer Joon Choi asked a haenyeo what was the most beautiful sight of her sixty years at sea. She thought for a long time, then said: “When I see a pile of shellfish.”', ref: 'T3',
          body: [
            'Her answer was not an abstract idea of beauty, but the plainest picture of a real life.',
            'They may not fit what most people call beautiful. But, as Choi says, they are truly beautiful: their stories and the deep lines on their faces run as deep as their love for their children.'
          ], bodyRef: 'T3',
          media: video('assets/video/ch04-shellfish.mp4', 'assets/img/ch04-shellfish-poster.jpg', 'A haenyeo surfaces and holds up the shellfish she has caught', 'F2') },
        // 04-4 · nine kinds of beauty
        // TODO: sources of 04-4-1.jpg, the .avif portrait, 04-4-5.jpg, 04-4-7.jpg, 7401…jpg and bdcf03…jpg; Haenyo+Truck is assumed to be from the SOOK post (P1)
        { type: 'strip', heading: 'What photographer Joon Choi saw in them',   // copy audit 23 Oct
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
            { media: img('assets/img/ch04-q7-knowledge.jpg', 'Underwater, two haenyeo dive along a rocky reef below the bright surface', ''),
              title: 'Knowledge shaped by experience', caption: 'They know this sea inside out: what is in season, and what is not.', ref: 'T2' },
            { media: img('assets/img/ch04-q8-nature.jpg', 'Aerial view of a single haenyeo diving over a green reef', ''),
              title: 'Respect for nature', caption: '“Catching food by hand underwater teaches you to respect the sea.”', ref: 'T2' },
          ] },
        // 04-5 · living with the sea (pray.mp4, Meilin 14 Oct: from the Apple TV trailer, F4; slowed to 50 %)
        { type: 'spread', media: video('assets/video/ch04-pray.mp4', 'assets/img/ch04-pray-poster.jpg', 'An older haenyeo by the sea, her hands pressed together in prayer', 'F4'), side: 'left',
          heading: 'Living with the sea',
          lead: 'They do not try to conquer nature. They try to understand it, adapt to it, and live alongside it.', leadRef: 'T3',
          body: [
            'Each morning, the group meets at its <i>bulteok</i>, a stone shelter by the shore, to get ready, share what they know about the sea and decide where to dive.',
            'Many pray at the <i>haesindang</i>, a shrine to the sea god, for their safety and for the sea’s bounty.'
          ], bodyRef: 'T5 T1 T10' },   // more specific from ABC (24 Oct)
        // 04-6 · only what is enough (04-6.mp4, Meilin 14 Oct; the black first 0.4 s trimmed)
        { type: 'text', heading: 'Only what is enough',
          lead: 'Working together, the haenyeo see overfishing as one of the greatest threats to the sea. So they take only what they truly need.', ref: 'T2',
          body: [
            '“You have enough money to feed your family and to help your community. That is enough.”',
            '<span class="cite">Kimi Werner, freediver, in <i>Vogue Taiwan</i> (Chan &amp; Ku 2020), translated from Chinese</span>',
            'Elsewhere, the old ways of catching food by hand are giving way to machines built for the greatest profit. Werner calls it a great loss: of a valuable culture, and of the health of the planet.'
          ], bodyRef: 'T2',
          media: video('assets/video/ch04-gather.mp4', 'assets/img/ch04-gather-poster.jpg', 'Underwater, a haenyeo reaches into the weed-covered rocks as bubbles rise around her', ''), duck: 0.5 },

        // ── B · seen by the world ──
        // 04-8 · ch04-rocks: 486–492.5 s of F2, haenyeo on the rocks with Jeju city behind
        { type: 'scene', heading: 'Seen by the world',
          lead: 'Haenyeo have been called some of the first working women in Korea: they broke social norms and became the breadwinners of their families.', ref: 'T2',   // copy audit 23 Oct
          body: [
            'On 30 November 2016, the Culture of Jeju Haenyeo was inscribed on UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity.'
          ], bodyRef: 'T1 T3',
          media: video('assets/video/ch04-rocks.mp4', 'assets/img/ch04-rocks-poster.jpg', 'Two haenyeo working on the rocks, the city of Jeju behind them', 'F2') },
        // 04-9 · closing (ch04-faces: 714.4–716.8 s of F2 at 60 %)
        { type: 'film', media: video('assets/video/ch04-faces.mp4', 'assets/img/ch04-faces-poster.jpg', 'Two haenyeo laughing together on the boat', 'F2'),
          line: '“It matters not only to tell these women’s stories, but to respect this way of living from the sea, and in peace with it.”', lineRef: 'T2', align: 'left',
          cite: 'Kimi Werner, freediver, in <i>Vogue Taiwan</i> (Chan &amp; Ku 2020), translated from Chinese' },
        // 04-2 thesis (Meilin), moved to the end of 04 (23 Oct); back to the site's serif, upright (Meilin, 24 Oct)
        { type: 'text',
          lead: 'The haenyeo are not a heritage label. They carry a philosophy of survival built on living with nature at its limits, and the courage to meet the sea with nothing but the body.' }
      ]
    },

    {
      id: 'risk', num: '05',
      title: 'A Culture <i>at</i> Risk',
      short: 'A Culture at Risk',
      kr: '', krGloss: '',
      mood: 'regret',
      theme: { bg: '#141516', fg: '#C9CACA', muted: '#777B7D', accent: '#A9ACAD' },
      // 23 Oct (Meilin): 05 uses 04's opening music (the light pad), not the brighter tail of 04.wav.
      // soundFade: the tail of 04 carries on into 05 for a while and fades out slowly while the pad rises.
      tone: 'mono', sound: 'pad04', volume: 0.3, soundFade: { out: 10000, in: 6000 },
      modules: [
        // 05-1 · 05-1.png (Meilin): haenyeo walking away from the camera, black and white
        // TODO: sources of 05-1.png, 05-4-1.png, 05-4-2.jpg, 05-5.jpg, 05-6.png, 05-7.mp4, 05-8.jpg
        { type: 'opener', media: img('assets/img/ch05-open.jpg', 'Black-and-white photo of five haenyeo walking away down a dirt track, floats on their backs', ''),
        },   // copy audit 23 Oct: subtitle removed
        // 05-2 · the "However" turn (Meilin)
        { type: 'text',   // copy audit 23 Oct: the 'However…' lead removed, the facts lead
          lead: 'UNESCO has inscribed their culture. Jeju puts them in its tourism promotions. Films and visitors come to watch them work. Yet fewer women are diving every year.',
          ref: 'T1 T5 T3' },
        // ── A · the decline ──
        // 05-3 · from about 23,000 at their peak (T10, ABC 2021) to 2,839 registered at the end of 2023 (T3) (24 Oct; was 4,500 in 2015 → 2,839)
        { type: 'decline', from: 23000, to: 2839, perDot: 50, cols: 40,
          heading: 'Fewer every year',
          fromLabel: 'haenyeo on Jeju at their peak',
          toLabel: 'registered haenyeo at the end of 2023, nearly 12% fewer than the year before',
          caption: 'Each dot is 50 divers.', ref: 'T10 T3' },
        // 05-4 · two photos: then (05-4-1) and now (05-4-2)
        { type: 'spread', side: 'left',
          media: img('assets/img/ch05-shallows.jpg', 'Old black-and-white photo of many women wading across the rocks in shallow water', ''),
          media2: img('assets/img/ch05-elders.jpg', 'Four elderly haenyeo in wetsuits sitting on a sea wall', ''),
          heading: 'Diving into old age',
          lead: 'They learn as girls in the shallows and keep diving for the rest of their lives.', leadRef: 'T3',
          body: ['Today six in ten are over 70, and some still dive in their eighties. In one group of 21 women, the oldest is 91.'], bodyRef: 'T3 T1 T10' },
        // 05-4b · how few are young: fewer than 100 of about 3,500 are under 50 (T10, ABC 2021)
        { type: 'share', heading: 'Under 50', total: 3500, part: 100,
          partLabel: 'fewer than 100 are under 50', totalLabel: 'of about 3,500 haenyeo', ref: 'T10' },
        // 05-5 · the risk to life (Meilin, 24 Oct: no illnesses in 05; the danger itself, as numbers)
        { type: 'figures', media: img('assets/img/ch05-body.jpg', 'A haenyeo wading out of the sea, bent under her net and tewak', ''),
          quote: '“The work is dangerous and potentially fatal. On average, between 5 and 10 women lose their lives doing it each year.”', quoteRef: 'F3',
          cite: 'Narration, <i>ABC News</i> (2021)',
          items: [
            { value: '5–10', unit: '', label: 'women who die diving each year, according to Jeju city authorities', ref: 'F3 T10' },
            { value: '102', unit: '', label: 'accidents involving haenyeo reported on Jeju, 2020–2024', ref: 'T9' },
            { value: '37', unit: '%', label: 'of those accidents were cardiac arrests', ref: 'T9' }
          ] },
        // ── B · the contradiction ──
        // 05-6 · film still (05-6.png): a family at the kitchen table; shown whole, under the text
        { type: 'text', heading: 'So that their daughters could choose',
          lead: 'They do not want their daughters to inherit such hard and dangerous work. In a few decades, the haenyeo may be gone.', ref: 'T3',
          body: ['They worked so their children could have more choices. Many of those children chose other lives.'],   // copy audit 23 Oct
          media: img('assets/img/ch05-home.jpg', 'A younger woman, an older haenyeo and a friend talking at a kitchen table', ''), figure: 'wide', duck: 0.5 },
        // 05-7a · ABC News (F3), screen recording 05-7.mov (Meilin): Yoon Sook-nyeo under water, her own words subtitled in the film
        { type: 'film', media: video('assets/video/ch05-voice.mp4', 'assets/img/ch05-voice-poster.jpg', 'Under water, a haenyeo swims along rocks covered in brown weed; subtitles of her words', 'F3'),
          // the old 05-7 scene's text now sits on this clip, top left, clear of the film's own subtitles (Meilin, 24 Oct)
          heading: 'A sea that gives less',
          lead: 'Warmer water means less sea life, and poachers dive at night without licences, taking far more than is allowed.', leadRef: 'T4',
          line: '', align: 'left', cite: 'Yoon Sook-nyeo, 65, a haenyeo for more than 40 years, in <i>ABC News</i> (2021)',
          voice: 0.8, voiceDip: 0.3, hold: 2.5 },
        // 05-7b · a warming sea (T10: Prof. Park Sang-ryul, Jeju National University)
        { type: 'figures', heading: 'A warming sea',
          quote: '“A change of 1 degree in the ocean is considered to be a change of 10 degrees on land.”', quoteRef: 'T10',
          cite: 'Park Sang-ryul, professor at Jeju National University',
          items: [
            { value: '+1', unit: '°C', label: 'the water around Jeju in the last 30 years', ref: 'T10' },
            { value: '+2', unit: '°C', label: 'over the last 80 years', ref: 'T10' },
            { value: '3', unit: '×', label: 'faster than the global trend', ref: 'T10' }
          ] },
        // 05-7c · what the sea gives now: Jeju's nearshore harvest, then and now (T8, KIOST / Ministry of Statistics data)
        { type: 'bars', heading: 'What the sea gives now', unit: 't',
          lead: 'Around Jeju, the underwater forests are disappearing.', leadRef: 'T8',
          items: [
            { label: 'All seaweed, Jeju nearshore waters', from: [2010, 5155], to: [2025, 154], change: '−97%' },
            { label: 'Agar-agar seaweed', from: [2010, 3455], to: [2025, 21], change: '−99%' },
            { label: 'Abalone', from: [1990, 184], to: [2025, 1], change: '−99.5%' }
          ],
          caption: 'Annual harvest in tonnes.', ref: 'T8' },
        // 05-8 · closing (Meilin)
        { type: 'film', media: img('assets/img/ch05-end.jpg', 'Haenyeo walking out across the rocks at sunset, in silhouette', ''),
          line: 'Many of the older women did not expect the practice to continue.', lineRef: 'T6', align: 'center' }   // copy audit 23 Oct; was 'Even as the world begins to see them, this culture may slowly slip away.'
      ]
    },

    {
      id: 'continuation', num: '06',
      title: 'Different <i>Continuation</i>',
      short: 'Different Continuation',
      kr: '', krGloss: '',
      mood: 'acceptance',
      theme: { bg: '#0D3B4A', fg: '#F5F1EA', muted: '#A9C3C4', accent: '#E0703F' },
      tone: 'colour', sound: 'drift', volume: 0.55,
      modules: [
        // 06-1 · 06-1.avif (Meilin): older and younger haenyeo together at the harbour; colour returns here
        // TODO: sources of 06-1, 06-3-1, 06-3-2, 06-4, 06-5, 06-6, 06-7 and ending.png
        { type: 'opener', media: img('assets/img/ch06-open.jpg', 'Older and younger haenyeo in wetsuits smiling together at the harbour', ''),
        },   // copy audit 23 Oct: subtitle removed
        // 06-2 · the "blues" line moved to the Ending (copy audit 23 Oct)
        // ── A · continuation in change ──
        // 06-3 · two photos (06-3-1, 06-3-2)
        { type: 'spread', side: 'left',
          media: img('assets/img/ch06-dock.jpg', 'Two young haenyeo on a harbour pier with their nets and orange floats, one waving', ''),
          media2: img('assets/img/ch06-shin.jpg', 'A young woman smiling on the pier, carrying a tub with her wetsuit', ''),
          heading: 'Choosing the sea',
          lead: 'Many of the older women began as girls, practising in the shallows. Some younger women come to the sea later, after other lives.', leadRef: 'T3 T6',
          body: [
            'The first haenyeo came from Jeju and spread along the whole coast. On Geoje Island, the older divers thought they would be the last. Then came the new recruits. Shin Ho-jin, from Seoul, studied literature and advertising and worked as a project manager in a high-rise office. In September 2021 she quit to dive.',
            '<span class="pull">“Korean work culture is very tough. There is no mercy! But in this community, it’s different.”</span>',
            '<span class="cite">Shin Ho-jin, 37</span>'
          ], bodyRef: 'T6' },
        // 06-4 · 06-4.jpeg: an older haenyeo and a young diver
        { type: 'spread', side: 'right',
          media: img('assets/img/ch06-together.jpg', 'An older haenyeo and a young diver taking a selfie on the shore', ''),
          heading: 'Passed on',
          lead: 'On Jeju, knowledge is passed on in families, fishery cooperatives, the Haenyeo School and the Haenyeo Museum.', leadRef: 'T1',
          body: [
            'On Geoje, an academy now opens the work to women who were not born into it, always taught by local haenyeo. More than 100 have graduated, and 15 have become full-time divers. Some elders say you are not a haenyeo until you have worked three years.',
            '<span class="pull">“The work we do is risky. There is no room for mistakes. But every day they become a little better. … We’re like family.”</span>',
            '<span class="cite">Lee Bok-soon, 69, boat captain and haenyeo for more than 50 years</span>'
          ], bodyRef: 'T6' },
        // 06-5 · 06-5.webp: a young haenyeo on the pier with her net
        { type: 'scene', heading: 'New ways of sharing',
          lead: 'On Geoje, two younger divers, Sohee Jin and Jungmin Woo, take orders and post their catch on social media, and are opening an online shop.', ref: 'T4',
          body: [
            'Instead of giving the boat captain a share of the harvest, they pay a monthly fee and keep what they earn. They see diving as a bridge between their culture and the outside world.'
          ], bodyRef: 'T4',
          media: img('assets/img/ch06-share.jpg', 'A young haenyeo kneeling on the pier beside her net and orange float', '') },
        // ── B · no conclusion ──
        // 06-6 · 06-6.jpg: haenyeo of different ages on the rocks
        { type: 'spread', side: 'left',
          media: img('assets/img/ch06-rocks.jpg', 'Haenyeo of different ages standing together on the black rocks with their floats', ''),
          heading: 'No ending yet',
          lead: 'Outside stories often call them the last generation. The Haenyeo Museum tells another one: a strong, continuing culture, with an adaptive, resilient attitude to the future. What comes next remains unclear.', leadRef: 'T5 T4',
          body: [
            '<span class="pull">“It takes a lot of courage to dive. Since it’s a job with my life on the line, I have to be 100% sure about this.”</span>',
            '<span class="cite">Hong Yong-joo, 36, who has just finished the introductory course</span>'
          ], bodyRef: 'T6' },
        // 06-7 · 06-7.webp: haenyeo walking down to the sea (Meilin's closing thought)
        { type: 'film', media: img('assets/img/ch06-walk.jpg', 'Haenyeo walking down to the sea with orange floats and nets on their backs', ''),
          line: '“I hope their story and spirit can be passed on.”', lineRef: 'T6', align: 'left',
          cite: 'Shin Ho-jin, in <i>The Guardian</i> (Krüger 2023)' }   // copy audit 23 Oct; was 'A tradition can grow, change, or slowly become smaller…'
      ]
    }
  ],

  /* ---------------- ENDING ---------------- */
  ending: {
    kr: '제주 해녀',
    // the "blues" line (from 06-2): a line Meilin found in a video's comments; no source found, so no reference (copy audit 23 Oct)
    statement: 'The haenyeo’s “blues” is not an elegy, but a low, unbroken song of life.',
    media: img('assets/img/ending.jpg', 'Two haenyeo walking through a field of yellow canola flowers by the sea', ''),
    backdrop: video('assets/video/ending-look.mp4', 'assets/img/ending-look-poster.jpg', 'Underwater, a haenyeo in an old round mask looks up towards the surface', ''),   // look.mp4 (Meilin, 14 Oct)
    loopLabel: 'Return to the surface',
    theme: { bg: '#111315', fg: '#E6E5E1', muted: '#8A8E90', accent: '#D8653B' },
    sound: 'drift', volume: 0.55,   // 06's bed carries on (Meilin, 14 Oct)
    credits: [
      ['Design & development', 'Meilin Chen · s4151128'],
      ['Course', 'COMM2595 Digital Narrative Theory and Practice · RMIT University · 2026'],
      ['Media', 'Documentary footage reworked from the films listed below (F1–F4); photographs as credited (P1–P4); the sumbisori sound is cut from F2'],
      ['AI use', 'Code and planning assisted by Claude (Anthropic)']
    ]

  }
};
