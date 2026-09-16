(()=>{
const K='magnetMayhemSave',read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}},write=s=>localStorage.setItem(K,JSON.stringify(s));
let lastLevel=0,bossPulse=0,missionTick=0,comboBest=1;
const THEMES=[
 {name:'NEON GRID',hazard:1,core:1},
 {name:'ORBITAL',hazard:1.18,core:1},
 {name:'CROSSWIND',hazard:1.28,core:1},
 {name:'CORE STORM',hazard:1.42,core:1.08},
 {name:'VOID SHIFT',hazard:1.55,core:1.12}
];
function theme(){return THEMES[Math.floor(((g?.n||1)-1)/8)%THEMES.length]}
function saveMeta(){const s=read();s.meta=s.meta||{runs:0,comboBest:0,bosses:0,cores:0};s.meta.comboBest=Math.max(s.meta.comboBest||0,comboBest);write(s)}
function newRun(){if(typeof g==='undefined'||!g)return;const t=theme();g.theme=t.name;g.themeHazard=t.hazard;g.themeCore=t.core;g.runCores=g.cores.length;g.nearMiss=0;g.magnetPulse=0;missionTick=0;if(g.n%10===0){g.bossPhase=0;g.bossTarget=2;g.bossShield=3}}
const oldStart=window.start;
if(typeof oldStart==='function')window.start=function(n){oldStart(n);newRun();const s=read();s.meta=s.meta||{runs:0,comboBest:0,bosses:0,cores:0};s.meta.runs=(s.meta.runs||0)+1;write(s)};
function step(){if(typeof g==='undefined'||!g)return;const t=theme();if(g.theme!==t.name)newRun();if(g.over)return;comboBest=Math.max(comboBest,g.combo||1);g.magnetPulse=(g.magnetPulse||0)+.035;missionTick+=.016;
 if(g.n%10===0&&!g.paused){g.bossPhase=(g.bossPhase||0)+.016;bossPulse+=.016;if(bossPulse>3.6){bossPulse=0;g.bossTarget=(g.bossTarget||2)+1;g.bossTarget=Math.min(5,g.bossTarget);if(typeof msg==='function')msg('BOSS PHASE '+g.bossTarget);if(typeof particle==='function')particle(W/2,H/2,'#ff5577',18)}}
 if(g.combo>=10&&g.nearMiss<1){g.nearMiss=1;if(typeof msg==='function')msg('CHAIN MASTER')}if(g.combo<5)g.nearMiss=0;
 if(missionTick>6){missionTick=0;if(g.cores?.some(c=>c.alive)&&g.combo>=5&&typeof msg==='function')msg('KEEP THE CHAIN ALIVE')}
}
const raf=window.requestAnimationFrame;function loop(){try{step()}catch(e){}raf(loop)}raf(loop);
const oldDraw=CanvasRenderingContext2D.prototype.fillText;
// Lightweight HUD additions are drawn through the canvas API without replacing the game's renderer.
const hud=document.createElement('div');hud.id='advancedHud';hud.style.cssText='position:absolute;left:16px;bottom:14px;z-index:3;pointer-events:none;font:800 10px system-ui;letter-spacing:.12em;color:#9aa7c8;text-shadow:0 1px 8px #000;opacity:.9';document.querySelector('.stage-wrap')?.append(hud);
setInterval(()=>{if(typeof g==='undefined'||!g){hud.textContent='';return}const t=theme();hud.textContent=`${t.name}  •  ${g.n%10===0?'BOSS PHASE '+(g.bossTarget||2):'SECTOR '+(1+Math.floor((g.n-1)/50))}`},250);
window.addEventListener('beforeunload',saveMeta);
})();
