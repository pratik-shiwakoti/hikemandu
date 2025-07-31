// Header Search Integration
document.addEventListener("DOMContentLoaded", () => {
  // Initialize header search if it exists
  if (document.querySelector(".header-search-input")) {
    const headerSearchScript = document.createElement("script")
    headerSearchScript.src = "header-search.js"
    document.head.appendChild(headerSearchScript)
  }

  // Dropdown Navigation
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle")
    const menu = dropdown.querySelector(".dropdown-menu")

    // Desktop hover behavior is handled by CSS
    // Mobile click behavior
    if (window.innerWidth <= 768) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault()
        dropdown.classList.toggle("active")

        // Close other dropdowns
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("active")
          }
        })
      })
    }
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active")
      })
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active")
      })
    }
  })
})

// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const body = document.querySelector("body")
let mobileNav

// Create mobile navigation
function createMobileNav() {
  // Create mobile nav element
  mobileNav = document.createElement("div")
  mobileNav.className = "mobile-nav"

  // Create mobile nav header
  const mobileNavHeader = document.createElement("div")
  mobileNavHeader.className = "mobile-nav-header"

  // Add logo to mobile nav
  const logoClone = document.querySelector(".logo").cloneNode(true)
  mobileNavHeader.appendChild(logoClone)

  // Add close button
  const closeBtn = document.createElement("div")
  closeBtn.className = "mobile-nav-close"
  closeBtn.innerHTML = "&times;"
  closeBtn.addEventListener("click", toggleMobileNav)
  mobileNavHeader.appendChild(closeBtn)

  // Create nav links
  const navLinks = document.createElement("div")
  navLinks.className = "mobile-nav-links"

  // Clone nav links from desktop
  const desktopLinks = document.querySelectorAll(".nav-links > li")
  desktopLinks.forEach((li) => {
    const dropdown = li.querySelector(".dropdown-menu")
    if (dropdown) {
      // Handle dropdown items
      const toggle = li.querySelector(".dropdown-toggle")
      const toggleClone = toggle.cloneNode(true)
      toggleClone.addEventListener("click", (e) => {
        e.preventDefault()
        li.classList.toggle("active")
      })
      navLinks.appendChild(toggleClone)

      const dropdownClone = dropdown.cloneNode(true)
      dropdownClone.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", toggleMobileNav)
      })
      navLinks.appendChild(dropdownClone)
    } else {
      // Handle regular links
      const link = li.querySelector("a")
      if (link) {
        const newLink = link.cloneNode(true)
        newLink.addEventListener("click", toggleMobileNav)
        navLinks.appendChild(newLink)
      }
    }
  })

  // Add search button
  const searchBtn = document.createElement("button")
  searchBtn.className = "search-btn"
  searchBtn.title = "Search (Ctrl+K)"
  searchBtn.innerHTML = '<i class="fas fa-search"></i>'

  // Add book button
  const bookBtn = document.createElement("button")
  bookBtn.className = "btn primary-btn mobile-book-btn"
  bookBtn.textContent = "Book a Trek"

  // Add theme toggle
  const themeToggleWrapper = document.createElement("div")
  themeToggleWrapper.className = "theme-toggle-wrapper"
  themeToggleWrapper.innerHTML = `
        <input type="checkbox" id="mobile-theme-toggle" class="theme-toggle">
        <label for="mobile-theme-toggle" class="theme-toggle-label">
            <div class="theme-toggle-thumb"></div>
            <div class="theme-toggle-icons">
                <i class="fas fa-sun sun"></i>
                <i class="fas fa-moon moon"></i>
            </div>
        </label>
    `

  // Append all elements
  mobileNav.appendChild(mobileNavHeader)
  mobileNav.appendChild(searchBtn)
  mobileNav.appendChild(navLinks)
  mobileNav.appendChild(bookBtn)
  mobileNav.appendChild(themeToggleWrapper)

  // Add to body
  body.appendChild(mobileNav)
}

