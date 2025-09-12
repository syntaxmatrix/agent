import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const app = express()


app.listen(process.env.PORT, () => {
  console.log("Server is RUNNING at PORT :", process.env.PORT);
  console.log(` Server Link : http://localhost:${process.env.PORT}`);
});


app.get("/", (req, res) => {
  res.send("Backend API running 🚀");
});
