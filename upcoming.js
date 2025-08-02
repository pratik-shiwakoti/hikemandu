window.addEventListener("load", function () {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
      alert("Open in desktop for better experience");
  }
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {  // Trigger after scrolling 100px
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
  // Function to open the popup
  function openPopup(popupId) {
      document.getElementById(popupId).style.display = 'block';
  }
  
  // Function to close the popup
  function closePopup(popupId) {
      document.getElementById(popupId).style.display = 'none';
  }
  
  // Function to close the popup when clicked outside the modal content (for specific popups like learnMorePopup and registerPopup)
  window.onclick = function(event) {
      // Check if the target element is a popup background
      if (event.target.classList.contains('popup')) {
          // Close the popup if clicked outside the content area
          event.target.style.display = "none";
      }
  };
  
  // Load existing data (phone numbers and emails) from localStorage (if any)
  function loadExistingData() {
      let storedData = JSON.parse(localStorage.getItem("submittedData"));
      if (!storedData) {
          storedData = { phones: [], emails: [] };
          localStorage.setItem("submittedData", JSON.stringify(storedData));
      }
      return storedData;
  }
  
  // Save the new phone number and email in localStorage
  function saveData(phone, email) {
      let storedData = loadExistingData();
      storedData.phones.push(phone);
      storedData.emails.push(email);
      localStorage.setItem("submittedData", JSON.stringify(storedData));
  }
  
  // Form submission handler
  document.getElementById("registrationForm").onsubmit = function(event) {
      event.preventDefault(); // Prevent the default form submission
      // Check if user has solved the Chapeta game
      if (!verified) {
          alert("Please verify that you're not a robot by catching the Putali!");
          return; // Prevent form submission if the game is not solved
      }
  
      const name = document.getElementById("name").value;
      const age = parseInt(document.getElementById("age").value);
      const phone = document.getElementById("phoneNo").value;
      const email = document.getElementById("email").value;
      
      // Validate age to ensure the user is older than 15
      if (age <= 15) {
          alert("You must be at least 16 years old to register.");
          document.getElementById("age").focus();
          return; // Stop the form submission if the age is invalid
      }
  
      // Load existing data and check for duplicate phone number or email
      const existingData = loadExistingData();
  
      if (existingData.phones.includes(phone)) {
          const editPhone = confirm("This phone number is already registered. Do you want to edit it?");
          if (editPhone) {
              document.getElementById("phoneNo").focus();
              return; // Allow user to edit the phone number
          } else {
              alert("Please enter a different phone number.");
              return; // Stop form submission if duplicate phone number found
          }
      }
  
      if (existingData.emails.includes(email)) {
          const editEmail = confirm("This email address is already registered. Do you want to edit it?");
          if (editEmail) {
              document.getElementById("email").focus();
              return; // Allow user to edit the email address
          } else {
              alert("Please enter a different email address.");
              return; // Stop form submission if duplicate email found
          }
      }
  
      // If no duplicates, save the phone number and email, and submit the form data to the server
      saveData(phone, email);
  
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Age", age);
      formData.append("Gender", document.getElementById("gender").value);
      formData.append("Address", document.getElementById("address").value);
      formData.append("Phone", phone);
      formData.append("Email", email);
      formData.append("MedicalInfo", document.getElementById("medicalInfo").value);
  
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwKhynfddjImlra3N9hr4TX5L3afflkn9qMvoVD47JD6bw-5td_DLF38XRLGIp5i3Npzw/exec';
  
      // Submit data to Google Apps Script Web App
      fetch(scriptURL, {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())  // Expect JSON response from server
      .then(result => {
          if (result.status === 'success') {
              alert("Registration successful!");
              clearForm();
          } else {
              alert("Error: " + result.message);
          }
      })
      .catch(error => {
          console.error("Error!", error);
          alert("There was an error submitting the form.");
      });
  };
  
  // Function to clear the form
  function clearForm() {
      document.getElementById("registrationForm").reset();
  }
  
  // Google Apps Script doPost function
  function doPost(e) {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations");
  
      if (!sheet) {
          return ContentService.createTextOutput(
              JSON.stringify({ status: "error", message: "Sheet not found" })
          ).setMimeType(ContentService.MimeType.JSON);
      }
  
      sheet.appendRow([
          e.parameter.Name,
          e.parameter.Age,
          e.parameter.Gender,
          e.parameter.Address,
          e.parameter.Phone,
          e.parameter.Email,
          e.parameter.MedicalInfo,
          new Date()
      ]);
  
      return ContentService.createTextOutput(
          JSON.stringify({ status: "success" })
      ).setMimeType(ContentService.MimeType.JSON);
  }
  // Function to handle feedback form submission
  window.onload = function () {
      const feedbackForm = document.getElementById("feedback-form");
      const feedbackResponse = document.getElementById("feedback-response");
    
      feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const feedbackText = document.getElementById("feedback").value.trim();
    
        if (feedbackText) {
          // Show submitting message
          feedbackResponse.style.display = "block";
          feedbackResponse.innerHTML = "Submitting your feedback...";
    
          // Save to localStorage
          let feedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
          feedbacks.push({ feedback: feedbackText, timestamp: new Date().toISOString() });
          localStorage.setItem("userFeedbacks", JSON.stringify(feedbacks));
    
          // Send to Google Sheet (Feedback only)
          const formData = new FormData();
          formData.append("Feedback", feedbackText); // Only Feedback is sent
    
          const scriptURL = "https://script.google.com/macros/s/AKfycbwKhynfddjImlra3N9hr4TX5L3afflkn9qMvoVD47JD6bw-5td_DLF38XRLGIp5i3Npzw/exec";
    
          fetch(scriptURL, {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(result => {
            if (result.status === "success") {
              feedbackResponse.innerHTML = "Thank you for your feedback! 😊";
              feedbackForm.reset();
            } else {
              feedbackResponse.innerHTML = "Error: " + result.message;
            }
          })
          .catch(error => {
            console.error("Feedback submit error:", error);
            feedbackResponse.innerHTML = "There was an error submitting your feedback.";
          });
    
        } else {
          feedbackResponse.style.display = "block";
          feedbackResponse.innerHTML = "Please enter your feedback before submitting.";
        }
      });
    };
    
    

// Set the event date using UTC for timezone consistency
const eventDate = new Date("2026-04-21T00:00:00Z").getTime();

// Function to disable the register button
function disableRegisterButton() {
    const registerButton = document.querySelector(".register-button");
    if (registerButton) {
        registerButton.disabled = true;
        registerButton.textContent = "Registration Closed";
        registerButton.style.backgroundColor = "#555";
        registerButton.style.cursor = "not-allowed";
        
    }
}

// Function to show UI when event has started
function showEventStartedUI() {
    const countdownElement = document.getElementById("countdown");
    const eventTitle = document.querySelector(".event-title");

    if (countdownElement) {
        countdownElement.textContent = "Time up !!!";
        countdownElement.style.cursor = "pointer";
        countdownElement.setAttribute("title", "New Event Coming Soon😊");
    }

    if (eventTitle) {
        eventTitle.textContent = "Event has started!";
        eventTitle.style.color = "red";
    }

    disableRegisterButton();
}

// Function to update the countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const countdownElement = document.getElementById("countdown");
    const eventTitle = document.querySelector(".event-title");
    const registerButton = document.querySelector(".register-button");

    if (distance > 0) {
        // Calculate time left
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display countdown
        countdownElement.textContent = `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;

        // Store status
        localStorage.setItem("eventStatus", "upcoming");

        // Enable register button
        if (registerButton) {
            registerButton.disabled = false;
            registerButton.textContent = "Register Here";
            registerButton.style.backgroundColor = "#28a745"; // Green
            registerButton.style.cursor = "pointer";
            registerButton.style.pointerEvents = "auto";
        }
    } else {
        // Time's up — stop timer, update UI
        clearInterval(countdownInterval);
        localStorage.setItem("eventStatus", "started");
        showEventStartedUI();
    }
}

// Function to check status on page load
function checkEventStatus() {
    const eventStatus = localStorage.getItem("eventStatus");
    if (eventStatus === "started") {
        showEventStartedUI();
    } else {
        updateCountdown();
    }
}

// Initial run
checkEventStatus();

// Update every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Function to open the fullscreen container
  function openFullscreen() {
      document.getElementById("fullscreenContainer").style.display = "flex";
  }
  function closeFullscreen() {
      document.getElementById("fullscreenContainer").style.display = "none";
  }
  // Function to toggle the map section visibility
  function toggleMap() {
      const mapSection = document.getElementById('mapSection');
    
      if (mapSection.style.display === 'none' || mapSection.style.display === '') {
        mapSection.style.display = 'block';
      } else {
        mapSection.style.display = 'none';
      }
    }
  
  // 🦋 Catch the Putali Game
  const robotCheck = document.getElementById("robot-check");
  const chapetaInstruction = document.getElementById("chapeta-instruction");
  const chapetaContainer = document.getElementById("chapeta-container");
  const chapetaBtn = document.getElementById("chapeta-btn");
  const container = document.querySelector(".chapeta-container");
  
  let verified = false;
  
  function resetChapetaVerification() {
      verified = false;
      chapetaBtn.innerText = "Putali🦋";
      chapetaBtn.disabled = false;
      chapetaBtn.style.background = "";
      chapetaBtn.style.boxShadow = "";
      chapetaBtn.style.cursor = "pointer";
  }
  
  // Show the Catch the Putali game once checkbox is clicked
  robotCheck.addEventListener("change", () => {
      if (robotCheck.checked) {
          chapetaInstruction.style.display = "block";
          chapetaContainer.style.display = "block";
      } else {
          chapetaInstruction.style.display = "none";
          chapetaContainer.style.display = "none";
          resetChapetaVerification(); // cleaner and reusable
      }
  });
  
  // Move the Putali button around when hovered
  function movePutali() {
    if (verified) return;
  
    const containerWidth = container.clientWidth - chapetaBtn.clientWidth;
    const containerHeight = container.clientHeight - chapetaBtn.clientHeight;
  
    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);
  
    chapetaBtn.style.left = `${randomX}px`;
    chapetaBtn.style.top = `${randomY}px`;
  }
  chapetaBtn.addEventListener("mouseover", movePutali);     // For desktop
  chapetaBtn.addEventListener("touchstart", movePutali);     // For mobile
  
  // Verify user when Putali button is clicked with animation
  chapetaBtn.addEventListener("click", () => {
    if (verified) return;
  
    verified = true;
    chapetaBtn.classList.add("caught");
  
    // Wait for animation to finish before showing verified state
    setTimeout(() => {
      chapetaBtn.innerText = "✅ Verified!";
      chapetaBtn.style.background = "#66bb6a";
      chapetaBtn.style.cursor = "default";
      chapetaBtn.style.boxShadow = "none";
      chapetaBtn.disabled = true;
      chapetaBtn.classList.remove("caught");
    }, 800); // match animation time
  });
  
  // 📝 Save Draft Function
  function saveDraft() {
    const formData = {
      name: document.getElementById("name").value.trim() || "",
      email: document.getElementById("email").value.trim() || "",
      phone: document.getElementById("phoneNo").value.trim() || "",
      age: document.getElementById("age").value.trim() || "",
      address: document.getElementById("address").value.trim() || "",
      medicalInfo: document.getElementById("medicalInfo").value.trim() || "",
      gender: document.getElementById("gender").value.trim() || "",
    };
  
    const allEmpty = Object.values(formData).every(value => value === "");
  
    if (allEmpty) {
      console.log("Draft not saved: all fields are empty.");
      return;
    }
  
    localStorage.setItem("formDraft", JSON.stringify(formData));
    showToast("Draft saved!");
  }
  
  // 📥 Load Draft on Page Load
  window.addEventListener("DOMContentLoaded", () => {
    const savedDraft = localStorage.getItem("formDraft");
    if (savedDraft) {
      const formData = JSON.parse(savedDraft);
      document.getElementById("name").value = formData.name || "";
      document.getElementById("email").value = formData.email || "";
      document.getElementById("phoneNo").value = formData.phone || "";
      document.getElementById("age").value = formData.age || "";
      document.getElementById("address").value = formData.address || "";
      document.getElementById("medicalInfo").value = formData.medicalInfo || "";
      document.getElementById("gender").value = formData.gender || "";
    }
  });
  
  // ⏳ Auto Save after 10s of inactivity
  let draftTimer;
  document.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener("input", () => {
      clearTimeout(draftTimer);
      draftTimer = setTimeout(() => {
        saveDraft(); // Save draft
        showToast("Draft auto saved!"); // Show toast
      }, 20000); // 10 seconds
    });
  });
  
  // ✅ Toast Message
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 50%;
      transform: translateX(50%);
      background: #28a745;
      color: #fff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 9999;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      animation: fadeInOut 3s ease-in-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  function clearDraft() {
      localStorage.removeItem("formDraft");
    }
   // 💾 Auto Save on Page Reload or Close
  window.addEventListener("beforeunload", (event) => {
      saveDraft(); // Save draft just before leaving
    });
     
 // Initialize past events slider
 function initPastEventsSlider() {
     const slider = document.querySelector('.past-events-slider');
     const dots = document.querySelectorAll('.dot');
     const prevBtn = document.querySelector('.slider-prev');
     const nextBtn = document.querySelector('.slider-next');
     
     if (!slider || !dots.length || !prevBtn || !nextBtn) return;
     
     let currentSlide = 0;
     const slideWidth = 300 + 24; // slide width + gap
     const slidesCount = document.querySelectorAll('.past-event').length;
     
     // Set active dot
     function setActiveDot(index) {
         dots.forEach(dot => dot.classList.remove('active'));
         dots[index].classList.add('active');
     }
     
     // Scroll to slide
     function scrollToSlide(index) {
         slider.scrollTo({
             left: index * slideWidth,
             behavior: 'smooth'
         });
         currentSlide = index;
         setActiveDot(index);
     }
     
     // Event listeners for dots
     dots.forEach((dot, index) => {
         dot.addEventListener('click', () => {
             scrollToSlide(index);
         });
     });
     
     // Event listeners for prev/next buttons
     prevBtn.addEventListener('click', () => {
         currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
         scrollToSlide(currentSlide);
     });
     
     nextBtn.addEventListener('click', () => {
         currentSlide = (currentSlide + 1) % slidesCount;
         scrollToSlide(currentSlide);
     });
 }
 
 