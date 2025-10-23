// Smooth scroll for in-page links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

          const navLinks = document.getElementById('navLinks');
          if (navLinks && navLinks.getAttribute('aria-expanded') === 'true') {
            navLinks.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
}

// Mobile nav toggle
function setupMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = navLinks.getAttribute('aria-expanded') === 'true';
      navLinks.setAttribute('aria-expanded', String(!expanded));
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }
}

// Theme toggle with localStorage
function setupThemeToggle() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    }
  }

  // Load stored theme
  const stored = localStorage.getItem('theme');
  if (stored) {
    setTheme(stored);
  }

  // Toggle theme on click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'auto';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
}

// Greeting message
function setupGreeting() {
  const greeting = document.getElementById('greeting');
  if (greeting) {
    const h = new Date().getHours();
    const msg = h < 12 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening');
    greeting.textContent = msg;
  }
}

// Footer year
function setupFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Contact form validation
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;

      form.querySelectorAll('.error').forEach(el => el.textContent = '');

      if (!form.name.value.trim()) {
        ok = false; form.name.nextElementSibling.textContent = 'Please enter your name.';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value)) {
        ok = false; form.email.nextElementSibling.textContent = 'Enter a valid email.';
      }
      if (form.message.value.trim().length < 5) {
        ok = false; form.message.nextElementSibling.textContent = 'Please write a longer message.';
      }

      if (ok) {
        alert('✅ Thanks! This is a demo form only.');
        form.reset();
      }
    });
  }
}

// Typing effect for tagline
function setupTypingEffect() {
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    const phrases = [
      "Make it simple. Make it work. Make it better.",
      "Turning ideas into reality.",
      "Engineering with passion and purpose."
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeEffect() {
      const phrase = phrases[currentPhrase];
      if (!isDeleting) {
        typingElement.textContent = phrase.substring(0, currentChar + 1);
        currentChar++;
        if (currentChar === phrase.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1500); // pause before deleting
          return;
        }
      } else {
        typingElement.textContent = phrase.substring(0, currentChar - 1);
        currentChar--;
        if (currentChar === 0) {
          isDeleting = false;
          currentPhrase = (currentPhrase + 1) % phrases.length;
        }
      }
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
  }
}

// Initialize all features on page load
document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupMobileNav();
  setupThemeToggle();
  setupGreeting();
  setupFooterYear();
  setupContactForm();
  setupTypingEffect();
});
