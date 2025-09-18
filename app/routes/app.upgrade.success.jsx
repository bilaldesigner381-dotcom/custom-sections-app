// app/routes/app.upgrade.success.jsx
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Card, Text, Button, Banner, Box } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // 👇 Yehi jagah par metafield update karna hai
  try {
    await admin.graphql(`
      mutation {
        metafieldsSet(metafields: [
          {
            namespace: "section_master"
            key: "subscription_status"
            type: "single_line_text_field"
            value: "active"
          }
        ]) {
          userErrors {
            field
            message
          }
        }
      }
    `);

    console.log("✅ Subscription status set to active");
  } catch (error) {
    console.error("❌ Failed to set subscription status:", error);
  }

  return null;
};

export default function UpgradeSuccess() {
  const app = useAppBridge();

  useEffect(() => {
    app.toast.show("🎉 Welcome to Section Master Pro!");
  }, [app]);

  return (
    <Page>
      <Box padding="6">
        <Card>
          <Box padding="6">
            <Banner tone="success">
              <Text variant="headingXl" as="h2">Upgrade Successful! 🎉</Text>
            </Banner>
            
            <Box paddingBlockStart="4">
              <Text variant="bodyMd">
                Thank you for upgrading to Section Master Pro! You now have access to:
              </Text>
              <Box paddingBlockStart="2">
                <Text variant="bodyMd" as="ul">
                  <li>✅ All 15 premium sections</li>
                  <li>✅ Priority support</li>
                  <li>✅ Regular updates</li>
                </Text>
              </Box>
            </Box>

            <Box paddingBlockStart="6">
              <Button primary url="/app/sections">
                Start Using Premium Sections
              </Button>
            </Box>

            <Box paddingBlockStart="4">
              <Banner tone="info">
                <Text variant="bodySm">
                  💡 Your premium sections will appear in the theme editor within a few minutes.
                  If you don't see them, try refreshing the theme editor.
                </Text>
              </Banner>
            </Box>
          </Box>
        </Card>
      </Box>
    </Page>
  );
}

