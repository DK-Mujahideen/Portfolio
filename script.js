
/* ========================================
   MOHAMED MUJAHIDEEN AZAD - PORTFOLIO
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ====================================
    // 1. TYPING ANIMATION
    // ====================================

    const typingText = document.getElementById("typingText");

    const roles = [
        "Aspiring Full Stack Developer",
        "Web Developer",
        "IT Student",
        "Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent =
            currentRole.substring(0, charIndex);

        let delay = deleting ? 45 : 85;

        // Pause after completing a role
        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            delay = 1600;
        }

        // Move to the next role
        if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }

    if (typingText) {
        typeEffect();
    }


    // ====================================
    // 2. MOBILE HAMBURGER MENU
    // ====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    // Close mobile menu after clicking a link
    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    // ====================================
    // 3. DARK / LIGHT THEME
    // ====================================

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle.querySelector("i");

    // Load previously saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    function updateThemeIcon() {

        const isLight =
            document.body.classList.contains("light-theme");

        themeIcon.className = isLight
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";

        document.querySelector('meta[name="theme-color"]')
            .setAttribute("content", isLight ? "#f5f7ff" : "#080b16");
    }

    updateThemeIcon();

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const currentTheme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);

        updateThemeIcon();

    });


    // ====================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ====================================

    const revealElements = document.querySelectorAll(".reveal");

    // Show content immediately if observer is unavailable
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // ====================================
    // 5. SCROLL TO TOP BUTTON
    // ====================================

    const scrollTop = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            scrollTop.classList.add("show");
        } else {
            scrollTop.classList.remove("show");
        }

    });

    scrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ====================================
    // 6. ACTIVE NAVIGATION LINK
    // ====================================

    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navigationLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0,
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // ====================================
    // 7. CONTACT FORM
    // ====================================

    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");

    // Replace this with your real email address
    const YOUR_EMAIL = "muja1311@gmail.com";

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic form validation
        if (!name || !email || !message) {

            formNote.textContent =
                "Please complete all the fields.";

            return;
        }

        // Do not accidentally send to a placeholder address
        if (
            YOUR_EMAIL === "muja1311@gmail.com" ||
            !YOUR_EMAIL.includes("@")
        ) {

            formNote.textContent =
                "Please configure your email address in script.js first.";

            return;
        }

        const subject = encodeURIComponent(
            "Portfolio Contact - " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;

        formNote.textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;

    });


    // ====================================
    // 8. AUTOMATIC COPYRIGHT YEAR
    // ====================================

    document.getElementById("year").textContent =
        new Date().getFullYear();


    // ====================================
    // 9. PROJECT PLACEHOLDER LINKS
    // ====================================

    // Prevent placeholder # links from jumping to the top.
    document.querySelectorAll(
        '.project-buttons a[href="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const projectCard = link.closest(".project-card");

            const projectTitle =
                projectCard.querySelector("h3").textContent;

            if (projectCard.querySelector(".coming-tag")) {

                alert("This project is coming soon!");

            } else {

                alert(
                    "Please add the actual GitHub or Live Demo URL for " +
                    projectTitle + "."
                );

            }

        });

    });

});
