import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';

import Notiflix from 'notiflix';
import { genres } from './genres';
import { paginationRender } from './pagination';
import { showModal } from './showModal';

const container = document.querySelector('.gallery-start');

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

// ==
let totalItems = 1200;
let currentPage = 1;
let query = null;
// ==
export async function fetchMovies(page = 1) {
  try {
    // const response = await axios.get(
    //   `${BASE_URL}movie/now_playing?api_key=${KEY}`
    // );
    const response = await axios.get(
      `${BASE_URL}movie/now_playing?api_key=${KEY}&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching movies');
  }
}

export function renderMovies(movies) {
  const movieHTML = movies
    .map(
      movie => `
    <div class="movie-start_container">
      <div class="movie-start">
        <img class='img-start'  src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.original_title} Poster" />
        <div class="movie-details_start">
          <h2>${movie.original_title}</h2>
          <p> ${new Date(movie.release_date).getFullYear()}</p>
          <p> ${movie.genre_ids.map(id => genres[id]).join(', ')}</p>
        </div>
      </div>
    </div>
    `
    )
    .join('');

  container.innerHTML = movieHTML;

  const imgStartElements = document.querySelectorAll('.img-start');
  imgStartElements.forEach((imgStartElement, index) => {
    imgStartElement.addEventListener('click', () => {
      showModal(movies[index]);
    });
  });

  const modalOverlay = document.querySelector('.modal__overlay');
  modalOverlay.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  });
}

// ================

async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching movie details');
  }
}

// =

// function click(movie) {
//   const watchedBtn = document.querySelector('.modal__button-watched');
//   const queueBtn = document.querySelector('.modal__button-queue');

//   // =watchedBtn при натисканні на кнопку первіряє по ід чи є фільм в локал та змінює напис кнопки

//   const storedWatchedMovies =
//     JSON.parse(localStorage.getItem('watchMovies')) || [];

//   const isWatchedMovieExists = storedWatchedMovies.some(
//     storedMovie => storedMovie.id === movie.id
//   );
//   if (isWatchedMovieExists) {
//     watchedBtn.textContent = 'REMOVE FROM WATCHED';
//   } else {
//     watchedBtn.textContent = 'ADD TO WATCHED';
//   }

//   watchedBtn.addEventListener('click', () => {
//     let storedMovies = JSON.parse(localStorage.getItem('watchMovies')) || [];

//     const isMovieExists = storedMovies.some(
//       storedMovie => storedMovie.id === movie.id
//     );

//     if (isMovieExists) {
//       storedMovies = storedMovies.filter(
//         storedMovie => storedMovie.id !== movie.id
//       );
//       Notiflix.Notify.info('movie removed from watched');
//       watchedBtn.textContent = 'ADD TO WATCHED';
//     } else {
//       storedMovies.push(movie);
//       Notiflix.Notify.success('Movie added to watch');
//       watchedBtn.textContent = 'REMOVE FROM WATCHED';
//     }

//     localStorage.setItem('watchMovies', JSON.stringify(storedMovies));
//   });

//   // = queueBtn

//   const storedQueueMovies =
//     JSON.parse(localStorage.getItem('queueMovies')) || [];

//   const isQueueMovieExists = storedQueueMovies.some(
//     storedMovie => storedMovie.id === movie.id
//   );
//   if (isQueueMovieExists) {
//     queueBtn.textContent = 'REMOVE FROM WATCHED';
//   } else {
//     queueBtn.textContent = 'ADD TO WATCHED';
//   }

//   queueBtn.addEventListener('click', () => {
//     let storedQueueMovies =
//       JSON.parse(localStorage.getItem('queueMovies')) || [];

//     const isMovieExists = storedQueueMovies.some(
//       storedMovie => storedMovie.id === movie.id
//     );

//     if (isMovieExists) {
//       storedQueueMovies = storedQueueMovies.filter(
//         storedMovie => storedMovie.id !== movie.id
//       );
//       Notiflix.Notify.info('movie removed from watched');
//       queueBtn.textContent = 'ADD TO QUEUQ';
//     } else {
//       storedQueueMovies.push(movie);
//       Notiflix.Notify.success('Movie added to watch');
//       queueBtn.textContent = 'REMOVE FROM QUEUQ';
//     }

//     localStorage.setItem('queueMovies', JSON.stringify(storedQueueMovies));
//   });
// }

// function showModal(movie) {
//   const modalDetails = document.querySelector('.movie-details_modal');

//   modalDetails.innerHTML = `
//     <div class="modal__list">
//       <img class="img-modal" src="https://image.tmdb.org/t/p/w500${
//         movie.poster_path
//       }" alt="${movie.original_title} Poster">
//       <div class="modal__text">
//         <h2>${movie.original_title}</h2>
//         <p>Vote / Votes: ${movie.vote_average} / ${movie.vote_count}</p>
//         <p>Popularity: ${movie.popularity}</p>
//         <p>Original Title: ${movie.original_title}</p>
//         <p>Genre: ${
//           Array.isArray(movie.genres)
//             ? movie.genres.map(genre => genre.name).join(', ')
//             : ''
//         }</p>
//         <p class="abaut"> ABOUT </p>
//         <p>Description: ${movie.overview}</p> <!-- Доданий опис -->
//         <div class="modal__buttons">
//           <button class="modal__button-watched">ADD TO WATCHED</button>
//           <button class="modal__button-queue">ADD TO QUEUE</button>
//         </div>
//       </div>
//     </div>
//   `;

//   const modal = document.querySelector('.modal');
//   modal.style.display = 'block';

//   click(movie);
// }

// Функція, що отримує список фільмів та відображає їх
async function renderStartMovies(page = 1) {
  try {
    const movies = await fetchMovies();
    renderMovies(movies);
    paginationRender(movies.total_results, page);

    addClickEventListeners(movies);
    addOverlayClickListener();
  } catch (error) {
    console.error(error);
    throw new Error('Error rendering start movies');
  }
}

// Функція, що додає події на зображення фільмів
function addClickEventListeners(movies) {
  const imgStartElements = document.querySelectorAll('.img-start');

  imgStartElements.forEach((imgStartElement, index) => {
    imgStartElement.addEventListener('click', async () => {
      const movieDetails = await fetchMovieDetails(movies[index].id);
      showModal(movieDetails);
    });
  });
}

// Функція, що додає подію на клік по оверлею модального вікна
function addOverlayClickListener() {
  const modalOverlay = document.querySelector('.modal__overlay');

  modalOverlay.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  });
}

console.log('start-page');

async function init() {
  const movies = await fetchMovies();
  renderMovies(movies);

  paginationRender(1, null);
}

init();

paginationRender(totalItems, currentPage, query);
renderStartMovies();

console.log('start-page after function');

// export default fetchMovies;
// export default renderMovies
// =================
