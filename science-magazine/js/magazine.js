(function(){
  var book=document.getElementById('book');
  var pages=[].slice.call(book.querySelectorAll('.page'));
  var N=pages.length,cur=0,ind=document.getElementById('ind');
  var prev=document.getElementById('prev'),next=document.getElementById('next');
  pages.forEach(function(p,i){p.style.zIndex=N-i;});
  function go(i,noHash){
    i=Math.max(0,Math.min(N-1,i));cur=i;
    pages.forEach(function(p,j){p.classList.toggle('turned',j<i);});
    var inner=pages[i].querySelector('.inner');if(inner)inner.scrollTop=0;
    ind.textContent=(i+1)+' / '+N;prev.disabled=i===0;next.disabled=i===N-1;
    if(!noHash){try{history.replaceState(null,'','#p'+(i+1));}catch(e){location.hash='p'+(i+1);}}
  }
  prev.onclick=function(){go(cur-1)};next.onclick=function(){go(cur+1)};
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown')go(cur+1);
    if(e.key==='ArrowLeft'||e.key==='PageUp')go(cur-1);
  });
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-go]');
    if(a){e.preventDefault();go(parseInt(a.getAttribute('data-go'),10)-1);}
  });
  var sx=null;
  book.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});
  book.addEventListener('touchend',function(e){
    if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;
    if(Math.abs(dx)>70)go(dx<0?cur+1:cur-1);
  });
  window.addEventListener('hashchange',function(){var m=/^#p(\d+)$/.exec(location.hash);if(m)go(+m[1]-1,true);});
  var m=/^#p(\d+)$/.exec(location.hash);go(m?+m[1]-1:0,true);
})();
