// app/sections/section-registry.js
export class SectionRegistry {
  constructor() {
    this.sections = new Map();
  }

  registerSection(section) {
    this.sections.set(section.name, section);
  }

  // GET SECTIONS BASED ON SUBSCRIPTION STATUS
  getSectionsForShop(hasPremium = false) {
    const allSections = Array.from(this.sections.values());
    
    if (hasPremium) {
      return allSections; // Return all 15 sections for premium users
    }
    
    // Return only 3 free sections for non-premium users
    return allSections.filter(section => section.isFree);
  }
}

export const sectionRegistry = new SectionRegistry();

// ==================== FREE SECTIONS (3) ====================
sectionRegistry.registerSection({
  name: "whatsapp-button",
  isFree: true,
  displayName: "Sticky WhatsApp Button",
  description: "Fixed WhatsApp button for customer support",
  thumbnail: "/api/placeholder/300/200",
  category: "Communication"
});

sectionRegistry.registerSection({
  name: "testimonials", 
  isFree: true,
  displayName: "Testimonials",
  description: "Display customer reviews and testimonials",
  thumbnail: "/api/placeholder/300/200",
  category: "Social Proof"
});

sectionRegistry.registerSection({
  name: "faq-accordion",
  isFree: true,
  displayName: "FAQ Section", 
  description: "Frequently asked questions with toggle",
  thumbnail: "/api/placeholder/300/200",
  category: "Information"
});

// ==================== PAID SECTIONS (12) ====================
sectionRegistry.registerSection({
  name: "announcement-countdown",
  isFree: false,
  displayName: "Countdown Timer",
  description: "Create urgency with time-limited offers",
  thumbnail: "/api/placeholder/300/200",
  category: "Marketing",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "featured-collection",
  isFree: false,
  displayName: "Featured Collection",
  description: "Showcase your best collections",
  thumbnail: "/api/placeholder/300/200", 
  category: "Products",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "featured-product",
  isFree: false,
  displayName: "Featured Product",
  description: "Highlight individual products",
  thumbnail: "/api/placeholder/300/200",
  category: "Products",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "hero-banner",
  isFree: false,
  displayName: "Hero Banner",
  description: "Full-width banner with call-to-action",
  thumbnail: "/api/placeholder/300/200",
  category: "Marketing",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "newsletter-signup",
  isFree: false,
  displayName: "Newsletter Signup",
  description: "Email collection form",
  thumbnail: "/api/placeholder/300/200",
  category: "Marketing",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "instagram-feed",
  isFree: false,
  displayName: "Instagram Gallery",
  description: "Display Instagram feed",
  thumbnail: "/api/placeholder/300/200",
  category: "Social Media",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "hero-banner-slider",
  isFree: false,
  displayName: "Hero Banner Slider",
  description: "Multiple rotating banners",
  thumbnail: "/api/placeholder/300/200",
  category: "Marketing",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "logo-carousel",
  isFree: false,
  displayName: "Logo Carousel",
  description: "Showcase client logos",
  thumbnail: "/api/placeholder/300/200",
  category: "Social Proof",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "services-features",
  isFree: false,
  displayName: "Services Feature",
  description: "Highlight your services",
  thumbnail: "/api/placeholder/300/200",
  category: "Services",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "video-section",
  isFree: false,
  displayName: "Video Section",
  description: "Embed videos with custom player",
  thumbnail: "/api/placeholder/300/200",
  category: "Multimedia",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "blog-highlights",
  isFree: false,
  displayName: "Blog Highlights",
  description: "Show latest blog posts",
  thumbnail: "/api/placeholder/300/200",
  category: "Content",
  price: "$9/month"
});

sectionRegistry.registerSection({
  name: "contact-map",
  isFree: false,
  displayName: "Contact + Map",
  description: "Contact form with Google Maps",
  thumbnail: "/api/placeholder/300/200",
  category: "Contact",
  price: "$9/month"
});