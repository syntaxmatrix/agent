import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.set("trust proxy", 1);
const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Important for sending cookies with cross-origin requests
  })
);

app.get("/api/v1/hello", (req, res) => {
  //verification for beckend and frontend connections
  res.json({ message: "Agent's Express Backend is Connected with You !" });
});

app.get("/",(req,res)=>{
  res.send(`
    Backend API running 🚀
`);});

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declarations
app.use("/api/v1/users", userRouter); // example.com/api/v1/users/register


export { app };
