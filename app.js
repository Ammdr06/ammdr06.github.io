'use strict';

// Publication details transcribed from the supplied academic CVs.
const publications = [
  {id:'mahadeer2026hash',year:2026,type:'journal',area:'encryption',title:'Enhancing Grayscale Image Encryption through Petri Net Dynamics and Hash-Extracted Keystreams',authors:['Mahadeer A','Arulprakasam R','Gurusamy R','Yilun Shang'],journal:'Journal of Cybersecurity',details:'12(1), 1–19',volume:'12',number:'1',pages:'1--19',doi:'10.1093/cybsec/tyag019'},
  {id:'mahadeer2026tentsine',year:2026,type:'journal',area:'encryption',title:'Petri Net-Driven Expanding Tent–Sine Chaotic Keystream Generator with Adaptive Token Flow for Image Encryption',authors:['Mahadeer A','Arulprakasam R'],journal:'Information Sciences',details:'748, Article 123515',volume:'748',eid:'123515',doi:'10.1016/j.ins.2026.123515'},
  {id:'mahadeer2026permutation',year:2026,type:'journal',area:'encryption',title:'Image Encryption Using Petri Net Dynamics with Pixel Permutation and Keystream Masking',authors:['Mahadeer A','Arulprakasam R'],journal:'Nonlinear Dynamics',details:'114(8), Article 547',volume:'114',number:'8',eid:'547',doi:'10.1007/s11071-026-12413-y'},
  {id:'mahadeer2026prng',year:2026,type:'journal',area:'encryption',title:'A Petri Net Token-Flow PRNG for Grayscale Image Encryption',authors:['Mahadeer A','Arulprakasam R','Gurusamy R','Yilun Shang'],journal:'New Mathematics and Natural Computation',details:'2026',doi:'10.1142/S179300572850041X'},
  {id:'mahadeer2025segmentation',year:2025,type:'journal',area:'segmentation',title:'Adaptive Petri Net Token Flow Approach for Enhanced Grayscale Image Segmentation',authors:['Mahadeer A','Arulprakasam R','Gurusamy R','Yilun Shang'],journal:'IET Image Processing',details:'19(1), e70255',volume:'19',number:'1',eid:'e70255',doi:'10.1049/ipr2.70255'},
  {id:'mahadeer2025watsoncrick',year:2025,type:'journal',area:'formal',title:'Watson–Crick Partial Petri Net Languages and their Properties',authors:['Mahadeer A','Arulprakasam R','Dare V R'],journal:'International Journal of Information Technology',details:'17(4), 2553–2569',volume:'17',number:'4',pages:'2553--2569',doi:'10.1007/s41870-024-02272-4'},
  {id:'mahadeer2024partial',year:2024,type:'journal',area:'formal',title:'Partial Petri Net Languages and their Properties',authors:['Mahadeer A','Arulprakasam R','Dare V R'],journal:'International Journal of Information Technology',details:'16(6), 3663–3676',volume:'16',number:'6',pages:'3663--3676',doi:'10.1007/s41870-024-01903-0'},
  {id:'mahadeer2026healthcare',year:2026,type:'chapter',area:'healthcare',title:'A Partial Petri Net Framework for Addressing Uncertainty in Healthcare Processes',authors:['Mahadeer A','Arulprakasam R'],journal:'Applied Mathematics, Automation and Computing',details:'CRC Press, Taylor & Francis, 2026',publisher:'CRC Press, Taylor & Francis',doi:'10.1201/9781003770497'}
];

const areas = {formal:'Formal languages',segmentation:'Image segmentation',encryption:'Image encryption',healthcare:'Healthcare processes'};
const list = document.querySelector('#publication-list');
const search = document.querySelector('#publication-search');
const areaSelect = document.querySelector('#area-filter');
const yearSelect = document.querySelector('#year-filter');
const count = document.querySelector('#publication-count');
const empty = document.querySelector('#empty-results');
const typeButtons = [...document.querySelectorAll('.pub-tabs button')];
let selectedType = 'all';
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const authorList = (authors) => authors.length === 2 ? authors.join(' and ') : authors.slice(0,-1).join(', ') + ', and ' + authors.at(-1);
const citation = (pub) => `${authorList(pub.authors)}. (${pub.year}). ${pub.title}. ${pub.type === 'chapter' ? 'In ' : ''}${pub.journal}${pub.details !== String(pub.year) ? ', ' + pub.details : ''}. https://doi.org/${pub.doi}`;

