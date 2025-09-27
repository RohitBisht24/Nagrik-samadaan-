// lanis-init.js
// Initialize Lanis for smooth scrolling

window.addEventListener('DOMContentLoaded', function() {
  if (window.Lanis) {
    // Butter-smooth scrolling for the main container
    const lanis = new window.Lanis({
      smooth: true,
      lerp: window.innerWidth < 600 ? 0.05 : 0.025, // Slightly less smooth on mobile for performance
      wrapper: document.body,
      content: document.getElementById('root'),
      direction: 'vertical',
      multiplier: window.innerWidth < 600 ? 1.1 : 1.4, // Mobile: less aggressive, Desktop: ultra smooth
      touchMultiplier: 2.8,
      firefoxMultiplier: 70,
      scrollFromAnywhere: true,
      tablet: true,
      mobile: true,
      resetNativeScroll: true // Prevent native scroll interference
    });
    lanis.init();
  }
});
