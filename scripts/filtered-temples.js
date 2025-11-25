const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  // === 3 temples added by student ===

  {
    templeName: "Puebla Mexico Temple",
    location: "Puebla, Mexico",
    dedicated: "2022, May, 21",
    area: 30800,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/puebla-mexico-temple/puebla-mexico-temple-46346.jpg"
  },

  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642.jpg"
  },

  {
    templeName: "Tijuana Mexico Temple",
    location: "Tijuana, Mexico",
    dedicated: "2015, December, 13",
    area: 33000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tijuana-mexico-temple/tijuana-mexico-temple-3661.jpg"
  }
];

// Helper: get year from "YYYY, Month, Day"
function getDedicatedYear(temple) {
  return Number(temple.dedicated.split(",")[0]);
}

/**
 * Render temple cards into the #temple-cards section
 */
function renderTemples(templeArray) {
  const container = document.querySelector("#temple-cards");
  container.innerHTML = ""; // clear previous content

  templeArray.forEach((temple) => {
    const card = document.createElement("article");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p class="temple-meta">
        <span class="temple-label">Location:</span>
        ${temple.location}
      </p>
      <p class="temple-meta">
        <span class="temple-label">Dedicated:</span>
        ${temple.dedicated}
      </p>
      <p class="temple-meta">
        <span class="temple-label">Size:</span>
        ${temple.area.toLocaleString()} sq ft
      </p>
      <img src="${temple.imageUrl}"
           alt="${temple.templeName} Temple"
           loading="lazy">
    `;

    container.appendChild(card);
  });
}

/**
 * Filter handlers
 */
function applyFilter(filterType) {
  let filtered = temples;

  switch (filterType) {
    case "old":
      filtered = temples.filter((temple) => getDedicatedYear(temple) < 1900);
      break;
    case "new":
      filtered = temples.filter((temple) => getDedicatedYear(temple) > 2000);
      break;
    case "large":
      filtered = temples.filter((temple) => temple.area > 90000);
      break;
    case "small":
      filtered = temples.filter((temple) => temple.area < 10000);
      break;
    case "home":
    default:
      filtered = temples;
      break;
  }

  renderTemples(filtered);
}

/**
 * Mobile menu toggle
 */
function setupMenu() {
  const menuButton = document.querySelector("#menu-button");
  const menu = document.querySelector("#menu");

  menuButton.addEventListener("click", () => {
    menu.classList.toggle("open");
    const isOpen = menu.classList.contains("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

/**
 * Navigation filter listeners
 */
function setupFilters() {
  const links = document.querySelectorAll("#menu a");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const filter = link.dataset.filter || "home";
      applyFilter(filter);

      // close menu on mobile when selecting a filter
      const menu = document.querySelector("#menu");
      if (window.innerWidth < 700 && menu.classList.contains("open")) {
        menu.classList.remove("open");
        document
          .querySelector("#menu-button")
          .setAttribute("aria-expanded", "false");
      }
    });
  });
}

/**
 * Footer info: year + last modified
 */
function setupFooter() {
  const yearSpan = document.querySelector("#year");
  const modifiedSpan = document.querySelector("#lastModified");

  yearSpan.textContent = new Date().getFullYear().toString();
  modifiedSpan.textContent = document.lastModified;
}

/**
 * Initialize page
 */
document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupFilters();
  setupFooter();
  renderTemples(temples); // show all on load
});
