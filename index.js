import "https://unpkg.com/navigo"; //Will create the global Navigo object used below

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadTemplate,
} from "./utils.js";
//=========Login start here=========
import { initLogin } from "./pages/login/login.js";
import { initAddEmployee } from "./pages/employees/addEmployee/addEmployee.js";
//=========Login end here=========
//=========Movie start here=========
import { initGetAllMovies } from "./pages/movies/getAllMovies/getAllMovies.js";
import { initGetMovieById } from "./pages/movies/getSpecificMovie/getSpecificMovie.js";
import { initEditMovie } from "./pages/movies/editMovie/editMovie.js";
import { initAddMovie } from "./pages/movies/addMovie/addMovie.js";
import { initImdbMovieTest } from "./pages/movies/imdbMovieTest/imdb.js";


//=========Movie End here=========
//=========Reservation start here=========
import { initGetAllReservations } from "./pages/reservation/getAllReservations/getAllReservations.js";
import { initGetReservationById } from "./pages/reservation/getSpecificReservation/singleReservation.js";
import { initEditReservation } from "./pages/reservation/editReservation/editReservation.js";
import { initDeleteReservation } from "./pages/reservation/deleteReservation/deleteReservation.js";

//=========Reservation end here=========

//=========Screening start here=========
import { initGetAllScreenings } from "./pages/screenings/getAllScreenings/allScreenings.js";
import { initGetSpecificScreening } from "./pages/screenings/getSpecificScreening/getSpecificScreening.js";
import { initEditScreening } from "./pages/screenings/editScreening/editScreening.js";
import { initAddScreening } from "./pages/screenings/addScreening/addScreening.js";
//=========Screening end here=========

//=========Theater start here=========
import { initGetAllTheaters } from "./pages/theater/getAllTheaters/allTheaters.js";
import { initGetSpecificTheater } from "./pages/theater/getSpecificTheater/specificTheater.js";

//=========Theater end here=========

//=========Employee start here=========

//=========Employee end here=========

//=========Shift start here=========
import { initAddShift } from "./pages/Shifts/addShift/addShift.js";
import { initEditShift } from "./pages/Shifts/editShift/editShift.js";
import { initAllShifts } from "./pages/Shifts/getAllShifts/getAllShifts.js";
//=========Shift end here=========

//=========Seat start here=========

//=========Seat end here=========
//=========SeatChoice start here=========

//=========SeatChoice end here=========

