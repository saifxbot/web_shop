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
 * Login redirects
 */
const loginBtn = document.getElementById("loginBtn");
const cartBtn = document.getElementById("cartBtn");

loginBtn?.addEventListener("click", function () {
  window.location.href = "login.html"; // Ensure "login.html" exists
});


// script.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const signUpBtn = document.getElementById('registerBtn');
  const signInBtn = document.getElementById('loginBtn');
  
  // Function to show the Sign Up form and hide Sign In form
  function showSignUp() {
      container.classList.add('active');  // Add 'active' class to trigger transitions
  }

  // Function to show the Sign In form and hide Sign Up form
  function showSignIn() {
      container.classList.remove('active');  // Remove 'active' class to revert to sign-in
  }

  // Add event listeners for toggle buttons to switch forms
  signUpBtn.addEventListener('click', showSignUp);
  signInBtn.addEventListener('click', showSignIn);

  // Initially show the Sign In form when the page loads
  showSignIn();
});



// Set the target date (e.g., December 31, 2024, at 23:59:59)
const targetDate = new Date(2024, 11, 31, 23, 59, 59).getTime();

function updateCountdown() {
  const now = new Date().getTime(); // Get the current time
  const difference = targetDate - now; // Calculate time difference

  if (difference <= 0) {
    // If countdown is over
    document.querySelector(".countdown").innerHTML = "Offer Expired!";
    clearInterval(countdownInterval); // Stop the timer
    return;
  }

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Update the HTML elements
  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Run updateCountdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Call immediately to avoid delay

// Show popup
document.getElementById('sale-popup').classList.remove('hidden');

// Close popup when close button is clicked
document.getElementById('close-popup').addEventListener('click', function() {
  document.getElementById('sale-popup').classList.add('hidden');  // Hide the popup
});

// Close popup when clicking anywhere outside the popup content (background)
document.getElementById('sale-popup').addEventListener('click', function(event) {
  // Only close the popup if the background (not the content) is clicked
  if (event.target === this) { 
    document.getElementById('sale-popup').classList.add('hidden');  // Hide the popup
  }
});




// Global cart array to store the items
let cart = [];
let cartCount = 0; // Track the number of items in the cart

// Function to update the cart badge (cart button's badge)
function updateCartBadge() {
    document.getElementById('cart-badge').textContent = cartCount; // Update the cart badge with the count
}

// Function to update the cart modal with current cart items and total
function updateCartModal() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // Clear any existing cart items in the modal
    cartItemsList.innerHTML = '';

    let total = 0;

    // Loop through cart items and add them to the modal
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50"> 
            <span>${item.title} - €${item.price.toFixed(2)}</span>
        `;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    // Update the total price in the modal
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Function to handle adding an item to the cart
function addToCart(product) {
    cart.push(product); // Add product to the cart array
    cartCount++; // Increment the cart count
    updateCartBadge(); // Update the cart badge number
}

// Function to handle opening the cart modal
function openCartModal() {
    document.getElementById('cart-modal').style.display = 'block'; // Show the cart modal
    updateCartModal(); // Update the modal with current cart items
}

// Function to handle closing the cart modal
function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none'; // Hide the cart modal
}

// Add event listener for the cart button to open the modal
document.getElementById('cartBtn').addEventListener('click', openCartModal);

// Add event listener for closing the modal
document.getElementById('close-modal').addEventListener('click', closeCartModal);

// Fetch product data and set up event listeners for the "Add to Cart" buttons
fetch('https://fakestoreapi.com/products') // Fetch all products
    .then(res => res.json())
    .then(products => {
        // Loop through products and add event listeners to each "Add to Cart" button
        document.querySelectorAll('.action-btn[aria-label="add to cart"]').forEach((button, index) => {
            button.addEventListener('click', () => {
                // Get the specific product data from the API
                const product = products[index]; // Use index to get the corresponding product
                
                // Create product object for cart
                const cartProduct = {
                    title: product.title, // Product title
                    price: product.price, // Product price
                    image: product.image // Product image
                };

                // Add product to the cart
                addToCart(cartProduct);
            });
        });
    })
    .catch(error => console.error('Error fetching products:', error));

