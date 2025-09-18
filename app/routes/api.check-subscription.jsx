// app/routes/api.check-subscription.jsx
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subscriptionCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);

  const cacheKey = session.shop;
  const cached = subscriptionCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return json(cached.data);
  }

  try {
    // ✅ Query Shopify for active subscriptions
    const response = await admin.graphql(`
      {
        currentAppInstallation {
          activeSubscriptions {
            id
            name
            status
            createdAt
          }
        }
      }
    `);

    const data = await response.json();
    const activeSub =
      data?.data?.currentAppInstallation?.activeSubscriptions?.[0] || null;

    // ✅ Sync with DB
    if (activeSub) {
      await prisma.subscription.upsert({
        where: { shop: session.shop },
        update: {
          chargeId: activeSub.id,
          plan: activeSub.name,
          status: activeSub.status,
          updatedAt: new Date(),
        },
        create: {
          shop: session.shop,
          chargeId: activeSub.id,
          plan: activeSub.name,
          status: activeSub.status,
        },
      });
    }

    // ✅ Load latest DB record
    const subscription = await prisma.subscription.findUnique({
      where: { shop: session.shop },
      select: {
        status: true,
        createdAt: true,
        plan: true,
        chargeId: true,
      },
    });

    const result = {
      hasActiveSubscription: subscription?.status === "active",
      subscription: subscription || null,
    };

    subscriptionCache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    return json(result);
  } catch (error) {
    console.error("Subscription check error:", error);
    return json(
      {
        hasActiveSubscription: false,
        subscription: null,
        error: "Failed to check subscription status",
      },
      { status: 500 }
    );
  }
}
