
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

// Cart functionality
let cartCount = 0;

// Function to update cart badge
function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    if (cartCount > 0) {
      cartBadge.textContent = cartCount;
      cartBadge.classList.add('active');
    } else {
      cartBadge.classList.remove('active');
    }
  }
}

// Function to create flying animation
function createFlyingAnimation(productImg, button) {
  // Get product image source and dimensions
  const imgSrc = productImg.src;
  const imgRect = productImg.getBoundingClientRect();
  
  // Get cart icon position
  const cartWrapper = document.querySelector('.logo-cart-wrapper');
  const cartIcon = document.querySelector('.logo-cart');
  
  if (!cartWrapper) {
    // If cart is not available, just update count
    cartCount++;
    updateCartBadge();
    return;
  }
  
  const cartRect = cartWrapper.getBoundingClientRect();
  
  // Calculate positions
  const startX = imgRect.left + imgRect.width / 2;
  const startY = imgRect.top + imgRect.height / 2;
  const endX = cartRect.left + cartRect.width / 2;
  const endY = cartRect.top + cartRect.height / 2;
  
  // Calculate distance for animation
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  
  // Create flying element
  const flyingItem = document.createElement('div');
  flyingItem.className = 'cart-flying-item';
  flyingItem.style.left = startX + 'px';
  flyingItem.style.top = startY + 'px';
  flyingItem.style.width = Math.min(imgRect.width, 120) + 'px';
  flyingItem.style.height = Math.min(imgRect.height, 120) + 'px';
  
  // Set CSS variables for animation end position
  document.documentElement.style.setProperty('--cart-x', deltaX + 'px');
  document.documentElement.style.setProperty('--cart-y', deltaY + 'px');
  
  // Create image inside flying element
  const flyingImg = document.createElement('img');
  flyingImg.src = imgSrc;
  flyingImg.alt = 'Product';
  flyingItem.appendChild(flyingImg);
  
  // Add to body
  document.body.appendChild(flyingItem);
  
  // Remove after animation
  setTimeout(() => {
    flyingItem.remove();
    // Update cart count and badge
    cartCount++;
    updateCartBadge();
    
    // Add bounce effect to cart icon if visible
    if (cartIcon && cartIcon.offsetParent !== null) {
      cartIcon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartIcon.style.transform = '';
      }, 200);
    }
  }, 800);
}

// Add event listeners to all "Add to Cart" buttons using event delegation
function initCartButtons() {
  // Use event delegation to handle clicks on add to cart buttons
  document.addEventListener('click', function(e) {
    // Check if the clicked element is an add to cart button or is inside one
    const button = e.target.closest('.portfolio__btn');
    if (button) {
      e.preventDefault();
      e.stopPropagation();
      
      // Find the product image in the same slide
      const slideInner = button.closest('.slide-inner');
      if (slideInner) {
        const productImg = slideInner.querySelector('img');
        if (productImg) {
          createFlyingAnimation(productImg, button);
        }
      }
    }
  });
}

// Initialize cart buttons when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCartButtons);
} else {
  initCartButtons();
}