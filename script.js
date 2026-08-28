const tabs=[...document.querySelectorAll('.tab')];
const links=[...document.querySelectorAll('[data-tab]')];
function showTab(id){
  tabs.forEach(t=>t.classList.toggle('active',t.id===id));
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.toggle('active',n.dataset.tab===id));
  document.querySelector('nav')?.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
links.forEach(el=>el.addEventListener('click',e=>{
  const id=el.dataset.tab;
  if(id){e.preventDefault();showTab(id);}
}));
document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('nav')?.classList.toggle('open'));