window.addEventListener("load", async () => {
  //=========Templates Start here=========
  const templateAbout = await loadTemplate(
      "./pages/about/about.html");

  //=========Movie start here=========
  const templateGetAllMovies = await loadTemplate(
    "./pages/movies/getAllMovies/all-movies.html"
  );
  const templateGetMovieById = await loadTemplate(
    "./pages/movies/getSpecificMovie/movie-title.html"
  );
  const templateEditMovie = await loadTemplate(
    "./pages/movies/editMovie/edit-movie.html"
  );
  const templateAddMovie = await loadTemplate(
    "./pages/movies/addMovie/add-movie.html"
  );
  const templateImdbMovieTest = await loadTemplate(
    "./pages/movies/imdbMovieTest/imdb.html"
  );
  //=========Movie End here=========
  //=========Screening start here=========

  const templateGetAllScreenings = await loadTemplate(
    "./pages/screenings/getAllScreenings/all-screenings.html"
  );
  const templateGetSpecificScreening = await loadTemplate(
    "./pages/screenings/getSpecificScreening/screening.html"
  );
  const templateEditScreening = await loadTemplate(
    "./pages/screenings/editScreening/edit-screening.html"
  );
  const templateAddScreening = await loadTemplate(
    "./pages/screenings/addScreening/add-screening.html"
  );
  const templateAddEmployee = await loadTemplate(
    "./pages/employees/addEmployee/addEmployee.html"
  );
  const templateAllEmployees = await loadTemplate(
    "./pages/employees/getAllEmployees/getAllEmployees.html"
  );
  const templateEditEmployee = await loadTemplate(
    "./pages/employees/editEmployee/editEmployee.html"
  );
  const templateDeleteEmployee = await loadTemplate(
    "./pages/employees/deleteEmployee/deleteEmployee.html"
  );
  
  //=========Screening End here=========
  //=========Reservation start here=========

  const templateGetAllTheaters = await loadTemplate("./pages/theater/getAllTheaters/all-theaters.html");
  const templateGetSpecificTheater = await loadTemplate("./pages/theater/getSpecificTheater/specific-theater.html");

    adjustForMissingHash();
  const templateGetAllReservations = await loadTemplate(
    "./pages/reservation/getAllReservations/all-reservation.html"
  );

  const templateGetReservationById = await loadTemplate(
    "./pages/reservation/getSpecificReservation/single-reservation.html"
  );
  const templateLogin = await loadTemplate("./pages/login/login.html");

  const templateEditReservation = await loadTemplate(
      "./pages/reservation/editReservation/edit-reservation.html"
  );
  const templateDeleteReservation = await loadTemplate(
      "./pages/reservation/deleteReservation/delete-reservation.html"
  );
  //=========Reservation end here=========
  const templateAddShift = await loadTemplate("./pages/Shifts/addShift/addShift.html");
  const templateEditShift = await loadTemplate("./pages/Shifts/editShift/editShift.html");
  const templateAllShifts = await loadTemplate("./pages/Shifts/getAllShifts/getAllShifts.html");

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
      "/about": () => {
        renderTemplate(templateAbout, "content");
      },
      //=========Movies start here=========

      "/": () => {
        renderTemplate(templateGetAllMovies, "content");
        initGetAllMovies(router);
      },
      "/movie-title": (match) => {
        renderTemplate(templateGetMovieById, "content");
        initGetMovieById(match,router);
      },
      "/edit-movie": (match, router) => {
        renderTemplate(templateEditMovie, "content");
        initEditMovie(match, router);
      },
      "/add-movie": () => {
        renderTemplate(templateAddMovie, "content");
        initAddMovie(router);
      },
      "/add-movie-imdb": () => {
        renderTemplate(templateImdbMovieTest, "content");
        initImdbMovieTest(router);
      },
      //=========Movies End here=========
      //=========Reservations start here=========
      "/all-reservation": () => {
        renderTemplate(templateGetAllReservations, "content");
        initGetAllReservations(router);
      },

      "/single-reservation": (match) => {
        renderTemplate(templateGetReservationById, "content");
        initGetReservationById(match, router);
      },
      "/edit-reservation": (match) => {
      renderTemplate(templateEditReservation, "content");
      initEditReservation(match);
    },
      "/delete-reservation": (router) => {
        renderTemplate(templateDeleteReservation, "content");
        initDeleteReservation(router);
      },
      //=========Reservations end here=========

      //=========Screening start here=========
      "/all-screenings": () => {
        renderTemplate(templateGetAllScreenings, "content");
        initGetAllScreenings(router);
      },
      "/screening": (match) => {
        renderTemplate(templateGetSpecificScreening, "content");
        initGetSpecificScreening(match, router);
      },
      "/edit-screening": (match, router) => {
        renderTemplate(templateEditScreening, "content");
        initEditScreening(match, router);
      },
      "/add-screening": () => {
        renderTemplate(templateAddScreening, "content");
        initAddScreening(router);
      },

      //=========Screening end here=========
        "/specific-theater": (match,router) => {
            renderTemplate(templateGetSpecificTheater, "content");
            initGetSpecificTheater(match,router);
        },
        "/all-theaters": (match,router) => {
            renderTemplate(templateGetAllTheaters, "content");
            initGetAllTheaters(match,router);
        },
      //=========Theater start here=========

      //=========Theater end here=========

      //=========Employee start here=========
      "/addEmployees": () => {
        renderTemplate(templateAddEmployee, "content");
        initAddEmployee(router);
      },
      "/allEmployees": () => {
        renderTemplate(templateAllEmployees, "content");
      },
       "/deleteEmployee": () => {
        renderTemplate(templateDeleteEmployee, "content");
      },
       "/editEmployee": () => {
        renderTemplate(templateEditEmployee, "content");
      },
      //=========Employee end here=========

      //=========Shift start here=========
      "/addShift": () => {
        renderTemplate(templateAddShift, "content");
        initAddShift(router);
      },
      "/editShift": (match, router) => {
        renderTemplate(templateEditShift, "content");
        initEditShift(match, router);
      },
      "/AllShifts": () => {
        renderTemplate(templateAllShifts, "content");
        initAllShifts(router);
      },
      //=========Shift end here=========

      //=========Seat start here=========

      //=========Seat end here=========
      //=========SeatChoice start here=========

      //=========SeatChoice end here========= 
      //=========Login start here=========
      "/login": () => {
        renderTemplate(templateLogin, "content");
        initLogin(router);
    },
      //=========Login end here=========
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

// add active class to parent of dropdown when dropdown is hovered



// add active class to parent of dropdown when dropdown is hovered


