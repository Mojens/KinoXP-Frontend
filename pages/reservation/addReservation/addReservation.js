import {URL_RESERVATIONS} from "../../../settings.js";
import { encode } from "../../../utils.js";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

let router;
let reservation = [];

export function initAddReservation(navigoRouter) {
    checkSessionBoth();
    document.getElementById("addReservation").onclick = addReservation;
    router = navigoRouter;
}

async function addReservation() {
    const email = document.getElementById("if1").value;
    const phoneNumber = document.getElementById("if2").value;
    const employeeId = document.getElementById("if3").value;
    const screeningId = document.getElementById("if4").value;

    const newReservation = {
        email,
        phoneNumber,
        employeeId,
        screeningId
    };

    const id = await fetch(URL_RESERVATIONS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
    })
        .then((res) => res.json())
        .then((data) => data.id);
    router.navigate(`single-reservation?id=${id}`);
}