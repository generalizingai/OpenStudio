'use client';
import React, { useState } from 'react';
import { CascadeShell, useToast, useMenu, Ctrl, useSteps, Logo, genImage } from '../cascade/common.jsx';
import { IMG_MODELS, CINEMA, STYLE_PROMPT, imgById, offlineShots, CR, SCRIPT_COST } from '../cascade/catalog.js';

const Icon = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;

export default function StoryboardStudio({ apiKey }) {
  const { toast, ToastHost } = useToast();
  const menu = useMenu();
  const { run, StepsView } = useSteps();
  const [concept, setConcept] = useState('');
  const [model, setModel] = useState('nano-banana-2');
  const [style, setStyle] = useState('Cinematic');
  const [count, setCount] = useState(6);
  const [aspect, setAspect] = useState('16:9');
  const [inspo, setInspo] = useState(false);
  const [frames, setFrames] = useState([]);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const m = imgById(model);
  const prov = m.price() * count + SCRIPT_COST;
  const costCr = CR(prov * (1 + 1.2));

  async function runBoard() {
    if (!concept.trim()) { toast('Describe the video concept first.'); return; }
    setBusy(true); setSent(false); setFrames([]);
    let shots = [];
    await run([
      { label: 'Reading your concept', ms: 500 },
      ...(inspo ? [{ label: 'Extracting palette & mood from inspiration image', ms: 900 }] : []),
      { label: 'Writing the shot list', work: async () => { await new Promise(r => setTimeout(r, 500)); shots = offlineShots(concept.trim(), count); return 'ok'; }, doneLabel: () => 'Shot list written' },
      {
        label: `Rendering ${count} frames on ${m.prov}`, work: async () => {
          const styleP = STYLE_PROMPT[style] || '';
          for (let i = 0; i < count; i++) {
            const sh = shots[i] || { title: 'SHOT ' + (i + 1), desc: concept };
            setFrames(prev => [...prev, { ...sh, busy: true }]);
            try {
              const url = await genImage(apiKey, { muapiId: m.muapi, prompt: `${sh.title}: ${sh.desc}. ${styleP}`, aspect });
              setFrames(prev => prev.map((f, idx) => idx === i ? { ...f, busy: false, url } : f));
            } catch (e) {
              setFrames(prev => prev.map((f, idx) => idx === i ? { ...f, busy: false, error: String(e.message || e) } : f));
            }
          }
          return 'ok';
        }
      },
      { label: 'Assembling board', ms: 400 },
    ]);
    setBusy(false); setSent(true);
    toast(`Storyboard ready - ${count} frames.`);
  }

  function sendToAgent() {
    const text = frames.map(f => `${f.title}: ${f.desc}`).join('\n\n');
    sessionStorage.setItem('cascade_agent_script', text);
    window.dispatchEvent(new CustomEvent('cascade:goto', { detail: { tab: 'film-agent' } }));
    toast('Board loaded into the Agent - pick a video model and run.');
  }

  return (
    <CascadeShell>
      <div className="stage">
        <div className="agent-stage">
          <div className="agent-head">
            <div className="eyebrow">Storyboard agent</div>
            <h1>One prompt in. <span className="grad">A full storyboard out.</span></h1>
            <p>Describe the video, optionally note an inspiration image. The agent writes the shot list, then renders every frame - live, on your MuAPI models.</p>
          </div>

          <div className="hero-box">
            <textarea value={concept} onChange={e => setConcept(e.target.value)} placeholder="Describe the film - e.g. a 45-second launch film for a solar e-bike, sunrise city ride, ends on the logo…" />
            <div className="rail">
              <Ctrl id="model" menu={menu} set icon={<Icon d={<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>} />} label={<><span>Model</span> <span className="cv">{m.name}</span></>}>
                <div className="pop-h">Image model</div>
                {IMG_MODELS.map(im => (
                  <button key={im.id} className={`pop-item ${im.id === model ? 'sel' : ''}`} onClick={() => { setModel(im.id); menu.setOpenId(null); }}>
                    <Logo dom={im.dom} hue={im.hue} className="pi-logo" /><div><b>{im.name}</b><span className="pi-sub">{im.prov}</span></div><span className="pi-price">${im.price().toFixed(3)}/img</span>
                  </button>
                ))}
              </Ctrl>
              <Ctrl id="style" menu={menu} set icon={<Icon d={<path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />} />} label={<span className="cv">{style}</span>}>
                <div className="pop-h">Visual style</div>
                <div className="pop-grid">{CINEMA.style.map(o => <button key={o} className={`pop-chip ${o === style ? 'sel' : ''}`} onClick={() => { setStyle(o); menu.setOpenId(null); }}>{o}</button>)}</div>
              </Ctrl>
              <Ctrl id="frames" menu={menu} icon={<Icon d={<><rect x="3" y="4" width="7" height="7" /><rect x="14" y="4" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>} />} label={<span className="cv">{count} frames</span>}>
                <div className="pop-h">Frames</div>
                <div className="pop-grid">{[4, 6, 8, 12].map(n => <button key={n} className={`pop-chip ${n === count ? 'sel' : ''}`} onClick={() => { setCount(n); menu.setOpenId(null); }}>{n} frames</button>)}</div>
              </Ctrl>
              <Ctrl id="aspect" menu={menu} icon={<Icon d={<rect x="3" y="5" width="18" height="14" rx="2" />} />} label={<span className="cv">{aspect}</span>}>
                <div className="pop-h">Aspect</div>
                <div className="pop-grid">{['16:9', '9:16', '1:1'].map(a => <button key={a} className={`pop-chip ${a === aspect ? 'sel' : ''}`} onClick={() => { setAspect(a); menu.setOpenId(null); }}>{a}</button>)}</div>
              </Ctrl>
              <label className="ctrl-btn" style={{ cursor: 'pointer', position: 'relative' }}>
                <Icon d={<><path d="M21 15l-5-5L5 21" /><rect x="3" y="3" width="18" height="18" rx="2" /></>} />
                <span className="cv">{inspo ? 'Inspo added' : 'Inspiration'}</span>
                <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) { setInspo(true); toast('Inspiration noted.'); } }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
              </label>
              <div className="rail-spacer" />
              <span className="cost-line" style={{ marginRight: 6 }}>{count} frames · <b>{costCr} cr</b></span>
              <button className="run-hero" disabled={busy} onClick={runBoard}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 3l14 9-14 9z" /></svg>{busy ? 'Working…' : 'Create board'}
              </button>
            </div>
          </div>

          <div style={{ maxWidth: 520, margin: '16px auto 0' }}><StepsView /></div>

          <div className="agent-lower" style={{ gridTemplateColumns: '1fr' }}>
            <div className="panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2 style={{ margin: 0 }}>Board</h2>
                {sent && frames.length > 0 && <button className="ctrl-btn" onClick={sendToAgent}>Send to Agent → animate all</button>}
              </div>
              {frames.length === 0 ? (
                <div className="canvas-empty"><span className="disp" style={{ fontSize: 14 }}>No board yet</span></div>
              ) : (
                <div className="sb-frames">
                  {frames.map((f, i) => (
                    <div key={i} className={`sb-frame ${f.busy ? 'busy' : ''}`}>
                      <div className="art" style={f.url ? { backgroundImage: `url(${f.url})` } : {}}>
                        {f.error && <div className="err">{f.error}</div>}
                      </div>
                      <div className="cap"><b>{f.title}</b><p>{f.desc}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastHost />
    </CascadeShell>
  );
}
