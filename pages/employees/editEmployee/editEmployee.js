const url = "http://localhost:8080/api/employees/";
import { encode } from "../../../utils.js";
import { checkSession1 } from "../../login/loginSettings.js";

let router;
let movies = [];

export function initEditEmployee(match, navigoRouter) {
  checkSession1();
  document.getElementById("findEdit").onclick = fetchEmployeeData;
  const submitEdit = document.getElementById("submitEdit");
  const getEdit = document.getElementById("text-for-id");
  router = navigoRouter;
  submitEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    editEmployee(getEdit.value);
  });
  if (match?.params?.id) {
    const id = match.params.id;

    try {
      findEmployee(id);
    } catch (error) {
      document.getElementById("error").innerHTML = "Could not find Employee: " + id;
    }
  }
}

async function fetchEmployeeData() {
  document.getElementById("error").innerText = "";
  const id = document.getElementById("text-for-id").value;
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id";
    return;
  }
  try {
    findEmployee(id);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

function createPlaceholderText(employee) {
  if (window.location.href.includes("id")) {
    document.getElementById("text-for-id").value = employee.id;
  } 
  document.getElementById("if1").value = employee.name;
  document.getElementById("if2").value = employee.userName;
  document.getElementById("if3").value = employee.type;
 

}

async function findEmployee(id) {
  const employee = await fetch(url + id).then((res) => res.json());
  if (!employee) {
    document.getElementById("error").innerText =
      "Could not find Employee: " + id;
    return;
  }
  try {
    document.getElementById("id").innerText = employee.id;

    createPlaceholderText(employee);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

async function editEmployee(id) {
  const name = document.getElementById("if1").value;
  const userName = document.getElementById("if2").value;
  const type = document.getElementById("if3").value;
  const password = document.getElementById("if4").value;

  const updatedEmployee = {
    id: id,
    name,
    password,
    userName,
    type,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  };

  // navigate to single-car page after submit

  const response = await fetch(url + id, options);
  const data = await response.json();
  let sucess = (document.getElementById("edited").innerText = "Employee edited");
  // reload page after submit
  setTimeout(function () {
    location.reload();
    alert(sucess ? "Success!" : "Error)");
  }, 1000);
  console.log(data);
}