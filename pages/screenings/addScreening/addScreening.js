const url = "http://localhost:8080/api/screenings";
import { encode } from "../../../utils.js";
import { checkSession1 } from "../../../pages/login/loginSettings.js";

let router;
let screening = [];

export function initAddScreening(navigoRouter) {
  checkSession1();
  document.getElementById("addScreening").onclick = addScreening;
  populateMovieSelect();
  populateTheaterSelect();
  router = navigoRouter;
}

async function addScreening() {
  const startTime = document.getElementById("if1").value;
  const endTime = document.getElementById("if2").value;
  const movieId = document.getElementById("if3").value;
  const theaterId = document.getElementById("if4").value;

  const newScreening = {
    startTime,
    endTime,
    movieId,
    theaterId,
  };

  const id = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newScreening),
  })
    .then((res) => res.json())
    .then((data) => data.id);
  router.navigate(`screening?id=${id}`);
}

// function for populating select options for movie and theater
async function populateMovieSelect() {
    const url = "http://localhost:8080/api/movies";
    const movies = await fetch(url).then((res) => res.json());
    const select = document.getElementById("if3");
    movies.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.id;
      option.innerHTML = movie.title;
      select.appendChild(option);
    });
}

// function for populating select options for theater
async function populateTheaterSelect() {
    const url = "http://localhost:8080/api/theaters";
    const theaters = await fetch(url).then((res) => res.json());
    const select = document.getElementById("if4");
    theaters.forEach((theater) => {
      const option = document.createElement("option");
      option.value = theater.id;
      option.innerHTML = "Sal " + theater.id;
      select.appendChild(option);
    });
}
