const products = [
    {
        id: 1,
        name: "Hiking Jacket",
        price: 4500,
        stock: 12,
        category: "clothing"
    },
    {
        id: 2,
        name: "Outdoor T-Shirt",
        price: 1200,
        stock: 20,
        category: "clothing"
    },
    {
        id: 3,
        name: "Camping Backpack",
        price: 6500,
        stock: 8,
        category: "gear"
    },
    {
        id: 4,
        name: "Trekking Boots",
        price: 7800,
        stock: 0,
        category: "clothing"
    },
    {
        id: 5,
        name: "Camping Tent",
        price: 12000,
        stock: 5,
        category: "gear"
    },
    {
        id: 6,
        name: "Sleeping Bag",
        price: 3500,
        stock: 0,
        category: "gear"
    }
];
const productsContainer = document.getElementById("products");
const countElement = document.getElementById("count");
const searchInput = document.getElementById("search");
const filtersContainer = document.getElementById("filters");
const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");
let activeCategory = "all";
const formatPrice = (price) => {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0
    }).format(price);
};
const escapeHTML = (value) => {
    return String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[character];
    });
};
function render(items) {
    countElement.textContent =
        `${items.length} products shown`;
    if (items.length === 0) {
        productsContainer.textContent =
            "No products match your search.";

        productsContainer.classList.add("no-results");

        return;
    }
    productsContainer.classList.remove("no-results");
    const productCards = items.map((product) => {

        const {
            name,
            price,
            stock
        } = product;
        const outOfStock = stock === 0;
        const stockMessage = outOfStock
            ? "Out of stock"
            : `${stock} items available`;
        const badge = outOfStock
            ? `<span class="badge">Out of stock</span>`
            : "";
        const cardClass = outOfStock
            ? "product-card out-of-stock"
            : "product-card";
        return `
            <article class="${cardClass}">

                ${badge}

                <h2>${escapeHTML(name)}</h2>

                <p class="price">
                    ${escapeHTML(formatPrice(price))}
                </p>

                <p class="stock">
                    ${escapeHTML(stockMessage)}
                </p>

            </article>
        `;

    }).join("");
    productsContainer.innerHTML = productCards;
}
function updateProducts() {

    const query = searchInput.value.trim().toLowerCase();
    const categoryResults = products.filter((product) => {

        const { category } = product;

        return activeCategory === "all" ||
            category === activeCategory;

    });
    const searchResults = categoryResults.filter((product) => {

        const { name } = product;

        return name.toLowerCase().includes(query);
    });
    render(searchResults);
}
searchInput.addEventListener("input", () => {

    updateProducts();

});
filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button || !filtersContainer.contains(button)) {
        return;
    }
    const { category } = button.dataset;
    activeCategory = category;
    filtersContainer.querySelectorAll("button").forEach((filterButton) => {

        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);

        filterButton.setAttribute(
            "aria-pressed",
            String(isActive)
        );

    });
    updateProducts();

});
function openMenu() {

    navigation.hidden = false;

    menuButton.setAttribute("aria-expanded", "true");

}
function closeMenu(returnFocus = false) {

    navigation.hidden = true;

    menuButton.setAttribute("aria-expanded", "false");

    if (returnFocus) {
        menuButton.focus();
    }

}
menuButton.addEventListener("click", () => {

    const isExpanded =
        menuButton.getAttribute("aria-expanded") === "true";


    if (isExpanded) {

        closeMenu();

    } else {

        openMenu();

    }

});
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
    ) {

        closeMenu(true);

    }

});
navigation.addEventListener("click", (event) => {

    if (event.target.closest("a")) {

        closeMenu();

    }

});

render(products);

console.log("Gear Shop loaded successfully!");

