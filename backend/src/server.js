import express from 'express';
import {ENV} from "./lib/env.js"

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json({ msg: 'successs from backend hello' });
});


app.listen(ENV.PORT, () => {
   console.log(`server is listening on port ..`, ENV.PORT);
});

export default app;