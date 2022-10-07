const url = "http://localhost:8080/api/reservations/";
import { encode } from "../../../utils.js";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

let router;


export function initDeleteReservation(navigoRouter) {
    checkSessionBoth();
    document.getElementById("deleteReservation").onclick = fetchReservationData;
    router = navigoRouter
}
async function deleteReservation(reservationId) {
    console.log("Url is: " + url + reservationId)
    await fetch(url + reservationId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: "",
    }).then(response => {
        if (response.status>1){
            router.navigate(`all-reservations`);
        }
    })

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