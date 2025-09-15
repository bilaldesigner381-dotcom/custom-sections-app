// app/routes/app.sections.jsx
import { useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Button, 
  Banner, 
  Badge, 
  InlineStack,
  Box,
  List,
  Icon
} from "@shopify/polaris";
import { LockIcon } from "@shopify/polaris-icons"; // FIXED: Using LockIcon instead of LockFilled
import { authenticate } from "../shopify.server";

// Required loader function
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Section data - replace with your actual section components later
const SECTIONS = [
  // FREE SECTIONS
  { id: 1, name: "Sticky WhatsApp Button", free: true, description: "Fixed WhatsApp button for customer support", image: "/api/placeholder/300/200" },
  { id: 2, name: "Testimonials", free: true, description: "Display customer reviews and testimonials", image: "/api/placeholder/300/200" },
  { id: 3, name: "FAQ Section", free: true, description: "Frequently asked questions with toggle", image: "/api/placeholder/300/200" },
  
  // PAID SECTIONS
  { id: 4, name: "Countdown Timer", free: false, description: "Create urgency with time-limited offers", image: "/api/placeholder/300/200" },
  { id: 5, name: "Featured Collection", free: false, description: "Showcase your best collections", image: "/api/placeholder/300/200" },
  { id: 6, name: "Featured Product", free: false, description: "Highlight individual products", image: "/api/placeholder/300/200" },
  { id: 7, name: "Hero Banner", free: false, description: "Full-width banner with call-to-action", image: "/api/placeholder/300/200" },
  { id: 8, name: "Newsletter Signup", free: false, description: "Email collection form", image: "/api/placeholder/300/200" },
  { id: 9, name: "Instagram Gallery", free: false, description: "Display Instagram feed", image: "/api/placeholder/300/200" },
  { id: 10, name: "Hero Banner Slider", free: false, description: "Multiple rotating banners", image: "/api/placeholder/300/200" },
  { id: 11, name: "Logo Carousel", free: false, description: "Showcase client logos", image: "/api/placeholder/300/200" },
  { id: 12, name: "Services Feature", free: false, description: "Highlight your services", image: "/api/placeholder/300/200" },
  { id: 13, name: "Video Section", free: false, description: "Embed videos with custom player", image: "/api/placeholder/300/200" },
  { id: 14, name: "Blog Highlights", free: false, description: "Show latest blog posts", image: "/api/placeholder/300/200" },
  { id: 15, name: "Contact + Map", free: false, description: "Contact form with Google Maps", image: "/api/placeholder/300/200" }
];

export default function SectionsManager() {
  const app = useAppBridge();
  const [filter, setFilter] = useState('all'); // 'all', 'free', 'paid'

  const filteredSections = SECTIONS.filter(section => {
    if (filter === 'all') return true;
    if (filter === 'free') return section.free;
    if (filter === 'paid') return !section.free;
    return true;
  });

  return (
    <Page>
      <div style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Text variant="heading2xl" as="h1">Section Gallery</Text>
        <Text variant="bodyMd" tone="subdued">Choose from 15 amazing sections to enhance your store</Text>
      </div>

      {/* Filter Tabs */}
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack gap="4" blockAlign="center">
              <Button 
                pressed={filter === 'all'} 
                onClick={() => setFilter('all')}
                size="large"
              >
                All Sections (15)
              </Button>
              <Button 
                pressed={filter === 'free'} 
                onClick={() => setFilter('free')}
                size="large"
                tone="success"
              >
                Free Sections (3)
              </Button>
              <Button 
                pressed={filter === 'paid'} 
                onClick={() => setFilter('paid')}
                size="large"
                tone="attention"
              >
                Premium Sections (12)
              </Button>
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Sections Grid */}
      <Layout>
        <Layout.Section>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {filteredSections.map((section) => (
              <Card key={section.id}>
                <Box padding="4">
                  {/* Section Image */}
                  <div style={{ 
                    height: '200px', 
                    backgroundColor: '#f6f6f7', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Text variant="bodyMd" tone="subdued">Section Preview</Text>
                  </div>

                  {/* Section Info */}
                  <InlineStack align="space-between" blockAlign="center">
                    <Text variant="headingMd" as="h3">{section.name}</Text>
                    {section.free ? (
                      <Badge tone="success">FREE</Badge>
                    ) : (
                      <Badge tone="new">PREMIUM</Badge>
                    )}
                  </InlineStack>

                  <Text variant="bodyMd" tone="subdued" as="p">
                    {section.description}
                  </Text>

                  {/* Action Buttons */}
                  <Box paddingBlockStart="4">
                    {section.free ? (
                      <Button fullWidth primary>
                        Add to Store
                      </Button>
                    ) : (
                      <Button 
                        fullWidth 
                        primary 
                        url="/app/upgrade"
                        icon={LockIcon} // FIXED: Using LockIcon
                      >
                        Upgrade to Unlock
                      </Button>
                    )}
                  </Box>

                  {/* Preview Button */}
                  <Box paddingBlockStart="2">
                    <Button fullWidth variant="plain" tone="magic">
                      Preview Section
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </Layout.Section>

        {/* Upgrade Banner for Paid Sections */}
        {filter === 'paid' && (
          <Layout.Section>
            <Banner
              title="Unlock 12 Premium Sections"
              tone="info"
              action={{ content: 'Upgrade Now - $9/month', url: '/app/upgrade' }}
            >
              <p>Get access to all premium sections including Countdown Timers, Instagram Galleries, Video sections, and more!</p>
            </Banner>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}