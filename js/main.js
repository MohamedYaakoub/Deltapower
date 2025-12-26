document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".figure-number");
  const duration = 2000; // total animation duration in ms

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // clamp between 0–1
      counter.textContent = Math.floor(progress * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target.toLocaleString(); // ensure final value
      }
    };

    requestAnimationFrame(animate);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const mapFrame = document.getElementById("map-frame");
  const regionItems = document.querySelectorAll(".locations-list li");

  regionItems.forEach(item => {
    item.addEventListener("click", () => {
      const newMap = item.getAttribute("data-map");
      mapFrame.src = newMap;
    });
  });
});






