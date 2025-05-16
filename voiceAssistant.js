// Voice Assistant Functionality
let isListening = false;
let recognition = null;

function toggleVoiceAssistant() {
  const popup = document.getElementById('voiceAssistantPopup');
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
    stopVoiceAssistant(); // Stop listening when popup is closed
  } else {
    popup.style.display = 'block';
    startVoiceAssistant(); // Start listening when popup is opened
  }
}

function startVoiceAssistant() {
  const responseElement = document.getElementById('voice-assistant-response');
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'hi-IN'; // Set language to Hindi
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  isListening = true;
  responseElement.innerText = "सुन रहा हूँ...";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    responseElement.innerText = `आपने कहा: ${transcript}`;
    handleVoiceCommand(transcript);
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Restart listening
    }
  };

  recognition.onerror = (event) => {
    responseElement.innerText = "त्रुटि हुई। कृपया फिर से कोशिश करें।";
    isListening = false;
  };
}

function stopVoiceAssistant() {
  if (recognition) {
    recognition.stop(); // Stop the recognition
    isListening = false;
    const responseElement = document.getElementById('voice-assistant-response');
    responseElement.innerText = "वॉइस असिस्टेंट बंद हो गया है।";
  }
}

function handleVoiceCommand(command) {
  const responseElement = document.getElementById('voice-assistant-response');
  let response = "";

  // General Commands
  if (command.includes("नमस्ते") || command.includes("हेलो") || command.includes("हेलो एग्रो")) {
    response = "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?";
  } else if (command.includes("धन्यवाद") || command.includes("थैंक्यू")) {
    response = "आपका स्वागत है! कोई और मदद चाहिए?";
  }

  // Website Information
  else if (
    command.includes("वेबसाइट के बारे में बताओ") ||
    command.includes("वेबसाइट की जानकारी दो") ||
    command.includes("वेबसाइट के बारे में जानकारी")
  ) {
    window.location.href = "tutorial.html"; // Redirect to tutorial page
    response = "यहां पर आपको हमारी वेबसाइट के बारे में पूरी जानकारी और कैसे उपयोग करना है, वह भी बताया गया है। अगर कोई और मदद चाहिए तो बताएं।";
  }

  // Products
  else if (command.includes("उत्पाद") || command.includes("प्रोडक्ट")) {
    response = "हमारे पास बीज, उर्वरक, और कीटनाशक उपलब्ध हैं। आप 'दुकान' पर क्लिक करके उत्पाद देख सकते हैं।";
  } 
  else if (command.includes("गेहूं") || command.includes("गेहूँ")) {
    response = "गेहूं के बीज उच्च गुणवत्ता वाले हैं और अच्छी पैदावार देते हैं। कीमत: ₹500 प्रति किलो।";
  } 
  else if (command.includes("चावल")) {
    response = "चावल के बीज उपलब्ध हैं, जो अच्छी फसल देते हैं। कीमत: ₹600 प्रति किलो।";
  } 
  else if (command.includes("जैविक उर्वरक")) {
    response = "जैविक उर्वरक पूरी तरह से प्राकृतिक हैं और फसलों के लिए सुरक्षित हैं। कीमत: ₹300 प्रति किलो।";
  } 
  else if (command.includes("रासायनिक उर्वरक")) {
    response = "रासायनिक उर्वरक फसलों को तेजी से बढ़ने में मदद करते हैं। कीमत: ₹400 प्रति किलो।";
  } 
  else if (command.includes("कीटनाशक")) {
    response = "हमारे कीटनाशक फसलों को कीटों से बचाते हैं। कीमत: ₹200 प्रति लीटर।";
  }

  // Cart and Checkout
  else if (command.includes("कार्ट") || command.includes("जोड़")) {
    response = "आप 'कार्ट' पर क्लिक करके अपने सभी उत्पाद देख सकते हैं और चेकआउट कर सकते हैं।";
  } 
  else if (command.includes("चेकआउट") || command.includes("खरीदारी")) {
    response = "चेकआउट करने के लिए, कृपया 'कार्ट' पर जाएँ और अपना पता और भुगतान विवरण दर्ज करें।";
  }

  // Payment
  else if (command.includes("भुगतान") || command.includes("पेमेंट")) {
    response = "हम क्रेडिट कार्ड, डेबिट कार्ड, और UPI जैसे भुगतान विकल्प स्वीकार करते हैं।";
  }

  // Tutorial Page
  else if (command.includes("ट्यूटोरियल") || command.includes("सीखें")) {
    window.location.href = "tutorial.html"; // Redirect to tutorial page
    response = "आपको ट्यूटोरियल पेज पर ले जाया जा रहा है। यहां पर आपको हमारी वेबसाइट के बारे में पूरी जानकारी और कैसे उपयोग करना है, वह भी बताया गया है।";
  }
  else if (command.includes("वापस जाओ") || command.includes("पीछे जाओ") || command.includes("बैक")) {
    window.history.back();
    response = "आपको पिछले पेज पर ले जा रहा हूँ...";
  }
  else if (command.includes("शॉप खोलो") || command.includes("दुकान दिखाओ")) {
    window.location.href = "shop.html";
    response = "शॉप पेज खोल रहा हूँ...";
  }
  else if (command.includes("प्रोडक्ट पेज खोलो")) {
    window.location.href = "product.html";
    response = "प्रोडक्ट पेज खोल रहा हूँ...";
  }
  else if (command.includes("कॉन्टैक्ट पेज दिखाओ")) {
    window.location.href = "contact.html";
    response = "कॉन्टैक्ट पेज खोल रहा हूँ...";
  }
  else if (command.includes("ऑर्डर सक्सेस पेज")) {
    window.location.href = "order-success.html";
    response = "आपको ऑर्डर सक्सेस पेज पर ले जा रहा हूँ...";
  }
  else if (command.includes("होमपेज") || command.includes("होम")) {
    window.location.href = "frontend.html";
    response = "होमपेज खोल रहा हूँ...";
  }

  // Scrolling Commands
  else if (command.includes("स्क्रॉल डाउन") || command.includes("नीचे जाओ")  || command.includes("और नीचे")){
    window.scrollBy(0, 400);
    response = "पेज नीचे स्क्रॉल कर रहा हूँ...";
  }
  else if (command.includes("स्क्रॉल अप") || command.includes("ऊपर जाओ") || command.includes("और ऊपर") ) {
    window.scrollBy(0, -400);
    response = "पेज ऊपर स्क्रॉल कर रहा हूँ...";
  }

    // Product Purchase Flow
    else if (command.includes("खरीदना") || command.includes("करना") || command.includes("लेना")) {
      const productName = extractProductName(command);
      if (productName) {
        response = `क्या आप ${productName} खरीदना चाहते हैं?`;
        speak(response);
        responseElement.innerText = response;
  
        // Wait for user's response
        recognition.onresult = (event) => {
          const userResponse = event.results[0][0].transcript.toLowerCase();
          if (userResponse.includes("हाँ") || userResponse.includes("हां") || userResponse.includes("जी हाँ")) {
            // Redirect to product page
            redirectToProductPage(productName);
          } else {
            response = "ठीक है, आप और शॉपिंग कर सकते हैं।";
            speak(response);
            responseElement.innerText = response;
          }
        };
      } else {
        response = "मुझे समझ नहीं आया कि आप कौन सा प्रोडक्ट खरीदना चाहते हैं। कृपया फिर से बताएं।";
        speak(response);
        responseElement.innerText = response;
      }
    }
  
    // Default Response
    else {
      response = "मैं आपकी बात समझ नहीं पाया। कृपया फिर से कोशिश करें।";
    }
  
    // Speak the response
    speak(response);
    responseElement.innerText = response;
  }
  
  function extractProductName(command) {
    // Fetch products from localStorage every time
    const products = JSON.parse(localStorage.getItem('products')) || {};
    for (const productId in products) {
      const product = products[productId];
      const productNameLower = product.name.toLowerCase(); // Product name in lowercase
      const commandLower = command.toLowerCase(); // User command in lowercase
  
      // Check if the product name is included in the command
      if (commandLower.includes(productNameLower)) {
        return product.name; // Return the actual product name
      }
  
      // Optional: Handle partial matches (e.g., "Tomato" or "Seeds")
      const productWords = productNameLower.split(' '); // Split product name into words
      for (const word of productWords) {
        if (commandLower.includes(word)) {
          return product.name; // Return the product name if any word matches
        }
      }
    }
    return null; // If no product is found
  }
  
  function redirectToProductPage(productName) {
    const products = JSON.parse(localStorage.getItem('products')) || {};
    const productId = Object.keys(products).find(key => products[key].name === productName);
    if (productId) {
      // Save product details in localStorage for product.html
      localStorage.setItem('productName', products[productId].name);
      localStorage.setItem('productPrice', products[productId].price);
      localStorage.setItem('productDescription', products[productId].description);
      localStorage.setItem('productImage', products[productId].image);
  
      // Redirect to product.html
      window.location.href = 'product.html';
    } else {
      response = "मुझे समझ नहीं आया कि आप कौन सा प्रोडक्ट खरीदना चाहते हैं। कृपया फिर से बताएं।";
      speak(response);
      responseElement.innerText = response;
    }
  }
  
  function addToCart(productName) {
    const products = JSON.parse(localStorage.getItem('products')) || {};
    const productId = Object.keys(products).find(key => products[key].name === productName);
    if (productId) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({
        id: productId,
        name: productName,
        price: products[productId].price,
        image: products[productId].image,
        quantity: 1
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    }
  }
  
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartCount.textContent = cart.length;
    }
  }
  
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN'; // Set language to Hindi
    utterance.rate = 1; // Speech speed
    window.speechSynthesis.speak(utterance);
  }
  
  // Stop listening when the popup is closed
  document.getElementById('voiceAssistantPopup').addEventListener('click', (event) => {
    if (event.target === document.getElementById('voiceAssistantPopup')) {
      isListening = false;
      stopVoiceAssistant(); // Stop the voice assistant when popup is closed
    }
  });