!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=e.parcelRequired7c6;null==o&&((o=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var o={id:t,exports:{}};return n[t]=o,e.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){r[t]=e},e.parcelRequired7c6=o);var a=o("bpxeT"),i=o("2TvXO"),c=o("dIxxU"),s=o("6JpON"),u=document.querySelector(".gallery-start"),l=document.querySelector(".search-form"),d=document.querySelector('input[name="searchQuery"]'),p=document.querySelector(".form-text"),f="https://api.themoviedb.org/3/",m="9658d89d84efdefd667887b926d66a88";l.addEventListener("submit",(function(t){return w.apply(this,arguments)}));var v={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function h(t){return y.apply(this,arguments)}function y(){return(y=t(a)(t(i).mark((function e(n){var r;return t(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c.default.get("".concat(f,"search/movie"),{params:{api_key:m,query:n,page:1}});case 3:return r=t.sent,t.abrupt("return",r.data);case 7:throw t.prev=7,t.t0=t.catch(0),console.error("There was an error!",t.t0),t.t0;case 11:case"end":return t.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function g(t){return _.apply(this,arguments)}function _(){return(_=t(a)(t(i).mark((function e(n){var r;return t(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.default.get("https://api.themoviedb.org/3/movie/".concat(n,"?api_key=").concat(m));case 3:return r=e.sent,e.abrupt("return",r.data);case 7:e.prev=7,e.t0=e.catch(0),t(s).Report("Error","An error occurred while fetching movie details");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function w(){return w=t(a)(t(i).mark((function e(n){var r,o;return t(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r=d.value.toLowerCase().trim(),e.prev=2,e.next=5,h(r);case 5:0===(o=e.sent).results.length?(p.innerHTML="Search result not successful.<br/> Enter the correct movie name.",t(s).Notify.info("Sorry, but nothing was found for your request"),setTimeout((function(){p.innerHTML=""}),3e3)):(x(o),E(),u.addEventListener("click",function(){var e=t(a)(t(i).mark((function e(n){var r,o;return t(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=n.target.closest(".img-start"))){t.next=7;break}return o=r.dataset.id,t.next=5,g(o);case 5:T(t.sent);case 7:case"end":return t.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())),e.next=13;break;case 9:throw e.prev=9,e.t0=e.catch(2),t(s).Notify.failure(e.t0),e.t0;case 13:case"end":return e.stop()}}),e,null,[[2,9]])}))),w.apply(this,arguments)}function x(t){return b.apply(this,arguments)}function b(){return(b=t(a)(t(i).mark((function e(n){var r;return t(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=n.results.filter((function(t){return t.poster_path})).map((function(t){return'\n      <div class="movie-start_container">\n        <div class="movie-start">\n          '.concat(t.poster_path?'<img class="img-start" data-id="'.concat(t.id,'" src="https://image.tmdb.org/t/p/w500').concat(t.poster_path,'" alt="').concat(t.original_title||"Movie Poster",' Poster" />'):"",'\n          <div class="movie-details_start">\n            <h2>').concat(t.original_title,"</h2>\n            <p> ").concat(new Date(t.release_date).getFullYear(),"</p>\n            <p> ").concat(t.genre_ids.map((function(t){return v[t]})).join(", "),"</p>\n          </div>\n        </div>\n      </div>\n    ")})).join(""),u.innerHTML=r;case 2:case"end":return t.stop()}}),e)})))).apply(this,arguments)}function T(e){document.querySelector(".movie-details_modal").innerHTML='\n    <div class="modal__list">\n      <img class="img-modal" src="https://image.tmdb.org/t/p/w500'.concat(e.poster_path,'" alt="').concat(e.original_title,' Poster">\n      <div class="modal__text">\n        <h2>').concat(e.original_title,"</h2>\n        <p>Vote / Votes: ").concat(e.vote_average," / ").concat(e.vote_count,"</p>\n        <p>Popularity: ").concat(e.popularity,"</p>\n        <p>Original Title: ").concat(e.original_title,"</p>\n        <p>Genre: ").concat(Array.isArray(e.genres)?e.genres.map((function(t){return t.name})).join(", "):"",'</p>\n        <p class="abaut"> ABOUT </p> \n        <p>  Description: ').concat(e.overview,'</p> \x3c!-- Доданий опис --\x3e\n        <div class="modal__buttons"> \n          <button class="modal__button-watched">ADD TO WATCHED</button>\n          <button class="modal__button-queue">ADD TO QUEUE</button>\n        </div>\n      </div>\n    </div>\n  '),document.querySelector(".modal").style.display="block",function(e){var n=document.querySelector(".modal__button-watched"),r=document.querySelector(".modal__button-queue");(JSON.parse(localStorage.getItem("watchMovies"))||[]).some((function(t){return t.id===e.id}))?n.textContent="REMOVE FROM WATCHED":n.textContent="ADD TO WATCHED";n.addEventListener("click",(function(){var r=JSON.parse(localStorage.getItem("watchMovies"))||[];r.some((function(t){return t.id===e.id}))?(r=r.filter((function(t){return t.id!==e.id})),t(s).Notify.info("movie removed from watched"),n.textContent="ADD TO WATCHED"):(r.push(e),t(s).Notify.success("Movie added to watch"),n.textContent="REMOVE FROM WATCHED"),localStorage.setItem("watchMovies",JSON.stringify(r))})),(JSON.parse(localStorage.getItem("queueMovies"))||[]).some((function(t){return t.id===e.id}))?r.textContent="REMOVE FROM WATCHED":r.textContent="ADD TO WATCHED";r.addEventListener("click",(function(){var n=JSON.parse(localStorage.getItem("queueMovies"))||[];n.some((function(t){return t.id===e.id}))?(n=n.filter((function(t){return t.id!==e.id})),t(s).Notify.info("movie removed from watched"),r.textContent="ADD TO QUEUQ"):(n.push(e),t(s).Notify.success("Movie added to watch"),r.textContent="REMOVE FROM QUEUQ"),localStorage.setItem("queueMovies",JSON.stringify(n))}))}(e)}function E(){d.value=""}}();
//# sourceMappingURL=index.8b76f28c.js.map