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
    button.addEventListener('click', function(e) {
      // Prevent the click from bubbling up to parent elements
      e.preventDefault();
      e.stopPropagation();
      
      // Get the direct parent element that contains this button
      const parentGridItem = this.closest('.grid-item') || this.closest('.content-wrapper') || this.parentElement;
      
      // Get the specific dropdown-content that is a direct sibling of THIS button
      const dropdownContent = this.nextElementSibling;
      
      if (!dropdownContent || !dropdownContent.classList.contains('dropdown-content')) return;
      
      // Toggle the 'active' class on THIS dropdown content only
      const isExpanded = !dropdownContent.classList.contains('active');
      
      // Close all other dropdowns first
      dropdownToggles.forEach(otherButton => {
        if (otherButton !== this) {
          const otherContent = otherButton.nextElementSibling;
          if (otherContent && otherContent.classList.contains('dropdown-content') && otherContent.classList.contains('active')) {
            otherContent.classList.remove('active');
            otherButton.setAttribute('aria-expanded', 'false');
            otherButton.textContent = 'Read more';
          }
        }
      });
      
      // Apply the change to the current dropdown
      dropdownContent.classList.toggle('active', isExpanded);
      
      // Update the aria-expanded attribute for accessibility
      this.setAttribute('aria-expanded', isExpanded);
      
      // Change button text based on state
      this.textContent = isExpanded ? 'Read less' : 'Read more';
    });
  });

  // Close dropdowns when clicking outside of them
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-content')) {
      dropdownToggles.forEach(button => {
        const parent = button.closest('.grid-item') || button.closest('.card') || button.parentElement;
        const content = parent.querySelector('.dropdown-content') || button.nextElementSibling;
        
        if (content && content.classList.contains('active')) {
          content.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
          button.textContent = 'Read more';
        }
      });
    }
  });

  // Navbar scroll hide/show functionality
  let lastScrollPosition = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    // Get current scroll position
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Check if scrolling up
    if (currentScrollPosition < lastScrollPosition) {
      // Scrolling UP - show header
      header.classList.remove('header--hidden');
    } else if (currentScrollPosition > 100) {
      // Scrolling DOWN and not at the top - hide header
      header.classList.add('header--hidden');
    }
    
    // Update last scroll position
    lastScrollPosition = currentScrollPosition;
  });
});