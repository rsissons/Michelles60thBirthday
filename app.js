document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling for anchored links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 0; // Adjust if you add a fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // RSVP is now handled via external Google Form link

    // Auto-playing Carousel Logic
    const photoNames = [
        "Photo1.JPG", "Photo10.jpg", "Photo11.jpg", "Photo12.jpg", "Photo13.jpg", 
        "Photo14.png", "Photo15.JPG", "Photo16.jpg", "Photo17.jpg", "Photo18.jpg", 
        "Photo19.jpg", "Photo2.jpg", "Photo20.jpg", "Photo21.jpg", "Photo22.jpg", 
        "Photo23.jpg", "Photo24.jpg", "Photo25.JPG", "Photo26.png", "Photo27.jpg", 
        "Photo28.jpg", "Photo29.jpg", "Photo3.jpg", "Photo30.jpg", "Photo31.jpg", 
        "Photo32.jpg", "Photo33.JPG", "Photo34.jpg", "Photo35.jpg", "Photo36.jpg", 
        "Photo37.JPG", "Photo38.png", "Photo39.jpg", "Photo4.jpg", "Photo40.jpg", 
        "Photo41.jpg", "Photo42.JPG", "Photo43.jpg", "Photo44.jpg", "Photo5.jpg", 
        "Photo6.jpg", "Photo7.jpg", "Photo8.jpg", "Photo9.jpg"
    ];

    const carouselImg = document.getElementById('carousel-img');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');

    let currentPhotoIndex = 0;
    let carouselInterval;

    function showPhoto(index) {
        if (!carouselImg) return;
        // Fade out effect
        carouselImg.style.opacity = 0;
        
        setTimeout(() => {
            carouselImg.src = `assets/images/${photoNames[index]}`;
            // Fade in effect
            carouselImg.style.opacity = 1;
        }, 300); // 300ms matches the CSS transition time
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoNames.length;
        showPhoto(currentPhotoIndex);
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoNames.length) % photoNames.length;
        showPhoto(currentPhotoIndex);
    }

    function startCarousel() {
        // Change photo every 3 seconds (3000ms)
        carouselInterval = setInterval(nextPhoto, 3000);
    }

    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            nextPhoto();
            resetCarousel(); // Reset timer when manually clicked
        });
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            prevPhoto();
            resetCarousel(); // Reset timer when manually clicked
        });
    }

    // Initialize carousel if photos exist
    if (photoNames.length > 0 && carouselImg) {
        // Preload first image instantly to avoid initial fade-out delay
        carouselImg.src = `assets/images/${photoNames[currentPhotoIndex]}`;
        carouselImg.style.opacity = 1;
        startCarousel();
    }
});
