// =====================================================
// TARUN JOSHI PORTFOLIO — script.js
// =====================================================

// ===== Navbar: scroll effect & active links =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    highlightNavLink();
});

function highlightNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// Close hamburger menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const checkbox = document.getElementById('hamburger-check');
        if (checkbox) checkbox.checked = false;
    });
});

// ===== Typed Text Animation =====
const typedEl = document.getElementById('typed-text');
const roles = [
    'Full Stack Developer',
    'Software Engineer',
    'DSA Problem Solver',
    'React Developer',
    'B.Tech Student @ Jain University',
    'Competitive Programmer',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    typingTimeout = setTimeout(typeEffect, speed);
}
typeEffect();

// ===== Progress Bars Animation (IntersectionObserver) =====
const progressLines = document.querySelectorAll('.progress-line');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetWidth = target.style.width;
            target.style.width = '0%';
            setTimeout(() => {
                target.style.width = targetWidth;
            }, 200);
            progressObserver.unobserve(target);
        }
    });
}, { threshold: 0.3 });

progressLines.forEach(bar => {
    progressObserver.observe(bar);
});

// ===== Contact Form (mailto fallback) =====
function handleFormSubmit(event) {
    event.preventDefault();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const mailtoLink =
        `mailto:tarun.sde.code@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailtoLink;

    const successEl = document.getElementById('form-success');
    if (successEl) {
        successEl.style.display = 'flex';
        setTimeout(() => { successEl.style.display = 'none'; }, 5000);
    }
}

// ===== Smooth reveal for stat numbers =====
function animateStats() {
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(el => {
        const finalText = el.textContent;
        const num = parseFloat(finalText);
        if (isNaN(num)) return;
        const suffix = finalText.replace(/[\d.]/g, '');
        let start = 0;
        const duration = 1500;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = (num * eased).toFixed(num % 1 !== 0 ? 1 : 0) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

const heroCard = document.querySelector('.hero-card');
if (heroCard) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    heroObserver.observe(heroCard);
}

// ===== Owl Carousel for reviews (if present) =====
if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsive: {
            0:    { items: 1 },
            600:  { items: 1 },
            1200: { items: 2 },
        }
    });
}

// ===== Console Easter Egg =====
console.log('%c👋 Hi there! I\'m Tarun Joshi.', 'color:#FF3B3B;font-size:18px;font-weight:bold;');
console.log('%cLet\'s connect: https://github.com/Tarun-sde', 'color:#a0a4b0;font-size:13px;');