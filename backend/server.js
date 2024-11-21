import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();

const app = Express();
connectDB();
// middleware
app.use(bodyParser.json());
app.use(Express.json());
app.use(cors());


const PORT = process.env.PORT;

// rull listen
app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
});