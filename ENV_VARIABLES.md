# Environment Variables for Render

Add these environment variables in your Render dashboard. Click "+ Add Environment Variable" for each one.

## Required Environment Variables

### 1. NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Description**: Tells Node.js this is a production environment

### 2. PORT
- **Name**: `PORT`
- **Value**: `10000` (or leave it - Render will set this automatically)
- **Description**: Port for the server to listen on (Render sets this automatically, but you can set it explicitly)

### 3. DB_URL
- **Name**: `DB_URL`
- **Value**: Your MongoDB connection string
- **Example**: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- **Description**: Connection string for your MongoDB database (from MongoDB Atlas or your MongoDB provider)
- **Where to get it**: MongoDB Atlas Dashboard → Connect → Connect your application → Copy connection string

### 4. CLIENT_URL
- **Name**: `CLIENT_URL`
- **Value**: Your Render app URL (you'll get this after deployment)
- **Example**: `https://elyvo-app.onrender.com`
- **Description**: Your app's public URL (for CORS and frontend-backend communication)
- **Note**: You can update this after deployment with your actual Render URL

### 5. INNGEST_EVENT_KEY
- **Name**: `INNGEST_EVENT_KEY`
- **Value**: Your Inngest event key
- **Description**: API key for Inngest event triggers
- **Where to get it**: Inngest Dashboard → Your App → Settings → API Keys

### 6. INNGEST_SIGNING_KEY
- **Name**: `INNGEST_SIGNING_KEY`
- **Value**: Your Inngest signing key
- **Description**: Secret key for signing Inngest webhooks
- **Where to get it**: Inngest Dashboard → Your App → Settings → Signing Key

### 7. STREAM_API_KEY
- **Name**: `STREAM_API_KEY`
- **Value**: Your Stream API key
- **Description**: API key for Stream (video/chat service)
- **Where to get it**: Stream Dashboard → API Keys

### 8. STREAM_API_SECRET
- **Name**: `STREAM_API_SECRET`
- **Value**: Your Stream API secret
- **Description**: Secret key for Stream API authentication
- **Where to get it**: Stream Dashboard → API Keys

### 9. CLERK_PUBLISHABLE_KEY
- **Name**: `CLERK_PUBLISHABLE_KEY`
- **Value**: Your Clerk publishable key (starts with `pk_`)
- **Description**: Public key for Clerk authentication (used in frontend)
- **Where to get it**: Clerk Dashboard → API Keys → Publishable Key

### 10. CLERK_SECRET_KEY
- **Name**: `CLERK_SECRET_KEY`
- **Value**: Your Clerk secret key (starts with `sk_`)
- **Description**: Secret key for Clerk authentication (used in backend)
- **Where to get it**: Clerk Dashboard → API Keys → Secret Key

## Quick Checklist

Copy and paste this list to track what you've added:

- [ ] NODE_ENV = `production`
- [ ] PORT = `10000` (optional - Render sets this)
- [ ] DB_URL = `your_mongodb_connection_string`
- [ ] CLIENT_URL = `https://your-app-name.onrender.com` (update after deployment)
- [ ] INNGEST_EVENT_KEY = `your_inngest_event_key`
- [ ] INNGEST_SIGNING_KEY = `your_inngest_signing_key`
- [ ] STREAM_API_KEY = `your_stream_api_key`
- [ ] STREAM_API_SECRET = `your_stream_api_secret`
- [ ] CLERK_PUBLISHABLE_KEY = `pk_...`
- [ ] CLERK_SECRET_KEY = `sk_...`

## Important Notes

1. **CLIENT_URL**: You can set a placeholder first (like `https://elyvo-app.onrender.com`) and update it after deployment with your actual URL.

2. **DB_URL**: Make sure your MongoDB Atlas allows connections from anywhere (IP whitelist: `0.0.0.0/0`) or add Render's IP addresses.

3. **Secrets**: Never commit these values to Git. They should only be in Render's environment variables.

4. **After Deployment**: Once deployed, update `CLIENT_URL` with your actual Render URL, then restart the service.

## If You Don't Have All Keys Yet

You can deploy with placeholder values for keys you don't have yet, but the features using those services won't work until you add the real keys:

- If you don't have Stream keys yet: Use placeholder values, Stream features won't work
- If you don't have Inngest keys yet: Use placeholder values, Inngest functions won't work
- If you don't have Clerk keys yet: Authentication won't work

**Minimum required for basic deployment:**
- NODE_ENV
- PORT (or let Render set it)
- DB_URL (if you're using a database)
- CLIENT_URL (can update after deployment)

