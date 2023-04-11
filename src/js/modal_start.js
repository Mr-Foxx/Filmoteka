import axios from 'axios';
import Notiflix from 'notiflix';
import fetchMovies from './fetch_start';

const containerModal = document.querySelector('.modal__content');

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

// menu
// (() => {
//     const menuBtnRef = document.querySelector("[data-menu-button]");
//     const mobileMenuRef = document.querySelector("[data-menu]");
//     const bodyNoScroll = document.querySelector("[data-nonScroll]");

//     menuBtnRef.addEventListener("click", () => {
//       console.log('menu js');
//       const expanded =
//         menuBtnRef.getAttribute("aria-expanded") === "true" || false;

//       menuBtnRef.classList.toggle("is-open");
//       menuBtnRef.setAttribute("aria-expanded", !expanded);

//       mobileMenuRef.classList.toggle("is-open");
//       bodyNoScroll.classList.toggle("no-scroll")
//     });
//   })();

// modal

// (() => {
//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector("[data-modal-close]"),
//     modal: document.querySelector("[data-modal]"),
//   };

//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }
// })();

{
  /* <script src="./js/modal.js"></script>
    <script src="./js/menu.js"></script> */
}

// async function initialize() {
//   try {
//     Notiflix.Loading.dots('Loading...');
//     const movies = await fetchMovies();
//     renderMovies(movies);
//     Notiflix.Loading.remove();
//   } catch (error) {
//     Notiflix.Report.failure('Oops!', error.message, 'OK');
//   }
// }
