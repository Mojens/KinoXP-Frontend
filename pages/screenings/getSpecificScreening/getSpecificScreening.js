import { URL_SCREENINGS, URL_MOVIES, URL_SEATS_THEATER_ID, URL_RESERVATIONS_FROM_SCREENING,
  URL_RESERVATIONS, URL_SEAT_CHOICES_LIST } from "../../../settings.js";
import { checkFindScreeningAdmin } from "../../../pages/login/loginSettings.js";
import { getUserId } from "../../../pages/login/loginSettings.js";
let allSeats;
let reservedSeats = [];
let currentScreeningId;

let router;

export function initGetSpecificScreening(match, navigoRouter) {
  checkFindScreeningAdmin();
  document.getElementById("singleScreening").onclick = fetchScreeningData;
  document.getElementById("btn-get-all").onclick = getAllMovies;
  if (getUserId() != null) {
    document.getElementById("seats").onclick = (element) => {
      const x = element.target.id;
      reserveSeats(x);
      showReservedSeats();
    };
  }
  router = navigoRouter;
  document.getElementById("addReservation").onclick = addReservation;

  if (match?.params?.id) {
    const id = match.params.id;
    try {
      currentScreeningId = id;
      renderScreening(id);
      getAllMovies();
    } catch (error) {
      document.getElementById("error").innerHTML =
        "Could not find Screening: " + id;
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
    currentScreeningId = id;
    renderScreening(id);
    getAllMovies();
  } catch (err) {
    console.log("UPS " + err.message);
  }
}
export async function getAllMovies() {
  try {
    const moviesFromServer = await fetch(URL_MOVIES).then((res) => res.json());

    showAllMovies(moviesFromServer);
  } catch (err) {
    console.log(err);
  }
}

async function getMovieTitle(movieId) {
  const movie = await fetch(URL_MOVIES + movieId).then(
    (res) => res.json()
  );
  return movie.title;
}

function showAllMovies(movies) {
  document.getElementById("if1").style.display = "inline-block";
  document.getElementById("if2").style.display = "block";
  document.getElementById("addReservation").style.display = "block";
  const card = document.getElementById("cellphone-container-big");
  card.innerHTML = "";
  movies.forEach((movie) => {
    const divMovie = document.createElement("div");
    divMovie.className = "movie-big";
    console.log(movie);
    const screeningId = document.getElementById("id").innerText;
    console.log("Screening ID: " + screeningId);
    console.log("Movie ID: " + movie.id);

    divMovie.innerHTML = ` 
    <div class="movie-img-big">
      <img class="movie-img-big" src="${movie.photo}"  alt="movie image ${movie.title}"/>
    </div>
    <div class="text-movie-cont-big">
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

    const screeningResponseSize = movie.screeningResponse;
    let count = Object.keys(screeningResponseSize);

    for (let i = 0; i < count.length; i++) {
      if (movie.screeningResponse[i].id == screeningId) {
        card.appendChild(divMovie);

        const div = document.createElement("div");
        div.className = "screenings-container";
        const ul = document.createElement("ul");
        ul.className = "screenings";

        divMovie.appendChild(div);
        console.log("Screening ID: " + screeningId);
        console.log("ScreeningResponse: " + movie.screeningResponse[i].id);
        console.log(movie.screeningResponse[i].startTime);
        const divScreening = document.createElement("li");
        const link = document.createElement("a");
        link.id = "screening-link";
        link.href = "#/screening?id=" + movie.screeningResponse[i].id;

        link.innerHTML = movie.screeningResponse[i].startTime;

        divScreening.className = "screening";
        const startT = document.getElementById("starttime");
        startT.innerText = movie.screeningResponse[i].startTime;
        const theaterRoom = document.getElementById("theater-room");
        theaterRoom.innerHTML = "Sal " + movie.screeningResponse[i].theaterId;
        const getScreen = document.getElementById("screen");
        getScreen.innerText = movie.screeningResponse[i].theaterId;
        getScreen.style.color = "transparent";

        if (getScreen.childNodes.length === 1) {
          const screenImg = document.createElement("img");
          screenImg.className = "screen-img";
          screenImg.src = movie.photo;
          getScreen.classList.add("theater");
          getScreen.appendChild(screenImg);
        }
        ul.appendChild(divScreening);
        divScreening.appendChild(link);
        divMovie.appendChild(ul);
        div.appendChild(ul);
      }
    }
  });
}

async function renderScreening(id) {
  const screening = await fetch(URL_SCREENINGS + id).then((res) => res.json());

  if (!screening) {
    document.getElementById("error").innerText =
      "Could not find Screening: " + id;
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
    allSeats = await fetch(
      URL_SEATS_THEATER_ID + screening.theaterId
    ).then((res) => res.json());
    makeAllSeats(allSeats, id);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

async function makeAllSeats(allSeats, screeningId) {
  const seats = document.getElementById("seats");

  const seatResponse = await fetch(
    URL_RESERVATIONS_FROM_SCREENING + screeningId
  ).then((res) => res.json());
  const reservedSeats = seatResponse.map((seat) => seat.id);
  console.log(reservedSeats);

  let divInsert = "";
  let lastSeat = allSeats[0];

  allSeats.forEach((seat) => {
    let id = "seat-" + seat.id;

    if (seat.rowNum === lastSeat.rowNum) {
      if (reservedSeats.includes(seat.id)) {
        divInsert += `<li id="${id}" class="seats" style="background-color: #B22727">${seat.rowNum}${seat.seatNumber} </li>`;
      } else {
        divInsert += `<li id="${id}" class="seats">${seat.rowNum}${seat.seatNumber} </li>`;
      }
    } else {
      if (reservedSeats.includes(seat.id)) {
        divInsert += `<br><li id="${id}" class="seats" style="background-color: #B22727">${seat.rowNum}${seat.seatNumber} </li>`;
      } else {
        divInsert += `<br><li id="${id}" class="seats">${seat.rowNum}${seat.seatNumber} </li>`;
      }
    }

    // insert row number every 12 seats
    if (seat.seatNumber % 12 === 0 && seat.theaterId === 1) {
      divInsert += `<li class="seatsNumber">${seat.rowNum}</li>`;
    } else if (seat.seatNumber % 16 === 0 && seat.theaterId === 2) {
      divInsert += `<li class="seatsNumber">${seat.rowNum}</li>`;

      // insert row number before the start of the row
    }
    lastSeat = seat;
  });
  seats.innerHTML = divInsert;
}

function reserveSeats(seatId) {
  const redColor = "rgb(178, 39, 39)";

  let seat = document.getElementById(seatId);
  let seatColor = window.getComputedStyle(seat).backgroundColor;

  if (!(seatId === "seats")) {
    if (seatColor === redColor) {
      return;
    } else if (reservedSeats.includes(seatId)) {
      document.getElementById(seatId).style.backgroundColor = "#3c805c";
      reservedSeats = reservedSeats.filter((seat) => !seat.includes(seatId));
      return;
    } else {
      document.getElementById(seatId).style.backgroundColor = "blue";
      reservedSeats.push(seatId);
      return;
    }
  }
}

async function addReservation() {
  const email = document.getElementById("if1").value;
  const phoneNumber = document.getElementById("if2").value;
  const employeeId = getUserId();
  const screeningId = currentScreeningId;
  console.log(screeningId);

  const newReservation = {
    email,
    phoneNumber,
    employeeId,
    screeningId,
  };
  const answer = await fetch(URL_RESERVATIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReservation),
  }).then((res) => res.json());

  addSeatChoices(answer.id);

}

async function addSeatChoices(resId) {
  let newSeatChoices = [];
  for (let i = 0; i < reservedSeats.length; i++) {
    const seatChoice = reservedSeats[i];
    const seatingsId = seatChoice.substring(seatChoice.indexOf("-") + 1);
    const reservationId = resId;

    const newSeatChoice = {
      seatingsId,
      reservationId,
    };
    newSeatChoices.push(newSeatChoice);
  }

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSeatChoices),
  };

  await fetch(URL_SEAT_CHOICES_LIST, opts)
      .then((res) => res.json());

  router.navigate(`single-reservation?id=${resId}`);

}

async function showReservedSeats() {
  let resNumAndRow = [];

  for (let i = 0; i < reservedSeats.length; i++) {
    let tempSeat = reservedSeats[i].substring(
      reservedSeats[i].indexOf("-") + 1
    );
    for (let j = 0; j < allSeats.length; j++) {
      if (tempSeat == allSeats[j].id) {
        let text = allSeats[j].rowNum + "-" + allSeats[j].seatNumber;
        resNumAndRow.push(text);
      }
    }
  }
  document.getElementById("selectedSeatss").innerText = "";
  document.getElementById("selectedSeatss").innerText =
    "Selected seats: " + resNumAndRow.toString();
}
