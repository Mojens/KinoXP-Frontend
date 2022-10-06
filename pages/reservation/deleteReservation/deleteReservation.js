const url = "http://localhost:8080/api/reservations/";
import { encode } from "../../../utils.js";

let router;


export function initDeleteReservation(navigoRouter) {
    document.getElementById("deleteReservation").onclick = fetchReservationData;
    router = navigoRouter
}

async function fetchReservationData() {
    document.getElementById("error").innerText = "";
    const id = document.getElementById("if1").value;
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id";
        return;
    }
    try {
        const reservation = await fetch(url + id).then((res) => res.json());
        if (!reservation) {
            document.getElementById("error").innerText = "Could not find reservation with this id: " + id;
        }
        else{
            deleteReservation(id)
        }

    } catch (err) {
        console.log("UPS " + err.message);
    }
}

async function deleteReservation(reservationId) {
    console.log("Url is: " + url + reservationId)
    await fetch(url + reservationId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: "",
    })
        .then((res) => res.json())

    await router.navigate('all-reservation');

}