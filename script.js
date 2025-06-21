// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const body = document.querySelector('body');
let mobileNav;

// Create mobile navigation
function createMobileNav() {
    // Create mobile nav element
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Create mobile nav header
    const mobileNavHeader = document.createElement('div');
    mobileNavHeader.className = 'mobile-nav-header';
    
    // Add logo to mobile nav
    const logoClone = document.querySelector('.logo').cloneNode(true);
    mobileNavHeader.appendChild(logoClone);
    
    // Add close button
    const closeBtn = document.createElement('div');
    closeBtn.className = 'mobile-nav-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', toggleMobileNav);
    mobileNavHeader.appendChild(closeBtn);
    
    // Create nav links
    const navLinks = document.createElement('div');
    navLinks.className = 'mobile-nav-links';
    
    // Clone nav links from desktop
    const desktopLinks = document.querySelectorAll('.nav-links a');
    desktopLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        newLink.addEventListener('click', toggleMobileNav);
        navLinks.appendChild(newLink);
    });
    
    // Add book button
    const bookBtn = document.createElement('button');
    bookBtn.className = 'btn primary-btn mobile-book-btn';
    bookBtn.textContent = 'Book a Trek';
    
    // Append all elements
    mobileNav.appendChild(mobileNavHeader);
    mobileNav.appendChild(navLinks);
    mobileNav.appendChild(bookBtn);
    
    // Add to body
    body.appendChild(mobileNav);
}

// Toggle mobile navigation
function toggleMobileNav() {
    if (!mobileNav) {
        createMobileNav();
    }
    
    mobileNav.classList.toggle('active');
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    
    // Toggle hamburger animation
    hamburger.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
        hamburger.querySelector('.bar:nth-child(1)').style.transform = 'translateY(8px) rotate(45deg)';
        hamburger.querySelector('.bar:nth-child(2)').style.opacity = '0';
        hamburger.querySelector('.bar:nth-child(3)').style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        hamburger.querySelector('.bar:nth-child(1)').style.transform = 'none';
        hamburger.querySelector('.bar:nth-child(2)').style.opacity = '1';
        hamburger.querySelector('.bar:nth-child(3)').style.transform = 'none';
    }
}

// Add event listener to hamburger
hamburger.addEventListener('click', toggleMobileNav);

// Gallery Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gallery Modal
const galleryModal = document.querySelector('.gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalDate = document.getElementById('modal-date');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const visibleItems = [];

// Open modal when clicking on gallery item
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Get all currently visible items
        visibleItems.length = 0;
        galleryItems.forEach((item, i) => {
            if (item.style.display !== 'none') {
                visibleItems.push(i);
            }
        });
        
        // Find index in visible items
        currentIndex = visibleItems.indexOf(index);
        
        // Update modal content
        updateModalContent();
        
        // Show modal
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    galleryModal.style.display = 'none';
    document.body.style.overflow = '';
});

// Navigate to previous image
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateModalContent();
});

// Navigate to next image
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateModalContent();
});

// Update modal content
function updateModalContent() {
    const itemIndex = visibleItems[currentIndex];
    const item = galleryItems[itemIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const location = item.querySelector('p').textContent;
    const date = item.querySelector('.gallery-date') ? item.querySelector('.gallery-date').textContent : '';
    
    modalImg.src = img.src;
    modalTitle.textContent = title;
    modalLocation.textContent = location;
    modalDate.textContent = date;
}

// Close modal when clicking outside the image
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (galleryModal.style.display === 'block') {
        if (e.key === 'Escape') {
            galleryModal.style.display = 'none';
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            updateModalContent();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            updateModalContent();
        }
    }
});

// Testimonial Slider
const testimonialDots = document.querySelectorAll('.dot');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialDots.length > 0) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Calculate scroll position
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = 16; // Assuming 1rem = 16px
            const scrollPosition = index * (cardWidth + gap);
            
            // Scroll to position
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Update active dot on scroll
    testimonialSlider.addEventListener('scroll', () => {
        const scrollPosition = testimonialSlider.scrollLeft;
        const cardWidth = testimonialCards[0].offsetWidth;
        const gap = 16; // Assuming 1rem = 16px
        
        const activeIndex = Math.round(scrollPosition / (cardWidth + gap));
        
        testimonialDots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
}

// Sticky Header
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.boxShadow = 'var(--shadow)';
    }
    
    // Hide/show header on scroll
    if (window.scrollY > 500) {
        if (window.scrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = window.scrollY;
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    // Set active filter button
    filterBtns[0].classList.add('active');
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-header, .hike-card, .destination-card, .gallery-item, .about-content, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});
// Upcoming Event Countdown for Homepage
document.addEventListener('DOMContentLoaded', function() {
    const eventCountdownElement = document.getElementById('event-countdown');
    if (eventCountdownElement) {
        // Set the event date
        const eventDate = new Date("April 19, 2025 00:00:00").getTime();
        
        // Update the countdown every second
        const countdownInterval = setInterval(function() {
            // Get current date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the event date
            const distance = eventDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            eventCountdownElement.innerHTML = `${days} days : ${hours} hrs : ${minutes} mins : ${seconds} secs`;
            
            // If the countdown is finished, display expired message
            if (distance < 0) {
                clearInterval(countdownInterval);
                eventCountdownElement.innerHTML = "Event has started!";
            }
        }, 1000);
    }
});
