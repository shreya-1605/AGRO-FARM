// Product Data (Replace with your actual data)
const products = {
  "knapsack-sprayer": {
    name: "Farm sprayer",
    price: "₹1350",
    description: "A knapsack sprayer for efficient pesticide and fertilizer application on crops.",
    image: "images/knapsack sprayer.avif",
    category: "Farm machinery"
  },
  "avocado-seed": {
    name: "Avocado seed",
    price: "₹30/kg",
    description: "High-quality avocado seeds for farming. Ideal for growing your own avocado trees at home.",
    image: "images/avocado seed.jpg",
    category: "vegetable & fruit seeds"
  },
  "agri-car": {
    name: "Agri car",
    price: "₹520",
    description: "A versatile agricultural vehicle designed for farming tasks. Perfect for transporting goods and equipment.",
    image: "images/agri car.jpg",
    category: "Farm machinery"
  },
  "beetroot-seeds": {
    name: "beetroot seeds",
    price: "₹770/kg",
    description: "High-quality beetroot seeds for growing nutritious and delicious beetroots.",
    image: "images/beetroot seeds.avif",
    category: "vegetable & fruit seeds"
  }
};

// Function to redirect to shop.html with category filter
function redirectToCategory(category) {
  localStorage.setItem('selectedCategory', category); // Store selected category in localStorage
  window.location.href = 'shop.html'; // Redirect to shop.html
}

// Function to redirect to product.html with product details
function redirectToProduct(productId) {
  const product = products[productId]; // Get product details from products object
  if (product) {
    localStorage.setItem('productName', product.name);
    localStorage.setItem('productPrice', product.price);
    localStorage.setItem('productDescription', product.description);
    localStorage.setItem('productImage', product.image);
    window.location.href = 'product.html'; // Redirect to product.html
  } else {
    alert('Product not found!');
  }
}

// On shop.html page load, filter products by selected category
window.onload = () => {
  if (window.location.pathname.includes('shop.html')) {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      filterProductsByCategory(selectedCategory); // Filter products by category
      localStorage.removeItem('selectedCategory'); // Clear selected category
    }
  }
};

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
}

// Slider Functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Add to Cart Functionality
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.parentElement.querySelector('h3').innerText;
    alert(`${productName} added to cart!`);
  });
});

// Scroll Animations
const scrollElements = document.querySelectorAll('.category-card, .product-card, .testimonial-card');

const elementInView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});