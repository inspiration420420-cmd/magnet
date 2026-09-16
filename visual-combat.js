(()=>{
const stage=document.querySelector('.stage-wrap');
if(!stage)return;
const hud=document.createElement('div');hud.id='combatHud';hud.innerHTML='<div class="combat-chip"><span>THREAT</span><b id="threatReadout">LOW</b></div><div class="combat-chip"><span>FIELD</span><b id="fieldReadout">ACTIVE</b></div><div class="combat-bar"><i id="threatBar"></i></div>';
stage.appendChild(hud);
const threat=document.getElementById('threatReadout'),field=document.getElementById('fieldReadout'),bar=document.getElementById('threatBar');
setInterval(()=>{if(typeof g==='undefined'||!g||!g.haz){hud.style.opacity='0';return}hud.style.opacity='1';const alive=(g.cores||[]).filter(c=>c.alive).length;const h=g.haz.length;const danger=Math.min(100,h*5+Math.max(0,alive-3)*3+(g.n%10===0?30:0));threat.textContent=danger>70?'CRITICAL':danger>42?'ELEVATED':'LOW';field.textContent=g.over?'ENDED':g.paused?'PAUSED':(g.n%10===0?'BOSS':'ACTIVE');bar.style.width=danger+'%';},150);
})();
