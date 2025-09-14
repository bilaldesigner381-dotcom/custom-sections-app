import { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { 
  Page, 
  Layout, 
  Card, 
  Heading, 
  Text, 
  List, 
  Link, 
  Button, 
  Banner, 
  Badge, 
  InlineStack, 
  Box,
  TextContainer
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

// Required loader function for authentication
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AppDashboard() {
  const app = useAppBridge();
  const [shopDomain, setShopDomain] = useState("");

  useEffect(() => {
    if (app && app.getState) {
      setShopDomain(app.getState().shopDomain);
    }
  }, [app]);

  return (
    <Page>
      <TitleBar title="Section Master" />
      
      <Layout>
        {/* Welcome Section */}
        <Layout.Section>
          <Card sectioned>
            <InlineStack align="space-between" blockAlign="center">
              <Heading>🎉 Welcome to Section Master!</Heading>
              <Badge tone="success">Free Plan Active</Badge>
            </InlineStack>
            <TextContainer>
              <Text variant="bodyMd" as="p">
                Access <strong>3 free sections</strong> instantly! Upgrade to unlock all <strong>15 premium sections</strong> for just $9/month.
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>

        {/* Pricing & Features */}
        <Layout.Section>
          <Card title="💰 Pricing Plans" sectioned>
            <Layout>
              <Layout.Section oneHalf>
                <Box padding="4" background="bg-surface-secondary" borderRadius="2">
                  <Heading>Free Plan</Heading>
                  <Text variant="headingXl" as="h2">$0</Text>
                  <Text variant="bodyMd" tone="subdued">forever</Text>
                  
                  <List>
                    <List.Item>✅ 3 Basic Sections</List.Item>
                    <List.Item>✅ Standard Support</List.Item>
                    <List.Item>❌ Premium Sections</List.Item>
                    <List.Item>❌ Priority Support</List.Item>
                  </List>
                  
                  <Box paddingBlockStart="4">
                    <Button fullWidth disabled>
                      Current Plan
                    </Button>
                  </Box>
                </Box>
              </Layout.Section>
              
              <Layout.Section oneHalf>
                <Box padding="4" background="bg-surface-success" borderRadius="2">
                  <Heading>Pro Plan</Heading>
                  <Text variant="headingXl" as="h2">$9</Text>
                  <Text variant="bodyMd" tone="subdued">per month</Text>
                  
                  <List>
                    <List.Item>✅ All 15 Premium Sections</List.Item>
                    <List.Item>✅ Priority Support</List.Item>
                    <List.Item>✅ Regular Updates</List.Item>
                    <List.Item>✅ Custom Requests</List.Item>
                  </List>
                  
                  <Box paddingBlockStart="4">
                    <Button primary fullWidth url="/app/upgrade">
                      Upgrade Now
                    </Button>
                  </Box>
                </Box>
              </Layout.Section>
            </Layout>
          </Card>
        </Layout.Section>

        {/* Theme Editor Instructions */}
        <Layout.Section>
          <Card title="🎨 How to Add Sections" sectioned>
            <Banner status="info">
              All sections appear in your Shopify theme editor under <strong>Apps → Section Master</strong>
            </Banner>
            
            <div style={{ marginTop: '1.5rem' }}>
              <List type="number">
                <List.Item>Go to <strong>Online Store → Themes</strong></List.Item>
                <List.Item>Click <strong>Customize</strong> on your theme</List.Item>
                <List.Item>Click <strong>Add section → Apps</strong></List.Item>
                <List.Item>Choose <strong>Section Master</strong></List.Item>
                <List.Item>Select any section and customize!</List.Item>
              </List>
            </div>
          </Card>
        </Layout.Section>

        {/* Free vs Premium Sections */}
        <Layout.Section>
          <Card title="📦 Available Sections" sectioned>
            <Layout>
              <Layout.Section oneHalf>
                <Heading>Free Sections</Heading>
                <List>
                  <List.Item>1. Hero Banner</List.Item>
                  <List.Item>2. Feature Grid</List.Item>
                  <List.Item>3. Testimonials</List.Item>
                </List>
                <Box padding="2">
                  <Button url="/app/sections?plan=free">Use Free Sections</Button>
                </Box>
              </Layout.Section>
              
              <Layout.Section oneHalf>
                <Heading>
                  Premium Sections 
                  <Badge tone="new">$9/month</Badge>
                </Heading>
                <List>
                  <List.Item>4. Product Carousel</List.Item>
                  <List.Item>5. Countdown Timer</List.Item>
                  <List.Item>6. Video Hero</List.Item>
                  <List.Item>7. Advanced FAQ</List.Item>
                  <List.Item>8. Interactive Quiz</List.Item>
                  <List.Item>9. Lookbook Gallery</List.Item>
                  <List.Item>10. Newsletter Signup</List.Item>
                  <List.Item>11. Advanced Filters</List.Item>
                  <List.Item>12. Size Guide</List.Item>
                  <List.Item>13. Store Locator</List.Item>
                  <List.Item>14. Social Feed</List.Item>
                  <List.Item>15. Advanced Reviews</List.Item>
                </List>
                <Box padding="2">
                  <Button primary url="/app/upgrade">
                    Unlock All Sections
                  </Button>
                </Box>
              </Layout.Section>
            </Layout>
          </Card>
        </Layout.Section>

        {/* Quick Actions */}
        <Layout.Section secondary>
          <Card title="⚡ Quick Start" sectioned>
            <List>
              <List.Item>
                <Link url="/app/sections?plan=free" removeUnderline>
                  <Button fullWidth>Use Free Sections</Button>
                </Link>
              </List.Item>
              <List.Item>
                <Link url="/app/templates" removeUnderline>
                  <Button fullWidth>View Templates</Button>
                </Link>
              </List.Item>
              <List.Item>
                <Link url="/app/upgrade" removeUnderline>
                  <Button fullWidth primary>
                    Upgrade to Pro - $9/month
                  </Button>
                </Link>
              </List.Item>
            </List>
          </Card>

          <Card title="💬 Support" sectioned>
            <TextContainer>
              <Text variant="bodyMd" as="p">
                Need help or have questions about upgrading?
              </Text>
              <div style={{ marginTop: '1rem' }}>
                <Button url="/app/support" outline>
                  Contact Support
                </Button>
              </div>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

// Add missing TitleBar component
function TitleBar({ title }) {
  return (
    <div style={{ padding: '1rem 0', borderBottom: '1px solid #e1e3e5', marginBottom: '2rem' }}>
      <Heading element="h1">{title}</Heading>
    </div>
  );
}