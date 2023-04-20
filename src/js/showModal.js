import { click } from './click';

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

export { showModal };
