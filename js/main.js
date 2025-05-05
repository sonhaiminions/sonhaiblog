// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
        
        // Reset form
        this.reset();
    });
}

// Initialize sections
document.addEventListener('DOMContentLoaded', function() {
    // Add animate class to all sections except hero
    document.querySelectorAll('section:not(#home)').forEach(section => {
        section.classList.add('animate');
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
});

// Add scroll-based animations with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Không unobserver để có thể animate lại khi scroll lên
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(#home)').forEach(section => {
    observer.observe(section);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Music Player Control
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

// Try to autoplay when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Try to play with user interaction
    document.body.addEventListener('click', function initAudio() {
        bgMusic.muted = false;
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
            isPlaying = true;
        }).catch(error => {
            console.log('Autoplay failed:', error);
        });
        // Remove the event listener after first click
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
});

musicToggle.addEventListener('click', function() {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.muted = false;
        bgMusic.play();
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});