// app/routes/app.sections.jsx
import { useState, useEffect } from "react";
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
  Thumbnail,
  Spinner
} from "@shopify/polaris";
import { LockIcon, PlayIcon, PlusIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function SectionsManager() {
  const app = useAppBridge();
  const [filter, setFilter] = useState('all');
  const [previewSection, setPreviewSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [hasPremium, setHasPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/sections');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setSections(data.sections || []);
      setHasPremium(data.hasPremium || false);
      
    } catch (error) {
      console.error('Failed to fetch sections:', error);
      setError('Failed to load sections. Please try again.');
      app.toast.show('Failed to load sections');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSections = sections.filter(section => {
    if (filter === 'all') return true;
    if (filter === 'free') return section.isFree;
    if (filter === 'paid') return !section.isFree;
    return true;
  });

  const handleAddSection = async (section) => {
    try {
      console.log('Adding section:', section.name);
      
      // Show immediate feedback
      app.toast.show(`"${section.displayName}" added successfully!`);
      
      // TODO: Implement actual section installation API
      // For now, we'll just refresh the sections list
      await fetchSections();
      
    } catch (error) {
      console.error('Failed to add section:', error);
      app.toast.show('Failed to add section. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Page>
        <Box padding="6" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="large" />
          <Box paddingInlineStart="4">
            <Text variant="bodyMd">Loading sections...</Text>
          </Box>
        </Box>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Box padding="6">
          <Banner tone="critical">
            <Text variant="bodyMd">{error}</Text>
          </Banner>
          <Box paddingBlockStart="4">
            <Button onClick={fetchSections}>Try Again</Button>
          </Box>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <div style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Text variant="heading2xl" as="h1">Section Gallery</Text>
        <Text variant="bodyMd" tone="subdued">
          {hasPremium ? 'You have access to all premium sections!' : `Choose from ${sections.length} amazing sections`}
        </Text>
      </div>

      {/* Filter Tabs */}
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack gap="4" blockAlign="center">
              <Button 
                pressed={filter === 'all'} 
                onClick={() => setFilter('all')}
                size="medium"
              >
                All Sections ({sections.length})
              </Button>
              <Button 
                pressed={filter === 'free'} 
                onClick={() => setFilter('free')} 
                tone="success"
                size="medium"
              >
                Free Sections ({sections.filter(s => s.isFree).length})
              </Button>
              <Button 
                pressed={filter === 'paid'} 
                onClick={() => setFilter('paid')} 
                tone="attention"
                size="medium"
              >
                Premium Sections ({sections.filter(s => !s.isFree).length})
              </Button>
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Sections Grid */}
      <Layout>
        <Layout.Section>
          {filteredSections.length === 0 ? (
            <Card>
              <Box padding="6" textAlign="center">
                <Text variant="bodyMd" tone="subdued">
                  No sections found. {filter === 'paid' && !hasPremium ? 'Upgrade to access premium sections.' : 'Try refreshing the page.'}
                </Text>
              </Box>
            </Card>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2rem',
              marginTop: '2rem'
            }}>
              {filteredSections.map((section) => (
                <Card key={section.name}>
                  <Box padding="4">
                    {/* Section Thumbnail */}
                    <Thumbnail
                      source={section.thumbnail || "https://via.placeholder.com/300x200/e1e3e5/637381?text=No+Image"}
                      alt={section.displayName}
                      size="large"
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setPreviewSection(section)}
                    />

                    {/* Section Info */}
                    <Box paddingBlockStart="4">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text variant="headingMd" as="h3" fontWeight="bold">
                          {section.displayName}
                        </Text>
                        {section.isFree ? (
                          <Badge tone="success">FREE</Badge>
                        ) : (
                          <Badge tone="new">PREMIUM</Badge>
                        )}
                      </InlineStack>

                      {section.category && (
                        <Text variant="bodySm" tone="subdued" as="p">
                          {section.category}
                        </Text>
                      )}

                      <Text variant="bodyMd" as="p" style={{ marginTop: '0.5rem', minHeight: '40px' }}>
                        {section.description}
                      </Text>
                    </Box>

                    {/* Action Buttons */}
                    <Box paddingBlockStart="4">
                      <InlineStack gap="2" blockAlign="center">
                        {section.isFree || hasPremium ? (
                          <Button 
                            fullWidth 
                            primary 
                            onClick={() => handleAddSection(section)}
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
                          onClick={() => setPreviewSection(section)}
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
          )}
        </Layout.Section>

        {/* Upgrade Banner - Only show if not premium */}
        {!hasPremium && filter === 'paid' && filteredSections.length > 0 && (
          <Layout.Section>
            <Banner
              title="Unlock Premium Sections"
              tone="info"
              action={{ content: 'Upgrade Now - $9/month', url: '/app/upgrade' }}
            >
              Get access to {sections.filter(s => !s.isFree).length} premium sections including countdown timers, Instagram galleries, and more!
            </Banner>
          </Layout.Section>
        )}
      </Layout>

      {/* Preview Modal */}
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
          zIndex: 1000,
          padding: '1rem'
        }}>
          <Card>
            <Box padding="4">
              <Text variant="headingXl" as="h2">Preview: {previewSection.displayName}</Text>
              
              <img 
                src={previewSection.thumbnail || "https://via.placeholder.com/300x200/e1e3e5/637381?text=No+Image"} 
                alt={previewSection.displayName}
                style={{ 
                  width: '100%', 
                  maxWidth: '400px', 
                  borderRadius: '8px', 
                  margin: '1rem 0' 
                }}
              />
              
              <Text variant="bodyMd" as="p">
                {previewSection.description}
              </Text>
              
              {previewSection.category && (
                <Text variant="bodySm" tone="subdued" as="p">
                  Category: {previewSection.category}
                </Text>
              )}
              
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