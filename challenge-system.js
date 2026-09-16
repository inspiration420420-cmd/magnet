(()=>{
const K='magnetMayhemSave';
const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}};
const day=()=>{const d=new Date();return `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`};
const hash=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const getChallenge=()=>{const s=read(),max=Math.max(1,Math.min(s.unlocked||1,1000)),h=hash(day());return{level:1+(h%max),modifier:['RAPID','HAZARD RUSH','DOUBLE SCORE','ICE FIELD'][h%4],day:day()}};
window.magnetDailyChallenge=getChallenge;
const b=document.createElement('button');b.type='button';b.textContent='CHALLENGE';b.className='controls button';b.onclick=()=>{const c=getChallenge(),ov=document.getElementById('overlay'),ok=document.getElementById('overlayKicker'),ot=document.getElementById('overlayTitle'),ox=document.getElementById('overlayText'),pb=document.getElementById('primaryBtn'),sb=document.getElementById('secondaryBtn');window.magnetChallengeActive=null;if(typeof g!=='undefined'&&g&&!g.over)g.paused=1;ov.classList.remove('hidden');ok.textContent='DAILY RUN';ot.textContent=c.modifier;ox.innerHTML=`LEVEL <b>${c.level}</b><br><br>${c.modifier==='RAPID'?'Time is reduced by 28%.':c.modifier==='HAZARD RUSH'?'Extra hazards enter the field.':c.modifier==='DOUBLE SCORE'?'All score gains are doubled.':'Your magnet shrinks for a tighter pull.'}<br><small>Challenge resets at 00:00 UTC.</small>`;pb.textContent='PLAY';pb.onclick=()=>{ov.classList.add('hidden');window.magnetChallengeActive=c;if(typeof start==='function')start(c.level)};sb.classList.add('hidden')};document.querySelector('.controls')?.prepend(b);
})();
