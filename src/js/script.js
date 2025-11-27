import 'purecss/build/pure-min.css';
import '../sass/ui/style.scss';      // Подключаем SCSS файл непонятно работает или нет 


// Импорт Swiper и нужных модулей
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

// Импорт базовых стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';

// Инициализация слайдера
const swiper = new Swiper('.mySwiper', {
  modules: [Navigation], // подключаем стрелки
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
    // Отключаем swiper на экранах 1440px и больше
    1440: {
      enabled: false,
    },
  },
});



const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const closeBtn = document.getElementById('close-btn');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('active');
  closeBtn.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});