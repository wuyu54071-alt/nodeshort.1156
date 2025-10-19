// === Unified carousel initializer (desktop & mobile) — shift by 1 item ===
(function(){
  function onReady(fn){
    if(document.readyState!=='loading'){ fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }
  function initCarousel(trackId, visible, intervalMs){
    var track = document.getElementById(trackId);
    if(!track) return;
    var slides = Array.prototype.slice.call(track.children);
    if(slides.length===0) return;

    var total = slides.length;          // original count
    var stepPct = 100/visible;          // each slide width percent when 3-up is 33.333%
    // clone first 'visible' for seamless
    for(var i=0;i<Math.min(visible, slides.length);i++){
      track.appendChild(slides[i].cloneNode(true));
    }
    var idx=0, lock=false;
    function go(){
      if(lock) return; lock=true;
      idx += 1; // shift by ONE item
      track.style.transition = 'transform .6s ease';
      track.style.transform  = 'translateX(-'+(idx*stepPct)+'%)';
    }
    track.addEventListener('transitionend', function(){
      lock=false;
      if(idx>=total){
        track.style.transition='none';
        idx=0;
        track.style.transform='translateX(0)';
        void track.offsetWidth;
      }
    });
    setInterval(go, intervalMs||3000);
  }
  onReady(function(){
    // desktop: keep 3-up
    initCarousel('track', 3, 3000);
    // mobile: 3-up, shift by 1 every tick
    if(window.matchMedia && window.matchMedia('(max-width: 768px)').matches){
      initCarousel('track_m', 3, 3000);
    }
  });
})();
