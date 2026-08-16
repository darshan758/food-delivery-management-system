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


/* Food Menu */

const menu = [

    {
        id: 101,
        restaurantId: 1,
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with chicken and spices.",
        price: 180,
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c"
    },

    {
        id: 102,
        restaurantId: 1,
        name: "Mutton Biryani",
        description: "Tender mutton cooked with aromatic basmati rice.",
        price: 250,
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c"
    },

    {
        id: 103,
        restaurantId: 1,
        name: "Chicken 65",
        description: "Crispy spicy fried chicken.",
        price: 160,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },

    {
        id: 104,
        restaurantId: 1,
        name: "Coke",
        description: "Chilled soft drink.",
        price: 40,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e"
    },


    {
        id: 201,
        restaurantId: 2,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato, mozzarella and basil.",
        price: 220,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"
    },

    {
        id: 202,
        restaurantId: 2,
        name: "Farmhouse Pizza",
        description: "Loaded pizza with fresh vegetables.",
        price: 280,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
    },


    {
        id: 301,
        restaurantId: 3,
        name: "Classic Chicken Burger",
        description: "Juicy chicken patty with fresh vegetables.",
        price: 150,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
        id: 302,
        restaurantId: 3,
        name: "Cheese Burger",
        description: "Chicken burger with melted cheese.",
        price: 180,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },


    {
        id: 401,
        restaurantId: 4,
        name: "Chicken Noodles",
        description: "Stir fried noodles with chicken and vegetables.",
        price: 170,
        category: "Chinese",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de"
    },

    {
        id: 402,
        restaurantId: 4,
        name: "Chicken Fried Rice",
        description: "Fried rice with chicken and vegetables.",
        price: 160,
        category: "Chinese",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b"
    }

];


/* Get Restaurant ID */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const restaurantId =
    Number(
        urlParams.get("id")
    );


/* Find Restaurant */

const restaurant =
    restaurants.find(
        restaurant =>
            restaurant.id === restaurantId
    );


/* Display Restaurant */

function displayRestaurant() {

    const container =
        document.getElementById(
            "restaurantDetails"
        );


    if (!restaurant) {

        container.innerHTML = `
        
            <h2>
                Restaurant not found
            </h2>

            <a href="restaurants.html">
                Back to Restaurants
            </a>

        `;

        return;
    }


    container.innerHTML = `

        <div class="restaurant-details">

            <img
                src="${restaurant.image}"
                alt="${restaurant.name}"
            >

            <div>

                <h1>
                    ${restaurant.name}
                </h1>

                <p>
                    ${restaurant.cuisine}
                </p>

                <p class="rating">
                    ⭐ ${restaurant.rating}
                </p>

                <p>
                    🕒 ${restaurant.deliveryTime} minutes
                </p>

            </div>

        </div>

    `;

}


/* Display Menu */

function displayMenu() {

    const container =
        document.getElementById(
            "menuContainer"
        );


    const restaurantFoods =
        menu.filter(
            food =>
                food.restaurantId === restaurantId
        );


    container.innerHTML = "";


    restaurantFoods.forEach(food => {

        const foodCard =
            document.createElement("div");


        foodCard.className =
            "food-card";


        foodCard.innerHTML = `

            <div class="food-info">

                <h3>
                    ${food.name}
                </h3>

                <p>
                    ${food.description}
                </p>

                <h4>
                    ₹${food.price}
                </h4>

                <span class="food-category">
                    ${food.category}
                </span>

            </div>

            <div class="food-image-container">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

                <button
                    onclick="addToCart(${food.id})"
                >
                    Add
                </button>

            </div>

        `;


        container.appendChild(foodCard);

    });

}


/* Add Food to Cart */

function addToCart(foodId) {

    const food =
        menu.find(
            item =>
                item.id === foodId
        );


    if (!food) {
        return;
    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingItem =
        cart.find(
            item =>
                item.id === foodId
        );


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            id: food.id,

            restaurantId:
                food.restaurantId,

            name: food.name,

            price: food.price,

            image: food.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        `${food.name} added to cart!`
    );

}


/* Start */

displayRestaurant();

displayMenu();