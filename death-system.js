(()=>{
  // Real failure state: a hazard hit ends the run unless the player has a shield.
  const originalHit=window.hit;
  if(typeof originalHit!=='function')return;
  window.hit=function(c){
    if(typeof g==='undefined'||!g||g.over)return;
    const protectedHit=!!g.shield;
    originalHit(c);
    if(!protectedHit && !g.over && typeof finish==='function'){
      g.deathReason='HAZARD COLLISION';
      finish(false);
    }
  };
})();
