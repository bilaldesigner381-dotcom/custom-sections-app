import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // Redirect to app if already authenticated
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome to Section Master! 🚀</h1>
        <p className={styles.text}>
          Transform your Shopify store with powerful custom sections and drag-and-drop functionality.
        </p>
        
        {showForm && (
          <div className={styles.onboarding}>
            <h2>Get Started in 3 Simple Steps:</h2>
            <ol className={styles.steps}>
              <li>Enter your Shopify store domain</li>
              <li>Grant necessary permissions</li>
              <li>Start creating amazing sections!</li>
            </ol>

            <Form className={styles.form} method="post" action="/auth/login">
              <label className={styles.label}>
                <span>Your Shopify Store Domain</span>
                <input 
                  className={styles.input} 
                  type="text" 
                  name="shop" 
                  placeholder="your-store.myshopify.com"
                  required
                />
                <span className={styles.hint}>e.g: my-shop-domain.myshopify.com</span>
              </label>
              <button className={styles.button} type="submit">
                🚀 Install Section Master
              </button>
            </Form>
          </div>
        )}

        <div className={styles.features}>
          <h2>Why Choose Section Master?</h2>
          <ul className={styles.list}>
            <li>
              <strong>🎨 Drag & Drop Builder</strong> - Create beautiful sections without coding
            </li>
            <li>
              <strong>⚡ Lightning Fast</strong> - Optimized for performance and SEO
            </li>
            <li>
              <strong>📱 Mobile Responsive</strong> - Perfect on all devices
            </li>
            <li>
              <strong>🛠️ Easy Customization</strong> - Change styles with click
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
