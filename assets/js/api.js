document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            const responseDiv = document.getElementById("response");
            if (json.token) {
                responseDiv.innerHTML = `<p>Login successful! Token: ${json.token}</p>`;
            } else {
                responseDiv.innerHTML = `<p>Error: ${json.message || 'Login failed'}</p>`;
            }
        })
        .catch(err => {
            document.getElementById("response").innerHTML = `<p>Error: ${err.message}</p>`;
        });
    } else {
        document.getElementById("response").innerHTML = `<p>Please enter both username and password.</p>`;
    }
});