/**
 * Paloty Hair E-commerce Application
 * Handles product display, shopping cart, and checkout functionality
 */

// ========== CONSTANTS ==========
const PAYSTACK_KOBO_MULTIPLIER = 100;
const NOTIFICATION_DURATION = 3000;
const NOTIFICATION_FADE_DURATION = 300;
const CART_STORAGE_KEY = 'wigshopCart';

/**
 * Product icons - Professional SVG icons for cart items
 * Maps icon keys to SVG illustrations representing hair products
 */
const stickerSVGs = {
    'straight': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" /><stop offset="100%" style="stop-color:#34495e;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="25" r="12" fill="#e8a87c"/><path d="M38 37 Q38 40 42 45 L42 70 Q42 75 45 78 L45 85 Q45 88 50 88 Q55 88 55 85 L55 78 Q58 75 58 70 L58 45 Q62 40 62 37" fill="url(#hairGrad1)" stroke="#000" stroke-width="0.5"/><path d="M40 45 L40 70 M50 45 L50 75 M60 45 L60 70" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/></svg>',
    'wave': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6b4423;stop-opacity:1" /><stop offset="100%" style="stop-color:#8b5a2b;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="22" r="11" fill="#e8a87c"/><path d="M38 33 Q35 38 35 45 Q35 55 40 65 Q42 72 45 78 L45 85 Q45 88 50 88 Q55 88 55 85 L55 78 Q58 72 60 65 Q65 55 65 45 Q65 38 62 33" fill="url(#hairGrad2)" stroke="#000" stroke-width="0.5"/><path d="M40 50 Q42 55 42 62 M50 48 Q52 56 52 65 M60 50 Q58 55 58 62" stroke="#1a1a1a" stroke-width="0.3" opacity="0.4"/></svg>',
    'lace': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#3d2817;stop-opacity:1" /><stop offset="100%" style="stop-color:#5a3a1a;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="20" r="10" fill="#e8a87c"/><path d="M35 30 L35 70 Q35 80 50 85 Q65 80 65 70 L65 30" fill="url(#hairGrad3)" stroke="#000" stroke-width="0.5"/><circle cx="42" cy="40" r="2" fill="#daa520" opacity="0.6"/><circle cx="50" cy="38" r="2" fill="#daa520" opacity="0.6"/><circle cx="58" cy="40" r="2" fill="#daa520" opacity="0.6"/><circle cx="40" cy="55" r="1.5" fill="#daa520" opacity="0.5"/><circle cx="50" cy="53" r="1.5" fill="#daa520" opacity="0.5"/><circle cx="60" cy="55" r="1.5" fill="#daa520" opacity="0.5"/></svg>',
    'curly': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" /><stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="22" r="11" fill="#e8a87c"/><circle cx="38" cy="35" r="8" fill="url(#hairGrad4)" stroke="#000" stroke-width="0.3"/><circle cx="50" cy="32" r="9" fill="url(#hairGrad4)" stroke="#000" stroke-width="0.3"/><circle cx="62" cy="35" r="8" fill="url(#hairGrad4)" stroke="#000" stroke-width="0.3"/><circle cx="40" cy="48" r="7" fill="url(#hairGrad4)" stroke="#000" stroke-width="0.3"/><circle cx="60" cy="48" r="7" fill="url(#hairGrad4)" stroke="#000" stroke-width="0.3"/><circle cx="50" cy="62" r="8" fill="url(#hairGrad4)" stroke="#000" stroke-width="0.3"/></svg>',
    'volume': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#5c4033;stop-opacity:1" /><stop offset="100%" style="stop-color:#795548;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="20" r="10" fill="#e8a87c"/><path d="M30 32 Q25 45 30 65 Q35 78 50 82 Q65 78 70 65 Q75 45 70 32 Q65 25 50 28 Q35 25 30 32 Z" fill="url(#hairGrad5)" stroke="#000" stroke-width="0.5"/><ellipse cx="38" cy="50" rx="5" ry="12" fill="#6d4c41" opacity="0.5"/><ellipse cx="62" cy="50" rx="5" ry="12" fill="#6d4c41" opacity="0.5"/></svg>',
    'star': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" /><stop offset="100%" style="stop-color:#16213e;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="18" r="9" fill="#e8a87c"/><path d="M35 30 L32 70 Q32 80 50 85 Q68 80 68 70 L65 30" fill="url(#hairGrad6)" stroke="#000" stroke-width="0.5"/><polygon points="50,35 53,45 64,45 55,52 58,62 50,56 42,62 45,52 36,45 47,45" fill="#ffd700"/></svg>',
    'heart': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#c41e3a;stop-opacity:1" /><stop offset="100%" style="stop-color:#9d1b2c;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="20" r="10" fill="#e8a87c"/><path d="M35 32 Q35 40 42 48 L50 56 L58 48 Q65 40 65 32 Q65 25 58 25 Q50 32 50 32 Q50 32 42 25 Q35 25 35 32 Z" fill="url(#hairGrad7)" stroke="#000" stroke-width="0.5"/><path d="M38 50 L38 75 Q40 82 50 85 Q60 82 62 75 L62 50" fill="#8b3a62" stroke="#000" stroke-width="0.5"/></svg>',
    'princess': '<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hairGrad8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8b7355;stop-opacity:1" /><stop offset="100%" style="stop-color:#a0826d;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="18" r="10" fill="#e8a87c"/><polygon points="35,15 38,8 42,15 45,8 50,15 55,8 58,15 62,8 65,15 65,32 35,32" fill="#daa520"/><path d="M35 32 Q35 50 40 70 Q42 78 50 82 Q58 78 60 70 Q65 50 65 32" fill="url(#hairGrad8)" stroke="#000" stroke-width="0.5"/></svg>'
};

