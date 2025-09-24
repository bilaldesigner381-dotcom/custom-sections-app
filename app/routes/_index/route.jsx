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
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome to Section Master 🚀</h1>
        <p className={styles.text}>
          Easily transform your Shopify store with powerful custom sections and
          drag-and-drop functionality.
        </p>

        {ready && (
          <div className={styles.onboarding}>
            <h2>Install in One Click</h2>
            <p>Click below to add Section Master to your Shopify store.</p>
            <a href="/auth/login" className={styles.button}>
              🚀 Install Section Master
            </a>
          </div>
        )}

        <div className={styles.features}>
          <h2>Why Choose Section Master?</h2>
          <ul className={styles.list}>
            <li>
              <strong>🎨 Drag & Drop Builder</strong> – Build beautiful sections without coding
            </li>
            <li>
              <strong>⚡ Lightning Fast</strong> – Optimized for performance and SEO
            </li>
            <li>
              <strong>📱 Mobile Responsive</strong> – Works perfectly on all devices
            </li>
            <li>
              <strong>🛠️ Easy Customization</strong> – Change styles in just a click
            </li>
          </ul>
        </div>
      </div>

      <footer className={styles.footer}>
        <nav className={styles.links}>
          <a href="/privacy-policy">Privacy Policy</a> |{" "}
          <a href="/terms-of-service">Terms of Service</a> |{" "}
          <a href="/support">Support</a> |{" "}
          <a href="/user-guide">User Guide</a>
        </nav>
      </footer>
    </div>
  );
}

