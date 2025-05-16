// Function to change language
function changeLanguage(lang) {
    // Fetch the language JSON file
    fetch('language.json')
      .then((response) => response.json())
      .then((data) => {
        const texts = data[lang]; // Get the selected language texts
  
        // Update all texts in the HTML
        document.getElementById('top-bar-text').innerText = texts.top_bar_text;
        document.getElementById('my-account-text').innerText = texts.my_account_text;
        document.getElementById('home-text').innerText = texts.home_text;
        document.getElementById('shop-text').innerText = texts.shop_text;
        document.getElementById('about-us-text').innerText = texts.about_us_text;
        document.getElementById('contact-text').innerText = texts.contact_text;
        document.getElementById('cart-text').innerText = texts.cart_text;
        document.getElementById('welcome-text').innerText = texts.welcome_text;
        document.getElementById('tagline-text').innerText = texts.tagline_text;
        document.getElementById('explore-products-text').innerText = texts.explore_products_text;
        document.getElementById('our-services-text').innerText = texts.our_services_text;
        document.getElementById('best-products-text').innerText = texts.best_products_text;
        document.getElementById('best-products-desc').innerText = texts.best_products_desc;
        document.getElementById('farm-equipment-text').innerText = texts.farm_equipment_text;
        document.getElementById('farm-equipment-desc').innerText = texts.farm_equipment_desc;
        document.getElementById('expert-advice-text').innerText = texts.expert_advice_text;
        document.getElementById('expert-advice-desc').innerText = texts.expert_advice_desc;
        document.getElementById('fast-delivery-text').innerText = texts.fast_delivery_text;
        document.getElementById('fast-delivery-desc').innerText = texts.fast_delivery_desc;
        document.getElementById('shop-by-category-text').innerText = texts.shop_by_category_text;
        document.getElementById('seeds-text').innerText = texts.seeds_text;
        document.getElementById('seeds-desc').innerText = texts.seeds_desc;
        document.getElementById('farm-machinery-text').innerText = texts.farm_machinery_text;
        document.getElementById('farm-machinery-desc').innerText = texts.farm_machinery_desc;
        document.getElementById('crop-nutrition-text').innerText = texts.crop_nutrition_text;
        document.getElementById('crop-nutrition-desc').innerText = texts.crop_nutrition_desc;
        document.getElementById('insecticides-text').innerText = texts.insecticides_text;
        document.getElementById('insecticides-desc').innerText = texts.insecticides_desc;
        document.getElementById('featured-products-text').innerText = texts.featured_products_text;
        document.getElementById('testimonials-text').innerText = texts.testimonials_text;
        document.getElementById('about-us-footer-text').innerText = texts.about_us_footer_text;
        document.getElementById('about-us-desc').innerText = texts.about_us_desc;
        document.getElementById('quick-links-text').innerText = texts.quick_links_text;
        document.getElementById('home-footer-text').innerText = texts.home_footer_text;
        document.getElementById('shop-footer-text').innerText = texts.shop_footer_text;
        document.getElementById('about-us-footer-link').innerText = texts.about_us_footer_link;
        document.getElementById('contact-footer-text').innerText = texts.contact_footer_text;
        document.getElementById('contact-us-text').innerText = texts.contact_us_text;
        document.getElementById('footer-text').innerText = texts.footer_text;
        document.getElementById('whatsapp-chat-text').innerText = texts.whatsapp_chat_text;
        document.getElementById('faq-text').innerText = texts.faq_text;
      })
      .catch((error) => console.error('Error loading language file:', error));
  }
  
  // Event listener for language change
  document.getElementById('language').addEventListener('change', function () {
    const selectedLanguage = this.value; // Get selected language (en or hi)
    changeLanguage(selectedLanguage); // Call the function to change language
  });
  
  // Set default language to English on page load
  window.onload = function () {
    changeLanguage('en'); // Default language is English
  };