// Toggle mobile navigation
function toggleMobileNav() {
  if (!mobileNav) {
    createMobileNav()
  }

  mobileNav.classList.toggle("active")
  body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : ""

  // Toggle hamburger animation
  hamburger.classList.toggle("active")

  if (hamburger.classList.contains("active")) {
    hamburger.querySelector(".bar:nth-child(1)").style.transform = "translateY(8px) rotate(45deg)"
    hamburger.querySelector(".bar:nth-child(2)").style.opacity = "0"
    hamburger.querySelector(".bar:nth-child(3)").style.transform = "translateY(-8px) rotate(-45deg)"
  } else {
    hamburger.querySelector(".bar:nth-child(1)").style.transform = "none"
    hamburger.querySelector(".bar:nth-child(2)").style.opacity = "1"
    hamburger.querySelector(".bar:nth-child(3)").style.transform = "none"
  }
}

// Add event listener to hamburger
if (hamburger) {
  hamburger.addEventListener("click", toggleMobileNav)
}

// Enhanced Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  const html = document.documentElement

  // Load saved theme or detect system preference
  const savedTheme =
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  // Apply theme function
  function applyTheme(theme) {
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    // Sync checkboxes
    const isDark = theme === "dark"
    if (themeToggle) themeToggle.checked = isDark
    if (mobileThemeToggle) mobileThemeToggle.checked = isDark

    // Update body background for better dark mode visibility
    if (theme === "dark") {
      document.body.style.backgroundColor = "var(--bg-primary)"
    }
  }

  // Initialize
  applyTheme(savedTheme)

  // Toggle theme handlers
  function handleThemeToggle() {
    const newTheme = this.checked ? "dark" : "light"
    applyTheme(newTheme)

    // Add visual feedback
    this.parentElement.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.parentElement.style.transform = "scale(1)"
    }, 150)
  }

  if (themeToggle) themeToggle.addEventListener("change", handleThemeToggle)

  // Handle mobile theme toggle when it's created
  document.addEventListener("click", (e) => {
    if (e.target.id === "mobile-theme-toggle") {
      e.target.addEventListener("change", handleThemeToggle)
    }
  })

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light")
    }
  })
})

// Gallery Filtering
const filterBtns = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Get filter value
    const filter = btn.getAttribute("data-filter")

    // Filter gallery items
    galleryItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
  })
})

// Gallery Modal
const galleryModal = document.querySelector(".gallery-modal")
const modalImg = document.getElementById("modal-img")
const modalTitle = document.getElementById("modal-title")
const modalLocation = document.getElementById("modal-location")
const modalDate = document.getElementById("modal-date")
const closeModal = document.querySelector(".close-modal")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")

let currentIndex = 0
const visibleItems = []

// Open modal when clicking on gallery item
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Get all currently visible items
    visibleItems.length = 0
    galleryItems.forEach((item, i) => {
      if (item.style.display !== "none") {
        visibleItems.push(i)
      }
    })

    // Find index in visible items
    currentIndex = visibleItems.indexOf(index)

    // Update modal content
    updateModalContent()

    // Show modal
    galleryModal.style.display = "block"
    document.body.style.overflow = "hidden"
  })
})

// Close modal
if (closeModal) {
  closeModal.addEventListener("click", () => {
    galleryModal.style.display = "none"
    document.body.style.overflow = ""
  })
}

// Navigate to previous image
if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length
    updateModalContent()
  })
}

// Navigate to next image
if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    currentIndex = (currentIndex + 1) % visibleItems.length
    updateModalContent()
  })
}

// Update modal content
function updateModalContent() {
  const itemIndex = visibleItems[currentIndex]
  const item = galleryItems[itemIndex]
  const img = item.querySelector("img")
  const title = item.querySelector("h3").textContent
  const location = item.querySelector("p").textContent
  const date = item.querySelector(".gallery-date") ? item.querySelector(".gallery-date").textContent : ""

  modalImg.src = img.src
  modalTitle.textContent = title
  modalLocation.textContent = location
  modalDate.textContent = date
}

// Close modal when clicking outside the image
if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      galleryModal.style.display = "none"
      document.body.style.overflow = ""
    }
  })
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (galleryModal && galleryModal.style.display === "block") {
    if (e.key === "Escape") {
      galleryModal.style.display = "none"
      document.body.style.overflow = ""
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length
      updateModalContent()
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % visibleItems.length
      updateModalContent()
    }
  }
})

