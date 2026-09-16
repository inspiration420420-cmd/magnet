(()=>{
let lastTap=0;
const canvas=document.getElementById('game');
if(canvas){canvas.addEventListener('touchend',()=>{const now=Date.now();if(now-lastTap<380&&typeof g!=='undefined'&&g&&!g.over&&typeof overdrive==='function')overdrive();lastTap=now},{passive:true});}
let deferred;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;const b=document.createElement('button');b.type='button';b.textContent='INSTALL';b.className='controls button';b.onclick=async()=>{if(!deferred)return;deferred.prompt();await deferred.userChoice;deferred=null;b.remove()};document.querySelector('.controls')?.prepend(b)});
})();
