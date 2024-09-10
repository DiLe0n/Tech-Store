if (!localStorage.getItem("token")) {
    window.location.href = "../dom/index.html";
}

const displayProducts = () => {
    let productContainer = document.getElementById("products");
    let authToken = localStorage.getItem("token");

    if (!authToken) {
        console.error("Token not found in localStorage");
        return;
    }

    // Fetch products from the server
    fetch("http://localhost:3000/products", {
        headers: {
            "Authorization": `Bearer ${authToken}` 
        }
    })
    .then(response => response.json()) // Parse the JSON response
    .then(products => {
        console.log(products);
        products.forEach(product => {
            // Create product card HTML
            let productHTML = `
                <div class="product-card" data-id="${product.id}">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price" id="${product.price}">Price: ${product.price} USD</p>
                    <p class="product-stock">Stock: ${product.stock}</p>
                    <input type="number" class="product-quantity" value="1" min="1">
                    <button class="btn-add-cart" type="button">Add to Cart</button>
                </div>
            `;
            // Append product card to the container
            productContainer.innerHTML += productHTML;
        });
        // Attach event listeners to the "Add to Cart" buttons
        setupCartButtons();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
};

// Function to set up event listeners on "Add to Cart" buttons
const setupCartButtons = () => {
    const addButtons = document.querySelectorAll('.btn-add-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productQuantity = parseInt(productCard.querySelector('.product-quantity').value);
            const productPrice = parseInt(productCard.querySelector('.product-price').id);

            const product = {
                name: productName.replace(/ /g, "-"),
                quantity: productQuantity,
                price: productPrice
            };
            console.log(product);

            addToCart(product, 'cartItems');
        });
    });
};

// Function to save an array to localStorage
const saveToLocalStorage = (array, key) => {
    localStorage.setItem(key, JSON.stringify(array));
};

// Function to get an array from localStorage
const loadFromLocalStorage = (key) => {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : [];
};

// Function to add a product to the cart in localStorage
const addToCart = (product, key) => {
    const cartItems = loadFromLocalStorage(key);

    const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        cartItems[existingProductIndex].quantity += product.quantity;
    } else {
        cartItems.push(product);
    }

    saveToLocalStorage(cartItems, key);
};

// Event listener for the search button
document.getElementById("btn-buscar").addEventListener("click", () => {
    let productContainer = document.getElementById("products");
    let authToken = localStorage.getItem("token");
    let searchQuery = document.getElementById("txt-buscar").value;
    //let formattedSearch = searchQuery.replace(/ /g, "-");

    fetch(`http://localhost:3000/products/${searchQuery}`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(searchResults => {
        productContainer.innerHTML = "";
        searchResults.forEach(product => {
            let productCard = `
                <div class="product-card" data-id="${product.id}">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price">Price: ${product.price} USD</p>
                    <p class="product-stock">Stock: ${product.stock}</p>
                    <input type="number" class="product-quantity" value="1" min="1">
                    <button class="btn-add-cart" type="button">Add to Cart</button>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });
        setupCartButtons();
    })
    .catch(error => {
        console.error('Error searching products:', error);
    });
});

// Call the function to list products initially
displayProducts();
