// app/routes/debug-env.jsx
export async function loader() {
  return new Response(
    JSON.stringify({
      // Shopify variables
      hasApiKey: !!process.env.SHOPIFY_API_KEY,
      hasApiSecret: !!process.env.SHOPIFY_API_SECRET,
      hasScopes: !!process.env.SCOPES,
      hasAppUrl: !!process.env.SHOPIFY_APP_URL,
      hasHost: !!process.env.HOST,
      
      // Database variables
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
      
      // Other
      nodeEnv: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL,
      
      // All environment variables (filtered for security)
      envKeys: Object.keys(process.env).filter(key => 
        key.includes('SHOPIFY') || 
        key.includes('DATABASE') || 
        key.includes('URL') ||
        key.includes('HOST') ||
        key.includes('SCOPE')
      )
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}