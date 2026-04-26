(function () {
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    var navAnchors = navLinks.querySelectorAll('a');
    navAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var btn = contactForm.querySelector('.btn');
        var originalText = btn.innerHTML;
        btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Wysyłam...</span>';
        btn.disabled = true;

        setTimeout(function () {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
        }, 1500);
    });

    var style = document.createElement('style');
    style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    document.head.appendChild(style);

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    var techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            var accent = this.getAttribute('data-accent');
            if (accent) {
                this.style.borderColor = accent + '40';
                this.style.boxShadow = '0 4px 24px ' + accent + '15';
            }
        });
        card.addEventListener('mouseleave', function () {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    var codeLines = document.querySelectorAll('.hero .code-body code');
    if (codeLines.length > 0) {
        var codeBlock = codeLines[0].parentElement;
        codeBlock.style.opacity = '0';
        codeBlock.style.transform = 'translateY(10px)';
        codeBlock.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(function () {
            codeBlock.style.opacity = '1';
            codeBlock.style.transform = 'translateY(0)';
        }, 600);
    }

    var aboutCodeBlock = document.querySelector('.about-visual .code-body');
    if (aboutCodeBlock) {
        var aboutCode = aboutCodeBlock.querySelector('code');
        if (aboutCode) {
            aboutCode.style.opacity = '0';
            aboutCode.style.transform = 'translateY(10px)';
            aboutCode.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

            var aboutObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        aboutCode.style.opacity = '1';
                        aboutCode.style.transform = 'translateY(0)';
                        aboutObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            aboutObserver.observe(aboutCodeBlock);
        }
    }
})();
