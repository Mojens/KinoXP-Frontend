// add active class to parent of dropdown when dropdown is hovered 
   const dropdown = document.getElementsByClassName("dropdown");
   let i;
 
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("mouseover", function () {
        const parent = this.parentElement;
        parent.children[0].classList.add("active-dropdown");
        parent.children[0].classList.add("active");
         
       });
     }
   // remove active class from nav-link when siblings are clicked
    const navLink = document.getElementsByClassName("nav-link");
    let j;

        for (j = 0; j < navLink.length; j++) {
            navLink[j].addEventListener("click", function () {
                const parent = this.parentElement;
                parent.children[0].classList.remove("active-dropdown");
                parent.children[0].classList.remove("active");
            });
        }
      
 
     for (i = 0; i < dropdown.length; i++) {
       dropdown[i].addEventListener("mouseout", function () {
     const parent = this.parentElement;
     
     parent.children[0].classList.remove("active-dropdown");
       });
     }
 
     // add active class to parent of dropdown when dropdown is clicked
     for (i = 0; i < dropdown.length; i++) {
       dropdown[i].addEventListener("click", function () {
         const parent = this.parentElement;
         parent.children[0].classList.toggle("active-dropdown");
       });
     }


// add active class to nav-link when clicked
  


    

 
 