const API_URL = "http://localhost:5000/api";


// Get restaurant ID from URL

const params =
    new URLSearchParams(window.location.search);

const restaurantId =
    params.get("id");


// ======================================
// LOAD RESTAURANT
// ======================================

async function loadRestaurant() {

    if (!restaurantId) {

        console.error(
            "Restaurant ID is missing from URL"
        );

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/restaurants/${restaurantId}`
            );


        if (!response.ok) {

            throw new Error(
                "Restaurant not found"
            );

        }


        const restaurant =
            await response.json();


        // Restaurant name

        const name =
            document.getElementById(
                "restaurantName"
            );

        if (name) {

            name.textContent =
                restaurant.name;

        }


        // Cuisine

        const cuisine =
            document.getElementById(
                "restaurantCuisine"
            );

        if (cuisine) {

            cuisine.textContent =
                restaurant.cuisine;

        }


        // Rating

        const rating =
            document.getElementById(
                "restaurantRating"
            );

        if (rating) {

            rating.textContent =
                `⭐ ${restaurant.rating}`;

        }


        // Load food

        loadFoods();

    } catch (error) {

        console.error(
            "Restaurant loading error:",
            error
        );

    }

}


// ======================================
// LOAD FOOD ITEMS
// ======================================

async function loadFoods() {

    const container =
        document.getElementById(
            "foodContainer"
        );


    if (!container) {

        console.error(
            "foodContainer not found"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/foods/restaurant/${restaurantId}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load food items"
            );

        }


        const foods =
            await response.json();


        container.innerHTML = "";


        if (foods.length === 0) {

            container.innerHTML = `
                <p>
                    No food items available.
                </p>
            `;

            return;

        }


        foods.forEach(food => {

            const card =
                document.createElement("div");


            card.className =
                "food-card";


            card.innerHTML = `

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

                <div class="food-info">

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        ${food.description || ""}
                    </p>

                    <p>
                        ₹${food.price}
                    </p>

                    <button
                        onclick="addFoodToCart(
                            ${food.id},
                            '${escapeQuotes(food.name)}',
                            ${food.price},
                            '${escapeQuotes(food.image || "")}'
                        )"
                    >
                        Add to Cart
                    </button>

                </div>

            `;


            container.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Food loading error:",
            error
        );

        container.innerHTML = `
            <p>
                Unable to load food items.
            </p>
        `;

    }

}


// ======================================
// ESCAPE TEXT FOR HTML
// ======================================

function escapeQuotes(value) {

    return value
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, "&quot;");

}


// ======================================
// ADD TO CART
// ======================================

function addFoodToCart(
    id,
    name,
    price,
    image
) {

    const existingCart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingItem =
        existingCart.find(
            item => item.id === id
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        existingCart.push({

            id: id,

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(existingCart)
    );


    alert(
        `${name} added to cart!`
    );

}


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    loadRestaurant
);