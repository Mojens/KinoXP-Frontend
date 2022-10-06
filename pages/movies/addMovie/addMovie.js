const url = "http://localhost:8080/api/movies";
import { encode } from "../../../utils.js";
import { checkSession } from "../../login/loginSettings.js";

let router;
let movie = [];

export function initAddMovie(navigoRouter) {
  checkSession(1);
  document.getElementById("addMovie").onclick = addMovie;
  router = navigoRouter;
}

async function addMovie() {
  const title = document.getElementById("if1").value;
  const description = document.getElementById("if2").value;
  const rating = document.getElementById("if3").value;
  const genre = document.getElementById("if4").value;
  const duration = document.getElementById("if5").value;
  const ageLimit = document.getElementById("if6").value;
  const price = document.getElementById("if7").value;
  const showStartDate = document.getElementById("if8").value;
  const showEndDate = document.getElementById("if9").value;

  const newMovie = {
    title,
    description,
    rating,
    genre,
    duration,
    ageLimit,
    price,
    showStartDate,
    showEndDate,
    
  };

  const id = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  })
    .then((res) => res.json())
    .then((data) => data.id);
  router.navigate(`movie-title?id=${id}`);
}