// ============================
// Theme toggle with localStorage
// ============================
function setupThemeToggle() {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.setAttribute("aria-pressed", String(next === "dark"));
  }

  const stored = localStorage.getItem("theme");
  if (stored) setTheme(stored);

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

// ============================
// Typing Greeting (looped)
// ============================
function setupTypingGreeting() {
  const greetingEl = document.getElementById("greeting");
  const usernameInput = document.getElementById("username");
  const saveButton = document.getElementById("saveName");
  if (!greetingEl) return;

  const hour = new Date().getHours();
  const baseGreeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const storedName = localStorage.getItem("visitorName") || "friend";
  let userName = storedName;

  const phrases = [
    `${baseGreeting}, ${userName}!`,
    "Welcome to my humble portfolio.",
    "Hope you're having a great day!",
    "Let's build something amazing together!"
  ];

  let current = 0;
  let isDeleting = false;
  let text = "";

  function type() {
    const fullText = phrases[current];
    text = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    greetingEl.textContent = text;

    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && text === fullText) {
      speed = 1500; // pause after full text
      isDeleting = true;
    } else if (isDeleting && text === "") {
      isDeleting = false;
      current = (current + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  // update name dynamically when saved
  saveButton.addEventListener("click", () => {
    const newName = usernameInput.value.trim();
    if (newName) {
      localStorage.setItem("visitorName", newName);
      userName = newName;
      phrases[0] = `${baseGreeting}, ${userName}!`;
    }
  });

  type();
}

// ============================
// Tabs switching
// ============================
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".section");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.target;
      sections.forEach((sec) => {
        sec.classList.remove("active-section");
        if (sec.id === target) sec.classList.add("active-section");
      });
    });
  });
}

// ============================
// Read More / Read Less
// ============================
function setupReadMore() {
  const toggleBtn = document.getElementById("toggleAbout");
  const hidden = document.getElementById("moreAbout");

  toggleBtn.addEventListener("click", () => {
    hidden.classList.toggle("show");
    toggleBtn.textContent = hidden.classList.contains("show")
      ? "Read Less"
      : "Read More";
  });
}

// ============================
// Contact Form with Email Validation + Funny Popup
// ============================
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  if (!form || !emailInput) return;

  const emailSuggestions = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

  // Add datalist for email domains
  const dataList = document.createElement("datalist");
  dataList.id = "emailSuggestions";
  emailSuggestions.forEach((domain) => {
    const option = document.createElement("option");
    option.value = "@" + domain;
    dataList.appendChild(option);
  });
  emailInput.setAttribute("list", "emailSuggestions");
  document.body.appendChild(dataList);

  // Email validation function
  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("🧐 Please fill all fields, genius!");
      return;
    }

    if (!isValidEmail(email)) {
      alert("🚨 Invalid email! Please enter a proper email address (e.g., name@gmail.com).");
      return;
    }

    // ✅ Funny success popup
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "var(--card)";
    popup.style.color = "var(--text)";
    popup.style.padding = "1.5rem 2rem";
    popup.style.borderRadius = "1rem";
    popup.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
    popup.style.zIndex = "9999";
    popup.style.textAlign = "center";
    popup.innerHTML = `
      <h3>✅ Message Sent Successfully!</h3>
      <p>😂 Your message just went to the void... but we’ll pretend it was delivered successfully! 👍🤖</p>
      <p><span style="font-size:2rem;">✨👍💬</span></p>
    `;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 4000);
    form.reset();
  });
}

// ============================
// Footer year
// ============================
function setupFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================
// Init all
// ============================
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupTypingGreeting();
  setupTabs();
  setupReadMore();
  setupFooterYear();
  setupContactForm();
});
