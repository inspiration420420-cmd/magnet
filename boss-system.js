(()=>{
const C=document.getElementById('game');
let bossLevel=0;
function sync(){bossLevel=typeof g!=='undefined'&&g&&g.n%10===0&&!g.over?g.n:0}
function drawBoss(){if(!bossLevel||typeof g==='undefined'||!g||g.over||g.paused)return;const d=devicePixelRatio||1,w=C.width/d,h=C.height/d,ctx=C.getContext('2d');ctx.save();const pulse=8+Math.sin(performance.now()/180)*3;ctx.globalAlpha=.78;ctx.strokeStyle='#ff3158';ctx.lineWidth=2;ctx.beginPath();ctx.arc(w/2,h/2,Math.min(w,h)*.34+pulse,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=.09;ctx.fillStyle='#ff3158';ctx.beginPath();ctx.arc(w/2,h/2,Math.min(w,h)*.34+pulse,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.9;ctx.fillStyle='#ff5577';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText('BOSS // '+bossLevel,w/2,h-36);ctx.restore()}
function loop(){sync();drawBoss();requestAnimationFrame(loop)}
requestAnimationFrame(loop)
})();
