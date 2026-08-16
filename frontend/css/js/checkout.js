/* Get Cart */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/* Check Cart */

if (cart.length === 0) {

    alert("Your cart is empty.");

    window.location.href =
        "restaurants.html";

}


/* Display Checkout Items */

function displayCheckoutItems() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    container.innerHTML = "";


    cart.forEach(item => {

        const itemElement =
            document.createElement("div");


        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <strong>
                ₹${item.price * item.quantity}
            </strong>

        `;


        container.appendChild(
            itemElement
        );

    });

}


/* Calculate Bill */

function calculateCheckoutTotal() {

    let itemTotal = 0;


    cart.forEach(item => {

        itemTotal +=
            item.price *
            item.quantity;

    });


    /*
        Delivery fee

        Orders ₹500 or above
        → Free delivery

        Below ₹500
        → ₹40
    */

    const deliveryFee =
        itemTotal >= 500
            ? 0
            : 40;


    /*
        5% tax
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
        "checkoutItemTotal"
    ).textContent =
        `₹${itemTotal}`;


    document.getElementById(
        "checkoutDeliveryFee"
    ).textContent =
        deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`;


    document.getElementById(
        "checkoutTaxes"
    ).textContent =
        `₹${taxes}`;


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        `₹${total}`;


    return {
        itemTotal,
        deliveryFee,
        taxes,
        total
    };

}


/* Validate Phone */

function validatePhone(phone) {

    return /^[0-9]{10}$/.test(phone);

}


/* Validate Pincode */

function validatePincode(pincode) {

    return /^[0-9]{6}$/.test(pincode);

}


/* Place Order */

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* Get Form Data */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    .value
                    .trim();


            const pincode =
                document
                    .getElementById("pincode")
                    .value
                    .trim();


            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            /* Validate Phone */

            if (!validatePhone(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }


            /* Validate Pincode */

            if (!validatePincode(pincode)) {

                alert(
                    "Please enter a valid 6-digit pincode."
                );

                return;

            }


            /* Calculate Total */

            const bill =
                calculateCheckoutTotal();


            /* Create Order */

            const order = {

                id:
                    "ORD" +
                    Date.now(),

                customer: {

                    name: name,

                    phone: phone,

                    address: address,

                    city: city,

                    pincode: pincode

                },

                items: cart,

                itemTotal:
                    bill.itemTotal,

                deliveryFee:
                    bill.deliveryFee,

                taxes:
                    bill.taxes,

                total:
                    bill.total,

                paymentMethod:
                    payment,

                status:
                    "Placed",

                createdAt:
                    new Date()
                        .toISOString()

            };


            /* Get Existing Orders */

            let orders =
                JSON.parse(
                    localStorage.getItem(
                        "orders"
                    )
                ) || [];


            /* Add New Order */

            orders.push(order);


            /* Save Orders */

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );


            /* Clear Cart */

            localStorage.removeItem(
                "cart"
            );


            /* Success */

            alert(
                `Order placed successfully!\n\nOrder ID: ${order.id}`
            );


            /* Go to Orders */

            window.location.href =
                "orders.html";

        });


/* Start */

displayCheckoutItems();

calculateCheckoutTotal();