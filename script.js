// Function to open the modal and display the clicked image
function openModal(imgElement) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImage");

    // Set the source of the modal image to the clicked image's source
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

// Function to close the modal when clicked anywhere outside the modal image
function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
function toggleMenu() {
    const menu = document.querySelector(".nav-menu");
    menu.classList.toggle("active");
    const menuIcon = document.querySelector(".menu-icon");
    menuIcon.classList.toggle("active");

    // Change icon between ☰ and ✖
    menuIcon.innerHTML = menu.classList.contains("active") ? "&#10006;" : "&#9776;";
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const menu = document.querySelector(".nav-menu");
    const menuIcon = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.classList.remove("active");
        menuIcon.classList.remove("active");
        menuIcon.innerHTML = "&#9776;"; // Reset to ☰
    }
});
let targetDate = new Date(2025, 2, 29, 9, 0, 0);
targetDate.setMinutes(targetDate.getMinutes() + 1);

function updateCountdown() {
    let now = new Date();
    let timeLeft = targetDate - now;

    if (timeLeft > 0) {
        let seconds = Math.floor((timeLeft / 1000) % 60);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        document.getElementById("countdown").textContent = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById("countdown").textContent = "Time's up!";
        clearInterval(timer);
    }
}

let timer = setInterval(updateCountdown, 1000);
updateCountdown();

