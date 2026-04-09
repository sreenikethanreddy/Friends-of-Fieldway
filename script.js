document.addEventListener("DOMContentLoaded", () => {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement; 

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        root.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-mode');
        if (root.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Mobile Drawer Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
    }

    // Close Menu Helper Function
    const closeDrawer = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
    };

    // Close when clicking outside the menu (on the overlay)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeDrawer);
    }

    // Close menu when a link is clicked
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