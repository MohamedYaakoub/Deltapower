document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");

  // Header: border/shadow once the page is scrolled
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  toggle.addEventListener("click", () => {
    const open = navbar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Fade sections in as they scroll into view
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Count-up animation, started when the figures come into view
  const duration = 2000; // ms

  const countUp = (counter) => {
    const target = +counter.dataset.target;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll("[data-target]").forEach(el => counterObserver.observe(el));

  // Switch the map when a region is selected
  const mapFrame = document.getElementById("map-frame");
  const regions = document.querySelectorAll(".region");

  regions.forEach(region => {
    region.addEventListener("click", () => {
      regions.forEach(r => {
        r.classList.toggle("is-active", r === region);
        r.setAttribute("aria-pressed", r === region);
      });
      mapFrame.src = region.dataset.map;
    });
  });
});

// Contact form: send to Web3Forms in the background and show the result in place.
// Without JavaScript the form still posts normally to Web3Forms.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".form-status");
  const buttonHTML = button.innerHTML;

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = `form-status is-${type}`;
    status.hidden = false;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = form.dataset.sending;
    status.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error(result.message);

      form.reset();
      showStatus(form.dataset.success, "success");
    } catch (error) {
      showStatus(form.dataset.error, "error");
    } finally {
      button.disabled = false;
      button.innerHTML = buttonHTML;
    }
  });
});
