'use strict';
const d=window.DASHBOARD_DATA;
const states={ok:{label:'Concluído',icon:'✓'},andamento:{label:'Em andamento',icon:'↻'},iniciando:{label:'Iniciando (relato de campo)',icon:'▷'},nao_informado:{label:'Não informado',icon:'—'}};
const total=d.transportadores.length*d.atividades.length;
const done=d.transportadores.reduce((s,r)=>s+r.status.filter(v=>v==='ok').length,0);
const active=d.transportadores.reduce((s,r)=>s+r.status.filter(v=>['andamento','iniciando'].includes(v)).length,0);
const complete=d.transportadores.filter(r=>r.status.every(s=>s==='ok')).length;
const pct=Math.round(done/total*1000)/10;
const num=n=>n.toLocaleString('pt-BR');
document.querySelector('#kpis').innerHTML=[[String(d.transportadores.length),'Transportadores no checklist','TR09 ao TR20'],[num(pct)+'%','Itens do checklist concluídos',`${done} de ${total} itens • Bloco 1`],[`${complete} / 12`,'TRs com checklist completo','9 de 9 itens marcados como “ok”'],[String(active).padStart(2,'0'),'Itens em execução ou início',`${total-done-active} itens com status não informado`]].map((k,i)=>`<article class="kpi"><strong>${k[0]}</strong><span class="label">${k[1]}</span><small>${k[2]}</small>${i===1?`<div class="mini-bar"><i style="width:${pct}%"></i></div>`:''}</article>`).join('');
document.querySelector('#blocks').innerHTML=d.blocos.map((b,i)=>`<button class="block ${i===0?'active':''}" data-block="${i}"><span class="eyebrow">${b.nome.toUpperCase()}</span><strong>${b.escopo}</strong><span class="badge ${i<2?'amber':'gray'}">${b.status}</span></button>`).join('');
function render(){
 const q=document.querySelector('#search').value.toLowerCase().replace(/[^a-z0-9]/g,'');
 const f=document.querySelector('#filter').value;
 const rows=d.transportadores.filter(r=>{const short='tr'+Number(r.tag.split('-').pop());return (!q||r.tag.toLowerCase().replace(/[^a-z0-9]/g,'').includes(q)||short.includes(q))&&(f==='all'||f==='complete'&&r.status.every(s=>s==='ok')||f==='active'&&r.status.some(s=>['andamento','iniciando'].includes(s))||f==='unknown'&&r.status.includes('nao_informado'))});
 document.querySelector('#matrix').innerHTML=`<thead><tr><th>TRANSPORTADOR / RESPONSÁVEL</th>${d.atividades.map(a=>`<th scope="col">${a}</th>`).join('')}<th scope="col">Itens “ok”</th></tr></thead><tbody>${rows.map(r=>`<tr><td><button class="tr-button" data-tr="${r.tag}">${r.tag}</button><small>${r.responsavel}</small></td>${r.status.map(s=>`<td><span class="key ${s}" title="${states[s].label}" aria-label="${states[s].label}">${states[s].icon}</span></td>`).join('')}<td class="completion">${r.status.filter(s=>s==='ok').length} / 9</td></tr>`).join('')||'<tr><td colspan="11">Nenhum TR encontrado para este filtro.</td></tr>'}</tbody>`;
 document.querySelector('#result-count').textContent=`${rows.length} de 12 transportadores exibidos • Clique no código do TR para abrir os detalhes.`;
}
const dialog=document.querySelector('#detail');
function show(content) {
  const detailContent = document.querySelector('#detail-content');
  detailContent.innerHTML = content;
  detailContent.querySelector('h2').id = 'dialog-title';
  dialog.showModal();
}
document.querySelector('#matrix').addEventListener('click',e=>{const el=e.target.closest('[data-tr]');if(!el)return;const r=d.transportadores.find(r=>r.tag===el.dataset.tr);show(`<span class="eyebrow">BLOCO 1 • DETALHAMENTO</span><h2>${r.tag}</h2><p>Responsável: ${r.responsavel}</p>${r.status.map((s,i)=>`<div class="detail-row"><span>${d.atividades[i]}</span><span><b class="key ${s}">${states[s].icon}</b>${states[s].label}</span></div>`).join('')}`)});
document.querySelector('#blocks').addEventListener('click',e=>{const el=e.target.closest('[data-block]');if(!el)return;const i=Number(el.dataset.block),b=d.blocos[i];if(!i){document.querySelector('#filter').value='all';document.querySelector('#search').value='';render();document.querySelector('.checklist').scrollIntoView({behavior:'smooth'});return}show(`<span class="eyebrow">${b.nome.toUpperCase()}</span><h2>${b.escopo}</h2><span class="badge ${i===1?'amber':'gray'}">${b.status}</span><p>${i===1?'Desmontagem de alguns componentes para a Continental iniciar o lançamento. O relato não discrimina as atividades nem o avanço de cada TR.':'Não foram fornecidos dados de avanço para os equipamentos deste bloco.'}</p>`)});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('#search').addEventListener('input',render);
document.querySelector('#filter').addEventListener('change',render);
document.querySelector('#export').addEventListener('click',()=>{const a=document.createElement('a');a.href='data/checklist.csv';a.download='checklist-transportadores.csv';a.click()});
render();
