/* Study Bitcoin H24 - single page interactions:
   - reveal on scroll
   - stepbar active section
   - mobile menu toggle
*/

const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav a, .stepbar a");
const steps = document.querySelectorAll(".step");
const sections = [...document.querySelectorAll("section[id]")];

function setActiveStep(sectionId) {
  steps.forEach(s => s.classList.toggle("active", s.dataset.section === sectionId));
}

function getCurrentSectionId() {
  // pick the section whose top is closest but not past the header too far
  const offset = 140;
  let current = sections[0]?.id || "home";
  for (const sec of sections) {
    const rect = sec.getBoundingClientRect();
    if (rect.top - offset <= 0) current = sec.id;
  }
  return current;
}

/* Reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Stepbar update */
window.addEventListener("scroll", () => {
  const id = getCurrentSectionId();
  // Map many sections into the 7 chapter steps.
  const map = {
    "home": "home",
    "locale": "home",
    "start": "start",
    "chi-siamo": "chi-siamo",
    "pagamenti": "pagamenti",
    "bitcoin": "guide",     // visually keep learning path
    "guide": "guide",
    "progetto": "guide",
    "merch": "merch",
    "donazioni": "merch",
    "esercenti": "merch",
    "contatti": "contatti",
    "blog": "contatti",
    "risorse": "contatti"
  };
  setActiveStep(map[id] || "home");
}, { passive: true });

/* Mobile menu */
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// close menu after click
navLinks.forEach(a => {
  a.addEventListener("click", () => {
    header.classList.remove("is-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Demo contact send */
const fakeSend = document.getElementById("fakeSend");
const sendNote = document.getElementById("sendNote");
if (fakeSend && sendNote) {
  fakeSend.addEventListener("click", () => {
    sendNote.style.display = "block";
  });
}
