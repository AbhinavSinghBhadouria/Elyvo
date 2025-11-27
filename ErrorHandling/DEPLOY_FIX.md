# Quick Fix for Deployment Error

## The Problem
Error: `ENOENT: no such file or directory, stat '/opt/render/project/src/backend/frontend/vite-project/dist/index.html'`

## The Solution

### Step 1: Update Build Command in Render Dashboard

Go to Render Dashboard → Your Service → Settings → Build Command

**Replace with this exact command:**
```bash
cd backend && npm install && cd ../frontend/vite-project && npm install && npm run build && cd ../../backend && rm -rf public && mkdir -p public && cp -r ../frontend/vite-project/dist/* public/
```

### Step 2: Make Sure Code is Pushed

The server.js is already fixed to look in `backend/public`. Just make sure it's pushed:

```bash
git add .
git commit -m "Fix deployment"
git push origin main
```

### Step 3: Redeploy

1. Go to Render Dashboard
2. Click "Manual Deploy" → "Clear build cache & deploy"
3. Wait for build to complete

### Step 4: Verify

After deployment, your website should work. The build will:
1. Build frontend to `frontend/vite-project/dist`
2. Copy files to `backend/public`
3. Server serves from `backend/public`

## If Still Not Working

Check Render build logs - you should see:
- Frontend building successfully
- Files being copied to `backend/public`
- No errors

If you see errors in build logs, share them and I'll fix it.

