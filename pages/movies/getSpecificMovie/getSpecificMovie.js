const url = "http://localhost:8080/api/movies/";
import { checkSession1 } from "../../login/loginSettings.js";

let movies = [];
let router;

export async function initGetMovieById(match,navigoRouter) {
  checkSession1();
  document.getElementById("singleMovie").onclick = fetchMovieData;
    document.getElementById("btn-get-all").onclick = getAllMovies;
      document.getElementById("tbody-all").onclick = showMovieDetails;
      document.getElementById("editMovie").onclick = toEditMovie;
      document.getElementById("deleteMovie").onclick = deleteMovie;
     router = navigoRouter;
  if (match?.params?.id) {
    const id = match.params.id;
    try {
      renderMovie(id);
      getAllMovies();
      
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Car: " + id;
    }
  }
}
export async function getAllMovies() {
  try {
    const moviesFromServer = await fetch(url).then((res) => res.json());

    showAllMovies(moviesFromServer);
      movies = moviesFromServer;
  } catch (err) {
    console.log(err);
  }
}

async function fetchMovieData() {
  document.getElementById("error").innerText = "";
  const id = document.getElementById("text-for-id").value;
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id";
    return;
  }
  try {
    renderMovie(id);
    
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

async function renderMovie(id) {
  const movie = await fetch(url + id).then((res) => res.json());
  if (!movie) {
    document.getElementById("error").innerText = "Could not find Movie: " + id;
    return;
  }
  try {
    // for each movie, create a row in the table
    const card = document.getElementById("tbody-all");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${movie.id}</td>
    <td>${movie.title}</td>
    <td id=movie-description>${movie.description}</td>
    <td>${movie.rating}</td>
      <td>${movie.genre}</td>
    <td>${movie.duration}</td>
    <td>${movie.ageLimit}</td>
    <td>${movie.price}</td>
    <td>${movie.showStartDate}</td>
    <td>${movie.showEndDate}</td>
    <td>
     <button id="${movie.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button> 
    </td>
    `;
    card.appendChild(tr);

    // if the user clicks on find movie, only display the movie with the given id
    const movieId = document.getElementById("text-for-id").value;
    if (movieId) {
      const card = document.getElementById("tbody-all");
      card.innerHTML = "";
      const tr = document.createElement("tr");
      tr.innerHTML = `
  <td>${movie.id}</td>
    <td>${movie.title}</td>
    <td id=movie-description>${movie.description}</td>
    <td>${movie.rating}</td>
      <td>${movie.genre}</td>
    <td>${movie.duration}</td>
    <td>${movie.ageLimit}</td>
    <td>${movie.price}</td>
    <td>${movie.showStartDate}</td>
    <td>${movie.showEndDate}</td>
    <td>
     <button id="${movie.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button> 
    
    </td>
    `;
      card.appendChild(tr);
    }
  

  } catch (err) {
    console.log("UPS " + err.message);
  }
}

function showAllMovies(data) {
  // Call render movie for each movie
  const inputText = document.getElementById("text-for-id");
  if (inputText.value != "") {
    inputText.value = "";
  }
  const card = document.getElementById("tbody-all");
  card.innerHTML = "";
  data.forEach((movie) => {
    renderMovie(movie.id);
  });
  
}

async function showMovieDetails(evt) {
  const target = evt.target;
  if (!target.id.includes("-column-id")) {
    return;
  }
  const id = target.id.replace("-column-id", "");
  if (target.classList.contains("other-page")) {
    router.navigate("movie-title?id=" + id);
  } else {
    document.getElementById("exampleModalLabel").innerText =
      "Details for Movie: " + id;
    const movie = await fetch(url + id).then((res) => res.json());
    document.getElementById("id").innerText = movie.id;
    document.getElementById("title").innerText = "Title: " + movie.title;
    document.getElementById("description").innerText =
      "Description: " + movie.description;
    document.getElementById("rating").innerText = "Rating: " + movie.rating;
    document.getElementById("genre").innerText = "Genre: " + movie.genre;
    document.getElementById("duration").innerText =
      "Duration: " + movie.duration;
    document.getElementById("ageLimit").innerText =
      "Age Limit: " + movie.ageLimit;
    document.getElementById("price").innerText = "Price: " + movie.price;
    document.getElementById("showStartDate").innerText =
      "Show Start Date: " + movie.showStartDate;
    document.getElementById("showEndDate").innerText =
      "Show End Date: " + movie.showEndDate;
  }
}

function toEditMovie() {
  const id = document.getElementById("id").innerText;
  router.navigate("edit-movie?id=" + id);
}

async function deleteMovie(id) {
  id = document.getElementById("id").innerText;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url + id, options);
    const json = await response.json();
    console.log("Deleted car with id: " + id);
    console.log(json);
    updateTable(id);
  } catch (error) {
    console.log(error);
  }
}

async function updateTable(id) {
  const tbody = document.getElementById("tbody-all");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td ></td>
    <td ></td>
    <td ></td>
    <td  id=deleteMe>Deleted Screening: ${id}</td>
    <td ></td>
    <td ></td>
    <td ></td>
    `;

  tbody.appendChild(tr);
  tr.classList.add("deleteRow");
  setTimeout(() => {
    tbody.removeChild(tbody.lastChild);
  }, 3000);

  tbody.removeChild(document.getElementById(id + "-column-id").parentElement);
}