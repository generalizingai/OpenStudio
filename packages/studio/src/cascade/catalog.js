// Cascade catalog - the model cards, styles, voices, presets and offline templates
// from the Cascade prototype, re-pointed at OpenField's MuAPI model ids so every
// picker here generates through the same MuAPI backend the rest of OpenField uses.
//
// Each model carries display metadata (provider, logo domain, hue, illustrative price)
// plus the concrete MuAPI endpoint id used for generation:
//   image models  -> `muapi`  (t2i id, called via generateImage)
//   video models  -> `t2v`/`i2v` (called via generateVideo / generateI2V)

export const IMG_MODELS = [
  { id: 'nano-banana',    muapi: 'nano-banana',                 name: 'Nano Banana',     prov: 'Google · fal', tag: 'Fast edits & gen',            dom: 'gemini.google.com', hue: [84, 80],  price: () => 0.039 },
  { id: 'nano-banana-2',  muapi: 'nano-banana-2',               name: 'Nano Banana 2',   prov: 'Google AI',    tag: 'Gemini 3 Flash Image',        dom: 'gemini.google.com', hue: [150, 70], price: () => 0.067 },
  { id: 'nano-banana-pro', muapi: 'nano-banana-pro',            name: 'Nano Banana Pro', prov: 'Google',       tag: 'Gemini 3 Pro Image · 4K',     dom: 'gemini.google.com', hue: [45, 95],  price: () => 0.15 },
  { id: 'gpt-image-2',    muapi: 'gpt-image-2',                 name: 'GPT Image 2',     prov: 'OpenAI',       tag: 'Best text-in-image',          dom: 'openai.com',        hue: [190, 80], price: () => 0.053 },
  { id: 'seedream-4',     muapi: 'bytedance-seedream-v4',       name: 'Seedream 4.0',    prov: 'BytePlus',     tag: 'Cheap volume workhorse',      dom: 'byteplus.com',      hue: [280, 70], price: () => 0.03 },
  { id: 'imagen-4',       muapi: 'google-imagen4',             name: 'Imagen 4',        prov: 'Google',       tag: 'Photoreal generalist',        dom: 'gemini.google.com', hue: [200, 80], price: () => 0.04 },
  { id: 'ideogram-v3',    muapi: 'ideogram-v3-t2i',            name: 'Ideogram v3',     prov: 'Ideogram',     tag: 'Typography & posters',        dom: 'ideogram.ai',       hue: [330, 75], price: () => 0.05 },
  { id: 'qwen-image',     muapi: 'qwen-image',                 name: 'Qwen Image',      prov: 'Alibaba',      tag: 'Multilingual text render',    dom: 'qwen.ai',           hue: [20, 80],  price: () => 0.03 },
  { id: 'grok-image',     muapi: 'grok-imagine-text-to-image', name: 'Grok Imagine',    prov: 'xAI',          tag: 'Fast stylized image',         dom: 'x.ai',              hue: [210, 10], price: () => 0.02 },
  { id: 'midjourney-v7',  muapi: 'midjourney-v7-text-to-image', name: 'Midjourney v7',  prov: 'Midjourney',   tag: 'Signature aesthetic',         dom: 'midjourney.com',    hue: [255, 60], price: () => 0.08 },
];

