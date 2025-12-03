// Initialize counter from localStorage
let count = Number(localStorage.getItem("reviewCount")) || 0;

// Increase count on each successful form submission
count++;
localStorage.setItem("reviewCount", count);

// Display count
document.getElementById("count").textContent = count;

// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();
