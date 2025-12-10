// Asegurar que el DOM esté listo antes de agregar event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked'); // Para debugging
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (link) link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Appointment Modal
// WhatsApp Direct Contact
function openWhatsApp(message = '') {
    const phone = '5217472194953';
    const defaultMessage = message || 'Hola, me gustaría agendar una cita en CERCH';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
}

// Form Handling
const contactForm = document.getElementById('contact-form');
const appointmentForm = document.getElementById('appointment-form');

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Success message
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // In production, use actual API:
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     
        //     if (response.ok) {
        //         showNotification('¡Mensaje enviado con éxito!', 'success');
        //         contactForm.reset();
        //     } else {
        //         throw new Error('Error al enviar');
        //     }
        // } catch (error) {
        //     showNotification('Error al enviar el mensaje. Intenta de nuevo.', 'error');
        // } finally {
        //     submitBtn.innerHTML = originalText;
        //     submitBtn.disabled = false;
        // }
    });
}

// Appointment Form Submission
if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate date is not in the past
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showNotification('Por favor selecciona una fecha futura', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Confirmando...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('¡Cita agendada con éxito! Recibirás una confirmación por correo electrónico.', 'success');
            appointmentForm.reset();
            closeAppointmentModal();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // In production, use actual API endpoint
    });
}

// Set minimum date for appointment to today
const dateInput = document.getElementById('apt-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : 
                  type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
                  '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification__close" onclick="this.parentElement.remove()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification--success {
            border-left: 4px solid #10b981;
        }
        
        .notification--error {
            border-left: 4px solid #ef4444;
        }
        
        .notification--info {
            border-left: 4px solid #3b82f6;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        
        .notification--success svg {
            color: #10b981;
        }
        
        .notification--error svg {
            color: #ef4444;
        }
        
        .notification--info svg {
            color: #3b82f6;
        }
        
        .notification__close {
            background: none;
            border: none;
            cursor: pointer;
            color: #9ca3af;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        
        .notification__close:hover {
            color: #4b5563;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .feature-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// WhatsApp Button (floating)
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/527472194953';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6);
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            }
            50% {
                box-shadow: 0 4px 20px rgba(37, 211, 102, 0.7);
            }
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
            }
            
            .whatsapp-float svg {
                width: 28px;
                height: 28px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappBtn);
}

// Initialize WhatsApp button
createWhatsAppButton();

// Analytics tracking (placeholder - integrate with actual analytics)
function trackEvent(category, action, label) {
    // Replace with actual analytics implementation
    console.log('Event tracked:', { category, action, label });
    
    // Example for Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track important user actions
document.querySelectorAll('button[onclick*="openAppointmentModal"]').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Engagement', 'Click', 'Open Appointment Modal');
    });
});

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'Click', 'Phone Call');
    });
});

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'Click', 'Email');
    });
});

// Service cards click tracking
document.querySelectorAll('.service-card__cta').forEach(btn => {
    btn.addEventListener('click', () => {
        const serviceTitle = btn.closest('.service-card').querySelector('.service-card__title').textContent;
        trackEvent('Services', 'Click', serviceTitle);
    });
});

// Blog cards tracking
document.querySelectorAll('.blog-card__link').forEach(link => {
    link.addEventListener('click', () => {
        const blogTitle = link.closest('.blog-card').querySelector('.blog-card__title').textContent;
        trackEvent('Blog', 'Click', blogTitle);
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime, 'ms');
    
    // Track in analytics
    trackEvent('Performance', 'Page Load', `${loadTime}ms`);
});

console.log('CERCH Website - Todos los scripts cargados correctamente');
// ==========================================
// Counter Animation for Stats (CORREGIDO)
// ==========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats section - Inicializar después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    
    if (statsSection) {
        const statsObserverOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statCards = entry.target.querySelectorAll('.stat-card__number[data-target]');
                    statCards.forEach(card => {
                        const target = parseInt(card.getAttribute('data-target'));
                        // Iniciar animación
                        animateCounter(card, target);
                        
                        // Agregar sufijos (+ o %) después de que termine la animación
                        setTimeout(() => {
                            const label = card.nextElementSibling;
                            if (label && label.textContent) {
                                const labelText = label.textContent;
                                if (labelText.includes('Experiencia') || labelText.includes('Atendidos') || labelText.includes('Pacientes')) {
                                    card.textContent = target + '+';
                                }
                                if (labelText.includes('Satisfacción')) {
                                    card.textContent = target + '%';
                                }
                            }
                        }, 2100);
                    });
                    // Dejar de observar una vez que se ha activado
                    statsObserver.unobserve(entry.target);
                }
            });
        }, statsObserverOptions);
        
        statsObserver.observe(statsSection);
    }
});