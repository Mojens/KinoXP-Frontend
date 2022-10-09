import { URL_SHIFTS } from "../shiftSettings.js";
import { CheckEditDeleteBtnShift } from "../../login/loginSettings.js";
import { checkSessionBoth } from "../../login/loginSettings.js";

let router;

async function getEmployeeNameById(id) {
    const employee = await fetch("http://localhost:8080/api/employees/" + id).then(r => r.json())
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
                <td>${shift.startTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                <td>${shift.endTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                <td><button id="${shift.id}-edit-btn">Edit</button></td>
                <td><button id="${shift.id}-delete-btn">Delete</button></td>
                `
            })
        document.getElementById("tbl-body-Shifts").appendChild(tr)

        const tr1 = document.createElement("tr")
        getEmployeeNameById(shift.employeeId)
            .then(employeeName => {
                tr1.innerHTML = `
                <td>${employeeName}</td>
                <td>${shift.startTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                <td>${shift.endTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                `
            })
        document.getElementById("tbl-body-Shifts-Employee").appendChild(tr1)

    })
}

async function getAllShiftsByDate() {
    document.getElementById("tbl-body-Shifts").innerHTML = ""
    document.getElementById("tbl-body-Shifts-Employee").innerHTML = ""
    let requestedDate = document.getElementById("date-to-find").value
    document.getElementById("chosendateshift").innerText = ""
    document.getElementById("chosendateshift").innerText = requestedDate.split("-").reverse().join("-")

    const allShifts = await fetch(URL_SHIFTS)
        .then(r => r.json())
        .then(data => data.filter(shift => shift.startTime.split(" ")[0] === requestedDate))

    allShifts.forEach(shift => {
        const tr = document.createElement("tr")
        getEmployeeNameById(shift.employeeId)
            .then(employeeName => {
                tr.innerHTML = `
                <td>${employeeName}</td>
                <td>${shift.startTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                <td>${shift.endTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                <td><button id="${shift.id}-edit-btn">Edit</button></td>
                <td><button id="${shift.id}-delete-btn">Delete</button></td>
                `
            })
            
        document.getElementById("tbl-body-Shifts").appendChild(tr)
    })
    allShifts.forEach(shift => {
        const tr2 = document.createElement("tr")
        getEmployeeNameById(shift.employeeId)
            .then(employeeName => {
                tr2.innerHTML = `
                <td>${employeeName}</td>
                <td>${shift.startTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                <td>${shift.endTime.split(" ")[1].split(":").slice(0, 2).join(":")}</td>
                `
            })
            
        document.getElementById("tbl-body-Shifts-Employee").appendChild(tr2)
    })
}

async function deleteShift(id) {
    let opts = {
        method: "DELETE"
    }
    await fetch(URL_SHIFTS + id, opts);
    location.reload();
}

function toEditShift(id) {
    router.navigate("editShift?id=" + id);
}


export function initAllShifts(navigoRouter) {
    checkSessionBoth();
    const onClick = (event) => {
        if (event.target.nodeName === 'BUTTON') {
            let id = event.target.id;
            if (id.endsWith("-delete-btn")) {
                id = id.split("-")[0];
                console.log(id);
                deleteShift(id);
            } else if (id.endsWith("-edit-btn")) {
                id = id.split("-")[0];
                toEditShift(id);
            }


        }
    }
    window.addEventListener('click', onClick);
    getAllShifts()
    CheckEditDeleteBtnShift();
    document.getElementById("btn-find-shifts-by-date").onclick = getAllShiftsByDate
    CheckEditDeleteBtnShift();
    router = navigoRouter
}