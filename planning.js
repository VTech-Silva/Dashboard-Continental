'use strict';

const planning = window.DASHBOARD_PLANNING;
const stepNames = {
  prep: 'Preparação mecânica',
  launch: 'Lançamento',
  splice: 'Emenda',
  mechanical: 'Recomposição mecânica',
  paint: 'Pintura',
  electrical: 'Elétrica',
  handover: 'Entrega programada'
};

function shortDate(date) {
  const [, month, day] = date.split('-');
  return day + '/' + month;
}

function windowText([start, end]) {
  return start === end ? shortDate(start) : shortDate(start) + ' a ' + shortDate(end);
}

document.querySelector('#milestones').innerHTML = planning.milestones.map(item => {
  const label = item.block === 1 ? 'Marco contratual · TR09–20' : 'Conclusão eletromecânica · TR26–28';
  return `<article class="panel milestone">
    <div><span>${label}</span><strong>${shortDate(item.date)}/2026</strong></div>
    <span class="muted">Início programado ${shortDate(item.start)}</span>
  </article>`;
}).join('');

const scheduleTable = document.querySelector('#schedule-matrix');
const scheduleButtons = [...document.querySelectorAll('[data-schedule]')];

function renderSchedule(block) {
  scheduleButtons.forEach(button => {
    button.setAttribute('aria-pressed', Number(button.dataset.schedule) === block);
  });
  const steps = block === 1
    ? ['launch', 'splice', 'mechanical', 'electrical', 'handover']
    : ['prep', 'launch', 'splice', 'mechanical', 'electrical'];
  const rows = planning.rows.filter(row => row.block === block);
  const header = steps.map(step => `<th scope="col">${stepNames[step]}</th>`).join('');
  const body = rows.map(row => `<tr>
    <th scope="row"><button type="button" class="tr-button" data-planned-tr="${row.tr}">TR-2036KS-${row.tr}</button></th>
    ${steps.map(step => `<td>${windowText(row.windows[step])}</td>`).join('')}
    <td><strong>${shortDate(row.end)}</strong></td>
  </tr>`).join('');
  scheduleTable.innerHTML = `<thead><tr><th scope="col">Transportador</th>${header}
    <th scope="col">Fim programado do TR</th></tr></thead><tbody>${body}</tbody>`;
  const note = block === 1
    ? 'O marco contratual de 13/10 e as janelas desta tabela são datas programadas.'
    : 'As datas mostram a programação. O status de campo informado para o bloco é de desmontagem para liberar o lançamento.';
  document.querySelector('#schedule-note').textContent = note;
}

scheduleButtons.forEach(button => {
  button.addEventListener('click', () => renderSchedule(Number(button.dataset.schedule)));
});

scheduleTable.addEventListener('click', event => {
  const button = event.target.closest('[data-planned-tr]');
  if (!button) return;
  const row = planning.rows.find(item => item.tr === button.dataset.plannedTr);
  const belt = row.belt;
  const details = Object.entries(row.windows).map(([step, dates]) =>
    `<div class="detail-row"><span>${stepNames[step]}</span><strong>${windowText(dates)}</strong></div>`
  ).join('');
  show(`<span class="eyebrow">BLOCO ${row.block} · PLANEJAMENTO 2026</span>
    <h2>TR-2036KS-${row.tr}</h2>
    <p>Janela do transportador · ${windowText([row.start, row.end])}</p>
    ${details}
    <h3>Correia PN4000</h3>
    <p>${num(belt.width)} mm de largura · ${num(belt.thickness)} mm de espessura total
    · cobertura superior/inferior de ${belt.top}/${belt.bottom} mm.</p>
    <p>~${num(belt.circuit)} m de correia no circuito · uma bobina de ${num(belt.roll)} m
    e ${num(belt.weight)} t · uma emenda.</p>`);
});

const totalHours = planning.steps.reduce((sum, step) => sum + step.hours, 0);
document.querySelector('#work-split').innerHTML = planning.steps.map(step => `<li>
  <span>${step.label}</span><strong>${num(step.hours)} h</strong>
  <div class="work-bar"><i style="width:${step.hours / totalHours * 100}%"></i></div>
</li>`).join('');

renderSchedule(2);
