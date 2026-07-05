'use client';
import React, { useState } from 'react';
import { CascadeShell, useToast, useMenu, Ctrl, useSteps } from '../cascade/common.jsx';
import { SC_PLAT, SC_HOOK, SC_LEN, offlineScript } from '../cascade/catalog.js';

const Icon = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;

export default function ScriptsStudio() {
  const { toast, ToastHost } = useToast();
  const menu = useMenu();
  const { run, StepsView } = useSteps();
  const [topic, setTopic] = useState('');
  const [plat, setPlat] = useState('TikTok');
  const [hook, setHook] = useState('open loop / curiosity gap');
  const [len, setLen] = useState('30 seconds');
  const [out, setOut] = useState('');
  const [busy, setBusy] = useState(false);

  const platL = (SC_PLAT.find(x => x[0] === plat) || SC_PLAT[0])[1];
  const hookL = (SC_HOOK.find(x => x[0] === hook) || SC_HOOK[0])[1];
  const lenL = (SC_LEN.find(x => x[0] === len) || SC_LEN[0])[1];

  async function writeScript() {
    if (!topic.trim()) { toast('Give me a topic first.'); return; }
    setBusy(true); setOut('');
    let text = '';
    await run([
      { label: `Studying ${platL} pacing & retention patterns`, ms: 700 },
      { label: 'Engineering the hook', ms: 600 },
      { label: 'Writing the script', work: async () => { await new Promise(r => setTimeout(r, 500)); text = offlineScript(topic.trim(), plat, hook, len); return 'ok'; }, doneLabel: () => 'Script written' },
      { label: 'Polishing beats & CTA', ms: 400 },
    ]);
    setOut(text);
    setBusy(false);
    toast('Script ready.');
  }

  function copyScript() {
    if (!out) return toast('Nothing to copy yet.');
    navigator.clipboard && navigator.clipboard.writeText(out);
    toast('Script copied.');
  }
  function sendToAgent() {
    if (!out) return toast('Write a script first.');
    sessionStorage.setItem('cascade_agent_script', out);
    window.dispatchEvent(new CustomEvent('cascade:goto', { detail: { tab: 'film-agent' } }));
    toast('Script loaded into the Agent.');
  }

  const renderScript = () => out.split('\n').map((line, i) =>
    /^(HOOK|BEAT\s*\d+|CTA)/i.test(line.trim())
      ? <div key={i}><span className="h">{line}</span></div>
      : <div key={i}>{line || ' '}</div>
  );

  return (
    <CascadeShell>
      <div className="stage">
        <div className="agent-stage">
          <div className="agent-head">
            <div className="eyebrow">Viral script writer</div>
            <h1>Scripts engineered <span className="grad">to stop the scroll.</span></h1>
            <p>Pick a platform and hook style, drop your topic, and get a beat-by-beat script - hook, retention loops, and CTA - ready for the film agent.</p>
          </div>

          <div className="hero-box">
            <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="What's the video about? e.g. Why nobody can build a second Amazon rainforest…" />
            <div className="rail">
              <Ctrl id="plat" menu={menu} set icon={<Icon d={<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>} />} label={<span className="cv">{platL}</span>}>
                <div className="pop-h">Platform</div>
                {SC_PLAT.map(([v, l]) => <button key={v} className={`pop-item ${v === plat ? 'sel' : ''}`} onClick={() => { setPlat(v); menu.setOpenId(null); }}><div><b>{l}</b></div></button>)}
              </Ctrl>
              <Ctrl id="hook" menu={menu} set icon={<Icon d={<path d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />} />} label={<span className="cv">{hookL}</span>}>
                <div className="pop-h">Hook style</div>
                {SC_HOOK.map(([v, l]) => <button key={v} className={`pop-item ${v === hook ? 'sel' : ''}`} onClick={() => { setHook(v); menu.setOpenId(null); }}><div><b>{l}</b></div></button>)}
              </Ctrl>
              <Ctrl id="len" menu={menu} set icon={<Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />} label={<span className="cv">{lenL}</span>}>
                <div className="pop-h">Length</div>
                <div className="pop-grid">{SC_LEN.map(([v, l]) => <button key={v} className={`pop-chip ${v === len ? 'sel' : ''}`} onClick={() => { setLen(v); menu.setOpenId(null); }}>{l}</button>)}</div>
              </Ctrl>
              <div className="rail-spacer" />
              <button className="run-hero" disabled={busy} onClick={writeScript}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></svg>
                {busy ? 'Writing…' : 'Write script'}
              </button>
            </div>
          </div>

          <div style={{ maxWidth: 520, margin: '16px auto 0' }}><StepsView /></div>

          <div className="agent-lower" style={{ gridTemplateColumns: '1fr', marginTop: 20 }}>
            <div className="panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0 }}>Script</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="ctrl-btn" onClick={copyScript}>Copy</button>
                  <button className="ctrl-btn set" onClick={sendToAgent}>Send to Agent →</button>
                </div>
              </div>
              <div className="script-out" style={out ? {} : { color: 'var(--dim)' }}>
                {out ? renderScript() : 'Your script will appear here.'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastHost />
    </CascadeShell>
  );
}
