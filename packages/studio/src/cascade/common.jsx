'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CASCADE_CSS } from './theme.js';
import { BRAND } from './catalog.js';
import { generateImage, generateVideo, generateI2V, uploadFile } from '../muapi.js';

// Wrapper that scopes the Cascade design system and keeps its <style> current.
export function CascadeShell({ children, className = '' }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    let el = document.getElementById('cascade-theme');
    if (!el) {
      el = document.createElement('style');
      el.id = 'cascade-theme';
      document.head.appendChild(el);
    }
    if (el.textContent !== CASCADE_CSS) el.textContent = CASCADE_CSS;
  }, []);
  return <div className={`cs-root ${className}`}>{children}</div>;
}

// Toast - matches Cascade's bottom-right pill.
export function useToast() {
  const [msg, setMsg] = useState(null);
  const t = useRef(null);
  const toast = useCallback((m) => {
    setMsg(m);
    clearTimeout(t.current);
    t.current = setTimeout(() => setMsg(null), 3400);
  }, []);
  const ToastHost = () => <div className={`toast ${msg ? 'show' : ''}`}>{msg}</div>;
  return { toast, ToastHost };
}

// Provider logo: favicon with duckduckgo fallback, then a brand monogram.
export function Logo({ dom, hue = [100, 50], className = '' }) {
  const [stage, setStage] = useState(0); // 0 google, 1 duckduckgo, 2 monogram
  const b = BRAND[dom] || ['·', '#333'];
  if (stage >= 2) {
    return (
      <div className={`mthumb ${className}`}>
        <div className="fb" style={{ display: 'flex', background: b[1], color: dom === 'elevenlabs.io' ? '#0a0a0b' : '#fff' }}>{b[0]}</div>
      </div>
    );
  }
  const src = stage === 0
    ? `https://www.google.com/s2/favicons?domain=${dom}&sz=64`
    : `https://icons.duckduckgo.com/ip3/${dom}.ico`;
  return (
    <div className={`mthumb ${className}`}>
      <img src={src} alt="" loading="lazy" onError={() => setStage(s => s + 1)} />
    </div>
  );
}

// Popover primitive. Tracks a single open menu; closes on outside click.
export function useMenu() {
  const [openId, setOpenId] = useState(null);
  useEffect(() => {
    const onDoc = (e) => { if (!e.target.closest('.ctrl')) setOpenId(null); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);
  const toggle = useCallback((id) => setOpenId(cur => (cur === id ? null : id)), []);
  return { openId, setOpenId, toggle };
}

export function Ctrl({ id, menu, children, label, icon, set, right, wide, style }) {
  const isOpen = menu.openId === id;
  return (
    <div className="ctrl">
      <button
        className={`ctrl-btn ${set ? 'set' : ''}`}
        onClick={(e) => { e.stopPropagation(); menu.toggle(id); }}
        type="button"
      >
        {icon}{label}
      </button>
      {isOpen && (
        <div className={`pop down ${right ? 'right' : ''}`} style={{ ...(wide ? { minWidth: 300 } : {}), ...style }} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
}

// Claude-style shimmering step runner.
export function useSteps() {
  const [steps, setSteps] = useState([]);
  const run = useCallback(async (list) => {
    const base = list.map(s => ({ label: s.label, status: 'idle' }));
    setSteps(base);
    for (let i = 0; i < list.length; i++) {
      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'active' } : s));
      let out;
      if (list[i].work) { try { out = await list[i].work(); } catch (e) { out = 'err'; } }
      else await new Promise(r => setTimeout(r, list[i].ms || 800));
      const doneLabel = list[i].doneLabel ? list[i].doneLabel(out) : null;
      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'done', label: doneLabel || s.label } : s));
    }
  }, []);
  const clear = useCallback(() => setSteps([]), []);
  const StepsView = () => (
    steps.length ? (
      <div>
        {steps.map((s, i) => (
          <div key={i} className={`astep ${s.status === 'active' ? 'active' : ''} ${s.status === 'done' ? 'done' : ''}`}>
            <div className="dot">
              {s.status === 'done' && (
                <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
            </div>
            <span className={s.status === 'active' ? 'shimmer-txt' : ''}>{s.label}</span>
          </div>
        ))}
      </div>
    ) : null
  );
  return { run, clear, StepsView, steps };
}

// ---------- MuAPI generation wrappers ----------
const clampDur = (m, s) => Math.min(Math.max(s, m.dur[0]), m.dur[1]);

export async function genImage(apiKey, { muapiId, prompt, aspect }) {
  const r = await generateImage(apiKey, { model: muapiId, prompt, aspect_ratio: aspect || '16:9' });
  return r.url || r.outputs?.[0];
}

export async function genVideo(apiKey, model, { prompt, aspect, seconds, res }) {
  const r = await generateVideo(apiKey, {
    model: model.t2v, prompt,
    aspect_ratio: aspect || '16:9',
    duration: clampDur(model, seconds || 5),
    resolution: res || model.res[0],
  });
  return r.url || r.outputs?.[0];
}

export async function genI2V(apiKey, model, { prompt, image_url, aspect, seconds, res }) {
  const r = await generateI2V(apiKey, {
    model: model.i2v, prompt, image_url,
    aspect_ratio: aspect || '16:9',
    duration: clampDur(model, seconds || 5),
    resolution: res || model.res[0],
  });
  return r.url || r.outputs?.[0];
}

// Upload a File or data-URL to MuAPI and return a hosted URL (needed for image-to-video).
export async function toHostedUrl(apiKey, fileOrDataUrl) {
  let file = fileOrDataUrl;
  if (typeof fileOrDataUrl === 'string') {
    const res = await fetch(fileOrDataUrl);
    const blob = await res.blob();
    file = new File([blob], 'upload.png', { type: blob.type || 'image/png' });
  }
  return uploadFile(apiKey, file);
}

export const esc = (s) => String(s == null ? '' : s);
