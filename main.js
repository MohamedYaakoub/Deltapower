// simple intersection-triggered count-up (editable targets)
(function(){
  const opts = { root: null, rootMargin: '0px', threshold: 0.25 };
  const elems = document.querySelectorAll('.kf-number');
  let started = false;

  function formatNumber(n){
    return n.toLocaleString(); // adds commas (e.g., 1,000)
  }

  function countUp(el, target, duration=1500){
    const start = 0;
    const startTime = performance.now();
    function step(now){
      const progress = Math.min((now - startTime)/duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = formatNumber(value);
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(target);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !started){
        started = true;
        elems.forEach(el => {
          const t = parseInt(el.getAttribute('data-target')) || 0;
          countUp(el, t, 1600);
        });
        obs.disconnect();
      }
    });
  }, opts);

  if(elems.length) io.observe(document.querySelector('#key-figures'));
})();
