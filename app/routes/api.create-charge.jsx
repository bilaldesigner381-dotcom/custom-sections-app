// app/routes/api.create-charge.jsx - FINAL FIXED VERSION
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function action({ request }) {
  try {
    const { admin, session } = await authenticate.admin(request);
    
    // Read form data for discounts
    const formData = await request.formData();
    const discountCode = formData.get('discountCode');
    const discountPercentage = formData.get('discountPercentage');

    // Check if already subscribed
    const existingSub = await prisma.subscription.findUnique({
      where: { shop: session.shop }
    });

    if (existingSub && existingSub.status === "active") {
      return json({ 
        error: "You already have an active subscription" 
      }, { status: 400 });
    }

    // Calculate final price with discount
    let finalPrice = 9.00;
    if (discountPercentage) {
      finalPrice = 9.00 * (1 - parseFloat(discountPercentage) / 100);
    }

    // TEMPORARY: Use hardcoded URL until environment variable is set
    const appUrl = process.env.SHOPIFY_APP_URL || "https://custom-sections-app-4hst.vercel.app/";
    
    // FIXED: Corrected the GraphQL input type (removed extra "i")
    const response = await admin.graphql(`
      mutation CreateRecurringCharge($charge: RecurringApplicationChargeInput!) {
        recurringApplicationChargeCreate(recurringApplicationCharge: $charge) {
          recurringApplicationCharge {
            id
            confirmationUrl
            name
            price
            status
            test
          }
          userErrors {
            field
            message
          }
        }
      }
    `, {
      variables: {
        charge: {
          name: "Section Master Pro Plan",
          price: finalPrice,
          returnUrl: `${appUrl}/app/upgrade/success`,
          test: process.env.NODE_ENV === 'development',
          trialDays: 0
        }
      }
    });

    const responseData = await response.json();
    
    // Check for GraphQL errors
    if (responseData.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(responseData.errors)}`);
    }

    if (responseData.data.recurringApplicationChargeCreate.userErrors.length > 0) {
      const errors = responseData.data.recurringApplicationChargeCreate.userErrors;
      throw new Error(`Shopify API user errors: ${JSON.stringify(errors)}`);
    }

    const charge = responseData.data.recurringApplicationChargeCreate.recurringApplicationCharge;

    // Save pending subscription (temporarily without discount fields)
    await prisma.subscription.upsert({
      where: { shop: session.shop },
      update: { 
        chargeId: charge.id,
        status: "pending",
      },
      create: {
        shop: session.shop,
        chargeId: charge.id,
        plan: "pro",
        status: "pending",
      }
    });

    return json({ 
      confirmationUrl: charge.confirmationUrl,
      originalPrice: 9.00,
      discountedPrice: finalPrice,
      discountApplied: !!discountPercentage
    });

  } catch (error) {
    console.error("Billing error details:", error);
    return json({ 
      error: "Payment setup failed. Please try again or contact support.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}