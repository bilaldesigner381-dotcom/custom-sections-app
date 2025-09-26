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
  Icon,
  Spinner
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
  const [subscriptionStatus, setSubscriptionStatus] = useState('checking');
  const [discountCode, setDiscountCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [validatingDiscount, setValidatingDiscount] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/check-subscription');
      const { hasActiveSubscription } = await response.json();
      
      setSubscriptionStatus(hasActiveSubscription ? 'active' : 'inactive');
    } catch (error) {
      setSubscriptionStatus('inactive');
    }
  };

  const validateDiscount = async () => {
    if (!discountCode.trim()) return;
    
    setValidatingDiscount(true);
    try {
      const response = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ discountCode })
      });

      const result = await response.json();
      
      if (result.valid) {
        setDiscountInfo(result.discount);
        app.toast.show(`🎉 Discount applied: ${result.discount.percentage}% off!`);
      } else {
        setDiscountInfo(null);
        app.toast.show(result.error || 'Invalid discount code');
      }
    } catch (error) {
      app.toast.show('Error validating discount code');
    }
    setValidatingDiscount(false);
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (discountInfo) {
        formData.append('discountCode', discountInfo.code);
        formData.append('discountPercentage', discountInfo.percentage);
      }

      const response = await fetch('/api/create-charge', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.confirmationUrl) {
        // Redirect to Shopify payment
        window.location.href = data.confirmationUrl;
      } else if (data.error) {
        app.toast.show(data.error);
      } else {
        throw new Error('No confirmation URL received');
      }

    } catch (error) {
      setIsLoading(false);
      app.toast.show("Upgrade failed. Please try again.");
    }
  };

  // Calculate discounted price
  const originalPrice = 9.00;
  const discountedPrice = discountInfo 
    ? originalPrice * (1 - discountInfo.percentage / 100)
    : originalPrice;

  if (subscriptionStatus === 'checking') {
    return (
      <Page>
        <Box padding="6" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="large" />
          <Box paddingInlineStart="4">
            <Text variant="bodyMd">Checking subscription status...</Text>
          </Box>
        </Box>
      </Page>
    );
  }

  if (subscriptionStatus === 'active') {
    return (
      <Page>
        <Box padding="6">
          <Banner tone="success">
            <Text variant="headingMd">🎉 You're already a Pro member!</Text>
            <Text variant="bodyMd">You have full access to all 13 premium sections.</Text>
          </Banner>
          <Box paddingBlockStart="4">
            <Button url="/app/sections">View All Sections</Button>
          </Box>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <div style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Text variant="heading2xl" as="h1">Upgrade to Pro</Text>
        <Text variant="bodyMd" tone="subdued">Unlock all 13 premium sections for your store</Text>
      </div>

      <Layout>
        {/* Pricing Card */}
        <Layout.Section>
          <Card>
            <Box padding="6">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {discountInfo ? (
                  <>
                    <Text variant="headingLg" tone="subdued" style={{ textDecoration: 'line-through' }}>
                      ${originalPrice.toFixed(2)}
                    </Text>
                    <Text variant="heading4xl" as="h2" tone="success">
                      ${discountedPrice.toFixed(2)}
                    </Text>
                    <Text variant="bodyLg" tone="success">
                      {discountInfo.percentage}% OFF - {discountInfo.description}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text variant="heading4xl" as="h2">${originalPrice.toFixed(2)}</Text>
                    <Text variant="bodyLg" tone="subdued">per month / cancel anytime</Text>
                  </>
                )}
              </div>

              {/* Features List */}
              <List>
                <List.Item>
                  <InlineStack gap="3" blockAlign="center">
                    <Icon source={CheckIcon} tone="success" />
                    <Text variant="bodyMd">10 Premium Sections (13 total)</Text>
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

              {/* Discount Code Section */}
              <Box paddingBlockStart="6">
                <Card>
                  <Box padding="4">
                    <Text variant="headingMd" as="h3">💎 Apply Promo Code</Text>
                    <Box paddingBlockStart="2">
                      <InlineStack gap="2" blockAlign="end">
                        <div style={{ flex: 1 }}>
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #c4cdd5',
                              borderRadius: '4px',
                              fontSize: '1rem'
                            }}
                          />
                        </div>
                        <Button 
                          onClick={validateDiscount}
                          loading={validatingDiscount}
                          disabled={!discountCode.trim()}
                        >
                          Apply
                        </Button>
                      </InlineStack>
                    </Box>
                  </Box>
                </Card>
              </Box>

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
                  {discountInfo ? (
                    `Upgrade Now - $${discountedPrice.toFixed(2)}/month`
                  ) : (
                    `Upgrade Now - $${originalPrice.toFixed(2)}/month`
                  )}
                </Button>
              </Box>

              {/* Payment Explanation */}
              <Box paddingBlockStart="4">
                <Banner tone="info">
                  <Text variant="bodyMd">
                    🔒 You'll be redirected to Shopify's secure payment portal. 
                    The charge will appear on your Shopify bill.
                  </Text>
                </Banner>
              </Box>
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
              <List.Item>Newsletter Signup</List.Item>
              <List.Item>Instagram Gallery</List.Item>
              <List.Item>Hero Banner Slider</List.Item>
              <List.Item>Logo Carousel</List.Item>
              <List.Item>Services Feature</List.Item>
              <List.Item>Video Section</List.Item>
              <List.Item>Contact + Map</List.Item>
            </List>
          </Card>

          <Card title="💡 How It Works" sectioned>
            <Text variant="bodyMd" as="p">
              After upgrading, all premium sections will instantly appear in your 
              theme editor under <strong>Apps → Section Master</strong>. No setup required!
            </Text>
          </Card>

          {/* Support Card */}
          <Card title="❓ Need Help?" sectioned>
            <Text variant="bodyMd" as="p">
              Have questions about pricing or features?
            </Text>
            <Box paddingBlockStart="2">
              <Button url="/app/support" outline>
                Contact Support
              </Button>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}