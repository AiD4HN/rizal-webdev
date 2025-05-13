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
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  // Add click event listener to each toggle button
  dropdownToggles.forEach(button => {
    button.addEventListener('click', function() {
      // Toggle the 'active' class on the adjacent dropdown content
      const dropdownContent = this.nextElementSibling;
      dropdownContent.classList.toggle('active');
      
      // Update the aria-expanded attribute for accessibility
      const isExpanded = dropdownContent.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      
      // Change button text based on state
      this.textContent = isExpanded ? 'Read less' : 'Read more';
    });
  });
});