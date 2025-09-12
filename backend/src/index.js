import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./utils/dbConfig.js";

dotenv.config({
  path: "../.env",
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is RUNNING at PORT :", process.env.PORT);
      console.log(` Server Link : http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED !!!", err);
  }
);
