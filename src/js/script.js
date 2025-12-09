// Wait for both DOM and Swiper to be ready
function initApp() {
  if (!window.Swiper) {
    // Swiper not loaded yet, wait a bit more
    setTimeout(initApp, 50);
    return;
  }

  // Initialize Swiper for each instance
  const swiperElements = document.querySelectorAll('.mySwiper');
  swiperElements.forEach(swiperEl => {
    // Find navigation buttons within this swiper's parent container
    const nextBtn = swiperEl.parentElement?.querySelector('.swiper-button-next') || 
                     swiperEl.querySelector('.swiper-button-next');
    const prevBtn = swiperEl.parentElement?.querySelector('.swiper-button-prev') || 
                     swiperEl.querySelector('.swiper-button-prev');
    
    new Swiper(swiperEl, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 5,
      speed: 500,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      a11y: false,
      breakpoints: {
        1440: { enabled: false },
      },
    });
  });

  // Burger menu
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  const closeBtn = document.getElementById('close-btn');

  if (burger && navLinks && closeBtn) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('active');
    });
    closeBtn.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
    });
  }

  // Reveal animations
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll('.reveal, .fade-up, .slide-left, .fade-scale')
    .forEach(el => observer.observe(el));

  // Fade-in images on load
  document.querySelectorAll('.fade-img').forEach(img => {
    if (img.complete) {
      // Image already loaded
      img.classList.add('loaded');
    } else {
      // Wait for image to load
      img.onload = () => img.classList.add('loaded');
    }
  });
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already loaded
  initApp();
}