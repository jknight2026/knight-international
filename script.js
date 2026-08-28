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

// Keep the 300x400 founder portrait at a true 2x display density so it stays crisp.
const founderPhotoFix=document.createElement('style');
founderPhotoFix.textContent=`
.founder-card{grid-template-columns:minmax(0,1fr) 190px;align-items:stretch}
.founder-photo{margin:0;min-height:100%;display:grid;place-items:center;padding:24px 20px;background:radial-gradient(circle at 50% 35%,rgba(22,167,255,.12),#09111a 72%)}
.founder-photo img{width:150px!important;height:200px!important;max-width:150px;object-fit:cover!important;object-position:50% 27%;display:block;border-radius:12px;border:1px solid rgba(96,200,255,.28);box-shadow:0 18px 40px rgba(0,0,0,.38),0 0 28px rgba(22,167,255,.10)}
@media(max-width:780px){.founder-card{grid-template-columns:1fr}.founder-photo{min-height:auto;padding:24px}.founder-photo img{width:150px!important;height:200px!important}}
`;
document.head.appendChild(founderPhotoFix);