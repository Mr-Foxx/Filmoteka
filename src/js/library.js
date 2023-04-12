import axios from 'axios';
import Notiflix from 'notiflix';
import fetchMovies from './fetch_start';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

const homeBtn = document.querySelector('.button-home');
const libratyBtn = document.querySelector('.button-library');

// libratyBtn.addEventListener('click');

// ===================

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
