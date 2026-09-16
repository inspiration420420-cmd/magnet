(()=>{
const K='magnetMayhemSave';
const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}};
const ov=document.getElementById('overlay'),ok=document.getElementById('overlayKicker'),ot=document.getElementById('overlayTitle'),ox=document.getElementById('overlayText'),pb=document.getElementById('primaryBtn'),sb=document.getElementById('secondaryBtn');
const controls=document.querySelector('.controls');
if(!controls||!ov)return;
const b=document.createElement('button');b.type='button';b.textContent='LEVELS';b.className='controls button';
function open(){const s=read(),max=Math.max(1,Math.min(Number(s.unlocked)||1,1000)),best=s.best||{};ok.textContent='LEVEL SELECT';ot.textContent='CHOOSE YOUR FIELD';let html='<div class="level-grid">';const limit=Math.min(max,120);for(let n=1;n<=limit;n++){const boss=n%10===0;html+=`<button type="button" class="level-pick${boss?' boss':''}" data-level="${n}" aria-label="Level ${n}${boss?' boss level':''}">${n}${best[n]?`<small>BEST ${Math.floor(best[n])}</small>`:''}</button>`}html+='</div>';if(max>120)html+=`<br><small>${max-120} more levels unlocked — replay with R or choose a higher level by continuing your run.</small>`;ox.innerHTML=html;pb.textContent='BACK';pb.onclick=()=>ov.classList.add('hidden');sb.classList.add('hidden');ov.classList.remove('hidden');if(typeof g!=='undefined'&&g&&!g.over)g.paused=1;ox.querySelectorAll('[data-level]').forEach(x=>x.onclick=()=>{const n=Number(x.dataset.level);ov.classList.add('hidden');if(typeof start==='function')start(n)})}
window.openLevelSelect=open;
b.onclick=open;controls.prepend(b);
})();
