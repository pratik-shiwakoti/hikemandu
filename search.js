// Search functionality for Hikemandu website

class HikemandySearch {
  constructor() {
    this.searchData = {
      trails: [
        {
          id: "shivapuri",
          title: "Shivapuri National Park Trail",
          description: "Explore lush forests and visit Manichud Daha, offering stunning views of the Kathmandu Valley.",
          category: "trail",
          difficulty: "Moderate",
          duration: "5-6 hours",
          distance: "12 km",
          location: "North of Kathmandu",
          keywords: [
            "shivapuri",
            "national park",
            "manichud daha",
            "forest",
            "monastery",
            "nagi gompa",
            "budhanilkantha",
          ],
          url: "trails/shivapuri.html",
          image: "https://source.unsplash.com/400x300/?shivapuri,forest",
        },
        {
          id: "nagarkot",
          title: "Nagarkot Sunrise Trek",
          description: "Experience breathtaking sunrise views of the Himalayas from this popular viewpoint.",
          category: "trail",
          difficulty: "Easy to Moderate",
          duration: "4-5 hours",
          distance: "8 km",
          location: "East of Kathmandu",
          keywords: ["nagarkot", "sunrise", "himalayas", "view tower", "tamang village", "terraced fields"],
          url: "trails/nagarkot.html",
          image: "https://source.unsplash.com/400x300/?nagarkot,sunrise",
        },
        {
          id: "chandragiri",
          title: "Chandragiri Hills",
          description: "Hike to the summit for panoramic views of Kathmandu Valley and the Himalayan range.",
          category: "trail",
          difficulty: "Moderate",
          duration: "3-4 hours",
          distance: "6 km",
          location: "Southwest of Kathmandu",
          keywords: ["chandragiri", "hills", "cable car", "temple", "panoramic views"],
          url: "trails/chandragiri.html",
          image: "https://source.unsplash.com/400x300/?chandragiri,hills",
        },
        {
          id: "phulchowki",
          title: "Phulchowki Hill",
          description: "The highest hill around Kathmandu Valley, offering rich biodiversity and mountain views.",
          category: "trail",
          difficulty: "Challenging",
          duration: "6-7 hours",
          distance: "15 km",
          location: "South of Kathmandu",
          keywords: ["phulchowki", "highest hill", "biodiversity", "birds", "rhododendron"],
          url: "trails/phulchowki.html",
          image: "https://source.unsplash.com/400x300/?phulchowki,mountain",
        },
        {
          id: "champadevi",
          title: "Champadevi Hill",
          description: "Sacred hill with temple and panoramic views",
          category: "trail",
          difficulty: "Moderate",
          duration: "4-5 hours",
          distance: "10 km",
          location: "Southwest of Kathmandu",
          image: "https://source.unsplash.com/random/400x300/?champadevi,temple",
          url: "trails/champadevi.html",
          keywords: ["champadevi", "temple", "sacred", "panoramic"],
        },
        {
          id: "nagarjun",
          title: "Nagarjun Forest Reserve",
          description: "Peaceful forest hike with monasteries",
          category: "trail",
          difficulty: "Easy to Moderate",
          duration: "3-4 hours",
          distance: "8 km",
          location: "Northwest of Kathmandu",
          image: "https://source.unsplash.com/random/400x300/?nagarjun,forest",
          url: "trails/nagarjun.html",
          keywords: ["nagarjun", "forest", "monastery", "wildlife"],
        },
        {
          id: "ranikot",
          title: "Ranikot, Bhaktapur",
          description: "A historical fort with beautiful surroundings and cultural significance.",
          category: "trail",
          difficulty: "Easy",
          duration: "4-5 hours",
          distance: "10 km",
          location: "Bhaktapur",
          keywords: ["ranikot", "bhaktapur", "fort", "historical", "cultural", "heritage"],
          url: "trails/ranikot.html",
          image: "https://source.unsplash.com/400x300/?ranikot,fort",
        },
      ],
      destinations: [
        {
          id: "everest-base-camp",
          title: "Everest Base Camp Trek",
          description: "The ultimate trekking adventure to the base of the world's highest mountain.",
          category: "destination",
          difficulty: "Challenging",
          duration: "12-16 days",
          altitude: "5,364m",
          location: "Khumbu Region",
          keywords: ["everest", "base camp", "khumbu", "sherpa", "sagarmatha", "lukla"],
          url: "destinations/everest-base-camp.html",
          image: "https://source.unsplash.com/400x300/?everest,base,camp",
        },
        {
          id: "annapurna-circuit",
          title: "Annapurna Circuit Trek",
          description: "A classic trek around the Annapurna massif with diverse landscapes and cultures.",
          category: "destination",
          difficulty: "Moderate to Challenging",
          duration: "15-20 days",
          altitude: "5,416m",
          location: "Annapurna Region",
          keywords: ["annapurna", "circuit", "thorong la", "manang", "muktinath", "pokhara"],
          url: "destinations/annapurna-circuit.html",
          image: "https://source.unsplash.com/400x300/?annapurna,circuit",
        },
        {
          id: "langtang-valley",
          title: "Langtang Valley Trek",
          description: "Beautiful valley trek with stunning mountain views and Tamang culture.",
          category: "destination",
          difficulty: "Moderate",
          duration: "7-10 days",
          altitude: "4,984m",
          location: "Langtang Region",
          keywords: ["langtang", "valley", "tamang", "kyanjin gompa", "cheese factory"],
          url: "destinations/langtang-valley.html",
          image: "https://source.unsplash.com/400x300/?langtang,valley",
        },
      ],
      gallery: [
        {
          id: "ranikot-gallery",
          title: "Ranikot, Bhaktapur Gallery",
          description: "Photos from our trek to the historical Ranikot fort.",
          category: "gallery",
          date: "Mar 22, 2025",
          location: "Ranikot, Bhaktapur",
          keywords: ["ranikot", "bhaktapur", "fort", "historical", "photos", "gallery"],
          url: "gallery.html#ranikot",
          image: "Hiking Image 1.jpg",
        },
        {
          id: "shivapuri-gallery",
          title: "Manichud Daha, Shivapuri Gallery",
          description: "Beautiful photos from our hike to Manichud Daha in Shivapuri National Park.",
          category: "gallery",
          date: "Sept 7, 2024",
          location: "Manichud Daha, Shivapuri National Park",
          keywords: ["manichud daha", "shivapuri", "national park", "lake", "forest", "photos"],
          url: "gallery.html#shivapuri",
          image: "Hiking Image 9.jpg",
        },
        {
          id: "ranijhula-gallery",
          title: "Rani Jhula, Bhaktapur Gallery",
          description: "Scenic photos from our trek to Rani Jhula.",
          category: "gallery",
          date: "Jun 13, 2024",
          location: "Rani Jhula, Bhaktapur",
          keywords: ["rani jhula", "bhaktapur", "bridge", "scenic", "photos"],
          url: "gallery.html#ranijhula",
          image: "Hiking Image 5.jpg",
        },
      ],
      services: [
        {
          id: "guided-tours",
          title: "Guided Hiking Tours",
          description: "Professional guides for safe and informative hiking experiences.",
          category: "service",
          keywords: ["guided", "tours", "professional", "guides", "safe", "informative"],
          url: "index.html#services",
          image: "https://source.unsplash.com/400x300/?guide,hiking",
        },
        {
          id: "equipment-rental",
          title: "Equipment Rental",
          description: "Rent high-quality hiking and trekking equipment.",
          category: "service",
          keywords: ["equipment", "rental", "hiking", "trekking", "gear", "backpack"],
          url: "index.html#services",
          image: "https://source.unsplash.com/400x300/?hiking,equipment",
        },
        {
          id: "transportation",
          title: "Transportation Services",
          description: "Reliable transportation to and from trailheads.",
          category: "service",
          keywords: ["transportation", "pickup", "drop", "trailhead", "reliable"],
          url: "index.html#services",
          image: "https://source.unsplash.com/400x300/?transportation,vehicle",
        },
      ],
      tips: [
        {
          id: "packing-tips",
          title: "Essential Packing Tips for Hiking",
          description: "What to pack for a safe and comfortable hiking experience.",
          category: "tip",
          keywords: ["packing", "essential", "hiking", "gear", "safety", "comfortable"],
          url: "index.html#tips",
          image: "https://source.unsplash.com/400x300/?backpack,hiking",
        },
        {
          id: "weather-tips",
          title: "Weather Considerations for Trekking",
          description: "Understanding Nepal's weather patterns for better trek planning.",
          category: "tip",
          keywords: ["weather", "trekking", "nepal", "planning", "seasons", "monsoon"],
          url: "index.html#tips",
          image: "https://source.unsplash.com/400x300/?weather,mountains",
        },
        {
          id: "safety-tips",
          title: "Hiking Safety Guidelines",
          description: "Important safety tips for hiking in Nepal.",
          category: "tip",
          keywords: ["safety", "guidelines", "hiking", "nepal", "emergency", "first aid"],
          url: "index.html#tips",
          image: "https://source.unsplash.com/400x300/?safety,hiking",
        },
      ],
    }

    this.allItems = this.flattenSearchData()
    this.searchInput = null
    this.searchResults = null
    this.searchOverlay = null
    this.headerSearchInput = null
    this.headerSearchDropdown = null
    this.currentFocus = -1
    this.searchTimeout = null

    this.init()
  }

