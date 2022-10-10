export function checkSession1() {

    if (localStorage.getItem("user1") !== null) {
        document.getElementById("movieAdminNav").style.display = "inline-block";
        document.getElementById("screeningsAdminNav").style.display = "inline-block";
        document.getElementById("reservationsBothNav").style.display = "inline-block";

        document.getElementById("ShiftAdminNavDrop").style.display = "inline-block";
        document.getElementById("ShiftBothNav").style.display = "inline-block";
        document.getElementById("adminDropDownNav").style.display = "inline-block";



        const boxes = document.querySelectorAll('.sessionCheck1');
        boxes.forEach(box => {
            box.style.display = "block";
        });
        const boxes2 = document.querySelectorAll('.sessionCheck2');
        boxes2.forEach(box2 => {
            box2.style.display = "none";

        });
    } else if (localStorage.getItem("user1") === null) {
        document.getElementById("movieAdminNav").style.display = "none";
        document.getElementById("screeningsAdminNav").style.display = "none";
        document.getElementById("ShiftAdminNavDrop").style.display = "none";
        document.getElementById("adminDropDownNav").style.display = "none";
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
    if (localStorage.getItem("user2") !== null) {
        document.getElementById("reservationsBothNav").style.display = "inline-block";
        document.getElementById("ShiftAdminNavDrop").style.display = "inline-block";
        document.getElementById("ShiftBothNav").style.display = "inline-block";
        const boxes = document.querySelectorAll('.sessionCheck2');
        boxes.forEach(box => {
            box.style.display = "inline-block";
        });

        const boxes2 = document.querySelectorAll('.sessionCheck1');
        boxes2.forEach(box2 => {
            box2.style.display = "none";
        });

    } else if (localStorage.getItem("user2") === null) {

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

export function checkSessionBoth() {
    if (localStorage.getItem("user2") !== null || localStorage.getItem("user1") !== null) {
        const boxes = document.querySelectorAll('.sessionCheck3');
        boxes.forEach(box => {
            box.style.display = "block";
        });
    }
    else if (localStorage.getItem("user2") === null || localStorage.getItem("user1") === null) {
        document.getElementById("reservationsBothNav").style.display = "none";
        const boxes = document.querySelectorAll('.sessionCheck3');
        boxes.forEach(box => {
            box.style.display = "none";
        });
    } else if (localStorage.getItem("user2") !== null && localStorage.getItem("user1") == null) {

        const boxes = document.querySelectorAll('.sessionCheck2');
        boxes.forEach(box => {
            box.style.display = "inline-block";
        });

        const boxes2 = document.querySelectorAll('.sessionCheck1');
        boxes2.forEach(box2 => {
            box2.style.display = "none";
        });
    } else if (localStorage.getItem("user1") !== null && localStorage.getItem("user2") == null) {

        const boxes = document.querySelectorAll('.sessionCheck1');
        boxes.forEach(box => {
            box.style.display = "inline-block";
        });
        const boxes2 = document.querySelectorAll('.sessionCheck2');
        boxes2.forEach(box2 => {
            box2.style.display = "none";

        });
    }
}

export function removeSession() {
    if (localStorage.getItem("user1") != null) {
        localStorage.removeItem("user1");
    } else if (localStorage.getItem("user2") != null) {
        localStorage.removeItem("user2");
    }
}

export function startSession(type, userObj) {
    if (localStorage.getItem("user" + type) == null) {
        localStorage.setItem("user" + type, userObj);
    }
}

export function changeLoginText() {
    checkSession1();
    checkSession2();
    checkSessionBoth();
    if (localStorage.getItem("user1") != null || localStorage.getItem("user2") != null) {
        document.getElementById("loginNav1").innerText = "Logout";
    } else if (localStorage.getItem("user1") == null || localStorage.getItem("user2") == null) {
        document.getElementById("loginNav1").innerText = "Login";
    }
}

export function logOut() {
    document.getElementById("loginNav1").onclick = function () {
        removeSession();
        changeLoginText();
    }
}
export function CheckEditDeleteBtnShift() {
    if (localStorage.getItem("user1") != null) {
        document.getElementById("adminTable").style.display = "inline-block";
        document.getElementById("EmployeeTable").style.display = "none";


    } else if (localStorage.getItem("user1") == null) {
        document.getElementById("adminTable").style.display = "none";
        document.getElementById("EmployeeTable").style.display = "inline-block";



    }

}

export function checkFindScreeningAdmin() {
    if (localStorage.getItem("user1") !== null) {
        document.getElementById("adminInputScreening").style.display = "inline";
    } else if (localStorage.getItem("user1") === null) {
        document.getElementById("adminInputScreening").style.display = "none";
    }
}

export function getUserId() {
    if (localStorage.getItem("user1") !== null && localStorage.getItem("user2") === null) {
        const user1 = JSON.stringify(localStorage.getItem("user1"));
        const user1Id = user1.split(",")[0].split(":")[1];
        console.log("Userobject id -> " + user1Id);
        return user1Id;
    } else if (localStorage.getItem("user2") !== null && localStorage.getItem("user1") === null) {
        const user2 = JSON.stringify(localStorage.getItem("user2"));
        const user2Id = user2.split(",")[0].split(":")[1];
        console.log("Userobject id -> " + user2Id);
        return user2Id;
    }

}





// Language: javascript