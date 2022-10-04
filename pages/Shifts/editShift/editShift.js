import { URL_SHIFTS } from "../shiftSettings.js";
let router;


async function findShiftToEdit() {
    const shiftId = document.getElementById("shiftToEdit").value;
    await fetch(URL_SHIFTS + shiftId).then(response => {
        return response.json();
    }).then(shifts => {
    
            document.getElementById("editStartTimeInput").value = shifts.startTime;
            document.getElementById("editEndTimeInput").value = shifts.endTime;
            document.getElementById("editEmployeeIdInput").value = shifts.employeeId;
    })
}

async function editShift() {
    const shiftId = document.getElementById("shiftToEdit").value;

    const shiftInfo = {
        id: shiftId,
        startTime: document.getElementById("editStartTimeInput").value,
        endTime: document.getElementById("editEndTimeInput").value,
        employeeId: document.getElementById("editEmployeeIdInput").value
    }

    const opts = {}
    opts.method = "PUT";
    opts.headers = { "Content-type": "application/json" }
    opts.body = JSON.stringify(shiftInfo)

    await fetch(URL_SHIFTS + shiftId, opts)
    alert("Shift edited");
}

export function initEditShift(navigoRouter) {
    document.getElementById("findShiftToEdit").onclick = findShiftToEdit;
    document.getElementById("editShiftbtn").onclick = editShift;

    router = navigoRouter;
}
