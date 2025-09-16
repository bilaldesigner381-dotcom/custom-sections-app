// app/routes/api.create-charge.jsx - FIXED VERSION
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function action({ request }) {
  const { admin, session } = await authenticate.admin(request);
  
  // Read form data for discounts
  const formData = await request.formData();
  const discountCode = formData.get('discountCode');
  const discountPercentage = formData.get('discountPercentage');

  try {
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

    // Create recurring charge
    const charge = new admin.rest.resources.RecurringApplicationCharge({
      session: admin.session,
    });

    charge.name = "Section Master Pro Plan";
    charge.price = finalPrice; // Use dynamic price
    charge.return_url = `${process.env.SHOPIFY_APP_URL}/app/upgrade/success`;
    charge.test = process.env.NODE_ENV === 'development';
    charge.trial_days = 0;

    await charge.save();

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
        status: "pending",
        discountCode: discountCode || null,
        discountPercentage: discountPercentage ? parseFloat(discountPercentage) : null
      }
    });

    return json({ 
      confirmationUrl: charge.confirmation_url,
      originalPrice: 9.00,
      discountedPrice: finalPrice,
      discountApplied: !!discountPercentage
    });

  } catch (error) {
    console.error("Billing error:", error);
    return json({ error: "Payment setup failed" }, { status: 500 });
  }
}