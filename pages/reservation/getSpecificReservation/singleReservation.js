import {URL_RESERVATIONS} from "../../../settings.js";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

let router;
export async function initGetReservationById(match, navigoRouter) {
    checkSessionBoth();
    document.getElementById("singleReservation").onclick = fetchReservationData;
    document.getElementById("table").onclick = (element) =>{
        let id = element.target.id
        editOrDelete(id)
    }
    router = navigoRouter;

    if (match?.params?.id) {
        const id = match.params.id;
        try {
            renderReservation(id);
        } catch (error) {
            document.getElementById("error").innerHTML = "Could not find Reservation: " + id;
        }
    }
}

async function fetchReservationData() {
    document.getElementById("error").innerText = "";
    const id = document.getElementById("text-for-id").value;
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id";
        return;
    }
    try {
        renderReservation(id);
    } catch (err) {
        console.log("UPS " + err.message);
    }
}

async function renderReservation(id) {
    const reservation = await fetch(URL_RESERVATIONS + id).then((res) => res.json());
    if (!reservation) {
        document.getElementById("error").innerText = "Could not find reservation with this id: " + id;
        return;
    }
    try {
        document.getElementById("id").innerText = reservation.id;
        document.getElementById("email").innerText = reservation.email;
        document.getElementById("phone-number").innerText = reservation.phoneNumber;
        document.getElementById("employee-id").innerText = reservation.employeeId;
        document.getElementById("safety-id").innerText = reservation.safetyId;
        document.getElementById("screening-id").innerText = reservation.screeningId;
        document.getElementById("edit").innerHTML = `<button id="${reservation.id}-edit">Edit</button>`;
        document.getElementById("delete").innerHTML = `<button id="${reservation.id}-delete">Delete</button>`;

    } catch (err) {
        console.log("UPS " + err.message);
    }
}

function editOrDelete(id){
    if(id.endsWith("-delete")){
        if (confirm('Are you sure you want to delete this reservation?')) {
            id = id.substring(0, id.indexOf('-'));
            deleteReservation(id)
        }
    }
    else if(id.endsWith("-edit")){
        id = id.substring(0, id.indexOf('-'));
        router.navigate(`edit-reservation?id=${id}`);
    }
}

async function deleteReservation(reservationId) {
    console.log("Url is: " + URL_RESERVATIONS + reservationId)
    await fetch(URL_RESERVATIONS + reservationId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: "",
    }).then(response => {
        if (response.status>1){
            location.reload();
        }
    })

}