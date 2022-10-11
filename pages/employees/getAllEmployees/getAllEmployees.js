const url = "http://localhost:8080/api/employees/";

import { checkSession1 } from "../../login/loginSettings.js";

let employees = [];
let router;

export async function initGetAllEmployees(match, navigoRouter) {
  checkSession1();
  document.getElementById("btn-get-all").onclick = getAllEmployees;
  document.getElementById("singleEmployee").onclick = fetchEmployeeData;
  document.getElementById("tbody-all").onclick = showEmployeeDetails;
  document.getElementById("editEmployee").onclick = toEditEmployee;
  document.getElementById("deleteEmployee").onclick = deleteEmployee;
  router = navigoRouter;
  if (match?.params?.id) {
    const id = match.params.id;
    try {
      getAllEmployees();
      renderEmployee(id);
    } catch (error) {
      document.getElementById("error").innerHTML =
        "Could not find Employee: " + id;
    }
  }
}

export async function getAllEmployees() {
  try {
    const employeesFromServer = await fetch(url).then((res) => res.json());

    showAllEmployees(employeesFromServer);

    employees = employeesFromServer;
  } catch (err) {
    console.log(err);
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
    renderEmployee(id);
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

async function renderEmployee(id) {
  const employee = await fetch(url + id).then((res) => res.json());
  if (!employee) {
    document.getElementById("error").innerText =
      "Could not find Employee: " + id;
    return;
  }
  try {

    const card = document.getElementById("tbody-all");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${employee.id}</td>
    <td>${employee.name}</td>
      <td>${employee.userName}</td>
    <td>${employee.type}</td>
    <td>
     <button id="${employee.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button> 
    </td>
    `;

    card.appendChild(tr);
    
    const employeeId = document.getElementById("text-for-id").value;
    if (employeeId) {
      const card = document.getElementById("tbody-all");
      card.innerHTML = "";
      const tr = document.createElement("tr");
      tr.innerHTML = `
     <td>${employee.id}</td>
    <td>${employee.name}</td>
      <td>${employee.userName}</td>
    <td>${employee.type}</td>
    <td>
     <button id="${employee.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button> 
    </td>
    `;
      card.appendChild(tr);
    }
  } catch (err) {
    console.log("UPS " + err.message);
  }
}

function showAllEmployees(data) {
  const inputText = document.getElementById("text-for-id");
  if (inputText.value != "") {
    inputText.value = "";
  }
  const card = document.getElementById("tbody-all");
  card.innerHTML = "";
  data.forEach((employee) => {
    renderEmployee(employee.id);

  });
}

async function showEmployeeDetails(evt) {
  const target = evt.target;
  if (!target.id.includes("-column-id")) {
    return;
  }
  const id = target.id.replace("-column-id", "");
  if (target.classList.contains("other-page")) {
    router.navigate("allEmployees?id=" + id);
  } else {
    document.getElementById("exampleModalLabel").innerText =
      "Details for Employee: " + id;
    const employee = await fetch(url + id).then((res) => res.json());
    document.getElementById("id").innerText = employee.id;
    document.getElementById("name").innerText = "Name: " + employee.name;
    document.getElementById("username").innerText =
      "UserName: " + employee.userName;
    document.getElementById("type").innerText = "Type: " + employee.type;
   
  }
}

function toEditEmployee() {
  const id = document.getElementById("id").innerText;
  router.navigate("editEmployee?id=" + id);
}

async function deleteEmployee(id) {
  id = document.getElementById("id").innerText;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url + id, options);
    const json = await response.json();
    console.log("Deleted employee with id: " + id);
    console.log(json);
    updateTable(id);
  } catch (error) {
    console.log(error);
  }
}

async function updateTable(id) {
  const tbody = document.getElementById("tbody-all");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    
    <td ></td>
    <td  id=deleteMe>Deleted Employee: ${id}</td>
    <td ></td>
  
    `;

  tbody.appendChild(tr);
  tr.classList.add("deleteRow");
  setTimeout(() => {
    tbody.removeChild(tbody.lastChild);
  }, 3000);

  tbody.removeChild(document.getElementById(id + "-column-id").parentElement);
}