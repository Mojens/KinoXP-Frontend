const url = "https://imdb-api.com/da/API/Title/k_bdxy7ojz/";
import { encode } from "../../../utils.js";

let router;
let movie = [];

export function initImdbMovieTest(navigoRouter) {
    document.getElementById("addMovie").onclick = addMovie;
    document.getElementById("searchMovie").onclick = imdbSearch;
    router = navigoRouter;
    }

    // Find movie by title
async function imdbSearch() {
    const title = document.getElementById("imdbSearch").value;
    const newUrl = url + title;
    const response = await fetch(newUrl);
    const data = await response.json();
    console.log(data);
    createPlaceholderText(data);
   
}

// create placeholdertext from API data
function createPlaceholderText(movie) {
  document.getElementById("if1").value = movie.title;
  document.getElementById("if2").value = movie.plotLocal;
  document.getElementById("if3").value = movie.imDbRating;
  document.getElementById("if4").value = movie.genres;
  document.getElementById("if5").value = movie.runtimeMins;
  document.getElementById("if6").value = movie.contentRating;
  document.getElementById("image").value = movie.image;
  
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
    const image = document.getElementById("image").value;

    const newMovie = {
        title,
        description,
        rating,
        genre,
        duration,
        ageLimit,
        price,
        photo:image,
        showStartDate,
        showEndDate,
        
    };
    const myUrl = "http://localhost:8080/api/movies";
    const id = await fetch(myUrl, {
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

