// app/routes/api.check-subscription.jsx - FIXED
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Optional: Add simple caching to reduce database calls
const subscriptionCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  // Check cache first
  const cacheKey = session.shop;
  const cached = subscriptionCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return json(cached.data);
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { shop: session.shop },
      select: { 
        status: true,
        discountCode: true,        // Now this field exists
        discountPercentage: true,  // Now this field exists
        createdAt: true,
        plan: true,                // Added for completeness
        chargeId: true             // Added for potential future use
      }
    });

    const result = { 
      hasActiveSubscription: subscription?.status === 'active',
      subscription: subscription || null
    };

    // Cache the result
    subscriptionCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return json(result);

  } catch (error) {
    console.error('Subscription check error:', error);
    return json({ 
      hasActiveSubscription: false,
      subscription: null,
      error: 'Failed to check subscription status'
    }, { status: 500 });
  }
}