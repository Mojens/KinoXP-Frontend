const url = "http://localhost:8080/api/movies";
import { encode } from "../../../utils.js";

let movies = [];
let router;

export function initGetAllMovies(navigoRouter) {
  document.getElementById("btn-get-all").onclick = getAllMovies;
    document.getElementById("tbody-all").onclick = showMovieDetails;
  document.getElementById("deleteMovie").onclick = deleteMovie;
  document.getElementById("editMovie").onclick = toEditMovie;
  getAllMovies();
  router = navigoRouter;
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

function showAllMovies(data) {
  const tableRowsArray = data.map(
    (movie) =>
      `
        <tr>
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.description}</td>
            <td>${movie.rating}</td>
            <td>${movie.genre}</td>
            <td>${movie.duration}</td>
            <td>${movie.ageLimit}</td>
            <td>${movie.price}</td>
           <td><img src="${movie.photo}" alt="photo" width="100" height="100"></td>
            <td>${movie.showStartDate}</td>
            <td>${movie.showEndDate}</td>
          <td>
    <!--See https://getbootstrap.com/docs/5.0/components/modal/ for an explanation of the classes used below -->
    <button id="${movie.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
   
    <button id="${movie.id}-column-id" type="button"  class="other-page btn btn-sm btn-secondary">Details-2</button> </td>  
           
        </tr>`
  );

  const tableRowsString = tableRowsArray.join("\n");
  document.getElementById("tbody-all").innerHTML = tableRowsString;
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
    const movie = await fetch(url + '/' + id).then((res) => res.json());
    document.getElementById("id").innerText = movie.id;
        document.getElementById("title").innerText =  "Title: " + movie.title;
        document.getElementById("description").innerText = "Description: " + movie.description;
        document.getElementById("rating").innerText = "Rating: " + movie.rating;
        document.getElementById("genre").innerText = "Genre: " + movie.genre;
        document.getElementById("duration").innerText = "Duration: " + movie.duration;
        document.getElementById("ageLimit").innerText = "Age Limit: " + movie.ageLimit;
        document.getElementById("price").innerText = "Price: " + movie.price;
        document.getElementById("showStartDate").innerText = "Show Start Date: " + movie.showStartDate;
        document.getElementById("showEndDate").innerText = "Show End Date: " + movie.showEndDate;
   
  }
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
    const response = await fetch(url +'/' + id, options);
    const json = await response.json();
    console.log("Deleted car with id: " + id);
    console.log(json);
    getAllMovies();
  } catch (error) {
    console.log(error);
  }
}

// redirect to edit movie page
function toEditMovie() {
  const id = document.getElementById("id").innerText;
  router.navigate("edit-movie?id=" + id);
}