// Trekking Destinations Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize filters
  initializeFilters()

  // Initialize load more functionality
  initializeLoadMore()

  // Initialize animations
  initializeAnimations()

  // Set current year in footer
  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
})

// Filter functionality
function initializeFilters() {
  const regionFilter = document.getElementById("region-filter")
  const difficultyFilter = document.getElementById("difficulty-filter")
  const durationFilter = document.getElementById("duration-filter")
  const seasonFilter = document.getElementById("season-filter")
  const clearFiltersBtn = document.querySelector(".clear-filters-btn")
  const destinationCards = document.querySelectorAll(".destination-card")

  // Add event listeners to all filters
  ;[regionFilter, difficultyFilter, durationFilter, seasonFilter].forEach((filter) => {
    if (filter) {
      filter.addEventListener("change", applyFilters)
    }
  })

  // Clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearAllFilters)
  }

  function applyFilters() {
    const regionValue = regionFilter?.value || "all"
    const difficultyValue = difficultyFilter?.value || "all"
    const durationValue = durationFilter?.value || "all"
    const seasonValue = seasonFilter?.value || "all"

    let visibleCount = 0

    destinationCards.forEach((card) => {
      const cardRegion = card.dataset.region
      const cardDifficulty = card.dataset.difficulty
      const cardDuration = card.dataset.duration
      const cardSeasons = card.dataset.season ? card.dataset.season.split(",") : []

      let showCard = true

      // Region filter
      if (regionValue !== "all" && cardRegion !== regionValue) {
        showCard = false
      }

      // Difficulty filter
      if (difficultyValue !== "all" && cardDifficulty !== difficultyValue) {
        showCard = false
      }

      // Duration filter
      if (durationValue !== "all") {
        const cardDurationMatch = getDurationCategory(card)
        if (cardDurationMatch !== durationValue) {
          showCard = false
        }
      }

      // Season filter
      if (seasonValue !== "all" && !cardSeasons.includes(seasonValue)) {
        showCard = false
      }

      // Show/hide card with animation
      if (showCard) {
        card.classList.remove("hidden")
        card.classList.add("visible")
        card.style.display = "block"
        visibleCount++
      } else {
        card.classList.remove("visible")
        card.classList.add("hidden")
        setTimeout(() => {
          if (card.classList.contains("hidden")) {
            card.style.display = "none"
          }
        }, 300)
      }
    })

    // Update results count
    updateResultsCount(visibleCount)
  }

  function getDurationCategory(card) {
    const cardContent = card.querySelector(".card-content")
    const durationText = cardContent?.textContent || ""

    // Extract number of days from the card content
    const daysMatch = durationText.match(/(\d+)\s*days?/i)
    if (daysMatch) {
      const days = Number.parseInt(daysMatch[1])
      if (days <= 7) return "short"
      if (days <= 14) return "medium"
      if (days <= 21) return "long"
      return "extended"
    }
    return "medium" // default
  }

  function clearAllFilters() {
    // Reset all filter selects
    ;[regionFilter, difficultyFilter, durationFilter, seasonFilter].forEach((filter) => {
      if (filter) {
        filter.value = "all"
      }
    })

    // Show all cards
    destinationCards.forEach((card) => {
      card.classList.remove("hidden")
      card.classList.add("visible")
      card.style.display = "block"
    })

    // Update results count
    updateResultsCount(destinationCards.length)

    // Add visual feedback
    clearFiltersBtn.innerHTML = '<i class="fas fa-check"></i> Cleared'
    setTimeout(() => {
      clearFiltersBtn.innerHTML = "Clear All"
    }, 1500)
  }

  function updateResultsCount(count) {
    // Create or update results counter
    let resultsCounter = document.querySelector(".results-counter")
    if (!resultsCounter) {
      resultsCounter = document.createElement("div")
      resultsCounter.className = "results-counter"
      const sectionHeader = document.querySelector(".all-destinations .section-header")
      if (sectionHeader) {
        sectionHeader.appendChild(resultsCounter)
      }
    }

    resultsCounter.innerHTML = `<p>Showing ${count} destination${count !== 1 ? "s" : ""}</p>`

    // Add some styling
    resultsCounter.style.marginTop = "1rem"
    resultsCounter.style.fontSize = "0.9rem"
    resultsCounter.style.color = "var(--text-light)"
    resultsCounter.style.textAlign = "center"
  }
}

