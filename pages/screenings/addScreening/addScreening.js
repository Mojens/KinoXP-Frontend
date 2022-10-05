const url = "http://localhost:8080/api/screenings";
import { encode } from "../../../utils.js";

let router;
let screening = [];

export function initAddScreening(navigoRouter) {
  document.getElementById("addScreening").onclick = addScreening;
  router = navigoRouter;
}

async function addScreening() {
  const movieId = document.getElementById("if3").value;
  const theaterId = document.getElementById("if4").value;
  const startTime = document.getElementById("if1").value;
  const endTime = document.getElementById("if2").value;


  const newScreening = {
    
    startTime,
    endTime,
    movieId,
    theaterId,
  };

  const id = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newScreening),
  })
    .then((res) => res.json())
    .then((data) => data.id);
  router.navigate(`screening?id=${id}`);
}


