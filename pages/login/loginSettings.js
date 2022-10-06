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
    if(sessionStorage.getItem("user")!== null){
        sessionStorage.removeItem("user");
    }
}

export function startSession() {
    if(sessionStorage.getItem("user") == null){
        sessionStorage.setItem("user", "true");
    }
}