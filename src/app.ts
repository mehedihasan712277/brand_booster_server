import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import errorHandler from "./utils/errorHandler";
import AppError from "./utils/AppError";

const app = express();

// 1. Security HTTP headers (always first)
app.use(helmet());

// 2. CORS (before body parsers & routes)
app.use(
    cors({
        origin: "*", // or specific domains in production
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Cookie parser (needs parsed headers before routes)
app.use(cookieParser());

// 5. Routes
app.use("/api", router);

// 6. Healthcheck / root route (optional placement)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Brand Booster. The server is running ok" });
});

// 7. 404 handler (after routes)
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// 8. Centralized error handler (last)
app.use(errorHandler);

export default app;
