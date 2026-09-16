(()=>{
const C=document.getElementById('game');
let bossLevel=0,boss=null,last=performance.now();
const TAU=Math.PI*2;
const types=['GRAVITY WARDEN','PULSE REACTOR','VOID ORBITER','MAGNET EATER','CORE TITAN'];
const colors=['#ff3158','#ffd45f','#a98cff','#58e6ff','#ff63b8'];
function sync(){
  if(typeof g==='undefined'||!g||g.over||g.paused||g.n%10!==0){bossLevel=0;boss=null;return}
  if(bossLevel!==g.n){
    bossLevel=g.n;
    const i=(Math.floor(g.n/10)-1)%types.length;
    boss={type:i,t:0,phase:1,hits:0,burst:1.5,warning:0};
  }
}
function spawn(x,y,r=18,speed=1.1){if(!g||!g.haz)return;g.haz.push({x,y,r,a:Math.random()*TAU,phase:Math.random()*TAU,orbit:r+18,speed});}
function attack(dt){if(!boss||!g||g.over)return;boss.t+=dt;boss.burst-=dt;
  const phase=boss.t<8?1:boss.t<16?2:3;
  if(phase!==boss.phase){boss.phase=phase;boss.warning=1;boss.burst=.5}
  if(boss.burst<=0){
    const cx=W()/2,cy=H()/2;
    if(boss.type===0){ // Gravity Warden: rotating hazard ring
      const a=boss.t*1.5;for(let i=0;i<phase+1;i++){const q=a+i*TAU/(phase+1);spawn(cx+Math.cos(q)*90,cy+Math.sin(q)*65,16+phase*2,1.0+phase*.12)}
    } else if(boss.type===1){ // Pulse Reactor: radial mines
      const count=5+phase*2;for(let i=0;i<count;i++){const q=i*TAU/count+boss.t*.3;spawn(cx+Math.cos(q)*(70+phase*18),cy+Math.sin(q)*(55+phase*14),14,1.2+phase*.1)}
    } else if(boss.type===2){ // Void Orbiter: target the magnet with a delayed ring
      const q=boss.t*.8;spawn(g.m.x+Math.cos(q)*75,g.m.y+Math.sin(q)*55,19,1.5);boss.warning=1.2
    } else if(boss.type===3){ // Magnet Eater: steal space around magnet
      for(let i=0;i<phase;i++){const q=Math.random()*TAU;spawn(clamp(g.m.x+Math.cos(q)*100,30,W()-30),clamp(g.m.y+Math.sin(q)*75,50,H()-30),21,1.4)}
    } else { // Core Titan: dense cross pattern
      const count=4+phase;for(let i=0;i<count;i++){spawn(35+i*(W()-70)/(count-1),55+(i%2)*Math.max(40,H()-120),17,1.35+phase*.12)}
    }
    boss.burst=Math.max(.75,2.0-phase*.3);
  }
  // Boss pressure: surviving cores get a small impulse during phase 3.
  if(phase===3&&Math.floor(boss.t*4)%4===0){for(const c of g.cores||[]){if(!c.alive)continue;const dx=c.x-g.m.x,dy=c.y-g.m.y,d=Math.hypot(dx,dy)||1;c.vx+=dx/d*9*dt;c.vy+=dy/d*9*dt}}
}
function W(){return C.clientWidth} function H(){return C.clientHeight}
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
function drawBoss(){if(!boss||!bossLevel||!g||g.over||g.paused)return;const d=devicePixelRatio||1,w=C.width/d,h=C.height/d,ctx=C.getContext('2d'),now=performance.now();const col=colors[boss.type];
  ctx.save();
  const pulse=10+Math.sin(now/130)*4,rad=Math.min(w,h)*.27+pulse;
  ctx.globalAlpha=.16;ctx.fillStyle=col;ctx.beginPath();ctx.arc(w/2,h/2,rad,0,TAU);ctx.fill();
  ctx.globalAlpha=.9;ctx.strokeStyle=col;ctx.lineWidth=3;ctx.setLineDash([9,7]);ctx.beginPath();ctx.arc(w/2,h/2,rad,now/700,now/700+TAU*.82);ctx.stroke();ctx.setLineDash([]);
  ctx.globalAlpha=.95;ctx.fillStyle=col;ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('BOSS // '+bossLevel+'  •  '+types[boss.type],w/2,h-38);
  const pw=Math.min(240,w*.42),ph=5,px=w/2-pw/2,py=h-24;ctx.globalAlpha=.25;ctx.fillRect(px,py,pw,ph);ctx.globalAlpha=.9;ctx.fillRect(px,py,pw*Math.max(0,1-boss.t/24),ph);
  if(boss.warning>0){boss.warning-=.016;ctx.globalAlpha=Math.min(.45,boss.warning*.3);ctx.fillStyle=col;ctx.fillRect(0,0,w,h)}
  ctx.restore();
}
function loop(t){const dt=Math.min(.033,(t-last)/1000||0);last=t;sync();attack(dt);drawBoss();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
})();
