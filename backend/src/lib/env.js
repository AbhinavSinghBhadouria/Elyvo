import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || '',
    NODE_ENV: process.env.NODE_ENV,
};

export default ENV;



// hrr barr export na krna pde is liye hmne y seperate file bnia h hy env.js krke
// import dotenv from "dotenv";


// dotenv.config();

