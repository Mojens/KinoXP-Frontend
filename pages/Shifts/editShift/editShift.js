import { URL_SHIFTS } from "../shiftSettings.js";
import { checkSession1 } from "../../login/loginSettings.js";
let router;

async function findShiftToEdit(id) {
  if (id == null) {
    id = document.getElementById("shiftToEdit").value;
    console.log(id);
  }
  await fetch(URL_SHIFTS + id)
    .then((response) => {
      return response.json();
    })
    .then((shifts) => {
      document.getElementById("shiftToEdit").value = shifts.id;
      document.getElementById("editStartTimeInput").value = shifts.startTime;
      document.getElementById("editEndTimeInput").value = shifts.endTime;
      document.getElementById("editEmployeeIdInput").value = shifts.employeeId;
    });
}

async function findShiftToEditWithoutId() {
  const id = document.getElementById("shiftToEdit").value;

  await fetch(URL_SHIFTS + id)
    .then((response) => {
      return response.json();
    })
    .then((shifts) => {
      document.getElementById("shiftToEdit").value = shifts.id;
      document.getElementById("editStartTimeInput").value = shifts.startTime;
      document.getElementById("editEndTimeInput").value = shifts.endTime;
      document.getElementById("editEmployeeIdInput").value = shifts.employeeId;
    });
}

async function editShift() {
  const shiftId = document.getElementById("shiftToEdit").value;
  const startTime = document.getElementById("editStartTimeInput").value;
  const endTime = document.getElementById("editEndTimeInput").value;
  const employeeId = document.getElementById("editEmployeeIdInput").value;

  const shiftInfo = {
    id: shiftId,
    startTime,
    endTime,
    employeeId,
  };

  const opts = {};
  opts.method = "PUT";
  opts.headers = { "Content-type": "application/json" };
  (opts.body = JSON.stringify(shiftInfo)),
    await fetch(URL_SHIFTS + shiftId, opts);
  alert("Shift edited");
}

export function initEditShift(match, navigoRouter) {
  checkSession1();
  document.getElementById("findShiftToEdit").onclick = findShiftToEditWithoutId;
  document.getElementById("editShiftbtn").onclick = editShift;

  if (match?.params?.id) {
    const id = match.params.id;

    try {
      findShiftToEdit(id);
    } catch (error) {
      console.log("A shift with ID: " + id + " could not be found");
    }
  }

  router = navigoRouter;
}
