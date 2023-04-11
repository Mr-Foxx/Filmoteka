import axios from 'axios';
import Notiflix from 'notiflix';
// import $ from 'jquery';
// import Pagination from 'paginationjs';
// import 'paginationjs/dist/pagination.min.js';

const container = document.querySelector('.gallery-start');
const form = document.querySelector('.search-form');
const inputElement = document.querySelector('input[name="searchQuery"]');

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

form.addEventListener('submit', fetchSerchForm);

let page = 1;

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

async function fetchSerchForm(evt) {
  evt.preventDefault();

  const inputValue = inputElement.value.toLowerCase().trim();

  try {
    const movies = await fetchMovie(inputValue);

    if (movies.results.length === 0) {
      Notiflix.Notify.info('Sorry, but nothing was found for your request');
    } else {
      renderMovie(movies);
      clearValue();
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
              ? `<img class="img-start" src="https://image.tmdb.org/t/p/w500${
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

function clearForm() {
  container.innerHTML = '';
}

function clearValue() {
  inputElement.value = '';
}