  flattenSearchData() {
    const allItems = []
    Object.keys(this.searchData).forEach((category) => {
      this.searchData[category].forEach((item) => {
        allItems.push({
          ...item,
          categoryName: category,
        })
      })
    })
    return allItems
  }

  init() {
    this.createSearchElements()
    this.bindEvents()
    this.initHeaderSearch()
  }

  createSearchElements() {
    // Create search overlay with text area
    this.searchOverlay = document.createElement("div")
    this.searchOverlay.className = "search-overlay"
    this.searchOverlay.innerHTML = `
      <div class="search-modal">
        <div class="search-header">
          <div class="search-input-container">
            <i class="fas fa-search search-icon"></i>
            <textarea class="search-textarea-modal" placeholder="Search for trails, destinations, tips, or ask detailed questions..." rows="3" autocomplete="off"></textarea>
            <button class="search-close-btn" aria-label="Close search">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="search-actions">
            <button class="search-submit-btn">
              <i class="fas fa-search"></i>
              Search
            </button>
            <button class="search-clear-btn">
              <i class="fas fa-eraser"></i>
              Clear
            </button>
          </div>
          <div class="search-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="trail">Trails</button>
            <button class="filter-btn" data-filter="destination">Destinations</button>
            <button class="filter-btn" data-filter="gallery">Gallery</button>
            <button class="filter-btn" data-filter="service">Services</button>
            <button class="filter-btn" data-filter="tip">Tips</button>
          </div>
        </div>
        <div class="search-content">
          <div class="search-suggestions">
            <h4>Popular Searches</h4>
            <div class="suggestion-section">
              <h5>Quick Searches</h5>
              <div class="suggestion-tags">
                <span class="suggestion-tag" data-query="shivapuri"><i class="fas fa-mountain"></i> Shivapuri</span>
                <span class="suggestion-tag" data-query="nagarkot sunrise"><i class="fas fa-sun"></i> Nagarkot Sunrise</span>
                <span class="suggestion-tag" data-query="everest base camp"><i class="fas fa-mountain"></i> Everest Base Camp</span>
                <span class="suggestion-tag" data-query="annapurna circuit"><i class="fas fa-route"></i> Annapurna Circuit</span>
              </div>
            </div>
            <div class="suggestion-section">
              <h5>Detailed Queries</h5>
              <div class="suggestion-tags">
                <span class="suggestion-tag" data-query="What are the best trails for beginners around Kathmandu?"><i class="fas fa-question-circle"></i> Best beginner trails</span>
                <span class="suggestion-tag" data-query="How to prepare for high altitude trekking in Nepal?"><i class="fas fa-mountain"></i> High altitude preparation</span>
                <span class="suggestion-tag" data-query="What equipment do I need for monsoon season hiking?"><i class="fas fa-cloud-rain"></i> Monsoon hiking gear</span>
                <span class="suggestion-tag" data-query="Which trails offer the best sunrise views near Kathmandu?"><i class="fas fa-sunrise"></i> Best sunrise spots</span>
              </div>
            </div>
          </div>
          <div class="search-results-container">
            <div class="search-results"></div>
          </div>
        </div>
      </div>
    `
    document.body.appendChild(this.searchOverlay)

    // Get references to elements
    this.searchInput = document.querySelector(".search-textarea-modal")
    this.searchResults = document.querySelector(".search-results")
  }

