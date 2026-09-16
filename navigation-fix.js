(()=>{
const menu=()=>document.getElementById('mainMenu');
const overlay=()=>document.getElementById('overlay');
const setPaused=v=>{if(typeof g!=='undefined'&&g)g.paused=v};
const hideOverlay=()=>{const o=overlay();if(o)o.classList.add('hidden')};
const showMenu=()=>{const m=menu();if(!m)return;m.classList.remove('hidden');m.classList.remove('menu-subpage');m.style.zIndex='30';setPaused(1);hideOverlay()};
const openSubpage=(title,render)=>{
 const m=menu();if(!m)return;
 m.classList.remove('hidden');m.classList.add('menu-subpage');m.style.zIndex='30';setPaused(1);hideOverlay();
 m.innerHTML=`<div class="main-menu-card menu-screen"><button type="button" class="menu-back" id="navBack">← BACK</button><div class="menu-kicker">MAGNET MAYHEM // MENU</div><h2>${title}</h2><div class="menu-screen-content" id="menuScreenContent"></div></div>`;
 const c=document.getElementById('menuScreenContent');render(c);requestAnimationFrame(()=>m.querySelector('.menu-screen').classList.add('menu-screen-ready'));
 document.getElementById('navBack').onclick=()=>{const card=m.querySelector('.menu-screen');if(card)card.classList.add('menu-screen-exit');setTimeout(showMenu,180)};
};
const read=()=>{try{return JSON.parse(localStorage.getItem('magnetMayhemSave'))||{}}catch{return{}}};
const bestFor=(s,n)=>Number((s.best||{})[n]||0);
const levels=c=>{const s=read(),max=Math.max(1,Math.min(Number(s.unlocked)||1,1000)),best=s.best||{};let html='<div class="level-grid">';const limit=Math.min(max,120);for(let n=1;n<=limit;n++){html+=`<button type="button" class="level-pick${n%10===0?' boss':''}" data-level="${n}">${n}${best[n]?`<small>BEST ${Math.floor(best[n])}</small>`:''}</button>`}html+='</div>';if(max>120)html+=`<p class="menu-note">${max-120} more levels unlocked. Continue your run to access them.</p>`;c.innerHTML=html;c.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.level);m().classList.add('hidden');if(typeof start==='function')start(n)} )};
const stats=c=>{const s=read(),wins=s.stats?.wins||0,cores=s.stats?.cores||0,bosses=s.stats?.bosses||0,stars=s.stats?.stars||0,vals=Object.entries(s.best||{}).filter(([,v])=>Number(v)>0).sort((a,b)=>Number(b[1])-Number(a[1]));c.innerHTML=`<div class="stat-cards"><div><b>${s.unlocked||1}</b><span>UNLOCKED</span></div><div><b>${wins}</b><span>CLEARS</span></div><div><b>${stars}</b><span>STARS</span></div><div><b>${s.coins||0}</b><span>COINS</span></div></div><h3>HIGH SCORES BY LEVEL</h3><div class="score-list">${vals.length?vals.map(([n,v])=>`<div><span>LEVEL ${n}</span><b>${Math.floor(v).toLocaleString()}</b></div>`).join(''):'<p class="menu-note">Complete a level to set its high score.</p>'}</div>`};
const medals=c=>{const s=read();c.innerHTML=`<div class="medal-copy"><b>${(s.ach||[]).length} UNLOCKED</b><p>FIRST PULL — collect your first core</p><p>CHAIN REACTION — reach x8 combo</p><p>TEN DOWN — reach level 10</p><p>CENTURY — reach level 100</p><p>MAYHEM MASTER — conquer level 1000</p><p>Boss medals are earned every 10th level.</p></div>`};
const lab=c=>{if(typeof window.openUpgradeLab==='function'){hideOverlay();window.openUpgradeLab();return}c.innerHTML='<p class="menu-note">Upgrade Lab is unavailable.</p>'};
const daily=c=>{if(typeof window.openDailyChallenge==='function'){hideOverlay();window.openDailyChallenge();return}c.innerHTML='<p class="menu-note">Daily Challenge is unavailable.</p>'};
const how=c=>{c.innerHTML='<div class="help-list"><div><b>MOVE</b><span>Drag or hold on the field. Keyboard: WASD, arrows or IJKL.</span></div><div><b>PULL</b><span>Get close to glowing cores while holding to pull them into the magnet.</span></div><div><b>SURVIVE</b><span>Avoid moving hazards. Your shield can absorb one hit.</span></div><div><b>CHAIN</b><span>Collect cores quickly to build your combo and maximize your score.</span></div><div><b>POWER</b><span>Collect Time, Freeze, Shield and 2X power-ups.</span></div></div>'};
const wire=()=>{
 const m=menu();if(!m)return;
 const bind=(id,title,fn)=>{const b=document.getElementById(id);if(b)b.onclick=e=>{e.preventDefault();e.stopPropagation();openSubpage(title,fn)}};
 bind('menuLevels','LEVEL SELECT',levels);bind('menuStats','PLAYER STATS',stats);bind('menuMedals','MEDALS',medals);bind('menuHow','HOW TO PLAY',how);bind('menuLab','UPGRADE LAB',lab);bind('menuDaily','DAILY CHALLENGE',daily);
};
wire();
new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
