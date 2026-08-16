const restaurants = [

    {
        id: 1,
        name: "Spice Garden",
        cuisine: "Indian, Biryani",
        rating: 4.5,
        deliveryTime: 25,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe"
    },

    {
        id: 2,
        name: "Pizza Paradise",
        cuisine: "Pizza, Italian",
        rating: 4.3,
        deliveryTime: 30,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498"
    },

    {
        id: 3,
        name: "Burger House",
        cuisine: "Burger, Fast Food",
        rating: 4.4,
        deliveryTime: 20,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
        id: 4,
        name: "Dragon Bowl",
        cuisine: "Chinese, Asian",
        rating: 4.2,
        deliveryTime: 25,
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9"
    },

    {
        id: 5,
        name: "Royal Biryani",
        cuisine: "Biryani, Indian",
        rating: 4.7,
        deliveryTime: 30,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c"
    },

    {
        id: 6,
        name: "Burger Point",
        cuisine: "Burger, Fast Food",
        rating: 4.1,
        deliveryTime: 18,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    }

];


let currentRestaurants = restaurants;


/* Display Restaurants */

function displayRestaurants(data) {

    const container =
        document.getElementById("allRestaurants");

    const noResults =
        document.getElementById("noResults");


    container.innerHTML = "";


    if (data.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    data.forEach(restaurant => {

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
                    🕒 ${restaurant.deliveryTime} min
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


/* Search */

document
    .getElementById("restaurantSearch")
    .addEventListener("input", function () {

        const search =
            this.value
                .toLowerCase()
                .trim();


        const filtered =
            restaurants.filter(restaurant => {

                return (

                    restaurant.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    restaurant.cuisine
                        .toLowerCase()
                        .includes(search)

                );

            });


        currentRestaurants = filtered;

        displayRestaurants(filtered);

    });


/* Filter */

function filterRestaurants(type) {

    let filtered;


    if (type === "all") {

        filtered = restaurants;

    }

    else if (type === "rating") {

        filtered =
            restaurants.filter(
                restaurant =>
                    restaurant.rating >= 4
            );

    }

    else {

        filtered =
            restaurants.filter(
                restaurant =>
                    restaurant.cuisine
                        .toLowerCase()
                        .includes(type)
            );

    }


    currentRestaurants = filtered;

    displayRestaurants(filtered);


    /* Active button */

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    event.target.classList.add("active");

}


/* Sorting */

document
    .getElementById("sortRestaurants")
    .addEventListener("change", function () {

        const sortType = this.value;


        let sorted =
            [...currentRestaurants];


        if (sortType === "rating") {

            sorted.sort(
                (a, b) =>
                    b.rating - a.rating
            );

        }


        else if (sortType === "delivery") {

            sorted.sort(
                (a, b) =>
                    a.deliveryTime -
                    b.deliveryTime
            );

        }


        displayRestaurants(sorted);

    });


/* Initial Display */

displayRestaurants(restaurants);