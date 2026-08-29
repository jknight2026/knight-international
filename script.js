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

// Add the public-facing Guardian Angel Campus concept artwork to the Guardian tab.
const guardianPage=document.getElementById('guardian');
if(guardianPage && !guardianPage.querySelector('.guardian-marketing-art')){
  const artWrap=document.createElement('figure');
  artWrap.className='guardian-marketing-art';
  artWrap.innerHTML=`<img src="assets/Image%2017.jpeg?v=20260829-1" alt="Guardian Angel Campus concept visualization showing a school safety platform" loading="eager" />
  <figcaption>Concept visualization — product currently in development.</figcaption>`;
  const projectLayout=guardianPage.querySelector('.project-layout');
  guardianPage.insertBefore(artWrap,projectLayout);

  const artStyles=document.createElement('style');
  artStyles.textContent=`
    .guardian-marketing-art{margin:0 0 2rem;padding:0;border:1px solid rgba(212,165,82,.28);border-radius:22px;overflow:hidden;background:#07101a;box-shadow:0 24px 70px rgba(0,0,0,.35)}
    .guardian-marketing-art img{display:block;width:100%;height:auto;max-height:760px;object-fit:cover}
    .guardian-marketing-art figcaption{padding:.8rem 1rem;color:#aeb8c4;font-size:.82rem;letter-spacing:.03em;border-top:1px solid rgba(255,255,255,.08)}
    @media (max-width:800px){.guardian-marketing-art{border-radius:16px;margin-bottom:1.35rem}.guardian-marketing-art img{max-height:none}.guardian-marketing-art figcaption{font-size:.76rem}}
  `;
  document.head.appendChild(artStyles);
}

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
