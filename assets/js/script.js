/**
 * Add event on elements or single element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem === window) {
    elem.addEventListener(type, callback);
  } else if (elem instanceof NodeList) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else if (elem) {
    elem.addEventListener(type, callback);
  } else {
    console.warn("Element not found or undefined:", elem);
  }
};

/**
 * Navbar toggle
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

if (navTogglers.length > 0) {
  addEventOnElem(navTogglers, "click", toggleNavbar);
}

const closeNavbar = function () {
  navbar?.classList.remove("active");
  overlay?.classList.remove("active");
};

if (navbarLinks.length > 0) {
  addEventOnElem(navbarLinks, "click", closeNavbar);
}

/**
 * Header sticky & back-to-top button activation
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header?.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header?.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header?.classList.remove("header-hide");
  } else {
    header?.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/**
 * Scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();
addEventOnElem(window, "scroll", scrollReveal);

/**
 * Login and cart button redirects
 */
const loginBtn = document.getElementById("loginBtn");
const cartBtn = document.getElementById("cartBtn");

loginBtn?.addEventListener("click", function () {
  window.location.href = "login.html"; // Ensure "login.html" exists
});

cartBtn?.addEventListener("click", function () {
  window.location.href = "login.html"; // Replace with the actual login page URL
});

/**
 * Register and login toggle functionality
 */
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const toggleLoginBtn = document.getElementById("login");

registerBtn?.addEventListener("click", () => {
  container?.classList.add("active");
});

toggleLoginBtn?.addEventListener("click", () => {
  container?.classList.remove("active");
});
