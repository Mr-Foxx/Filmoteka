// =
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchMovies, renderMovies } from './fetch_start';

const containerTui = document.getElementById('tui-pagination-container');

let totalItems = 1200;
let currentPage = 1;
let query = null;

function paginationRender(page = 1, query) {
  options.totalItems = totalItems;
  options.page = page;
  let pagination = new Pagination(containerTui, options);

  // query = query || null;

  if (query) {
    pagination.on('beforeMove', async ({ page }) => {
      const movies = await fetchMovies(query, page);
      renderMovies(movies);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    });
  } else {
    pagination.on('beforeMove', ({ page }) => {
      renderMovies(page);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  pagination.on('beforeMove', async event => {
    currentPage = event.page;
    const movies = await fetchMovies(currentPage);
    renderMovies(movies);

    window.scrollTo(0, 0);
  });
}

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="page={{page}}" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="page={{page}}" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="page={{page}}" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export { paginationRender };
