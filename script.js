// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
        }
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(220, 38, 38, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#dc2626';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.value-card, .candidate-card, .activity-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add click handlers for activity cards
    const activityButtons = document.querySelectorAll('.activity-card .btn');
    activityButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('¡Gracias por tu interés! Pronto recibirás más información sobre este evento.');
        });
    });
    
    // Add click handler for CTA button
    const ctaButton = document.querySelector('.cta-section .btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('¡Excelente! Te redirigiremos al portal de registro electoral.');
        });
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Social media sharing functions
function shareOnTwitter(text, url) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading class from body after page loads
    document.body.classList.add('loaded');
    
    // Add stagger animation to candidate cards
    const candidateCards = document.querySelectorAll('.candidate-card');
    candidateCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add search functionality (if needed)
function searchCandidates(query) {
    const candidates = document.querySelectorAll('.candidate-card');
    const searchTerm = query.toLowerCase();
    
    candidates.forEach(candidate => {
        const name = candidate.querySelector('h4').textContent.toLowerCase();
        const description = candidate.querySelector('.candidate-description').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            candidate.style.display = 'block';
        } else {
            candidate.style.display = 'none';
        }
    });
}