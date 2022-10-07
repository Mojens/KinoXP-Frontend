import {URL_SHIFTS} from "../shiftSettings.js";

let router;

async function getEmployeeNameById(id){
    const employee = await fetch("http://localhost:8080/api/employees/"+id).then(r => r.json())
    return employee.name
}

async function getAllShifts() {
    const allShifts = await fetch(URL_SHIFTS).then(r => r.json())

    allShifts.forEach(shift => {
        const tr = document.createElement("tr")
        getEmployeeNameById(shift.employeeId)
            .then(employeeName => {
                tr.innerHTML = `
                <td>${employeeName}</td>
                <td>${shift.startTime.split(" ")[1].split(":").slice(0,2).join(":")}</td>
                <td>${shift.endTime.split(" ")[1].split(":").slice(0,2).join(":")}</td>
                <td><button id="${shift.id}-edit-btn">Edit</button></td>
                <td><button id="${shift.id}-delete-btn">Delete</button></td>
                `
            })
        document.getElementById("tbl-body-Shifts").appendChild(tr)
    })
}

async function getAllShiftsByDate() {
    document.getElementById("tbl-body-Shifts").innerHTML=""
    let requestedDate = document.getElementById("date-to-find").value.split("-").reverse().join("-")

    const allShifts = await fetch(URL_SHIFTS)
        .then(r => r.json())
        .then(data => data.filter(shift => shift.startTime.split(" ")[0] === requestedDate))

    allShifts.forEach(shift => {
        const tr = document.createElement("tr")
        getEmployeeNameById(shift.employeeId)
            .then(employeeName => {
                tr.innerHTML = `
                <td>${employeeName}</td>
                <td>${shift.startTime.split(" ")[1].split(":").slice(0,2).join(":")}</td>
                <td>${shift.endTime.split(" ")[1].split(":").slice(0,2).join(":")}</td>
                <td><button id="${shift.id}-edit-btn">Edit</button></td>
                <td><button id="${shift.id}-delete-btn">Delete Shift</button></td>
                `
            })
        document.getElementById("tbl-body-Shifts").appendChild(tr)
    })
}

async function deleteShift(id){
    let opts = {
        method: "DELETE"
    }
    await fetch(URL_SHIFTS+id, opts);
}

function toEditShift(id){
    router.navigate("editShift?id=" + id);
}



export function initAllShifts(navigoRouter) {
    const onClick = (event) => {
        if (event.target.nodeName === 'BUTTON') {
          let id = event.target.id;
          if(id.endsWith("-delete-btn")){
              id = id.split("-")[0];
              console.log(id);
              deleteShift(id);
              location.reload()
          }else if(id.endsWith("-edit-btn")){
              id = id.split("-")[0];
              toEditShift(id);
          }


        }
      }
      window.addEventListener('click', onClick);
    getAllShifts()

    document.getElementById("btn-find-shifts-by-date").onclick = getAllShiftsByDate
    router = navigoRouter
}