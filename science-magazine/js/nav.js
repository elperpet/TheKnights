(function(){
  var bar=document.querySelector('.bar'),btn=bar&&bar.querySelector('.menu-btn'),menu=bar&&bar.querySelector('.menu');
  if(!btn||!menu)return;
  bar.classList.add('has-menu');btn.hidden=false;
  function set(open){
    bar.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
  }
  btn.addEventListener('click',function(e){e.stopPropagation();set(!bar.classList.contains('open'));});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});
  document.addEventListener('click',function(e){if(!bar.contains(e.target))set(false);});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&bar.classList.contains('open')){set(false);btn.focus();}
  });
  window.addEventListener('resize',function(){if(window.innerWidth>640)set(false);});
})();