export const VID_MODELS = [
  { id: 'seedance-2',      t2v: 'seedance-v2.0-t2v',                  i2v: 'seedance-v2.0-i2v',                   name: 'Seedance 2.0',        prov: 'BytePlus', tag: 'Native audio · multi-shot', dom: 'byteplus.com',      hue: [210, 85], res: ['720p', '1080p'], audio: 'included', dur: [3, 10], perSec: (r) => r === '1080p' ? 0.682 : 0.3034 },
  { id: 'seedance-fast',   t2v: 'seedance-pro-t2v-fast',              i2v: 'seedance-pro-i2v-fast',               name: 'Seedance Fast',       prov: 'BytePlus', tag: 'Lower latency & cost',      dom: 'byteplus.com',      hue: [225, 70], res: ['720p'],          audio: 'included', dur: [3, 10], perSec: () => 0.2419 },
  { id: 'kling-3-pro',     t2v: 'kling-v3.0-pro-text-to-video',       i2v: 'kling-v3.0-pro-image-to-video',       name: 'Kling 3.0 Pro',       prov: 'Kling',    tag: 'Top tier · voice control',  dom: 'klingai.com',       hue: [100, 85], res: ['1080p'],         audio: 'toggle',   dur: [3, 10], perSec: (r, a) => a ? 0.392 : 0.28 },
  { id: 'kling-25',        t2v: 'kling-v2.5-turbo-pro-t2v',           i2v: 'kling-v2.5-turbo-pro-i2v',            name: 'Kling 2.5 Turbo',     prov: 'Kling',    tag: 'Budget motion quality',     dom: 'klingai.com',       hue: [160, 60], res: ['720p', '1080p'], audio: 'none',     dur: [5, 10], perSec: () => 0.112 },
  { id: 'veo-31',          t2v: 'veo3.1-text-to-video',               i2v: 'veo3.1-image-to-video',               name: 'Veo 3.1',             prov: 'Google',   tag: 'Cinematic + native audio',  dom: 'gemini.google.com', hue: [130, 78], res: ['720p', '1080p'], audio: 'included', dur: [4, 8],  perSec: () => 0.40 },
  { id: 'hailuo-02',       t2v: 'minimax-hailuo-02-pro-t2v',          i2v: 'minimax-hailuo-02-pro-i2v',           name: 'Hailuo 02 Pro',       prov: 'MiniMax',  tag: 'Cinematic realism',         dom: 'minimaxi.com',      hue: [290, 75], res: ['1080p'],         audio: 'none',     dur: [6, 10], perSec: () => 0.035 },
  { id: 'wan-25',          t2v: 'wan2.5-text-to-video',               i2v: 'wan2.5-image-to-video',               name: 'Wan 2.5',             prov: 'Alibaba',  tag: 'Native audio video',        dom: 'alibaba.com',       hue: [20, 80],  res: ['720p', '1080p'], audio: 'included', dur: [3, 10], perSec: () => 0.07 },
  { id: 'sora-2',          t2v: 'openai-sora-2-text-to-video',        i2v: 'openai-sora-2-image-to-video',        name: 'Sora 2',              prov: 'OpenAI',   tag: 'Coherent long shots',       dom: 'openai.com',        hue: [190, 60], res: ['720p'],          audio: 'included', dur: [4, 10], perSec: () => 0.30 },
  { id: 'grok-video',      t2v: 'grok-imagine-text-to-video',         i2v: 'grok-imagine-image-to-video',         name: 'Grok Video',          prov: 'xAI',      tag: 'Cheap · native audio',      dom: 'x.ai',              hue: [210, 12], res: ['720p'],          audio: 'included', dur: [6, 10], perSec: () => 0.02 },
];

export const TTS_PER_MIN = 0.10;
export const SCRIPT_COST = 0.02;

// Provider brand monograms for the logo fallback (favicon fails -> monogram).
export const BRAND = {
  'gemini.google.com': ['G', 'linear-gradient(135deg,#1c7df4,#9b72cb,#ea4335)'],
  'openai.com':        ['O', '#10a37f'],
  'byteplus.com':      ['B', 'linear-gradient(135deg,#325af0,#00c8d2)'],
  'bfl.ai':            ['F', 'linear-gradient(135deg,#ff7a1a,#b8420f)'],
  'klingai.com':       ['K', 'linear-gradient(135deg,#00d97f,#00a2ff)'],
  'fal.ai':            ['f', 'linear-gradient(135deg,#7c3aed,#db2777)'],
  'elevenlabs.io':     ['11', '#e9e9ee'],
  'x.ai':              ['x', '#111318'],
  'ideogram.ai':       ['I', 'linear-gradient(135deg,#ec4899,#8b5cf6)'],
  'midjourney.com':    ['MJ', 'linear-gradient(135deg,#1f2937,#4b5563)'],
  'minimaxi.com':      ['M', 'linear-gradient(135deg,#ef4444,#f97316)'],
  'alibaba.com':       ['W', 'linear-gradient(135deg,#ff6a00,#ff2e63)'],
  'qwen.ai':           ['Q', 'linear-gradient(135deg,#615ced,#7c3aed)'],
  'runwayml.com':      ['R', '#0b0b0b'],
};

