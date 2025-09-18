// app/routes/api.create-charge.jsx
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CREATE_SUBSCRIPTION_MUTATION = `
  mutation CreateSubscription(
    $name: String!,
    $price: Decimal!,
    $returnUrl: URL!,
    $test: Boolean!,
    $trialDays: Int!
  ) {
    appSubscriptionCreate(
      name: $name,
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: $price, currencyCode: USD },
              interval: EVERY_30_DAYS
            }
          }
        }
      ],
      returnUrl: $returnUrl,
      test: $test,
      trialDays: $trialDays
    ) {
      appSubscription {
        id
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;

export async function action({ request }) {
  try {
    const { session, admin } = await authenticate.admin(request);
    const formData = await request.formData();
    const discountPercentage = formData.get("discountPercentage");

    // Check if shop already has active subscription
    const existingSub = await prisma.subscription.findUnique({
      where: { shop: session.shop },
    });

    if (existingSub && existingSub.status === "active") {
      return json(
        { error: "You already have an active subscription" },
        { status: 400 }
      );
    }

    // Apply discount if any
    let finalPrice = 9;
    if (discountPercentage) {
      finalPrice = 9 * (1 - parseFloat(discountPercentage) / 100);
    }

    const appUrl =
      process.env.SHOPIFY_APP_URL ||
      "https://custom-sections-app-4hst.vercel.app/";

    // Call Shopify GraphQL billing API
    const response = await admin.graphql(CREATE_SUBSCRIPTION_MUTATION, {
      variables: {
        name: "Section Master Pro Plan",
        price: finalPrice,
        returnUrl: `${appUrl}/app/upgrade/success`,
        test: process.env.NODE_ENV === "development",
        trialDays: 0,
      },
    });

    const data = await response.json();
    const { appSubscriptionCreate } = data.data;

    if (appSubscriptionCreate.userErrors.length) {
      throw new Error(appSubscriptionCreate.userErrors[0].message);
    }

    const subscriptionId = appSubscriptionCreate.appSubscription.id;
    const confirmationUrl = appSubscriptionCreate.confirmationUrl;

    // Save subscription info in DB
    await prisma.subscription.upsert({
      where: { shop: session.shop },
      update: {
        chargeId: subscriptionId,
        status: "pending",
      },
      create: {
        shop: session.shop,
        chargeId: subscriptionId,
        plan: "pro",
        status: "pending",
      },
    });

    // 🔥 Set metafield in Shopify admin (automatic unlock after success)
    await admin.graphql(`
      mutation {
        metafieldsSet(metafields: [
          {
            namespace: "section_master"
            key: "subscription_status"
            type: "single_line_text_field"
            value: "active"
          }
        ]) {
          userErrors { field message }
        }
      }
    `);

    return json({
      confirmationUrl,
      originalPrice: 9,
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



