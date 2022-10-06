const url = "http://localhost:8080/api/theater/";

export async function initGetSpecificTheater(match) {
    document.getElementById("singleTheater").onclick = fetchTheaterData;
    if (match?.params?.id) {
        const id = match.params.id;
        try {
            renderTheater(id);
        } catch (error) {
            document.getElementById("error").innerHTML = "Could not find Theater: " + id;
        }
    }
}
async function fetchTheaterData() {
    document.getElementById("error").innerText = "";
    const id = document.getElementById("text-for-id").value;
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id";
        return;
    }
    try {
        renderTheater(id);
    } catch (err) {
        console.log("UPS " + err.message);
    }
}

async function renderTheater(id) {
    const theater = await fetch(url + id).then((res) => res.json());
    if (!theater) {
        document.getElementById("error").innerText = "Could not find theater: " + id;
        return;
    }
    try {
        document.getElementById("id").innerText = theater.id;


    } catch (err) {
        console.log("UPS " + err.message);
    }
}