/**
 * Get SVG icon for a product
 * @param {string} iconKey - The icon key
 * @returns {string} SVG markup string
 */
function getStickerSVG(iconKey) {
    return stickerSVGs[iconKey] || stickerSVGs['volume'];
}

// ========== PRODUCT DATA ==========
/**
 * Product catalog - Hair wigs and extensions
 * Each product includes id, name, price (in Naira), and icon key
 */
const products = [
    { id: 1, name: 'Peruvian Straight 10"', price: 35000, emoji: 'straight', description: 'Soft, smooth, and natural shine with a lightweight feel.' },
    { id: 2, name: 'Brazilian Body Wave 12"', price: 42000, emoji: 'wave', description: 'Voluminous body waves with excellent bounce and hold.' },
    { id: 3, name: 'Lace Frontal 13x4', price: 65000, emoji: 'lace', description: 'Edge-to-edge hairline with full versatility and blend.' },
    { id: 4, name: 'Malaysian Curly 14"', price: 48000, emoji: 'curly', description: 'Defined curls that stay frizz-free and soft in humidity.' },
    { id: 5, name: 'Indian Raw Hair 16"', price: 58000, emoji: 'volume', description: 'Premium raw texture with lasting strength and softness.' },
    { id: 6, name: '360 Lace Wig', price: 85000, emoji: 'star', description: 'Full 360-degree lace for maximum styling freedom.' },
    { id: 7, name: 'Bob Wig Short', price: 32000, emoji: 'heart', description: 'Easy daily style with sleek, contemporary finish.' },
    { id: 8, name: 'Full Lace Wig', price: 95000, emoji: 'princess', description: 'Luxury full-lace design for natural parting and styling.' }
];

// ========== CART STATE ==========
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

// ========== UTILITY FUNCTIONS ==========
/**
 * Detect device platform and apply responsive grid layout
 * Adds 'android' or 'ios' class to body and forces two-column grid on mobile
 */
function detectPlatformAndForceGrid() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(ua)) {
        document.body.classList.add('android', 'force-two');
    }
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        document.body.classList.add('ios', 'force-two');
    }
}

// ========== INITIALIZATION ==========
/**
 * Initialize application on DOM ready
 * Sets up event listeners and renders initial state
 */