// Load more functionality
function initializeLoadMore() {
  const loadMoreBtn = document.querySelector(".load-more-btn")
  const destinationsGrid = document.getElementById("destinations-grid")

  if (!loadMoreBtn || !destinationsGrid) return

  let currentPage = 1
  const itemsPerPage = 8

  // Additional destinations data (would normally come from API)
  const additionalDestinations = [
    {
      region: "everest",
      difficulty: "moderate",
      duration: "short",
      season: "spring,autumn",
      title: "Everest View Trek",
      price: "$899",
      description: "Short trek with stunning Everest views without going to base camp",
      location: "Everest Region",
      days: "8 days",
      altitude: "3,880m",
      seasons: "Spring, Autumn",
      rating: "4.6",
      reviews: "67",
      image: "https://source.unsplash.com/400x300/?everest,view,trek",
    },
    {
      region: "annapurna",
      difficulty: "challenging",
      duration: "medium",
      season: "spring,autumn",
      title: "Annapurna Sanctuary Trek",
      price: "$1,199",
      description: "Deep into the heart of Annapurna with 360-degree mountain views",
      location: "Annapurna Region",
      days: "13 days",
      altitude: "4,130m",
      seasons: "Spring, Autumn",
      rating: "4.8",
      reviews: "43",
      image: "https://source.unsplash.com/400x300/?annapurna,sanctuary",
    },
    {
      region: "langtang",
      difficulty: "easy",
      duration: "short",
      season: "spring,autumn,winter",
      title: "Helambu Trek",
      price: "$599",
      description: "Cultural trek through Sherpa and Tamang villages",
      location: "Langtang Region",
      days: "6 days",
      altitude: "3,510m",
      seasons: "Spring, Autumn, Winter",
      rating: "4.5",
      reviews: "89",
      image: "https://source.unsplash.com/400x300/?helambu,village",
    },
    {
      region: "mustang",
      difficulty: "moderate",
      duration: "short",
      season: "spring,autumn,monsoon",
      title: "Jomsom Muktinath Trek",
      price: "$799",
      description: "Sacred pilgrimage trek to the holy temple of Muktinath",
      location: "Mustang Region",
      days: "7 days",
      altitude: "3,710m",
      seasons: "Spring, Autumn, Monsoon",
      rating: "4.7",
      reviews: "56",
      image: "https://source.unsplash.com/400x300/?muktinath,temple",
    },
  ]

  loadMoreBtn.addEventListener("click", () => {
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
    loadMoreBtn.disabled = true

    // Simulate API call delay
    setTimeout(() => {
      const startIndex = currentPage * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const destinationsToAdd = additionalDestinations.slice(startIndex, endIndex)

      destinationsToAdd.forEach((destination) => {
        const destinationCard = createDestinationCard(destination)
        destinationsGrid.appendChild(destinationCard)

        // Animate in
        setTimeout(() => {
          destinationCard.classList.add("visible")
        }, 100)
      })

      currentPage++

      // Reset button state
      loadMoreBtn.innerHTML = "Load More Destinations"
      loadMoreBtn.disabled = false

      // Hide button if no more destinations
      if (startIndex + itemsPerPage >= additionalDestinations.length) {
        loadMoreBtn.style.display = "none"

        // Show end message
        const endMessage = document.createElement("p")
        endMessage.textContent = "You've seen all our destinations! Contact us for custom treks."
        endMessage.style.textAlign = "center"
        endMessage.style.color = "var(--text-light)"
        endMessage.style.marginTop = "2rem"
        loadMoreBtn.parentNode.appendChild(endMessage)
      }
    }, 1000)
  })
}

function createDestinationCard(destination) {
  const card = document.createElement("div")
  card.className = "destination-card"
  card.dataset.region = destination.region
  card.dataset.difficulty = destination.difficulty
  card.dataset.duration = destination.duration
  card.dataset.season = destination.season

  card.innerHTML = `
        <div class="card-image">
            <img src="${destination.image}" alt="${destination.title}">
            <div class="difficulty-badge ${destination.difficulty}">${destination.difficulty}</div>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3>${destination.title}</h3>
                <div class="price">${destination.price}</div>
            </div>
            <p>${destination.description}</p>
            <div class="trek-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${destination.location}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${destination.days}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-mountain"></i>
                    <span>${destination.altitude}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-thermometer-half"></i>
                    <span>${destination.seasons}</span>
                </div>
            </div>
            <div class="card-rating">
                <div class="stars">
                    ${generateStars(destination.rating)}
                </div>
                <span>${destination.rating} (${destination.reviews} reviews)</span>
            </div>
            <div class="card-actions">
                <a href="#" class="btn outline-btn">View Details</a>
                <a href="#" class="btn primary-btn">Book Now</a>
            </div>
        </div>
    `

  return card
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHTML = ""

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>'
  }

  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>'
  }

  return starsHTML
}

// Initialize animations
function initializeAnimations() {
  // Animate cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all destination cards
  document.querySelectorAll(".destination-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Animate featured cards
  document.querySelectorAll(".featured-card").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
  })

  // Animate info cards
  document.querySelectorAll(".info-card").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 150)
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add booking functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("primary-btn") && e.target.textContent.includes("Book")) {
    e.preventDefault()

    // Get trek details
    const card = e.target.closest(".destination-card") || e.target.closest(".featured-card")
    const trekName = card.querySelector("h3").textContent

    // Show booking modal or redirect
    showBookingModal(trekName)
  }
})

function showBookingModal(trekName) {
  // Create modal
  const modal = document.createElement("div")
  modal.className = "booking-modal"
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book ${trekName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Thank you for your interest in ${trekName}!</p>
                <p>Please contact us to discuss your booking:</p>
                <div class="contact-options">
                    <a href="tel:+9779813092717" class="btn primary-btn">
                        <i class="fas fa-phone"></i> Call Now
                    </a>
                    <a href="mailto:pratikshiwakoti105@gmail.com?subject=Booking Inquiry for ${trekName}" class="btn outline-btn">
                        <i class="fas fa-envelope"></i> Email Us
                    </a>
                </div>
            </div>
        </div>
    `

  // Add modal styles
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `

  const modalContent = modal.querySelector(".modal-content")
  modalContent.style.cssText = `
        background-color: var(--card-bg);
        border-radius: var(--radius);
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        position: relative;
    `

  // Add to page
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Close modal functionality
  const closeModal = () => {
    document.body.removeChild(modal)
    document.body.style.overflow = ""
  }

  modal.querySelector(".modal-close").addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  // Close on escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeModal()
      document.removeEventListener("keydown", handleEscape)
    }
  }
  document.addEventListener("keydown", handleEscape)
}

// Initialize search integration
function initializeSearchIntegration() {
  // Placeholder for HikemanduSearch integration
  // This function should be implemented when HikemanduSearch is available
  console.log("HikemanduSearch integration is pending.")
}

initializeSearchIntegration()
