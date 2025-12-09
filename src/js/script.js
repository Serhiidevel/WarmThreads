// Plain JS version for GitHub Pages (no bundler required)
document.addEventListener('DOMContentLoaded', () => {
  // Swiper (expects Swiper from CDN script)
  const swiper = new Swiper('.mySwiper', {
    modules: [Swiper.Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 5,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: false,
    breakpoints: {
      1440: { enabled: false },
    },
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
});