let registerButton = document.getElementById("btn-registrar");

registerButton.addEventListener("click", () => {
    let userData = {
        username: document.getElementById("nombreUsuario").value,
        contrasena: document.getElementById("password").value,
        contrasena_repetida: document.getElementById("repeatPassword").value,
        rfc: document.getElementById("rfc").value,
        mobile: document.getElementById("celular").value,
        street: document.getElementById("address").value,
    };

    console.log(userData); 

    fetch("http://localhost:3000/register", {
        method: "POST", // HTTP method
        body: JSON.stringify(userData), // Convert the user data object to a JSON string
        headers: {
            "Content-Type": "application/json; charset=UTF-8" // Set the content type to JSON
        }
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            window.location.href = "../dom/register.html";
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        if (response.status === 201) {
            //window.location.href = "../dom/register.html";
        }
        return response.json(); 
    })
    .catch(error => {
        console.error('Error:', error); 
    });
});
