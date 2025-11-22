# Setting Up Inngest After Deployment

This guide will help you configure Inngest with your Render app URL after deployment.

## Step 1: Get Your Render App URL

1. Go to your [Render Dashboard](https://dashboard.render.com)
2. Click on your deployed service (e.g., `elyvo-app`)
3. Your app URL will be displayed at the top, something like:
   - `https://elyvo-app.onrender.com`
   - Or your custom domain if you've set one up

**Copy this URL - you'll need it for the next steps!**

## Step 2: Configure Inngest Webhook URL

1. **Go to Inngest Dashboard**
   - Visit [app.inngest.com](https://app.inngest.com)
   - Log in to your account

2. **Navigate to Your App**
   - Find your app (should be named "Elyvo" based on your configuration)
   - Or create a new app if you haven't already

3. **Add the Sync URL**
   - Look for "Sync URL" or "Webhook URL" settings
   - Enter your Render app URL + the Inngest endpoint:
     ```
     https://your-app-name.onrender.com/api/inngest
     ```
   - Replace `your-app-name.onrender.com` with your actual Render URL

4. **Save the Configuration**
   - Click "Save" or "Update"
   - Inngest will attempt to sync with your app

## Step 3: Verify the Connection

1. **Check Inngest Dashboard**
   - Look for a "Connected" or "Synced" status
   - You should see your functions listed:
     - `sync-user` (for Clerk user.created events)
     - `delete-user-from-db` (for Clerk user.deleted events)

2. **Test the Endpoint**
   - You can test if the endpoint is accessible by visiting:
     ```
     https://your-app-name.onrender.com/api/inngest
     ```
   - You should see an Inngest response (not an error)

3. **Check Render Logs**
   - In Render dashboard, go to your service → "Logs"
   - Look for any Inngest-related errors
   - You should see successful connection messages

## Step 4: Configure Clerk Webhooks (If Not Done)

Since your Inngest functions listen to Clerk events, make sure Clerk is configured:

1. **Go to Clerk Dashboard**
   - Visit [dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your application

2. **Set Up Webhooks**
   - Go to "Webhooks" section
   - Add a new webhook endpoint
   - Use your Inngest webhook URL (not your Render app directly):
     ```
     https://your-inngest-webhook-url
     ```
   - Or if Clerk sends directly to Inngest, use:
     ```
     https://your-app-name.onrender.com/api/inngest
     ```

3. **Select Events**
   - Enable `user.created` event
   - Enable `user.deleted` event

## Troubleshooting

### Inngest Can't Connect

1. **Check Environment Variables**
   - Verify `INNGEST_EVENT_KEY` is set in Render
   - Verify `INNGEST_SIGNING_KEY` is set in Render
   - Restart your service after adding variables

2. **Check Render Logs**
   - Look for errors related to Inngest
   - Common issues:
     - Missing environment variables
     - Incorrect webhook URL format
     - CORS issues

3. **Verify Endpoint is Public**
   - Make sure `/api/inngest` endpoint is accessible
   - Test by visiting: `https://your-app.onrender.com/api/inngest`
   - Should return Inngest metadata, not 404

### Functions Not Appearing

1. **Wait a Few Minutes**
   - Inngest sync can take 1-2 minutes
   - Refresh the Inngest dashboard

2. **Check Function Exports**
   - Verify `functions` array is exported from `inngest.js`
   - Verify functions are imported in `server.js`

3. **Manual Sync**
   - Some Inngest dashboards have a "Sync" or "Refresh" button
   - Click it to force a sync

### Events Not Triggering

1. **Check Clerk Configuration**
   - Verify Clerk webhook is pointing to Inngest
   - Verify events are enabled in Clerk

2. **Test with Inngest Dev Server** (for debugging)
   - You can test locally first with Inngest dev server
   - Then verify production setup matches

## Quick Reference

- **Inngest Endpoint**: `/api/inngest`
- **Full Webhook URL**: `https://your-app-name.onrender.com/api/inngest`
- **Required Env Vars**: `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY`
- **Functions**: `sync-user`, `delete-user-from-db`

## Next Steps

After Inngest is configured:
1. Test user creation in your app
2. Check Inngest dashboard for triggered events
3. Verify users are being synced to your database
4. Monitor Render logs for any issues

