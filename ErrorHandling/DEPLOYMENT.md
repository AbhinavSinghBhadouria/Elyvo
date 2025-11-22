# Deploying Elyvo to Render

This guide will help you deploy your Elyvo application to Render.

## Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. A MongoDB database (you can use MongoDB Atlas or Render's MongoDB service)
3. All your API keys and secrets ready (Clerk, Inngest, Stream, etc.)

## Deployment Steps

### Option 1: Using Render Blueprint (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**
   - In the Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add all the following environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (Render automatically sets this, but include it)
     - `DB_URL`: Your MongoDB connection string
     - `CLIENT_URL`: Your Render app URL (e.g., `https://elyvo-app.onrender.com`)
     - `INNGEST_EVENT_KEY`: Your Inngest event key
     - `INNGEST_SIGNING_KEY`: Your Inngest signing key
     - `STREAM_API_KEY`: Your Stream API key
     - `STREAM_API_SECRET`: Your Stream API secret
     - `CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
     - `CLERK_SECRET_KEY`: Your Clerk secret key

4. **Deploy**
   - Render will automatically build and deploy your application
   - The build process will:
     - Install backend dependencies
     - Build the frontend (Vite)
     - Start the server

### Option 2: Manual Deployment

1. **Create a Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Name**: `elyvo-app` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build && cd ..`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or set to root of your repo)

3. **Set Environment Variables**
   Add all the environment variables listed in Option 1 above.

4. **Deploy**
   - Click "Create Web Service"
   - Render will start building and deploying your app

## Important Notes

### MongoDB Database
- If you don't have a MongoDB database, you can:
  - Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
  - Use Render's MongoDB service (paid)

### Inngest Configuration
- **IMPORTANT**: After deployment, you need to configure Inngest with your Render app URL
- See `INNGEST_SETUP.md` for detailed step-by-step instructions
- The webhook URL will be: `https://your-app.onrender.com/api/inngest`
- You'll need to add this URL in your Inngest dashboard after getting your Render URL

### Clerk Configuration
- Update your Clerk dashboard with your Render app URL
- Add `https://your-app.onrender.com` to allowed origins in Clerk

### CORS Configuration
- The `CLIENT_URL` environment variable should match your Render app URL
- This ensures CORS is properly configured

### Build Process
- The build script automatically:
  1. Installs frontend dependencies
  2. Builds the Vite frontend to `frontend/vite-project/dist`
  3. The backend serves the built frontend files in production mode

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure Node.js version is compatible (Render uses Node 18+ by default)

### Database Connection Issues
- Verify your `DB_URL` is correct
- Check MongoDB Atlas IP whitelist (should allow all IPs: `0.0.0.0/0`)

### Environment Variables Not Working
- Make sure all variables are set in Render dashboard
- Restart the service after adding new environment variables

### Frontend Not Loading
- Verify the build completed successfully
- Check that `NODE_ENV=production` is set
- Ensure the static file path is correct in `server.js`

## Post-Deployment

1. **Test your application**
   - Visit your Render app URL
   - Test all major features

2. **Monitor logs**
   - Use Render's log viewer to monitor application logs
   - Check for any errors or warnings

3. **Set up custom domain** (optional)
   - In Render dashboard, go to your service
   - Navigate to "Settings" → "Custom Domains"
   - Add your custom domain

## Support

If you encounter issues:
- Check Render's [documentation](https://render.com/docs)
- Review application logs in Render dashboard
- Verify all environment variables are set correctly

