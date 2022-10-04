let URL_SHIFTS = "http://localhost:8080/api/shifts/";

let router;

async function addShift(){

    const shiftInfo = {
        startTime: document.getElementById("startTimeInput").value,
        endTime: document.getElementById("endTimeInput").value,
        employeeId: document.getElementById("employeeIdInput").value
    }

    const opts = {}
    opts.method = "POST";
    opts.headers = { "Content-type": "application/json" }
    opts.body = JSON.stringify(shiftInfo)

    await fetch(URL_SHIFTS, opts).then(response => {
        if (response.status == 200) {
            alert("Shift added successfully!");
        } else {
            alert("Error adding shift!");
        }
    })
}
export function initAddShift(navigoRouter) {
    document.getElementById("addShiftbtn").onclick = addShift;
    router = navigoRouter
  }

