const url = "http://localhost:8080/api/movies";
import { encode } from "../../../utils.js";

let movies = [];
let router;

export function initGetAllMovies(navigoRouter) {
  document.getElementById("btn-get-all").onclick = getAllMovies;

  getAllMovies();
  router = navigoRouter;
}

export async function getAllMovies() {
    try{
        const moviesFromServer = await fetch(url).then(res => res.json());
        showAllMovies(moviesFromServer);
        movies = moviesFromServer;
    } catch(err) {
        console.log(err);
    }
}

function showAllMovies(data){
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
            <td>${movie.showStartDate}</td>
            <td>${movie.showEndDate}</td>
        `
    );
    const tableRowsString = tableRowsArray.join("\n");
    document.getElementById("tbody-all").innerHTML = tableRowsString;
}