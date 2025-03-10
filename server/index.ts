import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";

import cors from "cors";
const app = express()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to capture response time and log requests
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  // Capture the response body
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Log the request details after the response is sent
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log({
      path,
      status: res.statusCode,
      duration: `${duration}ms`,
      response: capturedJsonResponse,
    });
  });

  next();
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err); // Log the error for debugging
});

app.get("/", (req, res) => {
  res.send("Lebaba E-commerce Server is running....");
});

// Register routes and start the server
async function main() {
  const server = await registerRoutes(app);

  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Serving on port ${port}`); // Properly log the server start message
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});
