const url = "http://localhost:8080/api/reservations/";
import { encode } from "../../../utils.js";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

let router;
let reservations = [];

export function initEditReservation(match, navigoRouter) {
    checkSessionBoth();
    document.getElementById("findEdit").onclick = fetchReservationData;
    const submitEdit = document.getElementById("submitEdit");
    const getEdit = document.getElementById("text-for-id");
    router = navigoRouter;
    submitEdit.addEventListener("click", (e) => {
        e.preventDefault();
        editReservation(getEdit.value);
    });
    if (match?.params?.id) {
        const id = match.params.id;

        try {
            findReservation(id);
        } catch (error) {
            document.getElementById("error").innerHTML = "Could not find Reservation with ID: " + id;
        }
    }
}

/// Fetch Reservation Data
async function fetchReservationData() {
    document.getElementById("error").innerText = "";
    const id = document.getElementById("text-for-id").value;
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id";
        return;
    }
    try {
        findReservation(id);
    } catch (err) {
        console.log("UPS " + err.message);
    }
}

/// Placeholder text for a specific Movie for editing
function createPlaceholderText(reservation) {
    document.getElementById("if1").value = reservation.email;
    document.getElementById("if2").value = reservation.phoneNumber;
    document.getElementById("if3").value = reservation.employeeId;

}

/// Find Reservation for editing
async function findReservation(id) {
    const reservation = await fetch(url + id).then((res) => res.json());
    if (!reservation) {
        document.getElementById("error").innerText = "Could not find Reservation with ID: " + id;
        return;
    }
    try {
        document.getElementById("id").innerText = reservation.id;
        document.getElementById("safety-id").innerText = reservation.safetyId;
        document.getElementById("screening-id").innerText = reservation.screeningId;

        createPlaceholderText(reservation);
    } catch (err) {
        console.log("UPS " + err.message);
    }
}

/// Edit Movie
async function editReservation(id) {
    const email = document.getElementById("if1").value;
    const phoneNumber = document.getElementById("if2").value;
    const employeeId = document.getElementById("if3").value;

    const updatedReservation = {
        email: email,
        phoneNumber: phoneNumber,
        employeeId: employeeId
    };

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReservation),
    };

    // navigate to single-car page after submit

    const response = await fetch(url + id, options);
    const data = await response.json();
    let sucess = (document.getElementById("edited").innerText = "Reservation edited");
    // reload page after submit
    setTimeout(function () {
        location.reload();
    }, 1000);
    console.log(data);
}
