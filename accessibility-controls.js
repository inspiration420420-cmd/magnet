(()=>{
const c=document.getElementById('game');
const keys=new Set(),moveKeys=new Set(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD','KeyI','KeyJ','KeyK','KeyL']);
window.addEventListener('keydown',e=>{
 if(e.target&&/input|textarea|select/i.test(e.target.tagName))return;
 if(moveKeys.has(e.code)){keys.add(e.code);e.preventDefault();return}
 if(e.code==='Space'){e.preventDefault();if(typeof g!=='undefined'&&g&&!g.over)g.paused=!g.paused;}
 if(e.key.toLowerCase()==='r'&&typeof start==='function'&&typeof g!=='undefined'&&g)start(g.n||1);
 if(e.key.toLowerCase()==='o'&&typeof window.overdrive==='function'&&typeof g!=='undefined'&&g&&!g.over)window.overdrive();
 if(e.key==='Escape'&&document.fullscreenElement)document.exitFullscreen?.();
});
window.addEventListener('keyup',e=>{if(moveKeys.has(e.code))keys.delete(e.code)});
window.addEventListener('blur',()=>keys.clear());
function keyboardMove(){if(typeof g==='undefined'||!g||g.over||g.paused||!keys.size){requestAnimationFrame(keyboardMove);return}let dx=0,dy=0;if(keys.has('ArrowLeft')||keys.has('KeyA')||keys.has('KeyJ'))dx--;if(keys.has('ArrowRight')||keys.has('KeyD')||keys.has('KeyL'))dx++;if(keys.has('ArrowUp')||keys.has('KeyW')||keys.has('KeyI'))dy--;if(keys.has('ArrowDown')||keys.has('KeyS')||keys.has('KeyK'))dy++;const len=Math.hypot(dx,dy)||1,speed=Math.min(W,H)*.012;g.m.x=Math.max(g.m.r,Math.min(W-g.m.r,g.m.x+dx/len*speed));g.m.y=Math.max(g.m.r,Math.min(H-g.m.r,g.m.y+dy/len*speed));g.drag=1;requestAnimationFrame(keyboardMove)}
requestAnimationFrame(keyboardMove);
let wasPaused=false;
document.addEventListener('visibilitychange',()=>{if(typeof g==='undefined'||!g||g.over)return;if(document.hidden){wasPaused=!!g.paused;g.paused=1;keys.clear()}else if(!wasPaused){g.paused=0}});
const b=document.createElement('button');b.type='button';b.textContent='FULL';b.className='controls button';b.title='Toggle fullscreen';b.onclick=async()=>{if(!document.fullscreenElement)await document.documentElement.requestFullscreen?.();else await document.exitFullscreen?.()};document.querySelector('.controls')?.prepend(b);
})();
