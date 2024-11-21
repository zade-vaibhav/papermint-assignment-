import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();

import authRout from "./Routes/authRoutes.js"
import expenceRoute from "./Routes/expanceRoute.js"

const app = Express();
connectDB();
// middleware
app.use(bodyParser.json());
app.use(Express.json());
app.use(cors());

app.use("/api/v1",authRout)
app.use("/api/v1/user/expance",expenceRoute)

const PORT = process.env.PORT;

// rull listen
app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
});