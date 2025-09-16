// app/routes/api.create-charge.jsx - FIXED
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

    // FIXED: Use correct Shopify Admin API syntax
    const chargeData = {
      name: "Section Master Pro Plan",
      price: finalPrice,
      return_url: `${process.env.SHOPIFY_APP_URL}/app/upgrade/success`,
      test: process.env.NODE_ENV === 'development', // Test in dev
      trial_days: 0,
      capped_amount: null,
      terms: null
    };

    // Create recurring charge using GraphQL
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
        charge: chargeData
      }
    });

    const responseData = await response.json();
    
    if (responseData.errors || responseData.data.recurringApplicationChargeCreate.userErrors.length > 0) {
      const errors = responseData.errors || responseData.data.recurringApplicationChargeCreate.userErrors;
      throw new Error(`Shopify API error: ${JSON.stringify(errors)}`);
    }

    const charge = responseData.data.recurringApplicationChargeCreate.recurringApplicationCharge;

    // Save pending subscription with discount info
    await prisma.subscription.upsert({
      where: { shop: session.shop },
      update: { 
        chargeId: charge.id,
        status: "pending",
        discountCode: discountCode || null,
        discountPercentage: discountPercentage ? parseFloat(discountPercentage) : null
      },
      create: {
        shop: session.shop,
        chargeId: charge.id,
        plan: "pro",
        status: "pending",
        discountCode: discountCode || null,
        discountPercentage: discountPercentage ? parseFloat(discountPercentage) : null
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