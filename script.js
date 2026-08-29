const legalStyles=document.createElement('link');
legalStyles.rel='stylesheet';
legalStyles.href='legal.css?v=20260828-6';
document.head.appendChild(legalStyles);

// Restore the public navigation names selected before the legal-cleanup pass.
const publicNavLabels={
  home:'Home',
  about:'About',
  guardian:'Guardian Angel',
  detection:'Safe Entry Detection',
  water:'Water From Air',
  vanguard:'K.I.S. Vanguard',
  contact:'Contact'
};
document.querySelectorAll('.nav .nav-link').forEach(link=>{
  const label=publicNavLabels[link.dataset.page];
  if(label) link.textContent=label;
});

// Force the homepage to use the founder portrait uploaded on August 29, 2026.
const founderImage=document.querySelector('.founder-photo img');
if(founderImage) founderImage.src='assets/Image%2015.jpeg?v=20260829-1';

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
  const heading=target.querySelector('h1')?.textContent.trim();
  document.title=target.id==='home'?'Knight International Inc.':`${heading||'Knight International'} | Knight International Inc.`;
}

links.forEach(link=>link.addEventListener('click',()=>showPage(link.dataset.page)));
toggle?.addEventListener('click',()=>{
  const open=menu?.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});
window.addEventListener('hashchange',()=>showPage(location.hash.replace('#','')||'home',false));
const initial=location.hash.replace('#','');
if(initial) showPage(initial,false);

const contactForm=document.getElementById('contact-form');
contactForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(contactForm);
  const name=(data.get('name')||'').toString().trim();
  const email=(data.get('email')||'').toString().trim();
  const topic=(data.get('topic')||'General inquiry').toString();
  const message=(data.get('message')||'').toString().trim();
  const destination=topic==='Partnership'?'partnerships@KnightIntlTech.com':topic==='Research collaboration'?'research@KnightIntlTech.com':topic==='Investment'?'investors@KnightIntlTech.com':'contact@KnightIntlTech.com';
  const subject=encodeURIComponent(`[Knight International Website] ${topic} — ${name}`);
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
  const status=contactForm.querySelector('.form-status');
  if(status) status.textContent='Opening your email app with the message prepared…';
  window.location.href=`mailto:${destination}?subject=${subject}&body=${body}`;
});
