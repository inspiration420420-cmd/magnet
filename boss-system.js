(()=>{
const C=document.getElementById('game');
let bossLevel=0;
function sync(){if(typeof g==='undefined'||!g)return;bossLevel=(g.level&&g.level%10===0)?g.level:0;if(!bossLevel)return;}
function drawBoss(){if(!bossLevel||typeof g==='undefined'||!g||g.over||g.paused)return;const w=C.width/(devicePixelRatio||1),h=C.height/(devicePixelRatio||1);const ctx=C.getContext('2d');ctx.save();ctx.globalAlpha=.72;ctx.strokeStyle='#ff3158';ctx.lineWidth=2;const pulse=8+Math.sin(performance.now()/180)*3;ctx.beginPath();ctx.arc(w/2,h/2,Math.min(w,h)*.34+pulse,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=.12;ctx.fillStyle='#ff3158';ctx.beginPath();ctx.arc(w/2,h/2,Math.min(w,h)*.34+pulse,0,Math.PI*2);ctx.fill();ctx.restore();}
function loop(){sync();drawBoss();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
})();
