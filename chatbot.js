// Toggle Chat Bot Popup
function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbotPopup');
    chatbotPopup.classList.toggle('show');
  }
  
  // Open WhatsApp
  function openWhatsApp() {
    window.open('https://wa.me/918370023455', '_blank'); // Replace with your WhatsApp number
  }
  
  // Open FAQ Page
  function openFAQ() {
    window.location.href = 'faq.html'; // Redirect to FAQ page
  }