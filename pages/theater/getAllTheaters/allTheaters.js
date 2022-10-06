const url = "http://localhost:8080/api/theater";
import { encode } from "../../../utils.js";

let theaters = [];
let router;

export function initGetAllTheaters(navigoRouter) {
    document.getElementById("btn-get-all").onclick = getAllTheaters;

    getAllTheaters();
    router = navigoRouter;
}

export async function getAllTheaters() {
    try{
        const theatersFromServer = await fetch(url).then(res => res.json());
        showAllTheaters(theatersFromServer);
        theaters = theatersFromServer;
    } catch(err) {
        console.log(err);
    }
}

function showAllTheaters(data){
    const tableRowsArray = data.map(
        (theaters) =>
            `
        <tr>
            <td>${theaters.id}</td>
        `
    );
    const tableRowsString = tableRowsArray.join("\n");
    document.getElementById("tbody-all").innerHTML = tableRowsString;
}