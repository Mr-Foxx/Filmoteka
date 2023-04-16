import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

const watchContainer = document.querySelector('.lib__watched-container');
const queueContainer = document.querySelector('.lib__queue-container');

const storedMovies = JSON.parse(localStorage.getItem('watchMovies')) || [];
renderWatchMovies(storedMovies);
console.log(storedMovies);

const storedQueueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
renderQueueMovies(storedQueueMovies);
console.log(storedQueueMovies);

const genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

function renderWatchMovies(movies) {
  // if (!movies || !Array.isArray(movies) || movies.length === 0) {
  //   watchContainer.innerHTML = '<p>No movies to display</p>';
  //   return;
  // }

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
          <p> ${(movie.genre_ids || []).map(id => genres[id]).join(', ')}</p>
        </div>
      </div>
    </div>
  `
    )
    .join('');
  const watchContainer = document.querySelector('.lib__watched-container');
  watchContainer.innerHTML = movieHTML;

  addClickEventListeners(movies);
  addOverlayClickListener();
}

function renderQueueMovies(movies) {
  // if (!movies || !Array.isArray(movies) || movies.length === 0) {
  //   watchContainer.innerHTML = '<p>No movies to display</p>';
  //   return;
  // }

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
          <p> ${(movie.genre_ids || []).map(id => genres[id]).join(', ')}</p>
        </div>
      </div>
    </div>
  `
    )
    .join('');
  const queueContainer = document.querySelector('.lib__queue-container');
  queueContainer.innerHTML = movieHTML;

  addClickEventListeners(movies);
  addOverlayClickListener();
}

// ==Modal Functions

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

function showModal(movie) {
  const modalDetails = document.querySelector('.movie-details_modal');

  modalDetails.innerHTML = `
    <div class="modal__list">
      <img class="img-modal" src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" alt="${movie.original_title} Poster">
      <div class="modal__text">
        <h2>${movie.original_title}</h2>
        <p>Vote / Votes: ${movie.vote_average} / ${movie.vote_count}</p>
        <p>Popularity: ${movie.popularity}</p>
        <p>Original Title: ${movie.original_title}</p>
        <p>Genre: ${
          Array.isArray(movie.genres)
            ? movie.genres.map(genre => genre.name).join(', ')
            : ''
        }</p>
        <p class="abaut"> ABOUT </p> 
        <p>  Description: ${movie.overview}</p> <!-- Доданий опис -->
        <div class="modal__buttons"> 
          <button class="modal__button-watched">ADD TO WATCHED</button>
          <button class="modal__button-queue">ADD TO QUEUE</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}

// async function renderStartMovies() {
//   try {
//     // const movies = await fetchMovies();
//     // renderMovies(movies);

//     addClickEventListeners(movies);
//     addOverlayClickListener();
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error rendering start movies');
//   }
// }

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

// renderStartMovies();

// ==

//   const imgStartElements = document.querySelectorAll('.img-start');
//   imgStartElements.forEach((imgStartElement, index) => {
//     imgStartElement.addEventListener('click', () => {
//       showModal(movies[index]);
//     });
//   });

//   const modalOverlay = document.querySelector('.modal__overlay');
//   modalOverlay.addEventListener('click', () => {
//     const modal = document.querySelector('.modal');
//     modal.style.display = 'none';
//   });

// ==

// function showModal(movie) {
//   //   const modalDetails = document.querySelector('.movie-details_modal');
//   const watchContainer = document.querySelector('.lib__watched-container');

//   watchContainer.innerHTML = `
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
//         <p>  Description: ${movie.overview}</p> <!-- Доданий опис -->
//         <div class="modal__buttons">
//           <button class="modal__button-watched">ADD TO WATCHED</button>
//           <button class="modal__button-queue">ADD TO QUEUE</button>
//         </div>
//       </div>
//     </div>
//   `;

//   const modal = document.querySelector('.modal');
//   modal.style.display = 'block';
// }

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