// Testimonial Slider
const testimonialDots = document.querySelectorAll(".dot")
const testimonialSlider = document.querySelector(".testimonial-slider")
const testimonialCards = document.querySelectorAll(".testimonial-card")

if (testimonialDots.length > 0) {
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Remove active class from all dots
      testimonialDots.forEach((d) => d.classList.remove("active"))

      // Add active class to clicked dot
      dot.classList.add("active")

      // Calculate scroll position
      const cardWidth = testimonialCards[0].offsetWidth
      const gap = 16 // Assuming 1rem = 16px
      const scrollPosition = index * (cardWidth + gap)

      // Scroll to position
      testimonialSlider.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    })
  })

  // Update active dot on scroll
  testimonialSlider.addEventListener("scroll", () => {
    const scrollPosition = testimonialSlider.scrollLeft
    const cardWidth = testimonialCards[0].offsetWidth
    const gap = 16 // Assuming 1rem = 16px

    const activeIndex = Math.round(scrollPosition / (cardWidth + gap))

    testimonialDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  })
}

// Enhanced Sticky Header
const header = document.querySelector("header")
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY

  // Add background blur and shadow on scroll
  if (currentScrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "var(--card-bg)"
    header.style.backdropFilter = "blur(0px)"
    header.style.boxShadow = "var(--card-shadow)"
  }

  // Hide/show header on scroll (only on mobile)
  if (window.innerWidth <= 768 && currentScrollY > 500) {
    if (currentScrollY > lastScrollY && !mobileNav?.classList.contains("active")) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }
  } else {
    header.style.transform = "translateY(0)"
  }

  lastScrollY = currentScrollY
})

// Update copyright year
const yearElement = document.getElementById("year")
if (yearElement) {
  yearElement.textContent = new Date().getFullYear()
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = header.offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced Scroll to top button
const scrollTopBtn = document.createElement("div")
scrollTopBtn.className = "scroll-top"
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollTopBtn.setAttribute("aria-label", "Scroll to top")
document.body.appendChild(scrollTopBtn)

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("active")
  } else {
    scrollTopBtn.classList.remove("active")
  }
})

// Initialize the page
window.addEventListener("DOMContentLoaded", () => {
  // Set active filter button
  if (filterBtns.length > 0) {
    filterBtns[0].classList.add("active")
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".section-header, .hike-card, .destination-card, .gallery-item, .about-content, .testimonial-card",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in")
      }
    })
  }

  // Initial check
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)
})

// Upcoming Event Countdown
document.addEventListener("DOMContentLoaded", () => {
  const eventCountdownElement = document.getElementById("event-countdown")
  if (eventCountdownElement) {
    // Set the event date
    const eventDate = new Date("October 19, 2025 10:00:00").getTime()

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      // Get current date and time
      const now = new Date().getTime()

      // Find the distance between now and the event date
      const distance = eventDate - now

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result
      eventCountdownElement.innerHTML = `${days} days : ${hours} hrs : ${minutes} mins : ${seconds} secs`

      // If the countdown is finished, display expired message
      if (distance < 0) {
        clearInterval(countdownInterval)
        eventCountdownElement.innerHTML = "Event has started!"
      }
    }, 1000)
  }
})

// FAQ Functionality
class FAQManager {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item")
    this.init()
  }

  init() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      if (question) {
        question.addEventListener("click", () => this.toggleFAQ(item))
      }
    })

    // Close all FAQs when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".faq-item")) {
        this.closeAllFAQs()
      }
    })

    // Keyboard navigation
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      if (question) {
        question.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            this.toggleFAQ(item)
          }
        })
      }
    })
  }

  toggleFAQ(item) {
    const isActive = item.classList.contains("active")

    // Close all other FAQs
    this.faqItems.forEach((faqItem) => {
      if (faqItem !== item) {
        faqItem.classList.remove("active")
      }
    })

    // Toggle current FAQ
    if (isActive) {
      item.classList.remove("active")
    } else {
      item.classList.add("active")
    }
  }

  closeAllFAQs() {
    this.faqItems.forEach((item) => {
      item.classList.remove("active")
    })
  }
}

// Initialize FAQ manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.faqManager = new FAQManager()
})

