'use client';
import React, { useState } from 'react';

// Infer the provider (and a brand domain for its favicon) from a MuAPI model's
// name/id. Used to show real AI-provider logos on every model card in OpenField.
const RULES = [
  [/nano-banana|imagen|gemini|veo|google/i,        'gemini.google.com'],
  [/gpt-image|gpt4o|sora|openai|dall/i,            'openai.com'],
  [/flux/i,                                        'bfl.ai'],
  [/seedance|seedream|bytedance|byteplus|dreamina/i,'byteplus.com'],
  [/kling/i,                                       'klingai.com'],
  [/hailuo|minimax/i,                              'minimaxi.com'],
  [/qwen/i,                                        'qwen.ai'],
  [/wan\b|wan[0-9]|tongyi|alibaba/i,               'alibaba.com'],
  [/ideogram/i,                                    'ideogram.ai'],
  [/midjourney/i,                                  'midjourney.com'],
  [/grok|xai/i,                                    'x.ai'],
  [/hunyuan|tencent/i,                             'hunyuan.tencent.com'],
  [/runway/i,                                      'runwayml.com'],
  [/pixverse/i,                                    'pixverse.ai'],
  [/vidu/i,                                        'vidu.com'],
  [/luma|ray\b/i,                                  'lumalabs.ai'],
  [/ltx|lightricks/i,                              'lightricks.com'],
  [/leonardo/i,                                    'leonardo.ai'],
  [/reve/i,                                        'reve.art'],
  [/ideogram/i,                                    'ideogram.ai'],
  [/sdxl|stable|sd-|stability/i,                   'stability.ai'],
  [/ovi/i,                                         'characterai.io'],
  [/elevenlabs|eleven/i,                           'elevenlabs.io'],
  [/suno/i,                                        'suno.com'],
  [/mmaudio|audio|music|tts|speech|voice/i,        'elevenlabs.io'],
];

export function inferProviderDomain(model) {
  const s = `${model?.id || ''} ${model?.name || ''} ${model?.endpoint || ''}`;
  for (const [re, dom] of RULES) if (re.test(s)) return dom;
  return null;
}

// A small provider logo: favicon (Google → DuckDuckGo) with a monogram fallback.
export function ModelLogo({ model, size = 40, rounded = 'rounded-full', className = '' }) {
  const dom = inferProviderDomain(model);
  const [stage, setStage] = useState(dom ? 0 : 2);
  const letter = (model?.name || '?').charAt(0).toUpperCase();
  const px = { width: size, height: size };

  if (stage >= 2) {
    return (
      <div style={px} className={`${rounded} bg-[#d9ff3f]/10 text-[#d9ff3f] border border-white/5 flex items-center justify-center font-bold text-xs uppercase ${className}`}>
        {letter}
      </div>
    );
  }
  const src = stage === 0
    ? `https://www.google.com/s2/favicons?domain=${dom}&sz=64`
    : `https://icons.duckduckgo.com/ip3/${dom}.ico`;
  return (
    <div style={px} className={`${rounded} bg-white/[0.04] border border-white/5 flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        width={Math.round(size * 0.58)}
        height={Math.round(size * 0.58)}
        style={{ objectFit: 'contain' }}
        onError={() => setStage(s => s + 1)}
      />
    </div>
  );
}
