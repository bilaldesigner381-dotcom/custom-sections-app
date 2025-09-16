// extensions/custom-sections/assets/script.js
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Section Master extension loaded!');
  
  try {
    const response = await fetch('/api/sections');
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const { sections, hasPremium } = await response.json();
    
    console.log('Loaded sections:', sections.length, 'Premium:', hasPremium);
    
    // Only show sections returned from API
    renderSections(sections);
    
    // Add premium class if user has active subscription
    if (hasPremium) {
      document.body.classList.add('premium-user');
      console.log('Premium user detected - showing all sections');
    } else {
      console.log('Free user - showing only free sections');
    }
  } catch (error) {
    console.error('Failed to load sections:', error);
    // Fallback: show all sections if API fails
    showAllSections();
  }
});

function renderSections(sections) {
  // This will depend on how your sections are structured in the theme editor
  // You might need to customize this based on your actual theme implementation
  const sectionContainer = document.querySelector('[data-sections-container]') || 
                           document.querySelector('.app-blocks') ||
                           document.body;
  
  console.log('Rendering sections:', sections);
  
  // Here you would implement your actual section rendering logic
  // This is a placeholder - you'll need to adapt it to your theme
  sections.forEach(section => {
    const sectionElement = document.querySelector(`[data-section-name="${section.name}"]`);
    if (sectionElement) {
      sectionElement.style.display = 'block';
    }
  });
}

function showAllSections() {
  // Fallback: show all sections if API fails
  const allSections = document.querySelectorAll('[data-section-name]');
  allSections.forEach(section => {
    section.style.display = 'block';
  });
}