document.addEventListener('DOMContentLoaded', function() {
  // Map point click handlers
  const mapPoints = document.querySelectorAll('.map-point');
  
  mapPoints.forEach(point => {
    point.addEventListener('click', function() {
      const location = this.getAttribute('data-location');
      scrollToDestination(location);
      highlightDestination(location);
    });
  });
  
  function scrollToDestination(location) {
    let destinationId;
    
    // Map location data attributes to destination card IDs
    switch(location) {
      case 'madrid':
        destinationId = 'spain';
        break;
      case 'paris':
        destinationId = 'france';
        break;
      case 'berlin':
        destinationId = 'germany';
        break;
      case 'london':
        destinationId = 'london';
        break;
      case 'brussels':
        destinationId = 'belgium';
        break;
      default:
        destinationId = location;
    }
    
    const element = document.getElementById(destinationId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  function highlightDestination(location) {
    // Remove any existing highlights
    document.querySelectorAll('.destination-card').forEach(card => {
      card.classList.remove('highlight');
    });
    
    // Add highlight to selected destination
    let destinationId;
    switch(location) {
      case 'madrid':
        destinationId = 'spain';
        break;
      case 'paris':
        destinationId = 'france';
        break;
      case 'berlin':
        destinationId = 'germany';
        break;
      case 'london':
        destinationId = 'london';
        break;
      case 'brussels':
        destinationId = 'belgium';
        break;
      default:
        destinationId = location;
    }
    
    const element = document.getElementById(destinationId);
    if (element) {
      element.classList.add('highlight');
      // Add animation for better visibility
      element.style.animation = 'pulse 1s';
      setTimeout(() => {
        element.style.animation = '';
      }, 1000);
    }
  }
  
  // Add pulse animation to the stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(10, 49, 97, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(10, 49, 97, 0); }
      100% { box-shadow: 0 0 0 0 rgba(10, 49, 97, 0); }
    }
    
    .destination-card.highlight {
      box-shadow: 0 0 0 3px #0a3161, 0 4px 20px rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);
});