// Credits Page JavaScript

// Declare gtag variable or import it if necessary
const gtag =
  window.gtag ||
  (() => {}) // Placeholder for gtag function // Placeholder for gtag function

document.addEventListener("DOMContentLoaded", () => {
  // Initialize credits page functionality
  initCreditsPage()
  initAnimations()
  initInteractiveElements()
})

function initCreditsPage() {
  // Add any credits-specific initialization here
  console.log("Credits page loaded")

  // Track page view for analytics (if implemented)
  if (typeof gtag !== "undefined") {
    gtag("event", "page_view", {
      page_title: "Credits",
      page_location: window.location.href,
    })
  }
}

function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe all credit cards and sections
  const animatedElements = document.querySelectorAll(
    ".credit-card, .tech-category, .resource-category, .thanks-section, .legal-section, .version-card",
  )

  animatedElements.forEach((el) => {
    observer.observe(el)
  })
}

function initInteractiveElements() {
  // Add click tracking for credit links
  const creditLinks = document.querySelectorAll(".credit-link")
  creditLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Track credit link clicks
      const platform = this.querySelector("i").className
      console.log(`Credit link clicked: ${platform}`)

      // Add analytics tracking if needed
      if (typeof gtag !== "undefined") {
        gtag("event", "click", {
          event_category: "Credits",
          event_label: platform,
        })
      }
    })
  })

  // Add hover effects for tech items
  const techItems = document.querySelectorAll(".tech-item")
  techItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add copy functionality for version numbers
  const versionNumbers = document.querySelectorAll(".version-number")
  versionNumbers.forEach((version) => {
    version.addEventListener("click", function () {
      navigator.clipboard
        .writeText(this.textContent)
        .then(() => {
          showToast("Version number copied to clipboard!")
        })
        .catch(() => {
          console.log("Could not copy version number")
        })
    })

    // Add cursor pointer style
    version.style.cursor = "pointer"
    version.title = "Click to copy version number"
  })

  // Email link functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]')
  emailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Track email clicks
      if (typeof gtag !== "undefined") {
        gtag("event", "click", {
          event_category: "Contact",
          event_label: "Email from Credits",
        })
      }
    })
  })
}

// Toast notification function
function showToast(message, duration = 3000) {
  // Create toast element
  const toast = document.createElement("div")
  toast.className = "toast-notification"
  toast.textContent = message

  // Style the toast
  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "var(--primary-color)",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "var(--radius)",
    boxShadow: "var(--shadow)",
    zIndex: "10000",
    opacity: "0",
    transform: "translateY(-20px)",
    transition: "all 0.3s ease",
  })

  document.body.appendChild(toast)

  // Animate in
  setTimeout(() => {
    toast.style.opacity = "1"
    toast.style.transform = "translateY(0)"
  }, 100)

  // Remove after duration
  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transform = "translateY(-20px)"
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, duration)
}

// Smooth scroll for internal links
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

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    .credit-card,
    .tech-category,
    .resource-category,
    .thanks-section,
    .legal-section,
    .version-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .credit-card.animate-in,
    .tech-category.animate-in,
    .resource-category.animate-in,
    .thanks-section.animate-in,
    .legal-section.animate-in,
    .version-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-notification {
        font-family: var(--font-body);
        font-weight: 500;
        letter-spacing: 0.5px;
    }
`
document.head.appendChild(style)

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Add keyboard shortcuts for credits page
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "h":
        e.preventDefault()
        document.querySelector(".credits-hero").scrollIntoView({ behavior: "smooth" })
        break
      case "d":
        e.preventDefault()
        const devSection = document.querySelector(".credits-section")
        if (devSection) devSection.scrollIntoView({ behavior: "smooth" })
        break
    }
  }
})

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log(`Credits page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`)
    }, 0)
  })
}

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels to interactive elements
  const creditCards = document.querySelectorAll(".credit-card")
  creditCards.forEach((card, index) => {
    card.setAttribute("role", "article")
    card.setAttribute("aria-label", `Team member ${index + 1}`)
  })

  // Add skip links for screen readers
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "sr-only"
  skipLink.style.cssText = `
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `

  skipLink.addEventListener("focus", function () {
    this.style.cssText = `
            position: absolute;
            left: 6px;
            top: 7px;
            z-index: 999999;
            padding: 8px 16px;
            background: var(--primary-color);
            color: white;
            text-decoration: none;
            border-radius: 3px;
        `
  })

  skipLink.addEventListener("blur", function () {
    this.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `
  })

  document.body.insertBefore(skipLink, document.body.firstChild)
}

// Initialize accessibility enhancements
enhanceAccessibility()

// Export functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initCreditsPage,
    initAnimations,
    initInteractiveElements,
    showToast,
  }
}
