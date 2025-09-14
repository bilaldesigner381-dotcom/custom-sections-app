// app/routes/app._index.jsx
import { Page, Card, Text, Button, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

// Required loader function
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AppDashboard() {
  return (
    <Page>
      {/* Simple title instead of Heading */}
      <div style={{ padding: '2rem 0' }}>
        <Text variant="heading2xl" as="h1">
          Welcome to Section Master! 🎉
        </Text>
      </div>
      
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingXl" as="h2">
              Pricing Plans
            </Text>
            <Text variant="bodyMd">
              Access 3 free sections instantly! Upgrade to unlock all 15 premium sections for just $9/month.
            </Text>
            <Button primary url="/app/sections">
              Get Started
            </Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}