// AI Chatbot Functionality
class HikemandChatbot {
  constructor() {
    this.chatbotToggle = document.querySelector(".chatbot-toggle")
    this.chatbotWindow = document.querySelector(".chatbot-window")
    this.chatbotClose = document.querySelector(".chatbot-close")
    this.chatbotInput = document.querySelector(".chatbot-input")
    this.chatbotSend = document.querySelector(".chatbot-send")
    this.chatbotMessages = document.querySelector(".chatbot-messages")
    this.isOpen = false

    this.responses = {
      greetings: [
        "Hello! I'm here to help you with your hiking adventures in Nepal. What would you like to know?",
        "Hi there! Ready to explore the beautiful trails around Kathmandu? How can I assist you?",
        "Welcome to Hikemandu! I can help you with trail information, hiking tips, and more. What's your question?",
      ],
      trails: {
        shivapuri:
          "Shivapuri National Park is one of our most popular trails! It's a moderate 5-6 hour hike (12km round trip) through lush forests to Manichud Daha lake. Best visited October-May. Entry fee: NPR 100 for Nepalis, NPR 500 for foreigners.",
        nagarkot:
          "Nagarkot is perfect for sunrise views! It's an easy to moderate 4-5 hour trek (8km round trip) with stunning Himalayan panoramas. Best time is early morning for sunrise. No entrance fee required.",
        chandragiri:
          "Chandragiri Hills offers amazing valley views! It's a moderate 3-4 hour hike (7km one way) with cable car option for return. Great for panoramic Kathmandu Valley and Himalayan views.",
        phulchowki:
          "Phulchowki is our most challenging day hike! 6-7 hours (14km round trip) to the highest hill around Kathmandu Valley. Rich biodiversity and mountain views. Requires good fitness.",
        champadevi:
          "Champadevi is a sacred hill with temple! Moderate 4-5 hour hike (10km round trip) offering panoramic views. Great for cultural and natural experience combined.",
        nagarjun:
          "Nagarjun Forest Reserve is perfect for peaceful hiking! Easy to moderate 3-4 hour trek (8km round trip) through forests with Buddhist monasteries. Entry fee: NPR 50 for Nepalis, NPR 200 for foreigners.",
      },
      tips: {
        general:
          "For hiking in Kathmandu Valley: bring 2+ liters water, comfortable hiking shoes, sun protection, rain jacket, snacks, first aid kit, and ID. Start early, check weather, and inform someone of your plans!",
        season:
          "Best hiking seasons: Autumn (Oct-Nov) and Spring (Mar-May) for clear views and pleasant weather. Winter is good but cold mornings. Avoid monsoon (Jun-Sep) due to rain and poor visibility.",
        fitness:
          "Fitness requirements vary: Easy trails need basic fitness for 3-4 hours walking. Moderate trails need good cardiovascular fitness for 5-6 hours. Challenging trails require excellent fitness. Start with easier trails!",
        safety:
          "Safety tips: Never hike alone in remote areas, carry emergency contacts, stay on marked trails, check weather conditions, start early, carry enough water/food, and consider hiring a guide for unfamiliar trails.",
      },
      weather:
        "Weather in Kathmandu Valley varies by season. Check current conditions before hiking. Generally: Oct-Nov (clear, cool), Dec-Feb (cold mornings, clear days), Mar-May (warm, clear), Jun-Sep (monsoon, avoid hiking).",
      booking:
        "You can book guided hikes through our website or contact us at +977 9813092717. We offer group hikes, private guides, and custom itineraries. Check our upcoming events for scheduled group hikes!",
      cost: "Costs vary by trail and services. Park entrance fees: Shivapuri (NPR 100-500), Nagarjun (NPR 50-200). Guide fees: NPR 2000-4000/day. Group hikes: NPR 500-1500 per person including guide and basic refreshments.",
    }

    this.init()
  }

