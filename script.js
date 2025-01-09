const clientSlider = document.querySelector('.client-slider');
const slides = document.querySelectorAll('.client-slide');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');
let dots = document.querySelectorAll('.slider-dot');
let currentIndex = 0;
const totalSlides = slides.length;

function updateClientSlider() {
    clientSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    clientSlider.style.transition = 'transform 0.5s ease';
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
}

// Function to generate dots dynamically based on the number of slides
function createDots() {
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.innerHTML = ''; // Remove existing dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        dotsContainer.appendChild(dot);
    }
    dots = document.querySelectorAll('.slider-dot'); // Refresh the dots array
    updateDots(); // Update the dots immediately after creating them

    // Add event listeners to the new dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateClientSlider();
            updateDots();
        });
    });
}

createDots(); // Call this function to generate dots

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateClientSlider();
    updateDots();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateClientSlider();
    updateDots();
});

// Automatic slide transition every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateClientSlider();
    updateDots();
}, 5000);

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

