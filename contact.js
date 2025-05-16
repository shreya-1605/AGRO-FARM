// Function to toggle between Hindi and English
function toggleLanguage() {
    const hindiContent = document.getElementById("hindi-content");
    const englishContent = document.getElementById("english-content");
    const toggleButton = document.querySelector(".language-toggle button");
  
    if (hindiContent.classList.contains("hidden")) {
      hindiContent.classList.remove("hidden");
      englishContent.classList.add("hidden");
      toggleButton.textContent = "Switch to English";
    } else {
      hindiContent.classList.add("hidden");
      englishContent.classList.remove("hidden");
      toggleButton.textContent = "हिंदी में बदलें";
    }
  }