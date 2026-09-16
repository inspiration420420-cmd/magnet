(()=>{
const stage=document.querySelector('.stage-wrap');
if(!stage)return;
const K='magnetMayhemSave';
const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}};
const menu=document.createElement('div');
menu.id='mainMenu';
menu.innerHTML=`<div class="main-menu-card">
  <div class="menu-kicker">NEON ARCADE // MAGNETIC CHAOS</div>
  <div class="menu-logo"><span>✦</span><div><b>MAGNET</b><strong>MAYHEM</strong></div></div>
  <p class="menu-tag">Pull the cores. Dodge the hazards. Build the chain.</p>
  <div class="menu-stats"><span><b id="menuLevel">LEVEL 1</b><small>PROGRESS</small></span><span><b id="menuCoins">0</b><small>COINS</small></span><span><b id="menuBest">0</b><small>BEST SCORE</small></span></div>
  <div class="menu-actions">
    <button class="menu-primary" id="menuPlay">PLAY</button>
    <div class="menu-grid">
      <button id="menuLevels">LEVEL SELECT</button><button id="menuDaily">DAILY CHALLENGE</button>
      <button id="menuLab">UPGRADE LAB</button><button id="menuStats">STATS</button>
      <button id="menuMedals">MEDALS</button><button id="menuHow">HOW TO PLAY</button>
    </div>
  </div>
  <div class="menu-footer">1,000 LEVELS · BOSSES · POWER-UPS · UPGRADES · DAILY CHALLENGES</div>
</div>`;
stage.append(menu);
const $=id=>document.getElementById(id);
function refresh(){const s=read(),u=Math.max(1,Number(s.unlocked)||1),best=Math.max(0,...Object.values(s.best||{}).map(Number));$('menuLevel').textContent='LEVEL '+u;$('menuCoins').textContent=Number(s.coins)||0;$('menuBest').textContent=best.toLocaleString();$('menuPlay').textContent=u>1?'CONTINUE · LEVEL '+u:'PLAY';}
function show(){menu.classList.remove('hidden');refresh();if(typeof g!=='undefined'&&g)g.paused=1}
function hide(){menu.classList.add('hidden')}
function clickButton(text){const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()===text);if(b)b.click()}
$('menuPlay').onclick=()=>{hide();if(typeof start==='function'){const s=read();start(Math.max(1,Number(s.unlocked)||1))}};
$('menuLevels').onclick=()=>clickButton('LEVELS');
$('menuDaily').onclick=()=>clickButton('DAILY CHALLENGE');
$('menuLab').onclick=()=>clickButton('LAB');
$('menuStats').onclick=()=>clickButton('STATS');
$('menuMedals').onclick=()=>clickButton('MEDALS');
$('menuHow').onclick=()=>{const old=menu.innerHTML;menu.innerHTML=`<div class="main-menu-card help-card"><div class="menu-kicker">FIELD MANUAL</div><h2>HOW TO PLAY</h2><div class="help-list"><div><b>1 · MOVE</b><span>Drag or hold on the field to move your magnet. Keyboard: WASD, arrows or IJKL.</span></div><div><b>2 · PULL</b><span>Get close to glowing cores while holding to pull them into the magnet.</span></div><div><b>3 · SURVIVE</b><span>Avoid the rotating hazards. A collision breaks your combo and costs score.</span></div><div><b>4 · CHAIN</b><span>Collect cores quickly to build up to a x15 combo for bigger scores.</span></div><div><b>5 · POWER</b><span>Collect T, F, S and 2X power-ups for time, freeze, shield and overdrive.</span></div><div><b>6 · PROGRESS</b><span>Clear levels to unlock the next field, earn coins and buy upgrades.</span></div></div><button class="menu-primary" id="helpBack">BACK TO MENU</button></div>`;document.getElementById('helpBack').onclick=()=>{menu.innerHTML=old;bind();refresh()}};
function bind(){ $('menuPlay').onclick=()=>{hide();if(typeof start==='function'){const s=read();start(Math.max(1,Number(s.unlocked)||1))}}; $('menuLevels').onclick=()=>clickButton('LEVELS');$('menuDaily').onclick=()=>clickButton('DAILY CHALLENGE');$('menuLab').onclick=()=>clickButton('LAB');$('menuStats').onclick=()=>clickButton('STATS');$('menuMedals').onclick=()=>clickButton('MEDALS');$('menuHow').onclick=()=>{const old=menu.innerHTML;menu.innerHTML=`<div class="main-menu-card help-card"><div class="menu-kicker">FIELD MANUAL</div><h2>HOW TO PLAY</h2><div class="help-list"><div><b>1 · MOVE</b><span>Drag or hold on the field to move your magnet. Keyboard: WASD, arrows or IJKL.</span></div><div><b>2 · PULL</b><span>Get close to glowing cores while holding to pull them into the magnet.</span></div><div><b>3 · SURVIVE</b><span>Avoid the rotating hazards. A collision breaks your combo and costs score.</span></div><div><b>4 · CHAIN</b><span>Collect cores quickly to build up to a x15 combo for bigger scores.</span></div><div><b>5 · POWER</b><span>Collect T, F, S and 2X power-ups for time, freeze, shield and overdrive.</span></div><div><b>6 · PROGRESS</b><span>Clear levels to unlock the next field, earn coins and buy upgrades.</span></div></div><button class="menu-primary" id="helpBack">BACK TO MENU</button></div>`;document.getElementById('helpBack').onclick=()=>{menu.innerHTML=old;bind();refresh()}} }
const home=document.getElementById('homeBtn');if(home)home.onclick=show;
if(typeof start==='function')start(Math.max(1,Number(read().unlocked)||1));
show();
})();
