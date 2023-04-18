import axios from 'axios';
import Notiflix from 'notiflix';
// import $ from 'jquery';
// import Pagination from 'paginationjs';
// import 'paginationjs/dist/pagination.min.js';

const container = document.querySelector('.gallery-start');
const form = document.querySelector('.search-form');
const inputElement = document.querySelector('input[name="searchQuery"]');
const formTextContainer = document.querySelector('.form-text');

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

form.addEventListener('submit', fetchSerchForm);

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

async function fetchMovie(inputValue) {
  try {
    const response = await axios.get(`${BASE_URL}search/movie`, {
      params: {
        api_key: KEY,
        query: inputValue,
        page: 1,
      },
    });

    return response.data;
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
}

async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`
    );
    return response.data;
  } catch (error) {
    Notiflix.Report('Error', 'An error occurred while fetching movie details');
  }
}

async function fetchSerchForm(evt) {
  evt.preventDefault();

  const inputValue = inputElement.value.toLowerCase().trim();

  try {
    const movies = await fetchMovie(inputValue);

    if (movies.results.length === 0) {
      formTextContainer.innerHTML =
        'Search result not successful.<br/> Enter the correct movie name.';

      Notiflix.Notify.info('Sorry, but nothing was found for your request');
      setTimeout(function () {
        formTextContainer.innerHTML = '';
      }, 3000);
    } else {
      renderMovie(movies);
      clearValue();

      // додати обробник події на контейнер з фільмами
      container.addEventListener('click', async event => {
        const movieElement = event.target.closest('.img-start');
        if (movieElement) {
          const movieId = movieElement.dataset.id;
          const movie = await fetchMovieDetails(movieId);
          showModal(movie);
        }
      });
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
    throw error;
  }
}

async function renderMovie(movies) {
  const movieHTML = movies.results
    .filter(movie => movie.poster_path) // фільтруємо тільки фільми з постером
    .map(
      movie => `
      <div class="movie-start_container">
        <div class="movie-start">
          ${
            movie.poster_path
              ? `<img class="img-start" data-id="${
                  movie.id
                }" src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.original_title || 'Movie Poster'} Poster" />`
              : ''
          }
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
}

// ======modal=====

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

  click(movie);
}

function click(movie) {
  const watchedBtn = document.querySelector('.modal__button-watched');
  const queueBtn = document.querySelector('.modal__button-queue');

  // =watchedBtn при натисканні на кнопку первіряє по ід чи є фільм в локал та змінює напис кнопки

  const storedWatchedMovies =
    JSON.parse(localStorage.getItem('watchMovies')) || [];

  const isWatchedMovieExists = storedWatchedMovies.some(
    storedMovie => storedMovie.id === movie.id
  );
  if (isWatchedMovieExists) {
    watchedBtn.textContent = 'REMOVE FROM WATCHED';
  } else {
    watchedBtn.textContent = 'ADD TO WATCHED';
  }

  watchedBtn.addEventListener('click', () => {
    let storedMovies = JSON.parse(localStorage.getItem('watchMovies')) || [];

    const isMovieExists = storedMovies.some(
      storedMovie => storedMovie.id === movie.id
    );

    if (isMovieExists) {
      storedMovies = storedMovies.filter(
        storedMovie => storedMovie.id !== movie.id
      );
      Notiflix.Notify.info('movie removed from watched');
      watchedBtn.textContent = 'ADD TO WATCHED';
    } else {
      storedMovies.push(movie);
      Notiflix.Notify.success('Movie added to watch');
      watchedBtn.textContent = 'REMOVE FROM WATCHED';
    }

    localStorage.setItem('watchMovies', JSON.stringify(storedMovies));
  });

  // = queueBtn

  const storedQueueMovies =
    JSON.parse(localStorage.getItem('queueMovies')) || [];

  const isQueueMovieExists = storedQueueMovies.some(
    storedMovie => storedMovie.id === movie.id
  );
  if (isQueueMovieExists) {
    queueBtn.textContent = 'REMOVE FROM WATCHED';
  } else {
    queueBtn.textContent = 'ADD TO WATCHED';
  }

  queueBtn.addEventListener('click', () => {
    let storedQueueMovies =
      JSON.parse(localStorage.getItem('queueMovies')) || [];

    const isMovieExists = storedQueueMovies.some(
      storedMovie => storedMovie.id === movie.id
    );

    if (isMovieExists) {
      storedQueueMovies = storedQueueMovies.filter(
        storedMovie => storedMovie.id !== movie.id
      );
      Notiflix.Notify.info('movie removed from watched');
      queueBtn.textContent = 'ADD TO QUEUQ';
    } else {
      storedQueueMovies.push(movie);
      Notiflix.Notify.success('Movie added to watch');
      queueBtn.textContent = 'REMOVE FROM QUEUQ';
    }

    localStorage.setItem('queueMovies', JSON.stringify(storedQueueMovies));
  });
}

function clearValue() {
  inputElement.value = '';
}
