const url = "http://localhost:8080/api/reservations";
import { encode } from "../../../utils.js";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

let reservations = [];
let router;

export function initGetAllReservations(navigoRouter) {
    checkSessionBoth();
    document.getElementById("btn-get-all").onclick = getAllReservations;

    getAllReservations();
    router = navigoRouter;
}

export async function getAllReservations() {
    try{
        const reservationsFromServer = await fetch(url).then(res => res.json());
        showAllReservations(reservationsFromServer);
        reservations = reservationsFromServer;
    } catch(err) {
        console.log(err);
    }
}

function showAllReservations(data){
    const tableRowsArray = data.map(
        (reservation) =>
            `
        <tr>
            <td>${reservation.id}</td>
            <td>${reservation.email}</td>
            <td>${reservation.phoneNumber}</td>
            <td>${reservation.employeeId}</td>
            <td>${reservation.safetyId}</td>
            <td>${reservation.screeningId}</td>
        `
    );
    const tableRowsString = tableRowsArray.join("\n");
    document.getElementById("tbody-all").innerHTML = tableRowsString;
}