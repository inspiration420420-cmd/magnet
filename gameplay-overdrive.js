(()=>{
const K='magnetMayhemSave';
const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch{return{}}};
const write=s=>localStorage.setItem(K,JSON.stringify(s));
let lastCores=-1,lastOver=0,lastChallenge=null,bossPulse=0,challengeScore=1,lastScore=0;
function saveStats(patch){const s=read();s.stats=s.stats||{wins:0,cores:0,stars:0,bosses:0};Object.assign(s.stats,patch);write(s)}
function applyChallenge(){if(typeof g==='undefined'||!g||g.over)return;const c=window.magnetChallengeActive;if(!c||c.level!==g.n){lastChallenge=null;challengeScore=1;lastScore=g.score;return}if(lastChallenge!==g.n){lastChallenge=g.n;challengeScore=c.modifier==='DOUBLE SCORE'?2:1;lastScore=g.score;if(c.modifier==='RAPID')g.time=Math.max(8,g.time*.72);if(c.modifier==='HAZARD RUSH'){for(let i=0;i<Math.min(5,Math.max(2,Math.floor(g.haz.length*.35)));i++)g.haz.push({x:25+Math.random()*(W-50),y:55+Math.random()*(H-85),r:15+Math.random()*10,a:Math.random()*6.28,phase:Math.random()*6.28,orbit:20+Math.random()*55,speed:(.9+Math.random()*.8)*(g.n/100+1)})}if(c.modifier==='ICE FIELD')g.m.r=24}}
function doubleScore(){if(typeof g==='undefined'||!g)return;const c=window.magnetChallengeActive;if(!c||c.level!==g.n||c.modifier!=='DOUBLE SCORE'){lastScore=g.score;return}if(g.score>lastScore)g.score+=g.score-lastScore;lastScore=g.score}
function overdrive(){if(typeof g==='undefined'||!g||g.over||g.paused)return;g.overdrive=5;g.time=Math.min(cfg(g.n).time,g.time+2.5);g.combo=Math.min(15,g.combo+2);if(typeof msg==='function')msg('OVERDRIVE • 2X');if(typeof particle==='function')particle(g.m.x,g.m.y,'#fff',40);if(typeof beep==='function')beep(760,.12,'square')}
window.overdrive=overdrive;
function bossMechanic(dt){if(typeof g==='undefined'||!g||g.over||g.paused||g.n%10)return;bossPulse-=dt;if(bossPulse<=0){bossPulse=4.2;g.haz.push({x:W/2+(Math.random()-.5)*W*.45,y:H/2+(Math.random()-.5)*H*.35,r:22,a:Math.random()*6.28,phase:Math.random()*6.28,orbit:75+Math.random()*45,speed:1.5+Math.random()*.8});if(typeof msg==='function')msg('BOSS PULSE • EXTRA HAZARD')}}
function stats(){if(typeof g==='undefined'||!g)return;const alive=g.cores?g.cores.filter(c=>c.alive).length:0;if(lastCores>=0&&alive<lastCores)saveStats({cores:(read().stats?.cores||0)+(lastCores-alive)});lastCores=alive;if(g.over&&!lastOver&&g.cores&&g.cores.every(c=>!c.alive)){const z=typeof cfg==='function'?cfg(g.n):null,stars=z?(g.time>z.time*.45?3:g.time>z.time*.2?2:1):1,s=read();s.stats=s.stats||{wins:0,cores:0,stars:0,bosses:0};s.stats.wins=(s.stats.wins||0)+1;s.stats.stars=(s.stats.stars||0)+stars;if(g.n%10===0)s.stats.bosses=(s.stats.bosses||0)+1;write(s);window.magnetChallengeActive=null}lastOver=g.over?1:0}
let oldLoop=window.requestAnimationFrame;
function frame(t){try{if(typeof g!=='undefined'&&g){applyChallenge();doubleScore();bossMechanic(Math.min(.05,((t-(frame.last||t))/1000)));stats()}}catch(e){}frame.last=t;oldLoop(frame)}
oldLoop(frame);
window.magnetChallengeMultiplier=()=>challengeScore;
})();
