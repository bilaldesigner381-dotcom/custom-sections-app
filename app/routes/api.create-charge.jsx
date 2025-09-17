// app/routes/api.create-charge.jsx
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

// ✅ Import REST resource explicitly
import { RecurringApplicationCharge } from "@shopify/shopify-api/rest/admin/2023-07/index.js";

const prisma = new PrismaClient();

export async function action({ request }) {
  try {
    const { session } = await authenticate.admin(request);

    // Read form data for discounts
    const formData = await request.formData();
    const discountPercentage = formData.get("discountPercentage");

    // Check if already subscribed
    const existingSub = await prisma.subscription.findUnique({
      where: { shop: session.shop },
    });

    if (existingSub && existingSub.status === "active") {
      return json(
        { error: "You already have an active subscription" },
        { status: 400 }
      );
    }

    // Calculate final price
    let finalPrice = 9.0;
    if (discountPercentage) {
      finalPrice = 9.0 * (1 - parseFloat(discountPercentage) / 100);
    }

    // App URL
    const appUrl =
      process.env.SHOPIFY_APP_URL ||
      "https://custom-sections-app-4hst.vercel.app/";

    // ✅ Create RecurringApplicationCharge using REST API
    const charge = new RecurringApplicationCharge({ session });
    await charge.save({
      name: "Section Master Pro Plan",
      price: finalPrice,
      return_url: `${appUrl}/app/upgrade/success`,
      test: process.env.NODE_ENV === "development",
      trial_days: 0,
    });

    // Save pending subscription in DB
    await prisma.subscription.upsert({
      where: { shop: session.shop },
      update: {
        chargeId: String(charge.id),
        status: "pending",
      },
      create: {
        shop: session.shop,
        chargeId: String(charge.id),
        plan: "pro",
        status: "pending",
      },
    });

    return json({
      confirmationUrl: charge.confirmation_url, // REST resource gives this
      originalPrice: 9.0,
      discountedPrice: finalPrice,
      discountApplied: !!discountPercentage,
    });
  } catch (error) {
    console.error("Billing error details:", error);
    return json(
      {
        error: "Payment setup failed. Please try again or contact support.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