// ---- Agent (script-to-film) config ----
export const CINEMA = {
  style: ['Cinematic', 'Photorealistic', 'Anime', 'Fantasy', 'Documentary', '3D Render', 'Vintage Film', 'Noir'],
  cam: ['Full-Frame Cine Digital', 'Modular 8K Digital', 'Grand Format 70mm Film', 'Studio Digital S35', 'Classic 16mm Film', 'Premium Large Format'],
  lens: ['18mm ultra-wide', '24mm wide', '35mm', '50mm', '85mm portrait', '100mm macro', 'Anamorphic'],
  aperture: ['f/1.4 shallow', 'f/2.8', 'f/4 balanced', 'f/8', 'f/11 deep focus'],
  move: ['Static locked-off', 'Slow push-in', 'Slow pull-out', 'Tracking / dolly', 'Crane up', 'Handheld', 'Orbit / arc', 'Whip pan'],
  light: ['Golden hour', 'Blue hour', 'Hard noon sun', 'Soft overcast', 'Neon night', 'Chiaroscuro / low-key', 'Studio softbox', 'Candle / firelight'],
  grade: ['Teal-orange', 'Bleach bypass', 'Warm vintage', 'Cold desaturated', 'High-contrast noir', 'Pastel dream', 'Kodak film emulation', 'Neo-noir cyan'],
};
export const STYLE_PROMPT = {
  Cinematic: 'cinematic film still, dramatic composition, professional color grading',
  Photorealistic: 'photorealistic, ultra-detailed, 8K, natural lighting, sharp focus',
  Anime: 'anime key visual, cel-shaded, vibrant, expressive linework',
  Fantasy: 'epic fantasy concept art, painterly, volumetric light, richly detailed',
  Documentary: 'candid documentary photography, available light, authentic, grainy realism',
  '3D Render': 'high-end 3D render, octane, physically-based materials, soft global illumination',
  'Vintage Film': 'shot on vintage film stock, halation, subtle grain, faded highlights',
  Noir: 'film noir, high-contrast black and white, hard shadows, venetian-blind light',
};
export const AGENT_SUGGEST = [
  'A 30s launch film for a solar e-bike, sunrise city ride, ends on the logo',
  'Neo-noir detective chases a shadow through a neon Karachi night market',
  'Cozy documentary: a grandmother making biryani, warm 16mm',
  'Epic space-tourism ad, orbital hotel, awe-scale cinematic',
];

// ---- Scripts config ----
export const SC_PLAT = [['TikTok', 'TikTok'], ['Instagram Reels', 'Reels'], ['YouTube Shorts', 'Shorts'], ['YouTube long-form', 'YouTube']];
export const SC_HOOK = [['open loop / curiosity gap', 'Open loop'], ['bold controversial claim', 'Hot take'], ['first-person POV storytelling', 'POV story'], ['countdown listicle', 'Listicle'], ['shocking statistic', 'Stat shock']];
export const SC_LEN = [['15 seconds', '15s'], ['30 seconds', '30s'], ['60 seconds', '60s'], ['3 minutes', '3 min']];

