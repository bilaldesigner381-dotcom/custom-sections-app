import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { PrismaClient } from "@prisma/client";

// ✅ Initialize Prisma client with dev logging
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

// ✅ Health check for database connection
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

// Initialize connection on startup
checkDatabaseConnection().catch(console.error);

// Resolve App URL
const appUrl =
  process.env.SHOPIFY_APP_URL ||
  process.env.VERCEL_URL ||
  process.env.HOST ||
  (() => {
    throw new Error(
      "❌ Missing SHOPIFY_APP_URL, VERCEL_URL or HOST environment variable."
    );
  })();

// Ensure HTTPS prefix
const formattedAppUrl = appUrl.startsWith("http") ? appUrl : `https://${appUrl}`;

// ✅ Shopify App Initialization
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: formattedAppUrl,
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma, {
    tableName: "session", // ✅ Must match @@map("session") in schema.prisma
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

// ✅ Exports for Remix and Shopify routes
export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;

// ✅ Export Prisma client for use in other modules
export { prisma };