(()=>{
  // Lethal contact: the magnet itself can collide with moving hazards.
  // A shield absorbs the first hit; without a shield the run ends immediately.
  let invuln=0,lastShield=0;
  setInterval(()=>{
    if(typeof g==='undefined'||!g||g.over||g.paused)return;
    if(invuln>0){invuln-=.05;return}
    if(lastShield&&!g.shield)invuln=.45;
    lastShield=g.shield?1:0;
    if(!g.haz||!g.m||typeof finish!=='function')return;
    for(const h of g.haz){
      const hx=h.x+Math.cos(h.a+h.phase)*h.orbit;
      const hy=h.y+Math.sin(h.a+h.phase)*h.orbit*.7;
      if(Math.hypot(g.m.x-hx,g.m.y-hy)<g.m.r+h.r){
        if(g.shield){g.shield=0;g.deathReason='SHIELD HIT';g.shake=.4;if(typeof particle==='function')particle(g.m.x,g.m.y,'#a98cff',45);if(typeof msg==='function')msg('SHIELD BROKEN');return;}
        g.deathReason='MAGNET HAZARD COLLISION';
        if(typeof particle==='function')particle(g.m.x,g.m.y,'#ff5577',55);
        finish(false);
        return;
      }
    }
  },50);
})();
