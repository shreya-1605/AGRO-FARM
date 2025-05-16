// Add Product Form Submission
document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productDescription = document.getElementById('product-description').value;
    const productCategory = document.getElementById('product-category').value;
    const productImageInput = document.getElementById('product-image');
  
    // Check if an image is selected
    if (productImageInput.files.length === 0) {
      alert('Please select an image for the product.');
      return;
    }
  
    // Generate a unique ID for the product using Date.now()
    const productId = `product-${Date.now()}`;
  
    // Read the image file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = function (event) {
      const productImage = event.target.result;
  
      // Create product object
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage,
        category: productCategory,
        status: 'available', // Default status
      };
  
      // Get existing products from localStorage
      let products = JSON.parse(localStorage.getItem('products')) || {};
  
      // Add new product to the products object
      products[productId] = product;
  
      // Save updated products back to localStorage
      localStorage.setItem('products', JSON.stringify(products));
  
      alert('Product added successfully!');
      document.getElementById('add-product-form').reset();
      document.getElementById('image-preview').innerHTML = ''; // Clear image preview
  
      // Refresh the products list
      displayProducts();
    };
  
    // Read the image file as a data URL
    reader.readAsDataURL(productImageInput.files[0]);
  });
  
  // Image preview functionality
  document.getElementById('product-image').addEventListener('change', function (e) {
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = ''; // Clear previous preview
  
    if (e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        imagePreview.appendChild(img);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });
  
  // Function to display products in the manage products section
  function displayProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
  
    const products = JSON.parse(localStorage.getItem('products')) || {};
  
    for (const productId in products) {
      const product = products[productId];
  
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <p>Category: ${product.category}</p>
        <select class="product-status" id="status-${productId}" onchange="toggleDiscountInput('${productId}', this.value)">
          <option value="available">Available</option>
          <option value="discount" ${product.status === 'discount' ? 'selected' : ''}>Add Discount</option>
          <option value="out-of-stock" ${product.status === 'out-of-stock' ? 'selected' : ''}>Show Out of Stock</option>
        </select>
        <div id="discount-container-${productId}" style="display: ${product.status === 'discount' ? 'block' : 'none'}">
          <input type="number" class="discount-input" id="discount-${productId}" value="${product.discount || 0}" placeholder="Discount %">
        </div>
        <button onclick="saveChanges('${productId}')">Save Changes</button>
        <button onclick="deleteProduct('${productId}')">Delete</button>
      `;
  
      productsList.appendChild(productCard);
    }
  }
  
  // Function to toggle discount input field
  function toggleDiscountInput(productId, status) {
    const discountContainer = document.getElementById(`discount-container-${productId}`);
    if (status === 'discount') {
      discountContainer.style.display = 'block';
    } else {
      discountContainer.style.display = 'none';
    }
  }
  
  // Function to save changes (status and discount)
  function saveChanges(productId) {
    const status = document.getElementById(`status-${productId}`).value;
    const discountInput = document.getElementById(`discount-${productId}`);
    const discount = discountInput ? parseFloat(discountInput.value) : 0;
  
    let products = JSON.parse(localStorage.getItem('products')) || {};
    if (products[productId]) {
      products[productId].status = status;
      if (status === 'discount') {
        products[productId].discount = discount;
      } else {
        delete products[productId].discount;
      }
      localStorage.setItem('products', JSON.stringify(products));
      alert('Changes saved successfully!');
      displayProducts(); // Refresh the products list
    }
  }
  
  // Function to delete a product
  function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || {};
    if (products[productId]) {
      delete products[productId];
      localStorage.setItem('products', JSON.stringify(products));
      alert('Product deleted successfully!');
      displayProducts(); // Refresh the products list
    } else {
      alert('Product not found!');
    }
  }
  
  // Initial Load
  displayProducts();