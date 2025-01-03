import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//routes
import userRotuer from "./routes/user.routes.js"
import profileRouter from "./routes/profile.routes.js"
app.use("/api/v1/user", userRotuer);
app.use("/api/v1/profile", profileRouter);
export { app };
