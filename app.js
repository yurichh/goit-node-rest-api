import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { contactsRouter } from "./routes/index.js";

dotenv.config({ path: "./envs/.env" });

const app = express();
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/users", contactsRouter);

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
