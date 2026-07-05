// Cascade design system - ported from the Cascade Studio prototype and scoped under
// `.cs-root` so it can live inside OpenField without leaking into the rest of the app.
// Injected once via <style> by CascadeShell. Acid-lime accent, Space Grotesk display.

export const CASCADE_CSS = `
.cs-root{
  --bg:#0a0a0b; --panel:#131316; --panel-2:#1a1a1f; --line:#26262b; --line-2:#333339;
  --text:#f2f2f3; --muted:#9a9aa2; --dim:#5b5b63;
  --acid:#d9ff3f; --acid-dim:rgba(217,255,63,.12);
  --jade:#4ade80; --rose:#f87171;
  color:var(--text);font-family:var(--font-space), 'Space Grotesk','Inter',system-ui,sans-serif;font-size:13.5px;
  height:100%;overflow-y:auto;position:relative;
}
.cs-root *{box-sizing:border-box}
.cs-root button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
.cs-root input,.cs-root select,.cs-root textarea{font-family:inherit;color:var(--text);background:var(--panel-2);border:1px solid var(--line);border-radius:8px;padding:9px 12px;font-size:13px;outline:none;width:100%}
.cs-root input:focus,.cs-root select:focus,.cs-root textarea:focus{border-color:rgba(217,255,63,.4);background:#1e1e24;box-shadow:0 0 0 3px rgba(217,255,63,.06)}
.cs-root h1,.cs-root h2,.cs-root .disp{font-family:var(--font-space), 'Space Grotesk',sans-serif}
.cs-root .mono{font-family:var(--font-space), 'Space Grotesk',monospace}

.cs-root .stage{padding:24px}
.cs-root .page{padding:0;max-width:1240px;margin:0 auto;animation:csrise .3s cubic-bezier(.2,.7,.3,1)}
@keyframes csrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes cspop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}

.cs-root .eyebrow{font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);font-weight:600;margin-bottom:6px}
.cs-root .hero h1{font-size:22px;font-weight:700;letter-spacing:-.01em}
.cs-root .hero p{color:var(--muted);margin-top:5px;max-width:640px;line-height:1.55}
.cs-root .hero{margin-bottom:18px}
.cs-root .panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px;box-shadow:0 1px 0 rgba(255,255,255,.02),0 0 0 1px rgba(217,255,63,.015)}
.cs-root .panel h2{font-size:14px;font-weight:600;margin-bottom:14px}

.cs-root .shimmer-txt{background:linear-gradient(90deg,var(--dim) 20%,var(--text) 50%,var(--dim) 80%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:csshtext 1.5s linear infinite}
@keyframes csshtext{to{background-position:-200% 0}}
.cs-root .astep{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:12.5px;color:var(--dim);opacity:.45;transition:.25s}
.cs-root .astep.active,.cs-root .astep.done{opacity:1}
.cs-root .astep .dot{width:14px;height:14px;border-radius:50%;border:1.5px solid var(--line-2);flex:none;display:flex;align-items:center;justify-content:center;font-size:9px;transition:.25s}
.cs-root .astep.active .dot{border-color:var(--acid);box-shadow:0 0 8px rgba(217,255,63,.25)}
.cs-root .astep.done .dot{border-color:rgba(74,222,128,.4);background:transparent;color:var(--jade);opacity:.85}
.cs-root .astep.done{color:var(--muted)}

.cs-root .mthumb{width:42px;height:42px;border-radius:9px;flex:none;background:var(--panel-2);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;overflow:hidden}
.cs-root .mthumb img{width:26px;height:26px;object-fit:contain}
.cs-root .mthumb .fb{width:100%;height:100%;display:none;align-items:center;justify-content:center;font-family:var(--font-space), 'Space Grotesk';font-weight:700;font-size:14px;letter-spacing:-.02em;color:#fff}
.cs-root .mthumb.pi-logo{width:22px;height:22px;border-radius:6px}
.cs-root .mthumb.pi-logo img{width:15px;height:15px}
.cs-root .mthumb.pi-logo .fb{font-size:10px}

.cs-root .field{margin-bottom:12px}
.cs-root .field label{display:block;font-size:11px;color:var(--muted);margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase;font-weight:600}
.cs-root .seg{display:flex;gap:5px;flex-wrap:wrap}
.cs-root .seg button{padding:6px 12px;border:1px solid var(--line);border-radius:7px;font-size:12px;color:var(--muted);transition:.12s}
.cs-root .seg button.active{border-color:var(--acid);color:var(--acid);background:var(--acid-dim)}
.cs-root .dur-row{display:flex;align-items:center;gap:12px}
.cs-root input[type=range]{appearance:none;-webkit-appearance:none;height:4px;border-radius:2px;background:var(--line-2);padding:0;border:none;flex:1}
.cs-root input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;border-radius:50%;background:var(--acid);cursor:pointer}
.cs-root .dur-val{font-family:var(--font-space), 'Space Grotesk';font-size:13px;min-width:36px;text-align:right}
.cs-root .toggle{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid var(--line);border-radius:8px;font-size:12.5px;color:var(--muted)}

.cs-root .btn{padding:11px 22px;border-radius:10px;background:var(--text);color:#0a0a0b;font-weight:600;font-size:13.5px;transition:.16s;white-space:nowrap}
.cs-root .btn:hover{background:var(--acid);transform:translateY(-1px);box-shadow:0 6px 20px rgba(217,255,63,.18)}
.cs-root .btn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.cs-root .btn.ghost{background:var(--panel-2);color:var(--muted);border:1px solid var(--line)}
.cs-root .btn.ghost:hover{color:var(--text);border-color:var(--line-2);background:var(--panel-2);box-shadow:none;transform:none}
.cs-root .btn.sm{padding:8px 14px;font-size:12px;border-radius:8px}

.cs-root .tile{border-radius:11px;overflow:hidden;border:1px solid var(--line);background:var(--panel-2);position:relative;animation:cspop .35s cubic-bezier(.2,.7,.3,1);transition:.16s;cursor:pointer}
.cs-root .tile:hover{transform:translateY(-2px);border-color:rgba(217,255,63,.25);box-shadow:0 0 22px -10px rgba(217,255,63,.22)}
.cs-root .tile .art{aspect-ratio:16/10;background-size:cover;background-position:center}
.cs-root .tile.busy .art{background:linear-gradient(110deg,var(--panel-2) 30%,var(--line) 45%,var(--panel-2) 60%);background-size:220% 100%;animation:csshim 1.1s linear infinite}
@keyframes csshim{to{background-position:-220% 0}}
.cs-root .tile-meta{padding:9px 11px;border-top:1px solid var(--line)}
.cs-root .tile-meta b{font-size:12px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
.cs-root .tile-meta span{font-size:10.5px;color:var(--muted);font-family:var(--font-space), 'Space Grotesk'}
.cs-root .badge{position:absolute;top:7px;left:7px;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:5px;background:rgba(10,10,11,.8);backdrop-filter:blur(4px);color:var(--acid);font-weight:600;z-index:2}
.cs-root .play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:rgba(10,10,11,.65);display:flex;align-items:center;justify-content:center}
.cs-root .play::after{content:"";border-left:11px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent;margin-left:3px}
.cs-root .tile .err,.cs-root .art .err{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:10px;font-size:11px;color:#ff9a8a;background:rgba(30,10,10,.6)}
.cs-root .results{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;align-content:start}
.cs-root .canvas-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--dim);gap:10px;min-height:180px}
.cs-root .canvas-empty .disp{font-size:16px;color:var(--muted)}

.cs-root .ledger{display:grid;gap:8px;margin-top:12px;border-top:1px dashed var(--line-2);padding-top:12px}
.cs-root .ledger>div{display:flex;justify-content:space-between;font-size:12.5px}
.cs-root .ledger .k{color:var(--muted)}
.cs-root .ledger .v{font-family:var(--font-space), 'Space Grotesk'}
.cs-root .total-row{border-top:1px solid var(--line-2);padding-top:10px;margin-top:4px}
.cs-root .total-row .v{font-size:17px;color:var(--acid)}

.cs-root .scene{border:1px solid var(--line);border-radius:11px;padding:12px;margin-bottom:9px;background:var(--panel-2)}
.cs-root .scene-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.cs-root .scene-top b{font-size:12px;font-weight:600}
.cs-root .scene-top .sc{font-family:var(--font-space), 'Space Grotesk';font-size:11px;color:var(--acid);white-space:nowrap}
.cs-root .scene p{font-size:12px;color:var(--muted);margin-top:5px;line-height:1.5}
.cs-root .scene .status{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;margin-top:8px;font-weight:600;color:var(--dim)}
.cs-root .scene.done .status{color:var(--jade)}
.cs-root .frames{display:flex;gap:6px;margin-top:8px}
.cs-root .frame{width:52px;height:34px;border-radius:5px;background:var(--line);flex:none;overflow:hidden;animation:cspop .3s ease}
.cs-root .pipe-opt{display:flex;gap:10px;margin-top:6px}
.cs-root .pipe-card{flex:1;padding:12px;border:1px solid var(--line);border-radius:11px;text-align:left;transition:.13s}
.cs-root .pipe-card:hover{border-color:var(--line-2)}
.cs-root .pipe-card.active{border-color:var(--acid);background:var(--acid-dim)}

.cs-root select{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' fill='none' stroke='%239a9aa2' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px;cursor:pointer}

.cs-root .agent-stage{max-width:920px;margin:0 auto;padding-top:8px}
.cs-root .agent-head{text-align:center;margin-bottom:22px}
.cs-root .agent-head .eyebrow{margin-bottom:8px}
.cs-root .agent-head h1{font-size:30px;font-weight:700;letter-spacing:-.02em;line-height:1.05}
.cs-root .agent-head h1 .grad{background:linear-gradient(90deg,#fff,#d9ff3f);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs-root .agent-head p{color:var(--muted);margin-top:8px;font-size:13.5px}

.cs-root .hero-box{background:linear-gradient(180deg,#16161b,#111116);border:1px solid var(--line-2);border-radius:20px;padding:8px;box-shadow:0 24px 60px -20px rgba(0,0,0,.7),0 0 0 1px rgba(217,255,63,.04);position:relative;transition:.2s}
.cs-root .hero-box:focus-within{border-color:rgba(217,255,63,.4);box-shadow:0 24px 60px -20px rgba(0,0,0,.7),0 0 34px -6px rgba(217,255,63,.16)}
.cs-root .hero-box textarea{border:none;background:transparent;resize:none;min-height:88px;max-height:200px;padding:14px 16px 4px;font-size:16.5px;line-height:1.5;font-family:var(--font-space), 'Space Grotesk',sans-serif}
.cs-root .hero-box textarea:focus{border:none;background:transparent;box-shadow:none;outline:none}
.cs-root .hero-box textarea::placeholder{color:#55555f}

.cs-root .rail{display:flex;align-items:center;gap:7px;flex-wrap:wrap;padding:8px 8px 6px}
.cs-root .ctrl{position:relative}
.cs-root .ctrl-btn{display:flex;align-items:center;gap:7px;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--panel-2);font-size:12px;color:var(--muted);transition:.14s;white-space:nowrap}
.cs-root .ctrl-btn:hover{border-color:var(--line-2);color:var(--text)}
.cs-root .ctrl-btn.set{border-color:rgba(217,255,63,.4);color:var(--acid);background:var(--acid-dim)}
.cs-root .ctrl-btn svg{width:14px;height:14px;opacity:.8;flex:none}
.cs-root .ctrl-btn .cv{color:var(--text);font-weight:500}
.cs-root .ctrl-btn.set .cv{color:var(--acid)}
.cs-root .rail-spacer{flex:1}
.cs-root .run-hero{padding:10px 20px;border-radius:11px;background:var(--acid);color:#0a0a0b;font-weight:700;font-size:13.5px;transition:.16s;display:flex;align-items:center;gap:8px}
.cs-root .run-hero svg{width:15px;height:15px}
.cs-root .run-hero:hover{filter:brightness(1.06);transform:translateY(-1px);box-shadow:0 8px 24px rgba(217,255,63,.28)}
.cs-root .run-hero:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}

.cs-root .pop{position:absolute;bottom:calc(100% + 8px);left:0;min-width:230px;max-height:min(66vh,520px);overflow-y:auto;overscroll-behavior:contain;background:#17171c;border:1px solid var(--line-2);border-radius:13px;padding:8px;box-shadow:0 18px 40px -10px rgba(0,0,0,.75);z-index:40;animation:cspop .15s ease}
.cs-root .pop.right{left:auto;right:0}
.cs-root .pop.down{top:calc(100% + 8px);bottom:auto}
.cs-root .pop-h{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);font-weight:600;padding:4px 8px 6px}
.cs-root .pop-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:8px 9px;border-radius:8px;font-size:12.5px;color:var(--muted);transition:.1s}
.cs-root .pop-item:hover{background:var(--panel-2);color:var(--text)}
.cs-root .pop-item.sel{color:var(--acid);background:var(--acid-dim)}
.cs-root .pop-item .pi-sub{font-size:10.5px;color:var(--dim);display:block}
.cs-root .pop-item .pi-price{margin-left:auto;font-family:var(--font-space), 'Space Grotesk';font-size:10.5px;color:var(--acid)}
.cs-root .pop-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.cs-root .pop-chip{padding:7px 6px;border:1px solid var(--line);border-radius:8px;font-size:11.5px;color:var(--muted);text-align:center;transition:.1s}
.cs-root .pop-chip:hover{border-color:var(--line-2);color:var(--text)}
.cs-root .pop-chip.sel{border-color:var(--acid);color:var(--acid);background:var(--acid-dim)}
.cs-root .pop .dur-row{padding:8px}
.cs-root .pop-note{font-size:10.5px;color:var(--dim);padding:6px 9px 2px;line-height:1.4}

.cs-root .agent-lower{display:grid;grid-template-columns:1.2fr 1fr;gap:16px;margin-top:22px}
.cs-root .suggest-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px;justify-content:center}
.cs-root .suggest{padding:7px 13px;border:1px solid var(--line);border-radius:99px;font-size:12px;color:var(--muted);transition:.13s}
.cs-root .suggest:hover{border-color:var(--acid);color:var(--acid)}
.cs-root .cost-line{font-family:var(--font-space), 'Space Grotesk';font-size:11.5px;color:var(--muted);white-space:nowrap}
.cs-root .cost-line b{color:var(--acid);font-weight:500}

.cs-root .preset-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}
.cs-root .preset-card{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--panel);text-align:left;transition:.16s;width:100%;position:relative}
.cs-root .preset-card:hover{transform:translateY(-3px);border-color:rgba(217,255,63,.28);box-shadow:0 12px 34px -14px rgba(217,255,63,.22)}
.cs-root .preset-card.active{border-color:rgba(217,255,63,.55);box-shadow:0 0 26px -8px rgba(217,255,63,.32)}
.cs-root .preset-card .pv{aspect-ratio:4/5;position:relative;overflow:hidden;background:#101015}
.cs-root .preset-card .pv img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.cs-root .pv-after{position:absolute;inset:0;overflow:hidden;clip-path:inset(0 0 0 50%)}
.cs-root .pv-tag{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;letter-spacing:.08em;padding:2px 7px;border-radius:5px;background:rgba(217,255,63,.92);color:#0a0a0b;font-family:var(--font-space), 'Space Grotesk'}
.cs-root .preset-card .pv .split{position:absolute;top:0;bottom:0;left:50%;width:2px;margin-left:-1px;background:rgba(255,255,255,.85);box-shadow:0 0 7px rgba(0,0,0,.6);pointer-events:none}
.cs-root .preset-card .pv .split .split-h{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;color:#111}
@keyframes csPush{from{transform:scale(1)}to{transform:scale(1.18)}}
@keyframes csZoom{0%{transform:scale(1)}55%{transform:scale(1.36)}100%{transform:scale(1)}}
@keyframes csOrbit{0%{transform:translateX(-4%) scale(1.1) rotate(-1.2deg)}100%{transform:translateX(4%) scale(1.1) rotate(1.2deg)}}
@keyframes csCrane{from{transform:translateY(7%) scale(1.16)}to{transform:translateY(-3%) scale(1.02)}}
@keyframes csFloat{0%{transform:translateY(-2.5%) scale(1.07)}100%{transform:translateY(2.5%) scale(1.07)}}
@keyframes csShake{0%,100%{transform:translate(0,0) scale(1.07)}20%{transform:translate(1.2%,-1%) scale(1.07)}40%{transform:translate(-1%,1.2%) scale(1.07)}60%{transform:translate(1%,1%) scale(1.07)}80%{transform:translate(-1.2%,-.8%) scale(1.07)}}
@keyframes csFly{from{transform:scale(1.02)}to{transform:scale(1.42)}}
@keyframes csReveal{0%{transform:translateX(-9%) scale(1.12)}35%,100%{transform:translateX(0) scale(1.02)}}
@keyframes csBullet{from{transform:rotate(-2.2deg) scale(1.09)}to{transform:rotate(2.2deg) scale(1.09)}}
@keyframes csHero{from{transform:translateY(5%) scale(1.13)}to{transform:translateY(-2%) scale(1.03)}}
.cs-root .pv-anim-push{animation:csPush 3.6s ease-in-out infinite alternate}
.cs-root .pv-anim-zoom{animation:csZoom 2.4s ease-in-out infinite}
.cs-root .pv-anim-orbit{animation:csOrbit 3.8s ease-in-out infinite alternate}
.cs-root .pv-anim-crane{animation:csCrane 3.8s ease-in-out infinite alternate}
.cs-root .pv-anim-float{animation:csFloat 3.4s ease-in-out infinite alternate}
.cs-root .pv-anim-shake{animation:csShake 1.2s steps(5) infinite}
.cs-root .pv-anim-flythru{animation:csFly 3.6s ease-in-out infinite alternate}
.cs-root .pv-anim-reveal{animation:csReveal 3.2s ease-out infinite alternate}
.cs-root .pv-anim-bullet{animation:csBullet 4s ease-in-out infinite alternate}
.cs-root .pv-anim-hero{animation:csHero 3.8s ease-in-out infinite alternate}
.cs-root .preset-card .pro{position:absolute;bottom:8px;left:8px;font-family:var(--font-space), 'Space Grotesk';font-size:10px;font-weight:700;letter-spacing:.06em;padding:3px 9px;border-radius:6px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff}
.cs-root .preset-card .pl{padding:12px 13px 14px}
.cs-root .preset-card .pl b{font-size:14px;display:block;font-family:var(--font-space), 'Space Grotesk';font-weight:600}
.cs-root .preset-card .pl span{font-size:11.5px;color:var(--muted);display:block;margin-top:4px;line-height:1.4}
.cs-root .preset-drop{width:78px;height:78px;flex:none;border:1.5px dashed var(--line-2);border-radius:11px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10.5px;color:var(--dim);cursor:pointer;position:relative;background-size:cover;background-position:center;transition:.15s}
.cs-root .preset-drop:hover{border-color:rgba(217,255,63,.4)}
.cs-root .preset-drop input{position:absolute;inset:0;opacity:0;cursor:pointer}

.cs-root .sb-frames{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:14px}
.cs-root .sb-frame{border:1px solid var(--line);border-radius:11px;overflow:hidden;background:var(--panel-2);animation:cspop .4s ease}
.cs-root .sb-frame .art{aspect-ratio:16/9;background-size:cover;background-position:center}
.cs-root .sb-frame.busy .art{background:linear-gradient(110deg,var(--panel-2) 30%,var(--line) 45%,var(--panel-2) 60%);background-size:220% 100%;animation:csshim 1.1s linear infinite}
.cs-root .sb-frame .cap{padding:9px 11px;border-top:1px solid var(--line)}
.cs-root .sb-frame .cap b{font-size:11px;color:var(--acid);font-family:var(--font-space), 'Space Grotesk';display:block;margin-bottom:3px}
.cs-root .sb-frame .cap p{font-size:11.5px;color:var(--muted);line-height:1.45}

.cs-root .chips{display:flex;gap:6px;flex-wrap:wrap}
.cs-root .script-out{white-space:pre-wrap;font-size:13px;line-height:1.7;color:var(--text);background:var(--panel-2);border:1px solid var(--line);border-radius:11px;padding:16px;max-height:52vh;overflow-y:auto}
.cs-root .script-out .h{color:var(--acid);font-weight:600}

.cs-root .style-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
.cs-root .style-card{border:1px solid var(--line);border-radius:13px;overflow:hidden;background:var(--panel);text-align:left;transition:.16s;width:100%}
.cs-root .style-card:hover{transform:translateY(-3px);border-color:rgba(217,255,63,.25);box-shadow:0 10px 30px -12px rgba(217,255,63,.2)}
.cs-root .style-card.active{border-color:rgba(217,255,63,.55);box-shadow:0 0 24px -8px rgba(217,255,63,.3)}
.cs-root .style-card .cover{aspect-ratio:4/5;position:relative;overflow:hidden;background:#0e0e12}
.cs-root .style-card .cover svg{width:100%;height:100%;display:block;transition:.25s}
.cs-root .style-card:hover .cover svg{transform:scale(1.04)}
.cs-root .style-card .sm{padding:10px 12px;border-top:1px solid var(--line)}
.cs-root .style-card .sm b{font-size:12.5px;display:block}
.cs-root .style-card .sm span{font-size:10.5px;color:var(--muted);display:block;margin-top:3px;line-height:1.4}
.cs-root .note{margin-top:14px;padding:12px 14px;border-radius:10px;background:var(--panel-2);border:1px solid var(--line);font-size:12px;color:var(--muted);line-height:1.65}
.cs-root .note b{color:var(--text)}

.cs-root .drop{border:1.5px dashed var(--line-2);border-radius:11px;padding:16px;text-align:center;color:var(--dim);font-size:12px;cursor:pointer;transition:.15s;position:relative}
.cs-root .drop:hover{border-color:rgba(217,255,63,.4);color:var(--muted)}
.cs-root .drop input{position:absolute;inset:0;opacity:0;cursor:pointer}

.cs-root .cap-opt{border:1px solid var(--line);border-radius:9px;overflow:hidden;text-align:left;background:var(--panel-2);transition:.12s;cursor:pointer}
.cs-root .cap-opt:hover{border-color:var(--line-2)}
.cs-root .cap-opt.sel{border-color:var(--acid);box-shadow:0 0 0 1px var(--acid) inset}
.cs-root .cap-demo{height:44px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#26263a,#0d0d13);overflow:hidden}
.cs-root .cap-demo-txt{font-family:var(--font-space), 'Space Grotesk';font-weight:700;font-size:12px;color:#fff;text-shadow:0 1px 2px #000;white-space:nowrap;display:inline-block}
.cs-root .cap-meta{padding:6px 8px}
.cs-root .cap-meta b{font-size:11.5px;display:block;color:var(--text)}
.cs-root .cap-meta span{font-size:9.5px;color:var(--dim)}
@keyframes csCapPop{0%,100%{transform:scale(.5);opacity:0}14%{transform:scale(1.18);opacity:1}28%,82%{transform:scale(1);opacity:1}}
.cs-root .cap-anim-pop{animation:csCapPop 2.6s infinite}
@keyframes csCapFadeUp{0%,100%{opacity:0;transform:translateY(12px)}20%,84%{opacity:1;transform:translateY(0)}}
.cs-root .cap-anim-fadeup{animation:csCapFadeUp 2.6s infinite}
@keyframes csCapClean{0%,100%{opacity:0}18%,84%{opacity:1}}
.cs-root .cap-anim-clean{animation:csCapClean 2.6s infinite}
.cs-root .cap-anim-boxed{background:var(--acid);color:#0a0a0b;padding:3px 8px;border-radius:6px;text-shadow:none;animation:csCapClean 2.6s infinite}
@keyframes csCapType{0%{clip-path:inset(0 100% 0 0)}12%{clip-path:inset(0 62% 0 0)}26%{clip-path:inset(0 30% 0 0)}40%,84%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 100% 0 0)}}
.cs-root .cap-anim-wordup{animation:csCapType 2.6s infinite}
@keyframes csCapSweep{0%{background-position:100% 0}68%,100%{background-position:0 0}}
.cs-root .cap-anim-karaoke{color:transparent;-webkit-background-clip:text;background-clip:text;background-image:linear-gradient(90deg,var(--acid) 50%,#fff 50%);background-size:200% 100%;background-position:100% 0;animation:csCapSweep 2.6s infinite}
.cs-root .cap-anim-none{opacity:.4}
.cs-root .cap-anim-pop,.cs-root .cap-anim-boxed{font-size:15px}
.cs-root .cap-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}

.cs-root .toast{position:fixed;bottom:20px;right:20px;background:var(--panel-2);border:1px solid var(--acid);padding:12px 18px;border-radius:10px;font-size:12.5px;opacity:0;transform:translateY(8px);transition:.25s;pointer-events:none;z-index:60;max-width:360px}
.cs-root .toast.show{opacity:1;transform:none}

.cs-root .voice-item{align-items:center}
.cs-root .voice-play{margin-left:auto;width:26px;height:26px;border-radius:7px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--muted);flex:none;transition:.12s;cursor:pointer}
.cs-root .voice-play:hover{border-color:var(--acid);color:var(--acid)}

/* Features showcase */
.cs-root .feat-hero{text-align:center;max-width:760px;margin:10px auto 34px}
.cs-root .feat-hero h1{font-size:38px;font-weight:700;letter-spacing:-.02em;line-height:1.05}
.cs-root .feat-hero h1 .grad{background:linear-gradient(90deg,#fff,#d9ff3f);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs-root .feat-hero p{color:var(--muted);margin-top:12px;font-size:15px;line-height:1.6}
.cs-root .feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.cs-root .feat-card{border:1px solid var(--line);border-radius:16px;background:var(--panel);padding:22px;text-align:left;transition:.16s;position:relative;overflow:hidden}
.cs-root .feat-card:hover{transform:translateY(-3px);border-color:rgba(217,255,63,.3);box-shadow:0 16px 40px -18px rgba(217,255,63,.25)}
.cs-root .feat-ic{width:44px;height:44px;border-radius:12px;background:var(--acid-dim);border:1px solid rgba(217,255,63,.3);display:flex;align-items:center;justify-content:center;color:var(--acid);margin-bottom:16px}
.cs-root .feat-ic svg{width:22px;height:22px}
.cs-root .feat-card h3{font-family:var(--font-space), 'Space Grotesk';font-size:16px;font-weight:600;margin-bottom:7px}
.cs-root .feat-card p{font-size:12.5px;color:var(--muted);line-height:1.6}
.cs-root .feat-card .feat-go{margin-top:14px;font-size:12px;color:var(--acid);font-weight:600;display:inline-flex;align-items:center;gap:5px;opacity:0;transition:.16s}
.cs-root .feat-card:hover .feat-go{opacity:1}
.cs-root .feat-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin:0 auto 32px;max-width:900px}
.cs-root .feat-stat{border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:18px 20px;text-align:center}
.cs-root .feat-stat b{font-family:var(--font-space), 'Space Grotesk';font-size:26px;color:var(--acid);display:block}
.cs-root .feat-stat span{font-size:11.5px;color:var(--muted);letter-spacing:.04em;text-transform:uppercase;margin-top:4px;display:block}

@media (max-width:960px){
  .cs-root .agent-lower{grid-template-columns:1fr}
}

/* ── Corner radii aligned to OpenField's cards & buttons ──
   OpenField cards/panels ≈ 12px, primary buttons/controls ≈ 8px. Override the
   Cascade defaults so the added modules match the rest of the app.          */
.cs-root .panel,
.cs-root .tile,
.cs-root .style-card,
.cs-root .style-card .cover,
.cs-root .preset-card,
.cs-root .preset-card .pv,
.cs-root .sb-frame,
.cs-root .mcard,
.cs-root .script-out,
.cs-root .drop,
.cs-root .note,
.cs-root .pop,
.cs-root .feat-card,
.cs-root .feat-stat { border-radius: 12px !important; }
.cs-root .hero-box { border-radius: 14px !important; }
.cs-root .btn,
.cs-root .btn.sm,
.cs-root .run-hero,
.cs-root .ctrl-btn,
.cs-root .pop-chip,
.cs-root .pop-item,
.cs-root .cap-opt,
.cs-root .seg button,
.cs-root .chip-btn,
.cs-root .suggest,
.cs-root .feat-ic,
.cs-root .mthumb { border-radius: 8px !important; }
.cs-root .frame { border-radius: 6px !important; }

/* ── Video-Tool thumbnails: the tool title, animated, in lime + Space Grotesk ── */
.cs-root .vt-cover{position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:0 16px;background:radial-gradient(circle at 50% 35%,#191b24,#0b0c11)}
.cs-root .vt-title{font-family:var(--font-space), 'Space Grotesk',sans-serif;font-weight:700;font-size:17px;line-height:1.15;letter-spacing:.01em;text-align:center;color:var(--acid);animation:vtGlow 2.8s ease-in-out infinite}
@keyframes vtGlow{0%,100%{opacity:.6;text-shadow:0 0 6px rgba(217,255,63,.2);transform:translateY(1px)}50%{opacity:1;text-shadow:0 0 18px rgba(217,255,63,.55);transform:translateY(-1px)}}
`;