  init() {
    if (this.chatbotToggle) {
      this.chatbotToggle.addEventListener("click", () => this.toggleChatbot())
    }

    if (this.chatbotClose) {
      this.chatbotClose.addEventListener("click", () => this.closeChatbot())
    }

    if (this.chatbotSend) {
      this.chatbotSend.addEventListener("click", () => this.sendMessage())
    }

    if (this.chatbotInput) {
      this.chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage()
        }
      })
    }

    // Close chatbot when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.chatbotWindow.contains(e.target) && !this.chatbotToggle.contains(e.target)) {
        this.closeChatbot()
      }
    })
  }

  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot()
    } else {
      this.openChatbot()
    }
  }

  openChatbot() {
    this.chatbotWindow.style.display = "flex"
    this.isOpen = true
    this.chatbotInput.focus()

    // Update toggle icon
    const icon = this.chatbotToggle.querySelector("i")
    if (icon) {
      icon.className = "fas fa-times"
    }
  }

  closeChatbot() {
    this.chatbotWindow.style.display = "none"
    this.isOpen = false

    // Update toggle icon
    const icon = this.chatbotToggle.querySelector("i")
    if (icon) {
      icon.className = "fas fa-comments"
    }
  }

  sendMessage() {
    const message = this.chatbotInput.value.trim()
    if (!message) return

    // Add user message
    this.addMessage(message, "user")

    // Clear input
    this.chatbotInput.value = ""

    // Generate and add bot response
    setTimeout(() => {
      const response = this.generateResponse(message)
      this.addMessage(response, "bot")
    }, 500)
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}`
    messageDiv.innerHTML = `<p>${text}</p>`

    this.chatbotMessages.appendChild(messageDiv)
    this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase()

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return this.getRandomResponse(this.responses.greetings)
    }

    // Trail-specific questions
    if (lowerMessage.includes("shivapuri")) {
      return this.responses.trails.shivapuri
    }
    if (lowerMessage.includes("nagarkot")) {
      return this.responses.trails.nagarkot
    }
    if (lowerMessage.includes("chandragiri")) {
      return this.responses.trails.chandragiri
    }
    if (lowerMessage.includes("phulchowki")) {
      return this.responses.trails.phulchowki
    }
    if (lowerMessage.includes("champadevi")) {
      return this.responses.trails.champadevi
    }
    if (lowerMessage.includes("nagarjun")) {
      return this.responses.trails.nagarjun
    }

    // General hiking questions
    if (
      lowerMessage.includes("what to bring") ||
      lowerMessage.includes("packing") ||
      lowerMessage.includes("equipment")
    ) {
      return this.responses.tips.general
    }
    if (
      lowerMessage.includes("best time") ||
      lowerMessage.includes("season") ||
      lowerMessage.includes("when to hike")
    ) {
      return this.responses.tips.season
    }
    if (lowerMessage.includes("fitness") || lowerMessage.includes("difficulty") || lowerMessage.includes("how fit")) {
      return this.responses.tips.fitness
    }
    if (lowerMessage.includes("safety") || lowerMessage.includes("dangerous") || lowerMessage.includes("safe")) {
      return this.responses.tips.safety
    }
    if (lowerMessage.includes("weather") || lowerMessage.includes("rain") || lowerMessage.includes("temperature")) {
      return this.responses.weather
    }
    if (lowerMessage.includes("book") || lowerMessage.includes("guide") || lowerMessage.includes("contact")) {
      return this.responses.booking
    }
    if (
      lowerMessage.includes("cost") ||
      lowerMessage.includes("price") ||
      lowerMessage.includes("fee") ||
      lowerMessage.includes("expensive")
    ) {
      return this.responses.cost
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      "I'd be happy to help! Could you be more specific about what you'd like to know? I can provide information about trails, hiking tips, weather, booking, and more.",
      "That's an interesting question! I specialize in Kathmandu Valley hiking information. Try asking about specific trails like Shivapuri, Nagarkot, or Chandragiri, or general hiking tips.",
      "I'm here to help with your hiking questions! You can ask me about trail difficulties, what to bring, best seasons to hike, safety tips, or how to book guided tours.",
      "Let me help you plan your hiking adventure! I can provide details about popular trails around Kathmandu, hiking preparation tips, weather conditions, and booking information.",
    ]

    return this.getRandomResponse(defaultResponses)
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.hikemandChatbot = new HikemandChatbot()
})

// Performance optimizations
document.addEventListener("DOMContentLoaded", () => {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Preload critical resources
  const criticalResources = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap",
  ]

  criticalResources.forEach((resource) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "style"
    link.href = resource
    document.head.appendChild(link)
  })
})

  function openModal(img) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = img.src;
  }

