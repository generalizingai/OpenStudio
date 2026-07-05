'use client';
import React, { useState } from 'react';
import { CascadeShell, useToast, useMenu, Ctrl, useSteps, Logo, genImage, genVideo } from '../cascade/common.jsx';
import {
  IMG_MODELS, VID_MODELS, REEL_STYLES, REEL_VOICES, CAPTION_STYLES, MUSIC_MOODS, COVERS,
  imgById, vidById, voiceName, capName, musicName, capDemo, TTS_PER_MIN, SCRIPT_COST, CR,
} from '../cascade/catalog.js';

const Icon = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;
const MARGIN = 1.2;

export default function ReelsStudio({ apiKey }) {
  const { toast, ToastHost } = useToast();
  const menu = useMenu();
  const { run, StepsView } = useSteps();
  const [topic, setTopic] = useState('');
  const [reel, setReel] = useState({ style: null, dur: 30, engine: 'slides', voice: 'onyx', img: 'nano-banana-2', vid: 'seedance-fast', caption: 'pop', music: 'none' });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // { video } | { frames: [] }

  const set = (k, v) => { setReel(r => ({ ...r, [k]: v })); menu.setOpenId(null); };
  const im = imgById(reel.img), vd = vidById(reel.vid);
  const style = REEL_STYLES.find(s => s.id === reel.style);

  // cost ledger
  const tts = TTS_PER_MIN * reel.dur / 60;
  const vis = reel.engine === 'slides' ? Math.ceil(reel.dur / 5) * im.price() : reel.dur * vd.perSec(vd.res[0], vd.audio === 'included');
  const prov = SCRIPT_COST + tts + vis;
  const costCr = CR(prov * (1 + MARGIN));

  async function runReel() {
    if (!reel.style) { toast('Pick a style first.'); return; }
    const t = topic.trim() || style.name;
    setBusy(true); setResult(null);
    const basePrompt = `${style.name} vertical short about "${t}". ${style.d}. cinematic, vertical 9:16 framing, bold subject`;
    try {
      await run([
        { label: 'Writing the reel script', ms: 700 },
        {
          label: reel.engine === 'slides' ? `Rendering visuals on ${im.prov}` : `Generating video on ${vd.prov}`,
          work: async () => {
            if (reel.engine === 'slides') {
              const n = Math.min(Math.max(Math.ceil(reel.dur / 5), 3), 6);
              const frames = [];
              for (let i = 0; i < n; i++) {
                const url = await genImage(apiKey, { muapiId: im.muapi, prompt: `${basePrompt} - shot ${i + 1}`, aspect: '9:16' });
                frames.push(url);
                setResult({ frames: [...frames] });
              }
            } else {
              const video = await genVideo(apiKey, vd, { prompt: basePrompt, aspect: '9:16', seconds: Math.min(reel.dur, 10), res: vd.res[0] });
              setResult({ video });
            }
            return 'ok';
          },
        },
        { label: `Adding ${voiceName(reel.voice)} voiceover + ${capName(reel.caption)} captions`, ms: 800 },
        { label: 'Compiling vertical reel', ms: 500 },
      ]);
      toast('Reel compiled.');
    } catch (e) {
      toast('Reel failed: ' + (e.message || e));
    } finally { setBusy(false); }
  }

  return (
    <CascadeShell>
      <div className="stage">
        <div className="agent-stage" style={{ maxWidth: 1100 }}>
          <div className="agent-head">
            <div className="eyebrow">Faceless reels factory</div>
            <h1>Pick a style. <span className="grad">Ship a reel.</span></h1>
            <p>Every style is a full pipeline - script, visuals, and voiceover, all on your MuAPI models. One click, one vertical video.</p>
          </div>

          <div className="hero-box" style={{ marginBottom: 18 }}>
            <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic / niche - e.g. unsolved mysteries of the deep ocean…" style={{ minHeight: 56 }} />
            <div className="rail">
              <Ctrl id="style" menu={menu} set={!!reel.style} icon={<Icon d={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>} />} label={<span className="cv">{reel.style ? style.name : 'Pick a style'}</span>}>
                <div className="pop-h">Reel style</div>
                {REEL_STYLES.map(s => <button key={s.id} className={`pop-item ${s.id === reel.style ? 'sel' : ''}`} onClick={() => set('style', s.id)}><div><b>{s.name}</b><span className="pi-sub">{s.d}</span></div></button>)}
              </Ctrl>
              <Ctrl id="engine" menu={menu} set icon={<Icon d={<path d="M15 10l5-3v10l-5-3zM3 6h12v12H3z" />} />} label={<span className="cv">{reel.engine === 'slides' ? 'Slideshow' : 'Full AI video'}</span>}>
                <div className="pop-h">Visual engine</div>
                <button className={`pop-item ${reel.engine === 'slides' ? 'sel' : ''}`} onClick={() => set('engine', 'slides')}><div><b>Image slideshow</b><span className="pi-sub">1 frame / 5s + motion pans. Cheapest.</span></div></button>
                <button className={`pop-item ${reel.engine === 'video' ? 'sel' : ''}`} onClick={() => set('engine', 'video')}><div><b>Full AI video</b><span className="pi-sub">Every second by the video model. Premium.</span></div></button>
              </Ctrl>
              <Ctrl id="dur" menu={menu} set icon={<Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />} label={<span className="cv">{reel.dur}s</span>}>
                <div className="pop-h">Duration</div>
                <div className="pop-grid">{[30, 45, 60].map(d => <button key={d} className={`pop-chip ${d === reel.dur ? 'sel' : ''}`} onClick={() => set('dur', d)}>{d}s</button>)}</div>
              </Ctrl>
              <Ctrl id="voice" menu={menu} set icon={<Icon d={<path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v3" />} />} label={<span className="cv">{voiceName(reel.voice)}</span>}>
                <div className="pop-h">Voice</div>
                {REEL_VOICES.map(o => (
                  <button key={o.v} className={`pop-item voice-item ${o.v === reel.voice ? 'sel' : ''}`} onClick={() => set('voice', o.v)}>
                    <div><b>{o.name}</b><span className="pi-sub">{o.d}</span></div>
                    <span className="voice-play" onClick={(e) => { e.stopPropagation(); toast('Add an ElevenLabs key to preview voices.'); }} title="Preview voice"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                  </button>
                ))}
              </Ctrl>
              <Ctrl id="cap" menu={menu} set wide icon={<Icon d={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10h4M7 14h7M15 10h2" /></>} />} label={<span className="cv">Captions: {capName(reel.caption)}</span>}>
                <div className="pop-h">Caption style</div>
                <div className="cap-grid">
                  {CAPTION_STYLES.map(c => (
                    <button key={c.id} className={`cap-opt ${c.id === reel.caption ? 'sel' : ''}`} onClick={() => set('caption', c.id)}>
                      <div className="cap-demo"><span className={`cap-demo-txt cap-anim-${c.id}`}>{capDemo(c.id)}</span></div>
                      <div className="cap-meta"><b>{c.name}</b><span>{c.d}</span></div>
                    </button>
                  ))}
                </div>
              </Ctrl>
              <Ctrl id="music" menu={menu} set={reel.music !== 'none'} icon={<Icon d={<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>} />} label={<span className="cv">{musicName(reel.music)}</span>}>
                <div className="pop-h">Background music</div>
                {MUSIC_MOODS.map(mm => <button key={mm.id} className={`pop-item ${mm.id === reel.music ? 'sel' : ''}`} onClick={() => set('music', mm.id)}><div><b>{mm.name}</b>{mm.style && <span className="pi-sub">{mm.style.slice(0, 42)}…</span>}</div></button>)}
              </Ctrl>
              {reel.engine === 'slides' ? (
                <Ctrl id="img" menu={menu} icon={<Icon d={<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>} />} label={<><span>Img</span> <span className="cv">{im.name}</span></>}>
                  <div className="pop-h">Image model</div>
                  {IMG_MODELS.map(m => <button key={m.id} className={`pop-item ${m.id === reel.img ? 'sel' : ''}`} onClick={() => set('img', m.id)}><Logo dom={m.dom} hue={m.hue} className="pi-logo" /><div><b>{m.name}</b><span className="pi-sub">{m.prov}</span></div><span className="pi-price">${m.price().toFixed(3)}</span></button>)}
                </Ctrl>
              ) : (
                <Ctrl id="vid" menu={menu} icon={<Icon d={<path d="M15 10l5-3v10l-5-3zM3 6h12v12H3z" />} />} label={<><span>Vid</span> <span className="cv">{vd.name}</span></>}>
                  <div className="pop-h">Video model</div>
                  {VID_MODELS.map(m => <button key={m.id} className={`pop-item ${m.id === reel.vid ? 'sel' : ''}`} onClick={() => set('vid', m.id)}><Logo dom={m.dom} hue={m.hue} className="pi-logo" /><div><b>{m.name}</b><span className="pi-sub">{m.prov}</span></div><span className="pi-price">${m.perSec(m.res[0], false).toFixed(3)}/s</span></button>)}
                </Ctrl>
              )}
              <div className="rail-spacer" />
              <span className="cost-line">provider ${prov.toFixed(2)} → <b>{costCr} cr</b></span>
              <button className="run-hero" disabled={busy} onClick={runReel}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 3l14 9-14 9z" /></svg>{busy ? 'Generating…' : 'Generate reel'}</button>
            </div>
            <div style={{ padding: '0 12px 8px' }}><StepsView /></div>
          </div>

          {result && (
            <div className="panel" style={{ marginBottom: 16 }}>
              <h2>Reel output</h2>
              {result.video ? (
                <div style={{ maxWidth: 260, margin: '0 auto' }}>
                  <div className="tile"><div className="art" style={{ aspectRatio: '9/16' }}><video src={result.video} muted loop autoPlay playsInline controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div></div>
                </div>
              ) : (
                <div className="sb-frames" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))' }}>
                  {result.frames.map((f, i) => <div key={i} className="sb-frame"><div className="art" style={{ aspectRatio: '9/16', backgroundImage: `url(${f})` }} /><div className="cap"><b>FRAME {i + 1}</b></div></div>)}
                </div>
              )}
            </div>
          )}

          <div className="style-grid">
            {REEL_STYLES.map(s => (
              <button key={s.id} className={`style-card ${reel.style === s.id ? 'active' : ''}`} onClick={() => setReel(r => ({ ...r, style: s.id }))}>
                <div className="cover" dangerouslySetInnerHTML={{ __html: COVERS[s.id] || '' }} />
                <div className="sm"><b>{s.name}</b><span>{s.d}</span></div>
              </button>
            ))}
          </div>
          <div className="note">These covers are hand-drawn vector placeholders. In production you'd cache one real AI preview per style through your image model. Visuals here are generated live through your MuAPI key.</div>
        </div>
      </div>
      <ToastHost />
    </CascadeShell>
  );
}