// ---- Reels config ----
export const REEL_STYLES = [
  { id: 'reddit',  name: 'Story Threads',    d: 'Dramatic first-person stories over gameplay-style motion', hue: [16, 85] },
  { id: 'history', name: 'POV History',      d: '"You wake up in 1347…" immersive historical POVs',        hue: [38, 70] },
  { id: 'scary',   name: 'Scary Stories',    d: 'Horror narration, dark ambient visuals, slow zooms',      hue: [262, 60] },
  { id: 'motiv',   name: 'Motivation',       d: 'Cinematic b-roll, hard-hitting lines, gym-adjacent',      hue: [8, 90] },
  { id: 'facts',   name: 'Top 5 Facts',      d: 'Rapid-fire countdown facts with punchy captions',         hue: [200, 85] },
  { id: 'luxury',  name: 'Luxury Lifestyle', d: 'Supercars, penthouses, watches - aspirational loops',      hue: [45, 90] },
  { id: 'space',   name: 'Space & Science',  d: 'Awe-scale cosmos explainers with deep narration',          hue: [230, 80] },
  { id: 'finance', name: 'Money Tips',       d: 'Personal-finance hooks with chart visuals',                hue: [145, 75] },
  { id: 'quiz',    name: 'Quiz Challenge',   d: 'Interactive guess-the-answer with countdown timers',       hue: [320, 80] },
  { id: 'asmr',    name: 'Satisfying ASMR',  d: 'Slime, kinetic sand, hydraulic press - loopable',          hue: [180, 70] },
  { id: 'philo',   name: 'Stoic Philosophy', d: 'Ancient wisdom over statue & marble aesthetics',           hue: [210, 20] },
  { id: 'crime',   name: 'True Crime Recaps',d: 'Case timelines with map & document visuals',               hue: [350, 65] },
];
export const REEL_VOICES = [
  { v: 'onyx',    name: 'Atlas',   d: 'Deep cinematic narrator (M)' },
  { v: 'echo',    name: 'Echo',    d: 'Warm baritone (M)' },
  { v: 'ash',     name: 'Ash',     d: 'Energetic hype (M)' },
  { v: 'fable',   name: 'Fable',   d: 'British storyteller (M)' },
  { v: 'alloy',   name: 'Alloy',   d: 'Neutral & clear' },
  { v: 'coral',   name: 'Coral',   d: 'Warm storyteller (F)' },
  { v: 'nova',    name: 'Nova',    d: 'Bright & upbeat (F)' },
  { v: 'sage',    name: 'Sage',    d: 'Calm, ASMR (F)' },
  { v: 'shimmer', name: 'Shimmer', d: 'Bright narrator (F)' },
];
export const CAPTION_STYLES = [
  { id: 'pop',     name: 'Pop',        d: 'One word at a time, pops in' },
  { id: 'boxed',   name: 'Bold Box',   d: 'One word in a TikTok box' },
  { id: 'fadeup',  name: 'Fade Up',    d: 'One word, fades up' },
  { id: 'karaoke', name: 'Karaoke',    d: 'Full line, word highlights' },
  { id: 'wordup',  name: 'Word Build', d: 'Sentence builds word-by-word' },
  { id: 'clean',   name: 'Clean',      d: 'Full line, simple fade' },
  { id: 'none',    name: 'No captions',d: 'Voiceover only' },
];
export const MUSIC_MOODS = [
  { id: 'none',    name: 'No music',           style: '' },
  { id: 'auto',    name: 'Auto (match style)', style: '' },
  { id: 'tense',   name: 'Tense / Horror',     style: 'dark eerie horror ambient, suspenseful drone, cinematic tension' },
  { id: 'epic',    name: 'Epic / Motivation',  style: 'epic cinematic orchestral, powerful inspiring, building drums' },
  { id: 'lofi',    name: 'Chill Lo-fi',        style: 'lo-fi hip hop, mellow relaxed beats' },
  { id: 'upbeat',  name: 'Upbeat / Pop',       style: 'upbeat energetic pop, catchy and bright' },
  { id: 'ambient', name: 'Ambient / Calm',     style: 'calm ambient pads, soft and meditative' },
  { id: 'trap',    name: 'Trap / Hype',        style: 'hard trap beat, heavy 808s, hype energy' },
];

