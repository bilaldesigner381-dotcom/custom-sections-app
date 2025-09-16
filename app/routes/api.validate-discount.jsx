// app/routes/api.validate-discount.jsx - FIXED VERSION
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

// Simple rate limiting
const rateLimit = new Map();
const MAX_ATTEMPTS = 5;
const TIME_WINDOW = 60000; // 1 minute

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  
  // Basic rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowStart = now - TIME_WINDOW;

  // Clean old entries
  for (const [key, timestamp] of rateLimit.entries()) {
    if (timestamp < windowStart) rateLimit.delete(key);
  }

  // Check rate limit
  const attempts = Array.from(rateLimit.entries())
    .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
    .length;

  if (attempts >= MAX_ATTEMPTS) {
    return json({ 
      valid: false, 
      error: 'Too many attempts. Please try again later.' 
    });
  }

  try {
    const formData = await request.formData();
    const discountCode = formData.get('discountCode');

    // Input validation
    if (!discountCode || typeof discountCode !== 'string' || discountCode.trim().length > 50) {
      return json({ 
        valid: false, 
        error: 'Invalid discount code format' 
      });
    }

    const cleanDiscountCode = discountCode.trim().toUpperCase();

    // Record this attempt
    rateLimit.set(`${ip}-${now}`, now);

    const response = await admin.graphql(`
      query ValidateDiscountCode($code: String!) {
        codeDiscountNodeByCode(code: $code) {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              title
              summary
              status
              startsAt
              endsAt
              usageLimit
              customerGets {
                value {
                  ... on DiscountPercentage {
                    percentage
                  }
                }
              }
            }
          }
        }
      }
    `, {
      variables: { code: cleanDiscountCode }
    });

    const data = await response.json();
    const discount = data.data?.codeDiscountNodeByCode;

    if (!discount || discount.codeDiscount.status !== 'ACTIVE') {
      return json({ 
        valid: false, 
        error: 'Invalid or expired discount code' 
      });
    }

    // Check discount dates
    const currentTime = new Date();
    const startsAt = new Date(discount.codeDiscount.startsAt);
    const endsAt = discount.codeDiscount.endsAt ? new Date(discount.codeDiscount.endsAt) : null;

    if (currentTime < startsAt) {
      return json({ 
        valid: false, 
        error: 'Discount code is not active yet' 
      });
    }

    if (endsAt && currentTime > endsAt) {
      return json({ 
        valid: false, 
        error: 'Discount code has expired' 
      });
    }

    const percentage = discount.codeDiscount.customerGets.value.percentage;
    
    return json({
      valid: true,
      discount: {
        percentage: percentage,
        code: cleanDiscountCode,
        description: discount.codeDiscount.summary,
        expires: discount.codeDiscount.endsAt
      }
    });

  } catch (error) {
    console.error('Discount validation error:', error);
    return json({ 
      valid: false, 
      error: 'Error validating discount code' 
    });
  }
}