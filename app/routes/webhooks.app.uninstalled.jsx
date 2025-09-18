// app/routes/webhooks.app.uninstalled.jsx
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, session, topic, admin } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await db.session.deleteMany({ where: { shop } });
  }

  try {
    // 🔥 Mark subscription as inactive in metafields
    await admin.graphql(`
      mutation {
        metafieldsSet(metafields: [
          {
            namespace: "section_master"
            key: "subscription_status"
            type: "single_line_text_field"
            value: "inactive"
          }
        ]) {
          userErrors { field message }
        }
      }
    `);
  } catch (err) {
    console.error(`Failed to update subscription metafield for ${shop}:`, err);
  }

  return new Response();
};
