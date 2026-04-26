<p align="center">
  <img src="readme_assets/hero.png" alt="Elyvo Hero" width="100%" />
</p>

<h1 align="center">Elyvo V2.0</h1>

<p align="center">
  <strong>The Professional Collaborative Technical Interview Platform</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/AI-Groq--Powered-emerald?style=for-the-badge" alt="AI" />
</p>

---

## 🚀 Overview

**Elyvo** is a premium, real-time collaborative technical interview platform designed for modern engineering teams. Version 2.0 introduces a state-of-the-art "Obsidian" aesthetic, integrated AI diagnostics, and a hardened multi-user admin architecture.

### ✨ Key Features
- **Real-time IDE**: Zero-lag synchronized code editor with support for 5+ languages.
- **HD Video & Chat**: Seamless peer-to-peer communication powered by Stream.io.
- **AI Co-pilot**: Intelligent hints and code logic reviews powered by Groq (Llama-3.3-70B).
- **Pro Dashboard**: Activity heatmaps, AI coding "roasts", and interview history.
- **Admin Mastery**: Dedicated API for secure problem management and multi-admin support.

---

## 🛠️ Technical Architecture

Elyvo is built using a high-performance MERN stack with modern cloud integrations.

### System Flow
```mermaid
graph TD
    User((User))
    Frontend[React Frontend - Vite]
    Backend[Express Backend - Node.js]
    DB[(MongoDB - Atlas)]
    Clerk[Clerk Auth]
    Stream[Stream Video & Chat]
    Groq[Groq AI - Llama 3]

    User --> Frontend
    Frontend --> Clerk
    Frontend --> Backend
    Backend --> DB
    Backend --> Stream
    Backend --> Groq
    Frontend --> Stream
```

### Authentication & Handshake
```mermaid
sequenceDiagram
    participant H as Host
    participant B as Backend
    participant S as Stream
    H->>B: Create Session
    B->>S: Request Token (67 Day Expiry)
    S-->>B: Signed HMAC Token
    B-->>H: Session ID + joinCode
```

---

## 💻 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide-React, Monaco Editor.
- **Backend**: Node.js, Express, Mongoose.
- **Authentication**: Clerk (Multi-session support).
- **Communication**: Stream.io Video & Chat SDKs.
- **AI Engine**: Groq (Llama 3.3) & Gemini Flash.
- **Infrastructure**: Inngest (Background Jobs), Piston (Remote Execution).

---

## 🔐 Administration

Elyvo 2.0 features a professional admin layer. Admins can manage the global problem set via Postman or the internal dashboard using a dual-auth system (Admin Secret + User ID validation).

Refer to the **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** for detailed API documentation and schema references.

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/AbhinavSinghBhadouria/Elyvo.git
cd Elyvo
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5001
DB_URL=your_mongodb_url
CLERK_SECRET_KEY=your_clerk_key
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
GROQ_API_KEY=your_groq_key
ADMIN_SECRET=your_admin_secret
```

### 3. Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend/vite-project && npm install
```

### 4. Run Development Server
```bash
# From root
npm run dev
```

---

## 📈 Roadmap
- [x] Version 2.0 Premium UI Overhaul
- [x] AI Integrated Code Reviews
- [x] Multi-admin Problem API
- [ ] Collaborative Whiteboard
- [ ] Session Playback/Recording

---

<p align="center">
  Built with ❤️ by the Elyvo Engineering Team.
</p>
