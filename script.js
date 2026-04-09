document.addEventListener("DOMContentLoaded", () => {
    // --- Scroll Reveal Animations (The Physics) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once revealed so it doesn't animate out and in repeatedly
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" 
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Mobile Drawer Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
    }

    const closeDrawer = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
    };

    if (menuOverlay) menuOverlay.addEventListener('click', closeDrawer);

    navItems.forEach(item => {
        item.addEventListener('click', closeDrawer);
    });

    // --- Form Validation Logic ---
    const form = document.getElementById("contactForm");
    const statusDiv = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", (e) => {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            statusDiv.textContent = "";
            statusDiv.style.color = "var(--text-main)";

            if (!name || !email || !message) {
                e.preventDefault(); 
                statusDiv.textContent = "Please fill out all fields before submitting.";
                statusDiv.style.color = "#ff7e67"; 
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                statusDiv.textContent = "Please enter a valid email address.";
                statusDiv.style.color = "#ff7e67";
                return;
            }
        });
    }
});