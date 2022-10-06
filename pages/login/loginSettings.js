export function checkSession(type) {
    if (sessionStorage.getItem("user"+type) !== null) {
        const boxes = document.querySelectorAll('.sessionCheck');
        boxes.forEach(box => {
           box.style.display = "inline-block";
        });
    } else if (sessionStorage.getItem("user"+type) === null) {
        const boxes = document.querySelectorAll('.sessionCheck');
        boxes.forEach(box => {
           box.style.display = "none";
        });
    
    }
}

export function removeSession(type) {
    if(sessionStorage.getItem("user"+type) != null){
        sessionStorage.removeItem("user"+type);
    }
}

export function startSession(type) {
    if(sessionStorage.getItem("user"+type) == null){
        sessionStorage.setItem("user"+type,"User Type:"+type+", is logged in");
}
}