// Select the login button by its ID
let loginBtn = document.getElementById("btn-logear");

// Add an event listener for the click event on the login button
loginBtn.addEventListener("click", () => {
    // Gather user input from the form fields
    let loginData = {
        username: document.getElementById("nombreUsuario").value, // Get the username
        password: document.getElementById("password").value // Get the password
    };

    // Perform a POST request to the login endpoint
    fetch("http://localhost:3000/login", {
        method: "POST", // Set the HTTP method to POST
        body: JSON.stringify(loginData), // Convert the login data to JSON
        headers: {
            "Content-Type": "application/json; charset=UTF-8" // Set the request headers
        }
    })
    .then(response => response.json()) // Parse the JSON response
    .then(result => {
        // Check if the response contains a token
        if (result.token) {
            // Remove any existing token from localStorage
            localStorage.removeItem("token");
            // Save the new token to localStorage
            localStorage.setItem('token', result.token);
            // Redirect to the home page
            window.location.href = "../dom/lobby.html";
        } else {
            // Log the failure message if login failed
            console.log('Login failed: ' + result.message);
        }
    })
    .catch(err => {
        // Log any errors that occur during the fetch
        console.error('Error:', err);
    });
});
