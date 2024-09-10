const div = document.getElementById("productos");
if (!localStorage.getItem("token")) {
    location.href = "../dom/index.html";
}

const listProducts = () => {
    let data = JSON.parse(localStorage.getItem("cartItems"));
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let newCard = `
            <div class="product-card">
                <h4 class="product-name">${data[i].name.replace(/-/g, " ")}</h4>
                <p class="product-quantity">Quantity: ${data[i].quantity}</p>
            </div>
        `;
        div.innerHTML += newCard;
    }
};

let btn = document.getElementById("comprar");
btn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("cartItems"));
    let token = localStorage.getItem("token");
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const day = String(now.getDate()).padStart(2, '0');
    const mysqlDate = `${year}-${month}-${day}`;
    if (data.length > 0 && token) {
        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                products: data,
                orderDate: mysqlDate
            })
        })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                localStorage.removeItem("cartItems");
                console.log("Purchase successful");
                location.href = "../dom/sell.html";
            } else {
                console.log("An error occurred");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

listProducts();
