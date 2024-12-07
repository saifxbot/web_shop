//for login//
document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signInForm');
    const loginButton = document.getElementById('loginBtn'); // Updated id for the login button
    const registerButton = document.getElementById('registerBtn'); // Updated id for the register button

    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log('Form submitted with:', username, password); // Debug log to check inputs

            try {
                const response = await fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Invalid username or password');
                }

                const data = await response.json();
                console.log('Login successful:', data);

                // Store the token (if provided by the API)
                localStorage.setItem('token', data.token);

                // Redirect or update the UI upon successful login
                alert('Login successful! Redirecting...');
                window.location.href = './dashboard.html'; // Change this to your desired page
            } catch (error) {
                console.error('Login error:', error);
                alert(error.message); // Display error message
            }
        });
    } else {
        console.error('Sign-in form not found');
    }
});

//for sign up//
document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector("#signUpForm form");

    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect input values
        const firstname = signUpForm.querySelector('input[placeholder="Name"]').value.trim();
        const email = signUpForm.querySelector('input[placeholder="Email"]').value.trim();
        const password = signUpForm.querySelector('input[placeholder="Password"]').value.trim();

        // Example data (extend as needed for address, phone, etc.)
        const userData = {
            email: email,
            username: email.split('@')[0], // Example: Create a username from the email
            password: password,
            name: {
                firstname: firstname,
                lastname: "Doe" // You can extend the form to collect last name
            },
            address: {
                city: "kilcoole",
                street: "7835 new road",
                number: 3,
                zipcode: "12926-3874",
                geolocation: {
                    lat: "-37.3159",
                    long: "81.1496"
                }
            },
            phone: "1-570-236-7033" // Add a field to collect phone if needed
        };

        try {
            const response = await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const json = await response.json();
                console.log("Registration Successful:", json);
                alert("User registered successfully!");
                signUpForm.reset(); // Clear the form fields
            } else {
                const error = await response.json();
                console.error("Error:", error);
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("An error occurred while signing up. Please try again later.");
        }
    });
});



const categoriesButton = document.getElementById('categories-button');
const categoriesContainer = document.getElementById('categories-container');

// Fetch categories from the API
function fetchCategories() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => {
      categoriesContainer.innerHTML = ''; // Clear previous content
      json.forEach(category => {
        const categoryItem = document.createElement('p');
        categoryItem.textContent = category;
        categoryItem.style.margin = '0';
        categoryItem.style.cursor = 'pointer';
        categoriesContainer.appendChild(categoryItem);
      });
    })
    .catch(err => console.error('Error fetching categories:', err));
}

// Show categories on button click
categoriesButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent immediate navigation to categories.html
  fetchCategories();
  categoriesContainer.style.display = 'block';

  // Redirect to categories.html after 1 second (adjust as needed)
  setTimeout(() => {
    window.location.href = './assets/html/categories.html';
  }, 1000); // Delay for user to see the categories
});





  