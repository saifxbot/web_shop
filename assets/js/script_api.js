document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get user input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Check if both fields are filled
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }
  
    try {
      // Make the API POST request using fetch
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      // Convert response to JSON
      const data = await response.json();
  
      // Handle the response
      if (response.ok) {
        // If successful, print data (e.g., token, user details)
        console.log(data);
        alert('Login successful!');
  
        // Optionally, you can save the token or redirect the user to another page
        // For example:
        // localStorage.setItem('authToken', data.token);
        // window.location.href = 'homepage.html';  // Redirect to another page
      } else {
        // Handle errors (invalid credentials)
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  });

  
  
  