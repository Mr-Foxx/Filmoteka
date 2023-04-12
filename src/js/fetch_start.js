import axios from 'axios';
import $ from 'jquery';
import Notiflix from 'notiflix';

const container = document.querySelector('.gallery-start');

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

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

async function fetchMovies() {
  const response = await axios.get(`${BASE_URL}movie/now_playing`, {
    params: {
      api_key: KEY,
    },
  });
  return response.data.results;
}

function renderMovies(movies) {
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
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`
  );
  return response.data;
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
        <p>Description: ${movie.overview}</p> <!-- Доданий опис -->
        <div class="modal__buttons"> 
          <button class="modal__button">ADD TO WATCHED</button>
          <button class="modal__button">ADD TO QUEUE</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}

async function renderStartMovies() {
  const movies = await fetchMovies();
  renderMovies(movies);

  const imgStartElements = document.querySelectorAll('.img-start');
  imgStartElements.forEach((imgStartElement, index) => {
    imgStartElement.addEventListener('click', async () => {
      const movieDetails = await fetchMovieDetails(movies[index].id);
      showModal(movieDetails);
    });
  });

  const modalOverlay = document.querySelector('.modal__overlay');
  modalOverlay.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  });
}

renderStartMovies();

export default fetchMovies;

// =================

// function showModal(movie) {
//   const modal = document.querySelector('.modal');

//   // Remove any previous movie details
//   const modalDetails = document.querySelector('.movie-details_modal');
//   modalDetails.innerHTML = '';

//   // Create movie details elements
//   const poster = document.createElement('img');
//   poster.className = 'img-modal';
//   poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//   poster.alt = `${movie.original_title} Poster`;
//   modalDetails.appendChild(poster);

//   const title = document.createElement('h2');
//   title.textContent = movie.original_title;
//   modalDetails.appendChild(title);

//   const votes = document.createElement('p');
//   votes.textContent = `Vote / Votes: ${movie.vote_average} / ${movie.vote_count}`;
//   modalDetails.appendChild(votes);

//   const popularity = document.createElement('p');
//   popularity.textContent = `Popularity: ${movie.popularity}`;
//   modalDetails.appendChild(popularity);

//   const originalTitle = document.createElement('p');
//   originalTitle.textContent = `Original Title: ${movie.original_title}`;
//   modalDetails.appendChild(originalTitle);

//   const genre = document.createElement('p');
//   genre.textContent = `Genre: ${movie.genres
//     .map(genre => genre.name)
//     .join(', ')}`;
//   modalDetails.appendChild(genre);

//   const buttons = document.createElement('div');
//   buttons.className = 'modal__buttons';
//   modalDetails.appendChild(buttons);

//   const watchTrailer = document.createElement('button');
//   watchTrailer.className = 'modal__button';
//   watchTrailer.textContent = 'Watch Trailer';
//   buttons.appendChild(watchTrailer);

//   const addToFavorites = document.createElement('button');
//   addToFavorites.className = 'modal__button';
//   addToFavorites.textContent = 'Add to Favorites';
//   buttons.appendChild(addToFavorites);

//   modal.style.display = 'block';
// }

// ==============

// ===Start Page  перший варіант

// async function renderStartMovies() {
//   const response = await axios.get(`${BASE_URL}movie/now_playing`, {
//     params: {
//       api_key: KEY,
//     },
//   });
//   const newResponse = response.data;

//   const movieHTML = newResponse.results
//     .map(
//       movie => `
//   <div class="movie-start_container">
//     <div class="movie-start">
//       <img class='img-start' src="https://image.tmdb.org/t/p/w500${
//         movie.poster_path
//       }" alt="${movie.original_title} Poster" />
//       <div class="movie-details_start">
//         <h2>${movie.original_title}</h2>
//         <p> ${new Date(movie.release_date).getFullYear()}</p>
//         <p> ${movie.genre_ids.map(id => genres[id]).join(', ')}</p>
//       </div>
//     </div>
//     </div>
//   `
//     )
//     .join('');

//   container.innerHTML = movieHTML;
// }

// ==========Намагався зробити пагінацію=========

// import axios from 'axios';
// import $ from 'jquery';
// // import Pagination from 'paginationjs';
// import 'paginationjs/dist/pagination.min.js';

// const container = document.querySelector('.gallery-start');
// const paginationList = document.querySelector('.pagination__list');

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const KEY = '9658d89d84efdefd667887b926d66a88';
// const genres = {
//   28: 'Action',
//   12: 'Adventure',
//   16: 'Animation',
//   35: 'Comedy',
//   80: 'Crime',
//   99: 'Documentary',
//   18: 'Drama',
//   10751: 'Family',
//   14: 'Fantasy',
//   36: 'History',
//   27: 'Horror',
//   10402: 'Music',
//   9648: 'Mystery',
//   10749: 'Romance',
//   878: 'Science Fiction',
//   10770: 'TV Movie',
//   53: 'Thriller',
//   10752: 'War',
//   37: 'Western',
// };

// async function fetchCurrentMovies(page) {
//   try {
//     const response = await axios.get(`${BASE_URL}movie/now_playing`, {
//       params: {
//         api_key: KEY,
//         poster_path: true,
//         original_title: true,
//         release_date: true,
//         per_page: 20,
//         page: page,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('There was an error!', error);
//     throw error;
//   }
// }

// async function renderStartMovies(page) {
//   const movies = await fetchCurrentMovies(page);

//   const movieHTML = movies.results
//     .map(
//       movie => `
//       <div class="movie-start_container">
//         <div class="movie-start">
//           <img class='img-start' src="https://image.tmdb.org/t/p/w500${
//             movie.poster_path
//           }" alt="${movie.original_title} Poster" />
//           <div class="movie-details_start">
//             <h2>${movie.original_title}</h2>
//             <p> ${new Date(movie.release_date).getFullYear()}</p>
//             <p> ${movie.genre_ids.map(id => genres[id]).join(', ')}</p>
//           </div>
//         </div>
//       </div>
//     `
//     )
//     .join('');

//   container.innerHTML = movieHTML;
// }

// async function setupPagination(totalPages) {
//   $('.pagination__list').pagination({
//     dataSource: Array.from({ length: totalPages }, (_, i) => i + 1),
//     pageSize: 1,
//     showPageNumbers: false,
//     showNavigator: true,
//     ulClassName: 'pagination__list',
//     prevText: '<<',
//     nextText: '>>',
//     callback: async function (data, pagination) {
//       await renderStartMovies(pagination.pageNumber);
//     },
//   });
// }

// async function init() {
//   const movies = await fetchCurrentMovies();
//   const totalPages = movies.total_pages;
//   await renderStartMovies();
//   await setupPagination(totalPages);
// }

// init();
