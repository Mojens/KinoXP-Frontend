export function checkSession1() {

    if (sessionStorage.getItem("user1") !== null) {
        document.getElementById("movieAdminNav").style.display = "inline-block";
        document.getElementById("screeningsAdminNav").style.display = "inline-block";
        document.getElementById("theatersAdminNav").style.display = "inline-block";
        document.getElementById("reservationsBothNav").style.display = "inline-block";
        const boxes = document.querySelectorAll('.sessionCheck1');
        boxes.forEach(box => {
            box.style.display = "inline-block";
        });
        const boxes2 = document.querySelectorAll('.sessionCheck2');
        boxes2.forEach(box2 => {
            box2.style.display = "none";

        });
    } else if (sessionStorage.getItem("user1") === null) {
        document.getElementById("movieAdminNav").style.display = "none";
        document.getElementById("screeningsAdminNav").style.display = "none";
        document.getElementById("theatersAdminNav").style.display = "none";
        document.getElementById("reservationsBothNav").style.display = "none";
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

export function changeLoginText() {
    checkSession1();
    checkSession2();
    if (sessionStorage.getItem("user1") != null || sessionStorage.getItem("user2") != null) {
        document.getElementById("loginNav1").innerText = "Logout";
    } else if (sessionStorage.getItem("user1") == null || sessionStorage.getItem("user2") == null) {
        document.getElementById("loginNav1").innerText = "Login";
    }
}

export function logOut() {
    document.getElementById("loginNav1").onclick = function () {
        removeSession();
        changeLoginText();
    }
}