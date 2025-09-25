import styles from "./styles.module.css";

export default function UserGuide() {
  const sections = [
    {
      id: 1,
      title: "Announcement Countdown",
      icon: "🕒",
      description:
        "Add an announcement bar with a countdown timer to grab customer attention for sales, offers, or events.",
      features: [
        "Set end date and time in format: 2025-12-31T23:59:59",
        "Adjust font size for timer and announcement text",
        "Customize text color, background color, or background image",
        "Perfect for promotions and limited-time offers",
      ],
      image: "/images/announcement-countdown.png",
    },
    {
      id: 2,
      title: "Hero Banner Slider",
      icon: "🎠",
      description:
        "Create a visually engaging hero banner slider for your store. This section allows you to display multiple images with a text area for promotions or highlights.",
      features: [
        "Left side text area: Add Heading, Sub-heading, and Button",
        "Right side main image with 6 smaller thumbnail images below",
        "Hover on any thumbnail changes the main image instantly",
        "Responsive text sizes: Customize fonts for mobile and desktop separately",
        "Customize text color, button style, and background color or image",
        "Perfect for highlighting new products, offers, or featured collections",
      ],
      image: "/images/hero.png",
    },
    {
      id: 3,
      title: "Featured Product",
      icon: "⭐",
      description:
        "Highlight products on your store with the Featured Product section. Display single products or multiple products in a slider.",
      features: [
        "Single Product mode: Showcase one product individually",
        "Slider Mode: Display multiple products from a collection",
        "Toggle between single product and slider layouts",
        "Customizable typography and colors",
        "Flexible spacing and padding controls",
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
        "Section padding (spacing)",
      ],
      modes: [
        {
          name: "Single Product Mode",
          icon: "🛒",
          description: "Select one product to showcase individually",
        },
        {
          name: "Slider Mode",
          icon: "🎠",
          description: "Toggle slider ON and select a collection to display multiple products",
        },
      ],
      images: [
        {
          src: "/images/featured-product-single.png",
          alt: "Featured Product - Single",
          caption: "Single Product Mode",
        },
        {
          src: "/images/featured-product-slider.png",
          alt: "Featured Product - Slider",
          caption: "Slider Mode",
        },
      ],
    },
    {
      id: 4,
      title: "Featured Collection",
      icon: "📦",
      description:
        "Display an entire collection of products with variation swatches. Automatically shows all products from the selected collection.",
      features: [
        "Variation swatches for color options",
        "Hover-to-update product images",
        "Responsive layout (3 per row desktop, 1 per row mobile)",
        "Toggle between grid and slider layouts",
        "Automatic product loading from collections",
      ],
      functionalities: [
        {
          icon: "🖼️",
          title: "Product Layout",
          description:
            "Product image appears on the right side, with title, variation swatches, and Buy Now button on the left",
        },
        {
          icon: "🎨",
          title: "Variation Swatches",
          description: "Hover over color swatches to update product images with that variant",
        },
        {
          icon: "💻",
          title: "Responsive Layout",
          description: "Three products per row on desktop, one product per row on mobile",
        },
        {
          icon: "🎠",
          title: "Slider Toggle",
          description: "Toggle ON for carousel display, OFF for grid layout",
        },
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
        "Show products as slider toggle",
      ],
      layoutModes: [
        {
          name: "Grid Layout",
          description: "Products displayed in a responsive grid (slider OFF)",
          toggleState: "OFF",
        },
        {
          name: "Slider Layout",
          description: "Products displayed in a carousel (slider ON)",
          toggleState: "ON",
        },
      ],
      images: [
        {
          src: "/images/featured-collection-grid.png",
          alt: "Featured Collection - Grid",
          caption: "Grid Layout (Slider OFF)",
        },
        {
          src: "/images/featured-collection-slider.png",
          alt: "Featured Collection - Slider",
          caption: "Slider Layout (Slider ON)",
        },
      ],
    },
   {
  id: 5,
  title: "Instagram Gallery",
  icon: "📸",
  description: "Showcase your Instagram feed directly on your store with the Instagram Gallery section. This section allows merchants to display up to 10 images and link to their Instagram profile.",
  features: [
    "📸 Upload up to 10 images from your Instagram feed",
    "🔗 Add your Instagram profile link at the end of the gallery", 
    "🎨 Customize layout and spacing for a clean grid design",
    "📱 Mobile responsive — looks great on all devices"
  ],
  configuration: true,
  image: "/images/instagram-gallery.png"
}
,
    {
  id: 6,
  title: "Contact Map",
  icon: "🗺️",
  description: "Display a Google Map along with a contact form. Merchants can add either a Google Map Embed URL for direct display or a simple Google Map Link that opens in a new tab.",
  features: [
    "Embed URL: Map displays directly on your store",
    "Simple Link: Opens map in new tab when clicked", 
    "Customizable heading, subheading, and button text",
    "Adjustable font sizes and background colors",
    "Flexible section padding controls"
  ],
  proTip: "Make sure your embed URL format looks like: https://www.google.com/maps/embed?pb=... and your link format looks like: https://goo.gl/maps/xyz",
  configuration: [
    "Choose between Embed URL or Simple Map Link",
    "Customize heading, subheading, and contact form labels",
    "Adjust font sizes and background colors as needed",
    "Set section padding for optimal spacing",
    "Add your business address and contact information"
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
            Welcome to Section Master! 🚀 This comprehensive guide will walk you
            through each of the available sections and how to use them effectively in
            your Shopify store.
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
                {/* Section header */}
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>{section.icon}</div>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      {section.id}. {section.title}
                    </h2>
                    <p className={styles.sectionDescription}>
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                {section.features && (
                  <div className={styles.sectionFeatures}>
                    <h4>Key Features:</h4>
                    <ul className={styles.featuresList}>
                      {section.features.map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Customization options */}
                {section.customization && (
                  <div className={styles.customizationSection}>
                    <h4>Customization Options:</h4>
                    <div className={styles.customizationGrid}>
                      {section.customization.map((item, idx) => (
                        <div key={idx} className={styles.customizationItem}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modes (Featured Product) */}
                {section.modes && (
                  <div className={styles.modesSection}>
                    <h4>Display Modes:</h4>
                    <div className={styles.modesGrid}>
                      {section.modes.map((mode, idx) => (
                        <div key={idx} className={styles.modeCard}>
                          <span className={styles.modeIcon}>{mode.icon}</span>
                          <div>
                            <h5>{mode.name}</h5>
                            <p>{mode.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Functionalities (Featured Collection) */}
                {section.functionalities && (
                  <div className={styles.functionalitiesSection}>
                    <h4>Functionalities:</h4>
                    <div className={styles.functionalitiesGrid}>
                      {section.functionalities.map((func, idx) => (
                        <div key={idx} className={styles.functionalityCard}>
                          <span className={styles.funcIcon}>{func.icon}</span>
                          <div>
                            <h5>{func.title}</h5>
                            <p>{func.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layout Modes (Featured Collection) */}
                {section.layoutModes && (
                  <div className={styles.layoutModesSection}>
                    <h4>Layout Modes:</h4>
                    <div className={styles.layoutModesGrid}>
                      {section.layoutModes.map((layout, idx) => (
                        <div key={idx} className={styles.layoutModeCard}>
                          <div className={styles.modeHeader}>
                            <span className={styles.modeName}>{layout.name}</span>
                            <span className={styles.toggleState}>
                              {layout.toggleState}
                            </span>
                          </div>
                          <p className={styles.modeDescription}>
                            {layout.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Single or multiple images */}
                {section.images && (
                  <div className={styles.sectionImages}>
                    {section.images.map((img, idx) => (
                      <div key={idx} className={styles.imageContainer}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          className={styles.image}
                        />
                        <div className={styles.imageCaption}>{img.caption}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fallback single image */}
                {section.image && !section.images && (
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
                )}
              </section>
            ))}
          </div>
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
    <h4>✨ Features</h4>
    <ul className={styles.featuresList}>
      {section.features.map((feature, index) => (
        <li key={index} className={styles.featureItem}>
          {feature}
        </li>
      ))}
    </ul>
  </div>

  {section.configuration && (
    <div className={styles.configurationSection}>
      <h4>⚙️ Steps to Configure</h4>
      <ol className={styles.configurationList}>
        {section.configuration.map((step, index) => (
          <li key={index} className={styles.configurationStep}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )}

  <div className={styles.sectionImage}>
    <img 
      src={section.image} 
      alt={section.title}
      className={styles.image}
    />
    <div className={styles.imageCaption}>
      Example layout of {section.title} section
    </div>
  </div>
</section>

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
    <h4>✨ Features</h4>
    <ul className={styles.featuresList}>
      {section.features.map((feature, index) => (
        <li key={index} className={styles.featureItem}>
          {feature}
        </li>
      ))}
    </ul>
  </div>

  {section.configuration && (
    <div className={styles.configurationSection}>
      <h4>⚙️ Configuration Options</h4>
      <ul className={styles.featuresList}>
        {section.configuration.map((step, index) => (
          <li key={index} className={styles.featureItem}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  )}

  {section.proTip && (
    <div className={styles.proTip}>
      <div className={styles.proTipIcon}>💡</div>
      <div>
        <strong>Pro Tip:</strong> {section.proTip}
      </div>
    </div>
  )}

  <div className={styles.sectionImage}>
    <img 
      src={section.image} 
      alt={section.title}
      className={styles.image}
    />
    <div className={styles.imageCaption}>
      Example of the {section.title} Section
    </div>
  </div>

  <div className={styles.supportLink}>
    <a href="/support" className={styles.supportButton}>
      Need Help? Contact Support →
    </a>
  </div>
</section>
          {/* Help section */}
          <div className={styles.helpSection}>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>❓</div>
              <div className={styles.helpContent}>
                <h3>Need More Help?</h3>
                <p>
                  If you need further assistance or have specific questions about any
                  section, our support team is here to help you succeed.
                </p>
                <div className={styles.helpLinks}>
                  <a href="/support" className={styles.helpLink}>
                    📞 Contact Support
                  </a>
                  <a
                    href="mailto:support@sectionmasterapp.com"
                    className={styles.helpLink}
                  >
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