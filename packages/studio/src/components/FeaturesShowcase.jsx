'use client';
import React from 'react';
import { CascadeShell } from '../cascade/common.jsx';

const P = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;

const FEATURES = [
  { tab: 'image', title: 'Image Studio', desc: 'Generate and edit images across 50+ models - Nano Banana, GPT Image 2, Seedream, Imagen and more.', icon: <P d={<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>} /> },
  { tab: 'video', title: 'Video Studio', desc: 'Text-to-video and image-to-video with Seedance, Kling, Veo, Sora and Hailuo - up to 1080p.', icon: <P d={<><path d="M15 10l5-3v10l-5-3zM3 6h12v12H3z" /></>} /> },
  { tab: 'film-agent', title: 'Film Agent', desc: 'Describe a film in one sentence. The agent writes the shot list, storyboards keyframes, then animates every scene.', icon: <P d={<path d="M2 8l4-4 3 3M2 8v11a1 1 0 001 1h18a1 1 0 001-1V8zM2 8h20l-4-4-3 3-3-3-3 3" />} /> },
  { tab: 'storyboard', title: 'Storyboard', desc: 'One prompt in, a full shot-listed board out - every frame rendered live on your image model.', icon: <P d={<><rect x="3" y="4" width="7" height="7" /><rect x="14" y="4" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>} /> },
  { tab: 'scripts', title: 'Scripts', desc: 'Viral, platform-tuned scripts - engineered hooks, retention beats and CTAs, ready for the film agent.', icon: <P d={<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />} /> },
  { tab: 'reels', title: 'Reels Factory', desc: '12 faceless reel styles - script, visuals and voiceover in one click, output as vertical video.', icon: <P d={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>} /> },
  { tab: 'cinema', title: 'Cinema Studio', desc: 'Compile real camera language - body, lens, aperture, movement, lighting and grade - into every prompt.', icon: <P d={<><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /></>} /> },
  { tab: 'marketing', title: 'Marketing Studio', desc: 'Product-referenced ad videos with omni-reference models - turn assets into scroll-stopping creative.', icon: <P d={<><path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 11-5.8-1.6" /></>} /> },
  { tab: 'reels', title: 'Motion Presets', desc: 'One-tap camera moves - orbit, crane, bullet-time, fly-through - applied to any start image.', icon: <P d={<><path d="M5 3l14 9-14 9z" /></>} /> },
  { tab: 'workflows', title: 'Workflows', desc: 'Chain models into reusable pipelines - script → storyboard → animate → publish, on autopilot.', icon: <P d={<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6.5h4a3 3 0 013 3V14" /></>} /> },
  { tab: 'lipsync', title: 'Lip Sync', desc: 'Drive any face or video with audio - natural, frame-accurate lip synchronization.', icon: <P d={<><path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v3" /></>} /> },
  { tab: 'clipping', title: 'AI Clipping', desc: 'Turn long videos into vertical highlight clips automatically - reframed and ready to post.', icon: <P d={<><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></>} /> },
];

const STATS = [
  { n: '200+', l: 'AI models' },
  { n: '12', l: 'Faceless reel styles' },
  { n: '1080p', l: 'Max video output' },
  { n: '1-click', l: 'Script → film' },
];

export default function FeaturesShowcase({ onNavigate }) {
  return (
    <CascadeShell>
      <div className="stage">
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="feat-hero">
            <div className="eyebrow">Everything in one studio</div>
            <h1>One platform. <span className="grad">Every generative tool.</span></h1>
            <p>Image, video, cinema, lip sync, faceless reels, a script-to-film agent and more - all powered by your MuAPI key, all in a single lime-lit studio.</p>
          </div>

          <div className="feat-stats">
            {STATS.map(s => <div key={s.l} className="feat-stat"><b>{s.n}</b><span>{s.l}</span></div>)}
          </div>

          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <button key={i} className="feat-card" onClick={() => onNavigate && onNavigate(f.tab)}>
                <div className="feat-ic">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feat-go">Open {f.title} <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CascadeShell>
  );
}
