(()=>{
const C=document.getElementById('game');
let lastN=0,lastCombo=1,flash=0;
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function draw(){
 if(typeof g==='undefined'||!g)return;
 const d=devicePixelRatio||1,w=C.width/d,h=C.height/d,ctx=C.getContext('2d');
 ctx.save();
 if(!g.over){
  const alive=g.cores?g.cores.filter(c=>c.alive).length:0,total=g.cores?g.cores.length:0;
  const progress=total?1-alive/total:0;
  ctx.globalAlpha=.9;ctx.fillStyle='#0b1020cc';roundRect(ctx,w/2-115,12,230,7,4);ctx.fill();
  ctx.fillStyle=g.n%10===0?'#ff5577':'#58e6ff';roundRect(ctx,w/2-115,12,230*progress,7,4);ctx.fill();
  ctx.globalAlpha=.8;ctx.fillStyle='#9aa7c8';ctx.font='800 9px system-ui';ctx.textAlign='center';ctx.fillText(`${alive} CORES REMAIN`,w/2,34);
  if(g.n%10===0){ctx.globalAlpha=.95;ctx.fillStyle='#ff5577';ctx.font='900 10px system-ui';ctx.fillText('BOSS FIELD',w/2,50)}
  if(g.combo>=5){ctx.globalAlpha=Math.min(1,.55+g.combo/30);ctx.fillStyle='#ffd45f';ctx.font='900 12px system-ui';ctx.fillText(`CHAIN x${g.combo}`,w/2,h-18)}
  if(window.magnetChallengeActive&&window.magnetChallengeActive.level===g.n){ctx.globalAlpha=.9;ctx.fillStyle='#a98cff';ctx.font='900 9px system-ui';ctx.textAlign='left';ctx.fillText(window.magnetChallengeActive.modifier,w-125,25)}
 }
 ctx.restore();
 if(lastN!==g.n){lastN=g.n;flash=1}
 if(lastCombo!==g.combo){if(g.combo>lastCombo)flash=.7;lastCombo=g.combo}
 if(flash>0&&!g.over){ctx.save();ctx.globalAlpha=flash*.16;ctx.fillStyle='#8ceaff';ctx.fillRect(0,0,w,h);ctx.restore();flash=Math.max(0,flash-.025)}
 requestAnimationFrame(draw)
}
window.addEventListener('visibilitychange',()=>{if(document.hidden&&typeof g!=='undefined'&&g&&!g.over)g.paused=1});
requestAnimationFrame(draw);
})();
