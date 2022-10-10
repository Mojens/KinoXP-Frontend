const url = "http://localhost:8080/api/reservations/";
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
        let x = element.target.id
        if(x.endsWith("-delete")){
            if (confirm('Are you sure you want to delete this reservation?')) {
                x = x.substring(0, x.indexOf('-'));
                deleteReservation(x)
            }
        }
        else if(x.endsWith("-edit")){
            x = x.substring(0, x.indexOf('-'));
            goToEditReservation(x);
        }
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
    }).then(response => {
        if (response.status>1){
            location.reload();
        }
    })

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
            <td><button id="${reservation.id}-edit">Edit</button></td>
            <td><button id="${reservation.id}-delete">Delete</button></td>
        `
    );
    const tableRowsString = tableRowsArray.join("\n");
    document.getElementById("tbody-all").innerHTML = tableRowsString;
}


function goToEditReservation(id){
    //Her skal der navigeres til edit reservation. Nedenstående virker ikke.
    //router.navigate("edit-reservation?id=" + id);
}