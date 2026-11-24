const $=id=>document.getElementById(id);
const today=new Date();$('today').textContent=today.toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'}).toUpperCase();
let tasks=JSON.parse(localStorage.getItem('fiffy_tasks')||'[]');
let water=Number(localStorage.getItem('fiffy_water')||0);
function save(){localStorage.setItem('fiffy_tasks',JSON.stringify(tasks));localStorage.setItem('fiffy_water',String(water))}
function render(){const list=$('taskList');list.innerHTML='';tasks.forEach((t,i)=>{const li=document.createElement('li');const cb=document.createElement('input');cb.type='checkbox';cb.checked=t.done;cb.onchange=()=>{tasks[i].done=cb.checked;save();render()};const span=document.createElement('span');span.textContent=t.text;span.className=t.done?'done':'';li.append(cb,span);list.append(li)});$('taskCount').textContent=tasks.filter(t=>t.done).length+'/'+tasks.length;$('waterCount').textContent=water+'/8';$('waterText').textContent=water+' bicchieri';$('waterBar').style.width=Math.min(100,water/8*100)+'%'}
$('taskForm').addEventListener('submit',e=>{e.preventDefault();const v=$('taskInput').value.trim();if(!v)return;tasks.push({text:v,done:false});$('taskInput').value='';save();render()});
$('waterPlus').onclick=()=>{water=Math.min(8,water+1);save();render()};$('waterMinus').onclick=()=>{water=Math.max(0,water-1);save();render()};
document.querySelectorAll('.moods button').forEach(b=>b.onclick=()=>{localStorage.setItem('fiffy_mood',b.dataset.mood);document.querySelectorAll('.moods button').forEach(x=>x.style.outline='');b.style.outline='2px solid #789783'});
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('selected',b.dataset.page===id));$('moreMenu').classList.remove('open');window.scrollTo(0,0)}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.page;if(id==='more'){$('moreMenu').classList.toggle('open');return}showPage(id)}));
$('saveBody').onclick=()=>{$('bodySaved').textContent='Rilevazione salvata su questo dispositivo.';localStorage.setItem('fiffy_body',JSON.stringify({weight:$('weight').value,notes:$('measureNotes').value}))};
$('saveCycle').onclick=()=>{$('cycleSaved').textContent='Annotazione salvata su questo dispositivo.';localStorage.setItem('fiffy_cycle',JSON.stringify({date:$('periodDate').value,notes:$('cycleNotes').value}))};
$('saveHealth').onclick=()=>{$('healthSaved').textContent='Check-in salvato su questo dispositivo.';localStorage.setItem('fiffy_health',JSON.stringify({sleep:$('sleep').value,digestion:$('digestion').value,notes:$('healthNotes').value}))};
$('saveDiary').onclick=()=>{$('diarySaved').textContent='Nota salvata su questo dispositivo.';localStorage.setItem('fiffy_diary', $('diaryText').value)};
render();
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
