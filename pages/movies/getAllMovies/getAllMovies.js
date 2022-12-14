import {URL_MOVIES, URL_SCREENINGS} from "../../../settings.js";
import { encode } from "../../../utils.js";
import { getAllScreenings } from "../../screenings/getAllScreenings/allScreenings.js";

let movies = [];
let router;

export function initGetAllMovies(navigoRouter) {
  document.getElementById("btn-get-all").onclick = getAllMovies;

  /*  document.getElementById("tbody-all").onclick = showMovieDetails;*/
  /* document.getElementById("deleteMovie").onclick = deleteMovie; */
  /*  document.getElementById("editMovie").onclick = toEditMovie; */

  getAllMovies();
  router = navigoRouter;
}

export async function getAllMovies() {
  try {
    const moviesFromServer = await fetch(URL_MOVIES).then((res) => res.json());

    showAllMovies(moviesFromServer);

    slide();
    movies = moviesFromServer;
  } catch (err) {
    console.log(err);
  }
}
function slide() {
  document.getElementsByClassName("curtainContainer")[0].style.transform =
    "translatex(-150vw) ";
  document.getElementsByClassName("curtainContainer")[1].style.transform =
    "translatex(150vw)";
}

// show all movies in a card view
function showAllMovies(movies) {
  
  const card = document.getElementById("cellphone-container");
  card.innerHTML = "";
  movies.forEach((movie) => {
 const screeningResponseSize = movie.screeningResponse;
 // get the size of elements in movie
    console.log("ScSize: " +screeningResponseSize);
 let count = Object.keys(screeningResponseSize);
    console.log("1Count"+count);

 if (movie.screeningResponse[0] != null) {
  console.log("ScSize: " + screeningResponseSize.length);
   const divMovie = document.createElement("div");
   divMovie.className = "movie";
   console.log(movie);

   divMovie.innerHTML = ` 
    <div class="movie-img">
      <img class="movie-img" src="${movie.photo}"  alt="movie image ${movie.title}"/>
    </div>
    <div class="text-movie-cont">
      <div class="mr-grid">
        <div class="col1">
          <h2 class="h2">${movie.title}</h2>
          <ul class="movie-gen">
            <li>${movie.ageLimit}</li>
            <li>${movie.duration}</li>
            <li>${movie.genre}</li>   
            
          </ul >
            
        </div>
      </div>
      <div class="mr-grid summary-row">
        <div class="col2">
          <h5 class=h5>Summary</h5>
        </div>  
        <div class="col2">
          <ul class="movie-likes">
            <li><i class="material-icons">&#xE813;</i>${movie.rating}</li>
            </ul>
        </div>
      </div>
      <div class="movie-info-content">
      <div class="mr-grid">
        <div class="col1">
          <p class="movie-description">${movie.description}</p>

      </div>
      </div>
      <div class="mr-grid actors-row">
        <div class="col1">
        <p class="movie-actors">${movie.stars}</p>
        </div>
        </div>
        </div>
        <div class="mr-grid action-row">
        <div class="col2">
       
        <div class="watch-btn">
         <a id="watch-trailer-embed" href="${movie.trailers}" target="_blank" >
          <h3 class="h3">Watch Trailer
          <i class="material-icons">&#xE037;</i>
          
          </h3>
       </a>
          </div>
          </div> 
          <div class="col2 action-btn">
          <h2 class="h2">${movie.price} KR</h2>
          <i class="material-icons">&#xe54d;</i>
            

          </div>
        

        </div>
      
      </div>
            
            
      `;
   card.appendChild(divMovie);

   const div = document.createElement("div");
   div.className = "screenings-container";
   const ul = document.createElement("ul");
   ul.className = "screenings";

   divMovie.appendChild(div);

   console.log("ScreeningResponse" + movie.screeningResponse);

   console.log("COUNT: " + count.length);
   for (let i = 0; i < count.length; i++) {
     console.log(movie.screeningResponse[i].startTime);
     const divScreening = document.createElement("li");
     const link = document.createElement("a");
     link.id = "screening-link";
     link.href = "#/screening?id=" + movie.screeningResponse[i].id;
     // only show movies with screenings

     console.log("screening response size: " + screeningResponseSize[count[i]]);
     if (movie.screeningResponse[i].performance === 100) {
       link.className = "red";
       link.innerHTML = "Sold out";
     } else if (movie.screeningResponse[i].performance >= 75) {
       link.innerHTML = movie.screeningResponse[i].startTime
         // Dont display year
         .split("T")[0]
         .split("-")
         .slice(1)
         .join("-");
       link.className = "orange";
     } else if (movie.screeningResponse[i].performance >= 50) {
       link.innerHTML = movie.screeningResponse[i].startTime
         // Dont display year
         .split("T")[0]
         .split("-")
         .slice(1)
         .join("-");
       link.className = "yellow";
     } else {
       link.innerHTML = movie.screeningResponse[i].startTime
         // Dont display year
         .split("T")[0]
         .split("-")
         .slice(1)
         .join("-");
       link.className= "white";
     }

     divScreening.className = "screening";

     ul.appendChild(divScreening);
     divScreening.appendChild(link);
     divMovie.appendChild(ul);
     div.appendChild(ul);
   }
 }
  });
}

//

async function getScreeningPerformance(screeningId) {
  const screening = await fetch(
    URL_SCREENINGS + screeningId
  ).then((res) => res.json());
  return screening.performance;
}

/*
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
*/
/*
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
*/
/*
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
}*/
