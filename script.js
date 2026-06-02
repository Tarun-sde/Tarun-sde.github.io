//---------- Navbar ----------//

window.addEventListener('scroll', function(){
    let navbar = document.getElementById("navbar");
    navbar.classList.toggle('fixed', this.window.scrollY > 0)
})

//---------- Portfolio Gallery ----------//

let filterContainer = document.querySelector(".gallery-filter");
let galleryItems = document.querySelectorAll(".gallery-item");

filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")){
        filterContainer.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
        let filterValue = event.target.getAttribute("data-filter");
        galleryItems.forEach((item) => {
            if (item.classList.contains(filterValue) || filterValue === "all") {
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});

//---------- Typed Role Animation ----------//

const typedEl = document.getElementById('typed-role');
const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'DSA Problem Solver',
    'React Developer',
    'SDE Intern @ RD Infro Tech',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 55 : 110;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// Start after page load animation completes
setTimeout(typeEffect, 2800);