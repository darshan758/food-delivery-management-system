const API_URL = "http://localhost:5000/api";

let restaurants = [];

let currentFilter = "all";


// ================================
// LOAD RESTAURANTS FROM API
// ================================

async function loadRestaurants() {

    try {

        const response =
            await fetch(`${API_URL}/restaurants`);

        if (!response.ok) {
            throw new Error("Failed to load restaurants");
        }

        restaurants = await response.json();

        displayRestaurants();

    } catch (error) {

        console.error(
            "Error loading restaurants:",
            error
        );

        const container =
            document.getElementById("allRestaurants");

        container.innerHTML = `
            <p>
                Unable to load restaurants.
                Please make sure the backend is running.
            </p>
        `;

    }
}


// ================================
// DISPLAY RESTAURANTS
// ================================

function displayRestaurants() {

    const container =
        document.getElementById("allRestaurants");

    const noResults =
        document.getElementById("noResults");

    const searchInput =
        document.getElementById("restaurantSearch");


    if (!container) {
        return;
    }


    const searchText =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    let filteredRestaurants =
        restaurants.filter(restaurant => {

            // Search

            const matchesSearch =
                restaurant.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                restaurant.cuisine
                    .toLowerCase()
                    .includes(searchText);


            if (!matchesSearch) {
                return false;
            }


            // Filters

            if (currentFilter === "rating") {

                return Number(
                    restaurant.rating
                ) >= 4;

            }


            if (currentFilter === "pizza") {

                return restaurant.cuisine
                    .toLowerCase()
                    .includes("pizza");

            }


            if (currentFilter === "burger") {

                return restaurant.cuisine
                    .toLowerCase()
                    .includes("burger");

            }


            if (currentFilter === "biryani") {

                return restaurant.cuisine
                    .toLowerCase()
                    .includes("biryani");

            }


            return true;

        });


    // ============================
    // SORTING
    // ============================

    const sortValue =
        document.getElementById(
            "sortRestaurants"
        )?.value;


    if (sortValue === "rating") {

        filteredRestaurants.sort(
            (a, b) =>
                Number(b.rating) -
                Number(a.rating)
        );

    }


    if (sortValue === "delivery") {

        filteredRestaurants.sort(
            (a, b) =>
                Number(a.delivery_time) -
                Number(b.delivery_time)
        );

    }


    // ============================
    // NO RESULTS
    // ============================

    if (filteredRestaurants.length === 0) {

        container.innerHTML = "";

        if (noResults) {
            noResults.style.display = "block";
        }

        return;

    }


    if (noResults) {
        noResults.style.display = "none";
    }


    // ============================
    // CREATE CARDS
    // ============================

    container.innerHTML = "";


    filteredRestaurants.forEach(
        restaurant => {

            const card =
                document.createElement("div");


            card.className =
                "restaurant-card";


            card.innerHTML = `

                <img
                    src="${restaurant.image}"
                    alt="${restaurant.name}"
                >

                <div class="restaurant-info">

                    <h2>
                        ${restaurant.name}
                    </h2>

                    <p class="cuisine">
                        ${restaurant.cuisine}
                    </p>

                    <div class="restaurant-meta">

                        <span>
                            ⭐ ${restaurant.rating}
                        </span>

                        <span>
                            🕒 ${restaurant.delivery_time} mins
                        </span>

                    </div>

                    <button
                        class="view-menu-btn"
                        onclick="viewRestaurant(${restaurant.id})"
                    >
                        View Menu
                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


// ================================
// SEARCH
// ================================

const searchInput =
    document.getElementById(
        "restaurantSearch"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayRestaurants
    );

}


// ================================
// FILTER
// ================================

function filterRestaurants(filter) {

    currentFilter = filter;


    // Remove active class

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    // Find clicked button

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(button => {

        const text =
            button.textContent
                .toLowerCase();


        if (
            (filter === "all" &&
                text.includes("all"))

            ||

            (filter === "rating" &&
                text.includes("rating"))

            ||

            (filter === "pizza" &&
                text.includes("pizza"))

            ||

            (filter === "burger" &&
                text.includes("burger"))

            ||

            (filter === "biryani" &&
                text.includes("biryani"))
        ) {

            button.classList.add(
                "active"
            );

        }

    });


    displayRestaurants();

}


// ================================
// SORT
// ================================

const sortSelect =
    document.getElementById(
        "sortRestaurants"
    );


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        displayRestaurants
    );

}


// ================================
// OPEN RESTAURANT MENU
// ================================

function viewRestaurant(id) {

    window.location.href =
        `restaurant.html?id=${id}`;

}


// ================================
// INITIAL LOAD
// ================================

document.addEventListener(
    "DOMContentLoaded",
    loadRestaurants
);