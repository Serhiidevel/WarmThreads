
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
    if (link.id !== 'mobile-cart-link') {
      link.addEventListener('click', closeMenu);
    }
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


let cartItems = [];
let cartCount = 0;


function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  const mobileCartLink = document.getElementById('mobile-cart-link');
  if (cartBadge) {
    if (cartCount > 0) {
      cartBadge.textContent = cartCount;
      cartBadge.classList.add('active');
    } else {
      cartBadge.classList.remove('active');
    }
  }
  if (mobileCartLink) {
    mobileCartLink.classList.toggle('has-items', cartCount > 0);
  }
}


function addToCart(productName, productImg, productPrice) {
  const item = {
    id: Date.now(),
    name: productName,
    image: productImg,
    price: productPrice
  };
  cartItems.push(item);
  cartCount = cartItems.length;
  updateCartBadge();
  renderCart();
}


function removeFromCart(itemId) {
  cartItems = cartItems.filter(item => item.id !== itemId);
  cartCount = cartItems.length;
  updateCartBadge();
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  
  if (!cartItemsContainer) return;
  
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<div class="cart-empty" id="cart-empty"><p>Your cart is empty</p></div>';
    return;
  }
  
  cartItemsContainer.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item__image">
      <div class="cart-item__info">
        <h3 class="cart-item__name">${item.name}</h3>
        <p class="cart-item__price">${item.price}</p>
      </div>
      <button class="cart-item__remove" data-item-id="${item.id}">✕</button>
    </div>
  `).join('');
  

  cartItemsContainer.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.getAttribute('data-item-id'));
      removeFromCart(itemId);
    });
  });
}

function openCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal && cartModal.classList.contains('active')) {
    cartModal.classList.remove('active');
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 300);
  }
}


function createFlyingAnimation(productImg, button) {
  const imgSrc = productImg.src;
  const imgRect = productImg.getBoundingClientRect();
  
  const cartWrapper = document.querySelector('.logo-cart-wrapper');
  const cartIcon = document.querySelector('.logo-cart');
  
  if (!cartWrapper) {
    cartCount++;
    updateCartBadge();
    return;
  }
  
  const cartRect = cartWrapper.getBoundingClientRect();
  

  const startX = imgRect.left + imgRect.width / 2;
  const startY = imgRect.top + imgRect.height / 2;
  const endX = cartRect.left + cartRect.width / 2;
  const endY = cartRect.top + cartRect.height / 2;
  

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  

  const flyingItem = document.createElement('div');
  flyingItem.className = 'cart-flying-item';
  flyingItem.style.left = startX + 'px';
  flyingItem.style.top = startY + 'px';
  flyingItem.style.width = Math.min(imgRect.width, 120) + 'px';
  flyingItem.style.height = Math.min(imgRect.height, 120) + 'px';
  

  document.documentElement.style.setProperty('--cart-x', deltaX + 'px');
  document.documentElement.style.setProperty('--cart-y', deltaY + 'px');
  

  const flyingImg = document.createElement('img');
  flyingImg.src = imgSrc;
  flyingImg.alt = 'Product';
  flyingItem.appendChild(flyingImg);
  

  document.body.appendChild(flyingItem);
  

  setTimeout(() => {
    flyingItem.remove();
    

    const slideInner = button.closest('.slide-inner');
    if (slideInner) {
      const productNameEl = slideInner.querySelector('.portfolio_name');
      const productPriceEl = slideInner.querySelector('.portfolio_price span');
      const productName = productNameEl ? productNameEl.textContent.trim() : 'Product';
      const productPrice = productPriceEl ? productPriceEl.textContent.trim() : '€ 0';
      

      addToCart(productName, imgSrc, productPrice);
    }
    

    if (cartIcon && cartIcon.offsetParent !== null) {
      cartIcon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartIcon.style.transform = '';
      }, 200);
    }
  }, 800);
}


function initCartButtons() {

  document.addEventListener('click', function(e) {

    const button = e.target.closest('.portfolio__btn');
    if (button) {
      e.preventDefault();
      e.stopPropagation();
      

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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCartButtons();
    initCartModal();
  });
} else {
  initCartButtons();
  initCartModal();
}


function initCartModal() {
  const cartWrapper = document.querySelector('.logo-cart-wrapper');
  const cartModal = document.getElementById('cart-modal');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = cartModal?.querySelector('.cart-modal__overlay');
  const mobileCartLink = document.getElementById('mobile-cart-link');
  const navLinks = document.getElementById('nav-links');
  const burger = document.getElementById('burger');
  

  if (cartWrapper) {
    cartWrapper.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }
  
  if (mobileCartLink) {
    mobileCartLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (navLinks) {
        navLinks.classList.remove('active');
      }
      if (burger) {
        burger.classList.remove('active');
      }
      setTimeout(() => {
        openCart();
      }, 400);
    });
  }
  
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal?.classList.contains('active')) {
      closeCart();
    }
  });

  renderCart();
}