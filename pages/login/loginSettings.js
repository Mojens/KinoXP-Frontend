export function checkSession1() {
    if (sessionStorage.getItem("user1") !== null) {
        const boxes = document.querySelectorAll('.sessionCheck1');
        boxes.forEach(box => {
            box.style.display = "inline-block";
        });
        const boxes2 = document.querySelectorAll('.sessionCheck2');
        boxes2.forEach(box2 => {
            box2.style.display = "none";

        });
    } else if (sessionStorage.getItem("user1") === null) {

        const boxes = document.querySelectorAll('.sessionCheck1');
        boxes.forEach(box => {
            box.style.display = "none";
        });

        const boxes2 = document.querySelectorAll('.sessionCheck2');
        boxes2.forEach(box2 => {
            box2.style.display = "none";

        });
    }
}

export function checkSession2() {
    if (sessionStorage.getItem("user2") !== null) {

        const boxes = document.querySelectorAll('.sessionCheck2');
        boxes.forEach(box => {
            box.style.display = "inline-block";
        });

        const boxes2 = document.querySelectorAll('.sessionCheck1');
        boxes2.forEach(box2 => {
            box2.style.display = "none";
        });

    } else if (sessionStorage.getItem("user2") === null) {

        const boxes = document.querySelectorAll('.sessionCheck2');
        boxes.forEach(box => {
            box.style.display = "none";
        });

        const boxes2 = document.querySelectorAll('.sessionCheck1');
        boxes2.forEach(box2 => {
            box2.style.display = "none";
        });

    }
}

export function removeSession() {
    if (sessionStorage.getItem("user1") != null) {
        sessionStorage.removeItem("user1");
    } else if (sessionStorage.getItem("user2") != null) {
        sessionStorage.removeItem("user2");
    }
}

export function startSession(type) {
    if (sessionStorage.getItem("user" + type) == null) {
        sessionStorage.setItem("user" + type, "User Type:" + type + ", is logged in");
        console.log(sessionStorage.getItem("user" + type));
    }
}

function changeLoginText() {
    if (sessionStorage.getItem("user1") != null || sessionStorage.getItem("user2") != null) {
        document.getElementById("loginNav1").innerText = "Logout";
        console.log("logout")
    } else if (sessionStorage.getItem("user1") == null || sessionStorage.getItem("user2") == null) {
        document.getElementById("loginNav1").innerText = "Login";
        console.log("login")
    }
}

export function logOut() {
    document.getElementById("loginNav1").onclick = function () {
        removeSession()
        changeLoginText();
    }
}