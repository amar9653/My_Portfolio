document.addEventListener('DOMContentLoaded', () => {
    // -----------------
    // General/Global
    // -----------------

    // Theme switching
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            updateThemeIcon(savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
                updateThemeIcon('light-mode');
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                updateThemeIcon('dark-mode');
            }
        });

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark-mode') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // -----------------
    // Projects Page
    // -----------------
    const projectsPage = document.querySelector('.projects-page');
    if (projectsPage) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // Filter project cards
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // -----------------
    // Contact Page
    // -----------------
    const contactPage = document.querySelector('.contact-page');
    if (contactPage) {
        const form = contactPage.querySelector('form');
        form.addEventListener('submit', (e) => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Simple validation
            if (name.value.trim() === '') {
                isValid = false;
                alert('Please enter your name.');
                name.focus();
            } else if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                isValid = false;
                alert('Please enter a valid email address.');
                email.focus();
            } else if (message.value.trim() === '') {
                isValid = false;
                alert('Please enter a message.');
                message.focus();
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});