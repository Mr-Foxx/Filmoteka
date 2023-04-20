import Notiflix from 'notiflix';

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

export { click };
