// Cart Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch products from localStorage
let products = JSON.parse(localStorage.getItem('products')) || {};

// Function to display products on the shop page
function displayProducts() {
  const productGrid = document.querySelector('.product-grid');
  productGrid.innerHTML = '';

  for (const productId in products) {
    const product = products[productId];

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('data-category', product.category);
    productCard.setAttribute('data-brand', product.brand || 'all');
    productCard.setAttribute('data-price', product.price);
    productCard.setAttribute('data-name', product.name);
    productCard.setAttribute('data-product-id', productId);

    // Add out-of-stock class if the product is out of stock
    if (product.status === 'out-of-stock') {
      productCard.classList.add('out-of-stock');
    }

    // Calculate discounted price if applicable
    let priceDisplay = `₹${product.price}`;
    if (product.status === 'discount' && product.discount > 0) {
      const discountedPrice = (parseFloat(product.price) * (100 - product.discount)) / 100;
      priceDisplay = `
        <span style="text-decoration: line-through;">₹${product.price}</span>
        <span style="color: red;">₹${discountedPrice.toFixed(2)} (${product.discount}% off)</span>
      `;
    }

    // Add discount animation if product is on discount
    const discountAnimation = product.status === 'discount' && product.discount > 0
      ? '<div class="discount-animation">Discounted!</div>'
      : '';

    productCard.innerHTML = `
      ${discountAnimation}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${priceDisplay}</p>
    `;

    // Add out-of-stock styling
    const outOfStockStyle = product.status === 'out-of-stock' ? 'style="color: red;"' : '';

    productCard.innerHTML = `
      ${discountAnimation}
      <img src="${product.image}" alt="${product.name}">
      <h3 ${outOfStockStyle}>${product.name}</h3>
      <p>${priceDisplay}</p>
    `;

        // Redirect to product details page on click
        productCard.addEventListener('click', () => {
          if (product.status !== 'out-of-stock') {
            redirectToProduct(productId);
          }
        });
    
        productGrid.appendChild(productCard);
      }
    
      // Re-attach event listeners to filter buttons
      attachFilterListeners();
    }
// Function to toggle filter panel
function toggleFilterPanel() {
  const filterPanel = document.getElementById('filterPanel');
  filterPanel.classList.toggle('active');

  // Hide scrollbar when panel is not active
  if (!filterPanel.classList.contains('active')) {
    filterPanel.style.overflowY = 'hidden';
  } else {
    filterPanel.style.overflowY = 'auto';
  }
}

// Function to filter products by category
function filterProductsByCategory(category) {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Update the category title dynamically
  updateCategoryTitle(category);
}

// Function to update the category title dynamically
function updateCategoryTitle(category) {
  const categoryTitle = document.querySelector('.all-products h2');
  if (category === 'all') {
    categoryTitle.textContent = 'All Products';
  } else {
    categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }
}

// Function to filter products by category
function filterProductsByCategory(category) {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  updateCategoryTitle(category);
}

// Function to filter products by price
function filterProductsByPrice(maxPrice) {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const price = parseFloat(card.getAttribute('data-price'));
    if (price <= maxPrice) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Function to filter products by brand
function filterProductsByBrand(brand) {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const productBrand = card.getAttribute('data-brand');
    if (brand === 'all' || productBrand === brand) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Function to sort products
function sortProducts(sortBy) {
  const productGrid = document.querySelector('.product-grid');
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  productCards.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute('data-price'));
    const priceB = parseFloat(b.getAttribute('data-price'));
    const nameA = a.getAttribute('data-name').toLowerCase();
    const nameB = b.getAttribute('data-name').toLowerCase();

    if (sortBy === 'priceLowToHigh') {
      return priceA - priceB;
    } else if (sortBy === 'priceHighToLow') {
      return priceB - priceA;
    } else if (sortBy === 'nameAtoZ') {
      return nameA.localeCompare(nameB);
    } else if (sortBy === 'nameZtoA') {
      return nameB.localeCompare(nameA);
    } else {
      return 0;
    }
  });

  productCards.forEach(card => productGrid.appendChild(card));
}

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  filterProductsBySearch(searchTerm);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterProductsBySearch(searchTerm);
  }
});

// Function to filter products by search term
function filterProductsBySearch(searchTerm) {
  const productCards = document.querySelectorAll('.product-card');
  let foundMatch = false;

  productCards.forEach(card => {
    const productName = card.querySelector('h3').innerText.toLowerCase();
    const productCategory = card.getAttribute('data-category').toLowerCase();
    const productBrand = card.getAttribute('data-brand').toLowerCase();

    if (productName.includes(searchTerm)) {
      card.style.display = 'block';
      foundMatch = true;
    } else if (productCategory.includes(searchTerm)) {
      card.style.display = 'block';
      foundMatch = true;
    } else if (productBrand.includes(searchTerm)) {
      card.style.display = 'block';
      foundMatch = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (!foundMatch) {
    alert('No products found matching your search.');
  }
}

// Add to Cart Functionality
function addToCart(productId, quantity) {
  const product = products[productId];

  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
      // If product exists, update the quantity
      existingProduct.quantity = quantity;
    } else {
      // If product doesn't exist, add it to cart
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity // Add the selected quantity
      });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    alert('Product added to cart!');
  } else {
    alert('Product not found!');
  }
}

// Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Redirect to Product Details Page
function redirectToProduct(productId) {
  const product = products[productId];

  if (product) {
    localStorage.setItem('productName', product.name);
    localStorage.setItem('productPrice', product.price);
    localStorage.setItem('productDescription', product.description);
    localStorage.setItem('productImage', product.image);

    window.location.href = 'product.html';
  } else {
    window.location.href = 'shop.html';
  }
}

// Event listeners for filters
document.getElementById('priceRange').addEventListener('input', (e) => {
  const maxPrice = e.target.value;
  document.getElementById('priceValue').textContent = maxPrice;
  filterProductsByPrice(maxPrice);
});

document.getElementById('brandFilter').addEventListener('change', (e) => {
  filterProductsByBrand(e.target.value);
});

document.getElementById('sortBy').addEventListener('change', (e) => {
  sortProducts(e.target.value);
});

// Display brands in the filter dropdown
function displayBrands() {
  const brandFilter = document.getElementById('brandFilter');
  const brands = JSON.parse(localStorage.getItem('brands')) || [];
  brandFilter.innerHTML = '<option value="all">All Brands</option>';
  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}
// Function to attach event listeners to filter buttons
function attachFilterListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      button.classList.add('active');

      // Get the category from the button's data attribute
      const category = button.getAttribute('data-category');
      // Filter products by the selected category
      filterProductsByCategory(category);
    });
  });
}

// Initial Load
displayBrands();
displayProducts();
updateCartCount();
attachFilterListeners();