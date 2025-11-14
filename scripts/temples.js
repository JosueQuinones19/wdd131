const button = document.querySelector("#menu-button");
const nav = document.querySelector("#menu");

button.addEventListener("click", () => {
    nav.classList.toggle("open");
    button.textContent = nav.classList.contains("open") ? "X" : "☰";
});

// --- Footer dates ---
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
