import express from 'express';
import {ENV} from "./lib/env.js";
import path from "path";
import { fileURLToPath } from 'url';
import { connectDB } from './lib/db.js';

const app = express();


app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
   res.status(200).json({ msg: 'successs from backend hello' });
});


const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
   console.log(`server is listening on port ${PORT}...`);
});


// how can we distinguish between we are in production or in development
// making our application ready for deployment
const MODE = ENV.MODE_ENV || process.env.NODE_ENV || 'development';
if (MODE === 'production') {
   // path from backend/src -> ../../frontend/vite-project/dist
   const staticPath = path.join(__dirname, '../../frontend/vite-project/dist');
   app.use(express.static(staticPath));

   app.get('*', (req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'));
   });
}


// export default app;



const startServer = async () =>{
   try{
      await connectDB();
      app.listen(ENV.PORT,()=> {
      console.log( "Server is running on port:", ENV.PORT)});
   }  
   catch(error){
      console.error("Error starting the server",err);
   }
}
startServer();