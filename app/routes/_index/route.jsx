import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // Redirect to app if already authenticated
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { ready: true };
};

export default function App() {
  const { ready } = useLoaderData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Welcome to Section Master <span className={styles.emoji}>🚀</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Transform your Shopify store with powerful custom sections and 
              intuitive drag-and-drop functionality.
            </p>
            
            {ready && (
              <div className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Get Started in Seconds</h2>
                <p className={styles.ctaText}>
                  Add Section Master to your Shopify store with one click
                </p>
                <a href="/auth/login" className={styles.primaryButton}>
                  <span className={styles.buttonIcon}>⚡</span>
                  Install Section Master
                </a>
              </div>
            )}
          </div>
        </div>

        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <h2 className={styles.featuresTitle}>Why Choose Section Master?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎨</div>
                <h3 className={styles.featureTitle}>Drag & Drop Builder</h3>
                <p className={styles.featureDescription}>
                  Build beautiful sections without any coding knowledge required
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureTitle}>Lightning Fast</h3>
                <p className={styles.featureDescription}>
                  Optimized for maximum performance and SEO excellence
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3 className={styles.featureTitle}>Mobile Responsive</h3>
                <p className={styles.featureDescription}>
                  Flawless experience across all devices and screen sizes
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🛠️</div>
                <h3 className={styles.featureTitle}>Easy Customization</h3>
                <p className={styles.featureDescription}>
                  Change styles and layouts with just a few clicks
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <nav className={styles.footerNav}>
            <a href="/privacy-policy" className={styles.footerLink}>
              Privacy Policy
            </a>
            <a href="/terms-of-service" className={styles.footerLink}>
              Terms of Service
            </a>
            <a href="/support" className={styles.footerLink}>
              Support
            </a>
            <a href="/user-guide" className={styles.footerLink}>
              User Guide
            </a>
          </nav>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Section Master. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}