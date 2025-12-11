// main.js
// DevPath by Josue - base behavior and page logic

// =============================
// Footer year
// =============================
function setCurrentYear() {
  const yearSpan = document.querySelector("#year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// =============================
// Mobile navigation toggle
// =============================
function setupNavToggle() {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) return;

  // Valor inicial
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}


// =============================
// Projects data (objects + array)
// =============================
const projects = [
  {
    id: 1,
    title: "Responsive Layout Page",
    type: "layout",
    level: "Beginner",
    tech: ["HTML", "CSS"],
    status: "Completed",
    description:
      "A responsive page that adapts from mobile to desktop using Flexbox and Grid while keeping typography and spacing consistent."
  },
  {
    id: 2,
    title: "Interactive Review Form",
    type: "javascript",
    level: "Beginner",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed",
    description:
      "A product review form with semantic HTML, validation, and a small enhancement using JavaScript and localStorage."
  },
  {
    id: 3,
    title: "Portfolio Home (DevPath)",
    type: "portfolio",
    level: "Beginner",
    tech: ["HTML", "CSS"],
    status: "In Progress",
    description:
      "The home page of this portfolio, designed to present my path as a junior developer with clear sections and responsive design."
  },
  {
    id: 4,
    title: "Data-Driven Projects View",
    type: "javascript",
    level: "Intermediate",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Planned",
    description:
      "A page that loads project data from a JavaScript array of objects and lets the user filter projects by type."
  }
];

// Helper to map type to a display label (conditional branching)
function getTypeLabel(type) {
  if (type === "layout") {
    return "Responsive Layout";
  } else if (type === "javascript") {
    return "JavaScript Interaction";
  } else if (type === "portfolio") {
    return "Portfolio Page";
  } else {
    return "General Project";
  }
}

// =============================
// Projects page logic
// =============================
function renderProjects(projectList) {
  const container = document.querySelector("#projectsContainer");
  if (!container) return;

  if (!Array.isArray(projectList) || projectList.length === 0) {
    container.innerHTML = `
      <article class="card">
        <h3>No projects found</h3>
        <p>Try changing the filter to see more projects.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = "";

  projectList.forEach((project) => {
    const article = document.createElement("article");
    article.classList.add("card", "project-card");

    const typeLabel = getTypeLabel(project.type);
    const techList = project.tech.join(", ");

    article.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p class="tech-stack"><strong>Type:</strong> ${typeLabel}</p>
      <p class="tech-stack"><strong>Tech stack:</strong> ${techList}</p>
      <p class="tech-stack"><strong>Level:</strong> ${project.level}</p>
      <p class="tech-stack"><strong>Status:</strong> ${project.status}</p>
    `;

    container.appendChild(article);
  });
}

function setupProjectsPage() {
  const container = document.querySelector("#projectsContainer");
  const filterSelect = document.querySelector("#projectFilter");

  if (!container || !filterSelect) return;

  // Restore last selected filter from localStorage (if any)
  const savedFilter = localStorage.getItem("projectFilter") || "all";
  if (
    Array.from(filterSelect.options).some((option) => option.value === savedFilter)
  ) {
    filterSelect.value = savedFilter;
  }

  function applyFilter() {
    const selected = filterSelect.value;

    let filteredProjects;
    if (selected === "all") {
      filteredProjects = projects;
    } else {
      filteredProjects = projects.filter((project) => project.type === selected);
    }

    renderProjects(filteredProjects);
  }

  // Initial render
  applyFilter();

  // Listen for changes
  filterSelect.addEventListener("change", () => {
    localStorage.setItem("projectFilter", filterSelect.value);
    applyFilter();
  });
}

// =============================
// Contact form logic
// =============================
function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#contactStatus");
  const countSpan = document.querySelector("#contactCount");

  if (!form || !status || !countSpan) return;

  let contactCount = Number(localStorage.getItem("contactCount")) || 0;
  countSpan.textContent = contactCount;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const reason = String(formData.get("reason") || "");
    const message = String(formData.get("message") || "").trim();

    // Basic validation with conditional branching
    if (!name || !email || !reason || !message) {
      status.textContent = "Please fill in all required fields before submitting.";
      status.style.color = "red";
      return;
    }

    if (!email.includes("@")) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "red";
      return;
    }

    if (message.length < 10) {
      status.textContent =
        "Please provide a bit more detail in your message (at least 10 characters).";
      status.style.color = "red";
      return;
    }

    // Everything is ok: simulate successful submission
    contactCount += 1;
    localStorage.setItem("contactCount", String(contactCount));
    countSpan.textContent = contactCount;

    status.textContent = `Thank you, ${name}! Your message has been recorded.`;
    status.style.color = "green";

    form.reset();
  });
}

// =============================
// Initialize on DOMContentLoaded
// =============================
document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setupNavToggle();
  setupProjectsPage();
  setupContactForm();
});
