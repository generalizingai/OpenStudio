'use client';
import React, { useState, useEffect } from 'react';
import { CascadeShell, useToast, useMenu, Ctrl } from '../cascade/common.jsx';
import { CINEMA, STYLE_PROMPT, AGENT_SUGGEST, splitScript } from '../cascade/catalog.js';
import { t2iModels, t2vModels, i2vModels, getModelById, getVideoModelById, getI2VModelById } from '../models.js';
import { generateImage, generateVideo, generateI2V } from '../muapi.js';
import { ModelLogo } from '../providerLogo.jsx';

const Icon = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;
const AGENT_SCENES = 4;
const clampDur = (s) => Math.min(Math.max(s, 3), 10);
const pick = (list, prefs) => (prefs.map(p => list.find(m => m.id === p)).find(Boolean) || list[0]).id;

// A searchable model picker rendered inside a Cascade popover.
function ModelPop({ list, value, onPick, search, setSearch, sub }) {
  const q = search.trim().toLowerCase();
  const filtered = q ? list.filter(m => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) : list;
  return (
    <>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        onClick={e => e.stopPropagation()}
        placeholder="Search models…"
        style={{ marginBottom: 6 }}
      />
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {filtered.map(m => (
          <button key={m.id} className={`pop-item ${m.id === value ? 'sel' : ''}`} onClick={() => onPick(m.id)}>
            <ModelLogo model={m} size={22} rounded="rounded-md" />
            <div><b>{m.name}</b>{sub && <span className="pi-sub">{sub(m)}</span>}</div>
          </button>
        ))}
        {filtered.length === 0 && <div className="pop-note">No models match “{search}”.</div>}
      </div>
    </>
  );
}

