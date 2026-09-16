(()=>{
const stage=document.querySelector('.stage-wrap');if(!stage||document.getElementById('visualFx'))return;
const fx=document.createElement('div');fx.id='visualFx';fx.className='visual-fx';fx.innerHTML='<div class="fx-grid"></div><div class="fx-scanlines"></div><div class="fx-vignette"></div><div class="fx-glow fx-glow-a"></div><div class="fx-glow fx-glow-b"></div><div class="fx-stars"></div>';
stage.appendChild(fx);
const stars=fx.querySelector('.fx-stars');
for(let i=0;i<48;i++){const s=document.createElement('i');s.style.setProperty('--x',Math.random()*100+'%');s.style.setProperty('--y',Math.random()*100+'%');s.style.setProperty('--d',(2.5+Math.random()*5)+'s');s.style.setProperty('--delay',(-Math.random()*7)+'s');s.style.setProperty('--size',(1+Math.random()*2.5)+'px');stars.appendChild(s)}
const badge=document.querySelector('.live-badge');if(badge)badge.textContent='● LIVE RUN';
})();