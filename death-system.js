(()=>{
  // Poll the rendered hazard positions because the core game loop keeps its hit() function private.
  // A shield absorbs the first collision; subsequent collisions end the run.
  let lastShield=0,invuln=0;
  setInterval(()=>{
    if(typeof g==='undefined'||!g||g.over||g.paused)return;
    if(lastShield&&!g.shield)invuln=.65;
    lastShield=g.shield?1:0;
    if(invuln>0){invuln-=.05;return}
    if(!g.haz||!g.cores||typeof finish!=='function')return;
    for(const h of g.haz){
      const hx=h.x+Math.cos(h.a+h.phase)*h.orbit;
      const hy=h.y+Math.sin(h.a+h.phase)*h.orbit*.7;
      for(const c of g.cores){
        if(c.alive&&Math.hypot(c.x-hx,c.y-hy)<c.r+h.r){
          g.deathReason='HAZARD COLLISION';
          finish(false);
          return;
        }
      }
    }
  },50);
})();
