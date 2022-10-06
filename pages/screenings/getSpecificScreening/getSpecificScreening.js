const url = "http://localhost:8080/api/screenings/";



export async function initGetSpecificScreening(match) {
  document.getElementById("singleScreening").onclick = fetchScreeningData;
  if (match?.params?.id) {
    const id = match.params.id;
    try {
      renderScreening(id);
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Screening: " + id;
    }
  }
}


async function fetchScreeningData() {
  document.getElementById("error").innerText = "";
  const id = document.getElementById("text-for-id").value;
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id";
    return;
  }
  try {
    renderScreening(id);
    getReservedSeatsFromScreening(id);
    getAllSeats(id)
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

async function getMovieTitle(movieId) {
  const movie = await fetch("http://localhost:8080/api/movies/" + movieId).then(
    (res) => res.json()

  );
  return movie.title;
}

//Tester seatChoice
async function getReservedSeatsFromScreening(id)  {
  console.log("id is:"+ id)
  const seats = await fetch("http://localhost:8080/api/reservations/fromScreening/" + id).then((res) => res.json());
  console.log(seats)
  if(!seats) {
    document.getElementById("error").innerHTML = "Could not find seats: " + id;
    return;
  }
  try {
    document.getElementById("seat-test").innerText = seats;
  } catch (err) {
    console.log("UPS " + err.message);
  }

}

async function renderScreening(id) {
  const screening = await fetch(url + id).then((res) => res.json());
  
  if (!screening) {
    document.getElementById("error").innerText = "Could not find Screening: " + id;
    return;
  }
  try {
    document.getElementById("id").innerText = screening.id;
    document.getElementById("performance").innerText = screening.performance;
    document.getElementById("startTime").innerText = screening.startTime;
    document.getElementById("endTime").innerText = screening.endTime;
    // get movie title from movie id
    await getMovieTitle(screening.movieId).then((title) => {
        document.getElementById("movie").innerText = title;
    });
    document.getElementById("theater").innerText = screening.theaterId;
  } catch (err) {
    console.log("UPS " + err.message);
  }
}


async function getAllSeats(id){
  const allSeats = await fetch("http://localhost:8080/api/seats/theaterid/" + id).then((res) => res.json());
  makeAllSeats(allSeats)
}

function makeAllSeats(allSeats) {
  const main = document.getElementById("seats")

  let divInsert = ""
  allSeats.forEach((seat) => {
    divInsert += `<il class="seats">${seat.rowNum}${seat.seatNumber} </il>`
  })
  main.innerHTML = divInsert

}