document.addEventListener('DOMContentLoaded', function () {
    // Hide page loader
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
    }

    // Check for first visit and show welcome modal
    if (!localStorage.getItem('palotyWelcomeShown')) {
        setTimeout(() => showWelcomeModal(), 1000); // Delay to let page load
    }

    // Initialize app
    detectPlatformAndForceGrid();
    renderProducts(products); // Pass full products initially
    updateCartCount();

    // Setup event listeners
    setupEventListeners();

    // Close cart modal when clicking outside
    document.getElementById('cartModal').addEventListener('click', function (e) {
        if (e.target === this) {
            toggleCart();
        }
    });
});

/**
 * Setup all button and interactive element event listeners
 */
function setupEventListeners() {
    document.getElementById('cartIconBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCartBtn').addEventListener('click', toggleCart);
    document.getElementById('shopNowBtn').addEventListener('click', scrollToProducts);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    const quickClose = document.getElementById('quickViewClose');
    if (quickClose) quickClose.addEventListener('click', closeQuickView);

    const quickOverlay = document.getElementById('quickViewOverlay');
    if (quickOverlay) {
        quickOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeQuickView();
            }
        });
    }

    // Success modal event listener
    const successCloseBtn = document.getElementById('successCloseBtn');
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessModal);

    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeSuccessModal();
            }
        });
    }

    // Welcome modal event listeners
    const welcomeCloseBtn = document.getElementById('welcomeCloseBtn');
    if (welcomeCloseBtn) welcomeCloseBtn.addEventListener('click', closeWelcomeModal);

    const welcomeStartBtn = document.getElementById('welcomeStartBtn');
    if (welcomeStartBtn) welcomeStartBtn.addEventListener('click', function () {
        closeWelcomeModal();
        scrollToProducts();
    });

    const welcomeModal = document.getElementById('welcomeModal');
    if (welcomeModal) {
        welcomeModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeWelcomeModal();
            }
        });
    }

    // Search and filter event listeners
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    minPriceInput.addEventListener('input', applyFilters);
    maxPriceInput.addEventListener('input', applyFilters);
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });
}

/**
 * Apply search, filter, and sort to products and re-render
 */
function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesFilter = activeFilter === 'all' || product.emoji === activeFilter;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesSearch && matchesFilter && matchesPrice;
    });

    // Apply sorting
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default order (by id)
            filteredProducts.sort((a, b) => a.id - b.id);
            break;
    }

    renderProducts(filteredProducts);
}

// ========== PRODUCT RENDERING ==========
/**
 * Render all products to the grid
 * Dynamically creates product cards and attaches event listeners
 * @param {Array} productList - Array of products to render
 */
function renderProducts(productList = products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = productList.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">${getStickerSVG(product.emoji)}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">₦${product.price.toLocaleString()}</div>
                <button class="add-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Attach click listeners to all add-to-cart buttons
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });

    // Attach click listeners to product cards for quick view
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                openQuickView(product);
            }
        });
    });
}

function openQuickView(product) {
    const overlay = document.getElementById('quickViewOverlay');
    const viewBody = document.getElementById('quickViewBody');
    let selectedQuantity = 1;

    viewBody.innerHTML = `
        <div class="quick-content">
            <div class="quick-content-image">${getStickerSVG(product.emoji)}</div>
            <div class="qv-body">
                <h2>${product.name}</h2>
                <p class="quick-price">₦${product.price.toLocaleString()}</p>
                <p class="quick-description">${product.description}</p>
                <div class="quick-quantity">
                    <button id="quickQtyMinus" class="qty-btn">−</button>
                    <span id="quickQtyCount">${selectedQuantity}</span>
                    <button id="quickQtyPlus" class="qty-btn">+</button>
                </div>
                <div class="quick-actions">
                    <button id="quickAddToCart" class="add-btn" data-product-id="${product.id}">Add to Cart</button>
                    <button class="checkout-btn" id="quickCheckoutBtn">Proceed to WhatsApp</button>
                </div>
                <button class="share-btn" id="quickShareBtn">Share product</button>
            </div>
        </div>
    `;

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');

    const qtyCountElement = document.getElementById('quickQtyCount');
    const qtyMinusBtn = document.getElementById('quickQtyMinus');
    const qtyPlusBtn = document.getElementById('quickQtyPlus');

    qtyMinusBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        selectedQuantity = Math.max(1, selectedQuantity - 1);
        qtyCountElement.textContent = selectedQuantity;
    });

    qtyPlusBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        selectedQuantity += 1;
        qtyCountElement.textContent = selectedQuantity;
    });

    document.getElementById('quickAddToCart').addEventListener('click', function (e) {
        e.stopPropagation();
        addToCart(product.id, selectedQuantity);
    });

    document.getElementById('quickCheckoutBtn').addEventListener('click', function (e) {
        e.stopPropagation();
        checkout();
    });

    document.getElementById('quickShareBtn').addEventListener('click', function (e) {
        e.stopPropagation();
        const shareText = `Check out ${product.name} for ₦${product.price.toLocaleString()}.`;
        const shareUrl = `https://wa.me/2349074226538?text=${encodeURIComponent(shareText)}`;
        window.open(shareUrl, '_blank');
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    // Clear cart after successful order
    cart = [];
    saveCart();
    updateCartCount();
    toggleCart(); // Close cart modal if open
}

function closeQuickView() {
    const overlay = document.getElementById('quickViewOverlay');
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
}

function showWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    localStorage.setItem('palotyWelcomeShown', 'true');
}


