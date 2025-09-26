import { Form } from "@remix-run/react";
import styles from "./styles.module.css";

export default function Support() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Get Support</h1>
            <p className={styles.subtitle}>
              We're here to help you succeed with Section Master. Our support team 
              is ready to assist you with any questions or issues.
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.supportGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <h3>Email Support</h3>
                  <p>Send us an email and we'll get back to you quickly</p>
                  <a href="mailto:sectionmasterapp@gmail.com" className={styles.emailLink}>
                   sectionmasterapp@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>⏱️</div>
                <div>
                  <h3>Response Time</h3>
                  <p>We typically respond within <strong>24-48 hours</strong></p>
                  <span className={styles.responseBadge}>Quick Response</span>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>🛠️</div>
                <div>
                  <h3>Technical Support</h3>
                  <p>Get help with installation, configuration, and technical issues</p>
                  <span className={styles.supportBadge}>Expert Assistance</span>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2>Send us a Message</h2>
                  <p>Fill out the form below and we'll get back to you as soon as possible</p>
                </div>

                <Form method="post" className={styles.form}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <span className={styles.labelText}>Your Name</span>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        className={styles.input}
                        placeholder="Enter your full name"
                      />
                    </label>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <span className={styles.labelText}>Your Email</span>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className={styles.input}
                        placeholder="your.email@example.com"
                      />
                    </label>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <span className={styles.labelText}>Subject</span>
                      <select name="subject" required className={styles.select}>
                        <option value="">Select a topic</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                        <option value="general">General Inquiry</option>
                        <option value="bug">Bug Report</option>
                      </select>
                    </label>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <span className={styles.labelText}>Message</span>
                      <textarea 
                        name="message" 
                        required 
                        className={styles.textarea}
                        placeholder="Please describe your issue or question in detail..."
                        rows={6}
                      ></textarea>
                    </label>
                  </div>

                  <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitButton}>
                      <span className={styles.buttonIcon}>🚀</span>
                      Send Message
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How do I install Section Master?</h3>
              <p>Simply click the install button from the Shopify App Store and follow the prompts to add it to your store.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Is there a free trial?</h3>
              <p>Yes! You get 3 sections completely free. Upgrade to premium for unlimited sections at $9/month.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Can I cancel anytime?</h3>
              <p>Absolutely. You can uninstall the app anytime, and all your data will be deleted within 48 hours.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you offer custom sections?</h3>
              <p>Yes! Contact us for custom section development tailored to your specific needs.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}