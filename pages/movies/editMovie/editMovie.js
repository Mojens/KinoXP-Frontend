const url = "http://localhost:8080/api/movies/";
import { encode } from "../../../utils.js";
import { checkSession1 } from "../../login/loginSettings.js";

let router;
let movies = [];

export function initEditMovie(match, navigoRouter) {
  checkSession1();
  document.getElementById("findEdit").onclick = fetchMovieData;
  const submitEdit = document.getElementById("submitEdit");
  const getEdit = document.getElementById("text-for-id");
  router = navigoRouter;
  submitEdit.addEventListener("click", (e) => {
    e.preventDefault();
    editMovie(getEdit.value);
  });
  if (match?.params?.id) {
    const id = match.params.id;

    try {
      findMovie(id);
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Car: " + id;
    }
  }
}

/// Fetch Movie Data
async function fetchMovieData() {
  document.getElementById("error").innerText = "";
  const id = document.getElementById("text-for-id").value;
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id";
    return;
  }
  try {
    findMovie(id);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

/// Placeholder text for a specific Movie for editing
function createPlaceholderText(movie) {

  if(window.location.href.includes("id")){
    document.getElementById("text-for-id").value = movie.id;
  }
  document.getElementById("if1").value = movie.title;
  document.getElementById("if2").value = movie.description;
  document.getElementById("if3").value = movie.rating;
  document.getElementById("if4").value = movie.genre;
  document.getElementById("if5").value = movie.duration;
  document.getElementById("if6").value = movie.ageLimit;
  document.getElementById("if7").value = movie.price;
  document.getElementById("if8").value = movie.showStartDate;
  document.getElementById("if9").value = movie.showEndDate;
  document.getElementById("if10").value = movie.photo;
  document.getElementById("if11").value = movie.stars;
  document.getElementById("if12").value = movie.trailers;

}

/// Find Movie for editing
async function findMovie(id) {
  const movie = await fetch(url + id).then((res) => res.json());
  if (!movie) {
    document.getElementById("error").innerText = "Could not find Movie: " + id;
    return;
  }
  try {
    document.getElementById("id").innerText = movie.id;

    createPlaceholderText(movie);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

/// Edit Movie
async function editMovie(id) {
  const title = document.getElementById("if1").value;
  const description = document.getElementById("if2").value;
  const rating = document.getElementById("if3").value;
  const genre = document.getElementById("if4").value;
  const duration = document.getElementById("if5").value;
  const ageLimit = document.getElementById("if6").value;
  const price = document.getElementById("if7").value;
  const showStartDate = document.getElementById("if8").value;
  const showEndDate = document.getElementById("if9").value;
  const photo = document.getElementById("if10").value;
  const stars = document.getElementById("if11").value;
  const trailer = document.getElementById("if12").value;


  const updatedMovie = {
    id: id,
    title,
    description,
    rating,
    genre,
    duration,
    ageLimit,
    price,
    photo,
    stars,
    trailer,
    showStartDate,
    showEndDate,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMovie),
  };

  // navigate to single-car page after submit

  const response = await fetch(url + id, options);
  const data = await response.json();
  let sucess = (document.getElementById("edited").innerText = "Movie edited");
  // reload page after submit
  setTimeout(function () {
    location.reload();
  }, 1000);
  console.log(data);
}
