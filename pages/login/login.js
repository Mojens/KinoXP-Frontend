let URL_LOGIN = "http://localhost:8080/api/employees/login";
let router;

export function initLogin() {
    document.getElementById("login_btn").addEventListener("click", login);
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
            if(sessionStorage.getItem("user")!== null){
                sessionStorage.removeItem("user");
            }
            throw new Error("User not found");
        } else if (response.status == 202) {
            sessionStorage.setItem("user", "true");
        } else if (response.status == 400) {
            if(sessionStorage.getItem("user")!== null){
                sessionStorage.removeItem("user");
            }
            throw new Error("Incorrect password");
        }
        
    })
}

