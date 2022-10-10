let URL_LOGIN = "http://localhost:8080/api/employees/login";
let router;

import { startSession } from "./loginSettings.js";
import { removeSession } from "./loginSettings.js";
import { changeLoginText } from "./loginSettings.js";

export function initLogin(navigo) {
    let button = document.getElementById("login_btn");
    button.onclick = login;
    router = navigo;
}

async function login() {
    const loginInfo = {
        userName: document.getElementById("userNameInput").value,
        password: document.getElementById("passwordInput").value
    }
    const opts = {}
    opts.method = "POST"
    opts.headers = { "Content-type": "application/json" }
    opts.body = JSON.stringify(loginInfo)

    await fetch(URL_LOGIN, opts).then(response => {
        if (response.status == 404) {
            removeSession();
            throw new Error("User not found");
        } else if (response.status == 400) {
            removeSession();
            throw new Error("Incorrect password");
        }else
        console.log("Login successful");
            return response.json();
        
    }).then(data => {
        console.log(data);
        if (data.type == 1) {
            startSession(1, JSON.stringify(data));
            changeLoginText();
            console.log("Redirecting now..... Type 1");
            router.navigate(`/`);
        }else if(data.type == 2){
            startSession(2,JSON.stringify(data));
            changeLoginText();
            console.log("Redirecting now..... Type 2");
            router.navigate(`/`);
        }
    })
}