// ---- Motion presets ----
export const MOTION_PRESETS = [
  { id: 'push',    name: 'Slow Push-In', d: 'Steady dolly toward the subject',  hue: [210, 80] },
  { id: 'orbit',   name: 'Orbit',        d: 'Camera arcs around the subject',    hue: [150, 75], pro: true },
  { id: 'crane',   name: 'Crane Up',     d: 'Rises to reveal the full scene',    hue: [45, 85] },
  { id: 'zoom',    name: 'Crash Zoom',   d: 'Fast punch-in for impact',          hue: [8, 90] },
  { id: 'float',   name: 'Dreamy Float', d: 'Weightless drift, soft parallax',   hue: [280, 70] },
  { id: 'shake',   name: 'Handheld',     d: 'Organic handheld energy',           hue: [30, 70] },
  { id: 'flythru', name: 'Fly-Through',  d: 'Camera flies through the space',    hue: [190, 85], pro: true },
  { id: 'reveal',  name: 'Whip Reveal',  d: 'Whip-pan into the reveal',          hue: [330, 75] },
  { id: 'bullet',  name: 'Bullet Time',  d: 'Time freezes, camera keeps moving', hue: [255, 80], pro: true },
  { id: 'hero',    name: 'Hero Shot',    d: 'Low-angle epic hero framing',       hue: [95, 80] },
];

// ---- lookups ----
export const imgById = (id) => IMG_MODELS.find(m => m.id === id) || IMG_MODELS[0];
export const vidById = (id) => VID_MODELS.find(m => m.id === id) || VID_MODELS[0];
export const voiceName = (v) => (REEL_VOICES.find(x => x.v === v) || REEL_VOICES[0]).name;
export const capName = (id) => (CAPTION_STYLES.find(x => x.id === id) || CAPTION_STYLES[0]).name;
export const musicName = (id) => (MUSIC_MOODS.find(x => x.id === id) || MUSIC_MOODS[0]).name;
export const capDemo = (id) => id === 'none' ? '-' : (['pop', 'boxed', 'fadeup'].includes(id) ? 'MYSTERY' : 'Bermuda Triangle');

// ---- offline templates (MuAPI has no text/LLM endpoint, so text is generated locally) ----
export function offlineScript(topic, platform, hook, len) {
  const p = (SC_PLAT.find(x => x[0] === platform) || SC_PLAT[0])[1];
  return `HOOK (0–3s)
"${topic}" - and the part nobody tells you.
[Hard cut to the most striking visual you have]

BEAT 1 (3–10s)
Set the stakes in one line - why ${p} viewers should care right now. [Slow push-in]

BEAT 2 (10–20s)
The twist or mechanism behind "${topic}". [Cut every 2s, bold on-screen captions]

BEAT 3 (20–27s)
Pay off the ${hook} - resolve the open question. [Widest, most cinematic shot]

CTA (27–${len.replace(/[^0-9]/g, '') || '30'}s)
"Follow for part 2 - it gets crazier."`;
}

export function offlineShots(concept, count) {
  const beats = [
    'Establishing wide - set the world and tone',
    'Push in on the subject - introduce the hook',
    'Detail insert - the key object or moment',
    'Reaction / motion beat - raise the stakes',
    'Turn - the twist or reveal lands',
    'Payoff - the emotional or visual peak',
    'Pull back - context and scale',
    'Signature close - logo / final line',
    'Transition - momentum into the next idea',
    'Texture shot - mood and atmosphere',
    'Hero framing - the standout image',
    'Resolution - calm, resolved final frame',
  ];
  return Array.from({ length: count }, (_, i) => ({
    title: 'SHOT ' + (i + 1),
    desc: `${concept} - ${beats[i % beats.length]}.`,
  }));
}

export function splitScript(txt, max = 4) {
  let parts = txt.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  if (parts.length < 2) {
    const sents = txt.replace(/\n/g, ' ').match(/[^.!?]+[.!?]+/g) || [txt];
    parts = [];
    for (let i = 0; i < sents.length; i += 2) parts.push(sents.slice(i, i + 2).join(' ').trim());
  }
  return parts.slice(0, max);
}

