(()=>{
const K='magnetMayhemSave';
const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}};
const write=s=>localStorage.setItem(K,JSON.stringify(s));
const day=()=>{const d=new Date();return `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`};
const hash=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const getChallenge=()=>{const s=read(),max=Math.max(1,Math.min(s.unlocked||1,1000)),h=hash(day());return{level:1+(h%max),modifier:['RAPID','HAZARD RUSH','DOUBLE SCORE','ICE FIELD'][h%4]}};
window.magnetDailyChallenge=getChallenge;
const b=document.createElement('button');b.type='button';b.textContent='CHALLENGE';b.className='controls button';b.onclick=()=>{const c=getChallenge(),ov=document.getElementById('overlay'),ok=document.getElementById('overlayKicker'),ot=document.getElementById('overlayTitle'),ox=document.getElementById('overlayText'),pb=document.getElementById('primaryBtn'),sb=document.getElementById('secondaryBtn');if(typeof g!=='undefined'&&g&&!g.over)g.paused=1;ov.classList.remove('hidden');ok.textContent='DAILY RUN';ot.textContent=c.modifier;ox.innerHTML=`LEVEL <b>${c.level}</b><br><br>Today's modifier: <b>${c.modifier}</b><br><small>Challenge resets at 00:00 UTC.</small>`;pb.textContent='PLAY';pb.onclick=()=>{ov.classList.add('hidden');if(typeof start==='function')start(c.level)};sb.classList.add('hidden')};document.querySelector('.controls')?.prepend(b);
})();
