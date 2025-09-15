// app/routes/app.upgrade.jsx
import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { 
  Page, 
  Card, 
  Text, 
  Button, 
  Layout, 
  InlineStack,
  Box,
  List,
  Banner,
  Icon
} from "@shopify/polaris";
import { CheckIcon, StarIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function UpgradePage() {
  const app = useAppBridge();
  const [isLoading, setIsLoading] = useState(false);
  const [upgradeStatus, setUpgradeStatus] = useState(null);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      // This will be implemented with Shopify Billing API
      console.log("Initiating upgrade process...");
      
      // Simulate payment process
      setTimeout(() => {
        setIsLoading(false);
        setUpgradeStatus('success');
        app.toast.show("🎉 Upgrade successful! You now have access to all premium sections.");
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      setUpgradeStatus('error');
      app.toast.show("Upgrade failed. Please try again.");
    }
  };

  return (
    <Page>
      <div style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Text variant="heading2xl" as="h1">Upgrade to Pro</Text>
        <Text variant="bodyMd" tone="subdued">Unlock all 15 premium sections for your store</Text>
      </div>

      <Layout>
        {/* Pricing Card */}
        <Layout.Section>
          <Card>
            <Box padding="6">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Text variant="heading4xl" as="h2">$9</Text>
                <Text variant="bodyLg" tone="subdued">per month / cancel anytime</Text>
              </div>

              {/* Features List */}
              <List>
                <List.Item>
                  <InlineStack gap="3" blockAlign="center">
                    <Icon source={CheckIcon} tone="success" />
                    <Text variant="bodyMd">12 Premium Sections (15 total)</Text>
                  </InlineStack>
                </List.Item>
                <List.Item>
                  <InlineStack gap="3" blockAlign="center">
                    <Icon source={CheckIcon} tone="success" />
                    <Text variant="bodyMd">Priority Support</Text>
                  </InlineStack>
                </List.Item>
                <List.Item>
                  <InlineStack gap="3" blockAlign="center">
                    <Icon source={CheckIcon} tone="success" />
                    <Text variant="bodyMd">Regular Updates</Text>
                  </InlineStack>
                </List.Item>
                <List.Item>
                  <InlineStack gap="3" blockAlign="center">
                    <Icon source={CheckIcon} tone="success" />
                    <Text variant="bodyMd">Custom Section Requests</Text>
                  </InlineStack>
                </List.Item>
              </List>

              {/* Upgrade Button */}
              <Box paddingBlockStart="6">
                <Button 
                  fullWidth 
                  size="large" 
                  primary 
                  loading={isLoading}
                  onClick={handleUpgrade}
                  icon={StarIcon}
                >
                  Upgrade Now - $9/month
                </Button>
              </Box>

              {/* Success Message */}
              {upgradeStatus === 'success' && (
                <Box paddingBlockStart="4">
                  <Banner tone="success">
                    <Text variant="bodyMd" fontWeight="bold">
                      🎉 Upgrade successful! Refresh your theme editor to see all premium sections.
                    </Text>
                  </Banner>
                </Box>
              )}
            </Box>
          </Card>
        </Layout.Section>

        {/* Premium Sections List */}
        <Layout.Section secondary>
          <Card title="📦 Premium Sections You'll Unlock" sectioned>
            <List>
              <List.Item>Countdown Timer</List.Item>
              <List.Item>Featured Collection</List.Item>
              <List.Item>Featured Product</List.Item>
              <List.Item>Hero Banner</List.Item>
              <List.Item>Newsletter Signup</List.Item>
              <List.Item>Instagram Gallery</List.Item>
              <List.Item>Hero Banner Slider</List.Item>
              <List.Item>Logo Carousel</List.Item>
              <List.Item>Services Feature</List.Item>
              <List.Item>Video Section</List.Item>
              <List.Item>Blog Highlights</List.Item>
              <List.Item>Contact + Map</List.Item>
            </List>
          </Card>

          <Card title="💡 How It Works" sectioned>
            <Text variant="bodyMd" as="p">
              After upgrading, all premium sections will instantly appear in your 
              theme editor under <strong>Apps → Section Master</strong>. No setup required!
            </Text>
            <Box paddingBlockStart="2">
              <Button variant="plain" url="/app/sections">
                View All Sections
              </Button>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}