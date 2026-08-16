/* Get Cart */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/* Display Cart */

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    const emptyCart =
        document.getElementById(
            "emptyCart"
        );

    const cartSummary =
        document.getElementById(
            "cartSummary"
        );


    container.innerHTML = "";


    /* Empty Cart */

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartSummary.style.display = "none";

        return;

    }


    emptyCart.style.display = "none";

    cartSummary.style.display = "block";


    /* Display Items */

    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
            >


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity-control">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${item.id})"
            >
                Remove
            </button>

        `;


        container.appendChild(cartItem);

    });


    calculateBill();

}


/* Increase Quantity */

function increaseQuantity(foodId) {

    const item =
        cart.find(
            item =>
                item.id === foodId
        );


    if (item) {

        item.quantity++;

    }


    saveCart();

}


/* Decrease Quantity */

function decreaseQuantity(foodId) {

    const item =
        cart.find(
            item =>
                item.id === foodId
        );


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        removeItem(foodId);

        return;

    }


    saveCart();

}


/* Remove Item */

function removeItem(foodId) {

    cart =
        cart.filter(
            item =>
                item.id !== foodId
        );


    saveCart();

}


/* Save Cart */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


/* Calculate Bill */

function calculateBill() {

    let itemTotal = 0;


    cart.forEach(item => {

        itemTotal +=
            item.price *
            item.quantity;

    });


    /*
        Delivery fee:

        Free if order >= ₹500
        Otherwise ₹40
    */

    const deliveryFee =
        itemTotal >= 500
            ? 0
            : 40;


    /*
        GST / Taxes
        5%
    */

    const taxes =
        Math.round(
            itemTotal * 0.05
        );


    const total =
        itemTotal +
        deliveryFee +
        taxes;


    document.getElementById(
        "itemTotal"
    ).textContent =
        `₹${itemTotal}`;


    document.getElementById(
        "deliveryFee"
    ).textContent =
        deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`;


    document.getElementById(
        "taxes"
    ).textContent =
        `₹${taxes}`;


    document.getElementById(
        "totalAmount"
    ).textContent =
        `₹${total}`;

}


/* Checkout */

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


/* Start */

displayCart();