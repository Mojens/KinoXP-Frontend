import {URL_MOVIES, URL_SCREENINGS, URL_SCREENINGS_ALL, URL_THEATERS} from "../../../settings.js";
import { encode } from "../../../utils.js";
import { checkSession1 } from "../../../pages/login/loginSettings.js";

let router;
let screening = [];
 var options = {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
 };

export function initAddScreening(navigoRouter) {
  checkSession1();
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

  const id = await fetch(URL_SCREENINGS, {
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

  const id = await fetch(URL_SCREENINGS_ALL, {
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
    const movies = await fetch(URL_MOVIES).then((res) => res.json());
    const select = document.getElementById("if3");
     var selectTwo = document.getElementById("if7");
    
    movies.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.id;
      option.innerHTML = movie.title;
      select.appendChild(option);


       const optionTwo = document.createElement("option");
       optionTwo.value = movie.id;
       optionTwo.innerHTML = movie.title;
       selectTwo.appendChild(optionTwo);
       const fromSelectTwo = document.getElementById("show-period");
       const create = document.createElement("h5");
       create.id = "display-period";
       var showStartDate = new Date(movie.showStartDate);
       var showEndDate = new Date(movie.showEndDate);
       create.innerText = `Fra ${showStartDate.toLocaleDateString(
            "da-dk",
            options)} Til ${showEndDate.toLocaleDateString(
            "da-dk",
            options)}`;
       fromSelectTwo.appendChild(create);
       // only show first movie element
               if (movie.id == movies[0].id) {
         create.style.display = "block";
       } else {
         create.style.display = "none";
       }
          /// When movie is selected, show period is shown
        selectTwo.addEventListener("change", (e) => {
          const movieId = e.target.value;
          const movie = movies.find((m) => m.id == movieId);
          const showPeriod = document.getElementById("display-period");
          // change dateTime format to dd-mm-yyyy hh:mm
         
          showStartDate = new Date(movie.showStartDate);
          showEndDate = new Date(movie.showEndDate);
          showPeriod.innerHTML = `Fra ${showStartDate.toLocaleDateString(
            "da-dk",
            options
          )} Til ${showEndDate.toLocaleDateString("da-dk", options)}`;
        }
        
        );
      });
  }

// function for populating select options for theater
async function populateTheaterSelect() {
    const theaters = await fetch(URL_THEATERS).then((res) => res.json());
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
