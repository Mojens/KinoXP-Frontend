export function checkSession() {
    console.log(sessionStorage.getItem("user"));
    if (sessionStorage.getItem("user") !== null) {
        const boxes = document.querySelectorAll('.sessionCheck');
        boxes.forEach(box => {
           box.style.display = "inline-block";
        });

    } else if (sessionStorage.getItem("user") === null) {

        const boxes = document.querySelectorAll('.sessionCheck');
        boxes.forEach(box => {
           box.style.display = "none";
        });
    
    }
}

export function removeSession() {
    sessionStorage.removeItem("user");
}

export function startSession() {
    sessionStorage.setItem("user", "true");
}