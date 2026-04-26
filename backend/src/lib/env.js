import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || '',
    NODE_ENV: process.env.NODE_ENV,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
    // Judge0 configuration
    // Example (self-hosted):
    //   JUDGE0_API_URL=https://your-judge0-instance
    // Example (RapidAPI):
    //   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
    //   JUDGE0_API_KEY=your-rapidapi-key
    //   JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
    JUDGE0_API_URL: process.env.JUDGE0_API_URL,
    JUDGE0_API_KEY: process.env.JUDGE0_API_KEY,
    JUDGE0_API_HOST: process.env.JUDGE0_API_HOST,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    ADMIN_SECRET: process.env.ADMIN_SECRET,
    ADMIN_IDS: process.env.ADMIN_IDS || "",
};

export default ENV;



// hrr barr export na krna pde is liye hmne y seperate file bnia h hy env.js krke
// import dotenv from "dotenv";


// dotenv.config();

