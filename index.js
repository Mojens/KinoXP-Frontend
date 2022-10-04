import "https://unpkg.com/navigo"; //Will create the global Navigo object used below

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadTemplate,
} from "./utils.js";
//=========Movie start here=========
import { initGetAllMovies } from "./pages/movies/getAllMovies/getAllMovies.js";
import { initGetMovieById } from "./pages/movies/getSpecificMovie/getSpecificMovie.js";
import { initEditMovie } from "./pages/movies/editMovie/editMovie.js";

//=========Movie End here=========
//=========Reservation start here=========
import { initGetAllReservations } from "./pages/reservation/getAllReservations/getAllReservations.js";
import { initGetReservationById } from "./pages/reservation/getSpecificReservation/singleReservation.js";

//=========Reservation end here=========

//=========Screening start here=========


//=========Screening end here=========

//=========Theater start here=========


//=========Theater end here=========

//=========Employee start here=========


//=========Employee end here=========

//=========Shift start here=========


//=========Shift end here=========

//=========Seat start here=========


//=========Seat end here=========
//=========SeatChoice start here=========


//=========SeatChoice end here=========

window.addEventListener("load", async () => {

    //=========Templates end here=========
    const templateAbout = await loadTemplate("./pages/about/about.html");
    const templateGetAllMovies = await loadTemplate("./pages/movies/getAllMovies/all-movies.html");
    const templateGetMovieById = await loadTemplate("./pages/movies/getSpecificMovie/movie-title.html");
    const templateEditMovie = await loadTemplate("./pages/movies/editMovie/edit-movie.html");

    const templateGetAllReservations = await loadTemplate("./pages/reservation/getAllReservations/all-reservation.html");
    const templateGetReservationById = await loadTemplate("./pages/reservation/getSpecificReservation/single-reservation.html");

    //=========>Templates end here=========
    adjustForMissingHash();

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () =>
        (document.getElementById("content").innerHTML = `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route
      </p>
     `),
      "/about": () => renderTemplate(templateAbout, "content"),
        //=========Movies start here=========

      "/all-movies": () => {
        renderTemplate(templateGetAllMovies, "content");
        initGetAllMovies(router);
      },
      "/movie-title": (match) => {
        renderTemplate(templateGetMovieById, "content");
        initGetMovieById(match);
      },
      "/edit-movie": (match,router) => {
        renderTemplate(templateEditMovie, "content");
        initEditMovie(match,router);
      },
        //=========Movies End here=========
        //=========Reservations start here=========
        "/all-reservations": (match,router) => {
            renderTemplate(templateGetAllReservations, "content");
            initGetAllReservations(match,router);
        },
        "/single-reservation": (match) => {
            renderTemplate(templateGetReservationById, "content");
            initGetReservationById(match);
        },
        //=========Reservations end here=========

        //=========Screening start here=========


        //=========Screening end here=========

        //=========Theater start here=========


        //=========Theater end here=========

        //=========Employee start here=========


        //=========Employee end here=========

        //=========Shift start here=========


        //=========Shift end here=========

        //=========Seat start here=========


        //=========Seat end here=========
        //=========SeatChoice start here=========


        //=========SeatChoice end here=========
    })
    .notFound(
      () =>
        (document.getElementById("content").innerText =
          "404 - No page for this route found")
    )
    .resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    "Error: " +
      errorMsg +
      " Script: " +
      url +
      " Line: " +
      lineNumber +
      " Column: " +
      column +
      " StackTrace: " +
      errorObj
  );
};
