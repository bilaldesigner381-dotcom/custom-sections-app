import styles from "./styles.module.css";

export default function UserGuide() {
  const sections = [
    {
      id: 1,
      title: "Announcement Countdown",
      icon: "🕒",
      description: "Add an announcement bar with a countdown timer to grab customer attention for sales, offers, or events.",
      features: [
        "Set end date and time in format: 2025-12-31T23:59:59",
        "Adjust font size for timer and announcement text",
        "Customize text color, background color, or background image",
        "Perfect for promotions and limited-time offers"
      ],
      image: "/images/announcement-countdown.png",
      category: "Promotional"
    },
    {
      id: 2,
      title: "Hero Banner Slider",
      icon: "🎠",
      description: "Create a visually engaging hero banner slider for your store. This section allows you to display multiple images with a text area for promotions or highlights.",
      features: [
        "Left side text area: Add Heading, Sub-heading, and Button",
        "Right side main image with 6 smaller thumbnail images below",
        "Hover on any thumbnail changes the main image instantly",
        "Responsive text sizes: Customize fonts for mobile and desktop separately",
        "Customize text color, button style, and background color or image",
        "Perfect for highlighting new products, offers, or featured collections"
      ],
      image: "/images/hero.png",
      category: "Hero"
    },
    {
      id: 3,
      title: "Featured Product",
      icon: "⭐",
      description: "Highlight products on your store with the Featured Product section. Display single products or multiple products in a slider.",
      features: [
        "Single Product mode: Showcase one product individually",
        "Slider Mode: Display multiple products from a collection", 
        "Toggle between single product and slider layouts",
        "Customizable typography and colors",
        "Flexible spacing and padding controls"
      ],
      customization: [
        "Heading font size",
        "Sub-heading font size", 
        "Product price font size",
        "Button text customization",
        "Button font size",
        "Button background color",
        "Button text color",
        "Section background color",
        "Section padding (spacing)"
      ],
      modes: [
        {
          name: "Single Product Mode",
          icon: "🛒",
          description: "Select one product to showcase individually"
        },
        {
          name: "Slider Mode", 
          icon: "🎠",
          description: "Toggle slider ON and select a collection to display multiple products"
        }
      ],
      images: [
        {
          src: "/images/featured-product-single.png",
          alt: "Featured Product - Single",
          caption: "Single Product Mode"
        },
        {
          src: "/images/featured-product-slider.png",
          alt: "Featured Product - Slider",
          caption: "Slider Mode" 
        }
      ],
      category: "Product Display"
    },
    {
      id: 4,
      title: "Featured Collection",
      icon: "📦",
      description: "Display an entire collection of products with variation swatches. Automatically shows all products from the selected collection.",
      features: [
        "Variation swatches for color options",
        "Hover-to-update product images",
        "Responsive layout (3 per row desktop, 1 per row mobile)",
        "Toggle between grid and slider layouts",
        "Automatic product loading from collections"
      ],
      functionalities: [
        {
          icon: "🖼️",
          title: "Product Layout",
          description: "Product image appears on the right side, with title, variation swatches, and Buy Now button on the left"
        },
        {
          icon: "🎨", 
          title: "Variation Swatches",
          description: "Hover over color swatches to update product images with that variant"
        },
        {
          icon: "💻",
          title: "Responsive Layout",
          description: "Three products per row on desktop, one product per row on mobile"
        },
        {
          icon: "🎠",
          title: "Slider Toggle",
          description: "Toggle ON for carousel display, OFF for grid layout"
        }
      ],
      customization: [
        "Section title",
        "Title font size", 
        "Title color",
        "Background color",
        "Background image",
        "Margin top & bottom",
        "Button text",
        "Button background color",
        "Button text color", 
        "Section padding",
        "Show products as slider toggle"
      ],
      layoutModes: [
        {
          name: "Grid Layout",
          description: "Products displayed in a responsive grid (slider OFF)",
          toggleState: "OFF"
        },
        {
          name: "Slider Layout", 
          description: "Products displayed in a carousel (slider ON)",
          toggleState: "ON"
        }
      ],
      images: [
        {
          src: "/images/featured-collection-grid.png",
          alt: "Featured Collection - Grid",
          caption: "Grid Layout (Slider OFF)"
        },
        {
          src: "/images/featured-collection-slider.png",
          alt: "Featured Collection - Slider",
          caption: "Slider Layout (Slider ON)" 
        }
      ],
      category: "Product Display"
    },
    {
      id: 5,
      title: "Instagram Gallery",
      icon: "📸",
      description: "Showcase your Instagram feed directly on your store for social proof.",
      features: [
        "Automatic Instagram feed integration",
        "Customizable grid layout",
        "Click to view full image",
        "Social media engagement boost"
      ],
      image: "/images/instagram-gallery.png",
      category: "Social Media"
    },
    {
      id: 6,
      title: "Contact Map",
      icon: "🗺️",
      description: "Add a Google map with your business address and contact form.",
      features: [
        "Google Maps integration",
        "Custom marker and map style",
        "Embedded contact form",
        "Business hours display"
      ],
      image: "/images/contact-map.png",
      category: "Contact"
    },
    {
      id: 7,
      title: "Logo Carousel",
      icon: "🏢",
      description: "Display partner logos or brand logos in a carousel slider.",
      features: [
        "Auto-sliding carousel with pause on hover",
        "Customizable slide speed and transition",
        "Logo size and spacing controls",
        "Clickable logos with custom links"
      ],
      image: "/images/logo-carousel.png",
      category: "Branding"
    },
    {
      id: 8,
      title: "FAQ Accordion",
      icon: "❓",
      description: "Provide answers to frequently asked questions in collapsible accordions.",
      features: [
        "Collapsible question-answer pairs",
        "Customizable accordion style",
        "Search functionality",
        "Category organization"
      ],
      image: "/images/faq-accordion.png",
      category: "Support"
    },
    {
      id: 9,
      title: "Testimonials",
      icon: "💬",
      description: "Show customer reviews and testimonials to build trust.",
      features: [
        "Star rating display",
        "Customer photo and name",
        "Carousel or grid layout",
        "Automatic rotation option"
      ],
      image: "/images/testimonials.png",
      category: "Social Proof"
    },
    {
      id: 10,
      title: "Newsletter Signup",
      icon: "📧",
      description: "Allow customers to subscribe to your newsletter for updates and offers.",
      features: [
        "Email validation and confirmation",
        "Integration with popular email services",
        "Customizable success message",
        "GDPR compliance options"
      ],
      image: "/images/newsletter-signup.png",
      category: "Marketing"
    },
    {
      id: 11,
      title: "Services Feature",
      icon: "⚙️",
      description: "Highlight key services or features with icons and short descriptions.",
      features: [
        "Custom icon upload or selection",
        "Grid or list layout options",
        "Hover effects and animations",
        "Call-to-action buttons"
      ],
      image: "/images/services-feature.png",
      category: "Services"
    },
    {
      id: 12,
      title: "Video Section",
      icon: "🎥",
      description: "Embed a video (e.g., YouTube or Vimeo) to showcase your brand or product.",
      features: [
        "YouTube and Vimeo support",
        "Custom thumbnail options",
        "Autoplay and loop controls",
        "Responsive video player"
      ],
      image: "/images/video-section.png",
      category: "Media"
    },
    {
      id: 13,
      title: "Sticky WhatsApp Button",
      icon: "💬",
      description: "Add a sticky WhatsApp button so customers can chat with you instantly.",
      features: [
        "Floating button on all pages",
        "Customizable button style and position",
        "Pre-defined message templates",
        "Mobile-optimized experience"
      ],
      image: "/images/sticky-whatsapp.png",
      category: "Communication"
    }
  ];

  // Group sections by category for better organization
  const categories = sections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Section Master User Guide</h1>
            <p className={styles.subtitle}>
              Welcome to Section Master! 🚀 This comprehensive guide will walk you through 
              each of the available sections and how to use them effectively in your Shopify store.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>13</span>
                <span className={styles.statLabel}>Sections</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Customizable</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>🎯</span>
                <span className={styles.statLabel}>Easy to Use</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>📱</span>
                <span className={styles.statLabel}>Responsive</span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {/* Quick Navigation */}
          <nav className={styles.quickNav}>
            <h3>Quick Navigation</h3>
            <div className={styles.navLinks}>
              {sections.map(section => (
                <a key={section.id} href={`#section-${section.id}`} className={styles.navLink}>
                  {section.icon} {section.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Sections by Category */}
          {Object.entries(categories).map(([category, categorySections]) => (
            <div key={category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <div className={styles.sectionsGrid}>
                {categorySections.map((section) => (
                  <section key={section.id} id={`section-${section.id}`} className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionMeta}>
                        <div className={styles.sectionIcon}>{section.icon}</div>
                        <span className={styles.sectionBadge}>Section {section.id}</span>
                      </div>
                      <div>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <p className={styles.sectionDescription}>{section.description}</p>
                      </div>
                    </div>

                    <div className={styles.sectionFeatures}>
                      <h4>✨ Key Features</h4>
                      <ul className={styles.featuresList}>
                        {section.features.map((feature, index) => (
                          <li key={index} className={styles.featureItem}>
                            <span className={styles.featureIcon}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enhanced Content for Specific Sections */}
                    {section.id === 3 && (
                      <div className={styles.enhancedContent}>
                        <div className={styles.modesSection}>
                          <h5>🎛️ Display Modes</h5>
                          <div className={styles.modesGrid}>
                            {section.modes.map((mode, index) => (
                              <div key={index} className={styles.modeCard}>
                                <div className={styles.modeIcon}>{mode.icon}</div>
                                <div>
                                  <h6>{mode.name}</h6>
                                  <p>{mode.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 4 && (
                      <div className={styles.enhancedContent}>
                        <div className={styles.functionalitiesSection}>
                          <h5>⚙️ Functionalities</h5>
                          <div className={styles.functionalitiesGrid}>
                            {section.functionalities.map((func, index) => (
                              <div key={index} className={styles.functionalityCard}>
                                <div className={styles.funcIcon}>{func.icon}</div>
                                <div>
                                  <h6>{func.title}</h6>
                                  <p>{func.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={styles.sectionPreview}>
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className={styles.previewImage}
                      />
                      <div className={styles.previewCaption}>
                        {section.title} Preview
                      </div>
                    </div>

                    <div className={styles.sectionActions}>
                      <button className={styles.actionButton}>
                        📖 Read Documentation
                      </button>
                      <button className={styles.actionButton}>
                        🎬 Watch Tutorial
                      </button>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ))}

          {/* Help Section */}
          <div className={styles.helpSection}>
            <div className={styles.helpCard}>
              <div className={styles.helpHeader}>
                <div className={styles.helpIcon}>💫</div>
                <h3>Ready to Transform Your Store?</h3>
              </div>
              <div className={styles.helpContent}>
                <p>
                  Need help implementing these sections or have specific customization requests? 
                  Our support team is here to help you succeed.
                </p>
                <div className={styles.helpLinks}>
                  <a href="/support" className={styles.primaryLink}>
                    📞 Get Instant Support
                  </a>
                  <a href="mailto:support@sectionmasterapp.com" className={styles.secondaryLink}>
                    📧 Email Our Experts
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}