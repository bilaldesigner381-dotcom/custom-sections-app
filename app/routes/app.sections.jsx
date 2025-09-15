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
  Icon,
  Thumbnail
} from "@shopify/polaris";
import { LockIcon, PlayIcon, PlusIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";

// Required loader function
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Section data with proper thumbnails (using placeholder images for now)
const SECTIONS = [
  // FREE SECTIONS
  { 
    id: 1, 
    name: "Sticky WhatsApp Button", 
    free: true, 
    description: "Fixed WhatsApp button for customer support", 
    thumbnail: "https://via.placeholder.com/300x200/00E676/ffffff?text=WhatsApp+Button",
    category: "Conversion"
  },
  { 
    id: 2, 
    name: "Testimonials", 
    free: true, 
    description: "Display customer reviews and testimonials", 
    thumbnail: "https://via.placeholder.com/300x200/FF6B35/ffffff?text=Testimonials",
    category: "Social Proof"
  },
  { 
    id: 3, 
    name: "FAQ Section", 
    free: true, 
    description: "Frequently asked questions with toggle", 
    thumbnail: "https://via.placeholder.com/300x200/5C6AC4/ffffff?text=FAQ+Section",
    category: "Support"
  },
  
  // PAID SECTIONS
  { 
    id: 4, 
    name: "Countdown Timer", 
    free: false, 
    description: "Create urgency with time-limited offers", 
    thumbnail: "https://via.placeholder.com/300x200/FF0000/ffffff?text=Countdown+Timer",
    category: "Conversion"
  },
  { 
    id: 5, 
    name: "Featured Collection", 
    free: false, 
    description: "Showcase your best collections", 
    thumbnail: "https://via.placeholder.com/300x200/47C1BF/ffffff?text=Collections",
    category: "Products"
  },
  // ... Add all other sections with similar structure
];

export default function SectionsManager() {
  const app = useAppBridge();
  const [filter, setFilter] = useState('all');
  const [previewSection, setPreviewSection] = useState(null);

  const filteredSections = SECTIONS.filter(section => {
    if (filter === 'all') return true;
    if (filter === 'free') return section.free;
    if (filter === 'paid') return !section.free;
    return true;
  });

  // Function to handle adding section to store
  const handleAddSection = (sectionId) => {
    console.log(`Adding section ${sectionId} to store`);
    // TODO: Implement actual section addition logic
    app.toast.show("Section added successfully!");
  };

  // Function to handle preview
  const handlePreview = (section) => {
    setPreviewSection(section);
    console.log("Previewing section:", section.name);
    // TODO: Implement actual preview modal
  };

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
              <Button pressed={filter === 'all'} onClick={() => setFilter('all')}>
                All Sections (15)
              </Button>
              <Button pressed={filter === 'free'} onClick={() => setFilter('free')} tone="success">
                Free Sections (3)
              </Button>
              <Button pressed={filter === 'paid'} onClick={() => setFilter('paid')} tone="attention">
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {filteredSections.map((section) => (
              <Card key={section.id}>
                <Box padding="4">
                  {/* Section Thumbnail */}
                  <Thumbnail
                    source={section.thumbnail}
                    alt={section.name}
                    size="large"
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />

                  {/* Section Info */}
                  <Box paddingBlockStart="4">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text variant="headingMd" as="h3" fontWeight="bold">{section.name}</Text>
                      {section.free ? (
                        <Badge tone="success">FREE</Badge>
                      ) : (
                        <Badge tone="new">PREMIUM</Badge>
                      )}
                    </InlineStack>

                    <Text variant="bodySm" tone="subdued" as="p">
                      {section.category}
                    </Text>

                    <Text variant="bodyMd" as="p" style={{ marginTop: '0.5rem' }}>
                      {section.description}
                    </Text>
                  </Box>

                  {/* Action Buttons */}
                  <Box paddingBlockStart="4">
                    <InlineStack gap="2" blockAlign="center">
                      {section.free ? (
                        <Button 
                          fullWidth 
                          primary 
                          onClick={() => handleAddSection(section.id)}
                          icon={PlusIcon}
                        >
                          Add to Store
                        </Button>
                      ) : (
                        <Button 
                          fullWidth 
                          primary 
                          url="/app/upgrade"
                          icon={LockIcon}
                        >
                          Upgrade to Unlock
                        </Button>
                      )}
                      
                      <Button 
                        variant="plain" 
                        onClick={() => handlePreview(section)}
                        icon={PlayIcon}
                        size="large"
                      >
                        Preview
                      </Button>
                    </InlineStack>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </Layout.Section>

        {/* Upgrade Banner */}
        {filter === 'paid' && (
          <Layout.Section>
            <Banner
              title="Unlock 12 Premium Sections"
              tone="info"
              action={{ content: 'Upgrade Now - $9/month', url: '/app/upgrade' }}
            >
              Get access to countdown timers, Instagram galleries, video sections, and more!
            </Banner>
          </Layout.Section>
        )}
      </Layout>

      {/* Preview Modal (to be implemented) */}
      {previewSection && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <Card>
            <Box padding="4">
              <Text variant="headingXl">Preview: {previewSection.name}</Text>
              <Text variant="bodyMd">Preview functionality coming soon!</Text>
              <Box paddingBlockStart="4">
                <Button onClick={() => setPreviewSection(null)}>Close Preview</Button>
              </Box>
            </Box>
          </Card>
        </div>
      )}
    </Page>
  );
}