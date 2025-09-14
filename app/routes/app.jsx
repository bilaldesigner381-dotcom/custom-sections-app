import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Page, Layout, Card, Heading, TextContainer, Text, List, Link, Button, Banner } from "@shopify/polaris";
import { useEffect, useState } from "react";

export default function AppDashboard() {
  const app = useAppBridge();
  const [shopDomain, setShopDomain] = useState("");

  useEffect(() => {
    // Get shop domain from App Bridge
    setShopDomain(app.getState().shopDomain);
  }, [app]);

  return (
    <Page>
      <TitleBar title="Section Master" />
      
      <Layout>
        {/* Welcome Section */}
        <Layout.Section>
          <Card sectioned>
            <Heading>🎉 Welcome to Section Master!</Heading>
            <TextContainer>
              <Text variant="bodyMd" as="p">
                Thank you for installing Section Master! Follow these simple steps to add amazing custom sections to your store.
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>

        {/* Theme Editor Instructions */}
        <Layout.Section>
          <Card title="🎨 How to Add Sections in Theme Editor" sectioned>
            <Banner status="info">
              Our sections appear directly in your Shopify theme editor under the <strong>Apps</strong> section!
            </Banner>
            
            <div style={{ marginTop: '1.5rem' }}>
              <List type="number">
                <List.Item>
                  <Text variant="bodyMd" fontWeight="bold">Go to your Shopify <strong>Online Store → Themes</strong></Text>
                </List.Item>
                
                <List.Item>
                  <Text variant="bodyMd" fontWeight="bold">Click <strong>Customize</strong> on your current theme</Text>
                </List.Item>
                
                <List.Item>
                  <Text variant="bodyMd" fontWeight="bold">In the theme editor, click <strong>Add section</strong></Text>
                </List.Item>
                
                <List.Item>
                  <Text variant="bodyMd" fontWeight="bold">You will see two options: <strong>Sections</strong> and <strong>Apps</strong></Text>
                </List.Item>
                
                <List.Item>
                  <Text variant="bodyMd" fontWeight="bold">Click <strong>Apps</strong> to view our custom sections</Text>
                </List.Item>
                
                <List.Item>
                  <Text variant="bodyMd" fontWeight="bold">Choose a section from the list and add it to your page</Text>
                </List.Item>
              </List>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f6f6f7', borderRadius: '8px' }}>
              <Text variant="bodyMd" fontWeight="bold">💡 Pro Tip:</Text>
              <Text variant="bodyMd" as="p">
                You can drag and drop our sections anywhere in your theme layout! 
                Customize each section's settings right in the theme editor.
              </Text>
            </div>
          </Card>
        </Layout.Section>

        {/* Video Tutorial Card */}
        <Layout.Section>
          <Card title="📺 Video Tutorial" sectioned>
            <TextContainer>
              <Text variant="bodyMd" as="p">
                Prefer visual instructions? Watch our 2-minute tutorial on how to add sections to your theme:
              </Text>
            </TextContainer>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Button primary url="/video-tutorial">
                Watch Tutorial
              </Button>
            </div>
          </Card>
        </Layout.Section>

        {/* Quick Actions */}
        <Layout.Section secondary>
          <Card title="⚡ Quick Actions" sectioned>
            <List>
              <List.Item>
                <Link url="/sections" removeUnderline>
                  <Button fullWidth>Browse Sections</Button>
                </Link>
              </List.Item>
              <List.Item>
                <Link url="/templates" removeUnderline>
                  <Button fullWidth>View Templates</Button>
                </Link>
              </List.Item>
              <List.Item>
                <Link url="/create-section" removeUnderline>
                  <Button fullWidth primary>
                    Create Custom Section
                  </Button>
                </Link>
              </List.Item>
            </List>
          </Card>

          <Card title="❓ Need Help?" sectioned>
            <TextContainer>
              <Text variant="bodyMd" as="p">
                Stuck somewhere? Our support team is ready to help!
              </Text>
              <div style={{ marginTop: '1rem' }}>
                <Button url="/support" outline>
                  Get Help
                </Button>
              </div>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
