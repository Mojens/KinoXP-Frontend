import { URL_SHIFTS } from "../shiftSettings.js";
let router;


async function getAllShifts() {
    const allShifts = await fetch(URL_SHIFTS).then(r => r.json());
    const rows = allShifts.map(shift =>
        `<tr>
        <td>${shift.id}</td>
        <td>${shift.startTime}</td>
        <td>${shift.endTime}</td>
        <td>${shift.employeeId}</td>
        <td><button id="${shift.id}-deletebtn">Delete Shift</button></td>
        </tr>`);
    document.getElementById("tbl-body-Shifts").innerHTML = rows;
}

async function deleteShift(id){
    let opts = {
        method: "DELETE"
    }
    await fetch(URL_SHIFTS+id, opts);
}



export function initAllShifts(navigoRouter) {
    const onClick = (event) => {
        if (event.target.nodeName === 'BUTTON') {
          let id = event.target.id;
          if(id.endsWith("-deletebtn")){
          id = id.split("-")[0];
          console.log(id);
            deleteShift(id);
        }else
        console.log(id);
        }
      }
      window.addEventListener('click', onClick);
    getAllShifts()
    router = navigoRouter
}