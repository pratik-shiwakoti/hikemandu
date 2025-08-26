// Blog functionality
document.addEventListener("DOMContentLoaded", () => {
  // Category filtering
  const categoryBtns = document.querySelectorAll(".category-btn")
  const blogCards = document.querySelectorAll(".blog-card")

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      const category = btn.dataset.category

      // Filter blog cards
      blogCards.forEach((card) => {
        if (category === "all" || card.classList.contains(category)) {
          card.style.display = "block"
          card.classList.remove("hidden")
        } else {
          card.classList.add("hidden")
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".blog-search-input")
  const searchBtn = document.querySelector(".blog-search-btn")

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim()

    blogCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const content = card.querySelector("p").textContent.toLowerCase()
      const tags = Array.from(card.querySelectorAll(".tag")).map((tag) => tag.textContent.toLowerCase())

      const matches = title.includes(query) || content.includes(query) || tags.some((tag) => tag.includes(query))

      if (query === "" || matches) {
        card.style.display = "block"
        card.classList.remove("hidden")
      } else {
        card.classList.add("hidden")
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })

    // Update category buttons
    categoryBtns.forEach((btn) => btn.classList.remove("active"))
    if (query !== "") {
      // If searching, don't highlight any category
    } else {
      // If not searching, highlight "All Posts"
      document.querySelector('[data-category="all"]').classList.add("active")
    }
  }

  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Real-time search
  searchInput.addEventListener("input", () => {
    clearTimeout(searchInput.searchTimeout)
    searchInput.searchTimeout = setTimeout(performSearch, 300)
  })

  // Load more functionality
  const loadMoreBtn = document.querySelector(".load-more-btn")
  const currentPage = 1
  const postsPerPage = 9

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      // Simulate loading
      const originalText = loadMoreBtn.innerHTML
      loadMoreBtn.innerHTML = '<div class="loading"></div> Loading...'
      loadMoreBtn.disabled = true

      setTimeout(() => {
        // In a real application, you would fetch more posts from an API
        // For now, we'll just show a message
        loadMoreBtn.innerHTML = "No more posts to load"
        loadMoreBtn.disabled = true
        loadMoreBtn.style.opacity = "0.6"
      }, 2000)
    })
  }

  // Newsletter signup
  const newsletterForms = document.querySelectorAll(".newsletter-form, .newsletter-signup")

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = form.querySelector('input[type="email"]').value

      if (email) {
        // Simulate subscription
        const submitBtn = form.querySelector("button")
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<div class="loading"></div>'
        submitBtn.disabled = true

        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!'
          submitBtn.style.background = "#16a34a"

          setTimeout(() => {
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false
            submitBtn.style.background = ""
            form.querySelector('input[type="email"]').value = ""
          }, 3000)
        }, 1500)
      }
    })
  })

  // Tag cloud functionality
  const tagLinks = document.querySelectorAll(".tag-link")

  tagLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const tag = link.dataset.tag

      // Set search input to tag
      if (searchInput) {
        searchInput.value = tag
        performSearch()
      }

      // Scroll to blog posts
      document.querySelector(".blog-posts").scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Reading progress indicator (for individual blog posts)
  function updateReadingProgress() {
    const article = document.querySelector("article")
    if (!article) return

    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    let progressBar = document.querySelector(".reading-progress")
    if (!progressBar) {
      progressBar = document.createElement("div")
      progressBar.className = "reading-progress"
      progressBar.style.cssText = `
                position: fixed;
                top: 80px;
                left: 0;
                width: ${scrollPercent}%;
                height: 3px;
                background: var(--primary-color);
                z-index: 1000;
                transition: width 0.1s ease;
            `
      document.body.appendChild(progressBar)
    } else {
      progressBar.style.width = `${scrollPercent}%`
    }
  }

  // Add reading progress for blog post pages
  if (document.querySelector("article")) {
    window.addEventListener("scroll", updateReadingProgress)
  }

  // Lazy loading for images
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

  // Social sharing functionality
  function sharePost(platform, url, title) {
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400")
    }
  }

  // Make share function globally available
  window.sharePost = sharePost

  // Copy link functionality
  window.copyLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      // Show success message
      const message = document.createElement("div")
      message.textContent = "Link copied to clipboard!"
      message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--radius);
                z-index: 10000;
                animation: fadeInOut 2s ease;
            `
      document.body.appendChild(message)

      setTimeout(() => {
        document.body.removeChild(message)
      }, 2000)
    })
  }

  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `
  document.head.appendChild(style)
})
