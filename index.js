import "https://unpkg.com/navigo"; //Will create the global Navigo object used below

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadTemplate,
} from "./utils.js";

import { initGetAllMovies } from "./pages/movies/getAllMovies/getAllMovies.js";
import { initGetMovieById } from "./pages/movies/getSpecificMovie/getSpecificMovie.js";
import { initEditMovie } from "./pages/movies/editMovie/editMovie.js";
import { initAddShift } from "./pages/Shifts/addShift/addShift.js";
import { initEditShift } from "./pages/Shifts/editShift/editShift.js";

window.addEventListener("load", async () => {
  const templateAbout = await loadTemplate("./pages/about/about.html");
  const templateGetAllMovies = await loadTemplate(
    "./pages/movies/getAllMovies/all-movies.html"
  );
  const templateGetMovieById = await loadTemplate("./pages/movies/getSpecificMovie/movie-title.html");
  const templateEditMovie = await loadTemplate("./pages/movies/editMovie/edit-movie.html");
  const templateAddShift = await loadTemplate("./pages/Shifts/addShift/addShift.html");
  const templateEditShift = await loadTemplate("./pages/Shifts/editShift/editShift.html");

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
      "/addShift": () => {
        renderTemplate(templateAddShift, "content");
        initAddShift(router);
      },
      "/editShift": () => {
        renderTemplate(templateEditShift, "content");
        initEditShift(router);
      }
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
