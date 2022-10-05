const url = "http://localhost:8080/api/screenings";
import { encode } from "../../../utils.js";

let screenings = [];
let router;

export function initGetAllScreenings(navigoRouter) {
  document.getElementById("btn-get-all").onclick = getAllScreenings;
  document.getElementById("tbody-all").onclick = showScreeningDetails;
  document.getElementById("deleteScreening").onclick = deleteScreening;
  document.getElementById("editScreening").onclick = toEditScreening;
  getAllScreenings();
  router = navigoRouter;
}

export async function getAllScreenings() {
  try {
    const screeningsFromServer = await fetch(url).then((res) => res.json());
    showAllScreenings(screeningsFromServer);

    screenings = screeningsFromServer;

  } catch (err) {
    console.log(err);
  }
}

// get movie title from movie id
async function getMovieTitle(movieId) {
  const movie = await fetch("http://localhost:8080/api/movies/" + movieId).then(
    (res) => res.json()
  );
  return movie.title;
}

// get movie title from movie id in td table
function showAllScreenings(data) {
  const tbody = document.getElementById("tbody-all");
  data.forEach((screening) => {
    const tr = document.createElement("tr");
    getMovieTitle(screening.movieId).then((title) => {
      tr.innerHTML = `

                <td>${screening.id}</td>
                <td>${screening.performance}</td>
                <td>${screening.startTime}</td>
                <td>${screening.endTime}</td>
                <td>${title}</td>
                <td>${screening.theaterId}</td>
                <button id="${screening.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
   
    <button id="${screening.id}-column-id" type="button"  class="other-page btn btn-sm btn-secondary">Details-2</button> </td>  
            `;
    });

    tbody.appendChild(tr);
    
    // append child only once
    if (tbody.children.length > data.length) {
      tbody.removeChild(tbody.children[0]);
    }
  });
}

async function showScreeningDetails(evt) {
  const target = evt.target;
  if (!target.id.includes("-column-id")) {
    return;
  }
  const id = target.id.replace("-column-id", "");
  if (target.classList.contains("other-page")) {
    router.navigate("screening?id=" + id);
  } else {
    document.getElementById("exampleModalLabel").innerText =
      "Details for Screening: " + id;
    const screening = await fetch(url + "/" + id).then((res) => res.json());
    document.getElementById("id").innerText = screening.id;
    document.getElementById("performance").innerText =
      "Performance: " + screening.performance;
    document.getElementById("starttime").innerText =
      "Start Time: " + screening.startTime;
    document.getElementById("endtime").innerText =
      "End Time: " + screening.endTime;
    // get movie title from movie id

    getMovieTitle(screening.movieId).then((title) => {
      document.getElementById("movie").innerText = "Movie: " + title;
    });

    document.getElementById("theater").innerText =
      "Theater: " + screening.theaterId;
  }
}

async function deleteScreening(id) {
  id = document.getElementById("id").innerText;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url + "/" + id, options);
    const json = await response.json();
    console.log("Deleted screening with id: " + id);
    console.log(json);
    updateTable(id);
  
  } catch (error) {
    console.log(error);
  }
}

function toEditScreening() {
  const id = document.getElementById("id").innerText;
  router.navigate("edit-screening?id=" + id);
}

// update rows in table after delete
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
