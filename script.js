document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  // Dynamic Hero Background
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const backgroundImages = [
      'url("Images/Boy.jpg")',
      'url("Images/Keys.jpg")',
      'url("Images/GoldKey.jpg")',
      'url("Images/E-Learning.jpg")'
    ];
    let currentImageIndex = 0;
    function changeHeroBackground() {
      heroSection.style.backgroundImage = backgroundImages[currentImageIndex];
      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }
    changeHeroBackground(); // Call it once immediately
    setInterval(changeHeroBackground, 5000); // Correct: Call setInterval *outside* the function
  }
  // Header Scroll Background Change - MOVED OUTSIDE the heroSection IF block
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }); // Closing bracket ADDED here
  // Contact Form Alert
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting InkPots!');
      contactForm.reset();
    });
  }
  // Gallery Slideshow with Dots
  const slides = document.querySelectorAll('.gallery .slide');
  const dots = document.querySelectorAll('.gallery .dot');
  let slideIndex = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
      dots[i].classList.toggle('active', i === index);
    });
  }
  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }
  if (slides.length > 0 && dots.length > 0) {
    showSlide(slideIndex);
    setInterval(nextSlide, 4000);
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        slideIndex = index;
        showSlide(slideIndex);
      });
    });
  }
  // Pre Fill Message box to Request Quote for the Program
// Typing Animation when Request Quote is clicked
function typeMessage(element, message, delay = 50) {
  let index = 0;
  element.value = ''; // Clear the existing message
  const interval = setInterval(() => {
    element.value += message.charAt(index);
    index++;
    if (index === message.length) {
      clearInterval(interval);
    }
  }, delay);
}

// Detect "program" from URL and trigger typing animation
const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
const selectedProgram = hashParams.get('program');
const messageBox = document.getElementById('message');
const contactSection = document.getElementById('contact');

if (selectedProgram && messageBox) {
  const readableProgram = selectedProgram.replace(/([A-Z])/g, ' $1').trim();
  const messageText = `Hi, I’m interested in the ${readableProgram} program. Please share the quote.`;

  // Scroll to contact section
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    messageBox.focus();
    typeMessage(messageBox, messageText, 40); // 40ms delay between characters
  }
}

  // Mission Cards Functionality
  const missionCards = document.querySelectorAll('.mission-card');
  function toggleContent(clickedElement) {
    const clickedCard = clickedElement.closest('.mission-card');
    const wasActive = clickedCard.classList.contains('active');
    // Close all cards first
    missionCards.forEach(card => {
      card.classList.remove('active');
      const content = card.querySelector('.mission-content');
      content.style.maxHeight = '0';
    });
    // Open clicked card only if it wasn't already active
    if (!wasActive) {
      clickedCard.classList.add('active');
      const content = clickedCard.querySelector('.mission-content');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
  // Add click event listeners to all icon-title elements
  document.querySelectorAll('.icon-title').forEach(iconTitle => {
    iconTitle.addEventListener('click', () => toggleContent(iconTitle));
  });
  // Scroll animation for mission cards
  function fadeInMissionCards() {
    const triggerPoint = window.innerHeight * 0.85;
    missionCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerPoint) {
        card.classList.add('show');
      } else {
        card.classList.remove('show');
      }
    });
  }
  fadeInMissionCards();
  window.addEventListener('scroll', fadeInMissionCards);
});


document.getElementById("searchBtn").addEventListener("click", function () {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();

  // Simple keyword-based scroll/jump
  if (input.includes("about")) {
    window.location.href = "About.html#about";
  } else if (input.includes("contact")) {
    window.location.href = "index.html#contact";
  } else if (input.includes("program") || input.includes("courses")) {
    window.location.href = "index.html#courses";
  } else if (input.includes("sign") || input.includes("login")) {
    window.location.href = "signin.html";
  } else {
    alert("No matching section found.");
  }
});

document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});
