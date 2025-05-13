// Sample product data
const products = [
    // Electronics
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "4K Smart TV",
        price: 799.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "iPhone 13 Pro",
        price: 999.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1632661674596-79bd3e16c2bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Gaming Laptop",
        price: 1299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    // Fashion
    {
        id: 3,
        name: "Designer T-Shirt",
        price: 29.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Running Shoes",
        price: 89.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Leather Jacket",
        price: 199.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Designer Handbag",
        price: 299.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    // Home & Living
    {
        id: 4,
        name: "Modern Sofa",
        price: 599.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Coffee Table",
        price: 249.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Smart LED Lights",
        price: 49.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

// Shopping cart functionality
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const filterButtons = document.querySelectorAll('.filter-btn');
const newsletterForm = document.querySelector('.newsletter-form');

// Function to format price to UGX
function formatPrice(price) {
    // Convert USD to UGX (1 USD ≈ 3800 UGX)
    const ugxPrice = price * 3800;
    // Format with commas for thousands
    return ugxPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'UGX',
        maximumFractionDigits: 0
    });
}

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="quick-add" title="Quick Add to Cart">
                <i class="fas fa-shopping-cart"></i>
            </div>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${formatPrice(product.price)}</p>
            <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    `;
}

// Function to display products
function displayProducts(category = 'all') {
    const productGrid = document.querySelector('.product-grid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Function to add to cart with animation
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Update cart count with animation
        updateCartCount();
        updateCartDisplay();
        
        // Show success animation
        const button = document.querySelector(`.product-card[data-id="${productId}"] .add-to-cart`);
        if (button) {
            button.classList.add('added');
            setTimeout(() => {
                button.classList.remove('added');
            }, 1000);
        }
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
        
        // Animate cart icon
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.animation = 'none';
        setTimeout(() => {
            cartIcon.style.animation = 'bounce 0.5s ease';
        }, 10);
    }
}

// Function to update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotalAmount.textContent = formatPrice(0);
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}" title="Remove Item">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = formatPrice(total);
}

// Function to remove from cart with confirmation
function removeFromCart(productId) {
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        // Add deleting animation class
        cartItem.classList.add('deleting');
        
        // Wait for animation to complete
        setTimeout(() => {
            const index = cart.findIndex(item => item.id === productId);
            if (index > -1) {
                cart.splice(index, 1);
                updateCartCount();
                updateCartDisplay();
                showNotification('Item removed from cart');
            }
        }, 300);
    }
}

// Function to show delete confirmation
function showDeleteConfirmation(productId) {
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        // Create confirmation dialog
        const confirmation = document.createElement('div');
        confirmation.className = 'delete-confirmation';
        confirmation.innerHTML = `
            <p>Are you sure you want to remove this item?</p>
            <div class="delete-confirmation-buttons">
                <button class="delete-confirm-btn">Yes, Remove</button>
                <button class="delete-cancel-btn">Cancel</button>
            </div>
        `;
        
        // Add to cart item
        cartItem.appendChild(confirmation);
        setTimeout(() => confirmation.classList.add('active'), 10);
        
        // Handle confirmation
        const confirmBtn = confirmation.querySelector('.delete-confirm-btn');
        const cancelBtn = confirmation.querySelector('.delete-cancel-btn');
        
        confirmBtn.addEventListener('click', () => {
            confirmation.classList.remove('active');
            setTimeout(() => {
                confirmation.remove();
                removeFromCart(productId);
            }, 300);
        });
        
        cancelBtn.addEventListener('click', () => {
            confirmation.classList.remove('active');
            setTimeout(() => confirmation.remove(), 300);
        });
    }
}

// Function to update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartCount();
        updateCartDisplay();
    }
}

// Event listeners for cart functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.quick-add')) {
        const productCard = e.target.closest('.product-card');
        const productId = parseInt(productCard.dataset.id);
        addToCart(productId);
    }
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const productId = parseInt(e.target.closest('.remove-item').dataset.id);
        showDeleteConfirmation(productId);
    }
    if (e.target.classList.contains('quantity-btn')) {
        const productId = parseInt(e.target.dataset.id);
        const change = e.target.classList.contains('plus') ? 1 : -1;
        updateQuantity(productId, change);
    }
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
const searchIcon = document.querySelector('.search-icon');
const searchOverlay = document.querySelector('.search-overlay');
const closeSearch = document.querySelector('.close-search');
const searchInput = document.querySelector('.search-container input');

searchIcon.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Cart functionality
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');

cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('active');
    updateCartDisplay();
});

closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
});

// User dropdown functionality
const userIcon = document.querySelector('.user-icon');
const userDropdown = document.querySelector('.user-dropdown');

userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    userDropdown.classList.toggle('active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('active');
    }
    if (!cartIcon.contains(e.target) && !cartOverlay.contains(e.target)) {
        cartOverlay.classList.remove('active');
    }
});

// Category filter
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h3').textContent;
        const filteredProducts = products.filter(product => 
            product.category === category
        );
        displayFilteredProducts(filteredProducts);
    });
});

// Product filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get category from data-filter attribute
        const category = button.getAttribute('data-filter');
        // Display filtered products
        displayProducts(category);
    });
});

// Newsletter subscription
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts();
    // Setup filter buttons
    setupFilterButtons();
    updateCartCount();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effect to product cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.product-card')) {
        e.target.closest('.product-card').classList.add('hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.product-card')) {
        e.target.closest('.product-card').classList.remove('hover');
    }
});

// Function to handle filter button clicks
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Get category from data-filter attribute
            const category = button.getAttribute('data-filter');
            // Display filtered products
            displayProducts(category);
        });
    });
} 