// ========== CART FUNCTIONS ==========
/**
 * Add product to shopping cart
 * @param {number} id - Product ID to add
 */
function addToCart(id, quantity = 1) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added (${quantity})! 💖`);
}

/**
 * Remove product from shopping cart
 * @param {number} id - Product ID to remove
 */
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCartItems();
    updateCartCount();
}

/**
 * Update item quantity in cart
 * @param {number} id - Product ID
 * @param {number} delta - Quantity change (+1 or -1)
 */
function updateQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        if (item.quantity === 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCartItems();
            updateCartCount();
        }
    }
}

/**
 * Calculate total cart value
 * @returns {number} Total amount in Naira
 */
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Persist cart to localStorage
 */
function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Update cart count badge display
 */
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const svgText = document.getElementById('cartCountText');
    if (svgText) {
        svgText.textContent = count;
    } else {
        const el = document.getElementById('cartCount');
        if (el) el.textContent = count;
    }
}

/**
 * Toggle shopping cart modal visibility
 */
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        renderCartItems();
    }
}

/**
 * Render cart items display in modal
 */
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        cartTotal.textContent = 'Total: ₦0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-sticker">${getStickerSVG(item.emoji)}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₦${item.price.toLocaleString()} × 
                        <button class="qty-btn qty-minus" data-product-id="${item.id}">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn qty-plus" data-product-id="${item.id}">+</button>
                    </p>
                </div>
                <button class="remove-btn" data-product-id="${item.id}">Remove</button>
            </div>
        `).join('');
        cartTotal.textContent = `Total: ₦${getCartTotal().toLocaleString()}`;
    }

    // Attach event listeners for quantity and remove buttons
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            updateQuantity(productId, -1);
        });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            updateQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            removeFromCart(productId);
        });
    });
}

// ========== CHECKOUT & PAYMENT ==========
/**
 * Process checkout via WhatsApp order request
 */
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    const number = '2349074226538';
    const total = getCartTotal();

    let message = 'Hello Paloty Hair, I would like to place an order.\n';
    cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} (₦${item.price.toLocaleString()})\n`;
    });
    message += `\nTotal: ₦${total.toLocaleString()}\n`;
    message += 'Please confirm availability and delivery details.';

    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    // Show success modal
    showSuccessModal();
}

// ========== UI UTILITIES ==========
/**
 * Scroll to products section smoothly
 */
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Display temporary notification message
 * @param {string} message - Message to display
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), NOTIFICATION_FADE_DURATION);
    }, NOTIFICATION_DURATION);
}

// ========== PAGE LIFECYCLE ==========
/**
 * Hide page loader when all resources are fully loaded
 */
window.addEventListener('load', function () {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js')
            .then(function (reg) {
                console.log('Service Worker registered:', reg.scope);
            })
            .catch(function (err) {
                console.error('Service Worker registration failed:', err);
            });
    });
}
