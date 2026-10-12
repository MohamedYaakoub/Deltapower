document.addEventListener("DOMContentLoaded", () => {
  // Count-up animation for the key figures
  const duration = 2000; // ms

  document.querySelectorAll(".figure-number").forEach(counter => {
    const target = +counter.dataset.target;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });

  // Switch the map when a region is clicked
  const mapFrame = document.getElementById("map-frame");

  document.querySelectorAll(".locations-list li").forEach(item => {
    item.addEventListener("click", () => {
      mapFrame.src = item.dataset.map;
    });
  });
});
