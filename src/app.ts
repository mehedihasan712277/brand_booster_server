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
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Brand Booster</title>
        </head>
        <body style="margin: 0; padding: 0; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #1e3a8a, #7c3aed); color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <main style="max-width: 700px; width: 90%; padding: 3rem; background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 1.5rem; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4); text-align: center;">
                <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Welcome to Brand Booster</h1>
                <p style="font-size: 1.25rem; line-height: 2rem; margin-bottom: 1.5rem; color: #e5e7eb;">Our server is up and running, ready to elevate your brand with seamless performance and cutting-edge solutions.</p>
                <p style="font-size: 1rem; color: #d1d5db; font-style: italic;">Empowering your digital presence with innovation and reliability.</p>
            </main>
            <footer style="margin-top: 2.5rem; font-size: 0.875rem; color: #d1d5db; opacity: 0.8;">© ${new Date().getFullYear()} Brand Booster. All rights reserved.</footer>
        </body>
        </html>
    `);
});

// 7. 404 handler (after routes)
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// 8. Centralized error handler (last)
app.use(errorHandler);

export default app;
