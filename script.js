//---------- Navbar ----------//

window.addEventListener('scroll', function(){
    let navbar = document.getElementById("navbar");
    navbar.classList.toggle('fixed', this.window.scrollY > 0)
})

// Portfolio Gallery
let filterContainer = document.querySelector(".gallery-filter");
let galleryItems = document.querySelectorAll(".gallery-item");

if (filterContainer) {
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item")){
            filterContainer.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
            let filterValue = event.target.getAttribute("data-filter");
            galleryItems.forEach((item) => {
                if (item.classList.contains(filterValue) || filterValue === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    });
}


