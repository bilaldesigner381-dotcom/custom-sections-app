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
      image: "/images/announcement-countdown.png"
    },
    {
      id: 2,
      title: "Hero Banner Slider",
      icon: "🎠",
      description: "Create a sliding hero banner with multiple images and promotional text.",
      features: [
        "Multiple slide support with smooth transitions",
        "Customizable slide duration and animation effects",
        "Mobile-responsive design",
        "Call-to-action buttons on each slide"
      ],
      image: "/images/hero-banner-slider.png"
    },
    {
      id: 3,
      title: "Featured Product",
      icon: "⭐",
      description: "Highlight a single featured product with image, price, and buy button.",
      features: [
        "Direct product selection from your store",
        "Customizable product card layout",
        "Quick add-to-cart functionality",
        "Price and variant display"
      ],
      image: "/images/featured-product.png"
    },
    {
      id: 4,
      title: "Featured Collection",
      icon: "📦",
      description: "Display an entire product collection in a visually appealing grid.",
      features: [
        "Grid or carousel layout options",
        "Customizable number of products to show",
        "Quick view and add-to-cart",
        "Collection filtering and sorting"
      ],
      image: "/images/featured-collection.png"
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
      image: "/images/instagram-gallery.png"
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
      image: "/images/contact-map.png"
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
      image: "/images/logo-carousel.png"
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
      image: "/images/faq-accordion.png"
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
      image: "/images/testimonials.png"
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
      image: "/images/newsletter-signup.png"
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
      image: "/images/services-feature.png"
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
      image: "/images/video-section.png"
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
      image: "/images/sticky-whatsapp.png"
    }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>User Guide</h1>
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
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.sectionsGrid}>
            {sections.map((section) => (
              <section key={section.id} className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>{section.icon}</div>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      {section.id}. {section.title}
                    </h2>
                    <p className={styles.sectionDescription}>{section.description}</p>
                  </div>
                </div>

                <div className={styles.sectionFeatures}>
                  <h4>Key Features:</h4>
                  <ul className={styles.featuresList}>
                    {section.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.sectionImage}>
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className={styles.image}
                  />
                  <div className={styles.imageCaption}>
                    Preview of {section.title} section
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className={styles.helpSection}>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>❓</div>
              <div className={styles.helpContent}>
                <h3>Need More Help?</h3>
                <p>
                  If you need further assistance or have specific questions about any section, 
                  our support team is here to help you succeed.
                </p>
                <div className={styles.helpLinks}>
                  <a href="/support" className={styles.helpLink}>
                    📞 Contact Support
                  </a>
                  <a href="mailto:support@sectionmasterapp.com" className={styles.helpLink}>
                    📧 Email Us
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