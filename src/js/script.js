
function initApp() {
  if (!window.Swiper) {
    setTimeout(initApp, 50);
    return;
  }

  const swiperElements = document.querySelectorAll('.mySwiper');
  swiperElements.forEach(swiperEl => {
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

  function closeMenu() {
    if (navLinks) {
      navLinks.classList.remove('active');
    }
    if (burger) {
      burger.classList.remove('active');
    }
  }

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  const menuLinks = document.querySelectorAll('.nav-links a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

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


  document.querySelectorAll('.fade-img').forEach(img => {
    if (img.complete) {

      img.classList.add('loaded');
    } else {

      img.onload = () => img.classList.add('loaded');
    }
  });
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {

  initApp();
}


const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
