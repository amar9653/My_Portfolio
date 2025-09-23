/**
 * Portfolio Website JavaScript
 * 
 * Interactive features including:
 * - Mobile navigation
 * - Dark mode toggle
 * - Smooth scrolling
 * - Form validation
 * - Animations and effects
 */

// ==================== GLOBAL VARIABLES ====================

let currentTheme = localStorage.getItem('theme') || 'light';
let isMenuOpen = false;

// ==================== DOM ELEMENTS ====================

const elements = {
    // Navigation
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Theme toggle
    themeToggle: document.getElementById('theme-toggle'),
    
    // Forms
    contactForm: document.getElementById('contactForm'),
    
    // Flash messages
    flashMessages: document.querySelectorAll('.flash-message'),
    
    // Scroll elements
    scrollIndicator: document.querySelector('.scroll-indicator')
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeFlashMessages();
    initializeLazyLoading();
    
    console.log('Portfolio website initialized successfully!');
});

// ==================== THEME MANAGEMENT ====================

function initializeTheme() {
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update theme toggle icon
    updateThemeToggleIcon();
    
    // Add theme toggle event listener
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggleIcon();
    
    // Add smooth transition effect
    document.documentElement.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
}

function updateThemeToggleIcon() {
    if (elements.themeToggle) {
        const icon = elements.themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// ==================== NAVIGATION ====================

function initializeNavigation() {
    // Mobile menu toggle
    if (elements.navToggle && elements.navMenu) {
        elements.navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.navbar')) {
            toggleMobileMenu();
        }
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (elements.navMenu && elements.navToggle) {
        elements.navMenu.classList.toggle('active');
        elements.navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            elements.navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(15, 23, 42, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
}

// ==================== SCROLL EFFECTS ====================

function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator click
    if (elements.scrollIndicator) {
        elements.scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Back to top functionality
    createBackToTopButton();
}

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    const styles = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Add button to body
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== ANIMATIONS ====================

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.card, .stat-card, .project-card, .skill-card, .experience-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyles = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
    
    // Typing animation for hero text
    initializeTypingAnimation();
}

function initializeTypingAnimation() {
    const typingElement = document.querySelector('.hero-title .highlight');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                typingElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// ==================== FLASH MESSAGES ====================

function initializeFlashMessages() {
    elements.flashMessages.forEach(message => {
        const closeBtn = message.querySelector('.flash-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                message.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    message.remove();
                }, 300);
            });
        }
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    message.remove();
                }, 300);
            }
        }, 5000);
    });
    
    // Add slide out animation
    const flashStyles = `
        @keyframes slideOutRight {
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = flashStyles;
    document.head.appendChild(styleSheet);
}

// ==================== LAZY LOADING ====================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==================== FORM HANDLING ====================

// Enhanced form validation (used in contact.html)
function validateEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(form) {
    const fields = form.querySelectorAll('[required]');
    let isValid = true;
    
    fields.forEach(field => {
        const value = field.value.trim();
        const fieldName = field.name;
        let errorMessage = '';
        
        // Clear previous errors
        field.classList.remove('error');
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) errorElement.textContent = '';
        
        // Validate based on field type
        if (!value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        } else if (fieldName === 'name' && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters';
            isValid = false;
        } else if (fieldName === 'message' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (errorMessage) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
        }
    });
    
    return isValid;
}

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Get current year for copyright
function getCurrentYear() {
    return new Date().getFullYear();
}

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', getCurrentYear());
        }
    });
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================

// Optimize scroll events with throttling
window.addEventListener('scroll', throttle(function() {
    updateActiveNavLink();
    handleHeaderScroll();
}, 100));

// Preload critical images
function preloadImages() {
    const criticalImages = [
        '/static/images/placeholder.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// ==================== ERROR HANDLING ====================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // You could send error reports to your analytics service here
    // For development, we'll just log it
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
    
    // Enter key activates buttons
    if (e.key === 'Enter' && e.target.matches('button:not([type="submit"])')) {
        e.target.click();
    }
});

// Focus management for mobile menu
function manageFocus() {
    if (isMenuOpen) {
        const firstFocusableElement = elements.navMenu.querySelector('a');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    } else {
        elements.navToggle.focus();
    }
}

// ==================== ANALYTICS & TRACKING ====================

// Track user interactions (placeholder for analytics integration)
function trackEvent(category, action, label) {
    // Example: Google Analytics 4
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
    
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    }
});

// ==================== EXPORT FOR TESTING ====================

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validateForm,
        debounce,
        throttle,
        toggleTheme,
        toggleMobileMenu
    };
}
