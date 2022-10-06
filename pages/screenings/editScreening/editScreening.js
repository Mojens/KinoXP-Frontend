const url = "http://localhost:8080/api/screenings/";
import { encode } from "../../../utils.js";

let router;
let screenings = [];

export function initEditScreening(match, navigoRouter) {
  document.getElementById("findEdit").onclick = fetchScreeningData;
  const submitEdit = document.getElementById("submitEdit");
  const getEdit = document.getElementById("text-for-id");
  router = navigoRouter;
  submitEdit.addEventListener("click", (e) => {
    e.preventDefault();
    editScreening(getEdit.value);
  });
  if (match?.params?.id) {
    const id = match.params.id;

    try {
      findScreening(id);
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Car: " + id;
    }
  }
}

async function getMovieTitle(movieId) {
  const movie = await fetch("http://localhost:8080/api/movies/" + movieId).then(
    (res) => res.json()
  );
  return movie.title;
}

async function fetchScreeningData() {
  document.getElementById("error").innerText = "";
  const id = document.getElementById("text-for-id").value;
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id";
    return;
  }
  try {
    findScreening(id);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

function createPlaceholderText(screening) {
  document.getElementById("if2").value = screening.startTime;
  document.getElementById("if3").value = screening.endTime;
}

async function findScreening(id) {
  const screening = await fetch(url + id).then((res) => res.json());
  if (!screening) {
    document.getElementById("error").innerText = "Could not find Screening: " + id;
    return;
  }
  try {
    document.getElementById("id").innerText = screening.id;
    document.getElementById("performance").innerText = screening.performance;
    getMovieTitle(screening.movieId).then((title) => {
        document.getElementById("movie").innerText = title;
    });
    
    document.getElementById("theater").innerText = screening.theaterId;

    createPlaceholderText(screening);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

async function editScreening(id) {
  const startTime = document.getElementById("if2").value;
  const endTime = document.getElementById("if3").value;
    const performance = document.getElementById("performance").innerText;
    const theater = document.getElementById("theater").innerText;
  // show movie id

 



  const updatedScreening = {
    id: id,
    performance: performance,
    startTime,
    endTime,
    
    theaterId: theater,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedScreening),
  };

  // navigate to single-car page after submit

  const response = await fetch(url + id, options);
  const data = await response.json();
  let sucess = (document.getElementById("edited").innerText = "Screening edited");
  // reload page after submit
  setTimeout(function () {
    location.reload();
  }, 1000);
  console.log(data);
}