/* Get Orders */

let orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];


/* Display Orders */

function displayOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );

    const emptyOrders =
        document.getElementById(
            "emptyOrders"
        );


    container.innerHTML = "";


    /* No Orders */

    if (orders.length === 0) {

        emptyOrders.style.display =
            "block";

        return;

    }


    emptyOrders.style.display =
        "none";


    /*
        Show newest order first
    */

    const sortedOrders =
        [...orders].reverse();


    sortedOrders.forEach(order => {

        const orderCard =
            document.createElement("div");


        orderCard.className =
            "order-card";


        /* Format Date */

        const orderDate =
            new Date(
                order.createdAt
            );


        const formattedDate =
            orderDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        const formattedTime =
            orderDate.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        /* Items */

        let itemsHTML = "";


        order.items.forEach(item => {

            itemsHTML += `

                <div class="order-item">

                    <div>

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ₹${item.price}
                            ×
                            ${item.quantity}
                        </p>

                    </div>

                    <strong>
                        ₹${item.price * item.quantity}
                    </strong>

                </div>

            `;

        });


        /* Order Card */

        orderCard.innerHTML = `

            <div class="order-top">

                <div>

                    <h3>
                        Order #${order.id}
                    </h3>

                    <p>
                        ${formattedDate}
                        at
                        ${formattedTime}
                    </p>

                </div>


                <span class="order-status">

                    ${order.status}

                </span>

            </div>


            <div class="order-items">

                ${itemsHTML}

            </div>


            <div class="order-bottom">


                <div class="order-payment">

                    <p>
                        Payment
                    </p>

                    <strong>
                        ${getPaymentName(
                            order.paymentMethod
                        )}
                    </strong>

                </div>


                <div class="order-total">

                    <p>
                        Total
                    </p>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>

            </div>

        `;


        container.appendChild(
            orderCard
        );

    });

}


/* Payment Name */

function getPaymentName(method) {

    if (method === "COD") {

        return "💵 Cash on Delivery";

    }


    if (method === "UPI") {

        return "📱 UPI";

    }


    if (method === "CARD") {

        return "💳 Card";

    }


    return method;

}


/* Start */

displayOrders();