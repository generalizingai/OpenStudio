'use client';
import React, { useState } from 'react';
import { CascadeShell, useToast, useMenu, Ctrl, useSteps } from '../cascade/common.jsx';
import { ModelLogo } from '../providerLogo.jsx';
import { v2vModels, getV2VModelById } from '../models.js';
import { processV2V, uploadFile } from '../muapi.js';

const Icon = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;

// Thumbnail = the tool's title, animated, in lime + JetBrains Mono.
function ToolThumb({ name }) {
  return (
    <div className="vt-cover"><div className="vt-title">{name}</div></div>
  );
}

function UploadTile({ label, url, busy, onFile }) {
  return (
    <label className="drop" style={{ flex: 1, minWidth: 180 }}>
      {busy ? 'Uploading…' : url ? '✓ ' + label + ' added' : label}
      {url && !busy && <div style={{ marginTop: 6, fontSize: 10, color: 'var(--dim)', wordBreak: 'break-all' }}>{url.slice(0, 46)}…</div>}
      <input type="file" accept={label.toLowerCase().includes('image') ? 'image/*' : 'video/*'} onChange={e => e.target.files[0] && onFile(e.target.files[0])} />
    </label>
  );
}

export default function VideoToolsStudio({ apiKey }) {
  const { toast, ToastHost } = useToast();
  const menu = useMenu();
  const { run, StepsView } = useSteps();
  const [modelId, setModelId] = useState(v2vModels[0].id);
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [aspect, setAspect] = useState('16:9');
  const [vBusy, setVBusy] = useState(false);
  const [iBusy, setIBusy] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const model = getV2VModelById(modelId) || v2vModels[0];

  async function upload(file, setUrl, setB) {
    setB(true);
    try { setUrl(await uploadFile(apiKey, file)); toast('Uploaded.'); }
    catch (e) { toast('Upload failed: ' + (e.message || e)); }
    finally { setB(false); }
  }

  async function runTool() {
    if (!videoUrl) { toast('Upload a source video first.'); return; }
    if (model.imageField && !imageUrl) { toast('This tool also needs a reference image.'); return; }
    if (model.promptRequired && !prompt.trim()) { toast('This tool needs a motion prompt.'); return; }
    setBusy(true); setResult(null);
    try {
      await run([
        { label: 'Uploading & queuing on ' + model.name, ms: 500 },
        {
          label: 'Processing video on MuAPI', work: async () => {
            const r = await processV2V(apiKey, { model: modelId, video_url: videoUrl, image_url: imageUrl || undefined, prompt: model.hasPrompt ? prompt : undefined, aspect_ratio: aspect });
            setResult(r.url || r.outputs?.[0]);
            return 'ok';
          },
        },
        { label: 'Finalizing', ms: 400 },
      ]);
      toast('Done.');
    } catch (e) { toast('Failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  }

  return (
    <CascadeShell>
      <div className="stage">
        <div className="agent-stage">
          <div className="agent-head">
            <div className="eyebrow">Video tools</div>
            <h1>Transform any clip. <span className="grad">Frame-perfect.</span></h1>
            <p>Video-to-video utilities on your MuAPI models - remove watermarks, or drive a clip with Kling motion control.</p>
          </div>

          <div className="hero-box">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: '10px 12px' }}>
              <UploadTile label="Source video" url={videoUrl} busy={vBusy} onFile={f => upload(f, setVideoUrl, setVBusy)} />
              {model.imageField && <UploadTile label="Reference image" url={imageUrl} busy={iBusy} onFile={f => upload(f, setImageUrl, setIBusy)} />}
            </div>
            {model.hasPrompt && (
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={model.promptRequired ? 'Describe the camera / subject motion (required)…' : 'Optional - describe the motion or scene…'} style={{ minHeight: 54 }} />
            )}
            <div className="rail">
              <Ctrl id="model" menu={menu} set icon={<Icon d={<><path d="M15 10l5-3v10l-5-3zM3 6h12v12H3z" /></>} />} label={<><span>Tool</span> <span className="cv">{model.name}</span></>}>
                <div className="pop-h">Video tool · {v2vModels.length} models</div>
                {v2vModels.map(m => (
                  <button key={m.id} className={`pop-item ${m.id === modelId ? 'sel' : ''}`} onClick={() => { setModelId(m.id); menu.setOpenId(null); }}>
                    <ModelLogo model={m} size={22} rounded="rounded-md" />
                    <div><b>{m.name}</b><span className="pi-sub">{m.imageField ? 'Video + image' : 'Video in'}</span></div>
                  </button>
                ))}
              </Ctrl>
              <Ctrl id="asp" menu={menu} icon={<Icon d={<rect x="3" y="5" width="18" height="14" rx="2" />} />} label={<span className="cv">{aspect}</span>}>
                <div className="pop-h">Aspect ratio</div>
                <div className="pop-grid">{['16:9', '9:16', '1:1'].map(a => <button key={a} className={`pop-chip ${a === aspect ? 'sel' : ''}`} onClick={() => { setAspect(a); menu.setOpenId(null); }}>{a}</button>)}</div>
              </Ctrl>
              <div className="rail-spacer" />
              <button className="run-hero" disabled={busy || vBusy || iBusy} onClick={runTool}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 3l14 9-14 9z" /></svg>{busy ? 'Processing…' : 'Run tool'}
              </button>
            </div>
            <div style={{ padding: '0 12px 8px' }}><StepsView /></div>
          </div>

          <div className="style-grid" style={{ marginTop: 18, gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))' }}>
            {v2vModels.map(m => (
              <button key={m.id} className={`style-card ${m.id === modelId ? 'active' : ''}`} onClick={() => setModelId(m.id)}>
                <div className="cover" style={{ aspectRatio: '16/10' }}><ToolThumb name={m.name} /></div>
                <div className="sm"><span>{m.description.length > 88 ? m.description.slice(0, 88) + '…' : m.description}</span></div>
              </button>
            ))}
          </div>

          <div className="agent-lower" style={{ gridTemplateColumns: '1fr', marginTop: 18 }}>
            <div className="panel">
              <h2 style={{ marginBottom: 4 }}>Output</h2>
              <p style={{ color: 'var(--dim)', fontSize: 12, marginBottom: 12 }}>{model.description}</p>
              {result ? (
                <div style={{ maxWidth: 480 }}>
                  <div className="tile"><div className="art" style={{ aspectRatio: '16/9' }}><video src={result} muted loop autoPlay playsInline controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div></div>
                </div>
              ) : (
                <div className="canvas-empty"><span className="disp" style={{ fontSize: 14 }}>No output yet</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastHost />
    </CascadeShell>
  );
}