export default function FilmAgentStudio({ apiKey }) {
  const { toast, ToastHost } = useToast();
  const menu = useMenu();
  const [script, setScript] = useState('');
  const [pipe, setPipe] = useState('sb');
  const [imgModelId, setImgModelId] = useState(() => pick(t2iModels, ['nano-banana-2', 'nano-banana']));
  const [vidModelId, setVidModelId] = useState(() => pick(i2vModels, ['seedance-v2.0-i2v', 'kling-v2.1-pro-i2v']));
  const [imgSearch, setImgSearch] = useState('');
  const [vidSearch, setVidSearch] = useState('');
  const [cine, setCine] = useState({ style: 'Cinematic', cam: 'Full-Frame Cine Digital', lens: '35mm', aperture: 'f/2.8', move: 'Slow push-in', light: 'Golden hour', grade: 'Teal-orange' });
  const [sceneDur, setSceneDur] = useState(5);
  const [aspect, setAspect] = useState('16:9');
  const [scenes, setScenes] = useState([]);
  const [running, setRunning] = useState(false);

  const vidList = pipe === 'sb' ? i2vModels : t2vModels;
  const imgName = getModelById(imgModelId)?.name || 'Model';
  const vidName = (getI2VModelById(vidModelId) || getVideoModelById(vidModelId))?.name || 'Model';

  useEffect(() => {
    const handoff = typeof window !== 'undefined' && sessionStorage.getItem('cascade_agent_script');
    if (handoff) { setScript(handoff); sessionStorage.removeItem('cascade_agent_script'); }
  }, []);

  function switchPipe(p) {
    setPipe(p);
    setVidModelId(p === 'sb'
      ? pick(i2vModels, ['seedance-v2.0-i2v', 'kling-v2.1-pro-i2v'])
      : pick(t2vModels, ['seedance-v2.0-t2v', 'kling-v3.0-pro-text-to-video']));
    menu.setOpenId(null);
  }

  const cinePrompt = () => `${STYLE_PROMPT[cine.style]}, ${cine.cam}, ${cine.lens} lens at ${cine.aperture.split(' ')[0]}, ${cine.move.toLowerCase()}, ${cine.light.toLowerCase()} lighting, ${cine.grade} grade, ${aspect}`;

  const buildScenes = (txt) => splitScript(txt, AGENT_SCENES).map((t, i) => ({ i: i + 1, text: t, dur: clampDur(sceneDur), status: 'planned' }));
  function planScenes(silent) {
    if (!script.trim()) { if (!silent) toast('Describe your film first.'); return; }
    setScenes(buildScenes(script.trim()));
  }
  useEffect(() => { if (scenes.length) setScenes(buildScenes(script.trim())); /* eslint-disable-next-line */ }, [sceneDur]);

  async function runAgent() {
    if (running) return;
    if (!script.trim()) { toast('Describe your film first.'); return; }
    const plan = buildScenes(script.trim());
    setScenes(plan.map(s => ({ ...s, status: 'queued' })));
    setRunning(true);
    toast('Directing with ' + imgName + ' + ' + vidName);
    const cp = cinePrompt();
    for (let idx = 0; idx < plan.length; idx++) {
      const scenePrompt = `${plan[idx].text}. ${cp}`;
      const dur = clampDur(sceneDur);
      try {
        if (pipe === 'sb') {
          setScenes(prev => prev.map((s, i) => i === idx ? { ...s, status: 'storyboarding' } : s));
          const r1 = await generateImage(apiKey, { model: imgModelId, prompt: scenePrompt, aspect_ratio: aspect });
          const frameUrl = r1.url || r1.outputs?.[0];
          setScenes(prev => prev.map((s, i) => i === idx ? { ...s, frameUrl, status: 'animating' } : s));
          const r2 = await generateI2V(apiKey, { model: vidModelId, image_url: frameUrl, prompt: scenePrompt, aspect_ratio: aspect, duration: dur });
          setScenes(prev => prev.map((s, i) => i === idx ? { ...s, videoUrl: r2.url || r2.outputs?.[0], status: 'done' } : s));
        } else {
          setScenes(prev => prev.map((s, i) => i === idx ? { ...s, status: 'animating' } : s));
          const r = await generateVideo(apiKey, { model: vidModelId, prompt: scenePrompt, aspect_ratio: aspect, duration: dur });
          setScenes(prev => prev.map((s, i) => i === idx ? { ...s, videoUrl: r.url || r.outputs?.[0], status: 'done' } : s));
        }
      } catch (e) {
        setScenes(prev => prev.map((s, i) => i === idx ? { ...s, status: 'error', error: String(e.message || e) } : s));
        toast('Scene ' + (idx + 1) + ' failed: ' + (e.message || e));
      }
    }
    setRunning(false);
    toast('Film complete.');
  }

  const secs = scenes.reduce((a, s) => a + s.dur, 0);
  const clips = scenes.filter(s => s.videoUrl);

  return (
    <CascadeShell>
      <div className="stage">
        <div className="agent-stage">
          <div className="agent-head">
            <div className="eyebrow">Script-to-film agent</div>
            <h1>Describe your film. <span className="grad">The agent directs it.</span></h1>
            <p>Screenwriter → storyboard → cinematographer → animator, on any of your MuAPI models. Every control below feeds a world-class prompt.</p>
          </div>

          <div className="hero-box">
            <textarea value={script} onChange={e => setScript(e.target.value)} placeholder="Paste a script, or describe the whole film in a sentence - the agent expands it into scenes, shots, and camera language…" />
            <div className="rail">
              <Ctrl id="pipe" menu={menu} set icon={<Icon d={<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 4v5" /></>} />} label={<span className="cv">{pipe === 'sb' ? 'Storyboard → Animate' : 'Direct video'}</span>}>
                <div className="pop-h">Pipeline</div>
                <button className={`pop-item ${pipe === 'sb' ? 'sel' : ''}`} onClick={() => switchPipe('sb')}><div><b>Storyboard → Animate</b><span className="pi-sub">Key frame per scene, then image-to-video. Cheaper to iterate.</span></div></button>
                <button className={`pop-item ${pipe === 'direct' ? 'sel' : ''}`} onClick={() => switchPipe('direct')}><div><b>Direct video</b><span className="pi-sub">Each scene straight to text-to-video. Premium.</span></div></button>
              </Ctrl>
              {pipe === 'sb' && (
                <Ctrl id="img" menu={menu} set icon={<Icon d={<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>} />} label={<><span>Image</span> <span className="cv">{imgName}</span></>}>
                  <div className="pop-h">Image model (storyboard) · {t2iModels.length} models</div>
                  <ModelPop list={t2iModels} value={imgModelId} onPick={id => { setImgModelId(id); menu.setOpenId(null); }} search={imgSearch} setSearch={setImgSearch} />
                </Ctrl>
              )}
              <Ctrl id="vid" menu={menu} set icon={<Icon d={<><path d="M15 10l5-3v10l-5-3zM3 6h12v12H3z" /></>} />} label={<><span>Video</span> <span className="cv">{vidName}</span></>}>
                <div className="pop-h">{pipe === 'sb' ? 'Video model · image-to-video' : 'Video model · text-to-video'} · {vidList.length} models</div>
                <ModelPop list={vidList} value={vidModelId} onPick={id => { setVidModelId(id); menu.setOpenId(null); }} search={vidSearch} setSearch={setVidSearch} />
              </Ctrl>
              <Ctrl id="style" menu={menu} set icon={<Icon d={<path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />} />} label={<span className="cv">{cine.style}</span>}>
                <div className="pop-h">Visual style</div>
                <div className="pop-grid">{CINEMA.style.map(o => <button key={o} className={`pop-chip ${o === cine.style ? 'sel' : ''}`} onClick={() => { setCine(c => ({ ...c, style: o })); menu.setOpenId(null); }}>{o}</button>)}</div>
              </Ctrl>
              <Ctrl id="cine" menu={menu} set icon={<Icon d={<path d="M2 8l4-4 3 3M2 8v11a1 1 0 001 1h18a1 1 0 001-1V8zM2 8h20l-4-4-3 3-3-3-3 3" />} />} label={<span className="cv">{cine.lens} · {cine.aperture.split(' ')[0]}</span>}>
                <div className="pop-h">Cinema studio - camera &amp; film</div>
                {[['cam', 'Camera'], ['lens', 'Lens'], ['aperture', 'Aperture'], ['move', 'Camera move'], ['light', 'Lighting'], ['grade', 'Color grade']].map(([k, label]) => (
                  <div key={k}>
                    <div className="pop-h" style={{ paddingTop: 6 }}>{label}</div>
                    <div className="pop-grid">{CINEMA[k].map(o => <button key={o} className={`pop-chip ${o === cine[k] ? 'sel' : ''}`} onClick={() => setCine(c => ({ ...c, [k]: o }))}>{o}</button>)}</div>
                  </div>
                ))}
                <div className="pop-note">These compile into camera language appended to every shot prompt.</div>
              </Ctrl>
              <Ctrl id="dur" menu={menu} icon={<Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />} label={<span className="cv">{sceneDur}s / scene</span>}>
                <div className="pop-h">Seconds per scene</div>
                <div className="dur-row"><input type="range" min="3" max="10" value={sceneDur} onChange={e => setSceneDur(+e.target.value)} /><span className="dur-val mono">{sceneDur}s</span></div>
              </Ctrl>
              <Ctrl id="asp" menu={menu} icon={<Icon d={<rect x="3" y="5" width="18" height="14" rx="2" />} />} label={<span className="cv">{aspect}</span>}>
                <div className="pop-h">Aspect ratio</div>
                <div className="pop-grid">{['16:9', '9:16', '1:1', '4:5'].map(a => <button key={a} className={`pop-chip ${a === aspect ? 'sel' : ''}`} onClick={() => { setAspect(a); menu.setOpenId(null); }}>{a}</button>)}</div>
              </Ctrl>
              <div className="rail-spacer" />
              <button className="ctrl-btn" onClick={() => planScenes(false)}>Plan &amp; estimate</button>
              <button className="run-hero" disabled={running || !scenes.length} onClick={runAgent}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 3l14 9-14 9z" /></svg>{running ? 'Directing…' : 'Direct film'}
              </button>
            </div>
          </div>

          <div className="suggest-row">{AGENT_SUGGEST.map(s => <button key={s} className="suggest" onClick={() => setScript(s)}>{s}</button>)}</div>

          <div className="agent-lower">
            <div className="panel">
              <h2>Production plan</h2>
              <div style={{ maxHeight: '46vh', overflowY: 'auto' }}>
                {scenes.length === 0 ? (
                  <p style={{ color: 'var(--dim)', fontSize: 12.5 }}>Write your film above and hit <b style={{ color: 'var(--muted)' }}>Plan &amp; estimate</b> - the agent breaks it into scenes with shot-level camera direction.</p>
                ) : scenes.map(s => {
                  const working = s.status !== 'planned' && s.status !== 'done' && s.status !== 'error' && s.status !== 'queued';
                  return (
                    <div key={s.i} className={`scene ${s.status === 'done' ? 'done' : ''}`}>
                      <div className="scene-top"><b>Scene {s.i} · {s.dur}s</b></div>
                      <p>{s.text.slice(0, 130)}{s.text.length > 130 ? '…' : ''}</p>
                      {s.frameUrl && <div className="frames"><div className="frame"><img src={s.frameUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div></div>}
                      <div className={`status ${working ? 'shimmer-txt' : ''}`}>{s.error ? 'error' : s.status}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="panel">
              <h2>Production summary</h2>
              <div className="ledger" style={{ border: 'none', paddingTop: 0, marginTop: 0 }}>
                <div><span className="k">Scenes</span><span className="v">{scenes.length || '-'}</span></div>
                <div><span className="k">Video seconds</span><span className="v">{scenes.length ? secs + 's' : '-'}</span></div>
                <div><span className="k">Image model</span><span className="v" style={{ fontSize: 11 }}>{pipe === 'sb' ? imgName : '-'}</span></div>
                <div><span className="k">Video model</span><span className="v" style={{ fontSize: 11 }}>{vidName}</span></div>
                <div className="total-row" style={{ display: 'flex', justifyContent: 'space-between' }}><span className="k">Billing</span><span className="v" style={{ fontSize: 12, color: 'var(--jade)' }}>via MuAPI on run</span></div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="pop-h" style={{ paddingLeft: 0 }}>Compiled shot style</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, background: 'var(--panel-2)', border: '1px solid var(--line)', borderRadius: 9, padding: 10 }}>{cinePrompt()}</div>
              </div>
            </div>
          </div>

          {clips.length > 0 && (
            <div className="panel" style={{ marginTop: 16 }}>
              <h2>Film output - {clips.length} scene{clips.length > 1 ? 's' : ''}</h2>
              <div className="results">
                {clips.map(s => (
                  <div key={s.i} className="tile">
                    <span className="badge">scene {s.i}</span>
                    <div className="art"><video src={s.videoUrl} muted loop autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
                    <div className="tile-meta"><b>{s.text.slice(0, 60)}</b><span>{vidName} · {s.dur}s</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastHost />
    </CascadeShell>
  );
}
