const url = "http://localhost:8080/api/movies/";
import { checkSession1 } from "../../login/loginSettings.js";

export async function initGetMovieById(match) {
  checkSession1();
  document.getElementById("singleMovie").onclick = fetchMovieData;
    document.getElementById("btn-get-all").onclick = getAllMovies;
  if (match?.params?.id) {
    const id = match.params.id;
    try {
      renderMovie(id);
      
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Car: " + id;
    }
  }
}
export async function getAllMovies() {
  try {
    const moviesFromServer = await fetch(url).then((res) => res.json());

    showAllMovies(moviesFromServer);
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
    <td>${movie.rating}</td>
    <td>${movie.duration}</td>
    <td>${movie.genre}</td>
    <td>${movie.ageLimit}</td>
    <td>${movie.showStartDate}</td>
    <td>${movie.showEndDate}</td>
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
    <td>${movie.rating}</td>
    <td>${movie.duration}</td>
    <td>${movie.genre}</td>
    <td>${movie.ageLimit}</td>
    <td>${movie.showStartDate}</td>
    <td>${movie.showEndDate}</td>
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