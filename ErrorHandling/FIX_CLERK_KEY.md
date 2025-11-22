# Fix: Missing Publishable Key Error

## The Problem
The frontend is showing "Missing Publishable Key" because `VITE_CLERK_PUBLISHABLE_KEY` wasn't available during the build process.

## Solution: Add the Environment Variable in Render

### Step 1: Go to Render Dashboard
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click on your service (e.g., `elyvo-app`)

### Step 2: Add the Environment Variable
1. Click on the **"Environment"** tab
2. Scroll down to find the environment variables section
3. Click **"+ Add Environment Variable"**
4. Add:
   - **Name**: `VITE_CLERK_PUBLISHABLE_KEY`
   - **Value**: Your Clerk publishable key (starts with `pk_`)
     - This should be the SAME value as your `CLERK_PUBLISHABLE_KEY`
5. Click **"Save Changes"**

### Step 3: Redeploy (CRITICAL!)
**You MUST redeploy after adding the variable!**

The build process needs the variable to be available when building the frontend.

1. Go to the **"Manual Deploy"** section (or it may auto-deploy)
2. Click **"Deploy latest commit"** or trigger a new deployment
3. Wait for the build to complete

### Step 4: Verify
1. Check the build logs - you should see the build completing successfully
2. Visit your app URL - the error should be gone
3. The Clerk authentication should now work

## Why This Happens

- Vite needs `VITE_CLERK_PUBLISHABLE_KEY` **during the build process** (not just at runtime)
- The variable gets embedded into the JavaScript bundle at build time
- If it's missing during build, the error will persist even if you add it later (without rebuilding)

## Quick Checklist

- [ ] Added `VITE_CLERK_PUBLISHABLE_KEY` in Render dashboard
- [ ] Set the value to your Clerk publishable key (same as `CLERK_PUBLISHABLE_KEY`)
- [ ] Saved the changes
- [ ] Triggered a new deployment/rebuild
- [ ] Verified the build completed successfully
- [ ] Tested the app - error should be gone

## Still Not Working?

1. **Check build logs** - Look for any errors during the build
2. **Verify the variable name** - Must be exactly `VITE_CLERK_PUBLISHABLE_KEY` (case-sensitive)
3. **Check the value** - Must start with `pk_` and be your actual Clerk key
4. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. **Check Render logs** - Look for any runtime errors

