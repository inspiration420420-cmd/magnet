(()=>{
const K='magnetMayhemSave',read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}},write=s=>localStorage.setItem(K,JSON.stringify(s));
let bossPulse=0,missionTick=0,comboBest=1;
const THEMES=[{name:'NEON GRID',hazard:1,core:1},{name:'ORBITAL',hazard:1.12,core:1},{name:'CROSSWIND',hazard:1.24,core:1},{name:'CORE STORM',hazard:1.38,core:1.08},{name:'VOID SHIFT',hazard:1.52,core:1.12}];
function theme(){return THEMES[Math.floor(((g?.n||1)-1)/8)%THEMES.length]}
function saveMeta(){const s=read();s.meta=s.meta||{runs:0,comboBest:0,bosses:0,cores:0};s.meta.comboBest=Math.max(s.meta.comboBest||0,comboBest);write(s)}
function newRun(){if(typeof g==='undefined'||!g)return;const t=theme();g.theme=t.name;g.themeHazard=t.hazard;g.themeCore=t.core;g.runCores=g.cores.length;g.nearMiss=0;g.magnetPulse=0;missionTick=0;g.haz.forEach(h=>h.speed*=t.hazard);g.cores.forEach((c,i)=>{if(t.core>1){c.vx+=(i%2?-1:1)*12;c.vy+=(i%3-1)*9}});if(g.n%10===0){g.bossPhase=0;g.bossTarget=1;g.bossShield=3}}
const oldStart=window.start;
if(typeof oldStart==='function')window.start=function(n){oldStart(n);newRun();const s=read();s.meta=s.meta||{runs:0,comboBest:0,bosses:0,cores:0};s.meta.runs=(s.meta.runs||0)+1;write(s)};
function step(){if(typeof g==='undefined'||!g)return;if(g.over)return;const t=theme();if(g.theme!==t.name)newRun();if(g.paused)return;comboBest=Math.max(comboBest,g.combo||1);g.magnetPulse=(g.magnetPulse||0)+.035;missionTick+=.016;
 if(g.theme==='CROSSWIND'){for(const c of g.cores||[])if(c.alive)c.vx+=Math.sin((c.y+g.magnetPulse*70)*.012)*.22}
 if(g.theme==='VOID SHIFT'){for(const c of g.cores||[])if(c.alive)c.vy+=Math.cos((c.x+g.magnetPulse*55)*.01)*.16}
 if(g.n%10===0){g.bossPhase=(g.bossPhase||0)+.016;bossPulse+=.016;if(bossPulse>3.6){bossPulse=0;g.bossTarget=Math.min(5,(g.bossTarget||1)+1);const cap=(typeof cfg==='function'?cfg(g.n).hazards:14)+8;for(let i=0;i<g.bossTarget&&g.haz.length<cap;i++){g.haz.push({x:W/2+(Math.random()-.5)*W*.5,y:H/2+(Math.random()-.5)*H*.4,r:17+Math.random()*9,a:Math.random()*6.28,phase:Math.random()*6.28,orbit:35+Math.random()*75,speed:1.2+Math.random()*1.1})}if(typeof msg==='function')msg('BOSS PHASE '+g.bossTarget);if(typeof particle==='function')particle(W/2,H/2,'#ff5577',24)}}
 if(g.combo>=10&&g.nearMiss<1){g.nearMiss=1;if(typeof msg==='function')msg('CHAIN MASTER')}if(g.combo<5)g.nearMiss=0;
 if(missionTick>7){missionTick=0;if(g.cores?.some(c=>c.alive)&&g.combo>=5&&typeof msg==='function')msg('KEEP THE CHAIN ALIVE')}
}
const raf=window.requestAnimationFrame;function loop(){try{step()}catch(e){}raf(loop)}raf(loop);
const hud=document.createElement('div');hud.id='advancedHud';hud.style.cssText='position:absolute;left:16px;bottom:14px;z-index:3;pointer-events:none;font:800 10px system-ui;letter-spacing:.12em;color:#9aa7c8;text-shadow:0 1px 8px #000;opacity:.9';document.querySelector('.stage-wrap')?.append(hud);
setInterval(()=>{if(typeof g==='undefined'||!g){hud.textContent='';return}const t=theme();hud.textContent=`${t.name}  •  ${g.n%10===0?'BOSS PHASE '+(g.bossTarget||1):'SECTOR '+(1+Math.floor((g.n-1)/50))}`},250);
window.addEventListener('beforeunload',saveMeta);
})();
