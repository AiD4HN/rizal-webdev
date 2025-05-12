document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-toggle");
  const desktopNav = document.querySelector(".desktop-nav");

  // Toggle nav visibility on small screens
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      const isActive = desktopNav.classList.toggle("active");
      const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true" || false;
      mobileMenuButton.setAttribute("aria-expanded", !expanded);
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const isClickInside =
      mobileMenuButton.contains(e.target) || desktopNav.contains(e.target);

    if (!isClickInside && desktopNav.classList.contains("active")) {
      desktopNav.classList.remove("active");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Optional: Highlight the active nav link based on current URL
  const currentPath = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Dropdown functionality
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropdownToggle && dropdownContent) {
    dropdownToggle.addEventListener("click", () => {
      dropdownContent.classList.toggle("active");
      const expanded = dropdownToggle.getAttribute("aria-expanded") === "true" || false;
      dropdownToggle.setAttribute("aria-expanded", !expanded);

      // Change button text based on state
      if (!expanded) {
        dropdownToggle.textContent = "Show less";
      } else {
        dropdownToggle.textContent = "Read more";
      }
    });
  }
});