/**
 * Personal Injury Law Firm - Custom Interactive Script (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // Sticky Header Scroll Transition
    // ==========================================================================
    const header = document.getElementById('site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially in case of refreshed page scrolled down

    // ==========================================================================
    // Mobile Hamburger Navigation Menu Toggle
    // ==========================================================================
    const menuToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        const isOpen = navMenu.classList.contains('open');
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isOpen);
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when navigation links are clicked (for mobile anchor navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // FAQ Accordion Interactivity
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');
            
            // Close all other accordion items for clean accordion behavior
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle the clicked item
            if (!isOpen) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ==========================================================================
    // Form Validation & Success Interactivity
    // ==========================================================================
    const form = document.getElementById('case-review-form');
    const successAlert = document.getElementById('form-success-alert');
    
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };
    
    const validatePhone = (phone) => {
        // Broad regex supporting common phone formats: (000) 000-0000, 000-000-0000, 0000000000
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-s\.]?[0-9]{3}[-s\.]?[0-9]{4,6}$/;
        return re.test(String(phone).replace(/\s+/g, ''));
    };

    const setInputError = (inputElement, isValid) => {
        const group = inputElement.parentElement;
        if (isValid) {
            group.classList.remove('invalid');
        } else {
            group.classList.add('invalid');
        }
    };
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate Name
        const nameInput = document.getElementById('client-name');
        if (nameInput.value.trim() === '') {
            setInputError(nameInput, false);
            isFormValid = false;
        } else {
            setInputError(nameInput, true);
        }
        
        // Validate Email
        const emailInput = document.getElementById('client-email');
        if (!validateEmail(emailInput.value.trim())) {
            setInputError(emailInput, false);
            isFormValid = false;
        } else {
            setInputError(emailInput, true);
        }
        
        // Validate Phone
        const phoneInput = document.getElementById('client-phone');
        if (!validatePhone(phoneInput.value.trim())) {
            setInputError(phoneInput, false);
            isFormValid = false;
        } else {
            setInputError(phoneInput, true);
        }
        
        // Validate Incident Type Selection
        const typeInput = document.getElementById('incident-type');
        if (typeInput.value === '') {
            setInputError(typeInput, false);
            isFormValid = false;
        } else {
            setInputError(typeInput, true);
        }
        
        // Validate Context Message
        const messageInput = document.getElementById('client-message');
        if (messageInput.value.trim() === '') {
            setInputError(messageInput, false);
            isFormValid = false;
        } else {
            setInputError(messageInput, true);
        }
        
        if (isFormValid) {
            // Form is fully validated, simulate safe transaction
            console.log('Case Review Request submitted:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                incidentType: typeInput.value,
                incidentDate: document.getElementById('incident-date').value,
                message: messageInput.value.trim()
            });
            
            // Hide the form and show the success message
            form.style.display = 'none';
            successAlert.style.display = 'flex';
            
            // Scroll to the contact header smoothly
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Real-time validation visual updates on keyup/change
    const inputsToValidate = form.querySelectorAll('input, select, textarea');
    inputsToValidate.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                // If it was invalid, clear the visual error when user starts typing
                setInputError(input, true);
            }
        });
        
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => {
                if (input.value !== '') {
                    setInputError(input, true);
                }
            });
        }
    });

    // ==========================================================================
    // Scroll-Spy: Highlight Active Navigation Links
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // offset for sticky header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', scrollSpy);
    scrollSpy();

    // ==========================================================================
    // Intersection Observer: Scroll Reveal Micro-Animations
    // ==========================================================================
    // We add entry animations to practice cards, timeline steps, team cards, etc.
    const revealElements = document.querySelectorAll('.practice-card, .approach-step, .matter-card, .testimonial-card, .team-card, .insight-card');
    
    // Add default hidden styles inline so they animate smoothly when revealed
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve once revealed to maintain performance
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // offset triggers slightly
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
