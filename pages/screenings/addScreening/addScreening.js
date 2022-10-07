const url = "http://localhost:8080/api/screenings";
const multiURL = "http://localhost:8080/api/screenings/all";
import { encode } from "../../../utils.js";

let router;
let screening = [];

export function initAddScreening(navigoRouter) {
  document.getElementById("addScreening").onclick = addScreening;
  document.getElementById("addMultiScreenings").onclick = addMultiScreenings;
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

async function addMultiScreenings() {
  const startTime = document.getElementById("if5").value;
  const endTime = document.getElementById("if6").value;
  const movieId = document.getElementById("if7").value;
  const theaterId = document.getElementById("if8").value;

  const newMultiScreening = {
    startTime,
    endTime,
    movieId,
    theaterId,
  };

  // add multiple screenings
  
  const id = await fetch(multiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMultiScreening),
  })
    .then((res) => res.json())
    .then((data) => data.id);

}

// function for populating select options for movie and theater
async function populateMovieSelect() {
  const url = "http://localhost:8080/api/movies";
  const movies = await fetch(url).then((res) => res.json());
  const select = document.getElementById("if3");
  const selectTwo = document.getElementById("if7");
  movies.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.id;
    option.innerHTML = movie.title;
    select.appendChild(option);

        const optionTwo = document.createElement("option");
        optionTwo.value = movie.id;
        optionTwo.innerHTML = movie.title;
        selectTwo.appendChild(optionTwo);
  });
}

// function for populating select options for theater
async function populateTheaterSelect() {
  const url = "http://localhost:8080/api/theaters";
  const theaters = await fetch(url).then((res) => res.json());
  const select = document.getElementById("if4");
  const selectTwo = document.getElementById("if8");
  theaters.forEach((theater) => {
    const option = document.createElement("option");
    option.value = theater.id;
    option.innerHTML = "Sal " + theater.id;
    select.appendChild(option);

    const option2 = document.createElement("option");
    option2.value = theater.id;
    option2.innerHTML = "Sal " + theater.id;
    selectTwo.appendChild(option2);
  });
}
