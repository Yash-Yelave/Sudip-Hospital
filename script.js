document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Hamburgur animation toggle if needed
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Anchor Links (if browser doesn't support scroll-behavior: smooth in CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-scroll');
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.classList.add('transition-element'); // Add class if needed for CSS transitions
        observer.observe(el);
    });
    
    // Add CSS for the JS animation
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-scroll.animate-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Handle Appointment Button Clicks
    const appointmentButtons = document.querySelectorAll('.js-appointment-btn');
    appointmentButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const targetUrl = 'https://user.cureconnect.fun/user';
            
            try {
                // Try to fetch the URL with no-cors mode to check connectivity
                // If the server is down or unreachable, fetch will throw an error
                await fetch(targetUrl, { mode: 'no-cors' });
                // If fetch succeeds (even with 404/500), we proceed
                window.location.href = targetUrl;
            } catch (error) {
                // Network error (server unreachable)
                alert('appointment is not closed');
            }
        });
    });
});
