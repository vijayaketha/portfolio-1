/* 
  ========================================
  Main Script
  ========================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // -- Preloader --
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // -- Typing Effect --
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = ['Fresher', 'Software Engineer', 'CS Graduate', 'Web Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before new text
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing effect
        setTimeout(type, 1000);
    }

    // -- Navbar Scroll Effect & Scroll Progress --
    const navbar = document.querySelector('.navbar');
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        // Back to top button
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    // -- Mobile Menu Toggle --
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links li');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // -- Theme Toggle --
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');

        // Use saved theme OR default to dark
        const currentTheme = savedTheme || 'dark';

        // Initial setup
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Subtle rotation animation
            icon.style.transform = icon.style.transform === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)';
        });
    }

    // -- Scroll Reveal Animations --
    const revealElements = document.querySelectorAll('.scroll-reveal');

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check

    // -- Active Navigation Link Handling (Multi-page) --
    const navLinks = document.querySelectorAll('.nav-link');
    const currentFullRoot = window.location.pathname;
    const currentPath = currentFullRoot.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // -- Skills Animation --
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    let showedSkills = false;

    if (skillSection) {
        window.addEventListener('scroll', () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos && !showedSkills) {
                progressBars.forEach(bar => {
                    const percentElement = bar.parentElement.previousElementSibling.querySelector('.percent');
                    if (percentElement) {
                        const value = percentElement.innerText;
                        bar.style.width = value;
                    }
                });
                showedSkills = true;
            }
        });
    }

    // -- Project Filter --
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // -- Vijaya Bot Logic --
    const chatMessages = document.getElementById('chat-messages');
    const chatOptions = document.getElementById('chat-options');
    const typingIndicator = document.getElementById('chat-typing-indicator');
    const botForm = document.getElementById('bot-form');
    const botMessageInput = document.getElementById('bot-message-input');

    if (chatMessages && chatOptions) {
        const responses = {
            "Looking for your portfolio": "You're already here! You can check the 'Projects' section for my latest work.",
            "Just saying hello!": "Hello there! It's great to meet you. Is there anything specific you'd like to know about my journey as a developer?",
            "Interested in hire you": "That's exciting! I'm currently looking for new opportunities. Please reach out to me via LinkedIn or email, and let's discuss how I can contribute!",
            "Contact directly": "You can reach me at vijjuketha1@gmail.com or call me at +91-9490730266. Best time to call is between 10 AM to 6 PM."
        };

        function addMessage(text, sender) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${sender}`;
            bubble.textContent = text;
            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return bubble;
        }

        function showBotResponse(question) {
            // Add user message
            addMessage(question, 'user');

            // Hide options temporarily
            chatOptions.style.opacity = '0.5';
            chatOptions.style.pointerEvents = 'none';

            // Show typing indicator
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const response = responses[question] || "I'm still learning, but I'll make sure Vijaya hears about this! Anything else?";
                typingIndicator.style.display = 'none';
                addMessage(response, 'bot');

                // Show options again
                chatOptions.style.opacity = '1';
                chatOptions.style.pointerEvents = 'auto';

                // Handle hiring interest by submitting the hidden Formspree form if needed
                if (question === "Interested in hire you" || question === "Contact directly") {
                    console.log("Formspree submission triggered for:", question);
                }
            }, 1000);
        }

        const optionButtons = chatOptions.querySelectorAll('.chat-option-btn');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                showBotResponse(question);
            });
        });
    }

    // Original Contact Form (Keeping for other pages if needed)
    const contactForm = document.getElementById('contact-form');

    // -- Copyright Year --
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
});
