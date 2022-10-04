const url="http://localhost:8080/api/employees"

let router;

export async function initGetAllEmployees(navigoRouter){
    document.getElementById("btn-get-all").onclick = getAllEmployees;

    getAllEmployees();
    router=navigoRouter
}

export async function getAllEmployees(){
    try{
        const employeesFromServer = await fetch(url).then(res => res.json())
        showAllEmployees(employeesFromServer)
    } catch (err){
        console.log(err)
    }
}

function showAllEmployees(data){
    document.getElementById("tbody-all").innerHTML = data.map(
        employee =>
            `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.userName}</td>
                <td>${employee.type}</td> 
            </tr>           
            `
    ).join("");
}