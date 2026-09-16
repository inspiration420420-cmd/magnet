(()=>{
const c=document.getElementById('game');
window.addEventListener('keydown',e=>{
 if(e.target&&/input|textarea|select/i.test(e.target.tagName))return;
 if(e.code==='Space'){e.preventDefault();if(typeof g!=='undefined'&&g&&!g.over)g.paused=!g.paused;}
 if(e.key.toLowerCase()==='r'&&typeof start==='function'&&typeof g!=='undefined'&&g)start(g.n||1);
 if(e.key.toLowerCase()==='o'&&typeof window.overdrive==='function'&&typeof g!=='undefined'&&g&&!g.over)window.overdrive();
 if(e.key==='Escape'&&document.fullscreenElement)document.exitFullscreen?.();
});
let wasPaused=false;
document.addEventListener('visibilitychange',()=>{if(typeof g==='undefined'||!g||g.over)return;if(document.hidden){wasPaused=!!g.paused;g.paused=1}else if(!wasPaused){g.paused=0}});
const b=document.createElement('button');b.type='button';b.textContent='FULL';b.className='controls button';b.title='Toggle fullscreen';b.onclick=async()=>{if(!document.fullscreenElement)await document.documentElement.requestFullscreen?.();else await document.exitFullscreen?.()};document.querySelector('.controls')?.prepend(b);
})();
