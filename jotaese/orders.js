// Function to fetch and display orders
/*const fetchOrders = () => {
    // Retrieve the token from localStorage
    let token = localStorage.getItem("token");
    // Get the div where orders will be displayed
    let ordersDiv = document.getElementById("pedidos");

    fetch("http://localhost:3000/orders", {
        headers: {
            "Authorization": `Bearer ${token}` // Set the Authorization header with the token
        }
    })
    .then((response) => response.json()) // Parse the JSON response
    .then((orders) => {
        console.log(orders);
        // Group orders by invoice ID
        const groupedOrders = groupByInvoiceId(orders[0]);
        console.log(groupedOrders);

        // Iterate over each grouped order
        groupedOrders.forEach(order => {
            let productsHTML = '';
            order.products.forEach(product => {
                // Generate HTML for each product
                productsHTML += `
                    <div class="producto">
                        <p class="product-name">${product.product}</p>
                        <p class="product-quantity">Cant: ${product.quantity}</p>
                        <p class="product-price">${product.price} USD</p>
                        <p class="product-total">Total: ${product.total} USD</p>
                    </div>
                `;
            });

            // Generate HTML for the order card
            let orderCard = `
                <div class="pedido-card" id="pedido-${order.invoiceId}">
                    <h4 class="total">Total: ${calculateTotal(order)} USD</h4>
                    <p class="fecha">Fecha: ${formatDate(order.date)}</p>
                    <div class="productos">
                        ${productsHTML}
                    </div>
                </div>
            `;
            // Append the order card to the orders div
            ordersDiv.innerHTML += orderCard;
        });
    });
}

// Function to group orders by invoice ID
function groupByInvoiceId(orders) {
    const groupedOrders = {};

    orders.forEach(order => {
        const { idfactura, fecha, producto, cantidad, precio, total } = order;
        
        if (!groupedOrders[idfactura]) {
            groupedOrders[idfactura] = {
                invoiceId: idfactura,
                date: new Date(fecha),
                products: []
            };
        }

        groupedOrders[idfactura].products.push({
            product: producto,
            quantity: cantidad,
            price: precio,
            total: total
        });
    });

    return Object.values(groupedOrders);
}

// Function to calculate the total for an order
const calculateTotal = (order) => {
    let total = 0;

    order.products.forEach(product => {
        total += parseFloat(product.total);
    });

    return total;
}

// Function to format a date
function formatDate(date) {
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Call the fetchOrders function to initiate the process
fetchOrders();
*/
let token = localStorage.getItem("token");

fetch('http://localhost:3000/orders',
    {
        headers:
        {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(order =>
    {
        for (let i = 0; i < order.length; i++)
        {
            let newProduct =
            `
                <div class="product-item">
                    <h4 class="product-name">Fecha: ${order[i].order_date}</span>
                    <h4 class="product-name">Total: $${order[i].total_amount}</span>
                </div>
            `;
            idTemp = order[i].id;
            fetch(`http://localhost:3000/orders/items/${order[i].id}`,
            {
                headers:
                {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(items =>
            {
                console.log(items);
                for (let j = 0; j < items.length; j++)
                {
                    newProduct +=
                    `
                        <div class="product-item">
                            <span class="product-name">${items[j].name}</span>
                            <span class="product-quantity">Cant: ${items[j].quantity}</span>
                            <span class="product-price">$${items[j].price}</span>
                            <span class="product-price">Total: ${items[j].price * items[j].quantity} USD</span>
                        </div>
                    `;
                }
                document.getElementById("pedidos").innerHTML += newProduct;
            });
        }
    });