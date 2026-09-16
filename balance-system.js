(()=>{
  const originalStart=window.start;
  const originalUpdate=window.update;
  let fps=60,frames=0,lastSample=performance.now(),slowMode=0;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function applyBalance(){
    if(typeof g==='undefined'||!g||g.over)return;
    const level=g.n||1;
    const mobile=matchMedia('(pointer:coarse)').matches;
    const sector=Math.floor((level-1)/50);
    const maxHaz=mobile?clamp(5+Math.floor(level/80),6,11):clamp(7+Math.floor(level/70),8,13);
    if(g.haz?.length>maxHaz)g.haz.length=maxHaz;
    if(g.haz){
      const pressure=1+Math.min(.16,sector*.008);
      for(const h of g.haz){
        if(!h._balanceBase)h._balanceBase=h.speed||1;
        h.speed=clamp(h._balanceBase*pressure,.35,2.35);
      }
    }
    if(g.cores?.length){
      for(const c of g.cores){
        if(!c.alive)continue;
        const v=Math.hypot(c.vx||0,c.vy||0);
        if(v>1450){const k=1450/v;c.vx*=k;c.vy*=k}
      }
    }
    if(slowMode){g.shake=Math.min(g.shake||0,.12)}
  }
  if(typeof originalStart==='function')window.start=function(n){originalStart(n);applyBalance()};
  if(typeof originalUpdate==='function')window.update=function(dt){
    originalUpdate(dt);
    applyBalance();
    frames++;
    const now=performance.now();
    if(now-lastSample>1000){fps=frames*1000/(now-lastSample);frames=0;lastSample=now;slowMode=fps<38?1:fps>48?0:slowMode}
  };
  const badge=document.createElement('div');
  badge.id='balanceBadge';
  badge.style.cssText='position:absolute;right:16px;bottom:14px;z-index:3;pointer-events:none;font:800 9px system-ui;letter-spacing:.1em;color:#68759a;opacity:.65';
  document.querySelector('.stage-wrap')?.append(badge);
  setInterval(()=>{if(typeof g==='undefined'||!g||g.over){badge.textContent='';return}badge.textContent=slowMode?'PERFORMANCE MODE':''},500);
})();
