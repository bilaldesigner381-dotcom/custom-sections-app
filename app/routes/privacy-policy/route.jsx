import styles from './styles.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </header>

        <section className={styles.content}>
          <div className={styles.intro}>
            <p>
              <strong>Section Master</strong> (“we”, “our”, or “us”) respects your privacy and is committed
              to protecting the personal information you share with us. This Privacy Policy
              explains what information we collect, how we use it, and how we keep it safe.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Information We Collect</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>🏪</div>
                <h3 className={styles.cardTitle}>Store Information</h3>
                <p className={styles.cardText}>Shopify store domain and store ID</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardIcon}>👤</div>
                <h3 className={styles.cardTitle}>Merchant Information</h3>
                <p className={styles.cardText}>Email address provided by Shopify</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardIcon}>⚙️</div>
                <h3 className={styles.cardTitle}>App Data</h3>
                <p className={styles.cardText}>Custom section settings and configurations</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardIcon}>📊</div>
                <h3 className={styles.cardTitle}>Technical Data</h3>
                <p className={styles.cardText}>Install/uninstall events and error reports</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🚀</span>
                <div>
                  <h4>Provide & Operate</h4>
                  <p>Deliver and maintain the Section Master app functionality</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💾</span>
                <div>
                  <h4>Save & Manage</h4>
                  <p>Store and organize your custom sections and settings</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🛠️</span>
                <div>
                  <h4>Customer Support</h4>
                  <p>Provide technical assistance and resolve issues</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📈</span>
                <div>
                  <h4>Improve Performance</h4>
                  <p>Enhance app reliability and user experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Storage & Security</h2>
            <div className={styles.securityCard}>
              <div className={styles.securityIcon}>🔒</div>
              <div>
                <h3>Secure Cloud Storage</h3>
                <p>
                  All data is securely stored in our Supabase database with industry-standard
                  encryption and security practices. We employ multiple layers of protection
                  including SSL encryption, secure firewalls, and regular security audits.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Sharing</h2>
            <div className={styles.noShare}>
              <div className={styles.noShareIcon}>🚫</div>
              <p>
                We do <strong>not</strong> sell, trade, or rent your personal information to third parties. 
                Data is only shared with Shopify APIs when required to operate the app, and we ensure
                all data transfers comply with strict security standards.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Retention & Deletion</h2>
            <div className={styles.retention}>
              <div className={styles.retentionBadge}>48h</div>
              <p>
                When you uninstall the Section Master app, all associated data is automatically 
                and permanently deleted from our systems within <strong>48 hours</strong>. 
                You can also request immediate data deletion by contacting our support team.
              </p>
            </div>
          </div>

          <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Contact Us</h2>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📧</div>
              <div>
                <p>Have questions about our Privacy Policy?</p>
                <a href="mailto:sectionmasterapp@gmail.com" className={styles.contactLink}>
                  sectionmasterapp@gmail.com
                </a>
                <p className={styles.contactResponse}>We typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}