  initHeaderSearch() {
    // Initialize header search functionality
    this.headerSearchInput = document.querySelector(".header-search-input")
    this.headerSearchDropdown = document.querySelector(".search-dropdown")

    if (this.headerSearchInput) {
      // Header search input events
      this.headerSearchInput.addEventListener("input", (e) => {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          this.handleHeaderSearch(e.target.value)
        }, 300)
      })

      this.headerSearchInput.addEventListener("focus", () => {
        if (!this.headerSearchInput.value.trim()) {
          this.showHeaderSuggestions()
        }
      })

      this.headerSearchInput.addEventListener("blur", (e) => {
        // Delay hiding to allow clicking on dropdown items
        setTimeout(() => {
          if (!this.headerSearchDropdown.matches(':hover')) {
            this.hideHeaderDropdown()
          }
        }, 200)
      })

      // Header search suggestions
      const suggestionItems = document.querySelectorAll(".suggestion-item")
      suggestionItems.forEach(item => {
        item.addEventListener("click", (e) => {
          const query = e.currentTarget.querySelector("span").textContent
          this.headerSearchInput.value = query
          this.handleHeaderSearch(query)
          this.hideHeaderDropdown()
        })
      })
    }
  }

  showHeaderSuggestions() {
    if (this.headerSearchDropdown) {
      const resultsDropdown = this.headerSearchDropdown.querySelector(".search-results-dropdown")
      resultsDropdown.classList.remove("active")
      this.headerSearchDropdown.style.opacity = "1"
      this.headerSearchDropdown.style.visibility = "visible"
      this.headerSearchDropdown.style.transform = "translateY(0)"
    }
  }

  hideHeaderDropdown() {
    if (this.headerSearchDropdown) {
      this.headerSearchDropdown.style.opacity = "0"
      this.headerSearchDropdown.style.visibility = "hidden"
      this.headerSearchDropdown.style.transform = "translateY(-10px)"
    }
  }

  handleHeaderSearch(query) {
    if (!query.trim()) {
      this.showHeaderSuggestions()
      return
    }

    const results = this.search(query, "all").slice(0, 5) // Limit to 5 results for dropdown
    this.displayHeaderResults(results, query)
  }

  displayHeaderResults(results, query) {
    const resultsDropdown = this.headerSearchDropdown.querySelector(".search-results-dropdown")
    
    if (results.length === 0) {
      resultsDropdown.innerHTML = `
        <div class="no-results-dropdown">
          <i class="fas fa-search"></i>
          <p>No results found for "${query}"</p>
        </div>
      `
    } else {
      const resultsHTML = results.map(item => `
        <div class="dropdown-result-item" data-url="${item.url}">
          <div class="dropdown-result-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="dropdown-result-content">
            <div class="dropdown-result-title">${this.highlightText(item.title, query)}</div>
            <div class="dropdown-result-meta">
              ${item.difficulty ? `<span><i class="fas fa-mountain"></i> ${item.difficulty}</span>` : ""}
              ${item.duration ? `<span><i class="fas fa-clock"></i> ${item.duration}</span>` : ""}
              ${item.location ? `<span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("")
      
      resultsDropdown.innerHTML = resultsHTML
    }

    resultsDropdown.classList.add("active")
    this.headerSearchDropdown.style.opacity = "1"
    this.headerSearchDropdown.style.visibility = "visible"
    this.headerSearchDropdown.style.transform = "translateY(0)"

    // Add click handlers
    resultsDropdown.querySelectorAll(".dropdown-result-item").forEach(item => {
      item.addEventListener("click", () => {
        const url = item.dataset.url
        if (url.startsWith("http")) {
          window.open(url, "_blank")
        } else {
          window.location.href = url
        }
        this.hideHeaderDropdown()
      })
    })
  }

  bindEvents() {
    // Header search button (opens modal)
    const headerSearchBtn = document.querySelector(".search-btn")
    if (headerSearchBtn) {
      headerSearchBtn.addEventListener("click", () => this.openSearch())
    }

    // Modal search events
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          this.handleSearch(e.target.value)
        }, 300)
      })
      this.searchInput.addEventListener("keydown", (e) => this.handleKeyNavigation(e))
    }

    // Search submit button
    const submitBtn = document.querySelector(".search-submit-btn")
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const query = this.searchInput.value.trim()
        if (query) {
          this.handleSearch(query)
        }
      })
    }

    // Search clear button
    const clearBtn = document.querySelector(".search-clear-btn")
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.searchInput.value = ""
        this.showSuggestions()
        this.searchInput.focus()
      })
    }

    // Close search
    const closeBtn = document.querySelector(".search-close-btn")
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeSearch())
    }

    // Overlay click to close
    this.searchOverlay.addEventListener("click", (e) => {
      if (e.target === this.searchOverlay) {
        this.closeSearch()
      }
    })

    // Filter buttons
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilter(e.target.dataset.filter))
    })

    // Suggestion tags
    const suggestionTags = document.querySelectorAll(".suggestion-tag")
    suggestionTags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const query = e.target.dataset.query || e.target.closest(".suggestion-tag").dataset.query
        this.searchInput.value = query
        this.handleSearch(query)
      })
    })

    // Keyboard shortcut (Ctrl/Cmd + K)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        this.openSearch()
      }
      if (e.key === "Escape" && this.searchOverlay.classList.contains("active")) {
        this.closeSearch()
      }
    })
  }

  openSearch() {
    this.searchOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      this.searchInput.focus()
    }, 100)
    this.showSuggestions()
  }

  closeSearch() {
    this.searchOverlay.classList.remove("active")
    document.body.style.overflow = ""
    this.searchInput.value = ""
    this.searchResults.innerHTML = ""
    this.currentFocus = -1
    this.showSuggestions()
  }

  showSuggestions() {
    const suggestionsContainer = document.querySelector(".search-suggestions")
    const resultsContainer = document.querySelector(".search-results-container")

    suggestionsContainer.style.display = "block"
    resultsContainer.style.display = "none"
  }

  hideSuggestions() {
    const suggestionsContainer = document.querySelector(".search-suggestions")
    const resultsContainer = document.querySelector(".search-results-container")

    suggestionsContainer.style.display = "none"
    resultsContainer.style.display = "block"
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.showSuggestions()
      return
    }

    this.hideSuggestions()

    const activeFilter = document.querySelector(".filter-btn.active").dataset.filter
    const results = this.search(query, activeFilter)
    this.displayResults(results, query)
  }

  handleFilter(filter) {
    // Update active filter
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active")

    // Re-run search with new filter
    const query = this.searchInput.value
    if (query.trim()) {
      this.handleSearch(query)
    }
  }

  search(query, filter = "all") {
    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0)

    let itemsToSearch = this.allItems
    if (filter !== "all") {
      itemsToSearch = this.allItems.filter((item) => item.category === filter)
    }

    const results = itemsToSearch.map((item) => {
      let score = 0
      const searchableText = [
        item.title,
        item.description,
        ...item.keywords,
        item.location || "",
        item.difficulty || "",
        item.categoryName,
      ]
        .join(" ")
        .toLowerCase()

      // Calculate relevance score
      searchTerms.forEach((term) => {
        // Exact title match gets highest score
        if (item.title.toLowerCase().includes(term)) {
          score += 10
        }
        // Keyword match gets high score
        if (item.keywords && item.keywords.some((keyword) => keyword.toLowerCase().includes(term))) {
          score += 8
        }
        // Description match gets medium score
        if (item.description.toLowerCase().includes(term)) {
          score += 5
        }
        // General text match gets low score
        if (searchableText.includes(term)) {
          score += 2
        }
      })

      return { ...item, score }
    })

    // Filter out items with no matches and sort by score
    return results
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20) // Limit to top 20 results
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No results found</h3>
          <p>Try searching for trails, destinations, or services</p>
          <div class="search-suggestions-inline">
            <p>Popular searches:</p>
            <span class="suggestion-tag" data-query="shivapuri">Shivapuri</span>
            <span class="suggestion-tag" data-query="nagarkot">Nagarkot</span>
            <span class="suggestion-tag" data-query="everest">Everest</span>
          </div>
        </div>
      `
      return
    }

    const resultsHTML = results
      .map(
        (item) => `
      <div class="search-result-item" data-url="${item.url}">
        <div class="result-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="result-category">${this.getCategoryLabel(item.category)}</span>
        </div>
        <div class="result-content">
          <h3 class="result-title">${this.highlightText(item.title, query)}</h3>
          <p class="result-description">${this.highlightText(item.description, query)}</p>
          <div class="result-meta">
            ${item.difficulty ? `<span class="meta-item"><i class="fas fa-mountain"></i> ${item.difficulty}</span>` : ""}
            ${item.duration ? `<span class="meta-item"><i class="fas fa-clock"></i> ${item.duration}</span>` : ""}
            ${item.distance ? `<span class="meta-item"><i class="fas fa-route"></i> ${item.distance}</span>` : ""}
            ${item.location ? `<span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${item.location}</span>` : ""}
            ${item.date ? `<span class="meta-item"><i class="fas fa-calendar"></i> ${item.date}</span>` : ""}
          </div>
        </div>
        <div class="result-action">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    `,
      )
      .join("")

    this.searchResults.innerHTML = `
      <div class="results-header">
        <h3>Search Results (${results.length})</h3>
        <p>Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"</p>
      </div>
      <div class="results-list">
        ${resultsHTML}
      </div>
    `

    // Add click handlers to results
    this.searchResults.querySelectorAll(".search-result-item").forEach((item) => {
      item.addEventListener("click", () => {
        const url = item.dataset.url
        if (url.startsWith("http")) {
          window.open(url, "_blank")
        } else {
          window.location.href = url
        }
        this.closeSearch()
      })
    })

    // Add click handlers to inline suggestions
    this.searchResults.querySelectorAll(".suggestion-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const query = e.target.dataset.query
        this.searchInput.value = query
        this.handleSearch(query)
      })
    })
  }

  getCategoryLabel(category) {
    const labels = {
      trail: "Trail",
      destination: "Destination",
      gallery: "Gallery",
      service: "Service",
      tip: "Tip",
    }
    return labels[category] || category
  }

  highlightText(text, query) {
    if (!query) return text

    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0)
    let highlightedText = text

    searchTerms.forEach((term) => {
      const regex = new RegExp(`(${term})`, "gi")
      highlightedText = highlightedText.replace(regex, "<mark>$1</mark>")
    })

    return highlightedText
  }

  handleKeyNavigation(e) {
    const results = this.searchResults.querySelectorAll(".search-result-item")

    if (e.key === "ArrowDown") {
      e.preventDefault()
      this.currentFocus++
      if (this.currentFocus >= results.length) this.currentFocus = 0
      this.setActiveResult(results)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      this.currentFocus--
      if (this.currentFocus < 0) this.currentFocus = results.length - 1
      this.setActiveResult(results)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (this.currentFocus >= 0 && results[this.currentFocus]) {
        results[this.currentFocus].click()
      } else {
        // If no result is focused, trigger search
        const query = this.searchInput.value.trim()
        if (query) {
          this.handleSearch(query)
        }
      }
    }
  }

  setActiveResult(results) {
    results.forEach((result, index) => {
      if (index === this.currentFocus) {
        result.classList.add("active")
        result.scrollIntoView({ block: "nearest" })
      } else {
        result.classList.remove("active")
      }
    })
  }
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HikemandySearch()
})
