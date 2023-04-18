import axios from 'axios';
import Notiflix from 'notiflix';

// const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '9658d89d84efdefd667887b926d66a88';

const watchLibraryBtn = document.querySelector('.button__libraty-watched');
const queueLibraryBtn = document.querySelector('.button__library-queue');
const watchContainer = document.querySelector('.lib__watched-container');
const queueContainer = document.querySelector('.lib__queue-container');
const emptyCountainer = document.querySelector('.empty-page');
const emptyContQueue = document.querySelector('.empty-page-queue');

// queueContainer.style.display = 'none';
queueContainer.style.transform = 'scale(0)';
watchLibraryBtn.classList.add('library_btn-click-color');

watchLibraryBtn.addEventListener('click', openWatched);
queueLibraryBtn.addEventListener('click', openQueue);

function openWatched() {
  // queueContainer.style.display = 'none';
  queueContainer.style.transform = 'scale(0)';
  // watchContainer.style.display = 'block';
  watchContainer.style.transform = 'scale(1)';
  watchLibraryBtn.classList.add('library_btn-click-color');
  queueLibraryBtn.classList.remove('library_btn-click-color');

  const storedMovies = JSON.parse(localStorage.getItem('watchMovies')) || [];
  console.log(storedMovies.length);
  if (storedMovies.length === 0) {
    watchContainer.innerHTML = '<p>There are no films in this gallery</p>';
    return;
  }

  renderWatchMovies(storedMovies);
  console.log(storedMovies);
}

function openQueue() {
  // watchContainer.style.display = 'none';
  watchContainer.style.transform = 'scale(0)';
  // queueContainer.style.display = 'block';
  queueContainer.style.transform = 'scale(1)';
  queueLibraryBtn.classList.add('library_btn-click-color');
  watchLibraryBtn.classList.remove('library_btn-click-color');

  const storedQueueMovies =
    JSON.parse(localStorage.getItem('queueMovies')) || [];
  console.log(storedQueueMovies.length);
  if (storedQueueMovies.length === 0) {
    queueContainer.innerHTML = '<p>There are no films in this gallery</p>';
    return;
  }

  renderQueueMovies(storedQueueMovies);
  console.log(storedQueueMovies);
}

openWatched();

openQueue();

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

function renderAfterDelitingObjectWatch(movie) {
  const storedWatchedMovies =
    JSON.parse(localStorage.getItem('watchMovies')) || [];

  const isWatchedMovieExists = storedWatchedMovies.some(
    storedMovie => storedMovie.id === movie.id
  );
  if (isWatchedMovieExists) {
    const updatedWatchedMovies = storedWatchedMovies.filter(
      storedMovie => storedMovie.id !== movie.id
    );

    localStorage.setItem('watchMovies', JSON.stringify(updatedWatchedMovies));

    renderWatchMovies(updatedWatchedMovies);
  }
}

function renderAfterDelitingObjectQueue(movie) {
  const storedQueueMovies =
    JSON.parse(localStorage.getItem('queueMovies')) || [];

  const isQueueMovieExists = storedQueueMovies.some(
    storedMovie => storedMovie.id === movie.id
  );
  if (isQueueMovieExists) {
    const updatedQueueMovies = storedQueueMovies.filter(
      storedMovie => storedMovie.id !== movie.id
    );

    localStorage.setItem('queueMovies', JSON.stringify(updatedQueueMovies));

    renderQueueMovies(updatedQueueMovies);
  }
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
      renderAfterDelitingObjectWatch(movie);
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
    queueBtn.textContent = 'REMOVE FROM QUEUE';
  } else {
    queueBtn.textContent = 'ADD TO QUEUE';
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
      renderAfterDelitingObjectQueue(movie);
    } else {
      storedQueueMovies.push(movie);
      Notiflix.Notify.success('Movie added to watch');
      queueBtn.textContent = 'REMOVE FROM QUEUQ';
    }

    localStorage.setItem('queueMovies', JSON.stringify(storedQueueMovies));
  });
}

// Функція, що додає події на зображення фільмів
function addClickEventListeners(movies) {
  const imgStartElements = document.querySelectorAll('.img-start');

  imgStartElements.forEach((imgStartElement, index) => {
    imgStartElement.addEventListener('click', async () => {
      try {
        const movieDetails = await fetchMovieDetails(movies[index].id);
        showModal(movieDetails);
      } catch (error) {
        throw new Error(error.message);
      }
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

// ==

// const savedData1 = JSON.parse(localStorage.getItem('watchMovies'));
// // console.log(savedData1.length);
// // console.log(123123);
// if (savedData1.length > 0) {
//   // emptyCountainer.style.display = 'none';
//   emptyCountainer.classList.add('is-hidden');
// }
// emptyContQueue.classList.add('is-hidden');

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
