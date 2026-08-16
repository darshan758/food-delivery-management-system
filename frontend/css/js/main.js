const restaurants = [
    {
        id: 1,
        name: "Spice Garden",
        cuisine: "Indian, Biryani",
        rating: 4.5,
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe"
    },

    {
        id: 2,
        name: "Pizza Paradise",
        cuisine: "Pizza, Italian",
        rating: 4.3,
        deliveryTime: "30-35 min",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498"
    },

    {
        id: 3,
        name: "Burger House",
        cuisine: "Burger, Fast Food",
        rating: 4.4,
        deliveryTime: "20-25 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
        id: 4,
        name: "Dragon Bowl",
        cuisine: "Chinese, Asian",
        rating: 4.2,
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9"
    }
];


function displayRestaurants(data) {

    const container =
        document.getElementById("restaurantContainer");

    container.innerHTML = "";


    data.forEach(restaurant => {

        const card = document.createElement("div");

        card.className = "restaurant-card";


        card.innerHTML = `

            <img
                src="${restaurant.image}"
                alt="${restaurant.name}"
            >

            <div class="restaurant-info">

                <h3>
                    ${restaurant.name}
                </h3>

                <p>
                    ${restaurant.cuisine}
                </p>

                <p class="rating">
                    ⭐ ${restaurant.rating}
                </p>

                <p>
                    🕒 ${restaurant.deliveryTime}
                </p>

                <a
                    href="restaurant.html?id=${restaurant.id}"
                    class="view-menu"
                >
                    View Menu
                </a>

            </div>

        `;

        container.appendChild(card);

    });
}


function searchFood() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        restaurants.filter(restaurant =>

            restaurant.name
                .toLowerCase()
                .includes(search)

            ||

            restaurant.cuisine
                .toLowerCase()
                .includes(search)

        );


    displayRestaurants(filtered);
}


function filterCategory(category) {

    const filtered =
        restaurants.filter(restaurant =>

            restaurant.cuisine
                .toLowerCase()
                .includes(category.toLowerCase())

        );


    displayRestaurants(filtered);

}


displayRestaurants(restaurants);