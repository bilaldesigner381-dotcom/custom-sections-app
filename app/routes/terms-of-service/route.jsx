import styles from "./styles.module.css";

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.intro}>
            <p>
              These Terms of Service (“Terms”) govern your use of the Section Master
              app (“we”, “our”, or “us”). By installing or using Section Master, you
              (“you”, “merchant”) agree to these Terms.
            </p>
          </section>

          <div className={styles.termsGrid}>
            <div className={styles.termCard}>
              <div className={styles.termNumber}>1</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>App Usage</h3>
                <p className={styles.termText}>
                  You may use Section Master only in compliance with Shopify’s policies
                  and applicable laws. You must not misuse the app for unlawful, harmful,
                  or unauthorized purposes.
                </p>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>2</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Features & Billing</h3>
                <p className={styles.termText}>
                  Section Master offers a mix of free and paid features. Three (3)
                  sections are available free of charge. Access to additional premium
                  sections requires a subscription of <strong className={styles.highlight}>$9/month</strong>, billed
                  through Shopify’s Billing system.
                </p>
                <div className={styles.pricingBadge}>
                  <span className={styles.freeTag}>3 Free Sections</span>
                  <span className={styles.premiumTag}>$9/month for Premium</span>
                </div>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>3</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Account & Access</h3>
                <p className={styles.termText}>
                  By installing the app, you authorize Section Master to access your
                  Shopify store as required to provide its services. You are responsible
                  for maintaining the confidentiality of your Shopify account.
                </p>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>4</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Data & Privacy</h3>
                <p className={styles.termText}>
                  Use of the app is also governed by our{" "}
                  <a className={styles.link} href="/privacy-policy">
                    Privacy Policy
                  </a>
                  . Please review it to understand how we collect, use, and protect your
                  data.
                </p>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>5</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Intellectual Property</h3>
                <p className={styles.termText}>
                  All rights, title, and interest in the Section Master app, including its
                  design, code, and features, remain the exclusive property of Section
                  Master. All content you create in your Shopify store remains yours.
                </p>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>6</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Termination</h3>
                <p className={styles.termText}>
                  You may uninstall the app at any time. Upon uninstallation, your data
                  will be deleted from our systems within 48 hours.
                </p>
                <div className={styles.deletionNotice}>
                  <span className={styles.deletionIcon}>⏱️</span>
                  Data deleted within 48 hours of uninstallation
                </div>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>7</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Limitation of Liability</h3>
                <p className={styles.termText}>
                  Section Master is provided “as is” and “as available.” We do not warrant
                  that the app will be error-free or uninterrupted. To the fullest extent
                  permitted by law, we are not liable for any indirect, incidental, or
                  consequential damages resulting from your use of the app.
                </p>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>8</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Changes to Terms</h3>
                <p className={styles.termText}>
                  We may update these Terms from time to time. Updated Terms will be
                  posted on this page and are effective immediately upon posting.
                </p>
              </div>
            </div>

            <div className={styles.termCard}>
              <div className={styles.termNumber}>9</div>
              <div className={styles.termContent}>
                <h3 className={styles.termTitle}>Contact Us</h3>
                <p className={styles.termText}>
                  If you have any questions about these Terms, please contact us at:{" "}
                  <a className={styles.link} href="mailto:sectionmasterapp@gmail.com">
                    sectionmasterapp@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <footer className={styles.footer}>
            <div className={styles.location}>
              <span className={styles.locationIcon}>📍</span>
              <span>Section Master is based in Pakistan and operates in accordance with applicable laws.</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}