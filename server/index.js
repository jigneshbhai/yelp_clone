import restRoutes from "./routes/rest.route.js";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server run at port: ${port}`);
});

app.use("/api/restaurant", restRoutes);
