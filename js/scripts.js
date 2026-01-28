/* ============ VEDANTA SPA SCRIPTS ============ */

document.addEventListener('DOMContentLoaded', () => {
    // ============ PRELOADER ============
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.classList.add('loading');
        const fadeOutPreloader = () => {
            setTimeout(() => {
                preloader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s';
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('loading');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger initial animations
                    document.querySelectorAll('.hero h1, .hero p, .hero-btns, .shimmer-gold, .text-reveal').forEach((el, i) => {
                        setTimeout(() => el.classList.add('visible'), 300 + (i * 150));
                    });
                }, 800);
            }, 800); // Luxury pause
        };

        if (document.readyState === 'complete') {
            fadeOutPreloader();
        } else {
            window.addEventListener('load', fadeOutPreloader);
        }

        // Emergency fallback - never let user get stuck
        setTimeout(() => {
            if (getComputedStyle(preloader).display !== 'none') {
                fadeOutPreloader();
            }
        }, 5000);
    }

    // ============ SMOOTH SCROLLING ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Staggered children if any
                const staggers = entry.target.querySelectorAll('.stagger-item');
                staggers.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with reveal classes
    document.querySelectorAll('.text-reveal, .reveal-perspective, .Suite-card, .category-card, .contact-card, .reveal-left, .reveal-right, .stagger-container').forEach(el => {
        revealObserver.observe(el);
    });

    // ============ PARALLAX EFFECT FOR HERO ============
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero');
        if (heroBg) {
            heroBg.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }

        // Header shrinking
        const header = document.querySelector('header');
        if (scrolled > 100) {
            header.style.padding = '8px 0';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // ============ CURSOR GLOW (PREMIUM TOUCH) ============
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    // ============ MAGNETIC BUTTONS ============
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ============ 3D IMAGE TILT ============
    document.querySelectorAll('.zoom-container').forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const img = container.querySelector('img');
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (img) {
                img.style.transform = `scale(1.15) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
            }
        });

        container.addEventListener('mouseleave', () => {
            const img = container.querySelector('img');
            if (img) img.style.transform = '';
        });
    });

    // ============ MOBILE MENU TOGGLE ============
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu on link click
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });

        // Close menu with internal close button
        const menuCloseBtn = document.getElementById('menuCloseBtn');
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        }
    }

    // ============ PHONE BUTTON ============
    const phoneBtn = document.createElement('a');
    phoneBtn.href = "tel:+917788872255";
    phoneBtn.className = "phone-float";
    phoneBtn.innerHTML = '<i class="fas fa-phone-alt"></i>';
    document.body.appendChild(phoneBtn);

    // ============ WHATSAPP BUTTON ============
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = "https://wa.me/917788872255";
    whatsappBtn.className = "whatsapp-float";
    whatsappBtn.target = "_blank";
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);
});
