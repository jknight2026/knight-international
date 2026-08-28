const pages=[...document.querySelectorAll('.page')];
const links=[...document.querySelectorAll('.nav-link')];
const menu=document.querySelector('.nav');
const toggle=document.querySelector('.menu-toggle');
function showPage(name,push=true){
  const target=document.getElementById(name)||document.getElementById('home');
  pages.forEach(p=>p.classList.toggle('active',p===target));
  links.forEach(l=>l.classList.toggle('active',l.dataset.page===target.id&&l.closest('.nav')));
  menu?.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'smooth'});
  if(push) history.replaceState(null,'','#'+target.id);
  document.title=target.id==='home'?'Knight International':`${target.querySelector('h1')?.textContent.trim()||'Knight International'} | Knight International`;
}
links.forEach(link=>link.addEventListener('click',()=>showPage(link.dataset.page)));
toggle?.addEventListener('click',()=>{const open=menu?.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
const initial=location.hash.replace('#','');if(initial)showPage(initial,false);
document.getElementById('demo-form')?.addEventListener('submit',e=>{e.preventDefault();const name=new FormData(e.currentTarget).get('name')||'there';document.querySelector('.form-status').textContent=`Thanks, ${name}. This preview form is working, but no message was sent.`;});