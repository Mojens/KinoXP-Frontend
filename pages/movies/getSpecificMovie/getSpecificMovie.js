const url = "http://localhost:8080/api/movies/";

export async function initGetMovieById(match) {
  document.getElementById("singleMovie").onclick = fetchMovieData;
  if (match?.params?.id) {
    const id = match.params.id;
    try {
      renderMovie(id);
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Car: " + id;
    }
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
    document.getElementById("id").innerText = movie.id;
    document.getElementById("title").innerText = movie.title;
    document.getElementById("description").innerText =
      movie.description;
    document.getElementById("rating").innerText = movie.rating;
    document.getElementById("genre").innerText = movie.genre;
    document.getElementById("duration").innerText = movie.duration;
    document.getElementById("ageLimit").innerText = movie.ageLimit;
    document.getElementById("price").innerText = movie.price;
    document.getElementById("showStartDate").innerText =
      movie.showStartDate;
    document.getElementById("showEndDate").innerText = movie.showEndDate;
    

  } catch (err) {
    console.log("UPS " + err.message);
  }
}