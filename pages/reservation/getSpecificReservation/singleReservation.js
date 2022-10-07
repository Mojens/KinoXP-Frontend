const url = "http://localhost:8080/api/reservations/";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

export async function initGetReservationById(match) {
    checkSessionBoth();
    document.getElementById("singleReservation").onclick = fetchReservationData;
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
    const reservation = await fetch(url + id).then((res) => res.json());
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

    } catch (err) {
        console.log("UPS " + err.message);
    }
}