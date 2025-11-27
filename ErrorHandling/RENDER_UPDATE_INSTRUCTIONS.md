# Render Dashboard Update Instructions

## Do You Need to Make Changes?

### Option 1: Using Render Blueprint (render.yaml) ✅ EASIER
**If you deployed using Blueprint:**
- ✅ **NO manual changes needed!**
- Just push the updated `render.yaml` to GitHub
- Render will automatically use the new build command
- Trigger a new deployment

**Steps:**
1. Make sure `render.yaml` is committed and pushed to GitHub
2. Go to Render Dashboard → Your Service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Done! The new build command will be used automatically

---

### Option 2: Manual Deployment (No render.yaml) ⚠️ NEEDS UPDATE
**If you created the service manually:**
- ⚠️ **YES, you need to update the build command manually**

**Steps:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your service (e.g., `elyvo-app`)
3. Go to **"Settings"** tab
4. Scroll to **"Build & Deploy"** section
5. Find **"Build Command"** field
6. **Update it to:**
   ```
   cd backend && npm install && cd ../frontend/vite-project && npm install && npm run build && mkdir -p ../../backend/public && cp -r dist/* ../../backend/public/ && cd ../../backend
   ```
7. Click **"Save Changes"**
8. Go to **"Manual Deploy"** → **"Deploy latest commit"**

---

## How to Check Which Method You're Using

1. Go to Render Dashboard → Your Service
2. Check the **"Settings"** tab
3. Look for **"Blueprint"** section:
   - **If you see "Blueprint" mentioned** → You're using Blueprint (Option 1)
   - **If you don't see "Blueprint"** → You're using Manual (Option 2)

---

## What Changed in the Build Command?

**Old:**
```
cd backend && npm install && cd ../frontend/vite-project && npm install && npm run build && cd ../../backend
```

**New:**
```
cd backend && npm install && cd ../frontend/vite-project && npm install && npm run build && mkdir -p ../../backend/public && cp -r dist/* ../../backend/public/ && cd ../../backend
```

**What's new:**
- `mkdir -p ../../backend/public` - Creates the public folder
- `cp -r dist/* ../../backend/public/` - Copies built files to backend/public
- This ensures the server can find the frontend files

---

## After Updating

1. **Trigger a new deployment**
2. **Check the build logs** - You should see:
   - Frontend building successfully
   - Files being copied to `backend/public`
3. **Check the server logs** - You should see:
   - `✅ Serving static files from: /path/to/backend/public`
4. **Test your app** - The frontend should load correctly

---

## Quick Checklist

- [ ] Determined which deployment method you're using
- [ ] Updated build command (if manual deployment)
- [ ] OR pushed updated render.yaml (if Blueprint)
- [ ] Triggered new deployment
- [ ] Verified build succeeds
- [ ] Verified frontend loads correctly

