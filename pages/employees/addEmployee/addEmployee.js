import {URL_EMPLOYEES} from "../../../settings";
import { checkSession1 } from "../../login/loginSettings.js";
let router;

export function initAddEmployee(navigoRouter) {
    checkSession1();
    document.getElementById("addEmployeeBtn").onclick = addEmployee;
    router = navigoRouter
  }


async function addEmployee() {
    const employeeInfo = {
        name: document.getElementById("employeeNameInput").value,
        userName: document.getElementById("employeeUserNameInput").value,
        password: document.getElementById("employeePasswordInput").value,
        type: document.getElementById("employeeTypeInput").value
    };

    const opts = {}
    opts.method = "POST";
    opts.headers = { "Content-type": "application/json" }
    opts.body = JSON.stringify(employeeInfo)

    await fetch(URL_EMPLOYEES, opts).then(response => {
        if (response.status == 200) {
            alert("Employee added successfully!");
        } else {
            alert("Error adding Employee!");
        }
    })
}

