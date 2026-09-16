(()=>{
const c=document.getElementById('game');
window.addEventListener('keydown',e=>{
 if(e.target&&/input|textarea|select/i.test(e.target.tagName))return;
 if(e.code==='Space'){e.preventDefault();if(typeof g!=='undefined'&&g&&!g.over)g.paused=!g.paused;}
 if(e.key.toLowerCase()==='r'&&typeof start==='function'&&typeof g!=='undefined'&&g)start(g.level||1);
 if(e.key.toLowerCase()==='o'&&typeof overdrive==='function'&&typeof g!=='undefined'&&g&&!g.over)overdrive();
 if(e.key==='Escape'&&document.fullscreenElement)document.exitFullscreen?.();
});
const b=document.createElement('button');b.type='button';b.textContent='FULL';b.className='controls button';b.title='Toggle fullscreen';b.onclick=async()=>{if(!document.fullscreenElement)await document.documentElement.requestFullscreen?.();else await document.exitFullscreen?.()};document.querySelector('.controls')?.prepend(b);
})();
