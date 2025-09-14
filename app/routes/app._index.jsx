// app/routes/app._index.jsx
import { Page, Card, Heading, Text, Button, Layout } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

// Required loader function
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AppDashboard() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Welcome to Section Master! 🎉</Heading>
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