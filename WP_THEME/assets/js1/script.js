// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingWrap = document.getElementById('loadingWrap');
    const body = document.body;
    
    // Remove loading class after page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingWrap.classList.remove('on');
            body.classList.remove('loading');
        }, 1000);
    });
});

// Mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menuPanel = document.getElementById('menuPanel');
    const gNav = document.getElementById('g-nav');
    const overlay = document.querySelector('.overlay');
    
    if (menuButton && menuPanel && gNav) {
        menuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            menuPanel.classList.toggle('active');
            gNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            menuButton.classList.remove('active');
            menuPanel.classList.remove('active');
            gNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fadeIn, .fadeUp, .fadeLeft, .fadeDown');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 