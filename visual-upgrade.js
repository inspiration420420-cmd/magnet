(()=>{
const C=document.getElementById('game');if(!C)return;let ctx=C.getContext('2d'),t=0;
function frame(){t+=.016;const W=C.clientWidth,H=C.clientHeight;ctx.save();ctx.globalCompositeOperation='screen';
// atmospheric particles
for(let i=0;i<34;i++){let x=(i*137+t*12)%W,y=(i*83+t*(7+(i%4)*3))%H,a=.12+.08*Math.sin(t*2+i);ctx.globalAlpha=a;ctx.fillStyle=i%3===0?'#ff63b8':i%3===1?'#58e6ff':'#a98cff';ctx.beginPath();ctx.arc(x,y,1+(i%3),0,Math.PI*2);ctx.fill()}
// arena vignette and scanlines
ctx.globalAlpha=.08;ctx.fillStyle='#fff';for(let y=0;y<H;y+=6)ctx.fillRect(0,y,W,1);ctx.globalAlpha=.22;let v=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.2,W/2,H/2,Math.max(W,H)*.7);v.addColorStop(0,'transparent');v.addColorStop(1,'#000');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);ctx.restore();requestAnimationFrame(frame)}
requestAnimationFrame(frame);
// richer HUD treatment
const hud=document.querySelector('.hud');if(hud){const el=document.createElement('div');el.className='live-badge';el.textContent='● LIVE RUN';hud.append(el)}
})();
