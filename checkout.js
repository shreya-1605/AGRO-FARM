// Function to display order summary
function displayOrderSummary() {
  const orderSummary = document.getElementById('order-summary');
  const buyNowProduct = JSON.parse(localStorage.getItem('buyNowProduct'));
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  orderSummary.innerHTML = ''; // Clear previous content

  // If Buy Now product exists and cart is empty, display only that product
  if (buyNowProduct && cart.length === 0) {
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');

    orderItem.innerHTML = `
      <img src="${buyNowProduct.image}" alt="${buyNowProduct.name}">
      <div class="order-item-info">
        <h3>${buyNowProduct.name}</h3>
        <p>Quantity: ${buyNowProduct.quantity}</p>
        <p>Price: ₹${buyNowProduct.price}</p>
      </div>
    `;

    orderSummary.appendChild(orderItem);

    // Calculate subtotal
    subtotal += parseFloat(buyNowProduct.price.replace('₹', '')) * buyNowProduct.quantity;
  } else {
    // Display all items in the cart (if cart is not empty)
    cart.forEach(item => {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');

      orderItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="order-item-info">
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ₹${item.price}</p>
        </div>
      `;

      orderSummary.appendChild(orderItem);

      // Calculate subtotal
      subtotal += parseFloat(item.price.replace('₹', '')) * item.quantity;
    });
  }

  // Calculate GST (18%) and shipping charges
  const gst = subtotal * 0.18;
  const shipping = 50; // Fixed shipping charges
  const total = subtotal + gst + shipping;

  // Update totals
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('gst').textContent = gst.toFixed(2);
  document.getElementById('shipping').textContent = shipping.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

// Function to toggle payment method visibility
function togglePayment() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const cardDetails = document.getElementById('cardDetails');
  const upiDetails = document.getElementById('upiDetails');

  cardDetails.style.display = paymentMethod === 'card' ? 'block' : 'none';
  upiDetails.style.display = paymentMethod === 'upi' ? 'block' : 'none';

  document.getElementById('cardNumber').required = paymentMethod === 'card';
  document.getElementById('expDate').required = paymentMethod === 'card';
  document.getElementById('cvv').required = paymentMethod === 'card';
  document.getElementById('upiId').required = paymentMethod === 'upi';
}

// Function to handle order completion
function completeOrder() {
  // Clear cart and buyNowProduct from localStorage
  localStorage.removeItem('cart');
  localStorage.removeItem('buyNowProduct');

  // Redirect to order-success page
  window.location.href = 'order-success.html';
}

// Function to validate the checkout form
function validateForm() {
  const phone = document.querySelector('input[type="tel"]').value;
  const pincode = document.querySelector('input[placeholder="Pincode"]').value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  // Validate phone number
  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert('Please enter a valid Indian mobile number');
    return false;
  }

  // Validate pincode
  if (pincode.length !== 6) {
    alert('Please enter a valid 6-digit pincode');
    return false;
  }

  // Validate payment method
  if (paymentMethod === 'card') {
    const cardNumber = document.getElementById('cardNumber').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber.length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }

    if (cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return false;
    }
  }

  if (paymentMethod === 'upi') {
    const upiId = document.getElementById('upiId').value;
    if (!upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. mobile@upi)');
      return false;
    }
  }

  // Complete the order
  completeOrder();
  return false; // Prevent form submission
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  displayOrderSummary(); // Display order summary on page load
  togglePayment(); // Initialize payment method visibility
});