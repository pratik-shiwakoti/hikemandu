// Trail Details Page JavaScript

// Initialize the page when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map if the map container exists
    const mapContainer = document.getElementById("trail-map")
    if (mapContainer) {
      initializeLeafletMap()
    }
  
    // Initialize the gallery modal
    initializeGalleryModal()
  
    // Fetch weather data
    fetchWeatherData()
  
    // Initialize review form
    initializeReviewForm()
  
    // Set current year in footer
    const yearElement = document.getElementById("year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  })
  
  // Initialize Leaflet Map with the trail route
  function initializeLeafletMap() {
    // Check if L (Leaflet) is defined
    if (typeof L === "undefined") {
      console.error("Leaflet library is not loaded. Make sure to include it in your HTML.")
      return
    }
  
    // Get the trail name from the page title to determine which map to show
    const pageTitle = document.title
    let trailCoordinates, mapCenter, mapZoom
  
    // Set coordinates based on trail
    if (pageTitle.includes("Shivapuri")) {
      mapCenter = [27.8119, 85.3875]
      mapZoom = 13
      trailCoordinates = [
        [27.7919, 85.3675], // Budhanilkantha (starting point)
        [27.795, 85.37],
        [27.8, 85.3725],
        [27.805, 85.375],
        [27.81, 85.3775], // Nagi Gompa
        [27.815, 85.38],
        [27.82, 85.3825],
        [27.825, 85.385],
        [27.83, 85.3875], // Junction
        [27.835, 85.39],
        [27.84, 85.3925],
        [27.845, 85.395],
        [27.85, 85.3975], // Manichud Daha (endpoint)
      ]
    } else if (pageTitle.includes("Nagarkot")) {
      mapCenter = [27.671, 85.4298]
      mapZoom = 14
      trailCoordinates = [
        [27.671, 85.4298], // Nagarkot Bus Stop
        [27.6725, 85.431],
        [27.674, 85.4325],
        [27.6755, 85.434], // View Tower
        [27.677, 85.4355],
        [27.6785, 85.437],
        [27.68, 85.4385], // Tamang Village
        [27.6815, 85.44],
        [27.683, 85.4415],
        [27.6845, 85.443], // Viewpoint
        [27.686, 85.4445],
        [27.6875, 85.446],
        [27.689, 85.4475], // End point
      ]
    } else {
      // Default coordinates if trail not recognized
      mapCenter = [27.7172, 85.324] // Kathmandu
      mapZoom = 12
      trailCoordinates = []
    }
  
    // Create the map
    const map = L.map("trail-map").setView(mapCenter, mapZoom)
  
    // Add different map tile layers
    const openStreetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)
  
    // Add terrain-style tiles from Stamen (no API key needed)
    const terrainLayer = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png", {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 18,
    })
  
    // Add satellite imagery from ESRI
    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        maxZoom: 19,
      },
    )
  
    // Add layer control to switch between map styles
    const baseMaps = {
      "Street Map": openStreetMap,
      Terrain: terrainLayer,
      Satellite: satelliteLayer,
    }
    L.control.layers(baseMaps).addTo(map)
  
    // Define custom icons for different points
    const startIcon = L.divIcon({
      html: '<i class="fas fa-play" style="color: #059669;"></i>',
      className: "map-custom-icon",
      iconSize: [30, 30],
    })
  
    const endIcon = L.divIcon({
      html: '<i class="fas fa-flag-checkered" style="color: #DC2626;"></i>',
      className: "map-custom-icon",
      iconSize: [30, 30],
    })
  
    const viewpointIcon = L.divIcon({
      html: '<i class="fas fa-eye" style="color: #0a2463;"></i>',
      className: "map-custom-icon",
      iconSize: [30, 30],
    })
  
    const restIcon = L.divIcon({
      html: '<i class="fas fa-coffee" style="color: #7c3aed;"></i>',
      className: "map-custom-icon",
      iconSize: [30, 30],
    })
  
    const monasteryIcon = L.divIcon({
      html: '<i class="fas fa-place-of-worship" style="color: #b91c1c;"></i>',
      className: "map-custom-icon",
      iconSize: [30, 30],
    })
  
    const junctionIcon = L.divIcon({
      html: '<i class="fas fa-directions" style="color: #0369a1;"></i>',
      className: "map-custom-icon",
      iconSize: [30, 30],
    })
  
    // Create a polyline for the trail route
    if (trailCoordinates.length > 0) {
      const trailRoute = L.polyline(trailCoordinates, {
        color: "#059669",
        weight: 5,
        opacity: 0.8,
        lineCap: "round",
        lineJoin: "round",
        dashArray: "0, 0",
      }).addTo(map)
  
      // Add animated ant path effect for the trail
      const antPath = L.polyline
        .antPath(trailCoordinates, {
          delay: 400,
          dashArray: [10, 20],
          weight: 5,
          color: "#059669",
          pulseColor: "#10b981",
          paused: false,
          reverse: false,
          hardwareAccelerated: true,
        })
        .addTo(map)
  
      // Add markers for key points based on the trail
      if (pageTitle.includes("Shivapuri")) {
        // Starting point marker
        L.marker(trailCoordinates[0], { icon: startIcon })
          .bindPopup("<strong>Starting Point</strong><br>Budhanilkantha")
          .addTo(map)
  
        // Nagi Gompa marker
        L.marker(trailCoordinates[4], { icon: monasteryIcon })
          .bindPopup("<strong>Nagi Gompa</strong><br>Buddhist Nunnery")
          .addTo(map)
  
        // Junction marker
        L.marker(trailCoordinates[8], { icon: junctionIcon })
          .bindPopup("<strong>Trail Junction</strong><br>To Shivapuri Peak or Manichud Daha")
          .addTo(map)
  
        // Endpoint marker
        L.marker(trailCoordinates[trailCoordinates.length - 1], { icon: endIcon })
          .bindPopup("<strong>Manichud Daha</strong><br>Mountain Lake")
          .addTo(map)
  
        // Add viewpoint markers
        L.marker([27.805, 85.375], { icon: viewpointIcon })
          .bindPopup("<strong>Viewpoint</strong><br>Valley View")
          .addTo(map)
  
        L.marker([27.835, 85.39], { icon: viewpointIcon })
          .bindPopup("<strong>Viewpoint</strong><br>Mountain View")
          .addTo(map)
  
        // Add rest area marker
        L.marker([27.82, 85.3825], { icon: restIcon })
          .bindPopup("<strong>Rest Area</strong><br>Good spot for a break")
          .addTo(map)
      } else if (pageTitle.includes("Nagarkot")) {
        // Starting point marker
        L.marker(trailCoordinates[0], { icon: startIcon })
          .bindPopup("<strong>Starting Point</strong><br>Nagarkot Bus Stop")
          .addTo(map)
  
        // View Tower marker
        L.marker(trailCoordinates[3], { icon: viewpointIcon })
          .bindPopup("<strong>Nagarkot View Tower</strong><br>Panoramic views")
          .addTo(map)
  
        // Tamang Village marker
        L.marker(trailCoordinates[6], {
          icon: L.divIcon({
            html: '<i class="fas fa-home" style="color: #b45309;"></i>',
            className: "map-custom-icon",
            iconSize: [30, 30],
          }),
        })
          .bindPopup("<strong>Tamang Village</strong><br>Traditional village")
          .addTo(map)
  
        // Viewpoint marker
        L.marker(trailCoordinates[9], { icon: viewpointIcon })
          .bindPopup("<strong>Viewpoint</strong><br>Sunrise View")
          .addTo(map)
  
        // Endpoint marker
        L.marker(trailCoordinates[trailCoordinates.length - 1], { icon: endIcon })
          .bindPopup("<strong>End Point</strong>")
          .addTo(map)
  
        // Add rest area
        L.marker([27.6785, 85.437], { icon: restIcon })
          .bindPopup("<strong>Rest Area</strong><br>Good spot for a break")
          .addTo(map)
      }
  
      // Fit the map to the trail bounds
      map.fitBounds(trailRoute.getBounds(), {
        padding: [50, 50],
      })
  
      // Add distance markers
      addDistanceMarkers(map, trailCoordinates)
  
      // Create elevation profile if the library is available
      if (typeof L.control.elevation === "function") {
        createElevationProfile(map, trailCoordinates)
      } else {
        // If elevation control is not available, load it dynamically
        loadElevationControl().then(() => {
          if (typeof L.control.elevation === "function") {
            createElevationProfile(map, trailCoordinates)
          }
        })
      }
    }
  
    // Add scale control
    L.control
      .scale({
        imperial: false,
        maxWidth: 200,
      })
      .addTo(map)
  
    // Add fullscreen control if available
    if (typeof L.control.fullscreen === "function") {
      L.control
        .fullscreen({
          position: "topleft",
          title: "View Fullscreen",
          titleCancel: "Exit Fullscreen",
          forceSeparateButton: true,
        })
        .addTo(map)
    }
  
    // Add locate control if available
    if (typeof L.control.locate === "function") {
      L.control
        .locate({
          position: "topleft",
          strings: {
            title: "Show my location",
          },
          locateOptions: {
            enableHighAccuracy: true,
          },
        })
        .addTo(map)
    }
  
    // Add a legend
    addMapLegend(map)
  }
  
  // Function to add distance markers along the trail
  function addDistanceMarkers(map, coordinates) {
    let totalDistance = 0
    let lastMarkerDistance = 0
  
    for (let i = 1; i < coordinates.length; i++) {
      const segment = L.latLng(coordinates[i - 1]).distanceTo(L.latLng(coordinates[i]))
      totalDistance += segment
  
      // Add a marker every kilometer
      if (Math.floor(totalDistance / 1000) > Math.floor(lastMarkerDistance / 1000)) {
        const km = Math.floor(totalDistance / 1000)
        lastMarkerDistance = totalDistance
  
        // Create a kilometer marker
        const kmIcon = L.divIcon({
          html: `<div class="km-marker">${km} km</div>`,
          className: "km-marker-container",
          iconSize: [40, 40],
        })
  
        L.marker(coordinates[i], { icon: kmIcon }).addTo(map)
      }
    }
  }
  
  // Function to dynamically load the elevation control library
  function loadElevationControl() {
    return new Promise((resolve, reject) => {
      // Load CSS
      const elevationCSS = document.createElement("link")
      elevationCSS.rel = "stylesheet"
      elevationCSS.href = "https://unpkg.com/@raruto/leaflet-elevation/dist/leaflet-elevation.css"
      document.head.appendChild(elevationCSS)
  
      // Load JS
      const elevationJS = document.createElement("script")
      elevationJS.src = "https://unpkg.com/@raruto/leaflet-elevation/dist/leaflet-elevation.js"
      elevationJS.onload = resolve
      elevationJS.onerror = reject
      document.head.appendChild(elevationJS)
    })
  }
  
  // Function to create an elevation profile
  function createElevationProfile(map, coordinates) {
    // Convert coordinates to GeoJSON
    const geoJson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates.map((coord) => [coord[1], coord[0]]),
          },
          properties: {
            name: "Trail Elevation Profile",
          },
        },
      ],
    }
  
    // Create elevation control
    const elevation = L.control
      .elevation({
        position: "bottomright",
        theme: "steelblue-theme",
        width: 600,
        height: 125,
        margins: {
          top: 10,
          right: 20,
          bottom: 30,
          left: 50,
        },
        useHeightIndicator: true,
        interpolation: "linear",
        hoverNumber: {
          decimalsX: 2,
          decimalsY: 0,
          formatter: undefined,
        },
        xTicks: 5,
        yTicks: 5,
        collapsed: false,
        imperial: false,
      })
      .addTo(map)
  
    // Load elevation data
    // For demo purposes, we'll generate synthetic elevation data
    // In a real implementation, you would use actual elevation data
    const syntheticElevationData = generateSyntheticElevation(coordinates)
  
    // Add the elevation data to the GeoJSON
    geoJson.features[0].geometry.coordinates = geoJson.features[0].geometry.coordinates.map((coord, i) => [
      ...coord,
      syntheticElevationData[i],
    ])
  
    // Load the data
    elevation.load(geoJson)
  }
  
  // Function to generate synthetic elevation data for demo purposes
  function generateSyntheticElevation(coordinates) {
    // This is a placeholder function that generates realistic-looking elevation data
    // In a real implementation, you would use actual elevation data from an API or database
  
    const baseElevation = coordinates[0][0].includes("Shivapuri") ? 1400 : 2000 // Base elevation in meters
    const elevationGain = coordinates[0][0].includes("Shivapuri") ? 800 : 500 // Elevation gain in meters
  
    return coordinates.map((_, index) => {
      // Create a realistic elevation profile with some randomness
      const progress = index / (coordinates.length - 1)
      const elevation = baseElevation + elevationGain * Math.sin(progress * Math.PI) + Math.random() * 50 - 25 // Add some noise
  
      return Math.round(elevation)
    })
  }
  
  // Function to add a legend to the map
  function addMapLegend(map) {
    const legend = L.control({ position: "bottomleft" })
  
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend")
      div.innerHTML = `
        <div class="map-legend">
          <h4>Map Legend</h4>
          <div class="legend-item">
            <i class="fas fa-play" style="color: #059669;"></i>
            <span>Starting Point</span>
          </div>
          <div class="legend-item">
            <i class="fas fa-flag-checkered" style="color: #DC2626;"></i>
            <span>End Point</span>
          </div>
          <div class="legend-item">
            <i class="fas fa-eye" style="color: #0a2463;"></i>
            <span>Viewpoint</span>
          </div>
          <div class="legend-item">
            <i class="fas fa-coffee" style="color: #7c3aed;"></i>
            <span>Rest Area</span>
          </div>
          <div class="legend-item">
            <i class="fas fa-place-of-worship" style="color: #b91c1c;"></i>
            <span>Monastery</span>
          </div>
          <div class="legend-item">
            <i class="fas fa-directions" style="color: #0369a1;"></i>
            <span>Trail Junction</span>
          </div>
          <div class="legend-item">
            <div class="trail-line"></div>
            <span>Trail Route</span>
          </div>
        </div>
      `
      return div
    }
  
    legend.addTo(map)
  }
  
  // Initialize the gallery modal
  function initializeGalleryModal() {
    const galleryItems = document.querySelectorAll(".trail-gallery .gallery-item")
    const galleryModal = document.querySelector(".gallery-modal")
    const modalImg = document.getElementById("modal-img")
    const modalTitle = document.getElementById("modal-title")
    const modalDescription = document.getElementById("modal-description")
    const closeModal = document.querySelector(".close-modal")
    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")
  
    if (!galleryItems.length || !galleryModal || !modalImg) return
  
    let currentIndex = 0
  
    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentIndex = index
        updateModalContent()
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
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
        updateModalContent()
      })
    }
  
    // Navigate to next image
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        currentIndex = (currentIndex + 1) % galleryItems.length
        updateModalContent()
      })
    }
  
    // Update modal content
    function updateModalContent() {
      const item = galleryItems[currentIndex]
      const img = item.querySelector("img")
      const title = item.querySelector("h3")?.textContent || ""
      const description = item.querySelector("p")?.textContent || ""
  
      modalImg.src = img.src
      if (modalTitle) modalTitle.textContent = title
      if (modalDescription) modalDescription.textContent = description
    }
  
    // Close modal when clicking outside the image
    galleryModal.addEventListener("click", (e) => {
      if (e.target === galleryModal) {
        galleryModal.style.display = "none"
        document.body.style.overflow = ""
      }
    })
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (galleryModal.style.display === "block") {
        if (e.key === "Escape") {
          galleryModal.style.display = "none"
          document.body.style.overflow = ""
        } else if (e.key === "ArrowLeft") {
          currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
          updateModalContent()
        } else if (e.key === "ArrowRight") {
          currentIndex = (currentIndex + 1) % galleryItems.length
          updateModalContent()
        }
      }
    })
  }
  
  // Fetch weather data for the trail location
  function fetchWeatherData() {
    const weatherInfo = document.getElementById("weather-info")
    if (!weatherInfo) return
  
    // Get coordinates based on trail page
    const pageTitle = document.title
    let lat, lon
  
    if (pageTitle.includes("Shivapuri")) {
      lat = 27.8119
      lon = 85.3875
    } else if (pageTitle.includes("Nagarkot")) {
      lat = 27.671
      lon = 85.4298
    } else {
      // Default to Kathmandu
      lat = 27.7172
      lon = 85.324
    }
  
    // OpenWeatherMap API key - replace with your actual API key if you have one
    // You can get a free API key from OpenWeatherMap without a credit card
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY" // Optional
  
    // If you have an API key, use it to fetch real weather data
    if (apiKey && apiKey !== "YOUR_OPENWEATHERMAP_API_KEY") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Weather data not available")
          }
          return response.json()
        })
        .then((data) => {
          const weatherData = {
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: getWeatherIcon(data.weather[0].id),
            humidity: data.main.humidity,
            wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            visibility: getVisibilityText(data.visibility),
            uv: getUVIndex(),
          }
  
          updateWeatherUI(weatherData)
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error)
          const weatherData = getSimulatedWeatherData(pageTitle)
          updateWeatherUI(weatherData)
        })
    } else {
      // Use simulated weather data
      setTimeout(() => {
        const weatherData = getSimulatedWeatherData(pageTitle)
        updateWeatherUI(weatherData)
      }, 1500)
    }
  }
  
  // Get simulated weather data based on trail and season
  function getSimulatedWeatherData(pageTitle) {
    // Get current month to simulate seasonal weather
    const month = new Date().getMonth() // 0-11
  
    // Determine season (simplified for Nepal)
    // Winter: Dec-Feb (11-1), Spring: Mar-May (2-4), Summer/Monsoon: Jun-Sep (5-8), Autumn: Oct-Nov (9-10)
    let season
    if (month >= 11 || month <= 1) {
      season = "winter"
    } else if (month >= 2 && month <= 4) {
      season = "spring"
    } else if (month >= 5 && month <= 8) {
      season = "monsoon"
    } else {
      season = "autumn"
    }
  
    // Generate realistic weather data based on location and season
    let temp, description, icon, humidity, wind, visibility, uv
  
    if (pageTitle.includes("Shivapuri")) {
      // Shivapuri is at higher elevation
      switch (season) {
        case "winter":
          temp = Math.floor(Math.random() * 6) + 5 // 5-10°C
          description = ["Clear Sky", "Few Clouds", "Mostly Clear"][Math.floor(Math.random() * 3)]
          icon = "sun"
          humidity = Math.floor(Math.random() * 20) + 40 // 40-60%
          wind = Math.floor(Math.random() * 10) + 5 // 5-15 km/h
          visibility = "Excellent"
          uv = "Low"
          break
        case "spring":
          temp = Math.floor(Math.random() * 8) + 12 // 12-20°C
          description = ["Partly Cloudy", "Scattered Clouds", "Clear Sky"][Math.floor(Math.random() * 3)]
          icon = "cloud-sun"
          humidity = Math.floor(Math.random() * 20) + 50 // 50-70%
          wind = Math.floor(Math.random() * 8) + 3 // 3-11 km/h
          visibility = "Good"
          uv = "Moderate"
          break
        case "monsoon":
          temp = Math.floor(Math.random() * 6) + 18 // 18-24°C
          description = ["Light Rain", "Moderate Rain", "Overcast"][Math.floor(Math.random() * 3)]
          icon = "cloud-rain"
          humidity = Math.floor(Math.random() * 15) + 75 // 75-90%
          wind = Math.floor(Math.random() * 10) + 5 // 5-15 km/h
          visibility = "Moderate"
          uv = "Low"
          break
        case "autumn":
          temp = Math.floor(Math.random() * 8) + 14 // 14-22°C
          description = ["Clear Sky", "Few Clouds", "Partly Cloudy"][Math.floor(Math.random() * 3)]
          icon = "sun"
          humidity = Math.floor(Math.random() * 20) + 50 // 50-70%
          wind = Math.floor(Math.random() * 7) + 3 // 3-10 km/h
          visibility = "Excellent"
          uv = "Moderate"
          break
      }
    } else if (pageTitle.includes("Nagarkot")) {
      // Nagarkot is known for views
      switch (season) {
        case "winter":
          temp = Math.floor(Math.random() * 8) + 4 // 4-12°C
          description = ["Clear Sky", "Few Clouds", "Mostly Clear"][Math.floor(Math.random() * 3)]
          icon = "sun"
          humidity = Math.floor(Math.random() * 20) + 40 // 40-60%
          wind = Math.floor(Math.random() * 8) + 4 // 4-12 km/h
          visibility = "Excellent"
          uv = "Low"
          break
        case "spring":
          temp = Math.floor(Math.random() * 8) + 14 // 14-22°C
          description = ["Partly Cloudy", "Scattered Clouds", "Clear Sky"][Math.floor(Math.random() * 3)]
          icon = "cloud-sun"
          humidity = Math.floor(Math.random() * 20) + 50 // 50-70%
          wind = Math.floor(Math.random() * 6) + 3 // 3-9 km/h
          visibility = "Good"
          uv = "Moderate"
          break
        case "monsoon":
          temp = Math.floor(Math.random() * 6) + 20 // 20-26°C
          description = ["Light Rain", "Moderate Rain", "Overcast"][Math.floor(Math.random() * 3)]
          icon = "cloud-rain"
          humidity = Math.floor(Math.random() * 15) + 75 // 75-90%
          wind = Math.floor(Math.random() * 8) + 5 // 5-13 km/h
          visibility = "Poor"
          uv = "Low"
          break
        case "autumn":
          temp = Math.floor(Math.random() * 8) + 16 // 16-24°C
          description = ["Clear Sky", "Few Clouds", "Partly Cloudy"][Math.floor(Math.random() * 3)]
          icon = "sun"
          humidity = Math.floor(Math.random() * 20) + 45 // 45-65%
          wind = Math.floor(Math.random() * 6) + 3 // 3-9 km/h
          visibility = "Excellent"
          uv = "Moderate"
          break
      }
    } else {
      // Default weather for Kathmandu area
      switch (season) {
        case "winter":
          temp = Math.floor(Math.random() * 10) + 8 // 8-18°C
          description = ["Clear Sky", "Few Clouds", "Partly Cloudy"][Math.floor(Math.random() * 3)]
          icon = "sun"
          humidity = Math.floor(Math.random() * 20) + 50 // 50-70%
          wind = Math.floor(Math.random() * 5) + 2 // 2-7 km/h
          visibility = "Moderate"
          uv = "Low"
          break
        case "spring":
          temp = Math.floor(Math.random() * 8) + 18 // 18-26°Cndom() * 8) + 18; // 18-26°C
          description = ["Partly Cloudy", "Scattered Clouds", "Clear Sky"][Math.floor(Math.random() * 3)]
          icon = "cloud-sun"
          humidity = Math.floor(Math.random() * 20) + 55 // 55-75%
          wind = Math.floor(Math.random() * 6) + 3 // 3-9 km/h
          visibility = "Good"
          uv = "High"
          break
        case "monsoon":
          temp = Math.floor(Math.random() * 6) + 24 // 24-30°C
          description = ["Light Rain", "Moderate Rain", "Overcast"][Math.floor(Math.random() * 3)]
          icon = "cloud-rain"
          humidity = Math.floor(Math.random() * 10) + 80 // 80-90%
          wind = Math.floor(Math.random() * 8) + 4 // 4-12 km/h
          visibility = "Poor"
          uv = "Moderate"
          break
        case "autumn":
          temp = Math.floor(Math.random() * 8) + 20 // 20-28°C
          description = ["Clear Sky", "Few Clouds", "Partly Cloudy"][Math.floor(Math.random() * 3)]
          icon = "sun"
          humidity = Math.floor(Math.random() * 20) + 50 // 50-70%
          wind = Math.floor(Math.random() * 5) + 2 // 2-7 km/h
          visibility = "Good"
          uv = "Moderate"
          break
      }
    }
  
    return {
      temp,
      description,
      icon,
      humidity,
      wind,
      visibility,
      uv,
    }
  }
  
  // Update the weather UI with the data
  function updateWeatherUI(weatherData) {
    const weatherInfo = document.getElementById("weather-info")
    if (!weatherInfo) return
  
    weatherInfo.innerHTML = `
          <div class="weather-temp">${weatherData.temp}°C</div>
          <div class="weather-desc">
              <i class="fas fa-${weatherData.icon}"></i>
              <span>${weatherData.description}</span>
          </div>
          <div class="weather-details">
              <div class="weather-detail">
                  <span class="weather-detail-label">Humidity</span>
                  <span class="weather-detail-value">${weatherData.humidity}%</span>
              </div>
              <div class="weather-detail">
                  <span class="weather-detail-label">Wind</span>
                  <span class="weather-detail-value">${weatherData.wind} km/h</span>
              </div>
              <div class="weather-detail">
                  <span class="weather-detail-label">Visibility</span>
                  <span class="weather-detail-value">${weatherData.visibility}</span>
              </div>
              <div class="weather-detail">
                  <span class="weather-detail-label">UV Index</span>
                  <span class="weather-detail-value">${weatherData.uv}</span>
              </div>
          </div>
          <div class="weather-update-time">
              Updated: ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
      `
  }
  
  // Helper function to get weather icon based on condition code
  function getWeatherIcon(conditionCode) {
    // Map OpenWeatherMap condition codes to Font Awesome icons
    if (conditionCode >= 200 && conditionCode < 300) {
      return "bolt" // Thunderstorm
    } else if (conditionCode >= 300 && conditionCode < 400) {
      return "cloud-rain" // Drizzle
    } else if (conditionCode >= 500 && conditionCode < 600) {
      return "cloud-showers-heavy" // Rain
    } else if (conditionCode >= 600 && conditionCode < 700) {
      return "snowflake" // Snow
    } else if (conditionCode >= 700 && conditionCode < 800) {
      return "smog" // Atmosphere (fog, mist, etc.)
    } else if (conditionCode === 800) {
      return "sun" // Clear sky
    } else if (conditionCode > 800 && conditionCode < 900) {
      return "cloud-sun" // Clouds
    } else {
      return "cloud" // Default
    }
  }
  
  // Helper function to get visibility text
  function getVisibilityText(visibilityMeters) {
    if (visibilityMeters >= 10000) {
      return "Excellent"
    } else if (visibilityMeters >= 5000) {
      return "Good"
    } else if (visibilityMeters >= 2000) {
      return "Moderate"
    } else {
      return "Poor"
    }
  }
  
  // Helper function to get UV index (would normally use a separate API call)
  function getUVIndex() {
    // In a real implementation, you would fetch UV data from an API
    // For this demo, we'll return a simulated value
    const month = new Date().getMonth()
    const hour = new Date().getHours()
  
    // Higher UV in summer months and midday hours
    if (month >= 3 && month <= 8 && hour >= 10 && hour <= 16) {
      return "High"
    } else if (month >= 2 && month <= 9 && hour >= 9 && hour <= 17) {
      return "Moderate"
    } else {
      return "Low"
    }
  }
  
  // Initialize the review form
  function initializeReviewForm() {
    const reviewForm = document.getElementById("review-form")
    if (!reviewForm) return
  
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form values
      const name = document.getElementById("reviewer-name").value
      const email = document.getElementById("reviewer-email").value
      const rating = document.querySelector('input[name="rating"]:checked').value
      const hikeDate = document.getElementById("hike-date").value
      const reviewText = document.getElementById("review-text").value
  
      // Validate form
      if (!name || !email || !rating || !reviewText) {
        alert("Please fill in all required fields")
        return
      }
  
      // In a real implementation, you would send this data to a server
      // For this demo, we'll simulate a successful submission
  
      // Show loading state
      const submitBtn = document.querySelector(".review-submit-btn")
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
      submitBtn.disabled = true
  
      // Simulate submission delay
      setTimeout(() => {
        // Create a new review card
        const reviewsList = document.querySelector(".reviews-list")
        const newReview = document.createElement("div")
        newReview.className = "review-card new-review"
  
        // Add the review content
        newReview.innerHTML = `
                  <div class="review-header">
                      <div class="reviewer-info">
                          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random" alt="Reviewer" class="reviewer-img">
                          <div class="reviewer-details">
                              <h4>${name}</h4>
                              <div class="review-date">Hiked on ${new Date(hikeDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                          </div>
                      </div>
                      <div class="review-rating">
                          ${generateStarRating(rating)}
                      </div>
                  </div>
                  <div class="review-content">
                      <p>${reviewText}</p>
                  </div>
              `
  
        // Add the new review to the top of the list
        if (reviewsList) {
          reviewsList.insertBefore(newReview, reviewsList.firstChild)
  
          // Update review count and ratings
          updateReviewStats()
  
          // Show success message
          const successMessage = document.createElement("div")
          successMessage.className = "review-success-message"
          successMessage.innerHTML = `
                      <i class="fas fa-check-circle"></i>
                      <p>Thank you for your review! It has been added successfully.</p>
                  `
          reviewForm.parentNode.insertBefore(successMessage, reviewForm)
  
          // Hide the success message after 5 seconds
          setTimeout(() => {
            successMessage.style.opacity = "0"
            setTimeout(() => {
              successMessage.remove()
            }, 500)
          }, 5000)
  
          // Reset the form
          reviewForm.reset()
        }
  
        // Reset button state
        submitBtn.innerHTML = "Submit Review"
        submitBtn.disabled = false
      }, 1500)
    })
  
    // Initialize star rating
    initializeStarRating()
  }
  
  // Initialize star rating in the review form
  function initializeStarRating() {
    const ratingInputs = document.querySelectorAll(".star-rating input")
    const ratingLabels = document.querySelectorAll(".star-rating label")
  
    ratingInputs.forEach((input, index) => {
      input.addEventListener("change", () => {
        // Update the visual state of stars
        ratingLabels.forEach((label, labelIndex) => {
          if (labelIndex <= index) {
            label.classList.add("active")
          } else {
            label.classList.remove("active")
          }
        })
      })
    })
  }
  
  // Generate star rating HTML based on rating value
  function generateStarRating(rating) {
    const ratingValue = Number.parseInt(rating)
    let starsHtml = ""
  
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        starsHtml += '<i class="fas fa-star"></i>'
      } else if (i === ratingValue + 0.5) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>'
      } else {
        starsHtml += '<i class="far fa-star"></i>'
      }
    }
  
    return starsHtml
  }
  
  // Update review statistics after adding a new review
  function updateReviewStats() {
    const reviewCards = document.querySelectorAll(".review-card")
    const reviewCount = document.querySelector(".rating-count")
    const overallRating = document.querySelector(".rating-number")
    const ratingStars = document.querySelector(".rating-stars")
  
    if (reviewCount && overallRating && ratingStars && reviewCards.length > 0) {
      // Update review count
      reviewCount.textContent = `Based on ${reviewCards.length} reviews`
  
      // Calculate new average rating
      let totalRating = 0
      reviewCards.forEach((card) => {
        const stars = card.querySelectorAll(".review-rating .fas.fa-star").length
        const halfStars = card.querySelectorAll(".review-rating .fas.fa-star-half-alt").length
        totalRating += stars + halfStars * 0.5
      })
  
      const newAverageRating = (totalRating / reviewCards.length).toFixed(1)
  
      // Update overall rating display
      overallRating.textContent = newAverageRating
  
      // Update rating stars
      ratingStars.innerHTML = generateStarRating(newAverageRating)
  
      // Update rating breakdown (in a real implementation)
      // This would require more complex logic to track ratings by star level
    }
  }
  
  // Book Trail Button Event
  document.addEventListener("DOMContentLoaded", () => {
    const bookTrailBtn = document.querySelector(".book-trail-btn")
    if (bookTrailBtn) {
      bookTrailBtn.addEventListener("click", () => {
        // In a real implementation, this would open a booking form or redirect to a booking page
        alert("Booking functionality will be implemented soon!")
      })
    }
  
    // Load More Reviews Button Event
    const loadMoreBtn = document.querySelector(".load-more-container .btn")
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        // In a real implementation, this would load more reviews from a database
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
  
        // Simulate loading delay
        setTimeout(() => {
          this.innerHTML = "No More Reviews"
          this.disabled = true
          this.style.opacity = "0.7"
          this.style.cursor = "not-allowed"
        }, 1500)
      })
    }
  })
  
  // Add custom CSS for map features
  document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style")
    style.textContent = `
      .map-custom-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 50%;
        width: 30px !important;
        height: 30px !important;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
      
      .map-custom-icon i {
        font-size: 16px;
      }
      
      .km-marker-container {
        background: none;
        border: none;
      }
      
      .km-marker {
        background-color: #059669;
        color: white;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 12px;
        font-weight: bold;
        white-space: nowrap;
      }
      
      .map-legend {
        background-color: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.4);
        line-height: 1.5;
        color: #333;
      }
      
      .map-legend h4 {
        margin: 0 0 10px 0;
        font-size: 14px;
        font-weight: bold;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        font-size: 12px;
      }
      
      .legend-item i {
        width: 20px;
        text-align: center;
        margin-right: 8px;
      }
      
      .trail-line {
        display: inline-block;
        height: 3px;
        width: 20px;
        background-color: #059669;
        margin-right: 8px;
      }
      
      .new-review {
        animation: highlightNew 2s ease-in-out;
      }
      
      @keyframes highlightNew {
        0% { background-color: rgba(5, 150, 105, 0.2); }
        100% { background-color: transparent; }
      }
      
      .review-success-message {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #d1fae5;
        color: #065f46;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      
      .review-success-message i {
        font-size: 20px;
        color: #059669;
      }
    `
    document.head.appendChild(style)
  })
  