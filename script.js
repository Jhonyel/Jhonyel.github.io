// sending email lgoic
document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const messageInput = document.getElementById("messageInput");
  
    localStorage.removeItem("savedName");
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedMessage");
  
    nameInput.value = localStorage.getItem("savedName") || "";
    emailInput.value = localStorage.getItem("savedEmail") || "";
    messageInput.value = localStorage.getItem("savedMessage") || "";
  
    nameInput.addEventListener("input", function () {
      localStorage.setItem("savedName", nameInput.value);
    });
    emailInput.addEventListener("input", function () {
      localStorage.setItem("savedEmail", emailInput.value);
    });
    messageInput.addEventListener("input", function () {
      localStorage.setItem("savedMessage", messageInput.value);
    });
  });
  
  // cursor flashlight effect
  document.addEventListener("DOMContentLoaded", function () {
    const cursorLight = document.querySelector(".cursor-light");
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    function animate() {
      cursorLight.style.left = `${mouseX}px`;
      cursorLight.style.top = `${mouseY}px`;
      requestAnimationFrame(animate);
    }
    animate();
  });
  
  // about-me photos 
  const photos = [
    "assets/prof-photo.jpeg",
    "assets/lax-photo.JPG",
    "assets/ktp-photo.jpg",
  ];
  
  let currentIndex = 0;
  const photoElement = document.getElementById("current-photo");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  
  function updatePhoto(index) {
    photoElement.style.opacity = 0;
    setTimeout(() => {
      photoElement.src = photos[index];
      photoElement.style.opacity = 1; 
    }, 400);
  }
  
  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updatePhoto(currentIndex);
  });
  
  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photos.length;
    updatePhoto(currentIndex);
  });
  
  
  // handling mobile device page rendering 
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  }
  
  if (isMobileDevice()) {
    const style = document.createElement('style');
    style.textContent = `
        .nav-bar { display: none !important; }
        .main-content { display: none !important; }
        #mobile-message { 
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    `;
    document.head.appendChild(style);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    if (isMobileDevice()) {
        const mobileMessage = document.getElementById("mobile-message");
        const mainContent = document.querySelector(".main-content");
        const navBar = document.querySelector(".nav-bar");
        
        if (mobileMessage) {
            mobileMessage.style.display = "flex";
            mobileMessage.style.flexDirection = "column";
            mobileMessage.style.justifyContent = "center";
            mobileMessage.style.alignItems = "center";
        }
        
        if (mainContent) {
            mainContent.style.display = "none";
        }
        
        if (navBar) {
            navBar.style.display = "none";
        }
    }
  });