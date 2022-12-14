import {URL_RESERVATIONS} from "../../../settings.js";
import { encode } from "../../../utils.js";
import { checkSessionBoth } from "../../../pages/login/loginSettings.js";

let reservations = [];
let router;

export function initGetAllReservations(navigoRouter) {
    checkSessionBoth();
    document.getElementById("btn-get-all").onclick = getAllReservations;
    getAllReservations();
    router = navigoRouter;
    document.getElementById("table").onclick = (element) =>{
        let id = element.target.id
        editOrDelete(id)
    }
}


async function editOrDelete(id){
    if(id.endsWith("-delete")){
        if (confirm('Are you sure you want to delete this reservation?')) {
            id = id.substring(0, id.indexOf('-'));
            deleteReservation(id)
        }
    }
    else if(id.endsWith("-edit")){
        id = id.substring(0, id.indexOf('-'));
        console.log("id is: " + id)
        console.log(router)
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


export async function getAllReservations() {
    try{
        const reservationsFromServer = await fetch(URL_RESERVATIONS).then(res => res.json());
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
            <td><button id="${reservation.id}-edit" >Edit</button></td>
            <td><button id="${reservation.id}-delete">Delete</button></td>
        `
    );
    const tableRowsString = tableRowsArray.join("\n");
    document.getElementById("tbody-all").innerHTML = tableRowsString;
}

