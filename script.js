// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== Project Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== Form Validation & Submission =====
const contactForm = document.getElementById('contactForm');
const joinForm = document.getElementById('joinForm');

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger)';
        } else {
            input.style.borderColor = 'var(--bg-light)';
        }
    });
    
    return isValid;
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            // Get form data
            const formData = {
                name: document.getElementById('clientName').value,
                phone: document.getElementById('clientPhone').value,
                email: document.getElementById('clientEmail').value,
                location: document.getElementById('projectLocation').value,
                service: document.getElementById('serviceNeeded').value,
                professional: document.getElementById('professionalLevel').value,
                date: document.getElementById('visitDate').value,
                description: document.getElementById('projectDescription').value,
                source: document.getElementById('hearAbout').value
            };
            
            // Show success message
            alert('ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would send this data to a server
            console.log('Contact Form Data:', formData);
        } else {
            alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।');
        }
    });
}

if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(joinForm)) {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                category: document.getElementById('category').value,
                semester: document.getElementById('semester').value,
                institution: document.getElementById('institution').value,
                availability: document.getElementById('availability').value,
                areas: document.getElementById('areas').value,
                experience: document.getElementById('experience').value,
                hasTransport: document.getElementById('transport').checked
            };
            
            // Show success message
            alert('ধন্যবাদ! আপনার আবেদন জমা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।');
            
            // Reset form
            joinForm.reset();
            
            // In production, you would send this data to a server
            console.log('Join Form Data:', formData);
        } else {
            alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।');
        }
    });
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .benefit-item, .package-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// ===== Back to Top Button =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-5px)';
    backToTopBtn.style.background = 'var(--primary-color)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.background = 'var(--secondary-color)';
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Price Calculator (Optional Feature) =====
function calculatePrice(service, professional, visits = 1) {
    const prices = {
        inspection: {
            lead: 3000,
            bsc: 2000,
            diploma: 1500
        },
        roofing: {
            lead: 5000,
            bsc: 3500,
            diploma: 2500
        },
        foundation: {
            lead: 4000,
            bsc: 2800,
            diploma: 2000
        },
        report: {
            lead: 3500,
            bsc: 2500,
            diploma: 1800
        }
    };
    
    if (prices[service] && prices[service][professional]) {
        return prices[service][professional] * visits;
    }
    
    return 0;
}

// ===== WhatsApp Quick Contact =====
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/8801XXXXXXXXX'; // Replace with actual number
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 999;
    text-decoration: none;
`;

document.body.appendChild(whatsappBtn);

whatsappBtn.addEventListener('mouseenter', () => {
    whatsappBtn.style.transform = 'scale(1.1)';
});

whatsappBtn.addEventListener('mouseleave', () => {
    whatsappBtn.style.transform = 'scale(1)';
});

// ===== View Project Details (Modal - Optional) =====
document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        // In a full implementation, this would open a modal with project details
        alert(`প্রকল্প বিস্তারিত: ${projectTitle}\n\nএখানে প্রকল্পের সম্পূর্ণ বিবরণ, ছবি এবং আরো তথ্য দেখানো হবে।`);
    });
});

// ===== Dynamic Year in Footer =====
const currentYear = new Year().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('২০২৬', currentYear.toString());
}

// ===== Input Validation on Type =====
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
        // Remove non-numeric characters
        e.target.value = e.target.value.replace(/[^0-9+]/g, '');
    });
});

document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', (e) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (e.target.value && !emailPattern.test(e.target.value)) {
            e.target.style.borderColor = 'var(--danger)';
            alert('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।');
        } else {
            e.target.style.borderColor = 'var(--bg-light)';
        }
    });
});

// ===== Auto-hide Success Messages =====
function showSuccessMessage(message, duration = 3000) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, duration);
}

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Lazy Loading Images (if you add real images later) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Console Welcome Message =====
console.log('%c🏗️ নির্মাণ বিশেষজ্ঞ', 'color: #1a4d2e; font-size: 24px; font-weight: bold;');
console.log('%cপেশাদার সিভিল ইঞ্জিনিয়ারিং কনসালটেশন সেবা', 'color: #ff6b35; font-size: 14px;');
console.log('%c💼 আমাদের সাথে কাজ করতে চান? যোগ দিন এখনই!', 'color: #666; font-size: 12px;');

console.log('Website developed with ❤️');

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully!');
    console.log('📱 All interactive features are active');
});
