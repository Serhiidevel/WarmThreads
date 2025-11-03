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
  spaceBetween: 20,
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: false,
});
