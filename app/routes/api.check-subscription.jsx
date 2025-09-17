// app/routes/api.check-subscription.jsx - FIXED (removed discount fields)
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subscriptionCache = new Map();
const CACHE_DURATION = 30000;

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const cacheKey = session.shop;
  const cached = subscriptionCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return json(cached.data);
  }

  try {
    // TEMPORARY: Remove discount fields until database is updated
    const subscription = await prisma.subscription.findUnique({
      where: { shop: session.shop },
      select: { 
        status: true,
        createdAt: true,
        plan: true,
        chargeId: true
        // REMOVED: discountCode and discountPercentage temporarily
      }
    });

    const result = { 
      hasActiveSubscription: subscription?.status === 'active',
      subscription: subscription || null
    };

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