// app/routes/api.sections.jsx - ENHANCED VERSION
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { sectionRegistry } from "../sections/section-registry";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Simple caching to reduce database calls
const sectionCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  
  try {
    // Check cache first
    const cacheKey = session.shop;
    const cached = sectionCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return json(cached.data);
    }

    // CHECK SUBSCRIPTION STATUS
    const subscription = await prisma.subscription.findUnique({
      where: { shop: session.shop },
      select: { 
        status: true,
        plan: true,
        createdAt: true,
        discountCode: true,
        discountPercentage: true
      }
    });

    const hasPremium = subscription?.status === 'active';
    
    // GET SECTIONS BASED ON SUBSCRIPTION
    const availableSections = sectionRegistry.getSectionsForShop(hasPremium);
    
    const result = {
      sections: availableSections,
      hasPremium: hasPremium,
      subscription: subscription || null,
      totalSections: sectionRegistry.sections.size,
      freeSections: availableSections.filter(s => s.isFree).length,
      premiumSections: availableSections.filter(s => !s.isFree).length,
      timestamp: new Date().toISOString()
    };

    // Cache the result
    sectionCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return json(result);

  } catch (error) {
    console.error('Sections API error:', error);
    
    // Fallback: return all sections if database fails
    const availableSections = sectionRegistry.getSectionsForShop(false);
    
    return json({
      sections: availableSections,
      hasPremium: false,
      subscription: null,
      totalSections: sectionRegistry.sections.size,
      freeSections: availableSections.filter(s => s.isFree).length,
      premiumSections: availableSections.filter(s => !s.isFree).length,
      error: 'Failed to fetch subscription status',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}