// hand-drawn vector reel covers (original placeholders - no third-party assets)
export const COVERS = {
reddit:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#180d06"/><circle cx="135" cy="25" r="70" fill="rgba(255,90,30,.13)"/><rect x="18" y="42" width="124" height="40" rx="9" fill="#232329"/><circle cx="34" cy="56" r="7" fill="#ff5a1e"/><rect x="48" y="50" width="60" height="6" rx="3" fill="#c8c8cf"/><rect x="48" y="62" width="84" height="5" rx="2.5" fill="#5b5b63"/><rect x="18" y="92" width="124" height="40" rx="9" fill="#1b1b20"/><rect x="30" y="102" width="90" height="5" rx="2.5" fill="#4a4a52"/><rect x="30" y="112" width="70" height="5" rx="2.5" fill="#3a3a41"/><path d="M28 158l9-13 9 13z" fill="#ff5a1e"/><path d="M28 170l9 13 9-13z" fill="#4a4a52"/><rect x="56" y="160" width="52" height="7" rx="3.5" fill="#2c2c33"/></svg>`,
history:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#141007"/><circle cx="80" cy="66" r="46" fill="rgba(245,185,60,.15)"/><circle cx="80" cy="66" r="30" fill="#f5b93c" opacity=".9"/><path d="M18 122L80 96l62 26z" fill="#332a18"/><rect x="22" y="122" width="116" height="9" fill="#2e2617"/><g fill="#241d10"><rect x="32" y="131" width="13" height="44"/><rect x="58" y="131" width="13" height="44"/><rect x="84" y="131" width="13" height="44"/><rect x="110" y="131" width="13" height="44"/></g><rect x="18" y="175" width="124" height="10" fill="#2e2617"/></svg>`,
scary:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#0d0a14"/><circle cx="118" cy="42" r="23" fill="#e8e3f2"/><circle cx="110" cy="38" r="21" fill="#0d0a14"/><g fill="#161022"><path d="M36 200v-72l-13 8 15-42-9 5 17-42 17 42-9-5 15 42-13-8v72z"/><path d="M112 200v-52l-9 5 11-30-7 4 13-32 13 32-7-4 11 30-9-5v52z" opacity=".85"/></g><rect y="172" width="160" height="28" fill="#120d1d"/><g fill="#8a80a8"><circle cx="58" cy="28" r="1.4"/><circle cx="84" cy="16" r="1"/><circle cx="40" cy="54" r="1.2"/><circle cx="140" cy="80" r="1.1"/></g></svg>`,
motiv:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#160a08"/><circle cx="80" cy="120" r="64" fill="rgba(255,90,60,.14)"/><circle cx="80" cy="120" r="42" fill="#ff5a3c" opacity=".85"/><path d="M0 200l56-92 34 54 26-40 44 78z" fill="#1d0f0c"/><g stroke="#ff8a5c" stroke-width="3" stroke-linecap="round"><line x1="80" y1="40" x2="80" y2="26"/><line x1="46" y1="54" x2="37" y2="44"/><line x1="114" y1="54" x2="123" y2="44"/></g></svg>`,
facts:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#07101a"/><circle cx="80" cy="94" r="58" fill="rgba(46,157,255,.12)"/><text x="80" y="124" font-family="Arial,Helvetica,sans-serif" font-size="88" font-weight="900" fill="#2e9dff" text-anchor="middle">5</text><g stroke="#2e9dff" stroke-width="4" stroke-linecap="round" opacity=".7"><line x1="28" y1="40" x2="42" y2="54"/><line x1="132" y1="40" x2="118" y2="54"/><line x1="20" y1="98" x2="38" y2="98"/><line x1="140" y1="98" x2="122" y2="98"/></g><rect x="34" y="156" width="92" height="9" rx="4.5" fill="#183048"/><rect x="48" y="172" width="64" height="7" rx="3.5" fill="#122438"/></svg>`,
luxury:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#120d04"/><circle cx="80" cy="76" r="60" fill="rgba(245,190,60,.12)"/><g fill="#1e1708"><rect x="16" y="70" width="22" height="82"/><rect x="44" y="50" width="26" height="102"/><rect x="76" y="64" width="20" height="88"/><rect x="102" y="42" width="28" height="110"/><rect x="134" y="76" width="14" height="76"/></g><path d="M28 170c6-11 18-13 34-13h20c14 0 24 4 30 11l16 3v9a6 6 0 01-6 6H26a6 6 0 01-6-6v-7z" fill="#0c0904" stroke="#f5be3c" stroke-width="2"/><circle cx="48" cy="186" r="8" fill="#0c0904" stroke="#f5be3c" stroke-width="2"/><circle cx="116" cy="186" r="8" fill="#0c0904" stroke="#f5be3c" stroke-width="2"/></svg>`,
space:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#070a16"/><circle cx="80" cy="94" r="34" fill="#3b57d9"/><circle cx="70" cy="84" r="10" fill="#5a76f0" opacity=".8"/><ellipse cx="80" cy="98" rx="58" ry="14" fill="none" stroke="#8a9cf0" stroke-width="4" opacity=".7" transform="rotate(-18 80 98)"/><g fill="#c9d2ff"><circle cx="30" cy="34" r="1.5"/><circle cx="120" cy="24" r="1.2"/><circle cx="140" cy="60" r="1.6"/><circle cx="24" cy="150" r="1.3"/><circle cx="132" cy="164" r="1.5"/></g></svg>`,
finance:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#07120c"/><g fill="#12301f"><rect x="24" y="128" width="18" height="46" rx="3"/><rect x="52" y="108" width="18" height="66" rx="3"/><rect x="80" y="120" width="18" height="54" rx="3"/><rect x="108" y="84" width="18" height="90" rx="3"/></g><path d="M26 116L60 92l26 14 44-44" fill="none" stroke="#2ee27f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M130 62h14v14" fill="none" stroke="#2ee27f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><text x="28" y="48" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700" fill="#1d5c38">$</text></svg>`,
quiz:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#150816"/><circle cx="80" cy="84" r="52" fill="rgba(240,70,180,.12)"/><text x="80" y="112" font-family="Arial,Helvetica,sans-serif" font-size="80" font-weight="900" fill="#f046b4" text-anchor="middle">?</text><circle cx="80" cy="162" r="18" fill="none" stroke="#f046b4" stroke-width="4"/><rect x="26" y="28" width="34" height="12" rx="6" fill="#2c1030"/><rect x="100" y="28" width="34" height="12" rx="6" fill="#2c1030"/></svg>`,
asmr:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#061214"/><circle cx="54" cy="70" r="34" fill="#0d3a3e"/><circle cx="44" cy="60" r="10" fill="#2ee2d2" opacity=".35"/><circle cx="112" cy="120" r="44" fill="#0a2f33"/><circle cx="98" cy="104" r="12" fill="#2ee2d2" opacity=".3"/><circle cx="46" cy="152" r="22" fill="#0d3a3e"/><circle cx="128" cy="44" r="14" fill="#0d3a3e"/></svg>`,
philo:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#101114"/><circle cx="80" cy="66" r="54" fill="rgba(200,205,215,.07)"/><path d="M80 32c-16 0-26 12-26 28 0 10 4 16 4 24 0 6-4 10-10 12v6h64v-6c-6-2-10-6-10-12 0-8 4-14 4-24 0-16-10-28-26-28z" fill="#c9ccd4"/><rect x="42" y="106" width="76" height="12" fill="#3a3d45"/><rect x="52" y="118" width="56" height="58" fill="#2c2f36"/><rect x="42" y="176" width="76" height="10" fill="#3a3d45"/></svg>`,
crime:`<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="200" fill="#120708"/><g transform="rotate(-8 80 54)"><rect x="-20" y="46" width="220" height="16" fill="#e8c322"/><g fill="#120708"><rect x="-6" y="48" width="10" height="12"/><rect x="24" y="48" width="10" height="12"/><rect x="54" y="48" width="10" height="12"/><rect x="84" y="48" width="10" height="12"/><rect x="114" y="48" width="10" height="12"/><rect x="144" y="48" width="10" height="12"/></g></g><path d="M80 96c-14 0-24 10-24 23 0 16 24 45 24 45s24-29 24-45c0-13-10-23-24-23z" fill="#e23c4e"/><circle cx="80" cy="118" r="9" fill="#120708"/></svg>`,
};

export const CR = (usd) => Math.max(1, Math.round(usd * 100));