function renderPublications() {
  const query = search.value.trim().toLocaleLowerCase();
  const filtered = publications.filter(pub =>
    (selectedType === 'all' || pub.type === selectedType) &&
    (areaSelect.value === 'all' || pub.area === areaSelect.value) &&
    (yearSelect.value === 'all' || String(pub.year) === yearSelect.value) &&
    `${pub.title} ${pub.authors.join(' ')} ${pub.journal} ${pub.doi} ${areas[pub.area]} ${pub.year}`.toLocaleLowerCase().includes(query)
  );
  list.innerHTML = filtered.map(pub => `<article class="publication">
    <div class="pub-year">${pub.year}<span>${pub.type === 'journal' ? 'Article' : 'Chapter'}</span></div>
    <div class="pub-content"><h3><a href="https://doi.org/${escapeHTML(pub.doi)}" target="_blank" rel="noopener noreferrer">${escapeHTML(pub.title)}</a></h3>
    <p class="pub-authors">${escapeHTML(authorList(pub.authors)).replace('Mahadeer A','<strong>Mahadeer A</strong>')}</p>
    <p class="pub-journal">${pub.type === 'chapter' ? 'In ' : ''}<em>${escapeHTML(pub.journal)}</em>${pub.details !== String(pub.year) ? ' · ' + escapeHTML(pub.details) : ''}</p>
    <div class="pub-bottom"><span class="pub-topic">${areas[pub.area]}</span><button class="citation-button" data-id="${pub.id}" aria-label="Cite ${escapeHTML(pub.title)}">Cite</button></div></div>
    <a class="pub-read" href="https://doi.org/${escapeHTML(pub.doi)}" target="_blank" rel="noopener noreferrer" aria-label="${pub.type === 'chapter' ? 'View book' : 'Read paper'}: ${escapeHTML(pub.title)}">${pub.type === 'chapter' ? 'View book' : 'Read paper'} <span aria-hidden="true">↗</span></a>
  </article>`).join('');
  count.textContent = `Showing ${filtered.length} of ${publications.length} publications`;
  empty.hidden = filtered.length !== 0;
}

function setType(value) {
  selectedType = value;
  typeButtons.forEach(button => {
    const active = button.dataset.type === value;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}

typeButtons.forEach(button => button.addEventListener('click',() => {setType(button.dataset.type);renderPublications();}));
search.addEventListener('input',renderPublications);
areaSelect.addEventListener('change',renderPublications);
yearSelect.addEventListener('change',renderPublications);
document.querySelector('#reset-filters').addEventListener('click',() => {setType('all');search.value='';areaSelect.value='all';yearSelect.value='all';renderPublications();search.focus();});
document.querySelectorAll('.research-filter').forEach(button => button.addEventListener('click',() => {
  setType('all');search.value='';yearSelect.value='all';areaSelect.value=button.dataset.area;renderPublications();
  document.querySelector('#publications').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  areaSelect.focus({preventScroll:true});
}));

let toastTimeout;
function showToast(message) {
  const toast=document.querySelector('#toast');
  clearTimeout(toastTimeout);toast.textContent=message;toast.classList.add('visible');
  toastTimeout=setTimeout(() => toast.classList.remove('visible'),3200);
}

async function copyText(value) {
  if(navigator.clipboard && window.isSecureContext) {
    try {await navigator.clipboard.writeText(value);return true;} catch { /* Try the local selection fallback. */ }
  }
  const field=document.createElement('textarea');
  field.value=value;field.style.cssText='position:fixed;left:-9999px;top:0;opacity:0;';field.setAttribute('aria-hidden','true');
  const parent=document.querySelector('#citation-dialog').open?document.querySelector('#citation-dialog'):document.body;
  const previousFocus=document.activeElement;
  parent.appendChild(field);field.focus();field.select();
  let copied=false;
  try {copied=document.execCommand('copy');} catch { /* Manual copying remains available. */ }
  field.remove();previousFocus?.focus({preventScroll:true});return copied;
}

const citationDialog=document.querySelector('#citation-dialog');
const citationText=document.querySelector('#citation-text');
list.addEventListener('click',event => {
  const button=event.target.closest('.citation-button');if(!button)return;
  const pub=publications.find(item => item.id===button.dataset.id);if(!pub)return;
  citationText.textContent=citation(pub);citationDialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click',() => citationDialog.close());
citationDialog.addEventListener('click',event => {if(event.target===citationDialog){const rect=citationDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)citationDialog.close();}});
document.querySelector('#dialog-copy').addEventListener('click',async () => {
  if(await copyText(citationText.textContent)){citationDialog.close();showToast('Citation copied to clipboard.');}
  else{citationText.focus();const range=document.createRange();range.selectNodeContents(citationText);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);showToast('Citation selected. Use your device’s Copy command.');}
});
document.querySelector('.copy-email').addEventListener('click',async () => {
  showToast(await copyText('ammdr62424@gmail.com')?'Email address copied.':'Email: ammdr62424@gmail.com');
});

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
function closeMenu(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}
menuToggle.addEventListener('click',() => {const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => {if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuToggle.focus();}});
document.addEventListener('click',event => {if(!event.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width: 921px)').addEventListener('change',event => {if(event.matches)closeMenu();});

if('IntersectionObserver' in window) {
  const links=[...nav.querySelectorAll('a')];
  const observer=new IntersectionObserver(entries => {
    entries.forEach(entry => {if(entry.isIntersecting){links.forEach(link => {if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});
  },{rootMargin:'-12% 0px -65% 0px',threshold:0});
  ['home','about','research','publications','academic','contact'].forEach(id => observer.observe(document.getElementById(id)));
}

renderPublications();
