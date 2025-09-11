import "@shopify/shopify-app-remix/adapters/node"; 
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { PrismaClient } from "@prisma/client";

// ✅ Initialize Prisma client properly
const prisma = new PrismaClient();

// Database connection health check
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
}

// Initialize database connection
checkDatabaseConnection().catch(console.error);

// App URL configuration
const appUrl = process.env.SHOPIFY_APP_URL || process.env.VERCEL_URL || process.env.HOST;

if (!appUrl) {
  throw new Error(
    "❌ Missing SHOPIFY_APP_URL, VERCEL_URL or HOST environment variable."
  );
}

const formattedAppUrl = appUrl.startsWith("http") ? appUrl : `https://${appUrl}`;

// Initialize Shopify app
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: formattedAppUrl,
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma, {
    tableName: "session", // Must match @@map("session") in schema.prisma
  }),
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;

// ✅ Export Prisma client for other modules
export { prisma };
